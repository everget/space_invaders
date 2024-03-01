import { Game } from '@/Game';
import '@/index.css';

const $app = document.querySelector<HTMLDivElement>('#app')!;

const $gameCanvas = $app.querySelector<HTMLCanvasElement>('#game-canvas')!;
$gameCanvas.width = $gameCanvas.clientWidth;
$gameCanvas.height = $gameCanvas.clientHeight;

const $gameSounds = {
	explosion: $app.querySelector<HTMLAudioElement>('#explosion')!,
	playerShoot: $app.querySelector<HTMLAudioElement>('#player-shoot')!,
	invaderShoot: $app.querySelector<HTMLAudioElement>('#invader-shoot')!,
	invadersFleetFly: $app.querySelector<HTMLAudioElement>('#invaders-fleet-fly')!,
	invadersFleetFly2: $app.querySelector<HTMLAudioElement>('#invaders-fleet-fly-2')!,
	misteryShipFly: $app.querySelector<HTMLAudioElement>('#mistery-ship-fly')!,
};

const $gameIndicators = {
	totalScore: $app.querySelector<HTMLDivElement>('#total-score')!,
	lives: $app.querySelector<HTMLDivElement>('#lives')!,
};

const context2d = $gameCanvas.getContext('2d');
if (context2d !== null) {
	const game = new Game(context2d, $gameSounds, $gameIndicators);
	game.start();
}
