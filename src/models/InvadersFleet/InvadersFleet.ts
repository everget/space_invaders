import { InvadersFleetConfig } from '@/config';
import { Invader, type IInvader } from '@/models/Invader/Invader';
import { type IBorder } from '@/models/Sprite/Sprite';
import { sumArrays } from '@/utils/sumArrays';

type InvadersMap = Map<string, IInvader | null>;

export interface IInvadersFleet {
	getInvaders(): InvadersMap;
	getBorders(): IBorder[];
	remove(key: string): void;
	prepare(): void;
	update(): void;
	draw(ctx: CanvasRenderingContext2D): void;
	isDestroyed(): boolean;
}

export class InvadersFleet implements IInvadersFleet {
	#width = Infinity;
	// #height = Infinity;
	#canvasWidth: number;
	// #canvasHeight: number;
	#formationRows: number;
	#formationCols: number;
	#formationState: number[][];
	#sideStep: number;
	#downStep: number;
	#isMovingRight: boolean;
	#isMovingDown: boolean;
	#invaderOriginalWidth: number;
	#invaderOriginalHeight: number;
	#invaders: Map<string, IInvader | null>;
	#isDestroyed: boolean;
	constructor(ctx: CanvasRenderingContext2D) {
		this.#canvasWidth = ctx.canvas.width;
		// this.#canvasHeight = ctx.canvas.height;
		this.#formationRows = InvadersFleetConfig.defaults.rows;
		this.#formationCols = 0;
		this.#formationState = Array.from({ length: InvadersFleetConfig.defaults.rows }, () => []);
		this.#sideStep = InvadersFleetConfig.defaults.sideStep;
		this.#downStep = InvadersFleetConfig.defaults.downStep;
		this.#isMovingRight = true;
		this.#isMovingDown = false;
		this.#invaders = new Map();
		this.#isDestroyed = false;

		const invader = new Invader();
		this.#invaderOriginalWidth = invader.getOriginalWidth();
		this.#invaderOriginalHeight = invader.getOriginalHeight();
	}

	getInvaders(): InvadersMap {
		return this.#invaders;
	}

	getBorders(): IBorder[] {
		const borders: IBorder[] = [];

		this.getInvaders().forEach((invader: IInvader | null) => {
			if (invader) {
				borders.push(invader.getBorders());
			} else {
				borders.push({
					top: Infinity,
					right: Infinity,
					bottom: Infinity,
					left: Infinity,
				});
			}
		});

		return borders;
	}

	getFormationBorders(): IBorder {
		let [top, right, bottom, left] = [Infinity, 0, 0, Infinity];

		this.getInvaders().forEach((invader: IInvader | null) => {
			if (invader) {
				const invaderBorders = invader.getBorders();

				if (invaderBorders.top !== Infinity && invaderBorders.top < top) {
					top = invaderBorders.top;
				}

				if (invaderBorders.right !== Infinity && invaderBorders.right > right) {
					right = invaderBorders.right;
				}

				if (invaderBorders.bottom !== Infinity && invaderBorders.bottom > bottom) {
					bottom = invaderBorders.bottom;
				}

				if (invaderBorders.left !== Infinity && invaderBorders.left < left) {
					left = invaderBorders.left;
				}
			}
		});

		return {
			top,
			right,
			bottom,
			left,
		};
	}

	#add(key: string, sprite: IInvader): void {
		const [i, j] = key.split(',');

		this.#formationState[Number(i)][Number(j)] = 1;
		this.#invaders.set(key, sprite);
	}

	remove(key: string): void {
		const [i, j] = key.split(',');

		this.#formationState[Number(i)][Number(j)] = 0;
		this.#invaders.set(key, null);
		this.#checkFormationState();
	}

	prepare(): void {
		this.#formationCols = Math.floor(this.#canvasWidth / 2 / this.#invaderOriginalWidth);
		this.#prepareFormation();

		this.#width = this.#formationCols * this.#invaderOriginalWidth;
		// this.#height = this.#formationRows * this.#invaderOriginalHeight;

		let i = -1;
		while (++i < this.#formationRows) {
			let j = -1;
			while (++j < this.#formationCols) {
				let invader;
				if (i <= 1) {
					invader = new Invader(3);
				} else if (i === 2 || i === 3) {
					invader = new Invader(2);
				} else {
					invader = new Invader(1);
				}

				invader.setPosition({
					x:
						this.#canvasWidth / 2 -
						this.#width / 2 +
						(this.#invaderOriginalWidth + 10) * j,
					y: this.#invaderOriginalHeight * i,
				});

				this.#add(`${i}, ${j}`, invader);
			}
		}
	}

	isDestroyed(): boolean {
		return this.#isDestroyed;
	}

	update(): void {
		const borders = this.getFormationBorders();

		if (borders.left !== null && borders.left < 10) {
			this.#isMovingRight = true;
			this.#isMovingDown = true;
		} else if (borders.right !== null && borders.right > this.#canvasWidth) {
			this.#isMovingRight = false;
			this.#isMovingDown = true;
		} else {
			this.#isMovingDown = false;
		}

		this.getInvaders().forEach((invader: IInvader | null) => {
			if (invader) {
				const position = invader.getPosition();

				invader.setPosition({
					x: position.x + this.#sideStep * (this.#isMovingRight ? 1 : -1),
					y: position.y + (this.#isMovingDown ? this.#downStep : 0),
				});

				invader.update();
			}
		});
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.getInvaders().forEach((invader) => {
			if (invader) {
				invader.draw(ctx);
			}
		});
	}

	#checkFormationState(): void {
		const checkSum = this.#getRemained();

		if (checkSum === 0) {
			this.#isDestroyed = true;
		} else {
			this.#isDestroyed = false;
		}
	}

	#prepareFormation() {
		this.#formationState.fill(new Array(this.#formationCols));
	}

	#getRemained() {
		let checkSum = new Array(this.#formationState[0].length).fill(0);
		let rowIndex = this.#formationState.length;

		while (rowIndex--) {
			checkSum = sumArrays(checkSum, this.#formationState[rowIndex]);
		}

		return checkSum.reduce((acc, num) => acc + num, 0);
	}
}
