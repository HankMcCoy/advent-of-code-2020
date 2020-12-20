/**
 * Just straight up copied the majority of this solution from
 * https://stackoverflow.com/a/65275958 'cause trying to figure out how to grok
 * the obtuse mathematical explanations of Chinese Remainder Theorem and Modular
 * Mulitplicative Inverses was making me angry. :)
 */
import { readFileSync } from 'fs'

type ValueRemainder = { val: bigint; remainder: bigint }
const notEmpty = <T>(x: T | null): x is T => x !== null
export const parseValueRemainders = (input: string): ValueRemainder[] =>
	input
		.split(',')
		.map((s, i) => {
			if (s === 'x') return null
			const val = BigInt(parseInt(s, 10))
			const r = BigInt(i) % val
			return { val, remainder: BigInt(val - r === 0n ? 0n : val - r) }
		})
		.filter(notEmpty)

const modularMultiplicativeInverse = (a: bigint, modulus: bigint) => {
	const b = a % modulus

	for (let hypothesis = 1n; hypothesis <= modulus; hypothesis++) {
		if ((b * hypothesis) % modulus == 1n) return hypothesis
	}
	return 1n
}

export const getEarliestWorkingTimestamp = (
	valueRemainders: ValueRemainder[]
): bigint => {
	const prod = valueRemainders.reduce((acc, { val }) => acc * val, 1n)

	return (
		valueRemainders.reduce((sum, { val, remainder }) => {
			const p = prod / val
			return sum + remainder * modularMultiplicativeInverse(p, val) * p
		}, 0n) % prod
	)
}

export function run() {
	let valueOffsets = parseValueRemainders(
		readFileSync('./input.txt', {
			encoding: 'utf-8',
		}).split('\n')[1]
	)
	const timestamp = getEarliestWorkingTimestamp(valueOffsets)
	console.log('Part 2:', timestamp)
}
