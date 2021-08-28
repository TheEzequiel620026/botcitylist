const app = require('express').Router();
const codesSchema = require("../../../database/models/codes.js");
const client = global.Client;
const channels = global.config.server.channels,
	  roles = global.config.server.roles;

console.log("[botcity.xyz]: Admin/CodeShare/Edit enrutador cargado.");

app.post("/admin/editcode/:code", global.checkAuth, async (req, res) => {
    const rBody = req.body;
    let kod = req.params.code;
    await codesSchema.findOneAndUpdate({
        code: kod
    }, {
        $set: {
            codeName: rBody['codename'],
            codeCategory: rBody['category'],
            codeDesc: rBody['codedesc'],
            main: rBody['main'],
            commands: rBody['commands'],
        }
    }, function(err, docs) {})
    client.channels.cache.get(global.config.server.channels.codelog).send(new Discord.MessageEmbed()
        .setTitle("Codigo editado!").setColor("GREEN").setFooter(config.footer)
        .setDescription(`El usuario llamado **[${req.user.username}](https://botcity.xyz/user/${req.user.id})** editó el código llamado **${rBody['codename']}**.`)
        .addField("Code Link", `https://botcity.xyz/code/${kod}`, true)
        .addField("Code Descripción", rBody['codedesc'], true)
        .addField("Code Categoría", rBody['category'], true)
    )
    res.redirect('/code/' + kod)
});

module.exports = app;