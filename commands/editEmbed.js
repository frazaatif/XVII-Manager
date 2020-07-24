module.exports = {
	name : "editEmbed",
	description : "Hi!",
	args : 1,
	command: false,
	execute(message) {
		const Discord = require('discord.js');
		
		var emojis = ['⚔️','🪓','🏹','🐘','🛡️','🔭','🆎','🤷'];
		
		var people = {'⚔️':"",'🪓':"",'🏹':"",'🐘':"",'🛡️':"",'🔭':"",'🆎':"",'🤷':""};
		
		const reactionManager = message.reactions.cache;
		
		const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
		
		var time = 9000;
		async function getReaction() {
			//console.log(reactionManager);
				reactionManager.each(async (messageReaction,emoji) => {
				await waitFor(time);
				time -= 1000;

				const useRs =  await message.reactions.resolve(emoji).users.fetch();
				
				for(const User of useRs){
					await waitFor(500);
					const user_id =  User[0];
					if(user_id == '734080357040914582')return;
					
					const  name = await message.guild.members.fetch(user_id);
					
					const nowPeople = people[emoji];
					people[emoji] = nowPeople + name.displayName + ", " ;
					
				}
			
			});
		}
		
		
		
		
		async function start() {

			await getReaction();
			
			await waitFor(30000);
			console.log(people);

			const descri = message.embeds[0].description;
			const titl = message.embeds[0].title;
			
			const newMsg = new Discord.MessageEmbed()
			     .setColor('#0099ff')
 				 .setTitle(titl)
 				 .setDescription(descri)
 				 .addField("Zerg ⚔️" , "Push To Enemy\n" + people['⚔️']    ,false)
 				 .addField("Breaker 🪓" , "Dive and Break Artifact\n" + people['🪓'],false)
 				 .addField("Cannoneer\\Hwacha 🏹" , "Use Cannons and Hwacha\n" + people['🏹'],false)
 				 .addField("Mahout 🐘" , "Elephant Rider\n" + people['🐘'],false)
 				 .addField("Support 🛡️","Defend Hwacha/Cannons/Buff Tower\n" + people['🛡️'],false)
 				 .addField("Scout 🔭 ","Find Enemy Bases\n" + people['🔭'],false)		
       	         .addField("Absent 🆎 ","zZzZ\n" + people['🆎'],false)
       	         .addField("Tentative 🤷","????\n" + people['🤷'],false);

       	    message.edit(newMsg);

		}

		start();
	}
};
/**/