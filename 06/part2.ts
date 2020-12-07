import { readFileSync } from 'fs'

export const getAnswerCount = (input: string): number => {
	const lines = input.split('\n')

	const { sum } = lines.reduce<{ curGroup: Set<string> | null; sum: number }>(
		({ curGroup, sum }, line, idx) => {
			if (line === '' && curGroup)
				return { curGroup: null, sum: sum + curGroup.size }

			const answers = line.split('')
			if (curGroup === null) {
				curGroup = new Set<string>([...answers])
			} else {
				curGroup = new Set([...answers].filter((a) => curGroup?.has(a)))
			}
			return {
				curGroup,
				sum: idx === lines.length - 1 ? sum + curGroup.size : sum,
			}
		},
		{
			curGroup: null,
			sum: 0,
		}
	)
	return sum
}

export function run() {
	const answerCount = getAnswerCount(
		readFileSync('./input.txt', { encoding: 'utf-8' })
	)

	console.log('Part 2:', answerCount)
}
