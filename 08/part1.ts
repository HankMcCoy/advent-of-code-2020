import { readFileSync } from 'fs'

export function run() {
	const instructions = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)
		.map((l) => {
			const [_, cmd, offset] = /(acc|jmp|nop) ([+-]\d+)/.exec(l) ?? []
			return { cmd, offset: parseInt(offset, 10) }
		})

	let instructionIdx = 0
	let acc = 0
	const visitedIndices = new Set<number>()
	while (!visitedIndices.has(instructionIdx)) {
		visitedIndices.add(instructionIdx)

		const { cmd, offset } = instructions[instructionIdx]
		switch (cmd) {
			case 'acc':
				acc += offset
				instructionIdx += 1
				break
			case 'jmp':
				instructionIdx += offset
				break
			case 'nop':
				instructionIdx += 1
				break
			default:
				throw new Error('WTF')
		}
	}

	console.log('Part 1:', acc)
}
