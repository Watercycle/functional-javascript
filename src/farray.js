import { Enumerable } from './enumerable'
import FObject from "./fobject";

export default function FArray(array = []) {
  // Allow for both 'new FArray()' and 'FArray()'
  if (!(this instanceof FArray)) return new FArray(array)

  this.data = array
}

const ArrayMethods = {
  // Returns a new array resulting from shifting all elements over n times.
  //
  // ```
  // FArray([1, 2, 3, 4]).rotated().toJs()  // => [2, 3, 4, 1]
  // FArray([1, 2, 3, 4]).rotated(2).toJs() // => [3, 4, 1, 2]
  // ```
  rotated(n = 1) {
    return FArray(this.data.slice(n).concat(this.data.slice(0, n)))
  },

  // Calls the given function with each element in the array.
  //
  // ```
  // FArray([1, 2, 3]).each(x => console.log(x)) // 1 2 3
  // ```
  each(fn) {
    this.data.forEach(x => fn(x))
  },

  // Returns the array resulting from concatenating sub-array elements.
  //
  // ```
  // FArray([[1, 2], [3, 4]]).flatten().toJs() // => [1, 2, 3, 4]
  // ```
  flatten(level = 1) {
    return FArray(this.data.flat(level))
  },

  // Returns the i'th element of the array.
  //
  // ```
  // FArray([1, 2, 3]).get(1) // => 2
  // ```
  get(i) {
    return this.data[i]
  },

  // Sets the i'th element of the array.
  //
  // ```
  // let a = FArray([1, 2, 3])
  // a.set(1, 4)
  // a.toJs() // => [1, 4, 3]
  // ```
  set(i, val) {
    this.data[i] = val
  },

  // Returns the number of element in the array.
  //
  // ```
  // FArray([1, 2, 3]).size() // => 3
  // ```
  size() {
    return this.data.length
  },

  // Returns true if each pair-wise elements in the current and given
  // array are equal.
  //
  // Note: array elements may also provide an overrideable `equals` method.
  //
  // ```
  // FArray([1, 2, 3]).size() // => 3
  // ```
  equals(other) {
    if(!(other instanceof 'FArray')) return false

    // optimization
    if(this.size() !== other.size()) return false

    // pair-wise element comparison
    for(let i = 0; i < this.size(); i++) {
      if (!fancyEquals(this.get(i), other.get(i))) {
        return false
      }
    }

    return true
  }
}

FArray.prototype = FObject
Object.assign(FArray.prototype, Enumerable)
Object.assign(FArray.prototype, ArrayMethods)
