import { describe, it, expect } from 'vitest';
import { validateNumber, parseNumbers, formatResult, parseNumbersArray, parseBinaryNumber, parseHexNumber, parseOctalNumber, parseIntegerNumber } from './utils';

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

    it('should format string results correctly', () => {
      expect(formatResult('tobinary', '1010')).toBe('Tobinary Math Result: 1010');
      expect(formatResult('tohex', 'FF')).toBe('Tohex Math Result: FF');
      expect(formatResult('tooctal', '12')).toBe('Tooctal Math Result: 12');
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

  describe('parseBinaryNumber', () => {
    it('should parse binary number without prefix', () => {
      expect(parseBinaryNumber('1010')).toBe(10);
      expect(parseBinaryNumber('11111111')).toBe(255);
      expect(parseBinaryNumber('0')).toBe(0);
      expect(parseBinaryNumber('1')).toBe(1);
    });

    it('should parse binary number with 0b prefix', () => {
      expect(parseBinaryNumber('0b1010')).toBe(10);
      expect(parseBinaryNumber('0b11111111')).toBe(255);
    });

    it('should throw error for invalid binary format', () => {
      expect(() => parseBinaryNumber('1012')).toThrow('Invalid binary format. Binary numbers can only contain 0 and 1');
      expect(() => parseBinaryNumber('abc')).toThrow('Invalid binary format. Binary numbers can only contain 0 and 1');
      expect(() => parseBinaryNumber('')).toThrow('Invalid binary format. Binary numbers can only contain 0 and 1');
    });
  });

  describe('parseHexNumber', () => {
    it('should parse hex number without prefix', () => {
      expect(parseHexNumber('A')).toBe(10);
      expect(parseHexNumber('FF')).toBe(255);
      expect(parseHexNumber('1A2B')).toBe(6699);
      expect(parseHexNumber('0')).toBe(0);
    });

    it('should parse hex number with 0x prefix', () => {
      expect(parseHexNumber('0xFF')).toBe(255);
      expect(parseHexNumber('0xA')).toBe(10);
    });

    it('should parse hex number with lowercase', () => {
      expect(parseHexNumber('a')).toBe(10);
      expect(parseHexNumber('ff')).toBe(255);
      expect(parseHexNumber('0xff')).toBe(255);
    });

    it('should throw error for invalid hex format', () => {
      expect(() => parseHexNumber('G')).toThrow('Invalid hexadecimal format. Hexadecimal numbers can only contain 0-9 and A-F');
      expect(() => parseHexNumber('12G')).toThrow('Invalid hexadecimal format. Hexadecimal numbers can only contain 0-9 and A-F');
      expect(() => parseHexNumber('')).toThrow('Invalid hexadecimal format. Hexadecimal numbers can only contain 0-9 and A-F');
    });
  });

  describe('parseOctalNumber', () => {
    it('should parse octal number without prefix', () => {
      expect(parseOctalNumber('12')).toBe(10);
      expect(parseOctalNumber('777')).toBe(511);
      expect(parseOctalNumber('0')).toBe(0);
    });

    it('should parse octal number with 0o prefix', () => {
      expect(parseOctalNumber('0o12')).toBe(10);
      expect(parseOctalNumber('0O12')).toBe(10);
    });

    it('should throw error for invalid octal format', () => {
      expect(() => parseOctalNumber('89')).toThrow('Invalid octal format. Octal numbers can only contain 0-7');
      expect(() => parseOctalNumber('abc')).toThrow('Invalid octal format. Octal numbers can only contain 0-7');
      expect(() => parseOctalNumber('')).toThrow('Invalid octal format. Octal numbers can only contain 0-7');
    });
  });

  describe('parseIntegerNumber', () => {
    it('should parse valid integers', () => {
      expect(parseIntegerNumber('10')).toBe(10);
      expect(parseIntegerNumber('255')).toBe(255);
      expect(parseIntegerNumber('0')).toBe(0);
      expect(parseIntegerNumber('-5')).toBe(-5);
    });

    it('should throw error for decimal numbers', () => {
      expect(() => parseIntegerNumber('10.5')).toThrow('Only integers can be converted');
      expect(() => parseIntegerNumber('3.14')).toThrow('Only integers can be converted');
    });

    it('should throw error for invalid number format', () => {
      expect(() => parseIntegerNumber('abc')).toThrow();
      expect(() => parseIntegerNumber('')).toThrow();
    });
  });
});

