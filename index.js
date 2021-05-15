console.log("Launching bot...\n");

const fs = require('fs');
const {prefix ,token} = require('./config.json');
const Discord = require('discord.js');

var admin = require('firebase-admin');
const serviceAccountKey = {
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: ""
});
var db = admin.database();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log("Set :" + command.name);
}

var functions = [
	{
		name : "vote",
		args: 1,
		async execute(message, args){
			
			const newName = args.shift();
			
			const authorName = message.guild.members.cache.get(message.author.id).displayName;
		
			var ref = db.ref("names");
			const snapshot = await ref.once('value');
		
			//console.log(snapshot.child(`${newName}`).exists());
			
			if(snapshot.child(`${newName}`).exists()){
				
				var NSFWinfo = snapshot.child(`NSFW`).val().votedBy;
				var Ygginfo = snapshot.child(`Yggdrasil`).val().votedBy;
				
				if(NSFWinfo.includes(message.author.id) || Ygginfo.includes(message.author.id)) {
					message.author.send(`You have already voted for ${(NSFWinfo.includes(message.author.id)?'NSFW':'Yggdrasil')}!`).then(async (sentMessage) => {
						await message.delete();
					});
					return;
				}
				if(newName == 'NSFW') {
					
				    NSFWinfo.push(message.author.id);
					ref.child(`${newName}`).update({
					  votedBy: NSFWinfo
				    });
				    redopoll();
				}else if(newName == 'Yggdrasil') {
					
				    Ygginfo.push(message.author.id);
					ref.child(`${newName}`).update({
					  votedBy: Ygginfo
				    });
				    redopoll();
				}
				
				message.author.send(`You voted for ${newName}!`).then(async (sentMessage) => {
						await message.delete();
				});
				
			} else {
					message.author.send(`Invalid option , Vote for either NSFW or Yggdrasil only!`).then(async (sentMsg) => {
						await message.delete();
					});
					return;
			}
			
		}
	}
]

for (const file of functions) {
	client.commands.set(file.name, file);
	console.log("Set: " + file.name);
}

const people = {};

client.login(token);

client.once('ready', async () => {
	
	const members  = client.guilds.resolve('661862380996919322').members.cache;
	members.each((member) => {
		people[member.id] = member.displayName;
	});
	
	/*
	var names = "**Top Names**\n",numbe = "**Total count**\n";
	const msgtosend = new Discord.MessageEmbed()
	                      .setTitle('A New Name for a New Family :) ')
						  .setDescription("Use the command **.vote <name>** to vote for your favoutrite name, it will be added into the list if it's not already there. ")
						  .addField(`Top Names`,"N/A",true)
						  .addField('Total Count',"N/A",true);
	
	await client.channels.cache.get('752197245822173375').send(msgtosend); 
	*/
	console.log('Ready!');
});

const talkedRecently = new Set();

client.on('raw', async packet => {
	if(!['MESSAGE_REACTION_ADD'].includes(packet.t))return;
	if(packet.d.user_id == '734080357040914582')return;

	if(talkedRecently.has(packet.d.message_id)){
		return;
	}

	const user = packet.d.user_id;
	const channel = await client.channels.fetch(packet.d.channel_id);

	const message = await channel.messages.fetch(packet.d.message_id);
	if(message.author.id != '734080357040914582')return;

	talkedRecently.add(packet.d.message_id);
	
	setTimeout(() => {
		client.commands.get('editEmbed').execute(people, message);
		talkedRecently.delete(packet.d.message_id);
	}, 5000);
	
	client.commands.get('editEmbed').execute(people, message);
	console.log("Done!");

});

client.on('message',async message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName))return;
    
    const command = client.commands.get(commandName);
    
    if(command.args > args.length) { 
		console.log(args);
    	return message.channel.send(`You haven't provided enough arguments , ${message.author}!\n`);
    }
    try {
    	command.execute(message,args);

    } catch(error) {
    	console.error(error);
    	message.reply('There was an error trying to execute the command. Apologies!');
    }

});

async function redopoll() {
	
	var ref = db.ref("names");
	const snapshot = await ref.once('value');
	
	var NSFWinfo = snapshot.child(`NSFW`).val().votedBy;
	var Ygginfo = snapshot.child(`Yggdrasil`).val().votedBy;
	
	const newMsg = new Discord.MessageEmbed()
	                  .setTitle('Name Poll Finale :)')
					  .setDescription('Vote for your favourite name by using **.vote name**')
					  .addField('NSFW',`Voted by **${NSFWinfo.length-1}** people!`,false)
					  .addField('Yggdrasil',`Voted by **${Ygginfo.length-1}** people!`,false);
					  
	const pollmsgID = "753957524881014864";
	const pollchannelID = "752197245822173375";

	const pollMsg = await client.channels.cache.get(pollchannelID).messages.fetch(pollmsgID);
	await pollMsg.edit(newMsg);
		
}
