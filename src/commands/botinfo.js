const Discord = require('discord.js');
const client = new Discord.Client();
const asd = require('vcodes.js');
const vcodes = require("vcodes.js");
const bots = require("../database/models/botlist/bots.js");
module.exports.run = async (client,message,args) => {
   if(!args[0]) return message.channel.send("Error: Escriba la ID del bot.");
   let b = await bots.findOne({ botID: args[0] });
   if(!b) return message.channel.send("ID de bot no válido.")
   let website = b.website ?  " | [Página web]("+b.website+")" : "";
   let github = b.github ? " | [Github]("+b.github+")" : "";
   let discord = b.support ? " | [Server soporte]("+b.support+")" : "";
   let coowner;
   if(!b.coowners.length <= 0) {
     coowner = b.coowners.map(a => "<@"+a+">").join("\n");
   } else {
     coowner = "";
   }
   const embed = new Discord.MessageEmbed()
   .setThumbnail(b.avatar)
   .setAuthor(b.username+"#"+b.discrim, b.avatar)
   .setDescription("**[Vota por el bot llamado "+b.username+"#"+b.discrim+" en BotCity.](https://botcity.xyz/bot/"+b.botID+"/vote)**")
   .addField("ID", b.botID, true)
   .addField("Nombre de usuario", b.username, true)
   .addField("Tag", b.discrim, true)
   .addField("Votos", b.votes, true)
   .addField("Certificado", b.certificate, true)
   .addField("Descripción", b.shortDesc, true)
   .setColor("#7289da")
   .addField("Servidores", `${b.serverCount || "N/A"}`, true)
   .addField("Owner(s)", `<@${b.ownerID}>\n${coowner.replace("<@>", "")}`, true)
   .addField("Invite Bot", `[Invite](https://discord.com/oauth2/authorize?client_id=${b.botID}&scope=bot&permissions=8)`, true)
   .addField("GitHub", `${github}`)
   .addField("Página Web", `${website}`)
   .addField("Soporte, Servidor de discord", `${discord}`)
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "botinfo",
    description: "",
    usage: ""
  };