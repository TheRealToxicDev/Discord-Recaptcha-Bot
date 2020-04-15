const Discord = require ('discord.js');
const ToxicRecaptchaConfig = require ('../JSON/ToxicConfig');

module.exports = (Client, message, props, user, DisabledCommands, ToxicRecaptchaConfig) => {

    const channel = message.channel;

    const Author = message.author;

    const DisabledCommandMessage = module.exports.DisabledCommands;

    //let prefix = ToxicRecaptchaConfig.ToxicRecaptchaPrefix
    let prefix = 'trc!'
    if (message.content.startsWith(prefix)) {
      message.delete(5000);
    }
    
    const messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
     let cmd = args.shift().toLowerCase();
      let commandFile;

      if (Client.commands.has(cmd)) {
        commandFile = Client.commands.get(cmd);
      } else if (Client.aliases.has(cmd)); {
        commandFile = Client.commands.get(Client.aliases.get(cmd));
      }

      if (!message.content.startsWith(prefix)) return;

      try {
        commandFile.run(Client, message, args);

      } catch (e) {

        if (cmd.conf.commandEnabled === false) {
          
          return channel.send(DisabledCommandMessage)
          .then(msg => {
              msg.delete(5000);
          })
        }
  
        if (cmd.conf.commandGuildOnly === true && message.channel.type != 'text') {
            
          return channel.send(GuildOnlyEmbed)
          .then(msg => {
              msg.delete(5000);
          })
        }
  
        if (cmd.development.commandDevLock === true && message.author.id != '510065483693817867') {
            return channel.send(DevLockEmbed)
            .then(msg => {
                msg.delete(5000);
            })
        }

      }}