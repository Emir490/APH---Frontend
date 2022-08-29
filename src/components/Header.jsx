import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const Header = () => {
    const { logOut } = useAuth();

  return (
    <header className="py-10 bg-indigo-600">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de {""}
            <span className="text-white font-black">Hospital</span>
        </h1>
        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
            <Link className="text-white text-sm uppercase font-bold" to="/admin">Pacientes</Link>
            <Link className="text-white text-sm uppercase font-bold" to="/admin/perfil">Perfil</Link>
            
            <button type="button" onClick={logOut} className="text-white text-sm uppercase font-bold">Cerrar Sesión</button>
        </nav>
        </div>
    </header>
  )
}

export default Header