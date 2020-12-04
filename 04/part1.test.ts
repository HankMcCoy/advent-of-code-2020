import { parseKeyValues, isValidPassport, getNumValidPassports } from './part1'

test('Parses key values', () => {
	const values = parseKeyValues(`byr:1937 eyr:2030
ecl:brn

cid:279
hgt:12in
`)

	expect(values).toStrictEqual([
		{ byr: '1937', eyr: '2030', ecl: 'brn' },
		{ cid: '279', hgt: '12in' },
	])
})

test('Considers passports w/ too few valid fields to be invalid', () => {
	expect(
		isValidPassport({
			eyr: '2024',
		})
	).toBe(false)
})

test('Considers passports w/ all required fields to be valid', () => {
	expect(
		isValidPassport({
			byr: '',
			iyr: '',
			eyr: '',
			hgt: '',
			hcl: '',
			ecl: '',
			pid: '',
			cid: '',
		})
	).toBe(true)
})

test('Considers passports w/ all required fields save eyr to be invalid', () => {
	expect(
		isValidPassport({
			byr: '',
			iyr: '',
			hgt: '',
			hcl: '',
			ecl: '',
			pid: '',
			cid: '',
		})
	).toBe(false)
})

test('Considers passports w/ all required fields save cid to be valid', () => {
	expect(
		isValidPassport({
			byr: '',
			iyr: '',
			eyr: '',
			hgt: '',
			hcl: '',
			ecl: '',
			pid: '',
		})
	).toBe(true)
})

test('Gets right number of valid passports', () => {
	expect(
		getNumValidPassports(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`)
	).toBe(2)
})
