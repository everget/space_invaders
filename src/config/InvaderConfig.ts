export interface IInvaderDefaults {
	type: number;
}

export interface IInvaderConfigObject {
	pixelSize: number;
	scorePerType: Record<number, number>;
	defaults: IInvaderDefaults;
}

export const InvaderConfig: IInvaderConfigObject = {
	pixelSize: 3,
	scorePerType: {
		1: 10,
		2: 20,
		3: 40,
	},
	defaults: {
		type: 2,
	},
};
