import { EventEmitter } from '@/emitters/EventEmitter/EventEmitter';
import { PositionWatcher, type IPositionWatcher } from '@/emitters/PositionWatcher/PositionWatcher';

describe('Class: PositionWatcher', () => {
	let positionWatcher: IPositionWatcher;

	beforeEach(() => {
		positionWatcher = new PositionWatcher();
	});

	it('should create a new instance', () => {
		expect(positionWatcher).toBeInstanceOf(PositionWatcher);
		expect(positionWatcher).toBeInstanceOf(EventEmitter);
	});

	describe('method: `watch`', () => {
		it('should be a function', () => {
			expect(typeof positionWatcher!.watch).toBe('function');
		});
	});

	describe('method: `unwatch`', () => {
		it('should be a function', () => {
			expect(typeof positionWatcher!.unwatch).toBe('function');
		});
	});

	describe('method: `checkPositions`', () => {
		it('should be a function', () => {
			expect(typeof positionWatcher!.checkPositions).toBe('function');
		});
	});
});
