import { GamesList } from '@/ps/games/common';
import { ConnectFour, meta as ConnectFourMeta } from '@/ps/games/connectfour';
import { Mastermind, meta as MastermindMeta } from '@/ps/games/mastermind';
import { Othello, meta as OthelloMeta } from '@/ps/games/othello';

export const Games = {
	[GamesList.Othello]: {
		meta: OthelloMeta,
		instance: Othello,
	},
	[GamesList.Mastermind]: {
		meta: MastermindMeta,
		instance: Mastermind,
	},
	[GamesList.ConnectFour]: {
		meta: ConnectFourMeta,
		instance: ConnectFour,
	},
};
export type Games = typeof Games;
