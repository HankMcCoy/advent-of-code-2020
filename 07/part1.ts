import { readFileSync } from 'fs'

const union = <T>(s1: Set<T>, ...sets: Set<T>[]): Set<T> =>
	sets.length == 0 ? s1 : new Set([...s1, ...union(sets[0], ...sets.slice(1))])

type Color = string
type ChildColor = Color
type ParentColor = Color
type ColorMapping = Map<ChildColor, Set<ParentColor>>
export const getColorMapping = (lines: string[]): ColorMapping => {
	const colorMapping = new Map<ChildColor, Set<ParentColor>>()

	lines.forEach((line) => {
		const [_, parentColor, contents] =
			/^(\w+ \w+) bags contain (.+)$/.exec(line) || []

		if (contents === 'no other bags.') return

		for (const [_, childColor] of contents.matchAll(/\d+ (\w+ \w+) bags?/g)) {
			if (!colorMapping.has(childColor)) colorMapping.set(childColor, new Set())

			colorMapping.get(childColor)?.add(parentColor)
		}
	})

	return colorMapping
}

export const getParentColors = (
	childColor: Color,
	colorMapping: ColorMapping
): Set<ParentColor> => {
	const parentColors = colorMapping.get(childColor) ?? new Set()
	return union(
		parentColors,
		...[...parentColors].map((c) => getParentColors(c, colorMapping))
	)
}

export function run() {
	const lines = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)

	const colorMapping = getColorMapping(lines)

	const numColorsContainingShinyGold = getParentColors(
		'shiny gold',
		colorMapping
	).size

	console.log('Part 1:', numColorsContainingShinyGold)
}
