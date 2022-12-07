import { data3 } from './data.js'
import { batch, bind, compose, duad_map2, findIndex, foldl1, intersect, is, map, print, set, str_split, sum } from './lib.js'

const alpha = 'abcdefghijklmnopqrstuvwxyz'
const letters = alpha + alpha.toUpperCase()

const priority = x => findIndex(is(x))(letters) + 1

const halves = x => [ x.slice(0, x.length >> 1), x.slice(x.length >> 1) ]

const solution = compose(
	str_split('\n'),
	bind(compose(
		halves,
		duad_map2(set, set),
		x => intersect(x[0])(x[1]),
		map(priority),
	)),
	sum,
)

const solution2 = compose(
	str_split('\n'),
	batch(3),
	map(map(set)),
	bind(foldl1(intersect, new Set())),
	map(priority),
	sum,
)

console.log(solution(data3))
console.log(solution2(data3))
