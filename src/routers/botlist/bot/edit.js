const app = require('express').Router();
const botsdata = require("../../../database/models/botlist/bots.js");
const client = global.Client;
const channels = global.config.server.channels;

console.log("[botcity.xyz]: Botlist/Edit enrutador cargado.");

app.get("/bot/:botID/edit", global.checkAuth, async (req, res) => {
    let botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    if (!botdata) return res.redirect("/error?code=404&message=Ingresaste una ID de bot no válida.")
    if (req.user.id == botdata.ownerID || botdata.coowners.includes(req.user.id)) {
	    res.render("botlist/bot/bot-edit.ejs", {
	        bot: global.Client,
	        path: req.path,
	        config: global.config,
	        user: req.isAuthenticated() ? req.user : null,
	        req: req,
	        roles:global.config.server.roles,
	        channels: global.config.server.channels,
	        botdata: botdata
	    })
    } else {
        res.redirect("/error?code=404&message=Para editar este bot, debes ser uno de sus owners.");
    }
});


app.post("/bot/:botID/edit", global.checkAuth, async (req, res) => {
    let rBody = req.body;
    let botdata = await botsdata.findOne({
        botID: req.params.botID
    })
    if (String(rBody['coowners']).split(',').length > 3) return res.redirect("?error=true&message=Puede agregar hasta 3 CO-Owners..")
    if (String(rBody['coowners']).split(',').includes(req.user.id)) return res.redirect("?error=true&message=No puedes agregar a otros Co-Owners.");
    await botsdata.findOneAndUpdate({
        botID: req.params.botID
    }, {
        $set: {
            botID: req.params.botID,
            ownerID: botdata.ownerID,
            prefix: rBody['prefix'],
            longDesc: rBody['longDesc'],
            shortDesc: rBody['shortDesc'],
            tags: rBody['tags'],
            github: rBody['github'],
            website: rBody['website'],
            support: rBody['support'],
            invite: rBody['invite'],
            coowners: String(rBody['coowners']).split(','),
            backURL: rBody['background'],
        }
    }, function(err, docs) {})
    client.users.fetch(req.params.botID).then(a => {
        client.channels.cache.get(channels.botlog).send(`<a:si:877686317536907324> <@${req.user.id}> editado **${a.tag}**`)
        res.redirect(`?success=true&message=Tu bot ha sido editado.&botID=${req.params.botID}`)
    })
})

module.exports = app;