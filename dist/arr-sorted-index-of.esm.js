import arrSortComparator from '@bemoje/arr-sort-comparator';
import assertArgs from '@bemoje/assert-args';
import assertType from '@bemoje/assert-type';

/**
 * Binary search  -based indexOf for sorted arrays.
 * @param {Array} arr - The array to search
 * @param {*} element - The element to find
 * @param {comparator|object} [compare]
 * @param {boolean} [compare.numeric=false] - Sort numerically. Defaults to lexicographic/alphabetic sort.
 * @param {boolean} [compare.descending=false] - Sort in descending order. Defaults to ascending order.
 * @param {boolean} [compare.array=false] - Sort arrays. Nested arrays are also compared recursively.
 * @param {number|string|getter} [compare.by=undefined] - Sort by either array index, a callback(element): any - or by object keys with dot-notation support.
 * @returns {number} Returns -1 if not found, if found, returns the elements index position.
 */
function arrSortedIndexOf(arr, element, compare) {
	assertArgs(arr);
	assertType(Array, arr);

	const len = arr.length;

	// obviously, there is no match then
	if (len === 0) {
		return -1
	}

	// handle comparator
	if (compare) {
		if (typeof compare === 'object') {
			// is comparator builder options
			compare = arrSortComparator(compare);
		}
	} else {
		// set default comparator
		compare = arrSortComparator();
	}

	// if theres only one element
	if (len === 1) {
		if (compare(arr[0], element) === 0) {
			return 0
		} else {
			return -1
		}
	}

	let high = len - 1;
	let low = 0;
	let i, ordering;

	// binary search for index of element
	while (high >= low) {
		i = ((high + low) / 2) >>> 0;
		ordering = compare(arr[i], element);

		if (ordering < 0) {
			low = i + 1;
		} else if (ordering > 0) {
			high = i - 1;
		} else {
			return i
		}
	}

	// not found
	return -1
}

/**
 * Comparator function callback definition.
 * @callback comparator
 * @param {*} a - The first value to compare
 * @param {*} b - The second value to compare
 * @returns {number} A negative number if a > b, a positive number if a < b, 0 otherwise.
 */

/**
 * Callback type definition.
 * @callback getter
 * @param {*} a - The value
 * @returns {*} The value to be compared
 */

export default arrSortedIndexOf;
