module.exports = {
	name: 'args-info',
	description: 'Arguments Info',
	cooldown: 3,
	args: true,
	aliases: ['ai', 'a_i'],
	category: 'fun',
	execute(message, args) {
		message.channel.send(`Arguments: ${args} \nArguments Length: ${args.length}`);
	},

};