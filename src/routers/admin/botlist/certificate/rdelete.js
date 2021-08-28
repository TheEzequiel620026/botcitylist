const app = require('express').Router();
const botsdata = require("../../../../database/models/botlist/bots.js");
const codesSchema = require("../../../../database/models/codes.js");
const uptimedata = require("../../../../database/models/uptime.js");
const appsdata = require("../../../../database/models/botlist/report-apps.js");
let sitedatalari = require("../../../../database/models/analytics-site.js");

console.log("[botcity.xyz]: Admin/Botlist/report Decline enrutador cargado.");
const roles = global.config.server.roles;
const channels = global.config.server.channels;
const client = global.Client;
app.get("/admin/delete/:botID/report", global.checkAuth, async (req, res) => {
    let rBody = req.body; 
    const botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    client.channels.cache.get(channels.botlog).send(`<a:no:877684318485495819> El reporte aplicado al bot de <@${botdata.ownerID}> ha sido eliminada.`)
    await appsdata.deleteOne({
        botID: req.params.botID
    })
    return res.redirect(`/admin/report-apps?success=true&message=Reporte eliminado.`)
});

module.exports = app;