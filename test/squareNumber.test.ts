import squareNumber from '../src/util/squareNumber'

describe('square number', () => {
  it('should square a positive number', () => {
    expect(squareNumber(2)).toBe(4)
  })

  it('should square a negative number', () => {
    expect(squareNumber(-4)).toBe(16)
  })

  it('should square zero', () => {
    expect(squareNumber(0)).toBe(0)
  })

  it('should square a float number', () => {
    expect(squareNumber(1.5)).toBeCloseTo(2.25, 5)
  })
})
