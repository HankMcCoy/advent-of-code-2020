import { readFileSync } from 'fs'

export const convertPassToBinary = (pass: string): number => {
	const binaryStr = pass.replace(/[FL]/g, '0').replace(/[BR]/g, '1')
	return parseInt(binaryStr, 2)
}

export function run() {
	const lines = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)

	const highestSeatId = Math.max(...lines.map(convertPassToBinary))

	console.log('Part 1:', highestSeatId)
}
