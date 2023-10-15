import { useState } from "react"
import { useRouter } from "next/router"
import { dbConnect } from "utils/mongoose";
import Usuario from "models/Usuario";
import Laboratorio from "models/Laboratorio";
import Head from "next/head";	

export async function getServerSideProps(req) {
  dbConnect();
  const { id } = req.query
  const usuario = await Usuario.findById(id);
  const usuarioJson = JSON.parse(JSON.stringify(usuario));
  const laboratorios = await Laboratorio.find();
  const laboratoriosJson = JSON.parse(JSON.stringify(laboratorios));

  return {
    props: { usuarioJson,
             laboratoriosJson }
  }

}

const user = ({ usuarioJson, laboratoriosJson }) => {

  const router = useRouter()

  const handleNuevoUser = (e) => {
    e.preventDefault();
    fetch(`/api/usuario/nuevo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        USUARIO : USUARIO.toLowerCase(),
        PASSWORD : PASSWORD.toLowerCase(),
        NOMBRE : NOMBRE.toLowerCase(),
        APELLIDO : APELLIDO.toLowerCase(),
        EMAIL : EMAIL.toLowerCase(),
        HABILITADO ,
        LABORATORIO,
        ADMIN 
      })
    })
    console.log()
    alert('Usuario cargado: ' + NOMBRE)
    router.push("/administrarusuarios")

  }

  const [USUARIO, setUSUARIO] = useState("");
  const [PASSWORD, setPASSWORD] = useState("");
  const [NOMBRE, setNOMBRE] = useState("");
  const [APELLIDO, setAPELLIDO] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [LABORATORIO, setLABORATORIO] = useState("");
  const [HABILITADO, setHABILITADO] = useState(true);
  const [ADMIN, setADMIN] = useState(false);



  console.log({ usuarioJson })
  return (
    <div className="bg-gray-900">
      <Head>
        <title>Med Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl bg-gray-900 p-16 min-h-screen min-w-screen">
        <form>
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-white bg-gray-900">USUARIO</label>
              <input value={USUARIO} onChange={(e) => setUSUARIO(e.target.value)} type="text" id="usuario" className="border text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white bg-gray-900">PASSWORD</label>
              <input value={PASSWORD} onChange={(e) => setPASSWORD(e.target.value)} type="text" id="pasword" className="border text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400" required />
            </div>
            <div>
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-white bg-gray-900">NOMBRE</label>
              <input value={NOMBRE} onChange={(e) => setNOMBRE(e.target.value)} type="text" id="nombre" className="border text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400" required />
            </div>
            <div>
              <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-white bg-gray-900">APELLIDO</label>
              <input value={APELLIDO} onChange={(e) => setAPELLIDO(e.target.value)} type="text" id="apellido" className="border text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white bg-gray-900">EMAIL</label>
              <input value={EMAIL} onChange={(e) => setEMAIL(e.target.value)} type="text" id="email" className="border text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400" required />
            </div>
            <div>
              <label htmlFor="laboratorio" className="block mb-2 text-sm font-medium text-white bg-gray-900">LABORATORIO</label>
              <select className="w-full bg-gray-700 rounded border border-gray-700 focus:ring-2  focus:ring-blue-500 focus:border-blue-500 text-base outline-none text-gray-100 py-2.5 px-3 leading-8 transition-colors duration-200 ease-in-out" required onChange={(e) => setLABORATORIO(e.target.value)}>
                      {laboratoriosJson.map(laboratorio => {
                        return (
                          <option key={laboratorio.ID} value={laboratorio.ID} className="bg-gray-700 font-white py-2 my-2">{laboratorio.NOMBRE}</option>
                        )
                      })}
                    </select>
            </div>
            <div>
              <label htmlFor="habilitado" className="block mb-2 text-sm font-medium text-white bg-gray-900">HABILITADO</label>
              <select id="habilitado" onChange={(e) => setHABILITADO(e.target.value)} className=" border  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
                <option value="true">SI</option>
                <option value="false">NO</option>
              </select>
            </div>
            <div>
              <label htmlFor="ADMIN" className="block mb-2 text-sm font-medium text-white bg-gray-900">ADMIN</label>
              <select id="ADMIN" onChange={(e) => setADMIN(e.target.value)} className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
                <option value="false">NO</option>
                <option value="true">SI</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button type="submit" className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-2/5 px-5 py-2.5 text-center bg-red-500 hover:bg-red-800 focus:ring-gray-100 m-6" onClick={handleNuevoUser}>Nuevo</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default user