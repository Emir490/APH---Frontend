import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

const ConfirmAccount = () => {
    const [accountConfirm, setAccountConfirm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                // Confirmando cuenta
                const url = `http://localhost:4000/api/medicos/confirmar/${id}`

                const { data } = await clientAxios(url);

                setAccountConfirm(true);
                setAlert({
                    msg: data.msg
                });
            } catch (error) {
                // Cuando el token es inválido
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                });

                setTimeout(() => {
                    setAlert({});
                }, 3000);
            }
            setLoading(false);
        }
        confirmAccount();
    }, [])

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
            Crea tu cuenta y Administra {""}
                <span className="text-black">tus Pacientes</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {!loading && <Alert alert={alert}/>}

            {accountConfirm && <Link
              className="block text-center my-5 text-gray-500"
              to="/olvide-password"
            >
              Iniciar Sesión
            </Link>}
        </div>
    </>
  )
}

export default ConfirmAccount