import { execList, parseInstructions, initialState, manhattan } from './part2'

test('execList', () => {
	const instrs = parseInstructions(`F10
N3
F7
R90
F11`)

	const finalState = execList(initialState, instrs)
	expect(manhattan(finalState.coord)).toBe(286)
})
