import { LaserRayConfig, type IPosition } from '@/config';
import { LaserRaySpriteType1 } from '@/models/LaserRay/sprites/type1';
import { Sprite, type ISprite } from '@/models/Sprite/Sprite';

export interface ILaserRay extends ISprite {
	position: IPosition;
}

export class LaserRay extends Sprite implements ILaserRay {
	public direction: number;

	constructor() {
		super(LaserRaySpriteType1);

		this.direction = LaserRayConfig.defaults.direction;
		/** @override */
		this.pixelSize = LaserRayConfig.pixelSize;
	}

	/** @override */
	update() {
		this.position.y += this.direction * LaserRayConfig.updateStep;
	}
}
