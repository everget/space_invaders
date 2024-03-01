export interface IMisteryShipDefaults {
	direction: number;
}

export interface IMisteryShipConfigObject {
	pixelSize: number;
	defaults: IMisteryShipDefaults;
}

export const MisteryShipConfig: IMisteryShipConfigObject = {
	pixelSize: 3,
	defaults: {
		direction: -1,
	},
};
