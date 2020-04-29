import arrSortedIndexOf from '../src/arr-sorted-index-of'

const alpha = ['a', 'b', 'c']

arrSortedIndexOf(alpha, 'b')
//=> 1

arrSortedIndexOf(alpha, 'e')
//=> -1

const numeric = [2, 13, 20]

arrSortedIndexOf(numeric, 20, {
	numeric: true,
})
//=> 2

arrSortedIndexOf(numeric, 20, (a, b) => {
	return a - b
})
//=> 2

const arrays = [
	[192, 168, 0, 0],
	[192, 168, 0, 1],
	[192, 168, 1, 0],
]

arrSortedIndexOf(arrays, [192, 168, 0, 1], {
	numeric: true,
	arrays: true,
})
//=> 1

let elem

const objectsByName = [
	{ name: 'bonzo', age: 9 },
	{ name: 'john', age: 7 },
]

elem = { name: 'john', age: 7 }

arrSortedIndexOf(objectsByName, elem, {
	by: 'name',
})
//=> 1

const objectsByAge = [
	{ name: 'john', age: 7 },
	{ name: 'bonzo', age: 9 },
]

elem = { name: 'john', age: 7 }

arrSortedIndexOf(objectsByAge, elem, {
	by: 'age',
})
//=> 0

const valuesByAge = [
	['john', 7],
	['bonzo', 9],
]

elem = ['bonzo', 9]

arrSortedIndexOf(objectsByAge, elem, {
	by: 1,
})
//=> 1

const valuesByFirstInt = [
	['john', 'johnson', 7],
	['tracy', 'chapman', 9],
]

elem = ['tracy', 'chapman', 9]

arrSortedIndexOf(valuesByFirstInt, elem, {
	by: (arrElem) => {
		for (let val of arrElem) {
			if (Number.isInteger(val)) {
				return val
			}
		}
	},
})
//=> 1
