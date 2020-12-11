import { getResult } from './part1'

test('works', () => {
	const result = getResult(
		`16
10
15
5
1
11
7
19
6
12
4`
			.split('\n')
			.map((x) => parseInt(x, 10)),
		5
	)
	expect(result).toBe(35)
})
