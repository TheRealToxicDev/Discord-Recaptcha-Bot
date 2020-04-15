const Discord = require ('discord.js');
const fs = require ('fs');

module.exports.help = {
    name: 'captchaoff', // Command Name
    aliases: ['co', 'captoff', 'off'], // Command Aliases
    description: 'Turn Re-Captcha off',
    usage: 'trc!captchaoff',
}

module.exports.run = async (Client, message, args) => {

    var verifyj = JSON.parse(fs.readFileSync("./src/System/JSON/verify.json", "utf8"))

    if(!verifyj[message.guild.id]) verifyj[message.guild.id] = {
      channel: "Undefined",
      onoff: "Off",
      rolev: "Undefined"
 }

    if(verifyj[message.guild.id].onoff === "Off") return message.channel.send('Already Turned Off !')

       verifyj[message.guild.id].onoff = "off"

       message.channel.send(':white_check_mark: | Successfully turned off')
       .then(msg => {
        msg.delete(5000);
      })

       fs.writeFile("./src/System/JSON/verify.json", JSON.stringify(verifyj), (err) => {

        if (err) console.error(err)
   })
}
//})

module.exports.development = {
    commandDevLock: false
}

module.exports.conf = {
    commandEnabled: true, // true = Command Enabled | false = Command Disabled
    disabledReason: '', // Replace this with a reason if the command is Disabled in the line above.
    commandGuildOnly: true, // Command can be used ONLY IN A SERVER (Will NOT work in DM's if set to true)
    commandPermissions: 0, // Command Permission Level, Coming Soon!!!!
}
