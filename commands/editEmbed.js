module.exports = {
	name : "editEmbed",
	description : "Hi!",
	args : 1,
	command: false,
	execute(allPeople, message) {
		const titl = message.embeds[0].title;
		if(titl != 'Node War!') {
		    if(titl != 'Guild War!'){return;}
		}
		const Discord = require('discord.js');
		
		var emojis = ['⚔️','🪓','🏹','🆎'];
		
		var people = {'⚔️':[],'🪓':[],'🏹':[],'🆎':[]};
		
		const reactionManager = message.reactions.cache;
		
		const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
		

		
		
		
		
		async function start() {
			var totcount = 0,abscount = 0;
			var promises = reactionManager.map(async (MessageReaction, emoji) => {
				if(!emojis.includes(emoji))return 
				return MessageReaction.users.fetch()
						.then((presUsers) => {
							var count = 0;
							for(User of presUsers) {
								if(User[0] == '734080357040914582')continue;
								count++;
								people[emoji].push("`" + count + ".`" + allPeople[User[0]]);
							}
							if(emoji == '🆎')count = 0;
							totcount += count;
						}).catch((err) => console.log(err));
			});
			Promise.all(promises).then(() => {
				console.log(people);
				//const descri = "Friendly War with AllegianceAE on Tuesday 20:30 (Server) at Kamasylve Valley";
				const descri = message.embeds[0].description;
				const titl = message.embeds[0].title;
			
				const newMsg = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(titl)
					.setDescription(descri);
					
				if(titl == "Node War!"){	
					newMsg.addField("Available:`" + totcount + "`" ,"***Familiarize with your Roles and Join VC 10mins before for briefing!***",false)
					.addField("Flex 🪓     ","**Dive Artifact**\n" + people['🪓'].join('\n'),true)
					.addField("Zerg ⚔️   ","**Push Enemy Back**\n" + people['⚔️'].join('\n'),true)
					.addField("Support 🏹 ","**Use/Defend\nCannons/Hwacha**\n" + people['🏹'].join('\n'),true)		
					.addField("Absent/Tentative 🆎","**Please Remember to state the reason!**\n" + people['🆎'].join(),false);
				} else {
					newMsg.addField("Available:`" + totcount + "`" ,"***Familiarize with your Roles and Join VC 10mins before for briefing!***",false)
					.addField("Flex 🪓     ","**Dive Enemy**\n" + people['🪓'].join('\n'),true)
					.addField("Frontline ⚔️   ","**Ball together & push**\n" + people['⚔️'].join('\n'),true)
					.addField("Backline 🏹 ","**Ranged DPS**\n" + people['🏹'].join('\n'),true)		
					.addField("Absent/Tentative 🆎","**Please Remember to state the reason!**\n" + people['🆎'].join(),false);
				}

				message.edit(newMsg);
			});
		}

		start();
	}
};
/*var time = 4000;
			reactionManager.forEach(async (MessageReaction,emoji) => {
				time -= 1000;
				//await waitFor(time);
				const presUsers = await MessageReaction.users.fetch();
				//console.log(presUsers);
				presUsers.forEach(async (Snowflake, User) => {
					if(User != '734080357040914582') {
						var nowPeople = people[emoji];
						people[emoji] = nowPeople + ", " + allPeople[User];	
					}
				});
			});
			await waitFor(5000);
			console.log(people);
			const descri = "Friendly War with AllegianceAE on Tuesday 20:30 (Server) at Kamasylve Valley"
			//const descri = message.embeds[0].description;
			const titl = message.embeds[0].title;
			
			const newMsg = new Discord.MessageEmbed()
			     .setColor('#0099ff')
 				 .setTitle(titl)
 				 .setDescription(descri)
 				 .addField("Zerg ⚔️","**Clash with enemy and push them back to their base**\n" + people['⚔️'],false)
				 .addField("Breaker 🪓","**Dive into Enemy Artifact**\n" + people['🪓'],false)
				 .addField("Support 🏹","**Use/Defend Cannons/Hwacha**\n" + people['🏹'],false)		
				 .addField("Absent/Tentative 🆎","**Please Remember to state the reason!**\n" + people['🆎'],true);

       	    message.edit(newMsg);
*/
