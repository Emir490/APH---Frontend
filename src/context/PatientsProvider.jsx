import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

export const PatientsProvider = ({children}) => {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});

    const { auth } = useAuth();   

    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/pacientes', config);

                setPatients(data);
            } catch (error) {
                console.log(error);
            }
        }
        getPatients();
    }, [auth])

    const savePatient = async patient => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (patient.id) {
            try {
                const { data } = await clientAxios.put(`/pacientes/${patient.id}`, patient, config);

                // Muestra lo actualizado y lo que no lo mantiene
                const updatePatients = patients.map(patientState => patientState._id === data._id ? data : patientState);

                setPatients(updatePatients);

                return {
                    msg: "Guardado Correctamente"
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        } else {
            try {
                const { data } = await clientAxios.post('/pacientes', patient, config);

                const {createdAt, updatedAt, __v, ...savedPatient} = data;

                setPatients([savedPatient, ...patients]);

                return {
                    msg: "Guardado Correctamente"
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        }
    }

    const setEdition = patient => {
        setPatient(patient);
    }

    const deletePatient = async id => {
        const confirms = confirm("¿Deseas eleminar este paciente?");

        if (confirms) {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                // Eliminando de la api
                await clientAxios.delete(`/pacientes/${id}`, config);

                // Crea nuevo array con todos los pacientes que no tengan el id proporcionado
                const savedPatients = patients.filter(patientsState => patientsState._id !== id);

                setPatients(savedPatients);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <PatientsContext.Provider
            value={{
                patients,
                patient,
                savePatient,
                setEdition,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext;