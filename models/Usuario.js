const mongoose = require('mongoose');

const schema = mongoose.Schema({
    "USUARIO": String,
    "PASSWORD": String,
    "NOMBRE": String,
    "APELLIDO": String,
    "EMAIL": String,	
    "HABILITADO": Boolean,
    "ADMIN": Boolean,
    "LABORATORIO": Number,
});
    

export default mongoose.models.Usuario || mongoose.model('Usuario', schema);
 
