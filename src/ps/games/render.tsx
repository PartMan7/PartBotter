import { Button } from '@/utils/components/ps';

import type { BaseState } from '@/ps/games/common';
import type { Game } from '@/ps/games/game';
import type { ReactElement, ReactNode } from 'react';

export function renderSignups<State extends BaseState>(this: Game<State>): ReactElement {
	return (
		<>
			<hr />
			<h1>{this.meta.name} Signups have begun!</h1>
			{this.sides
				? Object.entries(this.meta.turns!)
						.filter(([turn]) => !this.players[turn])
						.map(([side, sideName]) => (
							<Button key={side} value={`${this.renderCtx.msg} join ${this.id}, ${side}`} style={{ margin: 5 }}>
								{sideName}
							</Button>
						))
				: null}
			{this.sides && this.turns.length - Object.keys(this.players).length > 1 ? (
				<Button value={`${this.renderCtx.msg} join ${this.id}, -`} style={{ margin: 5 }}>
					Random
				</Button>
			) : null}
			{!this.sides ? <Button value={`${this.renderCtx.msg} join ${this.id}`}>Join</Button> : null}
			<hr />
		</>
	);
}

export function renderCloseSignups<State extends BaseState>(this: Game<State>): ReactElement {
	return (
		<>
			<hr />
			<h1>{this.meta.name} Signups have closed.</h1>
			<Button value={`${this.renderCtx.msg} watch ${this.id}`}>Watch</Button>
			<hr />
		</>
	);
}

type Label = 'A-Z' | 'Z-A' | '1-9' | '9-1';

function getLabels(amount: number, label: Label): string[] {
	const base = Array.from({ length: amount }).map((_, index) => index + 1);
	if (label === '9-1' || label === 'Z-A') base.reverse();
	if (label === 'A-Z' || label === 'Z-A') return base.map(num => num.toLetter());
	else return base.map(num => num.toString());
}

export type CellRenderer<T> = (props: { cell: T; i: number; j: number }) => ReactNode;

export function Table<T>({
	board,
	rowLabel,
	colLabel,
	Cell,
}: {
	board: T[][];
	rowLabel: Label;
	colLabel: Label;
	Cell: CellRenderer<T>;
}): ReactElement {
	const rowLabels = getLabels(board.length, rowLabel);
	const colLabels = getLabels(board[0].length, colLabel);
	return (
		<table
			style={{
				borderCollapse: 'collapse',
				margin: 20,
			}}
		>
			<tbody>
				<tr>
					<th />
					{colLabels.map(label => (
						<th style={{ color: 'gray', height: 20 }}>{label}</th>
					))}
					<th />
				</tr>

				{board.map((row, i) => (
					<tr>
						<th style={{ color: 'gray', width: 20 }}>{rowLabels[i]}</th>
						{row.map((cell, j) => (
							<Cell cell={cell} i={i} j={j} />
						))}
						<th style={{ color: 'gray', width: 20 }}>{rowLabels[i]}</th>
					</tr>
				))}

				<tr>
					<th />
					{colLabels.map(label => (
						<th style={{ color: 'gray', height: 20 }}>{label}</th>
					))}
					<th />
				</tr>
			</tbody>
		</table>
	);
}
