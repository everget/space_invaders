import {
	GameEvents,
	KeyboardKeyCodes,
	LaserRayConfig,
	PlayerShipConfig,
	type IGameSounds,
} from '@/config';
import { type IGameControls } from '@/emitters/GameControls/GameControls';
import { type IGameState } from '@/emitters/GameState/GameState';
import { PositionWatcher, type IPositionWatcher } from '@/emitters/PositionWatcher/PositionWatcher';
import { IInvadersFleet, InvadersFleet } from '@/models/InvadersFleet/InvadersFleet';
import { ILaserRay, LaserRay } from '@/models/LaserRay/LaserRay';
import { PlayerShip } from '@/models/PlayerShip/PlayerShip';
import { Screen, type ILeavableScreen } from '@/screens/Screen/Screen';

export class PlaygroundScreen extends Screen implements ILeavableScreen {
	#positionWatcher: IPositionWatcher;
	#invadersFleet: IInvadersFleet | null = null;
	#playerShip: PlayerShip | null = null; // TODO
	#laserRay: ILaserRay | null = null;
	#lastShotTime = 0;
	#onPauseListener: () => void;
	#onEscapeListener: () => void;
	#onShotListener: () => void;
	#onHitListener: (invaderKey: string) => void;
	#onOverflyListener: () => void;
	#onCollisionListener: () => void;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);

		this.#positionWatcher = new PositionWatcher();

		// TODO
		this.#onPauseListener = this.#onPause.bind(this);
		this.#onEscapeListener = this.#onEscape.bind(this);
		this.#onShotListener = this.#onShot.bind(this);
		this.#onHitListener = this.#onHit.bind(this);
		this.#onOverflyListener = this.#onOverfly.bind(this);
		this.#onCollisionListener = this.#onCollision.bind(this);
	}

	connect(state: IGameState, controls: IGameControls, sounds: IGameSounds): void {
		super.connect(state, controls, sounds);

		this.#lastShotTime = 0;

		this.#playerShip = new PlayerShip();
		this.#playerShip.setPosition({
			x: this.width / 2,
			y: this.height - this.#playerShip.getHeight() / 2 - PlayerShipConfig.marginBottom,
		});

		this.#invadersFleet = new InvadersFleet(this.ctx);
		this.#invadersFleet.prepare();

		this.#positionWatcher.watch({
			playerShip: this.#playerShip,
			invadersFleet: this.#invadersFleet,
		});

		this.gameControls?.on(KeyboardKeyCodes.Space, this.#onShotListener);
		this.gameControls?.on(KeyboardKeyCodes.Escape, this.#onEscapeListener);
		this.gameControls?.on(KeyboardKeyCodes.Pause, this.#onPauseListener);

		this.#positionWatcher.on(GameEvents.Hit, this.#onHitListener);
		this.#positionWatcher.on(GameEvents.Overfly, this.#onOverflyListener);
		this.#positionWatcher.on(GameEvents.Collision, this.#onCollisionListener);
		this.render();
	}

	leave(): void {
		this.gameControls?.off(KeyboardKeyCodes.Space, this.#onShotListener);
		this.gameControls?.off(KeyboardKeyCodes.Escape, this.#onEscapeListener);
		this.gameControls?.off(KeyboardKeyCodes.Pause, this.#onPauseListener);

		this.#positionWatcher.off(GameEvents.Hit, this.#onHitListener);
		this.#positionWatcher.off(GameEvents.Overfly, this.#onOverflyListener);
		this.#positionWatcher.off(GameEvents.Collision, this.#onCollisionListener);
	}

	render(): void {
		super.render();

		if (this.#playerShip) {
			const shipPosition = this.#playerShip.getPosition();
			const shipBorders = this.#playerShip.getBorders();

			if (
				this.gameControls?.isLeftPressed() &&
				shipBorders.left !== null &&
				shipBorders.left > 10
			) {
				shipPosition.x -= 10;
			} else if (
				this.gameControls?.isRightPressed() &&
				shipBorders.right !== null &&
				shipBorders.right < 600
			) {
				shipPosition.x += 10;
			}

			this.#playerShip.setPosition(shipPosition);
			this.#playerShip.update();
			this.#playerShip.draw(this.ctx);
		}

		if (this.#laserRay) {
			this.#laserRay.update();
			this.#laserRay.draw(this.ctx);
		}

		if (this.#invadersFleet?.isDestroyed()) {
			this.gameState?.update({ isOver: true });
		} else {
			this.#invadersFleet?.update();
			this.#invadersFleet?.draw(this.ctx);
		}

		this.#positionWatcher.checkPositions();
	}

	#onHit(invaderKey: string): void {
		const invaderScore = this.#invadersFleet?.getInvaders().get(invaderKey)?.getScore() || 0;
		const currentScore = this.gameState?.get('totalScore') || 0;
		this.gameState?.update({ totalScore: (currentScore as number) + invaderScore });

		this.#invadersFleet?.remove(invaderKey);
		this.#laserRay = null;
		this.#positionWatcher.unwatch({ laserRay: this.#laserRay });
		this.gameSounds?.explosion.play();
	}

	#onCollision(): void {
		this.#playerShip = null;
		this.#invadersFleet = null;
		this.#laserRay = null;
		this.#positionWatcher.unwatch({
			invadersFleet: this.#invadersFleet,
			laserRay: this.#laserRay,
			playerShip: this.#playerShip,
		});

		this.gameSounds?.explosion.play();
		this.gameState?.update({ isOver: true });
	}

	#onOverfly(): void {
		this.#laserRay = null;
		this.#positionWatcher.unwatch({ laserRay: this.#laserRay });
	}

	#onShot(): void {
		if (this.#lastShotTime < Date.now() - LaserRayConfig.reload) {
			this.#laserRay = new LaserRay();
			this.#positionWatcher.watch({
				laserRay: this.#laserRay,
				invadersFleet: this.#invadersFleet,
			});

			const shipPositon = this.#playerShip?.getPosition();

			if (shipPositon) {
				this.#laserRay.setPosition({
					x: shipPositon.x,
					y: shipPositon.y - LaserRayConfig.marginBottom,
				});

				this.#lastShotTime = Date.now();
				this.gameSounds?.playerShoot.play();
			}
		}
	}

	#onPause(): void {
		this.gameState?.update({
			isPaused: !this.gameState.get('isPaused'),
		});
	}

	#onEscape(): void {
		this.gameState?.update({
			isStarted: false,
			isOver: false,
			isPaused: false,
			totalScore: 0,
		});
	}
}
