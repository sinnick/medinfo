import { dbConnect } from "utils/mongoose";
import Laboratorio from "models/Laboratorio";


export default async (req, res) => {

    const { method, body, query: { id } } = req;


    switch (method) {
        case "GET":
            try {
                await dbConnect();
                const laboratorio = await Laboratorio.findById(id);
                console.log('GET 1 LAB: ', laboratorio);
                return res.status(200).json(laboratorio);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        case "POST":
            console.log('POST')
            break;
        case "PUT":
            try {
                await dbConnect();
                const laboratorioUpdateado = await Laboratorio.findByIdAndUpdate(id, body, { new: true });
                console.log(laboratorioUpdateado);
                return res.status(200).json(laboratorioUpdateado);

            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        case "DELETE":
            try {
                await dbConnect();
                const laboratorioBorrrado = await Laboratorio.findByIdAndDelete(id);
                if (!laboratorioBorrrado) {
                    return res.status(404).json({ error: "No se encontró el laboratorio" });
                }
                console.log(laboratorioBorrrado);
                return res.status(200).json(laboratorioBorrrado);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        default:
            return res.status(400).json(`${method} no soportado`);
            break;
    }






    // return res.status(200).json(`${method} recibido`)
}