import { Sprite, type ISprite } from '@/models/Sprite/Sprite';

describe('Class: Sprite', () => {
	let sprite: ISprite;

	beforeEach(() => {
		sprite = new Sprite([[[1], [1], [1]]]);
	});

	it('should create a new instance', () => {
		expect(sprite).toBeInstanceOf(Sprite);
	});

	describe('method: `getWidth`', () => {
		it('should be a function', () => {
			expect(typeof sprite.getWidth).toBe('function');
		});
	});

	describe('method: `getHeight`', () => {
		it('should be a function', () => {
			expect(typeof sprite.getHeight).toBe('function');
		});
	});

	describe('method: `getBorders`', () => {
		it('should be a function', () => {
			expect(typeof sprite.getBorders).toBe('function');
		});
	});

	describe('method: `getPosition`', () => {
		it('should be a function', () => {
			expect(typeof sprite.getPosition).toBe('function');
		});
	});

	describe('method: `setPosition`', () => {
		it('should be a function', () => {
			expect(typeof sprite.setPosition).toBe('function');
		});
	});

	describe('method: `update`', () => {
		it('should be a function', () => {
			expect(typeof sprite.update).toBe('function');
		});
	});
});
