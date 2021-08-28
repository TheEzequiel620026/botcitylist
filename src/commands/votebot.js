const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require("../../config.js");
const { Client, Util } = require('discord.js');
const botsdata = require("../database/models/botlist/bots.js");
const parseMilliseconds = require("parse-ms")
const { MessageButton } = require("discord-buttons");

module.exports.run = async (client, message, args) => {
  var bot = message.mentions.users.first()
  if (bot) {
    var bot = bot;
  } else {
    var bot = args[0];
    var bot = client.users.cache.get(bot)
  }
  if (!bot) {
    return message.channel.send("<a:no:877684318485495819> Ha dado una ID o mención de bot no válida <a:no:877684318485495819>")
  }
  try {
  const votes = require("../database/models/botlist/vote.js");
  let botdata = await botsdata.findOne({ botID: bot.id });
  if (!botdata) {
    return message.channel.send("<a:no:877684318485495819> ¡Esto no es un bot o no está en nuestra web! <a:no:877684318485495819>");
  }
  let x = await votes.findOne({ user: message.author.id, bot: bot.id })
  var timeleft = await parseMilliseconds(x.ms - (Date.now() - x.Date));
  var hour = timeleft.hours;
  var minutes = timeleft.minutes;
  var seconds = timeleft.seconds;
    if (hour > 0) {
      return await message.channel.send(`Puedes votar de nuevo en ${hour}h ${minutes}m ${seconds}s`);
    }} catch (e) {
    const votes = require("../database/models/botlist/vote.js");
    let botdata = await botsdata.findOne({ botID: bot.id });
    await votes.findOneAndUpdate({ bot: bot.id, user: message.author.id }, { $set: { Date: Date.now(), ms: 43200000 } }, { upsert: true })
    await botsdata.findOneAndUpdate({ botID: bot.id }, { $inc: { votes: 1 } })
    client.channels.cache.get("874791412997193769").send(`<a:vote:878044866679025684> **${message.author.username}** voto a **${botdata.username}** <a:vote:878044866679025684> \`(${botdata.votes + 1} votes)\``)
    let web = new MessageButton()
      .setLabel("Visita la página del bot")
      .setStyle("url")
      .setURL("https://botcity.xyz/bot/"+botdata.botID)
      .setEmoji(`867777823464095776`)
    const vote = new Discord.MessageEmbed()
    .setTitle("Voto")
    .setColor("GREEN")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(`<a:vote:878044866679025684> Has votado con éxito por el bot **${botdata.username}**.`)
    .setImage('')
    message.channel.send({ embed: vote, buttons: [ web ] })
  if (hour <= 0) {
  const votes = require("../database/models/botlist/vote.js");
  let botdata = await botsdata.findOne({ botID: bot.id });
  await votes.findOneAndUpdate({ bot: bot.id, user: message.author.id }, { $set: { Date: Date.now(), ms: 43200000 } }, { upsert: true })
  await botsdata.findOneAndUpdate({ botID: bot.id }, { $inc: { votes: 1 } })
    client.channels.cache.get("874791412997193769").send(`<a:vote:878044866679025684> **${message.author.username}** voto a **${botdata.username}** <a:vote:878044866679025684> \`(${botdata.votes + 1} votes)\``)
  let web = new MessageButton()
    .setLabel("Visita la página del bot")
    .setStyle("url")
    .setURL("https://botcity.xyz/bot/"+botdata.botID)
  const vote = new Discord.MessageEmbed()
	.setTitle("Voto")
	.setColor("GREEN")
	.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
  .setDescription(`Has votado con éxito por bot **${botdata.username}**.`)
  .setImage('')
  message.channel.send({ embed: vote, buttons: [ web ] })
  var votedbot = client.users.cache.get(botdata.botID);
  if (botdata.dcwebhook) {
    const webhook = require("webhook-discord");
    const Hook = new webhook.Webhook(botdata.dcwebhook);
    const msg = new webhook.MessageBuilder()
      .setName("BotCity Bot List Discord Webhooks")
      .setAvatar("https://media.discordapp.net/attachments/866807831139581955/878047326764150874/botlistaa.jpg?width=268&height=268")
      .setTitle(`${votedbot.username} Acaba de ser votado!!`)
      .setDescription(`Autor: ${message.author.username} Bot: ${votedbot.username} Total Votos: ${botdata.votes + 1}`)
      .setFooter(`Discord Default Webhook`)
      .setThumbnail(votedbot.displayAvatarURL)
    if (botdata.backURL)
      Hook.send(msg);
  }}
  if (botdata.webhook) {
    const fetch = require("node-fetch");
    fetch(botdata.webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user": `${message.author.username}`,
        "bot": `${votedbot.username}`,
        "votos": `${botdata.votes + 1}`,
        "userid": `${message.author.id}`
      }),
    })
  }
}}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["v","v-b"],
};

exports.help = {
  name: "votebot",
  description: "Vota un bot",
  usage: ""
};