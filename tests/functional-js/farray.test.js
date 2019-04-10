import F from '../../src/core'

test('#product', () => {
  const a = [1, 2, 3]
  const b = ['a', 'b']

  const actual = F(a).product(b).toJs()
  const expected = [
    [1, 'a'], [1, 'b'], [2, 'a'],
    [2, 'b'], [3, 'a'], [3, 'b']
  ]

  expect(actual).toEqual(expected)
})

test('#isEmpty', () => {
  expect(F([]).isEmpty()).toBeTruthy()
  expect(F([1]).isEmpty()).toBeFalsy()
  expect(F([1, 2]).isEmpty()).toBeFalsy()
})

test('#count', () => {
  const nums = F([1, 2, 3, 4, 5])

  expect(nums.count(x => x === 100)).toEqual(0)
  expect(nums.count(x => x % 2 === 0)).toEqual(2)
  expect(nums.count(x => x % 2 !== 0)).toEqual(3)
  expect(nums.count(_ => true)).toEqual(5)
})

test('#sortBy', () => {
  const data = F([
    { name: 'bob', height: 6},
    { name: 'tim', height: 5},
    { name: 'rex', height: 7},
    { name: 'man', height: 2},
  ])

  const result = data.sortBy(x => x.height).map(x => x.name).toJs()
  expect(result).toEqual(['man', 'tim', 'bob', 'rex'])
})

test('#uniqueBy', () => {
  const data = F([
    { name: 'bob'},
    { name: 'tim'},
    { name: 'bob'},
    { name: 'man'},
    { name: 'man'},
    { name: 'rob'},
  ])

  const result = data.uniqueBy(x => F(x.name)).map(x => x.name).toJs()
  expect(result.length).toEqual(4)
})

test('#maxBy', () => {
  const data = F([
    { height: 6},
    { height: 5},
    { height: 7},
    { height: 2},
  ])

  const result = data.maxBy(x => x.height)
  expect(result.height).toEqual(7)
})

test('#rotated', () => {
  const a = F([1, 2, 3, 4])

  expect(a.rotated(0).toJs()).toEqual([1, 2, 3, 4])
  expect(a.rotated(1).toJs()).toEqual([2, 3, 4, 1])
  expect(a.rotated(2).toJs()).toEqual([3, 4, 1, 2])
  expect(a.rotated(3).toJs()).toEqual([4, 1, 2, 3])
})

test('#toArray', () => {
  expect(F([1, 2, 3]).toArray().toJs()).toEqual([1, 2, 3])
})

test('#toMap', () => {
  expect(F([[1, 2], [3, 4]]).toMap()).toEqual({1: 2, 3: 4})
})