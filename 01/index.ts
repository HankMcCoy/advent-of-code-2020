import { readFileSync } from 'fs'

export function part1(nums: number[]) {
	// BRUTE FORCE
	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] + nums[j] === 2020) {
				return nums[i] * nums[j]
			}
		}
	}
}

export function part2(nums: number[]) {
	// Even more brute force
	for (let i = 0; i < nums.length - 2; i++) {
		for (let j = i + 1; j < nums.length - 1; j++) {
			for (let k = j + 1; k < nums.length; k++) {
				if (nums[i] + nums[j] + nums[k] === 2020) {
					return nums[i] * nums[j] * nums[k]
				}
			}
		}
	}
}

function run() {
	const input = readFileSync('./input.txt', { encoding: 'utf-8' })
	const inputNums = input
		.split('\n')
		.slice(0, -1)
		.map((t) => parseInt(t, 10))

	console.log('Part 1:', part1(inputNums))
	console.log('Part 2:', part2(inputNums))
}
