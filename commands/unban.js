const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    aliases: ['ressurect'],
	cooldown: 3,
	usage: '@member',
	description: 'Unbans a Member from the Server.',
	args: true,
	category : 'moderation',
	guildOnly: true,

    
    execute(client, message, args) {
        let userID = args[0]
            message.guild.fetchBans().then(bans=> {
            if(bans.size == 0) return 
            let bUser = bans.find(b => b.user.id == userID)

        const noUserPerms = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | I was unable to Unban ${bUser.user.tag}`, 'https://i.imgur.com/dOo8hhd.png')
        .setDescription(`You have to have \`Ban members\` permission to run this command.`);

        const noBotPerms = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | I was unable to Unban ${bUser.user.tag}`, 'https://i.imgur.com/dOo8hhd.png')
        .setDescription(`I am missing the \`Ban members\`.`);

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(noUserPerms).then(msg => {
            msg.delete({ timeout: 6000 });
        });
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(noBotPerms).then(msg => {
            msg.delete({ timeout: 6000 });
        });
          
          
            if(!bUser) return
            message.guild.members.unban(bUser.user)
        
            const UnbanEmbed = new MessageEmbed()
                .setColor('#e56904')
                .setAuthor(`Successfully Unbaned ${bUser.user.tag}`,'https://i.imgur.com/FYwvE4X.png');
    
            message.channel.send(UnbanEmbed);
    })
    }
};