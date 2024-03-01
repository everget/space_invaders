import { Game, type IGame } from '@/Game';
import { GameOverScreen } from '@/screens/GameOverScreen/GameOverScreen';
import { InitialScreen } from '@/screens/InitialScreen/InitialScreen';

describe('Class: Game', () => {
	let game: IGame;
	let canvas;
	let ctx;

	beforeEach(() => {
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d')!;
		game = new Game(
			ctx,
			{},
			{
				totalScore: document.createElement('div'),
				lives: document.createElement('div'),
			}
		);
	});

	it('should create a new instance', () => {
		expect(game).toBeInstanceOf(Game);
	});

	describe('method: `start`', () => {
		it('should be a function', () => {
			expect(typeof game.start).toBe('function');
		});

		it('should set InitialScreen as the current screen', () => {
			game.start();
			expect(game.getScreen()).toBeInstanceOf(InitialScreen);
		});
	});

	describe('method: `pause`', () => {
		it('should be a function', () => {
			expect(typeof game.pause).toBe('function');
		});
	});

	describe('method: `resume`', () => {
		it('should be a function', () => {
			expect(typeof game.resume).toBe('function');
		});
	});

	describe('method: `stop`', () => {
		it('should be a function', () => {
			expect(typeof game.stop).toBe('function');
		});

		it('should set InitialScreen as the current screen', () => {
			game.stop();
			expect(game.getScreen()).toBeInstanceOf(GameOverScreen);
		});
	});
});
