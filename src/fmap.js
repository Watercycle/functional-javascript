// TODO: This is an ES6 map that provides an overridable hash.

import {Enumerable} from "./enumerable";
import FObject from "./fobject";

export default function FMap(object) {
  // Allow for both 'new FMap()' and 'FMap()'
  if (!(this instanceof FMap)) return new FMap(object)

  this.data = object
}

export const MapMethods = {

}

FMap.prototype = FObject
Object.assign(FMap.prototype, Enumerable)
Object.assign(FMap.prototype, MapMethods)
