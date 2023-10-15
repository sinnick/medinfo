const fs = require('fs');
import { dbConnect } from 'utils/mongoose';
import Practica from 'models/Practica';



export default function sincronizar(req, res) {
    dbConnect();
    const files = fs.readdirSync('pdf', { withFileTypes: false });
    let updates = [];
    let failedUpdates = [];
    files.forEach(async (file) => {
        console.log('working with file', file )
        let laboratorio = file.split('_')[0];
        let protocolo = file.split('_')[1];
        let dni = file.split('_')[2];
        let nombre = file.split('_')[3];
        let fecha_informe = await getFechaInforme(file.split('_')[4]);
        // console.log({fecha_informe})
        let fecha_creacion = new Date();
        // console.log({fecha_creacion})
        let fecha_eliminacion = await getFechaEliminacion(fecha_creacion);
        // console.log({fecha_eliminacion})
        let practica = ({
            "FILENAME": file,
            "LABORATORIO": laboratorio,
            "PROTOCOLO": protocolo,
            "DNI": dni,
            "NOMBRE": nombre,
            "FECHA_INFORME": fecha_informe,
            "FECHA_CREACION": fecha_creacion,
            "FECHA_ELIMINACION": fecha_eliminacion,
            "VISTO": false,
            "DESCARGADO": false,
        });
        const query = { "PROTOCOLO": protocolo, "DNI": dni, "LABORATORIO": laboratorio };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Practica.findOneAndUpdate(query, practica, options, (err, result) => {
            if (err) {
                console.log(err);
                failedUpdates.push(file);
            } else {
                console.log(result);
                updates.push(file);
            }
        });
    })
    res.status(200).json({ "status": "ok", "updated": updates, "failed": failedUpdates });
}


async function getFechaInforme(fechaInforme) {
    let fechaInformeArray = fechaInforme.replace('.pdf', '').split('');
    let day = fechaInformeArray[0] + fechaInformeArray[1];
    let preMonth = fechaInformeArray[2] + fechaInformeArray[3];
    let year = fechaInformeArray[4] + fechaInformeArray[5] + fechaInformeArray[6] + fechaInformeArray[7];
    let month = parseInt(preMonth) - 1;

    // let fechaInformeConGuiones = fechaInformeArray.slice(0, 2).join('') + '-' + fechaInformeArray.slice(2, 4).join('') + '-' + fechaInformeArray.slice(4, 8).join('');

    let DateFechaInforme = new Date(year, month, day);
    return DateFechaInforme;
}

async function getFechaEliminacion(fecha_creacion) {
    let month = fecha_creacion.getMonth();
    let year = fecha_creacion.getFullYear();
    let day = fecha_creacion.getDate() + 1;
    month == 11 ? month = 0 : month = month + 1;
    let DateFechaEliminacion = new Date(year, month, day);
    console.log(fecha_creacion)
    console.log(DateFechaEliminacion)
    return DateFechaEliminacion;
}