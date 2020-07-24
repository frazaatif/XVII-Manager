module.exports = {
	name : "nodepoll" ,
	description : "Use this to track attendance on nodes", 
	args: 1,
	command: true,
	usage: '.nodepoll *message*',
	execute(message, args) {
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
 			 .addField("Zerg ⚔️","Push Enemy Back To Their Bases",false)
 			 .addField("Breaker 🪓","Dive on Enemy Artifact",false)
 			 .addField("Cannoneer\\Hwacha 🏹","Use Cannons/Hwacha",false)
 			 .addField("Mahout 🐘","Elephant Rider",false)
 			 .addField("Support 🛡️","Defend Hwacha/Cannons. Secure Buff Tower",false)
 			 .addField("Scout 🔭 ","Find Enemy Bases",false)		
             .addField("Absent 🆎 ","zZzZ",false)
             .addField("Tentative 🤷","????",false);
        

        
        let sent = message.channel.send(finalmsg).then(sentMessage => {
			sentMessage.react('⚔️')
			.then(() => sentMessage.react('🪓'))
			.then(() => sentMessage.react('🏹'))
			.then(() => sentMessage.react('🐘'))
			.then(() => sentMessage.react('🛡️'))
			.then(() => sentMessage.react('🔭'))
            .then(() => sentMessage.react('🆎'))
            .then(() => sentMessage.react('🤷'));
		    /*
            fs.readFile('presmsgs.json', (err, data) => {
            	if(err) throw err;
            	let idlist = JSON.parse(data);
            	console.log("Read Data for attendance.js");
            });
      		
      		idlist.msgid.push(sentMessage.id);
       		console.log( "pres: " + sentMessage.id );
       		
       		let writeData = JSON.stringify(idlist);

       		fs.writeFile('presmsgs.json',writeData,(err) => {
       			if(err)throw err;
       			console.log("Written " + sentMessage.id + "To File!");
       		});*/
		});
         

	}
 };