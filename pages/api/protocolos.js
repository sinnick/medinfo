import { dbConnect } from "utils/mongoose";
import Practica from "models/Practica";


dbConnect();

export default async function (req, res) {

    if (req.method == "GET") {
        console.log("GET Protocolos", req.body);
        try {
            let filter = { "LABORATORIO": req.body.laboratorio };
            const practicas = await Practica.find(filter);
            if (practicas.length > 0) {
            res.status(200).json({ status: "ok", practicas: practicas });
            } else {
                res.status(200).json({ status: "ok", practicas: [] });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
        res.status(405).json({ status: "error", mensaje: "metodo no permitido" });
    }
}