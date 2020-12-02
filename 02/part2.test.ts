import { isValidPasswordInfo } from './part2'

test('detects valid password', () => {
	expect(
		isValidPasswordInfo({
			spot1: 1,
			spot2: 2,
			letter: 'a',
			password: 'abbbbb',
		})
	).toBe(true)
})

test('detects invalid password', () => {
	expect(
		isValidPasswordInfo({
			spot1: 1,
			spot2: 2,
			letter: 'a',
			password: 'aabbbb',
		})
	).toBe(false)
	expect(
		isValidPasswordInfo({
			spot1: 1,
			spot2: 2,
			letter: 'a',
			password: 'bbbbbb',
		})
	).toBe(false)
})
