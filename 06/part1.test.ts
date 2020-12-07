import { chunkArrayBy } from './part1'

test('chunkArrayBy works', () => {
	expect(
		chunkArrayBy(
			`foobar
baz

di go
whdg
`.split('\n'),
			''
		)
	).toStrictEqual([
		['foobar', 'baz'],
		['di go', 'whdg'],
	])
})
