module.exports = {
	name : "nodepoll" ,
	description : "Use this to track attendance on nodes", 
	args: 1,
	command: true,
	usage: '.nodepoll *message*',
	execute (message, args) {
		const Discord = require('discord.js');
		const fs = require('fs');

		var msg = "";
		for(let v in args) {
			msg = msg + args[v] + " ";
		}

		const finalmsg = new Discord.MessageEmbed()
		     .setColor('#0099ff')
 			 .setTitle('Node War!')
 			 .setDescription(`${msg}`)
 			 .addField("Zerg ⚔️","**Clash with enemy and push them back to their base**",false)
 			 .addField("Breaker 🪓","**Dive into Enemy Artifact**",false)
 			 .addField("Support 🏹","**Use/Defend Cannons/Hwacha**",false)		
             .addField("Absent/Tentative 🆎 ","**Please Remember to state the reason!**",true)
        

        
        message.channel.send(finalmsg).then(async (sentMessage) => {
			sentMessage.react('⚔️')
			.then(sentMessage.react('🪓'))
			.then(sentMessage.react('🏹'))
            .then(sentMessage.react('🆎'))
			.catch((err) => console.log(err));
		});
         
         

	}
 };
