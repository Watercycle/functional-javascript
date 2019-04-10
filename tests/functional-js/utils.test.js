import {range, isNull} from '../../src/utils'

describe('range', () => {
  it('works with one argument', () => {
    expect(range(1).toJs()).toEqual([0])
    expect(range(5).toJs()).toEqual([0, 1, 2, 3, 4])
  })

  it('works with two arguments', () => {
    expect(range(1, 1).toJs()).toEqual([])
    expect(range(1, 5).toJs()).toEqual([1, 2, 3, 4])
  })
})

test('#isNull', () => {
  expect(isNull({})).toEqual(false)
  expect(isNull([])).toEqual(false)
  expect(isNull(0)).toEqual(false)
  expect(isNull(42)).toEqual(false)
  expect(isNull(true)).toEqual(false)
  expect(isNull(false)).toEqual(false)
  expect(isNull(null)).toEqual(true)
  expect(isNull(undefined)).toEqual(true)
})