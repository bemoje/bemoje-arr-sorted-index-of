import arrSortedIndexOf from '../src/arr-sorted-index-of'

describe('arrSortedIndexOf', () => {
	test('len = 0', () => {
		const arr = []
		expect(arrSortedIndexOf(arr, 'b')).toBe(-1)
	})

	test('len = 1, exists', () => {
		const arr = ['b']
		expect(arrSortedIndexOf(arr, 'b')).toBe(0)
	})

	test('len = 1, doesnt exist', () => {
		const arr = ['c']
		expect(arrSortedIndexOf(arr, 'b')).toBe(-1)
	})

	test('alpha - middle', () => {
		const arr = ['a', 'b', 'c', 'd']
		expect(arrSortedIndexOf(arr, 'b')).toBe(1)
	})

	test('alpha - first', () => {
		const arr = ['a', 'b', 'c', 'd']
		expect(arrSortedIndexOf(arr, 'a')).toBe(0)
	})

	test('alpha - last', () => {
		const arr = ['a', 'b', 'c', 'd']
		expect(arrSortedIndexOf(arr, 'd')).toBe(3)
	})

	test('alpha - doesnt exist', () => {
		const arr = ['a', 'b', 'c', 'd']
		expect(arrSortedIndexOf(arr, 'bb')).toBe(-1)
	})

	test('numeric - middle', () => {
		const arr = [0, 1, 2, 3]
		expect(
			arrSortedIndexOf(arr, 1, {
				numeric: true,
			}),
		).toBe(1)
	})

	test('numeric - first', () => {
		const arr = [0, 1, 2, 3]
		expect(
			arrSortedIndexOf(arr, 0, {
				numeric: true,
			}),
		).toBe(0)
	})

	test('numeric - last', () => {
		const arr = [0, 1, 2, 3]
		expect(
			arrSortedIndexOf(arr, 3, {
				numeric: true,
			}),
		).toBe(3)
	})

	test('numeric - doesnt exist', () => {
		const arr = [0, 1, 2, 3]
		expect(
			arrSortedIndexOf(arr, 22, {
				numeric: true,
			}),
		).toBe(-1)
	})

	test('pass comparator function', () => {
		const arr = [0, 1, 2, 3]
		expect(
			arrSortedIndexOf(arr, 22, (a, b) => {
				return a - b
			}),
		).toBe(-1)
	})

	test('examples', () => {
		let res

		const alpha = ['a', 'b', 'c']

		res = arrSortedIndexOf(alpha, 'b')

		expect(res).toBe(1)

		const numeric = [2, 13, 20]

		res = arrSortedIndexOf(numeric, 20, {
			numeric: true,
		})

		expect(res).toBe(2)

		const arrays = [
			[192, 168, 0, 0],
			[192, 168, 0, 1],
			[192, 168, 1, 0],
		]

		res = arrSortedIndexOf(arrays, [192, 168, 0, 1], {
			numeric: true,
			arrays: true,
		})

		expect(res).toBe(1)

		res = arrSortedIndexOf(numeric, 20, (a, b) => {
			return a - b
		})

		expect(res).toBe(2)

		const objectsByName = [
			{ name: 'bonzo', age: 9 },
			{ name: 'john', age: 7 },
		]

		res = arrSortedIndexOf(
			objectsByName,
			{ name: 'john', age: 7 },
			{
				by: 'name',
			},
		)

		expect(res).toBe(1)

		const objectsByAge = [
			{ name: 'john', age: 7 },
			{ name: 'bonzo', age: 9 },
		]

		res = arrSortedIndexOf(
			objectsByAge,
			{ name: 'john', age: 7 },
			{
				by: 'age',
			},
		)

		expect(res).toBe(0)

		const valuesByAge = [
			['john', 7],
			['bonzo', 9],
		]

		res = arrSortedIndexOf(valuesByAge, ['bonzo', 9], {
			by: 1,
		})

		expect(res).toBe(1)

		const valuesByFirstInt = [
			['john', 'johnson', 7],
			['tracy', 'chapman', 9],
		]

		const elem = ['tracy', 'chapman', 9]

		res = arrSortedIndexOf(valuesByFirstInt, elem, {
			by: (arrElem) => {
				for (let val of arrElem) {
					if (Number.isInteger(val)) {
						return val
					}
				}
			},
		})

		expect(res).toBe(1)
	})
})
