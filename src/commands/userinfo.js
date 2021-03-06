const {MessageEmbed, Client, Message} = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async(client, message, args) =>{
    if (message.mentions.users.last() /*|| message.mentions.users.last().id === client.user.id*/) {
        const wuser = message.mentions.users.last();
        const mUser = message.mentions.members.last();
        const embed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor(wuser.username, wuser.displayAvatarURL())
            .setTitle(`Userinfo: ${wuser.username}`)
            .addFields(
                {
                    name: "User tag",
                    value: mUser.user.tag,
                    inline: true
                },
                {
                    name: 'Es bot',
                    value: mUser.user.bot,
                    inline: true
                },
                {
                    name: 'Apodo',
                    value: mUser.nickname || 'No establecido',
                    inline: true
                },
                {
                    name: 'Se unio al server',
                    value: new Date(mUser.joinedTimestamp).toLocaleDateString(),
                    inline: true
                },
                {
                    name: 'Se unio a discord',
                    value: new Date(wuser.createdTimestamp).toLocaleDateString(),
                    inline: true
                },
                {
                    name: 'Cantidad de roles',
                    value: mUser.roles.cache.size - 1,
                    inline: true
                },
                {
                    name: "Roles",
                    value: mUser.roles.cache.map(role => `<@&${role.id}>`),
                    inline: true
                }, {
                    name: "Status",
                    value: '`'+wuser.presence.status.toUpperCase() + '`',
                    inline: true
                }
            )
        message.channel.send(embed)
    } else {

//        if (message.mentions.users.last().id !== this.client.user.id || message.mentions.users.last().id === this.client.user.id) {
        const e = new MessageEmbed()
            .setColor(client.color)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle(`Userinfo: ${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL())
            .addFields(
                {
                    name: 'User tag',
                    value: message.author.tag,
                    inline: true
                }, {
                    name: 'ID',
                    value: message.author.id,
                    inline: true
                },
                {
                    name: 'Es bot',
                    value: message.author.bot,
                    inline: true
                },
                {
                    name: "Apodo",
                    value: message.member.nickname || 'No establecido',
                    inline: true
                },
                {
                    name: 'Se unio al servidor',
                    value: new Date(message.member.joinedTimestamp).toLocaleDateString(),
                    inline: true
                },
                {
                    name: "Se unio a discord",
                    value: new Date(message.author.createdTimestamp).toLocaleDateString(),
                    inline: true
                },
                {
                    name: "Cantidad de roles",
                    value: message.member.roles.cache.size - 1,
                    inline: true
                },
                {
                    name: "Roles",
                    value: message.member.roles.cache.map(role => `<@&${role.id}>`),
                    inline: true
                }, {
                    name: "Status",
                    value: '`'+message.author.presence.status.toUpperCase() + '`',
                    inline: true
                }
            )
        //    }
        message.channel.send(e)
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "userinfo",
    description: "",
    usage: ""
  };