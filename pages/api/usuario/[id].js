import { dbConnect } from "utils/mongoose";
import Usuario from "models/Usuario";


export default async (req, res) => {

    const { method, body, query: { id } } = req;


    switch (method) {
        case "GET":
            try {
                await dbConnect();
                const usuario = await Usuario.findById(id);
                console.log('GET 1 USUARIO: ', usuario);
                return res.status(200).json(usuario);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        case "POST":
            console.log('POST')
            break;
        case "PUT":
            console.log('PUT', body);
            try {
                await dbConnect();
                const usuarioUpdateado = await Usuario.findByIdAndUpdate(id, body, { new: true });
                console.log(usuarioUpdateado);
                return res.status(200).json(usuarioUpdateado);

            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        case "DELETE":
            try {
                await dbConnect();
                const usuarioBorrrado = await Usuario.findByIdAndDelete(id);
                if (!usuarioBorrrado) {
                    return res.status(404).json({ error: "No se encontró el usuario" });
                }
                console.log(usuarioBorrrado);
                return res.status(200).json(usuarioBorrrado);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        default:
            return res.status(400).json(`${method} no soportado`);
            break;
    }
}