import { getRunSummingTo } from './part2'

test('works', () => {
	const run = getRunSummingTo(
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
		127
	)
	expect(run).toStrictEqual([15, 25, 47, 40])
})
