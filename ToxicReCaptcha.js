
const Discord = require ('discord.js');

const Client = new Discord.Client()

const FileSystem = require ('fs');

const timers = require ('timers');

Client.on('ready', async (message) => {
    let Statuses = [
        {
            name: 'Re-Captcha Protection',
            options: {
                type: 'STREAMING',
                url: 'https://www.twitch.tv./monstercat'
            }
        },
        {
            name: 'trc!help',
            options: {
                type: 'STREAMING',
                url: 'https://www.twitch.tv./monstercat'
            }
        },
        {
            name: 'Preventing Raids',
            options: {
                type: 'STREAMING',
                url: 'https://www.twitch.tv./monstercat'
            }
        }
    ];
    
    let i = 0;

    console.log('[TR Ready Logs] Toxic Re-Captcha Is Online And Ready!!!');

    timers.setInterval(() => {
        i = i == Statuses.length ? 0 : i;
      Client.user.setActivity(Statuses[i].name, Statuses[i].options);
        i ++;
    }, 10000);
});

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();

FileSystem.readdir('./src/System/Commands/', (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js');

    if (jsfile.length <= 0) {
        DiscordLogs("Couldn't find any Commands. Please make sure you Properly Configured my Commands Folder")
        return;
    }

    jsfile.forEach((f, i) => {

        let props = require (`./src/System/Commands/${f}`);
        console.log(`[TR Command Logs] ${f} Loaded Successfully`);
        Client.commands.set(props.help.name, props);
        
        props.help.aliases.forEach(alias => {
            Client.aliases.set(alias, props.help.name);
        });
    });
})

Client.on('message', async message => {
    var prefix = 'trc!'
    
    if (message.content.startsWith(prefix)) {
        //message.delete()
    }

    let messageArray = message.content.split(" ");

    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase();

    let commandFile;

    if (Client.commands.has(cmd)) {

        commandFile = Client.commands.get(cmd);

    } else if (Client.aliases.has(cmd)) {

        commandFile = Client.commands.get(Client.aliases.get(cmd));
    }

    if (!message.content.startsWith(prefix)) return;

    try {

        commandFile.run(Client, message, args);
    
    } catch (e) { 
    }}
)

Client.login('Njg1NjYwODY4ODg0OTU1MTM3.XmN18g.Mix9TYuROYQp1DV_p3kc3i9qxf4');

