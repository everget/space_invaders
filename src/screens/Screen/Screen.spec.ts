import { Screen, type IScreen } from '@/screens/Screen/Screen';

describe('Class: Screen', () => {
	let screen: IScreen;
	let canvas;
	let ctx;

	beforeEach(() => {
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d')!;
		screen = new Screen(ctx);
	});

	it('should create a new instance', () => {
		expect(screen).toBeInstanceOf(Screen);
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

	describe('method: `render`', () => {
		it('should be a function', () => {
			expect(typeof screen.render).toBe('function');
		});
	});
});
