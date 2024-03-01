import { GameEvents } from '@/config';
import { EventEmitter, type IEventEmitter } from '@/emitters/EventEmitter/EventEmitter';
import { type IInvader } from '@/models/Invader/Invader';
import { type IInvadersFleet } from '@/models/InvadersFleet/InvadersFleet';
import { type ILaserRay } from '@/models/LaserRay/LaserRay';
import { type ISprite } from '@/models/Sprite/Sprite';

export interface IPositionObservables {
	[key: string]: IInvadersFleet | ILaserRay | ISprite | null | undefined;
	invadersFleet?: IInvadersFleet | null;
	laserRay?: ILaserRay | null;
	playerShip?: ISprite | null;
}

export interface IPositionWatcher extends IEventEmitter {
	watch(models: IPositionObservables): void;
	unwatch(models: IPositionObservables): void;
	checkPositions(): void;
}

export class PositionWatcher extends EventEmitter implements IPositionWatcher {
	#observables: IPositionObservables;

	constructor() {
		super();

		this.#observables = {
			invadersFleet: null,
			laserRay: null,
			playerShip: null,
		};
	}

	watch(models: Partial<IPositionObservables>): void {
		Object.keys(models).forEach((key) => {
			this.#observables[key] = models[key];
		});
	}

	unwatch(models: Partial<IPositionObservables>): void {
		Object.keys(models).forEach((key) => {
			this.#observables[key] = null;
		});
	}

	checkPositions(): void {
		if (this.#observables.laserRay) {
			this.#checkOverfly();
		}

		if (this.#observables.laserRay && this.#observables.invadersFleet) {
			this.#checkHit();
		}

		if (this.#observables.playerShip && this.#observables.invadersFleet) {
			this.#checkCollision();
		}
	}

	#checkCollision(): void {
		if (this.#observables.playerShip === null || this.#observables.invadersFleet === null) {
			return;
		}

		const playerShipBorders = this.#observables.playerShip?.getBorders();
		const invaders = this.#observables.invadersFleet!.getInvaders();

		// Convert the Map entries to an array for iteration
		const invadersArray: [string, IInvader | null][] = Array.from(invaders.entries());

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		invadersArray.forEach(([_, invader]) => {
			if (invader) {
				const invaderBorders = invader.getBorders();

				if (
					!(
						(playerShipBorders && playerShipBorders.right < invaderBorders.left) ||
						(playerShipBorders && playerShipBorders.left > invaderBorders.right) ||
						(playerShipBorders && playerShipBorders.top > invaderBorders.bottom) ||
						(playerShipBorders && playerShipBorders.bottom < invaderBorders.top)
					)
				) {
					this.emit(GameEvents.Collision);
				}
			}
		});
	}

	#checkHit(): void {
		if (this.#observables.laserRay === null || this.#observables.invadersFleet === null) {
			return;
		}

		const laserRayPosition = this.#observables.laserRay?.position;
		const invaders = this.#observables.invadersFleet?.getInvaders();

		// Convert the Map entries to an array for iteration
		const invadersArray: [string, IInvader | null][] = Array.from(invaders!.entries());

		invadersArray.forEach(([key, invader]) => {
			if (invader) {
				const invaderPosition = invader.getPosition();
				const invaderWidth = invader.getOriginalWidth();
				const invaderHeight = invader.getOriginalHeight();

				if (
					laserRayPosition &&
					laserRayPosition.x >= invaderPosition.x - invaderWidth / 2 &&
					laserRayPosition.x <= invaderPosition.x + invaderWidth / 2 &&
					laserRayPosition.y >= invaderPosition.y - invaderHeight / 2 &&
					laserRayPosition.y <= invaderPosition.y + invaderHeight / 2
				) {
					this.emit(GameEvents.Hit, key);
				}
			}
		});
	}

	#checkOverfly(): void {
		if (this.#observables.laserRay === null) {
			return;
		}

		const laserRayPositionY = this.#observables.laserRay?.position?.y;

		if (laserRayPositionY && laserRayPositionY < 0) {
			this.emit(GameEvents.Overfly);
		}
	}
}
