require('dotenv').config();
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require('discord.js')
const axios = require('axios');
const token = process.env.BOT_TOKEN;


async function getBTCPrice() {
    const BTCPrice = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
            return response.data.bpi.USD.rate;
        })
        .catch(error => {
            console.log(error);
        });

    return BTCPrice
}
  
async function getETHPrice() {
    const ETHPrice = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
        .then(response => {
            return response.data.USD;
        })
        .catch(error => {
            console.log(error);
        });

    return ETHPrice
}

const prefix = '$'

const client = new Client ({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.once("ready", () => {
    console.log("Ready!");
})

client.on("messageCreate", message => {
    if (message.content.startsWith('$')) {
        if(message.content.substring(1) === 'price') {
            const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('deeezx')
            .setDescription('test')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')

            message.channel.send({embeds: [embed]})
        }
    }
})


client.login(token);