import { readFileSync } from 'fs'

type DraftPassport = { [key: string]: string }
const keyValueRegExp = /([a-z]+):(\S+)/g
export const parseKeyValues = (input: string): { [key: string]: string }[] => {
	return input
		.split('\n')
		.reduce<{ passports: DraftPassport[]; draft: DraftPassport }>(
			({ passports, draft }, line: string) => {
				if (line === '') {
					return { passports: [...passports, draft], draft: {} }
				}
				for (let match of line.matchAll(keyValueRegExp)) {
					draft[match[1]] = match[2]
				}
				return { passports, draft }
			},
			{
				passports: [],
				draft: {},
			}
		).passports
}

const validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']
export const isValidPassport = (draftPassport: DraftPassport): boolean => {
	const presentKeys = Object.keys(draftPassport)
	const validKeys = presentKeys.filter((k) => validFields.includes(k))
	if (validKeys.length === 8) return true
	if (validKeys.length === 7 && !validKeys.includes('cid')) return true
	return false
}

export const getNumValidPassports = (input: string): number => {
	const draftPassports = parseKeyValues(input)
	const validPassports = draftPassports.filter(isValidPassport)

	return validPassports.length
}

export function run() {
	const numValidPassports = getNumValidPassports(
		readFileSync('./input.txt', { encoding: 'utf-8' })
	)

	console.log('Part 1:', numValidPassports)
}
