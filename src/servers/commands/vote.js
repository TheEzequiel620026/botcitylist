const Discord = require("discord.js");
const { MessageButton } = require("discord-buttons");
const { registerFont, createCanvas } = require('canvas');
const serverData = require("../../database/models/servers/server.js");
const userData = require("../../database/models/servers/user.js");
exports.run = async (client, message, args) => {
	let findServer = await serverData.findOne({ id: message.guild.id });
	let findUser = await userData.findOne({ id: message.author.id, guild: message.guild.id });
	if(!findServer) return message.channel.send(
		"Este servidor no fue encontrado en nuestra lista.\nAgrega tu servidor: https://botcity.xyz/server/add"
	);
  	if (findUser) {
    return await msgError('Puede votar solo una vez cada 30 minutos.', { channel: message.channel });
	} else {
    let kod1 = client.makeid(6);
    let kod2 = client.makeid(6);
    let kod3 = client.makeid(6);
    const width = 400
    const height = 125
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')
    await registerFont('src/fonts/font.ttf', { family: 'vCodes' })
    context.fillRect(0, 0, width, height)
    context.font = 'bold 60pt vCodes'
    context.textAlign = 'center'
    context.fillStyle = '#fff'
    context.fillText(kod1, 200, 90)
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'captcha.png'); 
    let sorgu = new MessageButton()
    .setLabel(kod1)
    .setStyle("green")
    .setID(kod1)
    let sorgu2 = new MessageButton()
    .setLabel(kod2)
    .setStyle("red")
    .setID(kod2)
    let sorgu3 = new MessageButton()
    .setLabel(kod3)
    .setStyle("blurple")
    .setID(kod3)
    let web = new MessageButton()
    .setLabel("Visite la página del servidor")
    .setStyle("url")
    .setURL("https://botcity.xyz/server/"+message.guild.id)
    .setEmoji('867777823464095776');

    const incorrectButton = new Discord.MessageEmbed()
	.setTitle("Se seleccionó un botón incorrecto.")
	.setColor("RED")
	.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
	.setDescription(`Falló, la operación se canceló porque hizo clic en el código incorrecto.`)
  .setImage('')
	const correctButton = new Discord.MessageEmbed()
	.setTitle("Se ha seleccionado el botón correcto.")
	.setColor("GREEN")
	.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
	.setDescription(`<a:si:877686317536907324> Ha votado con éxito por el servidor llamado **${message.guild.name}**.`)
    .setImage('')

    const controlEmbed = new Discord.MessageEmbed()
    .setTitle("Seleccione el botón de código que es el mismo que el de la imagen.")
    .setColor("BLURPLE")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .attachFiles(attachment)
    .setImage('attachment://captcha.png')
    .setDescription("Seleccione cualquiera de los botones a continuación que coincida con el código y realizará la operación, esta operación se cancelará después de **60** segundos.");

    message.channel.send({ embed: controlEmbed, buttons: [ sorgu, sorgu2, sorgu3 ].sort(() => Math.random()-0.5) }).then(async msg => {
		const filter = (button) => button.clicker.user.id === message.author.id;
		const collector = await msg.createButtonCollector(filter, { time: 60000 });
		  collector.on('collect', async b => {
		    if(b.id == kod1) {
            let findUserr = await userData.findOne({ id: message.author.id, guild: message.guild.id });if(findUserr) return msg.delete().then(await msgError('Puede votar solo una vez cada 30 minutos.', { channel: message.channel }));
		      msg.delete().then( message.channel.send({ embed: correctButton, buttons: [ web ] }) )
		          await userData.updateOne({ 
			    	id: message.author.id 
			      }, { 
			    	$set: { 
			    		guild: message.guild.id,
                        date: Date.now()
			    	}
			   	  }, { upsert: true })
		          await serverData.updateOne({ 
			    	id: message.guild.id 
			      }, { 
			    	$inc: { 
			    		votes: 1
			    	}
			   	  })
			    return;
		    } else if (b.id == kod2 || b.id == kod3) {
		      msg.delete().then( message.channel.send({ embed: incorrectButton, buttons: [ web ] }) )
		    }
		  })
	})
}
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: []
};
exports.help = {
	name: 'vote',
	description: '',
	usage: ''
};

function msgError(msg, { channel }) {
    channel.send(new Discord.MessageEmbed()
    .setAuthor(global.clientSL.user.username,global.clientSL.user.avatarURL())
    .setFooter('botcity.xyz/servers')
    .setImage('')
    .setDescription(msg)
    .setColor("RED")
    )
}