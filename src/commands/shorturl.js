const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
    if (!message.member.roles.cache.some((role) => role.name === 'PREMIUM')) return message.channel.send("<a:no:877684318485495819> ¡O el propietario del servidor no ha creado un rol llamado **PREMIUM** o usted no tiene el rol **PREMIUM**! <a:no:877684318485495819>");
     if(!args[0]) return message.channel.send("Error: Por favor, envíenos una URL para abreviar.");
   const url = args.join(" ");

    const data = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
    ).then((res) => res.json());

    const embed = new MessageEmbed()
     .setAuthor(`${message.author.username}`)
      .setDescription('**[URL](https://es.wikipedia.org/wiki/URL) Acortado!**')
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
    name: "shorturl",
    description: "",
    usage: ""
  };