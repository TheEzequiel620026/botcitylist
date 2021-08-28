const app = require('express').Router();
const Discord = require("discord.js");
const codesSchema = require("../../../database/models/codes.js");
const client = global.Client;
const channels = global.config.server.channels,
	  roles = global.config.server.roles;

console.log("[botcity.xyz]: Admin/CodeShare/Add enrutador cargado.");

app.post("/admin/addcode", global.checkAuth, async (req, res) => {
    const rBody = req.body;
    let kod = makeid(36);
    await new codesSchema({
        code: kod,
        codeName: rBody['codename'],
        codeCategory: rBody['category'],
        codeDesc: rBody['codedesc'],
    }).save()
    if (rBody['main']) {
        await codesSchema.updateOne({
            code: kod
        }, {
            $set: {
                main: req.body.main
            }
        });
    }
    if (rBody['commands']) {
        await codesSchema.updateOne({
            code: kod
        }, {
            $set: {
                commands: req.body.commands
            }
        });
    }
    client.channels.cache.get(global.config.server.channels.codelog).send(new Discord.MessageEmbed()
        .setTitle("¡Nuevo código agregado!").setColor("GREEN").setFooter(config.footer)
        .setDescription(`El usuario llamado **[${req.user.username}](https://botcity.xyz/user/${req.user.id})** agregó el código llamado **${rBody['codename']}** al sistema.`)
        .addField("Code Link", `https://botcity.xyz/codes/view/${kod}`, true)
        .addField("Code Descripción", rBody['codedesc'], true)
        .addField("Code Categoría", rBody['category'], true)
    )
    res.redirect('/code/' + kod)
});
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = app;
