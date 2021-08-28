const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`🤔 **[BotCity Información](https://botcity.xyz)** 🤔\nBotCity es una lista de bots y servidores desarrollada originalmente por [vCodes.xyz](https://vcodes.xyz/)\n\nSobre mí:\n**BotCity Team es mi desarrollador, ¡ha creado BotCity con todos sus cmds! [BotCity](https://botcity.xyz)\n\nMis links:\nInvitame [invite](https://discord.com/api/oauth2/authorize?client_id=867513158918471753&permissions=8&scope=bot)\nVisita [Vcodez!](https://vcodez.xyz) y [BotCity!](https://botcity.xyz/)\n\nHecho con ❤️ por BotCity Team**`)
   .setColor("#7289da")
   .setThumbnail('https://media.discordapp.net/attachments/866807831139581955/878345511537610752/standard_14.gif?width=314&height=40')
   .setFooter('Hecho con ❤️ | © vcodez.xyz')
   message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["info"],
  };
  
  exports.help = {
    name: "faq",
    description: "",
    usage: ""
  };