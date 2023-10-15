'use client'
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import logo from "../assets/log.png";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  // const router = useRouter();
  const [dni, setDni] = useState('');
  const [protocolo, setProtocolo] = useState('');
  const [laboratorio, setLaboratorio] = useState('SELECCIONE UN LABORATORIO');


  const checkDNI = (caracter) => {
    if (((caracter * 1) / (caracter * 1) === 1) && (caracter * 1) > 0) {
      setDni(caracter);
    }
  }
  const checkProtocolo = (caracter) => {
    if (((caracter * 1) / (caracter * 1) === 1) && (caracter * 1) > 0) {
      setProtocolo(caracter);
    }
  }


  const handleBuscar = () => {
    if (laboratorio == 'SELECCIONE UN LABORATORIO') {
      toast.error('Seleccione un laboratorio', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false
      })
      return
    }

    if (dni == '' || protocolo == '') {
      toast.error('Ingrese DNI y protocolo por favor', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false
      })
      return
    }


    // console.log(dni)
    // console.log(protocolo)
    console.log(`fetching /api/${dni || 0}/${protocolo || 0}/${laboratorio || 0}`)
    fetch(`/api/${dni || 0}/${protocolo || 0}/${laboratorio || 0}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          console.log('archivo encontrado, ', res)
          toast.success("Protocolo encontrado", res.NOMBRE)
          setTimeout(() => {
            router.push({
              pathname: "/resultado",
              query: {
                dni: dni,
                protocolo: protocolo,
                laboratorio: laboratorio
              }
            })
          }, 3000);
        } else {
          toast.error("No se encontro el protocolo")
        }
      })
      .catch(err => {
        toast.error("No se encontro el protocolo")
        console.log(err)
      })
  }

  return (
    <section className="text-gray-400 bg-gray-900 body-font h-screen ">
      <Head>
        <title>Med Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto flex flex-col px-5 pt-8 justify-center items-center">
        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          <div className="w-full">
            <span className="text-green-400 text-8xl font-bold">Med</span><span className="text-white text-8xl font-bold">Info</span>
          </div>
          <div className="w-full">
            <span className="text-white text-lg font-semibold">Sistema integrado de informes médicos</span>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="relative mr-4 lg:w-full xl:w-1/2 w-4/5 md:w-full text-center">
              <p className="text-md mt-8 text-gray-300 mb-6 w-full">Por favor, ingrese sus datos</p>
              <form>
                <div className="grid gap-6 mb-6">
                  <div>
                    <select className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-green-900 focus:bg-transparent focus:border-green-500 text-base outline-none text-gray-100 py-2.5 px-3 leading-8 transition-colors duration-200 ease-in-out" required onChange={(e) => setLaboratorio(e.target.value)}>
                      {/* <option className="bg-gray-900 font-white py-2 my-2" >{laboratorio}</option> */}
                      <option className="bg-gray-900 font-white py-2 my-2" >{'asd'}</option>
                      {/* {laboratoriosJson.map(laboratorio => {
                        return (
                          <option key={laboratorio.ID} value={laboratorio.ID} className="bg-gray-900 font-white py-2 my-2">{laboratorio.NOMBRE}</option>
                        )
                      })} */}

                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="dni"
                      className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-green-900 focus:bg-transparent focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="DNI"
                      onChange={(e) => checkDNI(e.target.value)}
                      onKeyDown={(e) => {
                        e.keyCode === 13 ? document.getElementById("protocolo").focus() : null;
                        (e.keyCode === 8 && dni.length == 1) ? setDni('') : null;
                      }}
                      required
                      value={dni}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="protocolo"
                      className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-green-900 focus:bg-transparent focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="PROTOCOLO"
                      onChange={(e) => checkProtocolo(e.target.value)}
                      onKeyDown={(e) => {
                        e.keyCode === 13 ? handleBuscar() : null;
                        (e.keyCode === 8 && protocolo.length == 1) ? setProtocolo('') : null;
                      }}
                      required
                    />
                  </div>
                </div>
              </form>
              <button className="rounded-md text-black bg-green-400  font-bold py-2 w-full uppercase text-md" onClick={handleBuscar}>
                Buscar &#128270;
              </button>
              <div className="flex flex-wrap mt-24 justify-center">
                <Link href="/administracion">
                  <button className="rounded-md text-black bg-green-400  font-bold py-2 w-48 uppercase border-green-500 text-sm ml-auto mr-5">
                    &#128274; Admin
                  </button>
                </Link>
                <ToastContainer
                  theme="dark"
                  position="bottom-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={true}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
