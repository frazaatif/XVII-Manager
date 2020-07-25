module.exports = {
	name : "editEmbed",
	description : "Hi!",
	args : 1,
	command: false,
	execute(allPeople, message) {
		const Discord = require('discord.js');
		
		var emojis = ['⚔️','🪓','🏹','🐘','🛡️','🔭','🆎','🤷'];
		
		var people = {'⚔️':"",'🪓':"",'🏹':"",'🐘':"",'🛡️':"",'🔭':"",'🆎':"",'🤷':""};
		
		const reactionManager = message.reactions.cache;
		
		const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
		
		var startTime = new Date().getTime();
		var endTime = new Date().getTime();

		var time = 6000;
		async function getReaction() {

				reactionManager.each(async (messageReaction,emoji) => {
				time -= 600;
				await waitFor(time);

				const useRs =  await message.reactions.resolve(emoji).users.fetch();
				
				for(const User of useRs){
					
					const user_id =  User[0];
					if(user_id == '734080357040914582')return;
					
					const  name = allPeople[user_id];
					
					const nowPeople = people[emoji];
					people[emoji] = nowPeople + name + "\n" ;
					endTime = new Date().getTime();
				}
			
			});
		}
		
		
		
		
		async function start() {

			getReaction();
			
			await waitFor(10000);
			console.log(people);

			console.log(endTime - startTime);
			const descri = message.embeds[0].description;
			const titl = message.embeds[0].title;
			
			const newMsg = new Discord.MessageEmbed()
			     .setColor('#0099ff')
 				 .setTitle(titl)
 				 .setDescription(descri)
 				 .addField("Zerg ⚔️" , "𝗣𝘂𝘀𝗵 𝗘𝗻𝗲𝗺𝘆 𝗕𝗮𝗰𝗸 𝗧𝗼 𝗧𝗵𝗲𝗶𝗿 𝗕𝗮𝘀𝗲𝘀\n" + people['⚔️']    ,false)
 				 .addField("Breaker 🪓" , "𝗗𝗶𝘃𝗲 𝗮𝗻𝗱 𝗕𝗿𝗲𝗮𝗸 𝗔𝗿𝘁𝗶𝗳𝗮𝗰𝘁\n" + people['🪓'],false)
 				 .addField("Support 🛡️","𝗗𝗲𝗳𝗲𝗻𝗱 𝗛𝘄𝗮𝗰𝗵𝗮/𝗖𝗮𝗻𝗻𝗼𝗻𝘀\n" + people['🛡️'],false)
 				 .addField("Cannoneer\\Hwacha 🏹" , "𝗨𝘀𝗲 𝗖𝗮𝗻𝗻𝗼𝗻𝘀/𝗛𝘄𝗮𝗰𝗵𝗮\n" + people['🏹'],true)
 				 .addField("Mahout 🐘" , "𝗘𝗹𝗲𝗽𝗵𝗮𝗻𝘁 𝗥𝗶𝗱𝗲𝗿\n" + people['🐘'],true)
 				 .addField("Scout 🔭 ","𝗙𝗶𝗻𝗱 𝗘𝗻𝗲𝗺𝘆 𝗕𝗮𝘀𝗲𝘀\n" + people['🔭'],true)		
       	         .addField("Absent 🆎 ","zZzZ\n" + people['🆎'],true)
       	         .addField("Tentative 🤷","????\n" + people['🤷'],true);

       	    message.edit(newMsg);

		}

		start();
	}
};
/**/
