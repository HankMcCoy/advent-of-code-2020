import { readFileSync } from 'fs'

const intersect = <T>(set1: Set<T>, set2: Set<T>): Set<T> =>
	new Set([...set1].filter((x) => set2.has(x)))

export const getAnswerGroups = (
	arr: string[],
	delim: string
): Set<string>[][] =>
	arr.reduce<Set<string>[][]>(
		(acc, str, idx) => {
			if (str === delim) {
				if (idx < arr.length - 1) acc.push([])
			} else {
				acc[acc.length - 1].push(new Set([...str.split('')]))
			}
			return acc
		},
		[[]]
	)

export const getAnswerCount = (input: string): number => {
	const lines = input.split('\n')
	const groups = getAnswerGroups(lines, '')

	return groups
		.map((g) => g.reduce(intersect))
		.map((a) => a.size)
		.reduce((sum, c) => sum + c, 0)
}

export function run() {
	const answerCount = getAnswerCount(
		readFileSync('./input.txt', { encoding: 'utf-8' })
	)

	console.log('Part 2:', answerCount)
}
