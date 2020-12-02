import { readFileSync } from 'fs'

interface PasswordInfo {
	letter: string
	spot1: number
	spot2: number
	password: string
}

const parseRegexp = /(?<spot1>\d+)-(?<spot2>\d+) (?<letter>[a-z]): (?<password>[a-z]+)/
export function getPasswordInfos(input: string): PasswordInfo[] {
	return input
		.split('\n')
		.filter((x) => x)
		.map((str) => {
			const result = parseRegexp.exec(str)
			if (!result?.groups) throw new Error('Bad input')

			const { letter, spot1, spot2, password } = result.groups
			return {
				letter,
				spot1: parseInt(spot1, 10),
				spot2: parseInt(spot2, 10),
				password,
			}
		})
}

export function isValidPasswordInfo({
	letter,
	password,
	spot1,
	spot2,
}: PasswordInfo): boolean {
	return (
		[password[spot1 - 1], password[spot2 - 1]].filter((c) => c === letter)
			.length === 1
	)
}

export function getNumValidPasswords(passwordInfos: PasswordInfo[]) {
	return passwordInfos.filter(isValidPasswordInfo).length
}

export function run() {
	const inputTxt = readFileSync('./input.txt', { encoding: 'utf-8' })
	const passwordInfos = getPasswordInfos(inputTxt)

	console.log('Part 2:', getNumValidPasswords(passwordInfos))
}
