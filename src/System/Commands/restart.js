const Discord = require ('discord.js');
const fs = require ('fs');

module.exports.help = {
    name: 'restart', // Command Name
    aliases: ['off', 'shutdown',], // Command Aliases
    description: 'Restart the bot (Developer Only)',
    usage: 'trc!restart',
}

module.exports.run = async (Client, message, args) => {

const permError = new Discord.RichEmbed()
permError.setTitle("Nope!!")
permError.setDescription("Only my Developer can run this command")

const confirm = new Discord.RichEmbed()
confirm.setTitle("Restar The Bot?")
confirm.setDescription("Are you sure you want to shut me down?\n\nReply with `cancel` to **abort** the shutdown.\n\nThe shutdown will self-abort in 30 seconds.")

exports.run = (client, message, args) => {

message.delete().catch() // <<<<<
if (!message.author.id === "510065483693817867" || (!message.author.id === "391376464064282627")) return message.reply(permError);
message.channel.send(confirm)
.then(msg => {
 return message.channel.awaitMessages(m => m.author.id === message.author.id, {
     errors: ["time"],
     max: 1,
     time: 30000
   })
   .then(resp => {
     if (!resp) return;
     resp = resp.array()[0];
     let validAnswers = ["yes", "y", "no", "n", "cancel"];
     if (validAnswers.includes(resp.content)) {
       if (
         resp.content === "cancel" ||
         resp.content === "no" ||
         resp.content === "n"
       ) { 
         resp.delete().catch()
         const confirm = new Discord.RichEmbed()
               confirm.setTitle("Something Went Wrong!!!")
               confirm.setDescription('**Shutdown Aborted!!!!**')
               confirm.setFooter('© Toxic Re-Captcha', Client.user.avatarURL);
         return msg.edit(confirm)
         .then(msg => {
          msg.delete(5000);
        })
       } else {
         resp.delete().catch() 
         const recievedEmbed = message.embeds[0];
         const confirm = new Discord.RichEmbed()
               confirm.setTitle("Be Back Soon!!!")
               confirm.setDescription('Shutting down and checking for updates ✌️')
               confirm.setFooter('© Toxic Re-Captcha', Client.user.avatarURL);
         msg.edit(confirm)
           .then(() => {
             process.exit();
           })
           .catch(console.error);
       }
     } else {
       resp.delete().catch()
       const confirm = new Discord.RichEmbed()
       confirm.setTitle("Restart The Bot?")
       confirm.setDescription(`Only \`${validAnswers.join("`, `")}\` are valid, please supply one of those.`)
       confirm.setFooter('© Toxic Re-Captcha', Client.user.avatarURL);
       msg.edit(confirm)
         .catch(() => console.error);
     }
   })
   .catch(() => {
     console.error;
   const confirm = new Discord.RichEmbed()
         confirm.setTitle("Restart The Bot?")
         confirm.setDescription("Shutdown Timed Out")
         confirm.setFooter('© Toxic Re-Captcha', Client.user.avatarURL);
     //msg.edit("Shutdown timed out.");
     msg.edit(confirm)
     .then(msg => {
      msg.delete(5000);
    })
       });
    });
  };
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
