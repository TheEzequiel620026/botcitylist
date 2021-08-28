const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:si:877686317536907324> **[BotCity Menú De Ayuda](https://botcity.xyz)** <a:si:877686317536907324>`)
   .setColor("#7289da")
   .setFooter('Powered By botcity.xyz')
   .addField("Comandos extras", "**\n`!`faq\n`!`emojis\n`!`soporte\n`!`noticias\n`!`addbot\n`!`addserver\n`!`topvoted\n`!`ping**" )
   .setImage('https://media.discordapp.net/attachments/866807831139581955/878345511537610752/standard_14.gif?width=314&height=40')

   let button = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=867513158918471753&permissions=8&scope=bot') 
  .setLabel('Invite')
  .setEmoji('870019597791805521');

  let button2 = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.gg/bE6xX7zMYD') 
  .setLabel('Soporte')
  .setEmoji('872580192063860787');
  
  let button3 = new MessageButton()
  .setStyle('url')
  .setURL('https://botcity.xyz') 
  .setLabel('Página Web')
  .setEmoji('872580084077326337');
  
  let button4 = new MessageButton()
  .setStyle('url')
  .setURL('https://vcodez.xyz/bot/') 
  .setLabel('Vote')
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
    aliases: ["Extra", "Extras", "extras"],
  };
  
  exports.help = {
    name: "extras",
    description: "",
    usage: ""
  };