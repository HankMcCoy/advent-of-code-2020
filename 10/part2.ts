import { readFileSync } from 'fs'

const range = (a: number, b: number) =>
	new Array(b - a + 1).fill(undefined).map((_, i) => a + i)

export const getNumAdapterArrangements = (
	adapterJoltages: number[]
): number => {
	const numArrangementsByIdx = new Map<number, number>()
	// Yucky mutation 'cause I'm lazy
	adapterJoltages.unshift(0)

	const iterate = (idx: number): number => {
		const curJoltage = adapterJoltages[idx]
		if (numArrangementsByIdx.has(idx)) {
			return numArrangementsByIdx.get(idx) as number
		}

		let numArrangements
		if (idx === adapterJoltages.length - 1) {
			numArrangements = 1
		} else {
			const nextOutOfRangeIdx = adapterJoltages.findIndex(
				(j) => j > curJoltage + 3
			)
			const validNextIndices = range(
				idx + 1,
				nextOutOfRangeIdx === -1
					? adapterJoltages.length - 1
					: nextOutOfRangeIdx - 1
			)
			numArrangements = validNextIndices.reduce((acc, i) => acc + iterate(i), 0)
		}
		numArrangementsByIdx.set(idx, numArrangements)
		return numArrangements
	}
	return iterate(0)
}

export function run() {
	const adapterJoltages = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)
		.map((x) => parseInt(x, 10))
		.sort((a, b) => a - b)

	console.log('Part 2:', getNumAdapterArrangements(adapterJoltages))
}
