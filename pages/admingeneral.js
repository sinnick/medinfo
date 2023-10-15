import Head from "next/head";	
import Laboratorio from "models/Laboratorio";
import Practica from "models/Practica";
import Usuario from "models/Usuario";
import { dbConnect } from "utils/mongoose";
import { useRouter } from "next/router";
import { useEffect } from "react";





export async function getServerSideProps() {
    dbConnect();
    const practicas = await Practica.find();
    const laboratorios = await Laboratorio.find();
    const usuarios = await Usuario.find();
    const practicasJson = JSON.parse(JSON.stringify(practicas));
    const laboratoriosJson = JSON.parse(JSON.stringify(laboratorios));
    const usuariosJson = JSON.parse(JSON.stringify(usuarios));


    return {
        props: {
            practicasJson,
            laboratoriosJson,
            usuariosJson
        }
    }
}


const admingeneral = ({ practicasJson, laboratoriosJson, usuariosJson }) => {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("usuario")) {
            alert("No tienes permisos para acceder a esta pagina");
            router.push("/");
        }
    }, [])


    async function logOut() {
        localStorage.removeItem("laboratorio");
        localStorage.removeItem("usuario");
        router.push("/");
    }

    async function administrarUsuarios() {
        router.push("/administrarusuarios");
    }

    async function administrarPracticas() {
        router.push("/administrarpracticas");
    }

    async function administrarLaboratorios() {
        router.push("/administrarlabs");
    }


    return (
        <section className="text-gray-400 body-font bg-gray-900">
            <Head>
                <title>Med Info</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container px-5 py-8 mx-auto">
                <div className="flex flex-col text-center w-full mb-10">
                    <button onClick={logOut} className="rounded-md text-black bg-green-400  font-bold py-2 px-5 uppercase border-green-400 text-sm ml-auto mr-5 mb-10">Volver a menu principal</button>
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Administracion general de laboratorios y usuarios</h1>
                </div>
                <section className="text-gray-400 bg-gray-900 body-font mb-5">
                    <div className="container px-5 mx-auto">
                        <div className="flex flex-wrap -m-4 text-center justify-center">
                            <div className="p-4 sm:w-1/4 w-1/3">
                                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{practicasJson.length}</h2>
                                <p className="leading-relaxed">PDF</p>
                            </div>
                            <div className="p-4 sm:w-1/4 w-1/3">
                                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{laboratoriosJson.length}</h2>
                                <p className="leading-relaxed">Laboratorios</p>
                            </div>
                            <div className="p-4 sm:w-1/4 w-1/3">
                                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{usuariosJson.length}</h2>
                                <p className="leading-relaxed">Usuarios</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="flex flex-wrap  text-center justify-center">
                <button onClick={administrarUsuarios} className="rounded-md text-black bg-green-400  font-bold py-2 px-5 uppercase border-green-500 text-sm  mr-5">&#128100;    Administrar Usuarios</button>
                <button onClick={administrarLaboratorios} className="rounded-md text-black bg-green-400  font-bold py-2 px-5 uppercase border-green-500 text-sm  mr-5">&#128300;    Administrar Laboratorios</button>
            </div>
        </section >
    )
}

export default admingeneral