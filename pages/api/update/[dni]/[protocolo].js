const fs = require('fs');
import { dbConnect } from "utils/mongoose"
import Practica from "models/Practica"


export default async function practica(req, res) {
    dbConnect();

    const practica = await Practica.findOne({ "PROTOCOLO": req.query.protocolo, "DNI": req.query.dni });
    if (practica) {
        let update = { "DESCARGADO": true };
        let filter = { "PROTOCOLO": req.query.protocolo, "DNI": req.query.dni };
        await Practica.findOneAndUpdate(filter, update)
        console.log("updateo descarga de practica")
        res.status(200).json("ok")
    }
}