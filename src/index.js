require('dotenv').config();
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require('discord.js')
const axios = require('axios');
const token = process.env.BOT_TOKEN;

async function getBTCPrice() {
    const res = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
    const BTC = res.data.USD
    return BTC.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

async function getETHPrice() {
    const res = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    const ETH = res.data.USD
    return ETH.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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

client.on("messageCreate", async message => {
    if (message.content.startsWith('$')) {
        if(message.content.substring(1) === 'price' || message.content.substring(1) === 'Price' || message.content.substring(1) === 'PRICE') {
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Price')
            .setDescription(`BTC: $${await getBTCPrice()} \n ETH: $${await getETHPrice()}`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png')
                
            message.channel.send({embeds: [embed]})
           
        }
    }
})


client.login(token);