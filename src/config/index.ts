export * from '@/config/InvaderConfig';
export * from '@/config/InvadersFleetConfig';
export * from '@/config/LaserRayConfig';
export * from '@/config/MisteryShipConfig';
export * from '@/config/PlayerShipConfig';

export const FPS = 60;

export const KeyboardKeyCodes = {
	Enter: 'Enter',
	Escape: 'Escape',
	ArrowDown: 'ArrowDown',
	ArrowLeft: 'ArrowLeft',
	Pause: 'Pause',
	ArrowRight: 'ArrowRight',
	Space: 'Space',
	ArrowUp: 'ArrowUp',
} as const;

export const GameEvents = {
	// ...KeyboardKeyCodes,
	Hit: 'Hit',
	Overfly: 'Overfly',
	Collision: 'Collision',
} as const;

export type GameEvent = keyof typeof GameEvents;

export interface IPosition {
	x: number;
	y: number;
}

export type IGameSounds = Record<string, HTMLAudioElement>;
export type IGameIndicators = Record<string, HTMLDivElement>;

export interface ICanvasConfigObject {
	font: string;
	textBaseline: CanvasTextBaseline;
	textAlign: CanvasTextAlign;
}

export const CanvasConfig: ICanvasConfigObject = {
	font: '48px Helvetica',
	textBaseline: 'middle',
	textAlign: 'center',
};

export type GameStatePropValue = boolean | number;
export type GameStateProps = Record<string, GameStatePropValue>;
export const InitialGameStateConfig: GameStateProps = {
	isStarted: false,
	isOver: false,
	isPaused: false,
	lives: 3,
	totalScore: 0,
};

export interface ISpriteConfigObject {
	pixelSize: number;
	position: IPosition;
}

export const SpriteConfig: ISpriteConfigObject = {
	pixelSize: 10,
	position: {
		x: 0,
		y: 0,
	},
};
