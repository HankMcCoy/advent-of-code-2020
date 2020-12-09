import { getFirstInvalidNum } from './part1'

test('works', () => {
	const firstInvalidNum = getFirstInvalidNum(
		`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
			.split('\n')
			.map((x) => parseInt(x, 10)),
		5
	)
	expect(firstInvalidNum).toBe(127)
})
