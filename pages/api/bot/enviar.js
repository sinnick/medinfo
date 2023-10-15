const { Bot } = require("grammy");
const bot = new Bot(process.env.BOT_TOKEN);
require('dotenv').config();

bot.command("start", (ctx) => ctx.reply("Todavia no configuro este comando"));
bot.start();

export default async function (req, res) {
    switch (req.method) {
        case "POST":
            //parse body
            let body = await JSON.parse(req.body);
            const { mensaje } = body;
            console.log({mensaje});
            try {
                bot.api.sendMessage(-848779078, mensaje);
                res.status(200).send(`aviso por telegram: ${mensaje}`);
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
