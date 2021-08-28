const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  if (!message.member.roles.cache.some((role) => role.name === 'PREMIUM')) return message.channel.send("<a:no:877684318485495819> ¡O el propietario del servidor no ha creado un rol llamado **PREMIUM** o usted no tiene el rol **PREMIUM**! <a:no:877684318485495819>");
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:si:877686317536907324> **[BotCity Premium Cmds](https://botcity.xyz)** <a:si:877686317536907324>`)
   .setColor("#7289da")
   .setFooter('Powered By botcity.xyz')
   .addField("Premium Cmds", "`!`shorturl" )
   .setImage('')

   let button = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=867513158918471753&permissions=8&scope=bot') 
  .setLabel('Invite')
  .setEmoji('870019597791805521');

  let button2 = new MessageButton()
  .setStyle('url')
  .setURL('https://botcity.xyz/dc') 
  .setLabel('Soporte')
  .setEmoji('872580192063860787');
  
  let button3 = new MessageButton()
  .setStyle('url')
  .setURL('https://botcity.xyz') 
  .setLabel('Página Web')
  .setEmoji('872580084077326337');
  
  let button4 = new MessageButton()
  .setStyle('url')
  .setURL('https://botcity.xyz/bot/') 
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
    aliases: ["Premium"],
  };
  
  exports.help = {
    name: "premium",
    description: "",
    usage: ""
  };