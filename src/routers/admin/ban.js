const app = require('express').Router();
const banSchema = require("../../database/models/site-ban.js");
const channels = global.config.server.channels,
      roles = global.config.server.roles;
const client = global.Client;

console.log("[botcity.xyz]: Admin/Ban enrutador cargado.");

app.get("/admin/userban", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    let bandata = await banSchema.find();
    res.render("admin/administrator/user-ban.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels,
        bandata: bandata
    })
});
app.post("/admin/userban", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    new banSchema({
        user: req.body.userID,
        sebep: req.body.reason,
        yetkili: req.user.id
    }).save()
    return res.redirect('../admin/userban?success=true&message=Usuario baneado.');
});
app.post("/admin/userunban", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    banSchema.deleteOne({
        user: req.body.userID
    }, function(error, user) {
        if (error) console.log(error)
    })
    return res.redirect('../admin/userban?success=true&message=Usuario desbaneado');
});

module.exports = app;