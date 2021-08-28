const app = require('express').Router();
const botsdata = require("../database/models/botlist/bots.js");

console.log("[botcity.xyz]: Mini enrutador de páginas cargado.");

app.get("/error", async (req,res) => {
    res.render("error.ejs", {
    	bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/bugreport", async (req,res) => {
    res.render("botlist/bugreport.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/faq", async (req,res) => {
    res.render("botlist/faq.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})


app.get("/all-faq", async (req,res) => {
    res.render("botlist/all-faq.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/status", async (req,res) => {
    res.render("botlist/status.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/bot/:botID/announcement", async (req,res) => {
    res.render("botlist/bot/announcement.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/uneed2login", async (req,res) => {
    res.render("botlist/login.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/bot-rules", async (req,res) => {
    res.render("botlist/bot-rules.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
})

app.get("/dc", async (req,res) => {
    res.redirect(global.config.server.invite)
})
app.get("/vanity/:username", async (req,res) => {
    let botdata = await botsdata.findOne({
      vanity: req.params.username
    });
    res.redirect('https://botcity.xyz/bot/'+botdata.botID)
})
app.get("/dsl", async (req,res) => {
    res.redirect(global.config.server.dblinvite)
})
app.get("/discord", async (req,res) => {
    res.redirect(global.config.server.dblinvite)
})

app.get("/robots.txt", function(req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(`Sitemap: https://botcity.xyz/sitemap.xml`);
});

app.get("/sitemap.xml", async function(req, res) {
    let link = "<url><loc>https://botcity.xyz/</loc></url>";
    let botdataforxml = await botsdata.find()
    botdataforxml.forEach(bot => {
        link += "\n<url><loc>https://botcity.xyz/bot/" + bot.botID + "</loc></url>";
    })
    res.set('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1">${link}</urlset>`);
});

module.exports = app;