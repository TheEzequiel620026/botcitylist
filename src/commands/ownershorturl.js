const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
    if(!global.config.bot.owners.includes(message.author.id)) return  message.reply('<a:no:877684318485495819> Solo el dueño de BotCity puede usar este bypass <a:no:877684318485495819>')
     if(!args[0]) return message.channel.send("Error: Por favor dénos una URL para acortar.");
   const url = args.join(" ");

    const data = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
    ).then((res) => res.json());

    const embed = new MessageEmbed()
     .setAuthor(`${message.author.username}`)
      .setDescription('**[URL](https://en.wikipedia.org/wiki/URL) Acortado!**')
      .addFields(

  { name: `URL Original`, value: `${url}` ,inline: true },

  { name: `URL Acortado`, value: `${data.shorturl}` ,inline: false }

)
.setTimestamp()
.setColor("#FF0000")
    message.channel.send(embed);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "ownershorturl",
    description: "",
    usage: ""
  };