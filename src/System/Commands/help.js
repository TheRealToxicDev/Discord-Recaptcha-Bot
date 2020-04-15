const Discord = require ('discord.js');
const fs = require ('fs');

module.exports.help = {
    name: 'help', // Command Name
    aliases: ['h', 'halp', 'helpme'], // Command Aliases
    description: 'Shows you my help message',
    usage: 'trc!help',
}

module.exports.run = async (Client, message, args) => {

let hEmbed = new Discord.RichEmbed()
.setAuthor('Toxic Re-Captcha Commands', Client.user.avatarURL)
.setDescription("Here is a list of my commands and their usage.")
.addField('Helpful Commands', '```trc!about - Tells you some info about me!\n\ntrc!help - Shows you this help message\n\ntrc!invite - Sends a link that can be used to invite me to your server```')
.addField('ReCaptcha Commands', '```trc!setcaptcha - Enables Server Re-Captcha and Sets the Verified Role and Re-Captcha Channel\n\ntrc!captcha - Complete a Re-Captcha and Get access to the Server (Captcha Must Be Enabled Using "setcaptcha" Command)\n\ntrc!captchaoff - Turns Server Re-Captcha Off```')
.setFooter("Additional Usage: trc!help {command}", Client.user.avatarURL);
   message.delete().catch()

   let hEmbed2 = new Discord.RichEmbed()
   .setAuthor('Toxic Re-Captcha Commands', Client.user.avatarURL)
   .setDescription("Here is a list of my commands and their usage.")
   .addField('Helpful Commands', '```trc!about - Tells you some info about me!\n\ntrc!help - Shows you this help message\n\ntrc!invite - Sends a link that can be used to invite me to your server```')
   .addField('ReCaptcha Commands', '```trc!setcaptcha - Enables Server Re-Captcha and Sets the Verified Role and Re-Captcha Channel\n\ntrc!captcha - Complete a Re-Captcha and Get access to the Server (Captcha Must Be Enabled Using "setcaptcha" Command)\n\ntrc!captchaoff - Turns Server Re-Captcha Off```')
   .setFooter("Additional Usage: trc!help {command}", Client.user.avatarURL);
   message.delete().catch()

   let hEmbed3 = new Discord.RichEmbed()
   .setAuthor('Toxic Re-Captcha Commands', Client.user.avatarURL)
   .setDescription(`<@${message.author.id}> Help message has been sent to your DM's`)
   .setFooter('© Toxic Re-Captcha', Client.user.avatarURL);
  message.delete().catch()

   let hEmbed6 = new Discord.RichEmbed()
   .setAuthor('Command Error', Client.user.avatarURL)
   .setDescription(`<@${message.author.id}> That command doesn't exist.`)
   .setFooter('© Toxic Re-Captcha', Client.user.avatarURL);
  message.delete().catch()

      if(!args[0]){

      message.author.send(hEmbed)

      message.channel.send(hEmbed3)
      .then(msg => {
        msg.delete(5000);
      })

      .catch(e =>{

        if (e) {

        message.channel.send("You seem to be locking your DM's so i will send it here instead")
        .then(msg => {
          msg.delete(5000);
        })

        message.channel.send(hEmbed2)
        .then(msg => {
          msg.delete(5000);
        })

        message.delete().catch()
       }
    });

    }else{

      let command = args[0];

      if (Client.commands.has(command)) {

      comd = Client.commands.get(command);

      let hEmbed4 = new Discord.RichEmbed()
      .setAuthor('Command Help', Client.user.avatarURL)
      .addField("Command Description", `${comd.help.description}`)
      .addField("Command Usage", `${comd.help.usage}`)
      .addField('Command Aliases', `${comd.help.aliases}`)
      .setFooter('© Toxic Re-Captcha', Client.user.avatarURL);

        return message.channel.send(hEmbed4)
        .then(msg => {
          msg.delete(8000);
        })

      } else if (Client.aliases.has(command)) {

      cmd = Client.commands.get(Client.aliases.get(command));  
      let hEmbed5 = new Discord.RichEmbed()
       .setAuthor('Command Help', Client.user.avatarURL)
       .addField("Command Description", `${cmd.help.description}`)
       .addField("Command Usage", `${cmd.help.usage}`)
       .addField('Command Aliases', `${cmd.help.aliases}`)
       .setFooter('© Toxic Re-Captcha', Client.user.avatarURL);

        return message.channel.send(hEmbed5)
        .then(msg => {
          msg.delete(8000);
        })

      } else {

        return message.channel.send(hEmbed6)
        .then(msg => {
          msg.delete(5000);
        })
        message.delete().catch()

      }
    }
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
