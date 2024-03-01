import { type IGameSounds } from '@/config';
import { type IGameControls } from '@/emitters/GameControls/GameControls';
import { type IGameState } from '@/emitters/GameState/GameState';

export interface IScreen {
	connect(state: IGameState, controls: IGameControls, sounds: IGameSounds): void;
	clear(): void;
	render(): void;
}

export interface ILeavableScreen extends IScreen {
	leave(): void;
}

export class Screen implements IScreen {
	protected ctx: CanvasRenderingContext2D;
	protected width: number;
	protected height: number;
	protected gameState: IGameState | null = null;
	protected gameControls: IGameControls | null = null;
	protected gameSounds: IGameSounds | null = null;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;
	}

	connect(state: IGameState, controls: IGameControls, sounds: IGameSounds): void {
		this.gameState = state;
		this.gameControls = controls;
		this.gameSounds = sounds;
	}

	clear(): void {
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	render(): void {
		this.clear();
	}
}
