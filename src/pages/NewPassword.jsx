import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [tokenValidate, setTokenValidate] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [alert, setAlert] = useState({});

    const { token } = useParams();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await clientAxios(`/medicos/olvide-password/${token}`);
                setAlert({
                    msg: "Coloca tu nueva contraseña"
                });
                setTokenValidate(true);
            } catch (error) {
                setAlert({
                    msg: "Hubo un error en el enlace",
                    error: true,
                });
            }
        }
        verifyToken();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if (password !== repeatPass) {
            setAlert({
                msg: "Las contraseñas no coinciden",
                error: true
            });

            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }

        if (password.length < 6) {
            setAlert({
                msg: "La contraseña debe tener al menos 6 caracteres",
                error: true
            });

            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }

        try {
            const url = `/medicos/olvide-password/${token}`;
            const { data } = await clientAxios.post(url, { password });

            setAlert({
                msg: data.msg
            });
            setPasswordChanged(true);
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true,
            })
        }
    }

    const { msg } = alert;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
            Restablece tu contraseña y no Pierdas Acceso a {""}
                <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alert alert={alert} />}
            {tokenValidate && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label htmlFor="password" className="block uppercase font-bold text-gray-600 text-xl">
                            Contraseña
                            </label>
                            <input
                            type="password"
                            name="password"
                            placeholder="Tu Contraseña"
                            className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="my-5">
                            <label htmlFor="repeat" className="block uppercase font-bold text-gray-600 text-xl">
                            Repetir Contraseña
                            </label>
                            <input
                            type="password"
                            name="repeat"
                            placeholder="Repite tu contraseña"
                            className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                            value={repeatPass}
                            onChange={e => setRepeatPass(e.target.value)}
                            />
                        </div>

                        <input
                        className="border rounded-xl py-3 px-10 mt-5 bg-indigo-700 text-white w-full font-bold hover:bg-indigo-800 transition-colors hover:cursor-pointer lg:w-auto uppercase"
                        type="submit"
                        value="Cambiar Contraseña"
                        />
                    </form>
                </>
            )}
            
            {passwordChanged && (
                <Link className="block text-center my-5 text-gray-500" to="/">
                    Iniciar Sesión
                </Link>
            )}
        </div>
    </>
  )
}

export default NewPassword