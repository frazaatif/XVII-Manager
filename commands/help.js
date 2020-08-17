module.exports = {
	name: "help",
	args: 0,
	async execute(message, args) {
		const Discord = require('discord.js');
		const helpmsg = new Discord.MessageEmbed()
						   .setTitle("List of Commands")
						   .setColor('#0099ff')
						   .setDescription(":peepogunns:")
						   .addField("`.createpoll`","Use in the same channel you want the poll to be in \n __Available options__ : \n **Node War: ** Flex,Zerg,Support \n **Guild War: ** Flex,Frontline,Backline",false)
						   .addField("`.remind <messageID> <RoleName>`","Use in the same channel the <messageID> is located in \n DM's all the people of the Role(`<RoleName>`) who have not reacted to the message(`messageID`)",false);
		await message.channel.send(helpmsg).catch((err) => console.log(err));
	}
};