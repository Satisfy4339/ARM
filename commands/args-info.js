module.exports = {
	name: 'args-info',
	description: 'Arguments Info',
	args: true,
	execute(message, args) {
		if(args[0] === 'foo') {
			return message.channel.send ('bar');
		}

		message.channel.send(`Arguments: ${args} \nArguments Length: ${args.length}`);
	},
};