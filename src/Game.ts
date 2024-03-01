import {
	CanvasConfig,
	FPS,
	InitialGameStateConfig,
	type IGameIndicators,
	type IGameSounds,
} from '@/config';
import { GameControls, type IGameControls } from '@/emitters/GameControls/GameControls';
import { GameState, type IGameState } from '@/emitters/GameState/GameState';
import { GameOverScreen } from '@/screens/GameOverScreen/GameOverScreen';
import { InitialScreen } from '@/screens/InitialScreen/InitialScreen';
import { PlaygroundScreen } from '@/screens/PlaygroundScreen/PlaygroundScreen';
import { type ILeavableScreen } from '@/screens/Screen/Screen';

export interface IGame {
	getScreen(): ILeavableScreen;
	start(): void;
	pause(): void;
	resume(): void;
	stop(): void;
}

export class Game implements IGame {
	#ctx: CanvasRenderingContext2D;
	#state: IGameState;
	#controls: IGameControls;
	#sounds: IGameSounds;
	#indicators: IGameIndicators;
	#activeScreen: ILeavableScreen | null = null;
	#RERENDER_INTERVAL_ID: ReturnType<typeof setInterval> | null = null;
	#onKeyDown: (event: KeyboardEvent) => void;
	#onKeyUp: (event: KeyboardEvent) => void;

	constructor(ctx: CanvasRenderingContext2D, $sounds: IGameSounds, $indicators: IGameIndicators) {
		this.#ctx = ctx;
		this.#ctx.font = CanvasConfig.font;
		this.#ctx.textBaseline = CanvasConfig.textBaseline;
		this.#ctx.textAlign = CanvasConfig.textAlign;

		this.#state = new GameState(InitialGameStateConfig);
		this.#controls = new GameControls();
		this.#sounds = $sounds;
		this.#indicators = $indicators;
		// TODO: lives update
		this.#indicators.lives.textContent = String(this.#state.get('lives'));
		this.#indicators.totalScore.textContent = String(this.#state.get('totalScore'));

		this.#onKeyDown = (event: KeyboardEvent) => this.#controls.onKeyDown(event);
		this.#onKeyUp = (event: KeyboardEvent) => this.#controls.onKeyUp(event);
	}

	getScreen(): ILeavableScreen {
		return this.#activeScreen as ILeavableScreen;
	}

	start(): void {
		this.#addKeyboardListeners();
		this.#addStateWatchers();
		this.#setScreen(new InitialScreen(this.#ctx));
		// Debug
		// this.#setScreen(new PlaygroundScreen(this.#ctx));
		// this.#setScreen(new GameOverScreen(this.#ctx));
	}

	pause(): void {
		if (this.#RERENDER_INTERVAL_ID !== null) {
			clearInterval(this.#RERENDER_INTERVAL_ID);
		}
	}

	resume(): void {
		this.#RERENDER_INTERVAL_ID = setInterval(() => {
			this.#updateScreen();
		}, 1000 / FPS);
	}

	stop(): void {
		if (this.#RERENDER_INTERVAL_ID !== null) {
			clearInterval(this.#RERENDER_INTERVAL_ID);
		}
		this.#setScreen(new GameOverScreen(this.#ctx));
	}

	#setScreen(screenInstance: ILeavableScreen): void {
		this.#activeScreen?.leave();
		this.#activeScreen = screenInstance;
		this.#activeScreen.connect(this.#state, this.#controls, this.#sounds);
	}

	#updateScreen(): void {
		this.#activeScreen?.render();
	}

	#addKeyboardListeners(): void {
		window.addEventListener('keydown', this.#onKeyDown);
		window.addEventListener('keyup', this.#onKeyUp);
	}

	// TODO: move to GameState
	#addStateWatchers(): void {
		this.#state.on('isStarted', (isStarted) => {
			if (!isStarted) {
				this.#setScreen(new InitialScreen(this.#ctx));
			} else {
				this.#setScreen(new PlaygroundScreen(this.#ctx));
				this.#RERENDER_INTERVAL_ID = setInterval(() => {
					this.#updateScreen();
				}, 1000 / FPS);
			}
		});

		this.#state.on('isPaused', (isPaused) => {
			if (isPaused) {
				this.pause();
			} else if (this.#state.get('isStarted')) {
				this.resume();
			}
		});

		this.#state.on('isOver', (isOver) => {
			if (isOver) {
				this.stop();
			}
		});

		this.#state.on('totalScore', (totalScore) => {
			if (totalScore) {
				this.#indicators.totalScore.textContent = String(totalScore);
			}
		});
	}
}
