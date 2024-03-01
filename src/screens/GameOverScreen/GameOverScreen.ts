import { KeyboardKeyCodes, type IGameSounds } from '@/config';
import { type IGameControls } from '@/emitters/GameControls/GameControls';
import { type IGameState } from '@/emitters/GameState/GameState';
import { Screen, type ILeavableScreen } from '@/screens/Screen/Screen';

export class GameOverScreen extends Screen implements ILeavableScreen {
	#onEscapeListener: () => void;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);

		this.#onEscapeListener = () =>
			this.gameState?.update({
				isStarted: false,
				isOver: false,
				totalScore: 0,
			});
	}

	connect(state: IGameState, controls: IGameControls, sounds: IGameSounds): void {
		super.connect(state, controls, sounds);

		this.gameControls?.on(KeyboardKeyCodes.Escape, this.#onEscapeListener);
		this.render();
	}

	leave(): void {
		this.gameControls?.off(KeyboardKeyCodes.Escape, this.#onEscapeListener);
	}

	render(): void {
		super.render();

		const [width, height] = [this.width / 2, this.height / 2 - 60];

		this.ctx.fillStyle = '#ffffff';
		this.ctx.fillText('Game Over', width, height);
		this.ctx.fillText(`Your score: ${this.gameState?.get('totalScore')}`, width, height + 60);
		this.ctx.fillText('Press `Esc` to start', width, height + 120);
		this.ctx.fillText('a new game', width, height + 180);
	}
}
