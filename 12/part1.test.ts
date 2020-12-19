import {
	exec,
	execList,
	parseInstructions,
	ShipState,
	initialState,
	manhattan,
} from './part1'

test('going north works', () => {
	const state: ShipState = {
		coord: { x: 0, y: 0 },
		heading: 0,
	}
	expect(exec(state, { action: 'N', value: 2 })).toStrictEqual({
		coord: { x: 0, y: 2 },
		heading: 0,
	})
})

test('going south works', () => {
	const state: ShipState = {
		coord: { x: 10, y: 0 },
		heading: 180,
	}
	expect(exec(state, { action: 'S', value: 3 })).toStrictEqual({
		coord: { x: 10, y: -3 },
		heading: 180,
	})
})

test('going east works', () => {
	const state: ShipState = {
		coord: { x: 4, y: 2 },
		heading: 90,
	}
	expect(exec(state, { action: 'E', value: 1 })).toStrictEqual({
		coord: { x: 5, y: 2 },
		heading: 90,
	})
})

test('going west works', () => {
	const state: ShipState = {
		coord: { x: 1, y: 0 },
		heading: 270,
	}
	expect(exec(state, { action: 'W', value: 2 })).toStrictEqual({
		coord: { x: -1, y: 0 },
		heading: 270,
	})
})

test('turning left works', () => {
	const state: ShipState = {
		coord: { x: 0, y: 0 },
		heading: 270,
	}
	expect(exec(state, { action: 'L', value: 90 })).toStrictEqual({
		coord: { x: 0, y: 0 },
		heading: 0,
	})
})

test('turning right works', () => {
	const state: ShipState = {
		coord: { x: 0, y: 0 },
		heading: 270,
	}
	expect(exec(state, { action: 'R', value: 180 })).toStrictEqual({
		coord: { x: 0, y: 0 },
		heading: 90,
	})
})

test('moving forward works', () => {
	expect(
		exec(
			{
				coord: { x: 0, y: 0 },
				heading: 270,
			},
			{ action: 'F', value: 1 }
		)
	).toStrictEqual({
		coord: { x: 0, y: -1 },
		heading: 270,
	})

	expect(
		exec(
			{
				coord: { x: 10, y: 8 },
				heading: 0,
			},
			{ action: 'F', value: 2 }
		)
	).toStrictEqual({
		coord: { x: 12, y: 8 },
		heading: 0,
	})
})

test('execList', () => {
	const instrs = parseInstructions(`F10
N3
F7
R90
F11`)

	const finalState = execList(initialState, instrs)
	expect(manhattan(finalState.coord)).toBe(25)
})
