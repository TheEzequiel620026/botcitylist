const Discord = require('discord.js');
const fetch = require("node-fetch");
exports.run = (client, message, args) => {
    if(!global.config.bot.owners.includes(message.author.id)) return  message.reply('No se pudo otorgar permiso de acceso.')
	message.channel.send("BotCity: Apagando.").then(msg => {
		console.log(`BOT : Apagando...`);
		process.exit(1);
	})
};
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: []
};
exports.help = {
	name: 'reboot',
	description: 'Reinicia el bot.',
	usage: 'reboot'
};