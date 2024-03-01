export interface IInvadersFleetDefaults {
	rows: number;
	sideStep: number;
	downStep: number;
}

export interface IInvadersFleetConfigObject {
	defaults: IInvadersFleetDefaults;
}

export const InvadersFleetConfig: IInvadersFleetConfigObject = {
	defaults: {
		rows: 5,
		sideStep: 3,
		downStep: 5,
	},
};
