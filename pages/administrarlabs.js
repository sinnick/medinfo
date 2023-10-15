import Link from "next/link";
import Laboratorio from "models/Laboratorio";
import { dbConnect } from "utils/mongoose";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";	




export async function getServerSideProps() {
    dbConnect();
    const laboratorios = await Laboratorio.find();
    const laboratoriosJson = JSON.parse(JSON.stringify(laboratorios));
    console.log('consulto laboratorios')

    return {
        props: { laboratoriosJson }
    }

}

const administrarlabs = ({ laboratoriosJson }) => {

    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("usuario")) {
            alert("No tienes permisos para acceder a esta pagina");
            router.push("/");
        }
    }, [])





    return (
        <section className="text-gray-400 bg-gray-900 body-font ">
            <Head>
                <title>Med Info</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center" >
                <div className="flex flex-col text-center w-full mb-20">
                    <Link href="/admingeneral">
                        <button className="rounded-md text-white bg-red-500  font-bold py-2 w-16 uppercase border-red-500 text-sm ml-auto mb-8">
                            Volver
                        </button>
                    </Link>
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">Administracion de laboratorios</h1>
                </div>
                <div className="flex flex-wrap m-4 justify-evenly lg:justify-start">
                    <Link href={`/nuevolab`}>
                        <button className="text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-lg mt-6 ml-4 mb-4">Nuevo</button>
                    </Link>
                    {laboratoriosJson.map(laboratorio => {
                        return (
                            <div className="p-4 md:max-w-1/3 min-w-full">
                                <div className="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col ">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0 min-w-max">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="none" d="M1.683,3.39h16.676C18.713,3.39,19,3.103,19,2.749s-0.287-0.642-0.642-0.642H1.683
								c-0.354,0-0.641,0.287-0.641,0.642S1.328,3.39,1.683,3.39z M1.683,7.879h11.545c0.354,0,0.642-0.287,0.642-0.641
								s-0.287-0.642-0.642-0.642H1.683c-0.354,0-0.641,0.287-0.641,0.642S1.328,7.879,1.683,7.879z M18.358,11.087H1.683
								c-0.354,0-0.641,0.286-0.641,0.641s0.287,0.642,0.641,0.642h16.676c0.354,0,0.642-0.287,0.642-0.642S18.713,11.087,18.358,11.087z
								 M11.304,15.576H1.683c-0.354,0-0.641,0.287-0.641,0.642s0.287,0.641,0.641,0.641h9.621c0.354,0,0.642-0.286,0.642-0.641
								S11.657,15.576,11.304,15.576z"></path>
                                            </svg>
                                        </div>
                                        <h2 className="text-white text-lg title-font font-medium">{laboratorio.NOMBRE}</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-left text-md">ID: <span className="text-red-500 text-sm">{laboratorio.ID}</span></h4>
                                        <h4 className="text-left text-md">Nombre: <span className="text-red-500 text-sm">{laboratorio.NOMBRE}</span></h4>
                                        <h4 className="text-left text-md">Activo: <span className="text-red-500 text-sm">{laboratorio.ACTIVO ? "SI" : "NO"}</span></h4>
                                        <h4 className="text-left text-md">Fecha de pago: <span className="text-red-500 text-sm">{laboratorio.FECHA_DE_PAGO}</span></h4>
                                        <h4 className="text-left text-md">Fecha de expiracion: <span className="text-red-500 text-sm">{laboratorio.FECHA_DE_EXPIRACION}</span></h4>
                                        <h4 className="text-left text-md">Cantidad de PDF: <span className="text-red-500 text-sm">{laboratorio.LIMITE_DE_PDF}</span></h4>
                                        <h4 className="text-left text-md">Vencimiento de PDF (dias): <span className="text-red-500 text-sm">{laboratorio.DIAS_PDF}</span></h4>
                                    </div>
                                    <Link href={`/editarlab/${laboratorio._id}`}>
                                        <button className="text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-lg -mb-1 mt-6">Editar</button>
                                    </Link>
                                </div>
                            </div>

                        )
                    })}


                </div>
            </div>
        </section>
    )
}

export default administrarlabs