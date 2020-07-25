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
 			 .addField("Zerg ⚔️","𝗣𝘂𝘀𝗵 𝗘𝗻𝗲𝗺𝘆 𝗕𝗮𝗰𝗸 𝗧𝗼 𝗧𝗵𝗲𝗶𝗿 𝗕𝗮𝘀𝗲𝘀",false)
 			 .addField("Breaker 🪓","𝗗𝗶𝘃𝗲 𝗮𝗻𝗱 𝗕𝗿𝗲𝗮𝗸 𝗔𝗿𝘁𝗶𝗳𝗮𝗰𝘁",false)
 			 .addField("Support 🛡️","𝗗𝗲𝗳𝗲𝗻𝗱 𝗛𝘄𝗮𝗰𝗵𝗮/𝗖𝗮𝗻𝗻𝗼𝗻𝘀",false)
 			 .addField("Cannoneer\\Hwacha 🏹","𝗨𝘀𝗲 𝗖𝗮𝗻𝗻𝗼𝗻𝘀/𝗛𝘄𝗮𝗰𝗵𝗮",true)
 			 .addField("Mahout 🐘","𝗘𝗹𝗲𝗽𝗵𝗮𝗻𝘁 𝗥𝗶𝗱𝗲𝗿",true)
 			 .addField("Scout 🔭 ","𝗙𝗶𝗻𝗱 𝗘𝗻𝗲𝗺𝘆 𝗕𝗮𝘀𝗲𝘀",true)		
             .addField("Absent 🆎 ","zZzZ",true)
             .addField("Tentative 🤷","????",true);
        

        
        let sent =  message.channel.send(finalmsg).then(async (sentMessage) => {
			await sentMessage.react('⚔️');
			await sentMessage.react('🪓');
			await sentMessage.react('🛡️');
			await sentMessage.react('🏹');
			await sentMessage.react('🐘');
			await sentMessage.react('🔭');
            await sentMessage.react('🆎');
            await sentMessage.react('🤷');
		
			return sentMessage;
		});
         
         

	}
 };
