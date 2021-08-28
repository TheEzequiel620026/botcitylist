const Discord = require('discord.js');
const vcodes = require("vcodes.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:check:878349035067551766> **[BotCity Add Server](https://botcity.xyz)** <:check:878349035067551766> \n\nPuede agregar su servidor [aquí](https://botcity.xyz/server/add) \`NOTA, DEBE INICIAR SESIÓN O TENDRÁ UN ERROR\` `)
   .setColor("#7289da")
   .setFooter('Powered by botcity.xyz')
      let button = new MessageButton()
  .setStyle('url')
  .setURL('https://botcity.xyz/server/add') 
  .setLabel('Agrega tu servidor')
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
    aliases: [],
  };
  
  exports.help = {
    name: "addserver",
    description: "",
    usage: ""
  };
  