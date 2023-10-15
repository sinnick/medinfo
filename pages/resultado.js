import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdf-worker.js";
import Practica from "models/Practica"
import Link from "next/link";
import Head from "next/head";
import { dbConnect } from "utils/mongoose"



pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export async function getServerSideProps(context) {
	dbConnect();
	const query = context.query
	console.log({ query })
	let resp = await Practica.findOne({ "PROTOCOLO": query.protocolo, "DNI": query.dni });
	let respuesta = JSON.parse(JSON.stringify(resp))

	return {
		props: {
			respuesta
		}
	}
}



const resultado = ({ respuesta }) => {
	useEffect(() => {
		window.history.pushState({}, null, '/resultado')
	}, [])

	console.log({ respuesta })
	const [file, setFile] = useState(`/api/${respuesta.DNI}/${respuesta.PROTOCOLO}/${respuesta.LABORATORIO}`)
	const [numPages, setNumPages] = useState(null);

	function onDocumentLoadSuccess({ numPages: nextNumPages }) {
		setNumPages(nextNumPages);
	}

	function getLink() {
		return `/api/${respuesta.DNI}/${respuesta.PROTOCOLO}/${respuesta.LABORATORIO}`
	}
	
	async function handleDownload() {
		fetch(`/api/update/${respuesta.DNI}/${respuesta.PROTOCOLO}/${respuesta.LABORATORIO}`)
		let resp = await fetch(`/api/${respuesta.DNI}/${respuesta.PROTOCOLO}/${respuesta.LABORATORIO}`)
		console.log({ resp })
		let data = await resp.blob()
		console.log({ data })
		const file = new Blob([data], { type: 'application/pdf' });
		const fileURL = URL.createObjectURL(file);
		setTimeout(() => {
			window.open(fileURL);
		}, 100)

	}

	return (
		<div className="text-gray-400 bg-gray-900 p-64 -m-64 lg:p-0 lg:m-0">
			<Head>
				<title>Med Info</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="text-gray-400 bg-gray-900 body-font">
				<div className="container px-5 py-12 mx-auto">
					<Link href="/">
						<button className="rounded-md text-white bg-red-500  font-bold py-2 w-16 uppercase border-red-500 text-sm ml-auto mb-8">
							Volver
						</button>
					</Link>
					<div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
						<h1 className="flex-grow sm:pr-16 text-xl font-medium title-font text-white">{respuesta.NOMBRE} - {respuesta.DNI}</h1>
						<a href={getLink()} download={respuesta.NOMBRE} className=" mx-2 flex-shrink-0 text-white font-bold bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mt-10 sm:mt-0">Descargar</a>
					</div>
					<div className="lg:flex lg:justify-center mt-12 mx-auto">
						<Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
							{Array.from({ length: numPages }, (_, index) => (
								<Page
									key={`page_${index + 1}`}
									pageNumber={index + 1}
									renderAnnotationLayer={false}
									renderTextLayer={false}
								/>
							))}
						</Document>
					</div>
				</div>
			</section>
		</div>
	)
}

export default resultado