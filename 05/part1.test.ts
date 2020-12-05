import { convertPassToBinary } from './part1'

test('Works', () => {
	expect(convertPassToBinary('BFFFBBFRRR')).toBe(567)
	expect(convertPassToBinary('FFFBBBFRRR')).toBe(119)
	expect(convertPassToBinary('BBFFBBFRLL')).toBe(820)
})
