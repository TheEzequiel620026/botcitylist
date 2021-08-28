const app = require('express').Router();
const db = require("../../../database/models/servers/server.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[botcity.xyz/servers]: Analytics enrutador cargado.");

app.get("/:guildID/analytics", global.checkAuth, async (req, res) => {
    let serverData = await db.findOne({
        id: req.params.guildID
    });
    if (!serverData) return res.redirect("/error?code=404&message=Ingresó un ID de servidor no válido.");

    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/error?code=404&message=Ingresó un ID de servidor no válido.");
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
	    res.render("servers/server/analytics.ejs", {
	        bot: global.Client,
	        path: req.path,
	        config: global.config,
	        user: req.isAuthenticated() ? req.user : null,
	        req: req,
	        roles:global.config.server.roles,
	        channels: global.config.server.channels,
	        data: serverData
	    });
});

module.exports = app;