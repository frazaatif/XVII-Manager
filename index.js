console.log("Launching bot...\n");

const fs = require('fs');
const {prefix ,token} = require('./config.json');
const Discord = require('discord.js');

var admin = require('firebase-admin');
const serviceAccountKey = {
  "type": "service_account",
  "project_id": "capt-pepe-1595573631364",
  "private_key_id": "0046cd9d8d96279a835c0371c8a1fb1557c9533b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgXa9SmImpIH2q\nJc1+tXICI3iteMQUGEPdJ1HcJPZIK6fIs8k97yiX5+sk3JpKuYrN056fFNX1TZQw\nq80jTbvuJKZcL6VyWCa8/c1Nj79go9UN+8ofAOtsHuvagUuffuRnOz8CNmPccMn2\nhl9kjfQMk8J3rxadne0TGBCmzJ0GzDqecqSGF5aebv6foxd1UCVpzTSXWI2t1JkD\nSUN5N8GHUFtV1H//mC487LgT1IxESHxzQ8G/hp5tBXOVOziSxRzZVKO6FbN3LO7Q\ndOVjA12tKZURdKpoemHDa9LuoJwxMgrRRD3gOBD+mhgyd8q6yOODCflrQnfSpo2R\n10V2bqxTAgMBAAECggEAAPtmD0yIZYkyYKy6oZ3xOPtkD4KrkqGU4xFxB3nCutox\naVaumG5usDoPaZeSEYbyFTK3yviuzRVBbVd7d03QRo/RSOUaaGqbu6+hwmnEWZ8K\nsYvyEe/36tZt5eD5YVblpvLgmqkwvFwgi0TRxphyz7q7TT1pTs291s6M/BNJK9aK\nf1pGIm0HRkzNAkHvs0WbmvP0z+4tcVpjjyfjbMonDE9gouBzVFHGDbBUM4Vi8hN0\ne1OrdtBGizSqgaQkPkVZTGaOeL9tVkRCqAEGqSKeXXJ3qVjwFOMTlpFKPYiiDhR2\nNVRpvi8Art1u76xWrrb6Vb4OWIyWJ0hnFXHShiz6TQKBgQDPzWFKRolRTlCMNMiS\n2k97rX6trW0YSrQyB4lLMqNM7/iwNimVc7xcKEqT+u6C9UEsJHtNYvwEp5ActzXm\nQk6MSt+6r/RE5+LzUAer3Gv6Tjgfeu++WUUcTfDYF+02lD2dvJ2FFYGrVZbUkVYT\nMT2k0oZk9GRwadbRgMw699N7jwKBgQDFj7ERXDnb2jbu7ycXUy7Al2GMxMM2yR2E\ntq8HOMY7FJ+afMkARS6MqIR66uo0Mhwa7xKqcJfEsB8sNdf3fECJM0o9VmiZXlv9\nTVlRRjVqyhcKA6/RD57NPJB/z8A8mN3/26K5MBOglSZyaxU0LpzBSamBacc9q+Dg\nUMC7wjFw/QKBgDRB4OKN5IB24liv+XS8w9pFYiMJBvNh7fja3lLz1A9IFdEyfbig\n11CRrVeTdiGmzZHtRrjKWLhO7zXZeQuDxz8OoT7QeuxNKEyp5pP4pYrX2tNH1jyX\nNIMOsq+VLMlZ9DjTswVByE8vAfRI7E19R5RIgRWoRA3k/+nFqxZ1NlDPAoGAa8S0\njInIrhtdN/2RT3H64OgzOHzlGG+hAJI+7CuWRwg7ACTt6I3UlLogeoTG+W4UUsTz\nY7JDt/FzL8S3aLOI6M7nwonuSStl9slI3cL0xKo04yubrulccQyGrpH/hY7GGxoO\nrAKD0mdKL8QmLu72Z6HtK0EuhH/MDdE/Maz/F2kCgYEAxEHwKIcPAvBxY/CcOXLG\nwitNAUqagwukwL9lxihdJeWS3as7fQhO+AwjW2RxNHbEYLil6AtIp8XaQ/tT5DCb\nAZBgl2igMZyvO+guCxshMEaWEorX3roYVhyPL7VNFPTmuhtuDBv3exZhyLLuHgW0\nojETjauXzj6TlmZxwyloKZM=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-k4a8f@capt-pepe-1595573631364.iam.gserviceaccount.com",
  "client_id": "118315261931401311501",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k4a8f%40capt-pepe-1595573631364.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://capt-pepe-1595573631364.firebaseio.com"
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
	     	const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
		
			const pollmsgID = "752198260382367834";
			const pollchannelID = "752197245822173375";
			const newName = args.shift();
			
			const authorName = message.guild.members.cache.get(message.author.id).displayName;
		
			var ref = db.ref("names");
			const snapshot = await ref.once('value');
		
			//console.log(snapshot.child(`${newName}`).exists());
			
			if(snapshot.child(`${newName}`).exists()){
				
				var info = snapshot.child(`${newName}`).val().votedBy ;
				var Votes = snapshot.child(`${newName}`).val().votes;
				if(info.includes(message.author.id)) {
					message.reply(`You have already voted for ${newName}!`).then(async (sentMessage) => {
						await waitFor(2000);
						await message.delete();
						await sentMessage.delete();
					});
					return;
				}
				info.push(message.author.id);
				Votes++;
				ref.child(`${newName}`).update({
					votedBy: info
				});
				message.reply(`You voted for ${newName}`).then(async(sentMessage) => {
					await waitFor(2000);
					await message.delete();
					await sentMessage.delete();
				});
				 redopoll();
			}else{
				
				ref.child(`${newName}`).set({
					createdBy: message.author.id,
					votedBy: [message.author.id]
				});
				
				message.author.send(`You created the option ${newName} !`).then(async (sentMessage) => {
					await waitFor(2000);
					await message.delete();
				});
				redopoll();
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

async function redopoll(namesInfo) {
	
	const pollmsgID = "752198260382367834";
	const pollchannelID = "752197245822173375";
	
	const pollMsg = await client.channels.cache.get(pollchannelID).messages.fetch(pollmsgID);
	
	var namesInfo = await getAll();
	
	var topnames = "", topvotes = "";
	var extraNames = "";
	
	if(!namesInfo.length) {
		topnames = "N/A";
		topvotes = "N/A";
	    extraNames = "N/A";
	}else {
		namesInfo.sort((a,b) => (a.count > b.count) ? -1 : ((b.count > a.count) ? 1 : 0));
		var toplimit = (namesInfo.length < 20) ? namesInfo.length : 20;
		while(toplimit) {
			topnames += namesInfo[0].name + "\n";
			topvotes += namesInfo[0].count + "\n";
			namesInfo.shift();
			--toplimit;
		}
		if(!namesInfo.length){extraNames = "N/A";}
		toplimit = namesInfo.length;
		while(toplimit && extraNames.length <= 500) {
			extraNames += ` ${namesInfo[0].name}(${namesInfo[0].count}) `
			namesInfo.shift();
			--toplimit;
		}
	}
	const newMsg = new Discord.MessageEmbed()
						.setTitle("A New Name for a New Family :) ")
						.setDescription("Use **.vote <name>** to vote for a name. It will be added if does not already exist in list :) \n You can vote for as many names as you want, once per name. ")
						.addField("Top Names" , topnames, true)
						.addField("Total Votes", topvotes, true)
						.addField("Other names", extraNames, false);
	await pollMsg.edit(newMsg);
	return Promise.resolve();
	
	async function getAll() {
	  const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
		
	  var ref = db.ref("names");
	  const snapshot = await ref.once('value');
	  var info = [];
	  snapshot.forEach((objec) => {
		  info.push({name: objec.key, count: objec.val().votedBy.length});
	  });
	  await waitFor(1000);
	  return info;
	}
}
