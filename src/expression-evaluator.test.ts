import { describe, it, expect } from 'vitest';
import { evaluateExpression } from './expression-evaluator';

describe('expression-evaluator', () => {
  // Test Suite 1: Basic Arithmetic
  describe('Test Suite 1: Basic Arithmetic', () => {
    it('Test 1.1: Simple Addition', () => {
      const result = evaluateExpression('2 + 3');
      expect(result).toBe(5);
    });

    it('Test 1.2: Simple Subtraction', () => {
      const result = evaluateExpression('10 - 4');
      expect(result).toBe(6);
    });

    it('Test 1.3: Simple Multiplication', () => {
      const result = evaluateExpression('5 * 6');
      expect(result).toBe(30);
    });

    it('Test 1.4: Simple Division', () => {
      const result = evaluateExpression('20 / 4');
      expect(result).toBe(5);
    });

    it('Test 1.5: Exponentiation with ^', () => {
      const result = evaluateExpression('2 ^ 3');
      expect(result).toBe(8);
    });

    it('Test 1.5b: Exponentiation with **', () => {
      const result = evaluateExpression('2 ** 3');
      expect(result).toBe(8);
    });

    it('Test 1.6: Modulo', () => {
      const result = evaluateExpression('10 % 3');
      expect(result).toBe(1);
    });
  });

  // Test Suite 2: Operator Precedence
  describe('Test Suite 2: Operator Precedence', () => {
    it('Test 2.1: Multiplication Before Addition', () => {
      const result = evaluateExpression('2 + 3 * 4');
      expect(result).toBe(14); // not 20
    });

    it('Test 2.2: Division Before Subtraction', () => {
      const result = evaluateExpression('10 - 8 / 2');
      expect(result).toBe(6); // not 1
    });

    it('Test 2.3: Exponentiation Before Multiplication', () => {
      const result = evaluateExpression('2 * 3 ^ 2');
      expect(result).toBe(18); // not 36
    });

    it('Test 2.4: Multiple Operations', () => {
      const result = evaluateExpression('1 + 2 * 3 - 4 / 2');
      expect(result).toBe(5);
    });
  });

  // Test Suite 3: Parentheses
  describe('Test Suite 3: Parentheses', () => {
    it('Test 3.1: Parentheses Override Precedence', () => {
      const result = evaluateExpression('(2 + 3) * 4');
      expect(result).toBe(20); // not 14
    });

    it('Test 3.2: Nested Parentheses', () => {
      const result = evaluateExpression('((10 + 5) * 2) / 3');
      expect(result).toBe(10);
    });

    it('Test 3.3: Multiple Parentheses Groups', () => {
      const result = evaluateExpression('(10 + 5) * (2 + 3)');
      expect(result).toBe(75);
    });

    it('Test 3.4: Unmatched Parentheses - Missing Closing', () => {
      expect(() => evaluateExpression('(2 + 3')).toThrow(/unmatched parentheses/i);
    });

    it('Test 3.5: Unmatched Parentheses - Missing Opening', () => {
      expect(() => evaluateExpression('2 + 3)')).toThrow(/unmatched parentheses/i);
    });
  });

  // Test Suite 4: Functions
  describe('Test Suite 4: Functions', () => {
    it('Test 4.1: Square Root Function', () => {
      const result = evaluateExpression('sqrt(16)');
      expect(result).toBe(4);
    });

    it('Test 4.2: Absolute Value Function', () => {
      const result = evaluateExpression('abs(-5)');
      expect(result).toBe(5);
    });

    it('Test 4.3: Trigonometric Functions - sin', () => {
      const result = evaluateExpression('sin(0)');
      expect(result).toBeCloseTo(0, 10);
    });

    it('Test 4.3b: Trigonometric Functions - cos', () => {
      const result = evaluateExpression('cos(0)');
      expect(result).toBeCloseTo(1, 10);
    });

    it('Test 4.3c: Trigonometric Functions - tan', () => {
      const result = evaluateExpression('tan(0)');
      expect(result).toBeCloseTo(0, 10);
    });

    it('Test 4.4: Logarithm Functions - log10', () => {
      const result = evaluateExpression('log10(100)');
      expect(result).toBe(2);
    });

    it('Test 4.4b: Logarithm Functions - log', () => {
      const result = evaluateExpression('log(10)');
      expect(result).toBeCloseTo(2.302585092994046, 10);
    });

    it('Test 4.5: Rounding Functions - ceil', () => {
      const result = evaluateExpression('ceil(4.3)');
      expect(result).toBe(5);
    });

    it('Test 4.5b: Rounding Functions - floor', () => {
      const result = evaluateExpression('floor(4.7)');
      expect(result).toBe(4);
    });

    it('Test 4.5c: Rounding Functions - round', () => {
      const result = evaluateExpression('round(4.7)');
      expect(result).toBe(5);
    });

    it('Test 4.6: Max Function', () => {
      const result = evaluateExpression('max(1, 5, 3)');
      expect(result).toBe(5);
    });

    it('Test 4.7: Min Function', () => {
      const result = evaluateExpression('min(1, 5, 3)');
      expect(result).toBe(1);
    });

    it('Test 4.8: Function in Expression', () => {
      const result = evaluateExpression('sqrt(16) + 5');
      expect(result).toBe(9);
    });

    it('Test 4.9: Nested Functions', () => {
      const result = evaluateExpression('sqrt(abs(-16))');
      expect(result).toBe(4);
    });

    it('Test 4.10: Invalid Function Name', () => {
      expect(() => evaluateExpression('invalid(5)')).toThrow(/unknown function/i);
    });

    it('Test 4.11: Function with Wrong Number of Arguments - sqrt', () => {
      expect(() => evaluateExpression('sqrt(16, 4)')).toThrow(/wrong number of arguments/i);
    });

    it('Test 4.12: Function with Wrong Number of Arguments - abs', () => {
      expect(() => evaluateExpression('abs(5, 3)')).toThrow(/wrong number of arguments/i);
    });
  });

  // Test Suite 5: Constants
  describe('Test Suite 5: Constants', () => {
    it('Test 5.1: Pi Constant', () => {
      const result = evaluateExpression('pi');
      expect(result).toBeCloseTo(3.141592653589793, 10);
    });

    it('Test 5.1b: Pi Constant with π symbol', () => {
      const result = evaluateExpression('π');
      expect(result).toBeCloseTo(3.141592653589793, 10);
    });

    it('Test 5.2: E Constant', () => {
      const result = evaluateExpression('e');
      expect(result).toBeCloseTo(2.718281828459045, 10);
    });

    it('Test 5.3: Constants in Expressions', () => {
      const result = evaluateExpression('2 * pi');
      expect(result).toBeCloseTo(6.283185307179586, 10);
    });

    it('Test 5.4: Constants in Functions', () => {
      const result = evaluateExpression('sin(pi / 2)');
      expect(result).toBeCloseTo(1, 10);
    });
  });

  // Test Suite 6: Complex Expressions
  describe('Test Suite 6: Complex Expressions', () => {
    it('Test 6.1: Complex Expression', () => {
      const result = evaluateExpression('(10 + 5) * 2 - 8 / 4');
      expect(result).toBe(28);
    });

    it('Test 6.2: Expression with Functions', () => {
      const result = evaluateExpression('sqrt(16) + log10(100) * 2');
      expect(result).toBe(8);
    });

    it('Test 6.3: Expression with Constants', () => {
      const result = evaluateExpression('2 * pi * 5');
      expect(result).toBeCloseTo(31.41592653589793, 10);
    });

    it('Test 6.4: Very Complex Expression', () => {
      const result = evaluateExpression('(sqrt(16) + abs(-5)) * (log10(100) + 1)');
      expect(result).toBe(27);
    });
  });

  // Test Suite 7: Error Handling
  describe('Test Suite 7: Error Handling', () => {
    it('Test 7.1: Division by Zero', () => {
      expect(() => evaluateExpression('10 / 0')).toThrow(/division by zero/i);
    });

    it('Test 7.2: Invalid Syntax - Double Operator', () => {
      expect(() => evaluateExpression('2 + + 3')).toThrow();
    });

    it('Test 7.3: Missing Operand', () => {
      expect(() => evaluateExpression('2 +')).toThrow();
    });

    it('Test 7.4: Invalid Characters', () => {
      expect(() => evaluateExpression('2 @ 3')).toThrow();
    });

    it('Test 7.5: Empty Expression', () => {
      expect(() => evaluateExpression('')).toThrow(/empty expression/i);
    });

    it('Test 7.6: Missing Closing Parenthesis', () => {
      expect(() => evaluateExpression('(2 + 3')).toThrow(/unmatched parentheses/i);
    });

    it('Test 7.7: Missing Opening Parenthesis', () => {
      expect(() => evaluateExpression('2 + 3)')).toThrow(/unmatched parentheses/i);
    });

    it('Test 7.8: Function with Wrong Number of Arguments', () => {
      expect(() => evaluateExpression('sqrt(16, 4)')).toThrow(/wrong number of arguments/i);
    });

    it('Test 7.9: Invalid number format', () => {
      expect(() => evaluateExpression('2.3.4 + 5')).toThrow();
    });

    it('Test 7.10: Unary minus', () => {
      const result = evaluateExpression('-5');
      expect(result).toBe(-5);
    });

    it('Test 7.11: Unary minus in expression', () => {
      const result = evaluateExpression('-5 + 3');
      expect(result).toBe(-2);
    });

    it('Test 7.12: Whitespace handling', () => {
      const result = evaluateExpression('  2   +   3  ');
      expect(result).toBe(5);
    });
  });
});

