import { dbConnect } from "utils/mongoose";
import Laboratorio from "models/Laboratorio";


dbConnect();

export default async function (req, res) {
    switch (req.method) {
        case "POST":
            console.log("POST nuevo laboratorio");
            console.log(req.body);
            try {
                const lab = await Laboratorio.create(req.body);
                res.status(201).json({status: "ok", mensaje: `se creo el laboratorio ${lab.NOMBRE} con ID ${lab._id}`});
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
            break;

        default:
            res.status(405).json({status: "error", mensaje: "metodo no permitido"});
            break;
    }
}