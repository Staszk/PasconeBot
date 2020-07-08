// Discord.JS vars
const Discord = require('discord.js');
const { prefix, token, waitTime, strings, openers } = require('./config.json');
const client = new Discord.Client();

// Regex vars
const regexFirstWord = /^\w+/;

// Game vars
let challenges;

client.once('ready', () => {
    console.log('Bot Ready');

    challenges = strings;

    console.log(challenges);
})

client.on('message', message => {

    if (message.content.startsWith(prefix)) {
        let command = message.content.slice(1).match(regexFirstWord)[0];

        switch (command) {
            case "spin":
                spin(message.channel, 3);
                break;
            case "reset":
                challenges = strings;
                break;
            default:
                break;
        }
    }
})

client.login(token);

function spin(channel, value, wait = 0) {
    setTimeout(function () {
        if (value--) {
            sendMessage(channel, `${value + 1}...`);
            spin(channel, value, waitTime);
        } else {
            getChallenge(channel);
        }
    }, wait);
}

function getChallenge(channel) {
    let rand = Math.floor(Math.random() * challenges.length);
    let rand2 = Math.floor(Math.random() * openers.length);
    let o = openers[rand2];
    let c = challenges[rand];
    sendMessage(channel, o + c);
    challenges.splice(rand, 1);
    console.log(challenges);
}

function sendMessage(channel, messageToSend) {
    channel.send(messageToSend);
}