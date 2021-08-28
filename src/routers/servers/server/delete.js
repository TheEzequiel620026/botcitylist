const app = require('express').Router();
const db = require("../../../database/models/servers/server.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[disbots.xyz/servers]: Join enrutador cargado.");

app.get("/:guildID/delete", global.checkAuth, async (req,res) => {
    let serverData = await db.findOne({
        id: req.params.guildID
    });
    if (!serverData) return res.redirect("/error?code=404&message=Ingresó una ID de servidor no válida.");

    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/error?code=404&message=Ingresó una ID de servidor no válida.");
    const member = guild.members.cache.get(req.user.id);
    if (!member) {
        try {
            await guild.members.fetch();
            member = guild.members.cache.get(req.user.id);
        } catch (err) {
            res.send({
                error: true,
                message: `No se pudo traer a los miembros de ${guild.id}: ${err}`
            })
        }
    }
    if (!member) return res.redirect("/error?code=403&message=No autorizado.");
    if (!member.permissions.has("ADMINISTRATOR")) return res.redirect("/error?code=403&message=No autorizado.");

    await db.deleteOne({ id: req.params.guildID });
    return res.redirect('/user/'+req.user.id);
})


module.exports = app;
