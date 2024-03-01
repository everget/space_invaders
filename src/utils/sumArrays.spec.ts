import { sumArrays } from '@/utils/sumArrays';

describe('sumArrays', () => {
	it('should sum arrays of equal length', () => {
		const target = [1, 2, 3];
		const addon = [4, 5, 6];
		const result = sumArrays(target, addon);

		expect(result).toEqual([5, 7, 9]);
	});

	it('should handle empty arrays', () => {
		const target: number[] = [];
		const addon: number[] = [];
		const result = sumArrays(target, addon);

		expect(result).toEqual([]);
	});

	it('should handle arrays with one element', () => {
		const target = [10];
		const addon = [5];
		const result = sumArrays(target, addon);

		expect(result).toEqual([15]);
	});

	it('should handle arrays with different lengths (truncated to shorter length)', () => {
		const target = [1, 2, 3, 4, 5];
		const addon = [10, 20, 30];
		const result = sumArrays(target, addon);

		expect(result).toEqual([11, 22, 33, 4, 5]);
	});

	it('should handle arrays with different lengths (truncated to shorter length, reverse order)', () => {
		const target = [10, 20, 30];
		const addon = [1, 2, 3, 4, 5];
		const result = sumArrays(target, addon);

		expect(result).toEqual([11, 22, 33]);
	});
});
