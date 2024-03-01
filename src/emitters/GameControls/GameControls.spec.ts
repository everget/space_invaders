import { EventEmitter } from '@/emitters/EventEmitter/EventEmitter';
import { GameControls, type IGameControls } from '@/emitters/GameControls/GameControls';

describe('Class: GameControls', () => {
	let gameControls: IGameControls;

	beforeEach(() => {
		gameControls = new GameControls();
	});

	it('should inherit from EventEmitter', () => {
		expect(Object.getPrototypeOf(GameControls).name).toBe('EventEmitter');
	});

	it('should create a new instance', () => {
		expect(gameControls).toBeInstanceOf(GameControls);
		expect(gameControls).toBeInstanceOf(EventEmitter);
	});

	// TODO: test emissions
});
