import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clientAxios("/medicos/perfil", config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setLoading(false);
        }
        authenticateUser();
    }, []);

    const logOut = () => {
        localStorage.removeItem("token");
        setAuth({});
    }

    const updateProfile = async data => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }

        try {
            const url = `/medicos/perfil/${data._id}`;
            await clientAxios.put(url, data, config);

            return {
                msg: "Almacenado Correctamente"
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const savePassword = async datos => {
        const token = localStorage.getItem("token");
        if (!token) {
        setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }

        try {
            const url = `/medicos/actualizar-password`;

            const { data } = await clientAxios.put(url, datos, config);

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                setLoading,
                logOut,
                updateProfile,
                savePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;