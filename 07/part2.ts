import { readFileSync } from 'fs'

const union = <T>(s1: Set<T>, ...sets: Set<T>[]): Set<T> =>
	sets.length == 0 ? s1 : new Set([...s1, ...union(sets[0], ...sets.slice(1))])

type Color = string
type ChildColor = Color
type ParentColor = Color
type ColorMapping = Map<ParentColor, Map<ChildColor, number>>
export const getColorMapping = (lines: string[]): ColorMapping => {
	const colorMapping = new Map<ParentColor, Map<ChildColor, number>>()

	lines.forEach((line) => {
		const [_, parentColor, contents] =
			/^(\w+ \w+) bags contain (.+)$/.exec(line) || []

		if (contents === 'no other bags.') return

		for (const [_, countStr, childColor] of contents.matchAll(
			/(\d+) (\w+ \w+) bags?/g
		)) {
			if (!colorMapping.has(parentColor))
				colorMapping.set(parentColor, new Map())

			const count = parseInt(countStr, 10)
			colorMapping.get(parentColor)?.set(childColor, count)
		}
	})

	return colorMapping
}

export const getNumDescendantBags = (
	parentColor: Color,
	colorMapping: ColorMapping
): number => {
	const childColorCounts = colorMapping.get(parentColor) ?? new Map()
	return [...childColorCounts.keys()]
		.map(
			(c) =>
				childColorCounts.get(c) +
				childColorCounts.get(c) * getNumDescendantBags(c, colorMapping)
		)
		.reduce((x, y) => x + y, 0)
}

export function run() {
	const lines = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)

	const colorMapping = getColorMapping(lines)

	const numBagsContainedByShinyGold = getNumDescendantBags(
		'shiny gold',
		colorMapping
	)

	console.log('Part 2:', numBagsContainedByShinyGold)
}
