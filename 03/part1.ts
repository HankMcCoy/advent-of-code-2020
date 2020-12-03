import { readFileSync } from 'fs'

const getLines = (file: string) =>
	readFileSync(file, { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)

const isTreeHere = (x: number, y: number, treePatterns: string[]): boolean => {
	if (y >= treePatterns.length) throw new Error('y value is too large')
	const treePattern = treePatterns[y]
	return treePattern[x % treePattern.length] === '#'
}

export function run() {
	const treePatterns = getLines('./input.txt')
	let x = 0
	let y = 0
	let numTreesHit = 0

	while (y < treePatterns.length) {
		if (isTreeHere(x, y, treePatterns)) {
			numTreesHit += 1
		}
		y += 1
		x += 3
	}

	console.log('Part 1:', numTreesHit)
}
