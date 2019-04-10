import FObject from "./fobject";

export default function FNumber(number = 0) {
  // Allow for both 'new FNumber()' and 'FNumber()'
  if (!(this instanceof FNumber)) return new FNumber(number)

  this.data = number
}

const NumberMethods = {
  // Returns the number, clamped to the given range.
  //
  // ```
  // FNumber(7).clamp(6, 8).toJs() // => 7
  // FNumber(5).clamp(6, 8).toJs() // => 6
  // FNumber(9).clamp(6, 8).toJs() // => 8
  // ```
  clamp(min, max) {
    if (this.data < min) return FNumber(min)
    if (this.data > max) return FNumber(max)

    return FNumber(this.data)
  },

  // Returns the number, rounded to the given decimal place.
  //
  // ```
  // FNumber(2.2).round().toJs()     // => 2
  // FNumber(2.5).round().toJs()     // => 3
  // FNumber(5.5325).round(2).toJs() // => 5.53
  // ```
  round(place = 0) {
    const factor = Math.pow(10, place)
    return FNumber(Math.round(this.data * factor) / factor)
  },

  // Override implementation
  hash() {
    return this.data
  },

  // Override implementation
  equals(other) {
    if(!(other instanceof 'FNumber')) return false
    return this.data === other.data
  }
}

FNumber.prototype = FObject
Object.assign(FNumber.prototype, NumberMethods)