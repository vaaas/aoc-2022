import { data4 as data } from './data.js'
import { array, compose, count, duad_flip, filter, map, str_split } from './lib.js'

const ranges_intersect = (a, b) =>
	a[0] <= b[0] && a[1] >= b[1]

const ranges_intersect_at_all = (a, b) => {
	const la = a[1] - a[0]
	const lb = b[1] - b[0]
	if (a[0] < b[0])
		return a[0] + la >= b[0]
	else
		return b[0] + lb >= a[0]
}

const solution = compose(
	str_split('\n'),
	map(compose(
		str_split(','),
		map(compose(
			str_split('-'),
			map(parseFloat),
			array,
		)),
		array,
	)),
	filter(x => ranges_intersect(...x) || ranges_intersect(...duad_flip(x))),
	count,
)

const solution2 = compose(
	str_split('\n'),
	map(compose(
		str_split(','),
		map(compose(
			str_split('-'),
			map(parseFloat),
			array,
		)),
		array,
	)),
	filter(x => ranges_intersect_at_all(...x)),
	count,
)

console.log(solution(data))
console.log(solution2(data))
