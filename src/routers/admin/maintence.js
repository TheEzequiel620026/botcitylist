const app = require('express').Router();
const maintenceSchema = require("../../database/models/maintence.js");
const client = global.Client;
const channels = global.config.server.channels,
	  roles = global.config.server.roles;

console.log("[botcity.xyz]: Admin/Maintence enrutador cargado.");

app.get("/admin/maintence", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    res.render("admin/administrator/maintence.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
});
app.post("/admin/maintence", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    let bakimdata = await maintenceSchema.findOne({
        server: config.server.id
    });
    if (bakimdata) return res.redirect('../admin/maintence?error=true&message=El modo de mantenimiento ya se ha activado para este sitio.');
    client.channels.cache.get(global.config.server.channels.webstatus).send(`<:off:878002283164610571> Botcity se ha cambiado a __Mantenimiento__ debido a **${req.body.reason}** [||<@everyone>||]`).then(a => {
        new maintenceSchema({
            server: config.server.id,
            reason: req.body.reason,
            bakimmsg: a.id
        }).save();
    })
    return res.redirect('../admin/maintence?success=true&message=Mantenimiento abierto.');
});
app.post("/admin/unmaintence", global.checkAuth, async (req, res) => {
    const dc = require("discord.js");
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    let bakimdata = await maintenceSchema.findOne({
        server: config.server.id
    });
    if (!bakimdata) return res.redirect('../admin/maintence?error=true&message=De todos modos, el sitio web no está en modo de mantenimiento.');
    const bakimsonaerdikardesDisbots = new dc.MessageEmbed()
        .setAuthor("BotCity.xyz", client.user.avatarURL())
        .setThumbnail(client.user.avatarURL())
        .setColor("GREEN")
        .setDescription(`<:on:878003482169323540> BotCity está **activo** nuevamente!\n[Haga click para redirigirte a la página](https://botcity.xyz)`)
        .setFooter("BotCity © All rights reserved.");
    await client.channels.cache.get(channels.webstatus).messages.fetch(bakimdata.bakimmsg).then(a => {
        a.edit(`~~ <:on:878003482169323540> BotCity se ha cambiado a __Mantenimiento__ debido a **${bakimdata.reason}** ~~`, bakimsonaerdikardesDisbots)
    })
    client.channels.cache.get(channels.webstatus).send(".").then(b => {
        b.delete({
            timeout: 500
        })
    })
    await maintenceSchema.deleteOne({
        server: config.server.id
    }, function(error, server) {
        if (error) console.log(error)
    });
    return res.redirect('../admin/maintence?success=true&message=El modo de mantenimiento se ha cerrado correctamente.');
});

module.exports = app;