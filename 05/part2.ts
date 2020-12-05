import { readFileSync } from 'fs'

export const convertPassToId = (pass: string): number => {
	const binaryStr = pass.replace(/[FL]/g, '0').replace(/[BR]/g, '1')
	return parseInt(binaryStr, 2)
}

// Turns out I didn't need this, as they were looking for the _id_ not the pass.
// Still, I'd already built it so figured I'd keep it.
export const convertIdToPass = (id: number): string => {
	const binaryStr = id.toString(2)
	const row = binaryStr
		.slice(0, -3)
		.replace(/1/g, 'B')
		.replace(/0/g, 'F')
		.padStart(7, 'F')
	const col = binaryStr.slice(-3).replace(/1/g, 'R').replace(/0/g, 'L')
	return `${row}${col}`
}

export const findMissingId = (ids: number[]): number => {
	for (let i = 1; i < ids.length; i++) {
		if (ids[i] - ids[i - 1] > 1) return ids[i] - 1
	}
	throw new Error('WTF')
}

export function run() {
	const lines = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)
	const passIds = lines.map(convertPassToId).sort((a, b) => a - b)
	const missingId = findMissingId(passIds)

	console.log('Part 2:', missingId)
}
