import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { msg } = alert;


  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
      return;
    }

    try {
      const { data } = await clientAxios.post('/medicos/login', {email, password});

      // Guardar token para mantener la sesión iniciada del usuario
      localStorage.setItem("token", data.token);
      
      setAuth(data);

      navigate('/admin');
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
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus {""}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-16 px-4 py-8 rounded-xl bg-white shadow-xl">
        {msg && <Alert alert={alert}/>}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label htmlFor="mail" className="block uppercase font-bold text-gray-600 text-xl">
                Email
              </label>
              <input
                name="mail"
                type="email"
                placeholder="Email de Registro"
                className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label className="block uppercase font-bold text-gray-600 text-xl">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Tu Contraseña"
                className="border rounded-xl w-full p-3 mt-3 bg-gray-50"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input
              className="border rounded-xl py-3 px-10 mt-5 bg-indigo-700 text-white w-full font-bold hover:bg-indigo-800 transition-colors hover:cursor-pointer lg:w-auto"
              type="submit"
              value="Iniciar Sesión"
            />
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link
              className="block text-center my-5 text-gray-500"
              to="/registrar"
            >
              ¿No tienes una cuenta? Regístrate
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

export default Login;
