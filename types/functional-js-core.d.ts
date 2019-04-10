type NativeTypes = number | string | object | any[]

// core.js
declare function F(x: NativeTypes)

// enumerable.js
interface Enumerable {
  each(fn: (x: any) => any): void
  map(fn: (x: any) => any): any[]
  flatMap(fn: (x: any) => any): any[]
  maxBy(fn: (x: any) => any): number
  minBy(fn: (x: any) => any): number
  first(n?: number): any[]
  count(fn: (x: any) => any): number
  isEmpty(): boolean
  toArray(fn?: (x: any) => any): any[]
  toMap(fn?: (x: any) => any[]): object
  sortBy(fn: (x: any) => any): any[]
  uniqueBy(fn: (x: any) => any): any[]
  product(other: any[]): any[]
}

//
interface Hashable {
  hash(): number
}

// utils.js
declare function fancyEquals(a: any, b: any): boolean
declare function range(from: number, to: number): number[]
declare function isArray(x: any): boolean
declare function isObject(x: any): boolean
declare function isString(x: any): boolean
declare function isBool(x: any): boolean
declare function isFunction(x: any): boolean
declare function isNumber(x: any): boolean
declare function isNull(x: any): boolean
declare function isBlank(x: any): boolean
declare function isPresent(x: any): boolean

// fobject.js
interface FObject {
  hash(): number
  toJs(): NativeTypes
  equals(other: any): boolean
}

// fstring.js
interface FString extends Object, Enumerable, Hashable {
  strip(): string
}

// fmap.js
interface FMap extends Object, Enumerable {

}

// fnumber.js
interface FNumber extends Object, Hashable {
  clamp(min: number, max: number): number
  round(place?: number): number
}

// farray.js
interface FArray<T> extends Object, Enumerable {
  rotated(n?: number): T[]
  flatten(depth?: number): T[]
}