const Discord = require ('discord.js');
const fs = require ('fs');

module.exports.help = {
    name: 'about', // Command Name
    aliases: ['aboutme', 'info',], // Command Aliases
    description: 'Tells you some info about me',
    usage: 'trc!about',
}

module.exports.run = async (Client, message, args) => {

message.delete().catch();
let aEmbed = new Discord.RichEmbed()
.setTitle("About Toxic Re-Captcha")
.setThumbnail(Client.user.avatarURL)
.setDescription('Basic Server Re-Captcha/Raid Protection')
.addField('Current Status', `${client.user.presence.status.toUpperCase()}`, true)
.addField('Current Game', `${client.user.presence.game === null ? "No Game" : client.user.presence.game.name}`, true)
.addField('Bot Creation Date', `${moment(client.user.createdAt).toString().substr(0, 15)}\n(${moment(client.user.createdAt).fromNow()})`, true)        
.setFooter('© Toxic Re-Captcha', Client.user.avatarURL)
message.channel.send(aEmbed)
.then(msg => {
    msg.delete(5000);
  })
}

module.exports.development = {
    commandDevLock: false
}

module.exports.conf = {
    commandEnabled: true, // true = Command Enabled | false = Command Disabled
    disabledReason: '', // Replace this with a reason if the command is Disabled in the line above.
    commandGuildOnly: true, // Command can be used ONLY IN A SERVER (Will NOT work in DM's if set to true)
    commandPermissions: 0, // Command Permission Level, Coming Soon!!!!
}
