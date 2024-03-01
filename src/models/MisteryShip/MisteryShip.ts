import { LaserRayConfig, MisteryShipConfig } from '@/config';
import { MisteryShipSpriteType1 } from '@/models/MisteryShip/sprites/type1';
import { Sprite, type ISprite } from '@/models/Sprite/Sprite';

export class MisteryShip extends Sprite implements ISprite {
	public direction: number;
	public pixelSize: number;
	constructor() {
		super(MisteryShipSpriteType1);

		this.direction = MisteryShipConfig.defaults.direction;
		/** @override */
		this.pixelSize = MisteryShipConfig.pixelSize;
	}

	/** @override */
	update() {
		this.position.y += this.direction * LaserRayConfig.updateStep;
	}
}
