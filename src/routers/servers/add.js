const app = require('express').Router();
const db = require("../../database/models/servers/server.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[botcity.xyz/servers]: Add Server enrutador cargado.");

app.get("/add", global.checkAuth, async (req,res) => {
  if(!client.guilds.cache.get(config.server.id).members.cache.get(req.user.id)) return res.redirect("/error?code=403&message=Para hacer esto, debes unirte a nuestro servidor de discord.");
    res.render("servers/add.ejs", {
        bot: global.clientSL,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
	})
})
app.post("/add", global.checkAuth, async (req,res) => {
  //for some reason it cannot register Link so imma change it to InviteLink
    let { guildID, InviteLink, autoCreate, shortDesc, longDesc, tags } = req.body;
    const guild = client.guilds.cache.get(req.body.guildID);
    let checkGuild = await db.findOne({ id: guildID });
    if(checkGuild) return res.send({ error: true, message: "Este servidor ya existe en el sistema." });
    if(!guildID || !longDesc || !shortDesc || !tags) return res.send({ error: true, message: "Llene los espacios en blanco del mosto."});
    if(!InviteLink && !autoCreate) return res.send({ error: true, message: "Llene los espacios en blanco del mosto."});
    if (!guild) return res.send({ error: true, message: "Primero tienes que agregarme a ese servidor." });
    const member = guild.members.cache.get(req.user.id);
    if(!member){
      try{ await guild.members.fetch();
        member = guild.members.cache.get(req.user.id);
      } catch (err) { 
      	res.send({ error: true, message: `No se pudo traer a los miembros de ${guild.id}: ${err}`})
      }
    }
    if (!member) return res.send({ error: true, message: "Solo puede agregar servidores con ADMINISTRADOR authorization." });
    if (!member.permissions.has("ADMINISTRATOR")) return res.send({ error: true, message: "Solo puede agregar servidores con ADMINISTRADOR autorización." });
    
    //on an extra object data
    let toadddata = {
          id: guildID,
          name: guild.name,
          icon: guild.iconURL({ dynamic: true }),
          ownerID: guild.owner.id ? guild.owner.id : req.user.id,
          status: "Approved",
          longDesc: req.body.longDesc,
          premium: "None",
          shortDesc: req.body.shortDesc,
          tags: req.body.tags,
          votes: 0
    };
    //adding invite link just if the invite link is also valid!
    if(InviteLink && InviteLink.length > 2) toadddata.link = InviteLink;
    //save the data in your db
    await new db(toadddata).save();
    //auto create should be done and no invitelink added do fetch the invite link then add the link etc.
    if(autoCreate === "true" && !(InviteLink && InviteLink.length > 2)){
      guild.fetchInvites().then(async fetchinvite => {
        fetchinvite.array().find(a => a.inviter.id === client.user.id)
          ? fetchinvite.array().find(a => a.inviter.id === client.user.id).code
          : await guild.channels.cache.random().createInvite({ maxAge: 0 });
      });
      guild.fetchInvites().then(async fetchinvite => {
        let inviteURL = fetchinvite
          .array()
          .find(a => a.inviter.id === client.user.id).url;
      await db.updateOne({
          id: req.params.guildID
      }, {
          $set: {
              link: inviteURL
          }
      }, { upsert: true })
      });

    } 
    //now we dont need the else anymore because we already created the invite link etc.
    /*else {
    await db.updateOne({
        id: req.params.guildID
    }, {
        $set: {
            link: req.body.InviteLink
        }
    }, { upsert: true })
    }*/
    //Change that to: So that it redirects, etc. etc.
    return res.redirect(`?success=true&message=Su servidor se ha agregado correctamente al sistema. A veces, el Invitelink no se agrega, así que edite los  del servidor y actualize eso!&guildID=${req.body['guildID']}`)
    return res.send({ success: true, message: "Servidor agregado exitosamente." });
})
module.exports = app;