import F from '../../src/core'

test('#clamp', () => {
  expect(F(1).clamp(0, 2).toJs()).toEqual(1)
  expect(F(3).clamp(4, 5).toJs()).toEqual(4)
  expect(F(6).clamp(4, 5).toJs()).toEqual(5)
})

test('#round', () => {
  expect(F(1.6).round().toJs()).toEqual(2)
  expect(F(1.0005).round(1).toJs()).toEqual(1)
  expect(F(1.274545).round(2).toJs()).toEqual(1.27)
  expect(F(2.999).round(2).toJs()).toEqual(3)
})