const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:check:878349035067551766> **[BotCity Bot Emojis](https://botcity.xyz)** <:check:878349035067551766>\n\n**Aquí están mis emojis,\n<:check:878349035067551766> \`|\` <a:si:877686317536907324> \`|\` <a:no:877684318485495819> \`|\` <:on:878003482169323540> \`|\` <:off:878002283164610571> \`|\` <a:vote:878044866679025684>\n¿Quieres sugerir mejores emojis? ¡Únase a mi servidor de [soporte](https://discord.gg/bE6xX7zMYD)!**`)
   .setColor("#7289da")
   .setFooter('Powered By Vcodez.xyz')
         let button = new MessageButton()
  .setStyle('url')
  .setURL('https://cdn.discordapp.com/attachments/860646667597381632/872584244264841286/emoji.png') 
  .setLabel('')
    .setEmoji('870019597791805521');

             let button2 = new MessageButton()
  .setStyle('url')
  .setURL('https://cdn.discordapp.com/attachments/860646667597381632/872584721132036166/emoji.png') 
  .setLabel('')
    .setEmoji('872580084077326337');

                 let button3 = new MessageButton()
  .setStyle('url')
  .setURL('https://cdn.discordapp.com/attachments/860646667597381632/872584937721716807/emoji.png') 
  .setLabel('')
    .setEmoji('870019748585414686');

                     let button4 = new MessageButton()
  .setStyle('url')
  .setURL('https://cdn.discordapp.com/attachments/860646667597381632/872585283709853697/emoji.png') 
  .setLabel('')
    .setEmoji('872580144714358784');


let row = new MessageActionRow()
  .addComponents(button, button2, button3, button4);
return message.channel.send({ embed: embed, buttons: [ button,button2,button3,button4 ]
});
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["emoji"],
  };
  
  exports.help = {
    name: "emojis",
    description: "",
    usage: ""
  };