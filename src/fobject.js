// This contains root behaviour that all containers make use of.
// It is NOT representing a Javascript object.

export const FObject = {
  hash() {
    throw Error("Not Implemented")
  },

  toJs() {
    return this.data
  },

  equals(other) {
    throw Error("Not Implemented")
  }
}

export default FObject