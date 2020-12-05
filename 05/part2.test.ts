import { convertIdToPass } from './part2'

test('Works', () => {
	expect(convertIdToPass(567)).toBe('BFFFBBFRRR')
	expect(convertIdToPass(119)).toBe('FFFBBBFRRR')
	expect(convertIdToPass(820)).toBe('BBFFBBFRLL')
})
