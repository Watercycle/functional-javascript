// This is a dump for random helper functions that aren't application specific.

import FArray from './farray'

// Returns the results of the first argument's `equals` function or
// Javascript's `===` equality if `equals` is not implemented.
//
// This just allows for objects to provide an overrideable equals.
export function fancyEquals(a, b) {
  if (typeof(a.equals) !== 'undefined') {
    return a.equals(b)
  } else {
    return a === b
  }
}

// Returns an FArray of ascending integers from the first given number up to
// (but not including) the second given number.
//
// ```
// range(1, 1).toJs() // => []
// range(1, 4).toJs() // => [1, 2, 3]
// ```
export function range(from, to) {
  if (from < 1 || to < 1) throw Error('pre-condition: must be at least one')

  if (typeof(to) === 'undefined') {
    return FArray([...Array(from).keys()])
  } else {
    if (from > to) throw Error('pre-condition: from <= to')
    const size = to - from

    return FArray([...Array(size).keys()].map(i => i + from))
  }
}

// Returns true if the given value is a Javascript array, false otherwise.
export function isArray(x) {
  return Array.isArray(x)
}

// Returns true if the given value is a Javascript object, false otherwise.
export function isObject(x) {
  if (isArray(x)) return false

  return typeof(x) === 'object'
}

// Returns true if the given value is a Javascript string, false otherwise.
export function isString(x) {
  return typeof(x) === 'string'
}

// Returns true if the given value is a Javascript boolean, false otherwise.
export function isBool(x) {
  return typeof(x) === 'boolean'
}

// Returns true if the given value is a Javascript function, false otherwise.
export function isFunction(x) {
  return typeof(x) === 'function'
}

// Returns true if the given value is a Javascript number, false otherwise.
export function isNumber(x) {
  return typeof(x) === 'number'
}

// Returns true if the given value is either null or undefined, false
// otherwise. They are deliberately being considered the same thing.
export function isNull(x) {
  return x === undefined || x === null
}

// Returns true if the given value is: false, '', ' ', nil, [], or {},
// false otherwise.
export function isBlank(x) {
  if (isNull(x)) return true
  if (isBool(x) && !x) return true
  if (isString(x) && x.strip().isEmpty()) return true
  if (isArray(x) && x.isEmpty()) return true
  if (isObject(x) && x.isEmpty()) return true

  return false
}

// Returns true if the given value is not blank, false otherwise.
export function isPresent(x) {
  return !isBlank(x)
}