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
export type ShipState = { coord: Coord; waypoint: Coord }
type Action = 'N' | 'W' | 'E' | 'S' | 'L' | 'R' | 'F'
type Instruction = { action: Action; value: number }

const addCoords = (c1: Coord, c2: Coord): Coord => ({
	x: c1.x + c2.x,
	y: c1.y + c2.y,
})
const toRad = (d: number): number => (d * Math.PI) / 180

const rotate = (c: Coord, rotationInDeg: number) => {
	const angle = Math.atan2(c.y, c.x)
	const magnitude = Math.sqrt(c.x ** 2 + c.y ** 2)
	const newAngle = angle + toRad(rotationInDeg)

	return {
		x: Math.round(Math.cos(newAngle) * magnitude),
		y: Math.round(Math.sin(newAngle) * magnitude),
	}
}

export const exec = (
	{ coord, waypoint }: ShipState,
	{ action, value }: Instruction
): ShipState => {
	const { x, y } = coord
	switch (action) {
		case 'N':
			return { coord, waypoint: addCoords(waypoint, { x: 0, y: value }) }
		case 'S':
			return { coord, waypoint: addCoords(waypoint, { x: 0, y: -value }) }
		case 'E':
			return { coord, waypoint: addCoords(waypoint, { x: value, y: 0 }) }
		case 'W':
			return { coord, waypoint: addCoords(waypoint, { x: -value, y: 0 }) }
		case 'L':
			return { coord, waypoint: rotate(waypoint, value) }
		case 'R':
			return { coord, waypoint: rotate(waypoint, -value) }
		case 'F':
			return {
				coord: addCoords(coord, {
					x: waypoint.x * value,
					y: waypoint.y * value,
				}),
				waypoint,
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
	waypoint: { x: 10, y: 1 },
}
export function run() {
	const instructions: Instruction[] = parseInstructions(
		readFileSync('./input.txt', {
			encoding: 'utf-8',
		})
	)

	const finalState = execList(initialState, instructions)

	console.log(
		'Part 2:',
		Math.abs(finalState.coord.x) + Math.abs(finalState.coord.y)
	)
}
