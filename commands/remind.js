module.exports = {
	name: "remind",
	args: 2,
	async execute(message, args) {
		
		const message_id = args.shift();
		const messageToCheck = await message.channel.messages.fetch(message_id);
		const reactionManager = messageToCheck.reactions.cache;
		
		const role_name = args.shift();
		const role = message.guild.roles.cache.find(role => role.name == role_name);
		const roleMembers = role.members;
		
		var reacted = [];
		var promises = reactionManager.map(async (MessageReaction, emoji) => {
			//if(!emojis.includes(emoji))return 
			return MessageReaction.users.fetch()
					.then((presUsers) => {
						for(const User of presUsers){
							reacted.push(User[0]);
						}
				}).catch((err) => console.log(err));
		});
		
		Promise.all(promises).then(async () => {
			for(Member of roleMembers) {
				if(!reacted.includes(Member[0])){
					//console.log(`${Member[1].user.username} => ${Member[1].user.bot}`);
					if(!Member[1].user.bot){
						await Member[1].send(`Hello **${Member[1].user.username}**,You have not reacted to the poll of the upcoming war yet! \n Dont forget to check what role you have been assigned and react accordingly! \n ${messageToCheck.url}`).then(async(mseg) => {
							console.log(`Reminded ${Member[1].user.username} `)
						}).catch(err => console.log(err));
					}
				}
			}
		}).catch(err => console.log(err));
	}
};