import { Enumerable } from './enumerable'
import FObject from "./fobject";

export default function FString(string = '') {
  // Allow for both 'new FString()' and 'FString()'
  if (!(this instanceof FString)) return new FString(string)

  this.data = string
}

const StringMethods = {
  // Calls the given function with each character in the string.
  //
  // ```
  // FString('hello').each(x => console.log(x)) // h e l l o
  // ```
  each(fn) {
      [...this.data].forEach(x => fn(x))
  },

  // Returns a string without leading or trailing whitespace.
  //
  // ```
  // FString(' abc ').strip().toJs() // => 'abc'
  // ```
  strip() {
    const str = String(this.data).replace(/^\s+|\s+$/g, '')

    return FString(str)
  },

  // Override implementation
  // Source: https://stackoverflow.com/a/7666577/3878074
  hash() {
    let hash = 5381

    for (const c of this.data) {
      hash = ((hash << 5) + hash) + c
    }

    return hash
  },

  // Override implementation
  equals(other) {
    if(!(other instanceof 'FString')) return false
    return this.data === other.data
  }
}

FString.prototype = FObject
Object.assign(FString.prototype, Enumerable)
Object.assign(FString.prototype, StringMethods)
