const Discord = require ('discord.js');
const fs = require ('fs');

module.exports.help = {
    name: 'setcaptcha', // Command Name
    aliases: ['sc', 'SC', 'Sc', 'captcha-on'], // Command Aliases
    description: 'Set-Up the Verification Role & Channel And Turn Re-Captcha On',
    usage: 'trc!setcaptcha',
}

module.exports.run = async (Client, message, args) => {

    var verifyj = JSON.parse(fs.readFileSync("./src/System/JSON/verify.json", "utf8"))

        let filter = m => m.author.id === message.author.id;

        let ch;

        if(!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send('You don\'t have permission')
            .then(msg => {
           msg.delete(4500);
           message.delete(4500);
        });
    }
        
        message.channel.send(':pencil: **| Now type the verify channel name... :pencil2: **')

        .then(msg => {
    
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 90000,
              errors: ['time']
            })
            .then(collected => {

                collected.first().delete();

                ch = collected.first().content;

                let chf = message.guild.channels.find('name', `${ch}`)

                if(!chf) return msg.edit(':x: **| Wrong Channel Name (Type The Command Again) .**') && console.log('cant find this channel')

                let rr;

                msg.edit(':scroll: **| Please type verified role name.... :pencil2: **')
                
                .then(msg => {
          
                    message.channel.awaitMessages(filter, {
                      max: 1,
                      time: 90000,
                      errors: ['time']
                    })

                    .then(collected => {

                        collected.first().delete();

                        rr = collected.first().content;

                        let rf = message.guild.roles.find('name', `${rr}`)

                        if(!rf) return msg.edit(':x: **| Wrong Role Name (Type The Command Again)**') && console.log('cant find this role')

                        msg.edit('✅ **| Done successfully..  **').then(msg => {
            
                          message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 90000,
                            errors: ['time']
                          })

                          let embed = new Discord.RichEmbed()
                          .setTitle('**Done The Captcha Has Been Setup**')
                          .addField('Captcha Channel:', `${ch}`)
                          .addField('Verfied Role:', `${rr}`)
                          .setThumbnail(message.author.avatarURL)
                          .setFooter(`${Client.user.username}`)
                         message.channel.sendEmbed(embed)

                         .then(msg => {
                            msg.delete(5000);
                          })

        verifyj[message.guild.id] = {
            channel: ch,
            rolev: rr,
            onoff: 'On'
        }
        fs.writeFile("./src/System/JSON/verify.json", JSON.stringify(verifyj), (err) => {
        if (err) console.error(err)
      })
       } 
                )
            })
        })
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