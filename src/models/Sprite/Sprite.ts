import { FPS, SpriteConfig, type IPosition } from '@/config';

export interface IBorder {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export interface ISprite {
	getWidth(): number;
	getHeight(): number;
	getBorders(): IBorder;
	getPosition(): IPosition;
	setPosition(position: IPosition): void;
	update(): void;
	draw(ctx: CanvasRenderingContext2D): void;
}

export class Sprite implements ISprite {
	public frames: number[][][];
	public totalFrames: number;
	public pixelSize: number;
	public position: IPosition;
	public runningFrame: number;
	public width: number;
	public height: number;
	constructor(frames: number[][][]) {
		this.frames = frames;
		this.totalFrames = frames.length;
		this.pixelSize = SpriteConfig.pixelSize;
		this.position = SpriteConfig.position;
		this.runningFrame = 0;
		this.width = frames[0][0].length * this.pixelSize;
		this.height = frames[0].length * this.pixelSize;
	}

	getWidth(): number {
		return this.width;
	}

	getHeight(): number {
		return this.height;
	}

	getBorders(): IBorder {
		return {
			top: this.position.y - this.height / 2,
			right: this.position.x + this.width / 2,
			bottom: this.position.y + this.height / 2,
			left: this.position.x - this.width / 2,
		};
	}

	getPosition(): IPosition {
		return this.position;
	}

	setPosition(position: IPosition): void {
		this.position = position;
	}

	update(): void {
		this.runningFrame += 1;
		if (this.runningFrame >= FPS) {
			this.runningFrame = 0;
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = '#ffffff';
		const currentFrame = Math.floor(this.runningFrame / Math.floor(FPS / this.totalFrames));
		const frame = this.frames[currentFrame];
		let i = -1;
		while (++i < frame.length) {
			let j = -1;
			while (++j < frame[i].length) {
				if (frame[i][j]) {
					ctx.fillRect(
						this.position.x - this.width / 2 + this.pixelSize * j,
						this.position.y - this.height / 2 + this.pixelSize * i,
						this.pixelSize,
						this.pixelSize
					);
				}
			}
		}
	}
}
