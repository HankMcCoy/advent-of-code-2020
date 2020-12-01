import { readFileSync } from 'fs'
const input = readFileSync('./input.txt', { encoding: 'utf-8' })
const nums = input
	.split('\n')
	.slice(0, -1)
	.map((t) => parseInt(t, 10))

function part1() {
	// BRUTE FORCE
	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] + nums[j] === 2020) {
				console.log(nums[i] * nums[j])
				break
			}
		}
	}
}

function part2() {
	// Even more brute force
	for (let i = 0; i < nums.length - 2; i++) {
		for (let j = i + 1; j < nums.length - 1; j++) {
			for (let k = j + 1; k < nums.length; k++) {
				if (nums[i] + nums[j] + nums[k] === 2020) {
					console.log(nums[i] * nums[j] * nums[k])
					break
				}
			}
		}
	}
}

part2()
