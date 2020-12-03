import { readFileSync } from 'fs'

const getLines = (file: string) =>
	readFileSync(file, { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)

const isTreeHere = (x: number, y: number, treePatterns: string[]): boolean => {
	const treePattern = treePatterns[y]
	return treePattern[x % treePattern.length] === '#'
}

const getNumTreesHit = (
	slope: { x: number; y: number },
	treePatterns: string[]
): number => {
	let x = 0
	let y = 0
	let numTreesHit = 0
	while (y < treePatterns.length) {
		if (isTreeHere(x, y, treePatterns)) {
			numTreesHit += 1
		}
		y += slope.y
		x += slope.x
	}
	return numTreesHit
}

export function run() {
	const treePatterns = getLines('./input.txt')
	const slopes = [
		{ x: 1, y: 1 },
		{ x: 3, y: 1 },
		{ x: 5, y: 1 },
		{ x: 7, y: 1 },
		{ x: 1, y: 2 },
	]

	const result = slopes
		.map((slope) => getNumTreesHit(slope, treePatterns))
		.reduce((acc, numTreesHit) => acc * numTreesHit)

	console.log('Part 2:', result)
}
