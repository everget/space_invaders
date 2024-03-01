import { PlayerShipConfig } from '@/config';
import { PlayerShipSpriteType1 } from '@/models/PlayerShip/sprites/type1';
import { Sprite, type ISprite } from '@/models/Sprite/Sprite';

export class PlayerShip extends Sprite implements ISprite {
	constructor() {
		super(PlayerShipSpriteType1);
		/** @override */
		this.pixelSize = PlayerShipConfig.pixelSize;
	}
}
