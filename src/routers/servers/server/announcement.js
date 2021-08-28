const app = require('express').Router();
const sdata = require("../../../database/models/servers/server.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[botcity.xyz/servers]: Edit enrutador cargado.");

app.get("/:guildID/announcement", global.checkAuth, async (req, res) => {
    let serverData = await sdata.findOne({
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
    res.render("servers/server/announcement.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles: global.config.server.roles,
        channels: global.config.server.channels,
        data: serverData
    })
});


app.post("/:guildID/announcement", global.checkAuth, async (req, res) => {
    let serverData = await sdata.findOne({
        id: req.params.guildID
    });
    if (!serverData) return res.redirect("/error?code=404&message=Ingresó un ID de servidor no válido.");
    let {
        title,
        content,
    } = req.body;
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!req.params.guildID || !content || !title) return res.send({
        error: true,
        message: "Llene los espacios en blanco del mosto."
    });
    if (!guild) {
        await sdata.deleteOne({
            id: req.params.guildID
        })
        return res.send({
            error: true,
            message: "Servidor eliminado del sistema porque me has kickeado."
        });
    }
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
    if (!member) return res.redirect(
    	'/error?code=403&message=Solo puede agregar servidores con ADMINISTRADOR autorización.'
    );
    if (!member.permissions.has("ADMINISTRATOR")) return res.redirect(
    	'/error?code=403&message=Solo puede agregar servidores con ADMINISTRADOR autorización.'
    );
    const datum = new Date().toLocaleString();
    await sdata.findOneAndUpdate({
        id: req.params.guildID
    }, {
        $set: {
            annoucementdesc: content,
            annoucementtitle: title,
            annoucementdate: datum,
        }
    }, function(err, docs) { })
    return res.send({
        success: true,
        message: "Anunciado con éxito"
    });
})

module.exports = app; 