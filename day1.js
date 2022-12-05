import { data } from './data.js'
import {
	compose,
	gt,
	iter_split,
	map,
	optimum,
	str_split,
	sum,
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

console.log(solution(data))
