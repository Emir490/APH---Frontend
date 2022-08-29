import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

const ChangePassword = () => {
    const { savePassword } = useAuth();
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({
        pwd_current: "",
        pwd_new: "",
    });

    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(password).some(camp => camp === "")) {
            setAlert({
              msg: "Todos los campos son obligatorios",
              error: true
            });

            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }

        if (password.pwd_new.length < 6) {
            setAlert({
              msg: "El Password debe tener mínimo 6 caracteres",
              error: true
            });

            setTimeout(() => {
                setAlert({});
            }, 3000);
            return
        }

        const result = await savePassword(password);
        setAlert(result);
    }

    const { msg } = alert;

  return (
    <>
      <AdminNav />

      <h2 className="font-bold text-3xl text-center mt-10">Cambiar Password</h2>
      <h2 className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Password aquí</span>
      </h2>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_current"
                placeholder="Escribe tu password actual"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Nuevo
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_new"
                placeholder="Escribe tu nuevo password"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer transition-colors px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword