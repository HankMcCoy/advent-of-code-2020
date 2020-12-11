import { readFileSync } from 'fs'

export const getResult = (adapterJoltages: number[]): void => {}

export function run() {
	const adapterJoltages = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)
		.map((x) => parseInt(x, 10))

	console.log('Part 2:', getResult(adapterJoltages))
}
