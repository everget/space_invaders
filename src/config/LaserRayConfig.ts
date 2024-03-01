export interface ILaserRayDefaults {
	direction: number;
}

export interface ILaserRayConfigObject {
	pixelSize: number;
	updateStep: number;
	reload: number;
	marginBottom: number;
	defaults: ILaserRayDefaults;
}

export const LaserRayConfig: ILaserRayConfigObject = {
	pixelSize: 3,
	updateStep: 15,
	reload: 200,
	marginBottom: 40,
	defaults: {
		direction: -1,
	},
};
