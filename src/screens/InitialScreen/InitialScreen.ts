import { KeyboardKeyCodes, type IGameSounds } from '@/config';
import { type IGameControls } from '@/emitters/GameControls/GameControls';
import { type IGameState } from '@/emitters/GameState/GameState';
import { Screen, type ILeavableScreen } from '@/screens/Screen/Screen';

export class InitialScreen extends Screen implements ILeavableScreen {
	#onEnterListener: () => void;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);

		this.#onEnterListener = () => this.gameState?.update({ isStarted: true });
	}

	connect(state: IGameState, controls: IGameControls, sounds: IGameSounds): void {
		super.connect(state, controls, sounds);
		this.gameControls?.on(KeyboardKeyCodes.Enter, this.#onEnterListener);
		this.render();
	}

	leave(): void {
		this.gameControls?.off(KeyboardKeyCodes.Enter, this.#onEnterListener);
	}

	render(): void {
		super.render();

		const [width, height] = [this.width / 2, this.height / 2 - 60];

		this.ctx.fillStyle = '#ffffff';
		this.ctx.fillText('Space Invaders', width, height);
		this.ctx.fillText('Press `Enter` to start', width, height + 60);
	}
}
