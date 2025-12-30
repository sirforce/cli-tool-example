import { describe, it, expect } from 'vitest';
import {
  operations,
  executeOperation,
  isValidOperation,
  getAvailableOperations,
  getOperationDescription,
  getOperationExample,
  getAllOperationsWithDescriptions,
} from './operations';
import { parseNumbersArray } from './utils';

describe('operations', () => {
  describe('basic operations', () => {
    describe('add operation', () => {
      it('should add two numbers correctly', () => {
        expect(operations.add(5, 3)).toBe(8);
        expect(operations.add(-1, 1)).toBe(0);
        expect(operations.add(0, 0)).toBe(0);
      });

      it('should add multiple numbers correctly', () => {
        expect(operations.add(5, 5, 10)).toBe(20);
        expect(operations.add(1, 2, 3, 4, 5)).toBe(15);
        expect(operations.add(10, -5, 3, -2)).toBe(6);
      });

      it('should throw error with single number', () => {
        expect(() => operations.add(5)).toThrow('At least 2 numbers are required');
      });
    });

    describe('subtract operation', () => {
      it('should subtract two numbers correctly', () => {
        expect(operations.subtract(10, 4)).toBe(6);
        expect(operations.subtract(5, 5)).toBe(0);
        expect(operations.subtract(3, 10)).toBe(-7);
      });

      it('should subtract multiple numbers correctly', () => {
        expect(operations.subtract(10, 100, 2)).toBe(-92);
        expect(operations.subtract(100, 10, 5)).toBe(85);
        expect(operations.subtract(20, 4, 2, 1)).toBe(13);
      });

      it('should throw error with single number', () => {
        expect(() => operations.subtract(5)).toThrow('At least 2 numbers are required');
      });
    });

    describe('multiply operation', () => {
      it('should multiply two numbers correctly', () => {
        expect(operations.multiply(6, 7)).toBe(42);
        expect(operations.multiply(5, 0)).toBe(0);
        expect(operations.multiply(-2, 3)).toBe(-6);
      });

      it('should multiply multiple numbers correctly', () => {
        expect(operations.multiply(2, 3, 4)).toBe(24);
        expect(operations.multiply(5, 2, 3, 2)).toBe(60);
        expect(operations.multiply(-2, 3, -4)).toBe(24);
      });

      it('should throw error with single number', () => {
        expect(() => operations.multiply(5)).toThrow('At least 2 numbers are required');
      });
    });

    describe('divide operation', () => {
      it('should divide two numbers correctly', () => {
        expect(operations.divide(20, 4)).toBe(5);
        expect(operations.divide(10, 2)).toBe(5);
        expect(operations.divide(7, 2)).toBe(3.5);
      });

      it('should divide multiple numbers correctly', () => {
        expect(operations.divide(100, 10, 2)).toBe(5);
        expect(operations.divide(100, 2, 5)).toBe(10);
        expect(operations.divide(100, 10, 2, 2)).toBe(2.5);
      });

      it('should throw error when dividing by zero', () => {
        expect(() => operations.divide(10, 0)).toThrow('Division by zero is not allowed');
        expect(() => operations.divide(10, 5, 0)).toThrow('Division by zero is not allowed');
      });

      it('should throw error with single number', () => {
        expect(() => operations.divide(5)).toThrow('At least 2 numbers are required');
      });
    });

    describe('pow operation', () => {
      it('should raise number to power correctly', () => {
        expect(operations.pow(2, 3)).toBe(8);
        expect(operations.pow(5, 0)).toBe(1);
        expect(operations.pow(3, 2)).toBe(9);
      });

      it('should raise multiple numbers to powers sequentially', () => {
        expect(operations.pow(2, 3, 2)).toBe(64); // (2^3)^2 = 8^2 = 64
        expect(operations.pow(2, 2, 3)).toBe(64); // (2^2)^3 = 4^3 = 64
        expect(operations.pow(3, 2, 2)).toBe(81); // (3^2)^2 = 9^2 = 81
      });

      it('should throw error with single number', () => {
        expect(() => operations.pow(5)).toThrow('At least 2 numbers are required');
      });
    });
  });

  describe('executeOperation', () => {
    it('should execute valid operations with two numbers', () => {
      const result = executeOperation('add', 5, 3);
      expect(result.result).toBe(8);
      expect(result.operation).toBe('add');
    });

    it('should execute add operation with multiple numbers', () => {
      const result = executeOperation('add', 5, 5, 10);
      expect(result.result).toBe(20);
      expect(result.operation).toBe('add');
    });

    it('should execute subtract operation with multiple numbers', () => {
      const result = executeOperation('subtract', 10, 100, 2);
      expect(result.result).toBe(-92);
      expect(result.operation).toBe('subtract');
    });

    it('should execute multiply operation with multiple numbers', () => {
      const result = executeOperation('multiply', 2, 3, 4);
      expect(result.result).toBe(24);
      expect(result.operation).toBe('multiply');
    });

    it('should execute divide operation with multiple numbers', () => {
      const result = executeOperation('divide', 100, 10, 2);
      expect(result.result).toBe(5);
      expect(result.operation).toBe('divide');
    });

    it('should execute pow operation with multiple numbers', () => {
      const result = executeOperation('pow', 2, 3, 2);
      expect(result.result).toBe(64);
      expect(result.operation).toBe('pow');
    });

    it('should throw error for invalid operation', () => {
      expect(() => executeOperation('invalid', 1, 2)).toThrow('Unknown operation: invalid');
    });

    it('should throw error with single number', () => {
      expect(() => executeOperation('add', 5)).toThrow('At least 2 numbers are required');
    });
  });

  describe('isValidOperation', () => {
    it('should return true for valid operations', () => {
      expect(isValidOperation('add')).toBe(true);
      expect(isValidOperation('subtract')).toBe(true);
      expect(isValidOperation('multiply')).toBe(true);
      expect(isValidOperation('divide')).toBe(true);
      expect(isValidOperation('pow')).toBe(true);
    });

    it('should return false for invalid operations', () => {
      expect(isValidOperation('invalid')).toBe(false);
      expect(isValidOperation('')).toBe(false);
    });
  });

  describe('getAvailableOperations', () => {
    it('should return array of available operations', () => {
      const ops = getAvailableOperations();
      expect(Array.isArray(ops)).toBe(true);
      expect(ops.length).toBeGreaterThan(0);
      expect(ops).toContain('add');
      expect(ops).toContain('subtract');
    });
  });

  describe('getOperationDescription', () => {
    it('should return description for valid operation', () => {
      expect(getOperationDescription('add')).toBe('Add multiple numbers together');
    });

    it('should return default message for invalid operation', () => {
      expect(getOperationDescription('invalid')).toBe('No description available');
    });
  });

  describe('getOperationExample', () => {
    it('should return example for valid operation', () => {
      expect(getOperationExample('add')).toBe('calc add 5 3 10');
    });

    it('should return empty string for invalid operation', () => {
      expect(getOperationExample('invalid')).toBe('');
    });
  });

  describe('getAllOperationsWithDescriptions', () => {
    it('should return array with all operations and their metadata', () => {
      const allOps = getAllOperationsWithDescriptions();
      expect(Array.isArray(allOps)).toBe(true);
      expect(allOps.length).toBeGreaterThan(0);
      
      const addOp = allOps.find(op => op.name === 'add');
      expect(addOp).toBeDefined();
      expect(addOp?.description).toBe('Add multiple numbers together');
      expect(addOp?.example).toBe('calc add 5 3 10');
    });
  });

  // Test Suite 1: Sum Operation
  describe('sum operation', () => {
    it('should sum two numbers correctly (Test 1.1)', () => {
      const result = executeOperation('sum', 5, 3);
      expect(result.result).toBe(8);
      expect(result.operation).toBe('sum');
    });

    it('should sum multiple positive numbers (Test 1.2)', () => {
      const result = executeOperation('sum', 1, 2, 3, 4, 5);
      expect(result.result).toBe(15);
    });

    it('should sum with negative numbers (Test 1.3)', () => {
      const result = executeOperation('sum', 10, -5, 3, -2);
      expect(result.result).toBe(6);
    });

    it('should sum decimal numbers (Test 1.4)', () => {
      const result = executeOperation('sum', 1.5, 2.3, 3.7);
      expect(result.result).toBeCloseTo(7.5, 10);
    });

    it('should sum with zero (Test 1.5)', () => {
      const result = executeOperation('sum', 5, 0, 3);
      expect(result.result).toBe(8);
    });

    it('should throw error with single number (Test 1.6)', () => {
      expect(() => executeOperation('sum', 5)).toThrow();
    });

    it('should sum large numbers (Test 1.7)', () => {
      const result = executeOperation('sum', 999999999, 1, 1);
      expect(result.result).toBe(1000000001);
    });
  });

  // Test Suite 2: Product Operation
  describe('product operation', () => {
    it('should multiply two numbers correctly (Test 2.1)', () => {
      const result = executeOperation('product', 5, 3);
      expect(result.result).toBe(15);
      expect(result.operation).toBe('product');
    });

    it('should multiply multiple numbers (Test 2.2)', () => {
      const result = executeOperation('product', 2, 3, 4);
      expect(result.result).toBe(24);
    });

    it('should return zero when any number is zero (Test 2.3)', () => {
      const result = executeOperation('product', 5, 0, 3);
      expect(result.result).toBe(0);
    });

    it('should multiply negative numbers correctly (Test 2.4)', () => {
      const result = executeOperation('product', -2, 3, -4);
      expect(result.result).toBe(24);
    });

    it('should multiply decimal numbers (Test 2.5)', () => {
      const result = executeOperation('product', 1.5, 2, 3);
      expect(result.result).toBe(9);
    });

    it('should throw error with single number (Test 2.6)', () => {
      expect(() => executeOperation('product', 5)).toThrow();
    });
  });

  // Test Suite 3: Max Operation
  describe('max operation', () => {
    it('should find max of two numbers (Test 3.1)', () => {
      const result = executeOperation('max', 5, 3);
      expect(result.result).toBe(5);
      expect(result.operation).toBe('max');
    });

    it('should find max of multiple numbers (Test 3.2)', () => {
      const result = executeOperation('max', 1, 5, 3, 9, 2);
      expect(result.result).toBe(9);
    });

    it('should find max with negative numbers (Test 3.3)', () => {
      const result = executeOperation('max', -5, -10, -1);
      expect(result.result).toBe(-1);
    });

    it('should handle duplicate maximum values (Test 3.4)', () => {
      const result = executeOperation('max', 5, 3, 5, 2);
      expect(result.result).toBe(5);
    });

    it('should find max with decimal numbers (Test 3.5)', () => {
      const result = executeOperation('max', 1.5, 2.3, 1.8);
      expect(result.result).toBe(2.3);
    });

    it('should throw error with single number (Test 3.6)', () => {
      expect(() => executeOperation('max', 5)).toThrow();
    });
  });

  // Test Suite 4: Min Operation
  describe('min operation', () => {
    it('should find min of two numbers (Test 4.1)', () => {
      const result = executeOperation('min', 5, 3);
      expect(result.result).toBe(3);
      expect(result.operation).toBe('min');
    });

    it('should find min of multiple numbers (Test 4.2)', () => {
      const result = executeOperation('min', 1, 5, 3, 9, 2);
      expect(result.result).toBe(1);
    });

    it('should find min with negative numbers (Test 4.3)', () => {
      const result = executeOperation('min', -5, -10, -1);
      expect(result.result).toBe(-10);
    });

    it('should handle duplicate minimum values (Test 4.4)', () => {
      const result = executeOperation('min', 5, 3, 3, 2);
      expect(result.result).toBe(2);
    });

    it('should find min with decimal numbers (Test 4.5)', () => {
      const result = executeOperation('min', 1.5, 2.3, 1.8);
      expect(result.result).toBe(1.5);
    });

    it('should throw error with single number (Test 4.6)', () => {
      expect(() => executeOperation('min', 5)).toThrow();
    });
  });

  // Test Suite 5: Integration and Edge Cases
  describe('n-ary operations integration and edge cases', () => {
    it('should handle very large number of arguments (Test 5.1)', () => {
      const result = executeOperation('sum', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
      expect(result.result).toBe(55);
    });

    it('should handle floating point precision (Test 5.4)', () => {
      const result = executeOperation('sum', 0.1, 0.2);
      expect(result.result).toBeCloseTo(0.3, 10);
    });

    it('should handle scientific notation (Test 5.5)', () => {
      const result = executeOperation('sum', 1e2, 2e1);
      expect(result.result).toBe(120);
    });
  });

  // ============================================================================
  // Spec 002: Advanced Mathematical Operations (Unary Operations)
  // ============================================================================

  // Test Suite 1: Square Root Operation
  describe('sqrt operation', () => {
    it('should calculate square root of perfect square (Test 1.1)', () => {
      const result = executeOperation('sqrt', 16);
      expect(result.result).toBe(4);
      expect(result.operation).toBe('sqrt');
    });

    it('should calculate square root of non-perfect square (Test 1.2)', () => {
      const result = executeOperation('sqrt', 2);
      expect(result.result).toBeCloseTo(1.4142135623730951, 10);
    });

    it('should calculate square root of zero (Test 1.3)', () => {
      const result = executeOperation('sqrt', 0);
      expect(result.result).toBe(0);
    });

    it('should calculate square root of one (Test 1.4)', () => {
      const result = executeOperation('sqrt', 1);
      expect(result.result).toBe(1);
    });

    it('should calculate square root of decimal (Test 1.5)', () => {
      const result = executeOperation('sqrt', 2.25);
      expect(result.result).toBe(1.5);
    });

    it('should throw error for square root of negative number (Test 1.6)', () => {
      expect(() => executeOperation('sqrt', -4)).toThrow('Square root of negative number is not allowed');
    });

    it('should calculate square root of very large number (Test 1.7)', () => {
      const result = executeOperation('sqrt', 1000000);
      expect(result.result).toBe(1000);
    });
  });

  // Test Suite 2: Logarithm Operations
  describe('log operation', () => {
    it('should calculate natural logarithm of one (Test 2.1)', () => {
      const result = executeOperation('log', 1);
      expect(result.result).toBe(0);
      expect(result.operation).toBe('log');
    });

    it('should calculate natural logarithm of e (Test 2.2)', () => {
      const result = executeOperation('log', 2.718281828459045);
      expect(result.result).toBeCloseTo(1, 10);
    });

    it('should calculate natural logarithm of positive number (Test 2.3)', () => {
      const result = executeOperation('log', 10);
      expect(result.result).toBeCloseTo(2.302585092994046, 10);
    });

    it('should throw error for natural logarithm of zero (Test 2.4)', () => {
      expect(() => executeOperation('log', 0)).toThrow('Logarithm of zero or negative number is not allowed');
    });

    it('should throw error for natural logarithm of negative number (Test 2.5)', () => {
      expect(() => executeOperation('log', -5)).toThrow('Logarithm of zero or negative number is not allowed');
    });
  });

  describe('log10 operation', () => {
    it('should calculate base-10 logarithm of one (Test 2.6)', () => {
      const result = executeOperation('log10', 1);
      expect(result.result).toBe(0);
      expect(result.operation).toBe('log10');
    });

    it('should calculate base-10 logarithm of ten (Test 2.7)', () => {
      const result = executeOperation('log10', 10);
      expect(result.result).toBe(1);
    });

    it('should calculate base-10 logarithm of one hundred (Test 2.8)', () => {
      const result = executeOperation('log10', 100);
      expect(result.result).toBe(2);
    });

    it('should throw error for base-10 logarithm of zero (Test 2.9)', () => {
      expect(() => executeOperation('log10', 0)).toThrow('Logarithm of zero or negative number is not allowed');
    });
  });

  // Test Suite 3: Trigonometric Operations
  describe('sin operation', () => {
    it('should calculate sine of zero (Test 3.1)', () => {
      const result = executeOperation('sin', 0);
      expect(result.result).toBe(0);
      expect(result.operation).toBe('sin');
    });

    it('should calculate sine of π/2 (Test 3.2)', () => {
      const result = executeOperation('sin', 1.5707963267948966);
      expect(result.result).toBeCloseTo(1, 10);
    });

    it('should calculate sine of π (Test 3.3)', () => {
      const result = executeOperation('sin', 3.141592653589793);
      expect(result.result).toBeCloseTo(0, 10);
    });
  });

  describe('cos operation', () => {
    it('should calculate cosine of zero (Test 3.4)', () => {
      const result = executeOperation('cos', 0);
      expect(result.result).toBe(1);
      expect(result.operation).toBe('cos');
    });

    it('should calculate cosine of π/2 (Test 3.5)', () => {
      const result = executeOperation('cos', 1.5707963267948966);
      expect(result.result).toBeCloseTo(0, 10);
    });

    it('should calculate cosine of π (Test 3.6)', () => {
      const result = executeOperation('cos', 3.141592653589793);
      expect(result.result).toBeCloseTo(-1, 10);
    });
  });

  describe('tan operation', () => {
    it('should calculate tangent of zero (Test 3.7)', () => {
      const result = executeOperation('tan', 0);
      expect(result.result).toBe(0);
      expect(result.operation).toBe('tan');
    });

    it('should calculate tangent of π/4 (Test 3.8)', () => {
      const result = executeOperation('tan', 0.7853981633974483);
      expect(result.result).toBeCloseTo(1, 10);
    });

    it('should calculate tangent near π/2 (Test 3.9)', () => {
      const result = executeOperation('tan', 1.5707963267948966);
      expect(result.result).toBeGreaterThan(1e10); // Very large number approaching infinity
    });
  });

  // Test Suite 4: Absolute Value Operation
  describe('abs operation', () => {
    it('should calculate absolute value of positive number (Test 4.1)', () => {
      const result = executeOperation('abs', 5);
      expect(result.result).toBe(5);
      expect(result.operation).toBe('abs');
    });

    it('should calculate absolute value of negative number (Test 4.2)', () => {
      const result = executeOperation('abs', -5);
      expect(result.result).toBe(5);
    });

    it('should calculate absolute value of zero (Test 4.3)', () => {
      const result = executeOperation('abs', 0);
      expect(result.result).toBe(0);
    });

    it('should calculate absolute value of decimal (Test 4.4)', () => {
      const result = executeOperation('abs', -3.14);
      expect(result.result).toBe(3.14);
    });
  });

  // Test Suite 5: Rounding Operations
  describe('ceil operation', () => {
    it('should calculate ceiling of positive decimal (Test 5.1)', () => {
      const result = executeOperation('ceil', 4.3);
      expect(result.result).toBe(5);
      expect(result.operation).toBe('ceil');
    });

    it('should calculate ceiling of negative decimal (Test 5.2)', () => {
      const result = executeOperation('ceil', -4.3);
      expect(result.result).toBe(-4);
    });

    it('should calculate ceiling of integer (Test 5.3)', () => {
      const result = executeOperation('ceil', 5);
      expect(result.result).toBe(5);
    });
  });

  describe('floor operation', () => {
    it('should calculate floor of positive decimal (Test 5.4)', () => {
      const result = executeOperation('floor', 4.7);
      expect(result.result).toBe(4);
      expect(result.operation).toBe('floor');
    });

    it('should calculate floor of negative decimal (Test 5.5)', () => {
      const result = executeOperation('floor', -4.7);
      expect(result.result).toBe(-5);
    });

    it('should calculate floor of integer (Test 5.6)', () => {
      const result = executeOperation('floor', 5);
      expect(result.result).toBe(5);
    });
  });

  describe('round operation', () => {
    it('should round up (Test 5.7)', () => {
      const result = executeOperation('round', 4.7);
      expect(result.result).toBe(5);
      expect(result.operation).toBe('round');
    });

    it('should round down (Test 5.8)', () => {
      const result = executeOperation('round', 4.3);
      expect(result.result).toBe(4);
    });

    it('should round half up (Test 5.9)', () => {
      const result = executeOperation('round', 4.5);
      expect(result.result).toBe(5);
    });

    it('should round half down for negative (Test 5.10)', () => {
      const result = executeOperation('round', -4.5);
      expect(result.result).toBe(-4); // JavaScript's Math.round behavior
    });
  });

  // Test Suite 6: Edge Cases and Error Handling
  describe('unary operations edge cases', () => {
    it('should handle very small positive number (Test 6.3)', () => {
      const result = executeOperation('sqrt', 0.0001);
      expect(result.result).toBe(0.01);
    });

    it('should handle very large number with log (Test 6.4)', () => {
      const result = executeOperation('log', 1e10);
      expect(result.result).toBeCloseTo(23.02585092994046, 10);
    });

    it('should throw error for missing argument', () => {
      expect(() => executeOperation('sqrt')).toThrow();
    });

    it('should throw error for too many arguments on unary operation', () => {
      expect(() => executeOperation('sqrt', 4, 9)).toThrow();
    });
  });

  // ============================================================================
  // Spec 003: Statistical Operations
  // ============================================================================

  // Test Suite 1: Mean Operation
  describe('mean operation', () => {
    it('should calculate mean with two numbers (Test 1.1)', () => {
      const result = executeOperation('mean', 2, 4);
      expect(result.result).toBe(3);
      expect(result.operation).toBe('mean');
    });

    it('should calculate mean with three numbers (Test 1.2)', () => {
      const result = executeOperation('mean', 2, 4, 6);
      expect(result.result).toBe(4);
    });

    it('should calculate mean with multiple numbers (Test 1.3)', () => {
      const result = executeOperation('mean', 1, 2, 3, 4, 5);
      expect(result.result).toBe(3);
    });

    it('should calculate mean with decimal numbers (Test 1.4)', () => {
      const result = executeOperation('mean', 1.5, 2.5, 3.5);
      expect(result.result).toBe(2.5);
    });

    it('should calculate mean with negative numbers (Test 1.5)', () => {
      const result = executeOperation('mean', -2, 0, 2);
      expect(result.result).toBe(0);
    });

    it('should throw error with single number (Test 1.6)', () => {
      expect(() => executeOperation('mean', 5)).toThrow('At least 2 numbers are required');
    });

    it('should calculate mean with all same numbers (Test 1.7)', () => {
      const result = executeOperation('mean', 5, 5, 5, 5);
      expect(result.result).toBe(5);
    });
  });

  // Test Suite 2: Median Operation
  describe('median operation', () => {
    it('should calculate median with odd number of values (Test 2.1)', () => {
      const result = executeOperation('median', 1, 3, 5);
      expect(result.result).toBe(3);
      expect(result.operation).toBe('median');
    });

    it('should calculate median with even number of values (Test 2.2)', () => {
      const result = executeOperation('median', 1, 2, 3, 4);
      expect(result.result).toBe(2.5);
    });

    it('should calculate median with unsorted values (Test 2.3)', () => {
      const result = executeOperation('median', 5, 2, 8, 1, 9);
      expect(result.result).toBe(5);
    });

    it('should calculate median with two numbers (Test 2.4)', () => {
      const result = executeOperation('median', 3, 7);
      expect(result.result).toBe(5);
    });

    it('should calculate median with decimal numbers (Test 2.5)', () => {
      const result = executeOperation('median', 1.5, 2.5, 3.5, 4.5);
      expect(result.result).toBe(3);
    });

    it('should calculate median with negative numbers (Test 2.6)', () => {
      const result = executeOperation('median', -5, -1, -3);
      expect(result.result).toBe(-3);
    });

    it('should calculate median with duplicate values (Test 2.7)', () => {
      const result = executeOperation('median', 2, 2, 5, 5, 8);
      expect(result.result).toBe(5);
    });

    it('should throw error with single number (Test 2.8)', () => {
      expect(() => executeOperation('median', 5)).toThrow('At least 2 numbers are required');
    });
  });

  // Test Suite 3: Mode Operation
  describe('mode operation', () => {
    it('should find single mode (Test 3.1)', () => {
      const result = executeOperation('mode', 1, 2, 2, 3);
      expect(result.result).toBe(2);
      expect(result.operation).toBe('mode');
    });

    it('should find multiple modes (Test 3.2)', () => {
      const result = executeOperation('mode', 1, 1, 2, 2, 3);
      expect(result.modes).toBeDefined();
      expect(result.modes).toContain(1);
      expect(result.modes).toContain(2);
      expect(result.modes?.length).toBe(2);
    });

    it('should find mode when all values are same (Test 3.3)', () => {
      const result = executeOperation('mode', 5, 5, 5);
      expect(result.result).toBe(5);
    });

    it('should handle no mode - all unique values (Test 3.4)', () => {
      const result = executeOperation('mode', 1, 2, 3, 4, 5);
      // When all values are unique, all should be returned as modes
      expect(result.modes).toBeDefined();
      expect(result.modes?.length).toBe(5);
      expect(result.modes).toContain(1);
      expect(result.modes).toContain(2);
      expect(result.modes).toContain(3);
      expect(result.modes).toContain(4);
      expect(result.modes).toContain(5);
    });

    it('should find mode with decimal numbers (Test 3.5)', () => {
      const result = executeOperation('mode', 1.5, 1.5, 2.5, 3.5);
      expect(result.result).toBe(1.5);
    });

    it('should find three modes (Test 3.6)', () => {
      const result = executeOperation('mode', 1, 1, 2, 2, 3, 3, 4);
      expect(result.modes).toBeDefined();
      expect(result.modes).toContain(1);
      expect(result.modes).toContain(2);
      expect(result.modes).toContain(3);
      expect(result.modes?.length).toBe(3);
    });

    it('should throw error with single number (Test 3.7)', () => {
      expect(() => executeOperation('mode', 5)).toThrow('At least 2 numbers are required');
    });
  });

  // Test Suite 4: Standard Deviation Operation
  describe('stddev operation', () => {
    it('should calculate standard deviation with two numbers (Test 4.1)', () => {
      const result = executeOperation('stddev', 2, 4);
      expect(result.result).toBe(1);
      expect(result.operation).toBe('stddev');
    });

    it('should calculate standard deviation with three numbers (Test 4.2)', () => {
      const result = executeOperation('stddev', 2, 4, 6);
      expect(result.result).toBeCloseTo(1.632993161855452, 10);
    });

    it('should calculate standard deviation with same numbers (Test 4.3)', () => {
      const result = executeOperation('stddev', 5, 5, 5);
      expect(result.result).toBe(0);
    });

    it('should calculate standard deviation with multiple numbers (Test 4.4)', () => {
      const result = executeOperation('stddev', 1, 2, 3, 4, 5);
      expect(result.result).toBeCloseTo(1.4142135623730951, 10);
    });

    it('should calculate standard deviation with decimal numbers (Test 4.5)', () => {
      const result = executeOperation('stddev', 1.5, 2.5, 3.5);
      expect(result.result).toBeCloseTo(0.816496580927726, 10);
    });

    it('should calculate standard deviation with negative numbers (Test 4.6)', () => {
      const result = executeOperation('stddev', -2, 0, 2);
      expect(result.result).toBeCloseTo(1.632993161855452, 10);
    });

    it('should throw error with single number (Test 4.7)', () => {
      expect(() => executeOperation('stddev', 5)).toThrow('At least 2 numbers are required');
    });
  });

  // Test Suite 5: Variance Operation
  describe('variance operation', () => {
    it('should calculate variance with two numbers (Test 5.1)', () => {
      const result = executeOperation('variance', 2, 4);
      expect(result.result).toBe(1);
      expect(result.operation).toBe('variance');
    });

    it('should calculate variance with three numbers (Test 5.2)', () => {
      const result = executeOperation('variance', 2, 4, 6);
      expect(result.result).toBeCloseTo(2.6666666666666665, 10);
    });

    it('should calculate variance with same numbers (Test 5.3)', () => {
      const result = executeOperation('variance', 5, 5, 5);
      expect(result.result).toBe(0);
    });

    it('should calculate variance - relationship to stddev (Test 5.4)', () => {
      const result = executeOperation('variance', 1, 2, 3, 4, 5);
      expect(result.result).toBe(2);
    });

    it('should calculate variance with decimal numbers (Test 5.5)', () => {
      const result = executeOperation('variance', 1.5, 2.5, 3.5);
      expect(result.result).toBeCloseTo(0.6666666666666666, 10);
    });

    it('should throw error with single number (Test 5.6)', () => {
      expect(() => executeOperation('variance', 5)).toThrow('At least 2 numbers are required');
    });
  });

  // Test Suite 6: Range Operation
  describe('range operation', () => {
    it('should calculate basic range (Test 6.1)', () => {
      const result = executeOperation('range', 1, 5, 3);
      expect(result.result).toBe(4);
      expect(result.operation).toBe('range');
    });

    it('should calculate range with multiple numbers (Test 6.2)', () => {
      const result = executeOperation('range', 10, 20, 15, 25);
      expect(result.result).toBe(15);
    });

    it('should calculate range with same numbers (Test 6.3)', () => {
      const result = executeOperation('range', 5, 5, 5);
      expect(result.result).toBe(0);
    });

    it('should calculate range with negative numbers (Test 6.4)', () => {
      const result = executeOperation('range', -5, -1, -3);
      expect(result.result).toBe(4);
    });

    it('should calculate range with mixed positive and negative (Test 6.5)', () => {
      const result = executeOperation('range', -5, 0, 5);
      expect(result.result).toBe(10);
    });

    it('should calculate range with decimal numbers (Test 6.6)', () => {
      const result = executeOperation('range', 1.5, 2.5, 3.5);
      expect(result.result).toBe(2);
    });

    it('should throw error with single number (Test 6.7)', () => {
      expect(() => executeOperation('range', 5)).toThrow('At least 2 numbers are required');
    });
  });

  // Test Suite 7: Integration and Edge Cases
  describe('statistical operations integration and edge cases', () => {
    it('should handle large dataset (Test 7.1)', () => {
      const result = executeOperation('mean', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
      expect(result.result).toBe(5.5);
    });

    it('should handle very small numbers (Test 7.2)', () => {
      const result = executeOperation('mean', 0.001, 0.002, 0.003);
      expect(result.result).toBe(0.002);
    });

    it('should handle very large numbers (Test 7.3)', () => {
      const result = executeOperation('mean', 1000000, 2000000, 3000000);
      expect(result.result).toBe(2000000);
    });

    it('should handle invalid number format (Test 7.4)', () => {
      // This is tested at the parseNumbersArray level, but we can verify error handling
      expect(() => parseNumbersArray(['5', 'abc', '3'], 2)).toThrow();
    });

    it('should handle empty arguments (Test 7.5)', () => {
      expect(() => parseNumbersArray([], 2)).toThrow('At least 2 numbers are required');
    });
  });
});

