const mongoose = require('mongoose');

const schema = mongoose.Schema({
    "ID": Number,
    "NOMBRE": String,
    "DESCRIPCION": String,
    "ACTIVO": Boolean,
    "FECHA_DE_PAGO": String,
    "FECHA_DE_EXPIRACION": String,
    "LIMITE_DE_PDF": Number,
    "DIAS_PDF": Number,
    "EMAIL": String,
});
    

export default mongoose.models.Laboratorio || mongoose.model('Laboratorio', schema);
 
