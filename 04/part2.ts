import { readFileSync } from 'fs'

type DraftPassport = { [key: string]: string }
const keyValueRegExp = /([a-z]+):(\S+)/g
export const parseKeyValues = (input: string): { [key: string]: string }[] => {
	const lines = input.split('\n')
	const passports: DraftPassport[] = []
	let draft: DraftPassport = {}

	for (let line of lines) {
		if (line === '') {
			passports.push(draft)
			draft = {}
		} else {
			for (let [_, key, value] of line.matchAll(keyValueRegExp)) {
				draft[key] = value
			}
		}
	}

	return passports
}

export const isNumberBetween = (min: number, max: number) => (
	s: string
): boolean => parseInt(s, 10) >= min && parseInt(s, 10) <= max

const fieldRules: { [key: string]: (s: string) => boolean } = {
	byr: isNumberBetween(1920, 2002),
	iyr: isNumberBetween(2010, 2020),
	eyr: isNumberBetween(2020, 2030),
	hgt: (s) => {
		const [_, n, unit] = /^(\d+)(cm|in)$/.exec(s) || []

		return unit === 'cm'
			? isNumberBetween(150, 193)(n)
			: isNumberBetween(59, 76)(n)
	},
	hcl: (s) => /^#[0-9a-f]{6}$/.test(s),
	ecl: (s) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(s),
	pid: (s) => /^\d{9}$/.test(s),
	cid: () => true,
}
export const isValidPassport = (draftPassport: DraftPassport): boolean => {
	for (let [k, isValid] of Object.entries(fieldRules)) {
		if (!isValid(draftPassport[k])) return false
	}
	return true
}

export const getNumValidPassports = (input: string): number =>
	parseKeyValues(input).filter(isValidPassport).length

export function run() {
	const input = readFileSync('./input.txt', { encoding: 'utf-8' })
	const numValidPassports = getNumValidPassports(input)

	console.log('Part 2:', numValidPassports)
}
