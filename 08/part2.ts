import { readFileSync } from 'fs'

type Cmd = 'acc' | 'jmp' | 'nop'
type Instruction = {
	cmd: Cmd
	offset: number
}
const isCmd = (s: string): s is Cmd => ['acc', 'jmp', 'nop'].includes(s)
export const parseInstructions = (str: string): Instruction[] =>
	str
		.split('\n')
		.filter((x) => x)
		.map((l) => {
			const [_, cmd, offset] = /(acc|jmp|nop) ([+-]\d+)/.exec(l) ?? []
			if (!isCmd(cmd)) throw new Error('WTF')
			return { cmd, offset: parseInt(offset, 10) }
		})

export const runProgram = (instructions: Instruction[]): number | null => {
	let instructionIdx = 0
	let acc = 0
	const visitedIndices = new Set<number>()
	while (instructionIdx < instructions.length) {
		// If an infinite loop, return null as an error condition
		if (visitedIndices.has(instructionIdx)) return null
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
		}
	}
	return acc
}

export function run() {
	const instructions = parseInstructions(
		readFileSync('./input.txt', { encoding: 'utf-8' })
	)

	let result
	for (let instr of instructions) {
		if (instr.cmd === 'jmp' || instr.cmd === 'nop') {
			instr.cmd = instr.cmd === 'jmp' ? 'nop' : 'jmp'
			result = runProgram(instructions)
			if (result !== null) break
			instr.cmd = instr.cmd === 'jmp' ? 'nop' : 'jmp'
		}
	}

	console.log('Part 1:', result)
}
