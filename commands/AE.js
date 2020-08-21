module.exports = {
	name: "ae",
	args: 2,
	command: true,
	async execute(message,args) {
		const Discord = require('discord.js');
		
		await message.react('👍');
		
		console.log("Reached in AE");
		
		const chances = [60,50,40,20,10,5,2.5,1.25,0.63,0.32];
		
		var reached = [0,0,0,0,0,0,0,0,0,0,0];
		var succeeded = [0,0,0,0,0,0,0,0,0,0,0];
		var Romans = ["+40","I","II","III","IV","V","VI","VII","VIII","IX","X"];
		
		var pres = args.shift();
		const initia = pres;
		const endgoal = args.shift();
		
		if(endgoal <= pres){
			//console.log("endgoal <= pres");
			return;
		}
		var pristines = 0;
		var restores = 0, highest = 0;
		const channel = message.channel;
		
		while(pres < endgoal) {
			++pristines;
			var chance = (pres < 3)?((11/10)*chances[pres]):((3/2)*chances[pres]);
			//console.log(pres + " " + chance);
			var chanceNow = (Math.random()*100);
			//console.log(chanceNow +"<-");
			if(chanceNow <= chance) {
				succeeded[pres]++;
				++pres;
			}else {
				if(pres == 0)continue;
				restores += 200;
				chanceNow = (Math.random()*100);
				if(!(chanceNow <= 50)) {
			//		console.log("Resto Failed");
					--pres;
				}else{
					--reached[pres];
				}
			}
			if(pres > highest)highest = pres;
			reached[pres]++;
			if(pres == endgoal){
				var msg = new Discord.MessageEmbed()
							.setTitle("Auto Awakening Enhancement")
							.setDescription(`You used ** ${pristines} Pristines , ${5*pristines}M Silver** and ** ${restores} Resto scrolls**to reach your target!\n Number of times you reached a particular enhancement is stated below:`);
				
				for(let i = 0 ; i <= endgoal ; ++i) {
					if(!reached[i])continue;
					msg.addField(`${Romans[i]} : ${reached[i]}`,`Time's succeeded to next level: ${succeeded[i]}`,false);
				}			
				msg.addField("Methods used: ", "-> 10% valks till DUO, 50% rest of the times \n -> No restoration attempts for +40/I \n -> **'Number of Times reached an Enhancement'** counts how many times you reached that enhancement either from Falling back from next level/Successful Enhancement from previous level");
				await channel.send(msg);
			}
			if(pristines >= 100000){
				message.reply(`Sorry ,Could not reach ${Romans[endgoal]} from ${Romans[initia]} within 100k pristines :( \n Highest you could reach was ${Romans[highest]}`);
				return;
			}
		}
		
		
		
		
		
	}
}