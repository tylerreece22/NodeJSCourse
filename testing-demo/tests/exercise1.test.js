const ex1 = require('../exercise1')

describe('fizzBuzz', () => {
    it('should throw error if input is not a number', () => {
        expect(() => {ex1.fizzBuzz('not a number')}).toThrow()
        expect(() => {ex1.fizzBuzz(null)}).toThrow()
        expect(() => {ex1.fizzBuzz(undefined)}).toThrow()
        expect(() => {ex1.fizzBuzz({})}).toThrow()
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = ex1.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    });

    it('should return Fizz if input is divisible by 3', () => {
        const result = ex1.fizzBuzz(3)
        expect(result).toBe('Fizz')
    });

    it('should return Buzz if input is divisible by 5', () => {
        const result = ex1.fizzBuzz(5)
        expect(result).toBe('Buzz')
    });

    it('should return given input if its a number and not divisible by 3 or 5', () => {
        const result = ex1.fizzBuzz(1)
        expect(result).toBe(1)
    });
})