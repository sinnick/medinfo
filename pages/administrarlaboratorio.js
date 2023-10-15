import { useEffect, useState } from "react";
import Practica from "models/Practica";
import Laboratorio from "models/Laboratorio";
import { dbConnect } from "utils/mongoose";
import { useRouter } from "next/router";
import Head from "next/head";	



export async function getServerSideProps() {
    dbConnect();
    const practicas = await Practica.find();
    const laboratorios = await Laboratorio.find();
    const practicasJson = JSON.parse(JSON.stringify(practicas));
    const laboratoriosJson = JSON.parse(JSON.stringify(laboratorios));
    // console.log('practicasJson: ', practicasJson)
    // console.log('index.js laboratoriosJson: ', laboratoriosJson)

    return {
        props: {
            practicasJson,
            laboratoriosJson
        }
    }

}

const administrarlaboratorio = ({ practicasJson, laboratoriosJson }) => {
    const router = useRouter();

    // console.log('laboratoriosJson: ', laboratoriosJson)


    const [laboratorioID, setLaboratorioID] = useState("");
    const practicasPropias = practicasJson.filter(practica => (practica.LABORATORIO == laboratorioID));
    const laboratorio = laboratoriosJson.filter(laboratorio => (laboratorio.ID == laboratorioID));
    // console.log({ laboratorio })
    const laboratorioNombre = laboratorio[0] ? laboratorio[0].NOMBRE : "";
    const today = new Date().getTime();
    const limitDay = laboratorio[0] ? laboratorio[0].FECHA_DE_EXPIRACION : "";
    const limitDayDate = new Date(limitDay).getTime();
    const daysRemaining = Math.ceil((limitDayDate - today) / (1000 * 60 * 60 * 24));
    const diasPDF = laboratorio[0] ? laboratorio[0].DIAS_PDF : "";
    const limitePDF = laboratorio[0] ? laboratorio[0].LIMITE_DE_PDF : 0;









    useEffect(() => {
        setLaboratorioID(localStorage.getItem("laboratorio"));
    }, [])

    async function logOut() {
        localStorage.removeItem("laboratorio");
        router.push("/");
    }


    return (
        <section className="text-gray-400 body-font bg-gray-900">
            <Head>
                <title>Med Info</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container px-5 py-8 mx-auto">
                <div className="flex flex-col text-center w-full mb-10">
                    <h1 className="xl:text-6xl text-4xl font-medium title-font mb-4 text-white">{laboratorioNombre}</h1>
                </div>
                <section className="text-gray-400 bg-gray-900 body-font mb-5">
                    <div className="container px-5 mx-auto">
                        <div className="flex flex-wrap -m-4 text-center">
                            <div className="p-4 w-1/3">
                                <h2 className="xl:text-4xl title-font font-medium sm:text-xl text-xl text-white whitespace-nowrap">{practicasPropias.length} / {limitePDF}</h2>
                                <p className="leading-relaxed">PDF</p>
                            </div>
                            <div className="p-4 w-1/3">
                                <h2 className="xl:text-4xl title-font font-medium sm:text-xl text-xl text-white">{diasPDF}</h2>
                                <p className="leading-relaxed">Dias de expiracion de PDF</p>
                            </div>
                            <div className="p-4 w-1/3">
                                <h2 className="xl:text-4xl title-font font-medium sm:text-xl text-xl text-white">{daysRemaining}</h2>
                                <p className="leading-relaxed">Dias restantes de suscripcion</p>
                            </div>
                        </div>
                    </div>
                </section>
                {practicasPropias.map(practica => {
                    return (
                        <div className="p-2 max-w-full" key={practica._id}>
                            <div className="bg-gray-800 rounded flex p-2 h-full items-center hover:bg-gray-700">
                                <span className="title-font font-xs text-xs md:text-base text-white ml-1 md:ml-5 max-h-64">{`${practica.PROTOCOLO} - ${practica.NOMBRE.substr(0,20)}`}    </span>
                                <span className="title-font font-xs text-xs md:text-base text-white ml-1 md:ml-5 max-h-64">{new Date(practica.FECHA_INFORME).toLocaleString().split(',')[0]}    </span>
                                {practica.VISTO ?
                                    <div className="ml-auto rounded-md text-white bg-green-700  font-bold uppercase border-green-700 text-sm md:text-sm mr-1 md:mr-5 w-6 h-6 l text-center" title="El protocolo fue visto">
                                        V
                                    </div>
                                    :
                                    <div className="ml-auto rounded-md text-white bg-gray-600  font-bold uppercase border-gray-700 text-sm md:text-sm mr-1 md:mr-5 w-6 h-6 l text-center" title="El protocolo no ha sido visto">
                                        V
                                    </div>
                                }
                                {
                                practica.DESCARGADO ?
                                    <div className="rounded-md text-white bg-green-700  font-bold uppercase border-green-700 text-sm md:text-sm mr-1 md:mr-5 w-6 h-6 l text-center" title="El protocolo fue descargado">
                                        D
                                    </div>
                                    :
                                    <div className="rounded-md text-white bg-gray-600  font-bold uppercase border-gray-700 text-sm md:text-sm mr-1 md:mr-5 w-6 h-6 l text-center" title="El protocolo no ha sido descargado">
                                        D
                                    </div>
                                }
                            </div>

                        </div>
                    )
                })}
                <div className="flex flex-wrap mt-24 ">

                    <button onClick={logOut} className="rounded-md text-white bg-red-500  font-bold py-2 px-5 uppercase border-red-500 text-sm ml-auto mr-5">&#128274;    Cerrar sesión</button>
                </div>
            </div>
        </section >
    )
}

export default administrarlaboratorio