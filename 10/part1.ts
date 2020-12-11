import { readFileSync } from 'fs'

// Mutates adapterJoltages
export const getResult = (adapterJoltages: number[]): number => {
	const sortedJoltages = [...adapterJoltages].sort((a, b) => a - b)
	const joltageDeltas = sortedJoltages.map(
		(joltage, idx) => joltage - (sortedJoltages[idx - 1] ?? 0)
	)

	// Include an extra 3 joltage delta, for the connection to the actual device
	return (
		joltageDeltas.filter((x) => x === 1).length *
		(joltageDeltas.filter((x) => x === 3).length + 1)
	)
}

export function run() {
	const adapterJoltages = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)
		.map((x) => parseInt(x, 10))

	console.log('Part 1:', getResult(adapterJoltages))
}
