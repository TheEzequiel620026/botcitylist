const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (client,message,args) => {


        const Discord = require("discord.js");
        let user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({size: 4096, dynamic: true});


    
        let embed = new Discord.MessageEmbed()
        .setTitle(`Avatar de ${user.tag}` )
        .setURL(avatar)
        .setImage(avatar)
        .setColor('RANDOM')
        .setDescription('Su Avatar: :small_red_triangle_down: ')
        .setFooter('Powered by botcity.xyz')
              let button = new MessageButton()
  .setStyle('url')
  .setURL(avatar) 
  .setLabel('Avatar Link')
    .setEmoji('870019597791805521');


let row = new MessageActionRow()
  .addComponents(button);
return message.channel.send({ embed: embed, buttons: [ button ]
});
        message.channel.send(embed)

    }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["av"],
  };
  
  exports.help = {
    name: "avatar",
    description: "",
    usage: ""
  };