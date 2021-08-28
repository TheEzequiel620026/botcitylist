const app = require('express').Router();
const botsdata = require("../../../database/models/botlist/bots.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[botcity.xyz/servers]: Edit enrutador cargado.");

app.get("/bot/:botID/announcement", global.checkAuth, async (req, res) => {
  let botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    if (!botdata) return res.redirect("/error?code=404&message=Ingresaste un ID de bot no válido.")
    if (req.user.id == botdata.ownerID || botdata.coowners.includes(req.user.id)) {
	    res.render("botlist/bot/announcement.ejs", {
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


app.post("/bot/:botID/announcement", global.checkAuth, async (req, res) => {
    let rBody = req.body;
    let {
        title,
        content,
    } = req.body;
    if (!req.params.botID || !content || !title) return res.send({
        error: true,
        message: "Llene los espacios en blanco del mosto."
    });
    if (String(rBody['coowners']).split(',').length > 3) return res.redirect("?error=true&message=Puede agregar hasta 3 CO-Owners..")
    if (String(rBody['coowners']).split(',').includes(req.user.id)) return res.redirect("?error=true&message=No puedes agregar a otros Co-Owners.");
    const datum = new Date().toLocaleString();
    await botsdata.findOneAndUpdate({
        botID: req.params.botID
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