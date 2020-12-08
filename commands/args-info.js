module.exports = {
	name: 'args-info',
	description: 'Arguments Info',
	args: true,
	execute(message, args) {
		message.channel.send(`Arguments: ${args} \nArguments Length: ${args.length}`);
	},

};