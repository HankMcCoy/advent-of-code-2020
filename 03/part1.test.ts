import { getPasswordInfos, isValidPasswordInfo } from './part1'

test('parsing a single password info', () => {
	const nums = [-2, 2000, 18, 20]

	expect(getPasswordInfos('6-8 k: foobar')).toStrictEqual([
		{
			minCount: 6,
			maxCount: 8,
			requiredLetter: 'k',
			password: 'foobar',
		},
	])
})

test('parsing multiple password infos', () => {
	expect(
		getPasswordInfos(`
6-8 k: foobar
1-2 a: barbaz
`)
	).toStrictEqual([
		{
			minCount: 6,
			maxCount: 8,
			requiredLetter: 'k',
			password: 'foobar',
		},
		{
			minCount: 1,
			maxCount: 2,
			requiredLetter: 'a',
			password: 'barbaz',
		},
	])
})

test('detects valid password', () => {
	expect(
		isValidPasswordInfo({
			minCount: 1,
			maxCount: 2,
			requiredLetter: 'a',
			password: 'bbbabb',
		})
	).toBe(true)
})
test('detects invalid password', () => {
	expect(
		isValidPasswordInfo({
			minCount: 1,
			maxCount: 2,
			requiredLetter: 'a',
			password: 'bbbbbb',
		})
	).toBe(false)
})
