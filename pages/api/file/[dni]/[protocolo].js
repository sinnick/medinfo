const fs = require('fs');
import { dbConnect } from "utils/mongoose"
import Practica from "models/Practica"
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})


export default async function practica(req, res) {
    dbConnect();

    const practica = await Practica.findOne({ "PROTOCOLO": req.query.protocolo, "DNI": req.query.dni });
    if (practica) {
        res.status(200).send(practica);
    } else {
        console.log("No se encontro el protocolo")
        res.status(400).json("No se encontro el protocolo")

    }

}