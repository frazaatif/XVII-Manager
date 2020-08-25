module.exports = {
	name : "createpoll" ,
	description : "Use this to track attendance on nodes", 
	args: 0,
	command: true,
	usage: '.createpoll',
	async execute (message, args) {
		const Discord = require('discord.js');
		
		
					
		const askType = new Discord.MessageEmbed()
							.setColor('#009900')
							.setTitle('Type of required poll')
							.setDescription('Reply with the type of poll you want to create!')
							.addField("1 -> Street War","**Roles Available** \n Flex, Frontline, Backline, Tentative/Absent",false)
							.addField("2 -> Node War","**Roles Available** \n Flex, Zerg, Support, Tentative/Absent",false);
		
		let dm = await message.author.send(askType);
        const dmchannel =  dm.channel;
	
		let filter1 = m => m.content < 3 && m.content > 0;
		dmchannel.awaitMessages(filter1, {max:1, time: 120000}).then(async (collected) => {
			opt = (collected.first().content == 1)?"Street War":"Node War";
			await dmchannel.send(`** ${opt} **it is then ! Now tell me what should be in the poll's description!`);
			
			let filter2 = m => m.content != "";
			dmchannel.awaitMessages(filter2, {max:1, time:120000}).then(async (collected) => {
				descri = collected.last().content;
				await dmchannel.send("Understood, The poll will be created shortly!");
				if(opt == 'Node War') {
					const cannon_emoji = message.client.emojis.cache.get('736206573222887424');
					
					finalmsg = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Node War!')
						.setDescription(`${descri}`)
						.addField("Flex 🪓","**Dive Artifact**",true)
						.addField(" Support 🛡️","**Use/Defend Cannons,Elephant,Hwacha(🔭)\n**",true)
						.addField("Zerg ⚔️","**Push Enemy Back**",true)		
						.addField("Absent/Tentative 🆎 ","**Please Remember to state the reason!**",false);
					
					await message.channel.send(finalmsg).then(async (sentMessage) => {
						sentMessage.react('🪓')
						.then(sentMessage.react('⚔️'))
						.then(sentMessage.react('🛡️'))
						.then(sentMessage.react(cannon_emoji))
						.then(sentMessage.react('🐘'))
						.then(sentMessage.react('🔭'))
						.then(sentMessage.react('🆎'))
						.catch((err) => console.log(err));
					});
				}else {
					finalmsg = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Guild War!')
						.setDescription(`${descri}`)
						.addField("Flex ⚔️     ","**Dive Enemy**",true)
						.addField("Frontline 🪓       ","**Ball together & push**",true)
						.addField("Backline 🏹         ","**Ranged DPS**",true)		
						.addField("Absent/Tentative 🆎 ","**Please Remember to state the reason!**",false);
				
					await message.channel.send(finalmsg).then(async (sentMessage) => {
						sentMessage.react('🪓')
						.then(sentMessage.react('⚔️'))
						.then(sentMessage.react('🏹'))
						.then(sentMessage.react('🆎'))
						.catch((err) => console.log(err));
					});
				}
				
					
			}).catch(async (collected) => {
				await channel.send("Ran into some problem, please try again!");
			});
			
		}).catch(async (collected) => {
			await channel.send("You either didnt reply within 2 minutes or gave an invalid option, try again!");
		});
		
	}
 };
