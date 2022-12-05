import { data2 as data } from './data.js';
import { C, compose, duad_flip, duad_map2, get_from, map, mapN, print, str_split, sum, T } from './lib.js';

const ABC_RPS = {
	A: 'R',
	B: 'P',
	C: 'S',
}

const XYZ_RPS = {
	X: 'R',
	Y: 'P',
	Z: 'S',
}

const RPS_score = {
	R: 1,
	P: 2,
	S: 3,
}

const RPS_response = {
	A: {
		X: 'S',
		Y: 'R',
		Z: 'P',
	},
	B: {
		X: 'R',
		Y: 'P',
		Z: 'S',
	},
	C: {
		X: 'P',
		Y: 'S',
		Z: 'R',
	},
}

function victor(a, b) {
	if (a === b)
		return 0
	else if (a === 'R') {
		if (b === 'P')
			return -1
		else if (b === 'S')
			return 1
	} else if (a === 'P') {
		if (b === 'R')
			return 1
		else if (b === 'S')
			return -1
	} else if (a === 'S') {
		if (b === 'R')
			return -1
		else if (b === 'P')
			return 1
	}
}

const solution = compose(
	str_split('\n'),
	map(compose(
		str_split(' '),
		duad_map2(
			get_from(ABC_RPS),
			get_from(XYZ_RPS),
		),
		mapN([
			x => RPS_score[x[1]],
			x => 3 * (victor(...duad_flip(x)) + 1),
		]),
		sum,
	)),
	sum,
)

const solution2 = compose(
	str_split('\n'),
	map(compose(
		str_split(' '),
		mapN([
			x => ABC_RPS[x[0]],
			x => RPS_response[x[0]][x[1]],
		]),
		mapN([
			x => RPS_score[x[1]],
			x => 3 * (victor(...duad_flip(x)) + 1),
		]),
		sum,
	)),
	sum,
)

console.log(solution(data))
console.log(solution2(data))
