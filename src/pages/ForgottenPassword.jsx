import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        msg: "El correo es obligatorio",
        error: true
      });
      return;
    }

    try {
      const response = await clientAxios.post('/medicos/olvide-password', {email});

      setAlert({
        msg: response.data.msg,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  }

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-16 px-4 py-8 rounded-xl bg-white shadow-xl">
      {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="email" className="block uppercase font-bold text-gray-600 text-xl">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email de Registro"
              className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            className="border rounded-xl py-3 px-10 mt-5 bg-indigo-700 text-white w-full font-bold hover:bg-indigo-800 transition-colors hover:cursor-pointer lg:w-auto uppercase"
            type="submit"
            value="Enviar Instrucciones"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ForgottenPassword;
