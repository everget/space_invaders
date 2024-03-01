import { GameStatePropValue, type GameStateProps } from '@/config';
import { EventEmitter } from '@/emitters/EventEmitter/EventEmitter';

export interface IGameState extends EventEmitter {
	get(key: string): GameStatePropValue;
	update(newProps: GameStateProps, forceUpdate?: boolean): void;
}

export class GameState extends EventEmitter implements IGameState {
	#props: GameStateProps;

	constructor(props: GameStateProps = {}) {
		super();
		this.#props = props;
	}

	get(key: string): GameStatePropValue {
		if (!(key in this.#props)) {
			throw new Error(`${key}: such state prop doesn't exist`);
		}

		return this.#props[key];
	}

	update(newProps: GameStateProps, forceUpdate?: boolean): void {
		if (forceUpdate) {
			this.#props = newProps;
		} else {
			this.#compareProps(newProps);
		}
	}

	#compareProps(newProps: GameStateProps): void {
		Object.keys(newProps).forEach((key) => {
			if (key in this.#props && this.#props[key] !== newProps[key]) {
				this.#props[key] = newProps[key];
				this.emit(`${key}`, this.#props[key]);
			}
		});
	}
}
