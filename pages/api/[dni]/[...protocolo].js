const fs = require('fs');
import { dbConnect } from "utils/mongoose"
import Practica from "models/Practica"


export default async function practica(req, res) {
    dbConnect();
    const dni = req.query.dni
    const protocolo = req.query.protocolo[0]
    const laboratorio = req.query.protocolo[1]

    console.log('buscando practica', "PROTOCOLO" + req.query.protocolo, "DNI" + req.query.dni, "LABORATORIO" + req.query.laboratorio)

    const practica = await Practica.findOne({ "PROTOCOLO": protocolo, "DNI": dni, "LABORATORIO": laboratorio });
    if (practica) {
        let update = { "VISTO": true };
        let filter = { "PROTOCOLO": protocolo, "DNI": dni };
        console.log("practica encontrada", practica.FILENAME);
        await Practica.findOneAndUpdate(filter, update)

        //reescribir para poder tener alerta por telegram
        fs.readdirSync('pdf/procesados', { withFileTypes: true }).forEach(async (file) => {
            let file_laboratorio = file.name.split('_')[0] * 1;
            let file_protocolo = file.name.split('_')[1] * 1;
            let file_dni = file.name.split('_')[2] * 1;
            if ((file_protocolo == protocolo) && (file_dni == dni) && (file_laboratorio == laboratorio)) {
                let pdf = fs.readFileSync('pdf/procesados/' + file.name)
                res.setHeader('Content-Type', 'application/pdf');
                res.status(200).send(pdf);
            }
        })
    } else {
        console.log("No se encontro el archivo")
        res.status(400).json("No se encontro el archivo")
    }


}