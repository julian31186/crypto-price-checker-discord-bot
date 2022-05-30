import dotenv from 'dotenv';
dotenv.config();
import { Client } from  'discord.js';

const token = process.env.BOT_TOKEN;

console.log('Bot is starting...')

const client = new Client({
    intents: []
});
client.login(token)

