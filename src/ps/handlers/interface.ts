import type { Message, User } from 'types/ps';

import { owner, prefix, username } from 'config/ps';
import { HelpMessages } from 'cache';

export default function interfaceHandler (message: Message) {
	// Ignore & messages
	if (message.isIntro || !message.author.userid || !message.target) return;
	if (message.author.userid === message.parent.status.userid) return;
	if (message.type === 'pm') {
		// Ignore page requests; the PS interface for this is horrible
		if (message.content.startsWith('|requestpage|')) return;

		/* Challenges and battle-related handlers */

		/* Invites and related handlers */

		/* Standard bot reply */
		// Only reply if the message didn't start from the prefix...
		if (message.content.startsWith(prefix)) return;
		const { userid } = message.author;
		// Don't send the help message if sent in the last 5 minutes
		if (Date.now() - (HelpMessages[userid]?.getTime() ?? 0) < Tools.fromHumanTime('5 minutes')) return;
		HelpMessages[userid] = new Date();
		const helpMessage = `Hi, I'm ${username}, a chatbot by ${owner}! My prefix is \`\`${prefix}\`\` - try \`\`${prefix}help\`\` or \`\`${prefix}commands!\`\``;
		message.reply(helpMessage);
	}
}