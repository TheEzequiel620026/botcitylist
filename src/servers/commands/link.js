const Discord = require('discord.js');
const client = new Discord.Client();
const bots = require("../../database/models/servers/server.js");

module.exports.run = async (client, message, args) => {
  if (args[0]) {
    let b = await bots.findOne({
      id: args[0]
    });
    const targetGuild = client.guilds.cache.get(b.id)
    if (!b) return message.channel.send("Este servidor no se agregó a nuestro sitio web.\nAgregar servidor https://botcity.xyz/server/add")
    let invitelink = b.link ? " [Unirse al server](" + b.link + ")" : "";
    const embed = new Discord.MessageEmbed()
      .setThumbnail(b.icon)
      .setAuthor(`${b.name} | ${b.id}`)
      .setDescription(b.shortDesc)
      .addField("ID", b.id, true)
      .addField("Nombre del servidor", b.name, true)
      .addField("Votos", b.votes, true)
      .addField("Bumps", b.bumps, true)
      .addField("Miembros", client.guilds.cache.get(args[0]).memberCount
        , true)
      .addField("Emojis", client.guilds.cache.get(args[0]).emojis.cache.size
        , true)
      .setColor("#7289da")
      .addField("Owner(s)", `<@${b.ownerID}>\n${coowner.replace("<@>", "")}`, true)
      .addField("Invite Link:", `${invitelink || "No Server Invite"}`, true)

    message.channel.send(embed)
  }
  if (!args[0]) {
    let b = await bots.findOne({
      id: message.guild.id
    });
    if (!b) return message.channel.send("Este servidor no se agregó a nuestro sitio web.\nAgregar servidor https://botcity.xyz/server/add")
    const targetGuild = client.guilds.cache.get(b.id)
    let invitelink = b.link ? " [Unirse al server](" + b.link + ")" : "";
    const embed = new Discord.MessageEmbed()
      .setThumbnail(b.icon)
      .setAuthor(`${b.name} | ${b.id}`)
      .setDescription(b.shortDesc)
      .addField("ID", b.id, true)
      .addField("Nombre del servidor", b.name, true)
      .addField("Votos", b.votes, true)
      .addField("Bumps", b.bumps, true)
      .addField("Miembros", client.guilds.cache.get(message.guild.id).memberCount
        , true)
      .addField("Emojis", client.guilds.cache.get(message.guild.id).emojis.cache.size
        , true)
      .setColor("#7289da")
      .addField("Owner(s)", `<@${b.ownerID}>`, true)
      .addField("Invite Link:", `${invitelink || "No Server Invite"}`, true)

    message.channel.send(embed)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["l"],
};

exports.help = {
  name: "link",
  description: "Envía el enlace del servidor",
  usage: ""
};