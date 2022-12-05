import { data } from './data.js'
import {
	compose,
	gt,
	iter_split,
	map,
	optimum,
	sortBy,
	str_split,
	sum,
	take,
} from './lib.js'

const solution = compose(
	str_split('\n'),
	iter_split(''),
	map(compose(
		map(parseFloat),
		sum,
	)),
	optimum(gt),
)

const solution2 = compose(
	str_split('\n'),
	iter_split(''),
	map(compose(
		map(parseFloat),
		sum,
	)),
	sortBy(x => x, true),
	take(3),
	sum,
)

console.log(solution(data))
console.log(solution2(data))
