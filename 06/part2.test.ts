import { getAnswerCount } from './part2'

test('Works', () => {
	expect(
		getAnswerCount(`abc

a
b
c

ab
ac

a
a
a
a

b`)
	).toBe(6)
})
