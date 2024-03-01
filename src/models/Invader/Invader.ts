import { InvaderConfig } from '@/config';
import { InvaderSpriteType1 } from '@/models/Invader/sprites/type1';
import { InvaderSpriteType2 } from '@/models/Invader/sprites/type2';
import { InvaderSpriteType3 } from '@/models/Invader/sprites/type3';
import { Sprite, type ISprite } from '@/models/Sprite/Sprite';

export interface IInvader extends ISprite {
	getScore(): number;
	getOriginalWidth(): number;
	getOriginalHeight(): number;
}

export class Invader extends Sprite implements IInvader {
	private _score: number;
	// public canShoot: boolean;
	constructor(public type = InvaderConfig.defaults.type) {
		super(
			type === 1 ? InvaderSpriteType1 : type === 2 ? InvaderSpriteType2 : InvaderSpriteType3 // eslint-disable-line no-nested-ternary
		);

		this.type = type;
		this._score = InvaderConfig.scorePerType[type];
		// this.canShoot = false;
		/** @override */
		this.pixelSize = InvaderConfig.pixelSize;
	}

	getScore(): number {
		return this._score;
	}

	getOriginalWidth(): number {
		return this.width / this.pixelSize;
	}

	getOriginalHeight() {
		return this.height / this.pixelSize;
	}
}
