const Discord = require('discord.js');
const client = new Discord.Client();
const JSONconfig = require('./config.json');


//records errors
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on('message', msg => {
  if (msg.content === JSONconfig.prefix + 'help') {
    msg.reply('WIP');
  }
});

//owner commands
client.on("message", msg => {
    if (msg.author.id === JSONconfig.owner) {
        if (msg.content === JSONconfig.prefix + "restart") {
            msg.react("👍");
            console.log("restarting..")
            client.destroy();
            client.login(JSONconfig.token);
        }
    }
})
//on ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({game: {name: "Use " + JSONconfig.prefix + "help"}, status: "online"});
});

client.login(JSONconfig.token);