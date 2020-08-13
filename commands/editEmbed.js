module.exports = {
	name : "editEmbed",
	description : "Hi!",
	args : 1,
	command: false,
	execute(allPeople, message) {
		const Discord = require('discord.js');
		
		var emojis = ['⚔️','🪓','🏹','🆎'];
		
		var people = {'⚔️':[],'🪓':[],'🏹':[],'🆎':[]};
		
		const reactionManager = message.reactions.cache;
		
		const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
		

		
		
		
		
		async function start() {
	
			var promises = reactionManager.map(async (MessageReaction, emoji) => {
				if(!emojis.includes(emoji))return 
				return MessageReaction.users.fetch()
						.then((presUsers) => {
							presUsers.forEach(async (Snowflake, User) => {
								if(User != '734080357040914582') {
									//var nowPeople = people[emoji];
									//people[emoji] = nowPeople + ", " + allPeople[User];	
									people[emoji].push(allPeople[User]);
								}
							});
						}).catch((err) => console.log(err));
			});
			Promise.all(promises).then(() => {
				console.log(people);

				const descri = message.embeds[0].description;
				const titl = message.embeds[0].title;
			
				const newMsg = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(titl)
					.setDescription(descri)
					.addField("Zerg ⚔️","**Clash with enemy and push them back to their base**\n" + people['⚔️'].join(),false)
					.addField("Breaker 🪓","**Dive into Enemy Artifact**\n" + people['🪓'].join(),false)
					.addField("Support 🏹","**Use/Defend Cannons/Hwacha**\n" + people['🏹'].join(),false)		
					.addField("Absent/Tentative 🆎","**Please Remember to state the reason!**\n" + people['🆎'].join(),true);

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

			const descri = message.embeds[0].description;
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
