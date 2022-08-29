import usePatients from "../hooks/usePatients";

const Patient = ({ patient }) => {
    const { setEdition, deletePatient } = usePatients();

    const {email, date, name, symptoms, _id} = patient;

    const formatDate = date => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(newDate);
    }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-700">
        Nombre: {""}
        <span className="font-normal normal-case text-black">{name}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">
        Email Contacto: {""}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">
        Fecha de Alta: {""}
        <span className="font-normal normal-case text-black">
          {formatDate(date)}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-700">
        Síntomas: {""}
        <span className="font-normal normal-case text-black">{symptoms}</span>
      </p>

      <div className="flex justify-between my-5">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
          onClick={() => setEdition(patient)}
        >
          Editar
        </button>
        <button
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
          onClick={() => deletePatient(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Patient;