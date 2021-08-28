const app = require('express').Router();
const sdata = require("../../../database/models/servers/server.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[botcity.xyz/servers]: Edit enrutador cargado.");

app.get("/:guildID/edit", global.checkAuth, async (req, res) => {
    let serverData = await sdata.findOne({
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
    res.render("servers/server/edit.ejs", {
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


app.post("/:guildID/edit", global.checkAuth, async (req, res) => {
    let serverData = await sdata.findOne({
        id: req.params.guildID
    });
    if (!serverData) return res.redirect("/error?code=404&message=Ingresó una ID de servidor no válida.");
    let {
        link,
        shortDesc,
        longDesc,
        tags,
        autoCreate
    } = req.body;
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!req.params.guildID || !longDesc || !shortDesc || !tags) return res.send({
        error: true,
        message: "Llene los espacios en blanco del mosto."
    });
        if(!link && !autoCreate) return res.send({ error: true, message: "Llene los espacios en blanco del mosto."});
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
    await sdata.findOneAndUpdate({
        id: req.params.guildID
    }, {
        $set: {
            name: guild.name,
            icon: guild.iconURL({ dynamic: true }),
            ownerID: guild.owner.id ? guild.owner.id : req.user.id,
            longDesc: longDesc,
            shortDesc: shortDesc,
            tags: tags
        }
    }, { upsert: true })
    if(autoCreate === "true") {
    guild.fetchInvites().then(async fetchinvite => {
      fetchinvite.array().find(a => a.inviter.id === client.user.id)
        ? fetchinvite.array().find(a => a.inviter.id === client.user.id).code
        : await guild.channels.cache.random().createInvite({ maxAge: 0 });
    });
    guild.fetchInvites().then(async fetchinvite => {
      let inviteURL = fetchinvite
        .array()
        .find(a => a.inviter.id === client.user.id).url;
    await sdata.findOneAndUpdate({
        id: req.params.guildID
    }, {
        $set: {
            link: inviteURL
        }
    }, { upsert: true })
    })

    } else {
    await sdata.findOneAndUpdate({
        id: req.params.guildID
    }, {
        $set: {
            link: req.body.link
        }
    }, { upsert: true })
    }

    return res.send({
        success: true,
        message: "Servidor editado con éxito."
    });
})

module.exports = app;