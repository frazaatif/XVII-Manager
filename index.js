
console.log("Launching bot...\n");

const fs = require('fs');
const {prefix ,token} = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log("Set :" + command.name);
}


client.login(token);

client.once('ready', () => {
	console.log('Ready!');
});

const talkedRecently = new Set();

client.on('raw', async packet => {
	if(!['MESSAGE_REACTION_ADD'].includes(packet.t))return;
	if(packet.d.user_id == '734080357040914582')return;
	if(talkedRecently.has(packet.d.message_id))return;

	const user = packet.d.user_id;
	const channel = await client.channels.fetch(packet.d.channel_id);

	const message = await channel.messages.fetch(packet.d.message_id);
	if(!message.author.bot)return;

	talkedRecently.add(packet.d.message_id);
	setTimeout(() => {
		talkedRecently.delete(packet.d.message_id);
	}, 40000);
	
	client.commands.get('editEmbed').execute(message);
	console.log("Done!");

});

client.on('message',async message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName))return;
    
    const command = client.commands.get(commandName);
    
    if(command.args > args.length) { 
    	return message.channel.send(`You haven't provided enough arguments , ${message.author}!\n`);
    }
    try {
    	command.execute(message,args);

    } catch(error) {
    	console.error(error);
    	message.reply('There was an error trying to execute the command. Apologies!');
    }

});
