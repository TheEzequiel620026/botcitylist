const Discord = require('discord.js');
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<a:si:877686317536907324> **[BotCity Invite](https://botcity.xyz)** <a:si:877686317536907324>\n\nInvitame [Invite](https://discord.com/api/oauth2/authorize?client_id=867513158918471753&permissions=8&scope=bot)`)
   .setColor("#7289da")
   .setFooter('Hecho con ❤️')
      let button = new MessageButton()
  .setStyle('url')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=867513158918471753&permissions=8&scope=bot') 
  .setLabel('Invitame')
    .setEmoji('870019597791805521');


let row = new MessageActionRow()
  .addComponents(button);
return message.channel.send({ embed: embed, buttons: [ button ]
});
   
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["inv"],
  };
  
  exports.help = {
    name: "invite",
    description: "",
    usage: ""
  };
  