import { parseInstructions, runProgram } from './part2'

test('it detects infinite loop', () => {
	const instr = parseInstructions(
		`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`
	)
	expect(runProgram(instr)).toBe(null)
})

test('it returns the correct value', () => {
	const instr = parseInstructions(
		`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6`
	)
	expect(runProgram(instr)).toBe(8)
})
