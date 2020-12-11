import { getNumAdapterArrangements } from './part2'

test('works good', () => {
	const result = getNumAdapterArrangements(
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
			.map((x) => parseInt(x, 10))
			.sort((a, b) => a - b)
	)
	expect(result).toBe(8)
})

test('works better', () => {
	const result = getNumAdapterArrangements(
		`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`
			.split('\n')
			.map((x) => parseInt(x, 10))
			.sort((a, b) => a - b)
	)
	expect(result).toBe(19208)
})
