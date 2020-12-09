import { readFileSync } from 'fs'

const union = <T>(s1: Set<T>, ...sets: Set<T>[]): Set<T> =>
	sets.length == 0 ? s1 : new Set([...s1, ...union(sets[0], ...sets.slice(1))])

const getAllPossibleSums = (operands: number[]): Set<number> => {
	if (operands.length < 2) return new Set()

	const [head, ...rest] = operands
	const sums = rest.map((x) => x + head)
	return union(new Set([...sums]), getAllPossibleSums(rest))
}

export const getFirstInvalidNum = (
	nums: number[],
	preambleLength: number
): number => {
	for (let i = preambleLength; i < nums.length; i++) {
		const candidateOperands = nums.slice(i - preambleLength, i)
		if (!getAllPossibleSums(candidateOperands).has(nums[i])) return nums[i]
	}
	throw new Error('WTF, no invalid num found!')
}

export function run() {
	const nums = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)
		.map((x) => parseInt(x, 10))

	console.log('Part 1:', getFirstInvalidNum(nums, 25))
}
