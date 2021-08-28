const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:check:878349035067551766> **[BotCity soporte](https://botcity.xyz)** <:check:878349035067551766>\n\n**Visite el chat de soporte oficial de BotCity, donde puede hacer preguntas a los miembros de nuestro equipo. También puede encontrar uno en nuestra [Página](https://botcity.xyz)!**`)
   .setColor("#7289da")
         let button = new MessageButton()
  .setStyle('url')
  .setURL('https://botcity.xyz/dc') 
  .setLabel('Únase a nuestro servicio de soporte')
    .setEmoji('866089515993792522');


let row = new MessageActionRow()
  .addComponents(button);
return message.channel.send({ embed: embed, buttons: [ button ]
});
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "soporte",
    description: "",
    usage: ""
  };