import { readFileSync } from 'fs'

export function part1(passwordInfos: PasswordInfo[]) {
	return passwordInfos.filter((pi) => isValidPasswordInfo(pi)).length
}

export function part2(nums: number[]) {}

interface PasswordInfo {
	requiredLetter: string
	minCount: number
	maxCount: number
	password: string
}

const parseRegexp = /(?<minCount>\d+)-(?<maxCount>\d+) (?<requiredLetter>[a-z]): (?<password>[a-z]+)/
export function getPasswordInfos(input: string): PasswordInfo[] {
	return input
		.split('\n')
		.filter((x) => x)
		.map((str) => {
			const result = parseRegexp.exec(str)
			if (!result?.groups) throw new Error('Bad input')

			const { requiredLetter, minCount, maxCount, password } = result.groups
			return {
				requiredLetter,
				minCount: parseInt(minCount, 10),
				maxCount: parseInt(maxCount, 10),
				password,
			}
		})
}

export function isValidPasswordInfo({
	requiredLetter,
	password,
	minCount,
	maxCount,
}: PasswordInfo): boolean {
	const r = new RegExp(requiredLetter, 'g')
	const letterCount = [...password.matchAll(r)].length

	return letterCount >= minCount && letterCount <= maxCount
}

function run() {
	const inputTxt = readFileSync('./input.txt', { encoding: 'utf-8' })
	const passwordInfos = getPasswordInfos(inputTxt)

	console.log('Part 1:', part1(passwordInfos))
	// console.log('Part 2:', part2())
}

run()
