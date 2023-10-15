import { useState } from "react"
import { useRouter } from "next/router"
import { dbConnect } from "utils/mongoose";
import Laboratorio from "models/Laboratorio";
import Head from "next/head";	

export async function getServerSideProps(req) {
  dbConnect();
  const { id } = req.query
  const laboratorio = await Laboratorio.findById(id);
  const laboratorioJSON = JSON.parse(JSON.stringify(laboratorio));

  return {
    props: { laboratorioJSON }
  }

}





const lab = ({ laboratorioJSON: laboratorio }) => {

  const router = useRouter()

  const handleNuevoLab = (e) => {
    e.preventDefault();
    fetch(`/api/laboratorios/nuevo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID,
        NOMBRE,
        DESCRIPCION,
        FECHA_DE_PAGO,
        FECHA_DE_EXPIRACION,
        EMAIL,
        LIMITE_DE_PDF,
        DIAS_PDF,
        ACTIVO
      })
    })
    alert('Laboratorio cargado: ' + NOMBRE)
    router.push("/administrarlabs")

  }

  const [ID, setID] = useState('')
  const [NOMBRE, setNOMBRE] = useState('')
  const [DESCRIPCION, setDESCRIPCION] = useState('')
  const [FECHA_DE_PAGO, setFECHA_DE_PAGO] = useState('')
  const [FECHA_DE_EXPIRACION, setFECHA_DE_EXPIRACION] = useState('')
  const [EMAIL, setEMAIL] = useState('')
  const [LIMITE_DE_PDF, setLIMITE_DE_PDF] = useState('')
  const [DIAS_PDF, setDIAS_PDF] = useState('')
  const [ACTIVO, setACTIVO] = useState(true)




  console.log({ laboratorio })
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
              <label htmlFor="id" className="block mb-2 text-sm font-medium text-white">ID</label>
              <input value={ID} onChange={(e) => setID(e.target.value)} type="number" id="ID" className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-white">Nombre</label>
              <input value={NOMBRE} onChange={(e) => setNOMBRE(e.target.value)} type="text" id="nombre" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-white">descripcion</label>
              <input value={DESCRIPCION} onChange={(e) => setDESCRIPCION(e.target.value)} type="text" id="descripcion" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="fecha_de_pago" className="block mb-2 text-sm font-medium text-white">fecha de pago</label>
              <input value={FECHA_DE_PAGO} onChange={(e) => setFECHA_DE_PAGO(e.target.value)} type="date" id="fecha_de_pago" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
            </div>
            <div>
              <label htmlFor="fecha_de_expiracion" className="block mb-2 text-sm font-medium text-white">fecha de expiracion</label>
              <input value={FECHA_DE_EXPIRACION} onChange={(e) => setFECHA_DE_EXPIRACION(e.target.value)} type="date" id="fecha_de_expiracion" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="estado" className="block mb-2 text-sm font-medium text-white">estado</label>
              <select id="estado" onChange={(e) => setACTIVO(e.target.value)} className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">email</label>
              <input value={EMAIL} onChange={(e) => setEMAIL(e.target.value)} type="text" id="email" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="limite_de_pdf" className="block mb-2 text-sm font-medium text-white">limite de pdf</label>
              <input value={LIMITE_DE_PDF} onChange={(e) => setLIMITE_DE_PDF(e.target.value)} type="number" id="limite_de_pdf" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="dias_pdf" className="block mb-2 text-sm font-medium text-white">dias de pdf</label>
              <input value={DIAS_PDF} onChange={(e) => setDIAS_PDF(e.target.value)} type="number" id="dias_pdf" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button type="submit" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-2/5 px-5 py-2.5 text-center bg-red-500 hover:bg-red-800 focus:ring-gray-100 m-6" onClick={handleNuevoLab}>Nuevo</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default lab