import { dbConnect } from "utils/mongoose";
import Usuario from "models/Usuario";


dbConnect();

export default async function (req, res) {

    switch (req.method) {
        case "GET":
            console.log("GET usuarios");
            try {
                const users = await Usuario.find();
                res.status(200).json(users);
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
            break;
        case "POST":
            console.log("POST Usuarios");
            try {
                const user = await Usuario.create(req.body);
                res.status(201).json({status: "ok", mensaje: `se creo el Usuario ${user.NOMBRE} con ID ${user._id}`});
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