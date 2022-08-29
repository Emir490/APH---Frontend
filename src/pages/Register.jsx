import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida que los campos hayan sido rellenados
    if ([name, email, password, repeatPass].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
      return;
    }

    // Valida que los password sean iguales
    if (password !== repeatPass) {
      setAlert({
        msg: "Las contraseñas no coinciden",
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
      return;
    }

    // Valida que la contraseña no sea muy corta
    if (password.length < 6) {
      setAlert({
        msg: "La contraseña debe tener más de 6 caracteres",
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
      return;
    }

    // Crear el usuario en la api
    try {
      await clientAxios.post('/medicos', {name, email, password});
      setAlert({
        msg: "Hemos enviado un correo de confirmación"
      });

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y Administra {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-16 px-4 py-8 rounded-xl bg-white shadow-xl">
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="name" className="block uppercase font-bold text-gray-600 text-xl">
              Nombre
            </label>
            <input
              name="name"
              type="text"
              placeholder="Tu Nombre"
              className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label htmlFor="mail" className="block uppercase font-bold text-gray-600 text-xl">
              Email
            </label>
            <input
              type="email"
              name="mail"
              placeholder="Email de Registro"
              className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

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
            value="Crear Cuenta"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvide mi Contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
