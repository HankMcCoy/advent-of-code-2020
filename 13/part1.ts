import { readFileSync } from 'fs'

type InputInfo = { arrivalTime: number; busIds: number[] }
export const parseInput = (input: string): InputInfo => {
	let [arrivalTime, busIds] = input.split('\n')

	return {
		arrivalTime: parseInt(arrivalTime, 10),
		busIds: busIds
			.split(',')
			.filter((s) => s !== 'x')
			.map((x) => parseInt(x, 10)),
	}
}

const getWaitTime = (arrivalTime: number, busId: number): number => {
	if (arrivalTime % busId === 0) return 0
	return busId - (arrivalTime % busId)
}
export const getEarliestDeparture = (
	arrivalTime: number,
	busIds: number[]
): { waitTime: number; busId: number } => {
	let bestWait = Infinity
	let bestBus = -1
	for (const busId of busIds) {
		const waitTime = getWaitTime(arrivalTime, busId)
		if (waitTime < bestWait) {
			bestWait = waitTime
			bestBus = busId
		}
	}
	return { waitTime: bestWait, busId: bestBus }
}

export function run() {
	let { arrivalTime, busIds } = parseInput(
		readFileSync('./input.txt', {
			encoding: 'utf-8',
		})
	)
	const { waitTime, busId } = getEarliestDeparture(arrivalTime, busIds)
	console.log('Part 1:', waitTime * busId)
}
