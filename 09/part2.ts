import { readFileSync } from 'fs'

export const getRunSummingTo = (nums: number[], target: number): number[] => {
	for (let start = 0; start < nums.length; start++) {
		let total = 0
		for (let end = start; total < target; end++) {
			total += nums[end]
			if (total === target) return nums.slice(start, end + 1)
		}
	}
	throw new Error('WTF, no run found!')
}

export function run() {
	const nums = readFileSync('./input.txt', { encoding: 'utf-8' })
		.split('\n')
		.filter((x) => x)
		.map((x) => parseInt(x, 10))

	const run = getRunSummingTo(nums, 23278925)
	const result = Math.min(...run) + Math.max(...run)

	console.log('Part 2:', result)
}
