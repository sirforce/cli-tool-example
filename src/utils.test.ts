import { describe, it, expect } from 'vitest';
import { validateNumber, parseNumbers, formatResult, parseNumbersArray } from './utils';

describe('utils', () => {
  describe('validateNumber', () => {
    it('should not throw for valid numbers', () => {
      expect(() => validateNumber(5, 'Test')).not.toThrow();
      expect(() => validateNumber(0, 'Test')).not.toThrow();
      expect(() => validateNumber(-5, 'Test')).not.toThrow();
      expect(() => validateNumber(3.14, 'Test')).not.toThrow();
    });

    it('should throw for NaN', () => {
      expect(() => validateNumber(NaN, 'Test')).toThrow('Test must be a valid number');
    });
  });

  describe('parseNumbers', () => {
    it('should parse valid number strings', () => {
      const [num1, num2] = parseNumbers('5', '3');
      expect(num1).toBe(5);
      expect(num2).toBe(3);
    });

    it('should parse decimal numbers', () => {
      const [num1, num2] = parseNumbers('3.14', '2.71');
      expect(num1).toBe(3.14);
      expect(num2).toBe(2.71);
    });

    it('should parse negative numbers', () => {
      const [num1, num2] = parseNumbers('-5', '-3');
      expect(num1).toBe(-5);
      expect(num2).toBe(-3);
    });

    it('should throw for invalid first number', () => {
      expect(() => parseNumbers('invalid', '5')).toThrow('First number must be a valid number');
    });

    it('should throw for invalid second number', () => {
      expect(() => parseNumbers('5', 'invalid')).toThrow('Second number must be a valid number');
    });
  });

  describe('formatResult', () => {
    it('should format result correctly', () => {
      expect(formatResult('add', 8)).toBe('Add Math Result: 8');
      expect(formatResult('subtract', 6)).toBe('Subtract Math Result: 6');
      expect(formatResult('multiply', 42)).toBe('Multiply Math Result: 42');
    });

    it('should capitalize operation name', () => {
      expect(formatResult('divide', 5)).toBe('Divide Math Result: 5');
      expect(formatResult('pow', 8)).toBe('Pow Math Result: 8');
    });
  });

  describe('parseNumbersArray', () => {
    it('should parse valid number strings array', () => {
      const numbers = parseNumbersArray(['5', '3', '2']);
      expect(numbers).toEqual([5, 3, 2]);
    });

    it('should parse decimal numbers', () => {
      const numbers = parseNumbersArray(['3.14', '2.71', '1.5']);
      expect(numbers).toEqual([3.14, 2.71, 1.5]);
    });

    it('should parse negative numbers', () => {
      const numbers = parseNumbersArray(['-5', '-3', '2']);
      expect(numbers).toEqual([-5, -3, 2]);
    });

    it('should parse scientific notation', () => {
      const numbers = parseNumbersArray(['1e2', '2e1', '3']);
      expect(numbers).toEqual([100, 20, 3]);
    });

    it('should throw for invalid number format', () => {
      expect(() => parseNumbersArray(['5', 'abc', '3'])).toThrow();
    });

    it('should throw for empty array', () => {
      expect(() => parseNumbersArray([])).toThrow('At least 2 numbers are required');
    });

    it('should throw for single number', () => {
      expect(() => parseNumbersArray(['5'])).toThrow('At least 2 numbers are required');
    });

    it('should validate minimum 2 numbers requirement', () => {
      const numbers = parseNumbersArray(['5', '3']);
      expect(numbers).toEqual([5, 3]);
    });

    it('should handle large arrays', () => {
      const numbers = parseNumbersArray(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
      expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should handle floating point precision', () => {
      const numbers = parseNumbersArray(['0.1', '0.2']);
      expect(numbers).toEqual([0.1, 0.2]);
    });
  });
});

