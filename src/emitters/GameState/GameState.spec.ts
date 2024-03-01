import { EventEmitter } from '@/emitters/EventEmitter/EventEmitter';
import { GameState, type IGameState } from '@/emitters/GameState/GameState';

describe('Class: GameState', () => {
	let gameState: IGameState;

	beforeEach(() => {
		gameState = new GameState();
	});

	it('should inherit from EventEmitter', () => {
		expect(Object.getPrototypeOf(GameState).name).toBe('EventEmitter');
	});

	it('should create a new instance', () => {
		expect(gameState).toBeInstanceOf(GameState);
		expect(gameState).toBeInstanceOf(EventEmitter);
	});

	describe('method: `get`', () => {
		it('should be a function', () => {
			expect(typeof gameState.get).toBe('function');
		});

		it('should throw an error if the argument is not a string', () => {
			expect(() => {
				gameState.get('foo');
			}).toThrowError(new Error(`foo: such state prop doesn't exist`));
		});
	});

	describe('method: `update`', () => {
		it('should be a function', () => {
			expect(typeof gameState.update).toBe('function');
		});
	});
});
