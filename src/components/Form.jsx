import { useEffect } from "react";
import { useState } from "react"
import usePatients from "../hooks/usePatients";
import Alert from "./Alert";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [id, setId] = useState(null);

  const [alert, setAlert] = useState({});

  const { savePatient, patient } = usePatients();

  useEffect(() => {
    if (patient?.name) {
      setName(patient.name);
      setEmail(patient.email);
      setDate(new Date(patient.date).toISOString());
      setSymptoms(patient.symptoms);
      setId(patient._id);
    }
  }, [patient]);

  const handleSubmit = async e => {
    e.preventDefault();

    if ([name, email, date, symptoms].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
      return;
    }

    const result = await savePatient({name, email, date, symptoms, id});

    setAlert(result);
    setName("");
    setEmail("");
    setDate("");
    setSymptoms("");
    setId("");

    setTimeout(() => {
      setAlert({});
    }, 3000);
  }

  const { msg } = alert;

  return (
    <>
      <h2 className="font-black text-center">Administrador de Pacientes</h2>

      <p className="text-xl mt-5 mb-10 text-center">
            Añade tus pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 uppercase font-bold">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            placeholder="Nombre del paciente"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email Paciente
          </label>
          <input
            id="email"
            name="email"
            placeholder="Email del Paciente"
            type="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
        />
      </form>

      {msg && <Alert alert={alert} />}
    </>
  )
}

export default Form