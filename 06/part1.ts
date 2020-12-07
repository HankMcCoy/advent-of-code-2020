import { readFileSync } from 'fs'

export function run() {
	const lines = readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n')

	const { sum } = lines.reduce(
		({ curGroup, sum }, line) => {
			if (line === '')
				return { curGroup: new Set<string>(), sum: sum + curGroup.size }

			line.split('').forEach((c) => curGroup.add(c))
			return { curGroup, sum }
		},
		{
			curGroup: new Set<string>(),
			sum: 0,
		}
	)

	console.log('Part 1:', sum)
}
