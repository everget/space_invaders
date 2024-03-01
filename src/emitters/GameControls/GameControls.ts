import { KeyboardKeyCodes } from '@/config';
import { EventEmitter } from '@/emitters/EventEmitter/EventEmitter';

export interface IGameControls extends EventEmitter {
	onKeyDown(event: KeyboardEvent): void;
	onKeyUp(event: KeyboardEvent): void;
	isLeftPressed(): boolean;
	isRightPressed(): boolean;
}

type PressedKey = keyof typeof KeyboardKeyCodes;

interface IEventData {
	keyUp?: boolean;
}

type KeyboardEventListener = (data: IEventData) => void;

export class GameControls extends EventEmitter implements IGameControls {
	#pressedKeys: Set<PressedKey> = new Set<PressedKey>();
	#onLeft: KeyboardEventListener;
	#onRight: KeyboardEventListener;
	#onEnter: KeyboardEventListener;
	#onEscape: KeyboardEventListener;
	#onPause: KeyboardEventListener;
	#onSpace: KeyboardEventListener;

	constructor() {
		super();

		this.#onLeft = this.#makeListener(KeyboardKeyCodes.ArrowLeft);
		this.#onRight = this.#makeListener(KeyboardKeyCodes.ArrowRight);
		this.#onEnter = this.#makeListener(KeyboardKeyCodes.Enter);
		this.#onEscape = this.#makeListener(KeyboardKeyCodes.Escape);
		this.#onPause = this.#makeListener(KeyboardKeyCodes.Pause);
		this.#onSpace = this.#makeListener(KeyboardKeyCodes.Space);

		this.subscribeListeners();
	}

	subscribeListeners(): void {
		this.on(KeyboardKeyCodes.ArrowLeft, this.#onLeft);
		this.on(KeyboardKeyCodes.ArrowRight, this.#onRight);
		this.on(KeyboardKeyCodes.Enter, this.#onEnter);
		this.on(KeyboardKeyCodes.Escape, this.#onEscape);
		this.on(KeyboardKeyCodes.Pause, this.#onPause);
		this.on(KeyboardKeyCodes.Space, this.#onSpace);
	}

	unsubscribeListeners(): void {
		this.off(KeyboardKeyCodes.ArrowLeft, this.#onLeft);
		this.off(KeyboardKeyCodes.ArrowRight, this.#onRight);
		this.off(KeyboardKeyCodes.Enter, this.#onEnter);
		this.off(KeyboardKeyCodes.Escape, this.#onEscape);
		this.off(KeyboardKeyCodes.Pause, this.#onPause);
		this.off(KeyboardKeyCodes.Space, this.#onSpace);
	}

	onKeyDown(event: KeyboardEvent): void {
		switch (event.code) {
			case KeyboardKeyCodes.ArrowLeft:
				this.emit(KeyboardKeyCodes.ArrowLeft, { keyUp: false });
				break;
			case KeyboardKeyCodes.ArrowRight:
				this.emit(KeyboardKeyCodes.ArrowRight, { keyUp: false });
				break;
			default:
				break;
		}
	}

	onKeyUp(event: KeyboardEvent): void {
		switch (event.code) {
			case KeyboardKeyCodes.ArrowLeft:
				this.emit(KeyboardKeyCodes.ArrowLeft, { keyUp: true });
				break;
			case KeyboardKeyCodes.ArrowRight:
				this.emit(KeyboardKeyCodes.ArrowRight, { keyUp: true });
				break;
			case KeyboardKeyCodes.Enter:
				this.emit(KeyboardKeyCodes.Enter, { keyUp: true });
				break;
			case KeyboardKeyCodes.Escape:
				this.emit(KeyboardKeyCodes.Escape, { keyUp: true });
				break;
			case KeyboardKeyCodes.Pause:
				this.emit(KeyboardKeyCodes.Pause, { keyUp: true });
				break;
			case KeyboardKeyCodes.Space:
				this.emit(KeyboardKeyCodes.Space, { keyUp: true });
				break;
			default:
				break;
		}
	}

	isLeftPressed(): boolean {
		return this.#pressedKeys.has(KeyboardKeyCodes.ArrowLeft);
	}

	isRightPressed(): boolean {
		return this.#pressedKeys.has(KeyboardKeyCodes.ArrowRight);
	}

	#makeListener(keyCode: PressedKey): KeyboardEventListener {
		return (data: IEventData) => {
			if (data.keyUp) {
				this.#pressedKeys.delete(keyCode);
			} else {
				this.#pressedKeys.add(keyCode);
			}
		};
	}
}
