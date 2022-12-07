export const str_split = d => s => s.split(d)

export const iter_split = d => function* (xs) {
	let group = []
	for (const x of xs) {
		if (x === d) {
			yield group
			group = []
		} else
			group.push(x)
	}
	if (group.length)
		yield group
}

export const add = (a, b) => a + b

export const D = (f, g) => (a, b) => f(a, g(b))

export const foldl = (f, i) => xs => {
	let a = i
	for (const x of xs)
		a = f(a, x)
	return a
}

export const foldl1 = (f, i) => xs => {
	const it = iter(xs)
	let v = it.next()
	if (v.done)
		return i
	let a = v.value
	while (true) {
		v = it.next()
		if (v.done)
			return a
		a = f(a)(v.value)
	}
}

export const sum = foldl(add, 0)

export const iter = x => x[Symbol.iterator]()

export const next = x => {
	const v = x.next()
	return v.done
		? undefined
		: v.value
}

export const optimum = f => xs => {
	const it = iter(xs)
	let x = next(it)
	if (x === undefined) return x
	let a = x
	while (true) {
		x = next(it)
		if (x === undefined) return a
		else if (f(x, a)) a = x
	}
}

export const map = f => function* (xs) {
	for (const x of xs)
		yield f(x)
}

export const filter = f => function* (xs) {
	for (const x of xs)
		if (f(x))
			yield x
}

export const bind = f => function* (xs) {
	for (const x of xs)
		yield* f(x)
}

export function lt(a, b) {
	return a < b
}

export function gt(a, b) {
	return a > b
}

export function pipe(x, ...fs) {
	let a = x
	for (const f of fs) a = f(a)
	return a
}

export const compose = (...fs) => x => pipe(x, ...fs)

export const print = x => { console.log(x) ; return x }

export const sortBy = (f, reverse=false) => xs =>
	Array.from(xs).sort(
		reverse
			? (a, b) => f(a) > f(b) ? -1 : 1
			: (a, b) => f(a) < f(b) ? -1 : 1
		)

export const take = n => function* (xs) {
	let i = 0
	for (const x of xs) {
		if (i === n) break
		yield x
		i++
	}
}

export const C = f => a => b => f(b)(a)

export const T = x => f => f(x)

export const duad_map2 = (f, g) => x => [f(x[0]), g(x[1])]

export const mapN = fs => x => fs.map(T(x))

export const get_from = o => k => o[k]

export const duad_flip = x => [x[1], x[0]]

export const findIndex = f => xs => {
	let i = 0
	for (const x of xs)
		if (f(x))
			return i
		else
			i++
	return undefined
}

export const is = a => b => a === b

export const set = x => new Set(x)

export const inside_set = xs => x => xs.has(x)

export const intersect = a => b => set(filter(inside_set(a))(b))

export const batch = n => function* (xs) {
	let batch = []
	for (const x of xs) {
		batch.push(x)
		if (batch.length === n) {
			yield batch
			batch = []
		}
	}
	if (batch.length > 0)
		yield batch
}
