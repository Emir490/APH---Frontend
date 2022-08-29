import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProtectedRoute = () => {
    const { auth, loading } = useAuth();
    let flag = false;
    if (loading) return "cargando...";
    if (auth.doctor) {
        flag = true
    }
  return (
    <>
        <Header/>
            {flag || auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}
        <Footer/>
    </>
  )
}

export default ProtectedRoute;