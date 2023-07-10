import { useState, useEffect } from 'react';
import Error from "./Error.jsx"


const Formulario = ({ pacientes, setPacientes, paciente , setPaciente}) => {
  const hoy = new Date().toISOString().slice(0, 10); // Saco la fecha de hoy para el ingreso automatico
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [ingreso, setIngreso] = useState(hoy);
  const [alta, setAlta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setIngreso(paciente.ingreso)
      setAlta(paciente.alta)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])



  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario
    if ([nombre, propietario, email, ingreso, alta, sintomas].includes("")) {
      setError(true);
      return;
    }
    setError(false);

    // Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      ingreso,
      alta,
      sintomas,
    }

    if (paciente.id) {
      //Editando el registro 
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map ( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    

    // Reiniciar el form
    setNombre("");
    setPropietario("");
    setEmail("");
    setIngreso(hoy);
    setAlta("");
    setSintomas("");
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-xl mt-5 text-center mb-10">
        Añade pacientes y {""}
        <span className="text-cyan-700 font-bold">
          Administralos
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg py-10 px-5 mb-10">
        {error && <Error>
          <p>Todos los campos son obligatorios</p>
        </Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Dueño/a
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del dueño/a"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            E-Mail de contacto
          </label>
          <input
            id="email"
            type="email"
            placeholder="E-Mail de contacto"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="ingreso" className="block text-gray-700 uppercase font-bold">
            Fecha de ingreso
          </label>
          <input
            id="ingreso"
            type="date"
            value={ingreso}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => setIngreso(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Fecha de alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={alta}
            onChange={(e) => setAlta(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas de la mascota"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-cyan-700 w-full p-3 text-white font-bold uppercase rounded-md hover:bg-cyan-900 cursor-pointer transition-all"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  )
}

export default Formulario