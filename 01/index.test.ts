import { timeStamp } from 'console'
import { part1, part2 } from './index'

test('checking for sum of two entries works', () => {
	const nums = [-2, 2000, 18, 20]

	expect(part1(nums)).toBe(2000 * 20)
})

test('checking for sum of three entries works', () => {
	const nums = [-3, 1800, 45, 170, 40, 50]

	expect(part2(nums)).toBe(1800 * 170 * 50)
})
