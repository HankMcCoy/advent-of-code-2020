import { getColorMapping, getParentColors } from './part1'
test('Works', () => {
	const colorMapping = getColorMapping(
		`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`.split('\n')
	)

	expect(getParentColors('shiny gold', colorMapping).size).toBe(4)
})

test('Something', () => {
	expect(
		getColorMapping([
			'dim salmon bags contain 5 mirrored lime bags, 1 vibrant plum bag, 5 mirrored fuchsia bags, 1 shiny gold bag.',
		])
	).toStrictEqual(
		new Map([
			['mirrored lime', new Set(['dim salmon'])],
			['vibrant plum', new Set(['dim salmon'])],
			['mirrored fuchsia', new Set(['dim salmon'])],
			['shiny gold', new Set(['dim salmon'])],
		])
	)
})
