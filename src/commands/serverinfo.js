module.exports.run = async(client, message, args) => {
    
    const {MessageEmbed} = require('discord.js')

    const owner = message.guild.ownerID
    const cato =        message.guild.channels.cache.filter(ch => ch.type === 'category').size
let embed = new MessageEmbed()
.setColor(client.color)
.setTitle(`${message.guild.name}`)
.addField("**Owner:**", `<@${owner}>` , true)
.addField("Región", message.guild.region, true)
.addField("Canales de texto", message.guild.channels.cache.size, true)
.addField("Miembros", message.guild.memberCount, true)
.addField("**Lista de roles**", message.guild.roles.cache.size, true)//a70f3e9169546b2c67d301aaeef38.gif
.addField("**Categorias**", cato, true)
.setThumbnail(message.guild.iconURL())
.setFooter(`${message.author.username}`, message.author.displayAvatarURL())
message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "serverinfo",
    description: "",
    usage: ""
  };