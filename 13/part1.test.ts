import { parseInput, getEarliestDeparture } from './part1'

test('parsing', () => {
	const result = parseInput(`939
7,13,x,x,59,x,31,19`)

	expect(result.arrivalTime).toBe(939)
	expect(result.busIds).toStrictEqual([7, 13, 59, 31, 19])
})

test('calculating departure', () => {
	const { arrivalTime, busIds } = parseInput(`939
7,13,x,x,59,x,31,19`)
	const { waitTime, busId } = getEarliestDeparture(arrivalTime, busIds)

	expect(waitTime).toBe(5)
	expect(busId).toBe(59)
})
