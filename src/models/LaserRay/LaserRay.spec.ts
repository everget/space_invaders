import { LaserRay, type ILaserRay } from '@/models/LaserRay/LaserRay';

describe('Class: LaserRay', () => {
	let laserRay: ILaserRay;

	beforeEach(() => {
		laserRay = new LaserRay();
	});

	it('should create a new instance', () => {
		expect(laserRay).toBeInstanceOf(LaserRay);
	});
});
