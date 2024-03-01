import { InvadersFleet, type IInvadersFleet } from '@/models/InvadersFleet/InvadersFleet';

describe('Class: InvadersFleet', () => {
	let invadersFleet: IInvadersFleet;
	let canvas;
	let ctx;

	beforeEach(() => {
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d')!;
		invadersFleet = new InvadersFleet(ctx);
	});

	it('should create a new instance', () => {
		expect(invadersFleet).toBeInstanceOf(InvadersFleet);
	});

	describe('method: `getInvaders`', () => {
		it('should be a function', () => {
			expect(typeof invadersFleet.getInvaders).toBe('function');
		});
	});

	describe('method: `getBorders`', () => {
		it('should be a function', () => {
			expect(typeof invadersFleet.getBorders).toBe('function');
		});
	});

	describe('method: `remove`', () => {
		it('should be a function', () => {
			expect(typeof invadersFleet.remove).toBe('function');
		});
	});

	describe('method: `prepare`', () => {
		it('should be a function', () => {
			expect(typeof invadersFleet.prepare).toBe('function');
		});
	});

	describe('method: `update`', () => {
		it('should be a function', () => {
			expect(typeof invadersFleet.update).toBe('function');
		});
	});

	describe('method: `draw`', () => {
		it('should be a function', () => {
			expect(typeof invadersFleet.draw).toBe('function');
		});
	});
});
