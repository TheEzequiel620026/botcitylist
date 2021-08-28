const app = require('express').Router();
const botsdata = require("../../database/models/botlist/bots.js");
const client = global.Client;
const channels = global.config.server.channels;

console.log("[botcity.xyz]: Botlist/Vote enrutador cargado.");

app.get("/bot/:botID/vote", async (req, res) => {
    let botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    if (!botdata) return res.redirect("/error?code=404&message=Ingresaste una ID de bot no válida.");
    if (req.user) {
        if (!req.user.id === botdata.ownerID || req.user.id.includes(botdata.coowners)) {
            if (botdata.status != "Approved") return res.redirect("/error?code=404&message=Ingresaste una ID de bot no válida.");
        }
    }
    res.render("botlist/vote.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        botdata: botdata,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})
app.post("/bot/:botID/vote", global.checkAuth, async (req, res) => {
    const votes = require("../../database/models/botlist/vote.js");
    let botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    let x = await votes.findOne({
        user: req.user.id,
        bot: req.params.botID
    })
    if (x) return res.redirect("?error=true&message=Puedes votar cada 12 horas.");
    await votes.findOneAndUpdate({
        bot: req.params.botID,
        user: req.user.id
    }, {
        $set: {
            Date: Date.now(),
            ms: 43200000
        }
    }, {
        upsert: true
    })
    await botsdata.findOneAndUpdate({
        botID: req.params.botID
    }, {
        $inc: {
            votes: 1
        }
    })
    client.channels.cache.get(channels.votes).send(`**${botdata.username}** acaba de recibir **+ 1 voto** de **${req.user.username}** **\`[Total Votos ${botdata.votes + 1}]\`**`)
    if(botdata.votes+1 == 100) {
    client.channels.cache.get(channels.votes).send(`¡Felicitaciones ${botdata.ownerID}! Tu bot **${botdata.username}** ha alcanzado los 100 votos!!`)
    }
    if(botdata.votes+1 == 52) {
    client.channels.cache.get(channels.votes).send(`¡Felicitaciones <@${botdata.ownerID}>! Tu bot **${botdata.username}** ha alcanzado los 52 votos!!`)
    }
    return res.redirect(`/bot/${req.params.botID}/vote?success=true&message=Votó con éxito. Puede volver a votar después de 12 horas. :)`);
})


module.exports = app;