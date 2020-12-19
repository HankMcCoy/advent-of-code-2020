import { readFileSync } from 'fs'

/**
 * COORDINATE SYSTEM I'm going w/ East and North being the positive directions
 * (e.g. what you'd get if you slapped the cardinal directions on a standard
 * cartesian coordinate system).
 *
 * I'm also mapping headings to standard degree orientations, i.e. 0 degrees is
 * due East, 90 is North, and so on.
 */
type Coord = { x: number; y: number }
type Heading = 0 | 90 | 180 | 270
export type ShipState = { coord: Coord; heading: Heading }
type Action = 'N' | 'W' | 'E' | 'S' | 'L' | 'R' | 'F'
type Instruction = { action: Action; value: number }

const addCoords = (c1: Coord, c2: Coord): Coord => ({
	x: c1.x + c2.x,
	y: c1.y + c2.y,
})
const toRad = (d: number): number => (d * Math.PI) / 180
const mod = (d: number, m: number): number => ((d % m) + m) % m

export const exec = (
	{ coord, heading }: ShipState,
	{ action, value }: Instruction
): ShipState => {
	const { x, y } = coord
	switch (action) {
		case 'N':
			return { coord: { x, y: y + value }, heading }
		case 'S':
			return { coord: { x, y: y - value }, heading }
		case 'E':
			return { coord: { x: x + value, y }, heading }
		case 'W':
			return { coord: { x: x - value, y }, heading }
		case 'L':
			return { coord, heading: mod(heading + value, 360) as Heading }
		case 'R':
			return { coord, heading: mod(heading - value, 360) as Heading }
		case 'F':
			return {
				coord: addCoords(coord, {
					x: Math.round(Math.cos(toRad(heading))) * value,
					y: Math.round(Math.sin(toRad(heading))) * value,
				}),
				heading,
			}
		default:
			throw new Error(`WTF ${action}`)
	}
}

export const execList = (
	s: ShipState,
	instructions: Instruction[]
): ShipState => {
	if (instructions.length == 0) return s

	const [head, ...rest] = instructions
	return execList(exec(s, head), rest)
}

export const parseInstructions = (s: string): Instruction[] => {
	return s
		.split('\n')
		.filter((x) => x)
		.map((s) => {
			const [_, action, value] = /([NWESLRF])(\d+)/.exec(s) ?? []
			return { action, value: parseInt(value, 10) } as Instruction
		})
}

export const manhattan = (c: Coord) => Math.abs(c.x) + Math.abs(c.y)

export const initialState: ShipState = {
	coord: { x: 0, y: 0 },
	heading: 0,
}
export function run() {
	const instructions: Instruction[] = parseInstructions(
		readFileSync('./input.txt', {
			encoding: 'utf-8',
		})
	)

	const finalState = execList(initialState, instructions)

	console.log(
		'Part 1:',
		Math.abs(finalState.coord.x) + Math.abs(finalState.coord.y)
	)
}
