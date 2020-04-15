const Discord = require ('discord.js');
const fs = require ('fs');

module.exports.help = {
    name: 'captcha', // Command Name
    aliases: ['capt', 'c',], // Command Aliases
    description: 'Start or Complete a Server Re-Captcha',
    usage: 'trc!captcha',
}

module.exports.run = async (Client, message, args) => {

    var verifyj = JSON.parse(fs.readFileSync("./src/System/JSON/verify.json", "utf8"))
     
     if(!verifyj[message.guild.id]) verifyj[message.guild.id] = {
       channel: "Undefined",
       onoff: "Off",
       rolev: "Undefined"
  } 

  if(verifyj[message.guild.id].onoff === "Off") return console.log('the command is turned off')

  if(message.channel.name !== verifyj[message.guild.id].channel) return console.log('wrong channel')

  if(mem.roles.has(rf.id)) return message.channel.send(':x: | You Are Already Verfied !')

  const type = require('./src/System/JSON/verifycodes.json');

  const item = type[Math.floor(Math.random() * type.length)];

  const filter = response => {

    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());

  };

  const embed = new Discord.RichEmbed()
    .setTitle('**You Should Write The Captcha Code In 15 Seconds**')
    .setColor("RANDOM")
    .setImage(`${item.type}`)
    .setFooter('Requested By' + message.author.tag)

    message.channel.sendEmbed(embed).then(() => {

      message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })

.then((collected) => { 

     message.author.send(`**${collected.first().author} successfully you got verfied role :white_check_mark:**`)
     .then(msg => {
      msg.delete(5000);
    })
     
     message.channel.send(`**${collected.first().author} successfully you got verfied role :white_check_mark:**`)
     .then(msg => {
      msg.delete(5000);
    })
        
     console.log(`[Typing] ${collected.first().author} verfied himself ! .`);

     message.guild.member(collected.first().author).addRole(rf)
 })
          .catch(collected => {
 
            message.author.send('Timeout !')
 
            console.log('[Typing] Error: No one type the captcha code.');
 
            console.log(collected)

        })

    fs.writeFile("./src/System/JSON/verify.json", JSON.stringify(verifyj), (err) => {
    
        if (err) console.error(err)

   })
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
