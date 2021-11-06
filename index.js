const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials : ["CHANNEL"]} );

const prefixo = '!';
const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./comandos/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
{
    const command = require(`./comandos/${file}`);
    bot.commands.set(command.name, command);
}

const token = /*Substitua essa variável com o seu token*/;

bot.on ('ready', messageCreate => 
{
    console.log('Rodando');
})

bot.on('message', messageCreate => 
{
    if(!messageCreate.content.startsWith(prefixo) || messageCreate.author.bot) 
        return;
    const args = messageCreate.content.slice(prefixo.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'play' || command === 'skip' || command === 'stop' || command === 'p')
    {
        bot.commands.get('play').execute(messageCreate, args, command, bot, Discord);
    }
})

bot.login(token);
