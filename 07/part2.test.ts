import { getColorMapping, getNumDescendantBags } from './part2'
test('Works', () => {
	const colorMapping = getColorMapping(
		`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`.split('\n')
	)

	expect(getNumDescendantBags('shiny gold', colorMapping)).toBe(126)
})
