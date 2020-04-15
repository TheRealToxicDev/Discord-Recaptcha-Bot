const Discord = require ('discord.js');
const fs = require ('fs');

module.exports.help = {
    name: 'invite', // Command Name
    aliases: ['inviteme', 'botinvite',], // Command Aliases
    description: 'Sends you a link to Invite me to your server',
    usage: 'trc!invite',
}

module.exports.run = async (Client, message, args) => {

message.delete().catch();
let aEmbed = new Discord.RichEmbed()
.setTitle("About Toxic Re-Captcha")
.setThumbnail(Client.user.avatarURL)
.setDescription('Invite me to your server using [This Link](https://discordapp.com/api/oauth2/authorize?client_id=685660868884955137&permissions=8&scope=bot)')    
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
