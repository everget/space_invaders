import { Invader, type IInvader } from '@/models/Invader/Invader';

describe('Class: Invader', () => {
	let invader: IInvader;

	beforeEach(() => {
		invader = new Invader();
	});

	it('should create a new instance', () => {
		expect(invader).toBeInstanceOf(Invader);
	});
});
