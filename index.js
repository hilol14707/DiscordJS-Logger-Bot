const Discord = require('discord.js');
const client = new Discord.Client();
const JSONconfig = require('./config.json');
const JSONcomands = require("./commands.json");


//records errors
client.on("error", (e) => console.error(new Date()+ e));
client.on("warn", (e) => console.warn(new Date()+ e));
client.on("debug", (e) => console.info(new Date()+ e));

//commands
client.on('message', msg => {
    if (JSONcomands.commands.indexOf("msg") > -1) {
        console.log("In the array!")
    } else {
        //Not in the array
    }
    if (msg.content === JSONconfig.prefix + 'help') {
        msg.reply('WIP');
    }
});

client.on("message", msg => {
    if (msg.channel.id !== JSONconfig.logChannel) {
        console.log(msg.id + " was not sent in " + JSONconfig.logChannel)
    }
});

//owner commands
client.on("message", msg => {
    if (msg.author.id === JSONconfig.owner) {
        if (msg.content === JSONconfig.prefix + "restart") {
            msg.react("👍");
            console.log("restarting...");
            client.destroy();
            client.login(JSONconfig.token);
        }
    }
});
//on ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({game: {name: "Use " + JSONconfig.prefix + "help"}, status: "online"});
});

client.login(JSONconfig.token);