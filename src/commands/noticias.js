const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:si:877686317536907324> **[Últimas noticias de BotCity](https://botcity.xyz)** <a:si:877686317536907324>\n\n8/4/21\n
¡Ahora tenemos Discord-Buttons! ¡Di !help, !invite y !noticias para verlas! \n\nPara ver más noticias, haz clic en el botón de abajo.`)
   .setColor("#7289da")
      .setFooter('Powered By botcity.xyz')
   
  let button = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.gg/bE6xX7zMYD')
  .setLabel('Ver más noticias aquí')
  .setEmoji('872523515230847027');


let row = new MessageActionRow()
  .addComponents(button);
return message.channel.send({ embed: embed, buttons: [ button ]
});
   message.channel.send(embed)
  
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["notice"],
  };
  
  exports.help = {
    name: "noticias",
    description: "",
    usage: ""
  };  