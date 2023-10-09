// GAMES is a meta-command that generates multiple commands
// All games share a very similar interface, so this allows
// for advanced code sharing and reuse than the older Games

const GameStates = {
	Chess: {
		board: [[]] as string[][],
		turn: 'W' as 'W' | 'B'
	}
};

type GameConfig = {
	name: string;
	id: string;
	rules: string;
	aliases?: string[];
	playerCount: number | [number, number];
	state: typeof GameStates[keyof typeof GameStates];
};


const GAME_CONFIGS: readonly GameConfig[] = [{
	name: 'Chess',
	id: 'chess',
	rules: 'https://lichess.org/learn#/',
	playerCount: 2,
	state: GameStates.Chess
}] as const;

const GAMES = GAME_CONFIGS.map((config: GameConfig): PSCommand => {
	return {
		name: config.id,
		help: config.rules, // TODO: Show command help
		async run (message: PSMessage) {
			message.reply(`Game to play: ${config.name}`);
		}
	};
});
export default GAMES as PSCommand[];
