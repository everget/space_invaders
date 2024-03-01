import { PlayerShip } from '@/models/PlayerShip/PlayerShip';
import { type ISprite } from '@/models/Sprite/Sprite';

describe('Class: PlayerShip', () => {
	let playerShip: ISprite;

	beforeEach(() => {
		playerShip = new PlayerShip();
	});

	it('should create a new instance', () => {
		expect(playerShip).toBeInstanceOf(PlayerShip);
	});
});
