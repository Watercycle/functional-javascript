// This is a prototype mixin that adds common methods to any container that
// can be enumerated over. Or, in other words, any container that implements
// an each method.

import { isNull } from './utils'
import FArray from './farray'

export const Enumerable = {
  // Returns the array resulting from applying fn to each element.
  //
  // ```
  // F([1, 2, 3]).map(x => x * 2).toJs() // => [2, 4, 6]
  // ```
  map(fn) {
    let result = []
    this.each(x => result.push(fn(x)))

    return FArray(result)
  },

  // Returns the array resulting from applying fn to each element and then
  // concatenating any resulting arrays together.
  //
  // ```
  // F([1, 2, 3]).map(x => [x * 2, x * 4]).toJs() // => [2, 4, 4, 8, 6, 12]
  // ```
  flatMap(fn) {
    return this.map(fn).flatten()
  },

  // Returns the maximum element determined by ordering the results
  // of the given transformation function.
  //
  // ```
  // F(['abc', 'defg', 'h']).maxBy(x => x.length) // => 'defg'
  // ```
  maxBy(fn) {
    let maxVal = this.first()
    let maxMappedVal = fn(this.first())

    this.each(x => {
      const mappedVal = fn(x)

      if (mappedVal > maxMappedVal) {
        maxVal = x
        maxMappedVal = mappedVal
      }
    })

    return maxVal
  },

  // Returns the minimum element determined by ordering the results
  // of the given transformation function.
  //
  // ```
  // F(['abc', 'defg', 'h']).minBy(x => x.length) // => 'h'
  // ```
  minBy(fn) {
    let minVal = this.first()
    let minMappedVal = fn(this.first())

    this.each(x => {
      const mappedVal = fn(x)

      if (mappedVal < minMappedVal) {
        minVal = x
        minMappedVal = mappedVal
      }
    })

    return minVal
  },

  // Returns the first element in the sequence or an array of the first n
  // elements if given an argument.
  //
  // ```
  // F([1, 2, 3]).first() // => 1
  // F([1, 2, 3]).first(2).toJs() // => [1, 2]
  // ```
  first(n) {
    if (typeof(n) === 'undefined') {
      try {
        this.each(x => { throw x })
      } catch(x) { return x }

      return null
    } else {
      let result = []
      let count = 0

      this.each(x => {
        if (count < n) {
          count += 1
          result.push(x)
        }
      })

      return FArray(result)
    }
  },

  // Returns the number of elements who meet the given function criteria.
  //
  // ```
  // > F([1, 2, 3]).count(x => x == 2) // => 1
  // ```
  count(fn) {
    return this.data.filter(fn).length
  },

  // Returns true if the container has no elements, false otherwise.
  //
  // ```
  // F('').isEmpty() // => true
  // F([1]).isEmpty() // => false
  // ```
  isEmpty() {
    try {
      this.each(x => {
        if (typeof(x) !== 'undefined') {
          throw 'not empty (ugly short circuiting)'
        }
      })
    } catch {
      return false
    }

    return true
  },

  // Returns an array containing the individual values.
  // Optionally, a transformation function can be applied.
  //
  // ```
  // F([1, 2, 3]).toArray().toJs()    // => [1, 2, 3]
  // F({a: 1, b: 2}).toArray().toJs() // => [['a', 1], ['b', 2]]
  // F('hello').toArray().toJs()      // => ['h', 'e', 'l', 'l', 'o']
  // ```
  toArray(fn) {
    let result = []

    if (isNull(fn)) {
      this.each(x => result.push(x))
    } else {
      this.each(x => result.push(fn(x)))
    }

    return FArray(result)
  },


  // Returns an object created by interpreting the array as [key, value] pairs.
  // Alternatively, a function can be passed in that transforms an
  // enumerable into [key, value] pairs.
  //
  // ```
  // F([[1, 2], [3, 4]]).toMap().toJs() // => {1: 2, 3: 4}
  // F({a: 1, b: 2}).toMap(([k, v]).toJs() => [k, v * 2]) // => {'a': 2, 'b': 4}
  // ```
  toMap(fn) {
    let result = {}

    if (isNull(fn)) {
      this.each(x => result[x[0]] = x[1])
    } else {
      this.each(x => {
        const [k, v] = fn(x)
        result[k] = v
      })
    }

    return result
  },

  // Returns an array of elements sorted by the results of
  // the given transformation function.
  //
  // ```
  // F(['abc', 'defg', 'h']).sortBy(x => x.length).toJs() // => ['h', 'abc', 'defg']
  // ```
  sortBy(fn) {
    let temp = this.data.map(x => { return { rank: fn(x), val: x }})
    temp.sort((x, y) => x.rank - y.rank )

    return FArray(temp.map(x => x.val))
  },

  // Returns an array of unique elements as determined by the results of the
  // given transformation function results. In order to use this method, all
  // elements mush implement a hash function.
  //
  // ```
  // F(['c', 'defg', 'h']).uniqueBy(x => x.length).toJs() // => ['c', 'defg']
  // ```
  uniqueBy(fn) {
    let set = {}

    this.each(x => {
      const h = fn(x).hash()
      if (!set.hasOwnProperty(h)) set[h] = x
    })

    return FArray(Object.values(set))
  },

  // Returns the cartesian product between the current array and the given
  // array.
  //
  // ```
  // const result = F([1, 2, 3]).product(['a', 'b']).toJs()
  // result // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b'], [3, 'a'], [3, 'b']]
  // ```
  product(other) {
    return this.flatMap(x => (other.map(y => [x, y])))
  },

  // Returns an array of elements that satisfy the given function.
  //
  // ```
  // F([1, 2, 3, 4]).filter(x => x % 2 == 0).toJs() // => [2, 4]
  // ```
  filter(fn) {
    let result = []

    this.each(x => {
      if (fn(x)) result.push(x)
    })

    return FArray(result)
  }
}
