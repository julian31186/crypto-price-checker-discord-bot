require('dotenv').config();
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js')
const axios = require('axios');
const token = process.env.BOT_TOKEN;


async function getBTCPrice() {
    const BTC = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
            return response.data.bpi.USD.rate;
        })
        .catch(error => {
            console.log(error);
        });
    return BTC
}
  
async function getETHPrice() {
    const ETH = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
        .then(response => {
            return response.data.USD;
        })
        .catch(error => {
            console.log(error);
        });
        return ETH
}

const BTC = getBTCPrice();
const ETH = getETHPrice();

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
            message.reply(`${BTC} ${ETH}`)   
        }
    }
})


client.login(token);