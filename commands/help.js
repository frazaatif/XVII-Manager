module.exports = {
	name: "help",
	command: true,
	description: "Help to all commands",
	usage: ".help",
	args: false,
	execute (message,args) {
		const Discord = require('discord.js');
		const fs = require('fs');
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		const newMsg = new Discord.MessageEmbed()
						.setTitle('Capt.Pepe to the service!')
						.setDescription('Following are the commands i can assist you with:');
		
		for(const file of commandFiles) {
			const now = require(`./commands/${file}`);
			
			if(now.command) {
			
				newMsg.addField(now.name , now.usage + "-> " + now.description, false);

			}
		}
		message.channel.send(newMsg);
	}


};