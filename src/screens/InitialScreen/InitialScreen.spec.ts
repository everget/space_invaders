import { InitialScreen } from '@/screens/InitialScreen/InitialScreen';
import { type ILeavableScreen } from '@/screens/Screen/Screen';

describe('Class: InitialScreen', () => {
	let screen: ILeavableScreen;
	let canvas;
	let ctx;

	beforeEach(() => {
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d')!;
		screen = new InitialScreen(ctx);
	});

	it('should create a new instance', () => {
		expect(screen).toBeInstanceOf(InitialScreen);
	});

	describe('method: `connect`', () => {
		it('should be a function', () => {
			expect(typeof screen.connect).toBe('function');
		});
	});

	describe('method: `clear`', () => {
		it('should be a function', () => {
			expect(typeof screen.clear).toBe('function');
		});
	});

	describe('method: `leave`', () => {
		it('should be a function', () => {
			expect(typeof screen.leave).toBe('function');
		});
	});

	describe('method: `render`', () => {
		it('should be a function', () => {
			expect(typeof screen.render).toBe('function');
		});
	});
});
