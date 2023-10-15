import { dbConnect } from "utils/mongoose";
import Usuario from "models/Usuario";


dbConnect();

export default async function (req, res) {
    switch (req.method) {
        case "POST":
            console.log("POST nuevo usuario");
            console.log(req.body);
            try {
                const user = await Usuario.create(req.body);
                res.status(201).json({status: "ok", mensaje: `se creo el usuario ${user.NOMBRE} con ID ${user._id}`});
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