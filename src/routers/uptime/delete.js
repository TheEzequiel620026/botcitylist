const app = require('express').Router();
const path = require("path");
const uptimedata = require("../../database/models/uptime.js");
const roles = global.config.server.roles,
      channels = global.config.server.channels;
const client = global.Client;
const Discord = require("discord.js");

console.log("[botcity.xyz]: Uptime/Delete enrutador cargado.");

app.get("/:code/delete", global.checkAuth, async (req, res) => {
                const dde = await uptimedata.findOne({
                    code: req.params.code
                });
                if (!dde) return res.redirect('/uptime/links?error=true&message=No existe tal sitio en el sistema.')
                uptimedata.findOne({
                    'code': req.params.code
                }, async function(err, docs) {
                    if (docs.userID != req.user.id) return res.redirect('/uptime/links?error=true&message=El enlace que intentó eliminar no le pertenece.');
                    res.redirect('/uptime/links?success=true&message=El enlace se ha eliminado correctamente del sistema.');
                    await uptimedata.deleteOne({
                        code: req.params.code
                	});
				})
})

module.exports = app;