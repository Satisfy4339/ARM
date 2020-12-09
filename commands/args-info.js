module.exports = {
	name: 'args-info',
	description: 'Arguments Info',
	args: true,
	category: 'fun',
	execute(message, args) {
		message.channel.send(`Arguments: ${args} \nArguments Length: ${args.length}`);
	},

};