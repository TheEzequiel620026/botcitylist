const app = require('express').Router();
const path = require("path");
const uptimedata = require("../../database/models/uptime.js");
const roles = global.config.server.roles,
      channels = global.config.server.channels;
const client = global.Client;
const Discord = require("discord.js");

console.log("[botcity.xyz]: Uptime/Add enrutador cargado.");

app.post("/add", global.checkAuth, async (req, res) => {
    const rBody = req.body;
    if (!rBody['link']) {
        res.send({ error: true, message: "Escribe un enlace cualquiera." });
    } else {
        if (!rBody['link'].match('https')) return res.send({ error: true, message: "Debes ingresar un enlace válido." })
        const updcode = createID(24);
        const dde = await uptimedata.findOne({
            link: rBody['link']
        });
        const dd = await uptimedata.find({
            userID: req.user.id
        });
        if (dd.length > 9) res.send({ error: true, message: "Se alcanzó el límite de tiempo de actividad." })

        if (dde) return res.send({ error: true, message: "Este enlace ya existe en el sistema." });
        client.users.fetch(req.user.id).then(a => {
            client.channels.cache.get(channels.uptimelog).send(new Discord.MessageEmbed()
                .setAuthor(a.username, a.avatarURL({
                    dynamic: true
                }))
                .setDescription("Nuevo enlace agregó un sistema de uptime.")
                .setThumbnail(client.user.avatarURL)
                .setColor("GREEN")
                .addField("User;", `${a.tag} \`(${a.id})\``, true)
                .addField("Uptime Limite;", `${dd.length+1}/10`, true)
            )
            new uptimedata({
                server: config.serverID,
                userName: a.username,
                userID: req.user.id,
                link: rBody['link'],
                code: updcode
            }).save();
        })
        res.send({ success: true, message:"Enlace agregado correctamente." });
    }
})

function createID(length) {
    var result = '';
    var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
module.exports = app;