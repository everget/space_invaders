import { MisteryShip } from '@/models/MisteryShip/MisteryShip';
import { type ISprite } from '@/models/Sprite/Sprite';

describe('Class: MisteryShip', () => {
	let misteryShip: ISprite;

	beforeEach(() => {
		misteryShip = new MisteryShip();
	});

	it('should create a new instance', () => {
		expect(misteryShip).toBeInstanceOf(MisteryShip);
	});
});
