import { parseValueRemainders, getEarliestWorkingTimestamp } from './part2'

test('calculating earliest timestamp 1', () => {
	const timestamp = getEarliestWorkingTimestamp(
		parseValueRemainders('17,x,13,19')
	)

	expect(timestamp).toBe(3417n)
})

test('calculating earliest timestamp 2', () => {
	const timestamp = getEarliestWorkingTimestamp(
		parseValueRemainders('67,7,59,61')
	)

	expect(timestamp).toBe(754018n)
})

test('calculating earliest timestamp 3', () => {
	const timestamp = getEarliestWorkingTimestamp(
		parseValueRemainders('67,x,7,59,61')
	)

	expect(timestamp).toBe(779210n)
})

test('calculating earliest timestamp 4', () => {
	const timestamp = getEarliestWorkingTimestamp(
		parseValueRemainders('67,7,x,59,61')
	)

	expect(timestamp).toBe(1261476n)
})

test('calculating earliest timestamp 5', () => {
	const timestamp = getEarliestWorkingTimestamp(
		parseValueRemainders('1789,37,47,1889')
	)

	expect(timestamp).toBe(1202161486n)
})

test('does it explode', () => {
	getEarliestWorkingTimestamp(
		parseValueRemainders(
			'23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,647,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,x,x,x,x,x,x,29,x,557,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,17'
		)
	)
})
