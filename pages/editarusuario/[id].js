import { useState } from "react"
import { useRouter } from "next/router"
import { dbConnect } from "utils/mongoose";
import Usuario from "models/Usuario";
import Head from "next/head";	

export async function getServerSideProps(req) {
  dbConnect();
  const { id } = req.query
  const usuario = await Usuario.findById(id);
  const usuarioJSON = JSON.parse(JSON.stringify(usuario));

  return {
    props: { usuarioJSON }
  }

}


const user = ({ usuarioJSON }) => {

  const router = useRouter()

  const handleEditado = (e) => {
    e.preventDefault();
    fetch(`/api/usuario/${usuarioJSON._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        USUARIO : USUARIO.toLowerCase(),
        PASSWORD : PASSWORD.toLowerCase(),
        NOMBRE : NOMBRE.toLowerCase(),
        APELLIDO : APELLIDO.toLowerCase(),
        EMAIL : EMAIL.toLowerCase(),
        HABILITADO,
        LABORATORIO,
        ADMIN 
      })
    })
    alert('usuario editado');
    router.push("/administrarusuarios")

  }

  const handleEliminar = async (e) => {
    e.preventDefault();
    if (confirm('Desea eliminar el usuario')) {
      fetch(`/api/usuario/${usuarioJSON._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      alert('usuario eliminado');
      router.push("/administrarusuarios")
    } else {
      alert('Operacion cancelada');
      router.push(`/editarusuario/${usuarioJSON._id}`)
    }

  }

  const [USUARIO, setUSUARIO] = useState(usuarioJSON.USUARIO)
  const [PASSWORD, setPASSWORD] = useState(usuarioJSON.PASSWORD)
  const [NOMBRE, setNOMBRE] = useState(usuarioJSON.NOMBRE)
  const [APELLIDO, setAPELLIDO] = useState(usuarioJSON.APELLIDO)
  const [EMAIL, setEMAIL] = useState(usuarioJSON.EMAIL)
  const [LABORATORIO, setLABORATORIO] = useState(usuarioJSON.LABORATORIO)
  const [HABILITADO, setHABILITADO] = useState(usuarioJSON.HABILITADO)
  const [ADMIN, setADMIN] = useState(usuarioJSON.ADMIN)



  console.log({ usuarioJSON })
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
              <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-white">USUARIO</label>
              <input value={USUARIO} onChange={(e) => setUSUARIO(e.target.value)} type="text" id="usuario" className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">PASSWORD</label>
              <input value={PASSWORD} onChange={(e) => setPASSWORD(e.target.value)} type="text" id="pasword" className="border  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-white">Nombre</label>
              <input value={NOMBRE} onChange={(e) => setNOMBRE(e.target.value)} type="text" id="nombre" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-white">APELLIDO</label>
              <input value={APELLIDO} onChange={(e) => setAPELLIDO(e.target.value)} type="text" id="apellido" className="border  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">email</label>
              <input value={EMAIL} onChange={(e) => setEMAIL(e.target.value)} type="text" id="email" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="laboratorio" className="block mb-2 text-sm font-medium text-white">laboratorio</label>
              <input value={LABORATORIO} onChange={(e) => setLABORATORIO(e.target.value)} type="number" id="laboratorio" className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="habilitado" className="block mb-2 text-sm font-medium text-white">HABILITADO</label>
              <select id="habilitado" onChange={(e) => setHABILITADO(e.target.value)} className="border   text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
                <option value="true">SI</option>
                <option value="false">NO</option>
              </select>
            </div>
            <div>
              <label htmlFor="ADMIN" className="block mb-2 text-sm font-medium text-white">ADMIN</label>
              <select id="ADMIN" onChange={(e) => setADMIN(e.target.value)} className="border  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
                <option value="true">SI</option>
                <option value="false">NO</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button type="submit" className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-2/5 px-5 py-2.5 text-center bg-red-500 hover:bg-red-800 focus:ring-gray-100 m-6" onClick={handleEditado}>Enviar</button>
          </div>
          <div className="flex items-center justify-center w-full">
            <button type="submit" className="text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-2/5 px-5 py-2.5 text-center bg-yellow-500 hover:bg-yellow-800 focus:ring-gray-100 m-6" onClick={handleEliminar}>Eliminar</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default user