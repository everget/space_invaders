export function sumArrays(target: number[], addon: number[]) {
	return target.map((item, index) => item + (addon[index] ?? 0));
}
