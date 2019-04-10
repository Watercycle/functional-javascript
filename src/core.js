import FArray from './farray'
import FNumber from './fnumber'
import FString from './fstring'
import FMap from "./fmap";
import { isArray, isNumber, isString, isObject } from './utils'

// Returns the given data wrapped in a functional container.
//
// ```
// F([1, 2, 3]) // => FArray([1, 2, 3])
// F(1) // => FNumber(1)
// F('hello') // => FString('hello')
// F({a: 1}) // => FMap({a: 1})
// ```
export default function F(x) {
  if (isArray(x)) {
    return new FArray(x)
  } else if (isNumber(x)) {
    return new FNumber(x)
  } else if (isString(x)) {
    return new FString(x)
  } else if (isObject(x)) {
    return new FMap(x)
  } else {
    throw Error(`Type '${typeof x}' Not Supported: (${x})`)
  }
}