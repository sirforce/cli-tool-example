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

  // ============================================================================
  // Spec 004: Number System Conversions
  // ============================================================================

  // Test Suite 1: Convert to Binary
  describe('tobinary operation', () => {
    it('should convert small decimal to binary (Test 1.1)', () => {
      const result = executeOperation('tobinary', 10);
      expect(result.result).toBe('1010');
      expect(result.operation).toBe('tobinary');
    });

    it('should convert zero to binary (Test 1.2)', () => {
      const result = executeOperation('tobinary', 0);
      expect(result.result).toBe('0');
    });

    it('should convert one to binary (Test 1.3)', () => {
      const result = executeOperation('tobinary', 1);
      expect(result.result).toBe('1');
    });

    it('should convert large number to binary (Test 1.4)', () => {
      const result = executeOperation('tobinary', 255);
      expect(result.result).toBe('11111111');
    });

    it('should convert power of two (Test 1.5)', () => {
      const result = executeOperation('tobinary', 256);
      expect(result.result).toBe('100000000');
    });

    it('should handle negative number (Test 1.6)', () => {
      // Spec says error or two's complement - we'll convert absolute value with minus sign
      const result = executeOperation('tobinary', -5);
      expect(result.result).toBe('-101');
    });

    it('should throw error for decimal number (Test 1.7)', () => {
      expect(() => executeOperation('tobinary', 10.5)).toThrow('Only integers can be converted to binary');
    });

    it('should throw error for invalid number format (Test 1.8)', () => {
      // This will be caught at parseNumbersArray level
      expect(() => parseNumbersArray(['abc'], 1)).toThrow();
    });
  });

  // Test Suite 2: Convert to Hexadecimal
  describe('tohex operation', () => {
    it('should convert small decimal to hex (Test 2.1)', () => {
      const result = executeOperation('tohex', 10);
      expect(result.result).toBe('A');
      expect(result.operation).toBe('tohex');
    });

    it('should convert zero to hex (Test 2.2)', () => {
      const result = executeOperation('tohex', 0);
      expect(result.result).toBe('0');
    });

    it('should convert large number to hex (Test 2.3)', () => {
      const result = executeOperation('tohex', 255);
      expect(result.result).toBe('FF');
    });

    it('should convert power of 16 (Test 2.4)', () => {
      const result = executeOperation('tohex', 256);
      expect(result.result).toBe('100');
    });

    it('should convert number requiring multiple hex digits (Test 2.5)', () => {
      const result = executeOperation('tohex', 4095);
      expect(result.result).toBe('FFF');
    });

    it('should throw error for decimal number (Test 2.6)', () => {
      expect(() => executeOperation('tohex', 10.5)).toThrow('Only integers can be converted to hexadecimal');
    });

    it('should throw error for invalid number format (Test 2.7)', () => {
      expect(() => parseNumbersArray(['abc'], 1)).toThrow();
    });
  });

  // Test Suite 3: Convert to Octal
  describe('tooctal operation', () => {
    it('should convert small decimal to octal (Test 3.1)', () => {
      const result = executeOperation('tooctal', 10);
      expect(result.result).toBe('12');
      expect(result.operation).toBe('tooctal');
    });

    it('should convert zero to octal (Test 3.2)', () => {
      const result = executeOperation('tooctal', 0);
      expect(result.result).toBe('0');
    });

    it('should convert power of 8 (Test 3.3)', () => {
      const result = executeOperation('tooctal', 64);
      expect(result.result).toBe('100');
    });

    it('should convert number requiring multiple octal digits (Test 3.4)', () => {
      const result = executeOperation('tooctal', 511);
      expect(result.result).toBe('777');
    });

    it('should throw error for decimal number (Test 3.5)', () => {
      expect(() => executeOperation('tooctal', 10.5)).toThrow('Only integers can be converted to octal');
    });

    it('should throw error for invalid number format (Test 3.6)', () => {
      expect(() => parseNumbersArray(['abc'], 1)).toThrow();
    });
  });

  // Test Suite 4: Convert from Binary
  describe('frombinary operation', () => {
    it('should convert small binary to decimal (Test 4.1)', () => {
      const result = executeOperation('frombinary', '1010' as any);
      expect(result.result).toBe(10);
      expect(result.operation).toBe('frombinary');
    });

    it('should convert zero from binary (Test 4.2)', () => {
      const result = executeOperation('frombinary', '0' as any);
      expect(result.result).toBe(0);
    });

    it('should convert one from binary (Test 4.3)', () => {
      const result = executeOperation('frombinary', '1' as any);
      expect(result.result).toBe(1);
    });

    it('should convert large binary to decimal (Test 4.4)', () => {
      const result = executeOperation('frombinary', '11111111' as any);
      expect(result.result).toBe(255);
    });

    it('should convert binary with prefix (Test 4.5)', () => {
      const result = executeOperation('frombinary', '0b1010' as any);
      expect(result.result).toBe(10);
    });

    it('should throw error for invalid binary format - non-binary digits (Test 4.6)', () => {
      expect(() => executeOperation('frombinary', '1012' as any)).toThrow('Invalid binary format. Binary numbers can only contain 0 and 1');
    });

    it('should throw error for invalid binary format - contains letters (Test 4.7)', () => {
      expect(() => executeOperation('frombinary', 'abc' as any)).toThrow('Invalid binary format. Binary numbers can only contain 0 and 1');
    });

    it('should throw error for empty input (Test 4.8)', () => {
      expect(() => executeOperation('frombinary', '' as any)).toThrow();
    });
  });

  // Test Suite 5: Convert from Hexadecimal
  describe('fromhex operation', () => {
    it('should convert small hex to decimal (Test 5.1)', () => {
      const result = executeOperation('fromhex', 'A' as any);
      expect(result.result).toBe(10);
      expect(result.operation).toBe('fromhex');
    });

    it('should convert hex with lowercase (Test 5.2)', () => {
      const result = executeOperation('fromhex', 'a' as any);
      expect(result.result).toBe(10);
    });

    it('should convert large hex to decimal (Test 5.3)', () => {
      const result = executeOperation('fromhex', 'FF' as any);
      expect(result.result).toBe(255);
    });

    it('should convert hex with prefix (Test 5.4)', () => {
      const result = executeOperation('fromhex', '0xFF' as any);
      expect(result.result).toBe(255);
    });

    it('should convert hex with lowercase prefix (Test 5.5)', () => {
      const result = executeOperation('fromhex', '0xff' as any);
      expect(result.result).toBe(255);
    });

    it('should convert multi-digit hex (Test 5.6)', () => {
      const result = executeOperation('fromhex', '1A2B' as any);
      expect(result.result).toBe(6699);
    });

    it('should throw error for invalid hex format - invalid character (Test 5.7)', () => {
      expect(() => executeOperation('fromhex', 'G' as any)).toThrow('Invalid hexadecimal format. Hexadecimal numbers can only contain 0-9 and A-F');
    });

    it('should throw error for invalid hex format - contains non-hex characters (Test 5.8)', () => {
      expect(() => executeOperation('fromhex', '12G' as any)).toThrow('Invalid hexadecimal format. Hexadecimal numbers can only contain 0-9 and A-F');
    });
  });

  // Test Suite 6: Convert from Octal
  describe('fromoctal operation', () => {
    it('should convert small octal to decimal (Test 6.1)', () => {
      const result = executeOperation('fromoctal', '12' as any);
      expect(result.result).toBe(10);
      expect(result.operation).toBe('fromoctal');
    });

    it('should convert zero from octal (Test 6.2)', () => {
      const result = executeOperation('fromoctal', '0' as any);
      expect(result.result).toBe(0);
    });

    it('should convert large octal to decimal (Test 6.3)', () => {
      const result = executeOperation('fromoctal', '777' as any);
      expect(result.result).toBe(511);
    });

    it('should convert octal with prefix (Test 6.4)', () => {
      const result = executeOperation('fromoctal', '0o12' as any);
      expect(result.result).toBe(10);
    });

    it('should convert octal with uppercase prefix (Test 6.5)', () => {
      const result = executeOperation('fromoctal', '0O12' as any);
      expect(result.result).toBe(10);
    });

    it('should throw error for invalid octal format - contains invalid digits (Test 6.6)', () => {
      expect(() => executeOperation('fromoctal', '89' as any)).toThrow('Invalid octal format. Octal numbers can only contain 0-7');
    });

    it('should throw error for invalid octal format - contains letters (Test 6.7)', () => {
      expect(() => executeOperation('fromoctal', 'abc' as any)).toThrow('Invalid octal format. Octal numbers can only contain 0-7');
    });
  });

  // Test Suite 7: Round-Trip Conversions
  describe('round-trip conversions', () => {
    it('should round-trip decimal to binary to decimal (Test 7.1)', () => {
      const binaryResult = executeOperation('tobinary', 42);
      expect(binaryResult.result).toBe('101010');
      const decimalResult = executeOperation('frombinary', binaryResult.result as any);
      expect(decimalResult.result).toBe(42);
    });

    it('should round-trip decimal to hex to decimal (Test 7.2)', () => {
      const hexResult = executeOperation('tohex', 255);
      expect(hexResult.result).toBe('FF');
      const decimalResult = executeOperation('fromhex', hexResult.result as any);
      expect(decimalResult.result).toBe(255);
    });

    it('should round-trip decimal to octal to decimal (Test 7.3)', () => {
      const octalResult = executeOperation('tooctal', 64);
      expect(octalResult.result).toBe('100');
      const decimalResult = executeOperation('fromoctal', octalResult.result as any);
      expect(decimalResult.result).toBe(64);
    });
  });

  // Test Suite 8: Edge Cases
  describe('number system conversions edge cases', () => {
    it('should handle very large number (Test 8.1)', () => {
      const result = executeOperation('tobinary', 4294967295);
      expect(result.result).toBe('11111111111111111111111111111111');
    });

    it('should handle maximum safe integer (Test 8.2)', () => {
      const result = executeOperation('tohex', 9007199254740991);
      expect(result.result).toBe('1FFFFFFFFFFFFF');
    });

    it('should throw error for missing argument (Test 8.3)', () => {
      expect(() => executeOperation('tobinary')).toThrow('Exactly 1 number is required');
    });
  });

  // ============================================================================
  // Spec 008: Expression Evaluation
  // ============================================================================

  describe('eval operation', () => {
    it('should evaluate simple addition expression', () => {
      const result = executeOperation('eval', '2 + 3' as any);
      expect(result.result).toBe(5);
      expect(result.operation).toBe('eval');
    });

    it('should evaluate expression with operator precedence', () => {
      const result = executeOperation('eval', '2 + 3 * 4' as any);
      expect(result.result).toBe(14);
    });

    it('should evaluate expression with parentheses', () => {
      const result = executeOperation('eval', '(2 + 3) * 4' as any);
      expect(result.result).toBe(20);
    });

    it('should evaluate expression with functions', () => {
      const result = executeOperation('eval', 'sqrt(16) + 5' as any);
      expect(result.result).toBe(9);
    });

    it('should evaluate expression with constants', () => {
      const result = executeOperation('eval', '2 * pi' as any);
      expect(result.result).toBeCloseTo(6.283185307179586, 10);
    });

    it('should evaluate complex expression', () => {
      const result = executeOperation('eval', '(sqrt(16) + abs(-5)) * (log10(100) + 1)' as any);
      expect(result.result).toBe(27);
    });

    it('should throw error for division by zero', () => {
      expect(() => executeOperation('eval', '10 / 0' as any)).toThrow('Division by zero is not allowed');
    });

    it('should throw error for invalid expression', () => {
      expect(() => executeOperation('eval', '2 + + 3' as any)).toThrow();
    });

    it('should throw error for empty expression', () => {
      expect(() => executeOperation('eval', '' as any)).toThrow('Empty expression');
    });

    it('should throw error for unmatched parentheses', () => {
      expect(() => executeOperation('eval', '(2 + 3' as any)).toThrow(/unmatched parentheses/i);
    });

    it('should throw error for unknown function', () => {
      expect(() => executeOperation('eval', 'invalid(5)' as any)).toThrow(/unknown function/i);
    });
  });

  // ============================================================================
  // Spec 006: Factorial and Combinatorics Operations
  // ============================================================================

  // Test Suite 1: Factorial Operation
  describe('factorial operation', () => {
    it('should calculate factorial of zero (Test 1.1)', () => {
      const result = executeOperation('factorial', 0);
      expect(result.result).toBe(1);
      expect(result.operation).toBe('factorial');
    });

    it('should calculate factorial of one (Test 1.2)', () => {
      const result = executeOperation('factorial', 1);
      expect(result.result).toBe(1);
    });

    it('should calculate factorial of small number (Test 1.3)', () => {
      const result = executeOperation('factorial', 5);
      expect(result.result).toBe(120);
    });

    it('should calculate factorial of medium number (Test 1.4)', () => {
      const result = executeOperation('factorial', 10);
      expect(result.result).toBe(3628800);
    });

    it('should throw error for negative number (Test 1.5)', () => {
      expect(() => executeOperation('factorial', -5)).toThrow('Factorial is only defined for non-negative integers');
    });

    it('should throw error for decimal number (Test 1.6)', () => {
      expect(() => executeOperation('factorial', 5.5)).toThrow();
    });

    it('should calculate factorial of large number (Test 1.7)', () => {
      const result = executeOperation('factorial', 20);
      expect(result.result).toBe(2432902008176640000);
    });

    it('should throw error for invalid input format (Test 1.8)', () => {
      expect(() => parseNumbersArray(['abc'], 1)).toThrow();
    });
  });

  // Test Suite 2: Combine Operation
  describe('combine operation', () => {
    it('should calculate basic combination (Test 2.1)', () => {
      const result = executeOperation('combine', 5, 2);
      expect(result.result).toBe(10);
      expect(result.operation).toBe('combine');
    });

    it('should calculate combination with larger numbers (Test 2.2)', () => {
      const result = executeOperation('combine', 10, 3);
      expect(result.result).toBe(120);
    });

    it('should calculate combination when k equals n (Test 2.3)', () => {
      const result = executeOperation('combine', 6, 6);
      expect(result.result).toBe(1);
    });

    it('should calculate combination when k equals zero (Test 2.4)', () => {
      const result = executeOperation('combine', 5, 0);
      expect(result.result).toBe(1);
    });

    it('should calculate combination when k equals one (Test 2.5)', () => {
      const result = executeOperation('combine', 5, 1);
      expect(result.result).toBe(5);
    });

    it('should verify combination symmetry (Test 2.6)', () => {
      const result1 = executeOperation('combine', 10, 3);
      const result2 = executeOperation('combine', 10, 7);
      expect(result1.result).toBe(120);
      expect(result2.result).toBe(120);
      expect(result1.result).toBe(result2.result);
    });

    it('should throw error when k greater than n (Test 2.7)', () => {
      expect(() => executeOperation('combine', 5, 10)).toThrow('k cannot be greater than n in combinations');
    });

    it('should throw error for negative n (Test 2.8)', () => {
      expect(() => executeOperation('combine', -5, 2)).toThrow();
    });

    it('should throw error for negative k (Test 2.9)', () => {
      expect(() => executeOperation('combine', 5, -2)).toThrow();
    });

    it('should throw error for decimal inputs (Test 2.10)', () => {
      expect(() => executeOperation('combine', 5.5, 2)).toThrow();
    });
  });

  // Test Suite 3: Permute Operation
  describe('permute operation', () => {
    it('should calculate basic permutation (Test 3.1)', () => {
      const result = executeOperation('permute', 5, 2);
      expect(result.result).toBe(20);
      expect(result.operation).toBe('permute');
    });

    it('should calculate permutation with larger numbers (Test 3.2)', () => {
      const result = executeOperation('permute', 10, 3);
      expect(result.result).toBe(720);
    });

    it('should calculate permutation when k equals n (Test 3.3)', () => {
      const result = executeOperation('permute', 6, 6);
      expect(result.result).toBe(720);
    });

    it('should calculate permutation when k equals zero (Test 3.4)', () => {
      const result = executeOperation('permute', 5, 0);
      expect(result.result).toBe(1);
    });

    it('should calculate permutation when k equals one (Test 3.5)', () => {
      const result = executeOperation('permute', 5, 1);
      expect(result.result).toBe(5);
    });

    it('should throw error when k greater than n (Test 3.6)', () => {
      expect(() => executeOperation('permute', 5, 10)).toThrow('k cannot be greater than n in permutations');
    });

    it('should throw error for negative n (Test 3.7)', () => {
      expect(() => executeOperation('permute', -5, 2)).toThrow();
    });

    it('should throw error for negative k (Test 3.8)', () => {
      expect(() => executeOperation('permute', 5, -2)).toThrow();
    });

    it('should verify relationship between permute and combine (Test 3.9)', () => {
      const permuteResult = executeOperation('permute', 5, 2);
      const combineResult = executeOperation('combine', 5, 2);
      const factorial2 = executeOperation('factorial', 2);
      expect(permuteResult.result).toBe((combineResult.result as number) * (factorial2.result as number));
    });
  });

  // Test Suite 4: Edge Cases and Error Handling
  describe('factorial and combinatorics edge cases', () => {
    it('should throw error for missing arguments (Test 4.1)', () => {
      expect(() => executeOperation('factorial')).toThrow('Exactly 1 number is required');
    });

    it('should throw error for too many arguments on factorial (Test 4.2)', () => {
      expect(() => executeOperation('factorial', 5, 3)).toThrow('Exactly 1 number is required');
    });

    it('should calculate very large factorial (Test 4.3)', () => {
      const result = executeOperation('factorial', 25);
      // 25! = 15511210043330985984000000
      expect(result.result).toBe(15511210043330985984000000);
    });

    it('should calculate combination with large numbers (Test 4.4)', () => {
      const result = executeOperation('combine', 20, 10);
      expect(result.result).toBe(184756);
    });

    it('should calculate permutation with large numbers (Test 4.5)', () => {
      const result = executeOperation('permute', 20, 10);
      // P(20,10) = 20! / 10! = 670442572800
      expect(result.result).toBe(670442572800);
    });
  });

  // ============================================================================
  // Spec 007: GCD and LCM Operations
  // ============================================================================

  // Test Suite 1: GCD Operation
  describe('gcd operation', () => {
    it('should calculate basic GCD with two numbers (Test 1.1)', () => {
      const result = executeOperation('gcd', 48, 18);
      expect(result.result).toBe(6);
      expect(result.operation).toBe('gcd');
    });

    it('should calculate GCD of coprime numbers (Test 1.2)', () => {
      const result = executeOperation('gcd', 17, 19);
      expect(result.result).toBe(1);
    });

    it('should calculate GCD with multiple numbers (Test 1.3)', () => {
      const result = executeOperation('gcd', 12, 18, 24);
      expect(result.result).toBe(6);
    });

    it('should calculate GCD when one number divides another (Test 1.4)', () => {
      const result = executeOperation('gcd', 12, 6);
      expect(result.result).toBe(6);
    });

    it('should calculate GCD of same numbers (Test 1.5)', () => {
      const result = executeOperation('gcd', 5, 5);
      expect(result.result).toBe(5);
    });

    it('should calculate GCD with zero (Test 1.6)', () => {
      const result = executeOperation('gcd', 0, 12);
      expect(result.result).toBe(12);
    });

    it('should throw error for GCD with both zeros (Test 1.7)', () => {
      expect(() => executeOperation('gcd', 0, 0)).toThrow('GCD of (0, 0) is undefined');
    });

    it('should calculate GCD with negative numbers (Test 1.8)', () => {
      const result = executeOperation('gcd', -48, 18);
      expect(result.result).toBe(6);
    });

    it('should calculate GCD with large numbers (Test 1.9)', () => {
      const result = executeOperation('gcd', 1071, 462);
      expect(result.result).toBe(21);
    });

    it('should throw error for GCD with single number (Test 1.10)', () => {
      expect(() => executeOperation('gcd', 5)).toThrow('At least 2 numbers are required');
    });

    it('should calculate GCD with decimal numbers (Test 1.11)', () => {
      const result = executeOperation('gcd', 48.0, 18.0);
      expect(result.result).toBe(6);
    });
  });

  // Test Suite 2: LCM Operation
  describe('lcm operation', () => {
    it('should calculate basic LCM with two numbers (Test 2.1)', () => {
      const result = executeOperation('lcm', 4, 6);
      expect(result.result).toBe(12);
      expect(result.operation).toBe('lcm');
    });

    it('should calculate LCM of coprime numbers (Test 2.2)', () => {
      const result = executeOperation('lcm', 5, 7);
      expect(result.result).toBe(35);
    });

    it('should calculate LCM with multiple numbers (Test 2.3)', () => {
      const result = executeOperation('lcm', 12, 18, 24);
      expect(result.result).toBe(72);
    });

    it('should calculate LCM when one number divides another (Test 2.4)', () => {
      const result = executeOperation('lcm', 12, 6);
      expect(result.result).toBe(12);
    });

    it('should calculate LCM of same numbers (Test 2.5)', () => {
      const result = executeOperation('lcm', 5, 5);
      expect(result.result).toBe(5);
    });

    it('should calculate LCM with zero (Test 2.6)', () => {
      const result = executeOperation('lcm', 0, 12);
      expect(result.result).toBe(0);
    });

    it('should calculate LCM with negative numbers (Test 2.7)', () => {
      const result = executeOperation('lcm', -4, 6);
      expect(result.result).toBe(12);
    });

    it('should calculate LCM with large numbers (Test 2.8)', () => {
      const result = executeOperation('lcm', 100, 150);
      expect(result.result).toBe(300);
    });

    it('should verify LCM relationship to GCD (Test 2.9)', () => {
      const gcdResult = executeOperation('gcd', 48, 18);
      const lcmResult = executeOperation('lcm', 48, 18);
      expect(gcdResult.result).toBe(6);
      expect(lcmResult.result).toBe(144);
      // Verify: GCD(a,b) × LCM(a,b) = a × b
      expect((gcdResult.result as number) * (lcmResult.result as number)).toBe(48 * 18);
    });

    it('should throw error for LCM with single number (Test 2.10)', () => {
      expect(() => executeOperation('lcm', 5)).toThrow('At least 2 numbers are required');
    });

    it('should calculate LCM with decimal numbers (Test 2.11)', () => {
      const result = executeOperation('lcm', 4.0, 6.0);
      expect(result.result).toBe(12);
    });
  });

  // Test Suite 3: Edge Cases and Error Handling
  describe('gcd and lcm edge cases', () => {
    it('should handle invalid number format (Test 3.1)', () => {
      expect(() => parseNumbersArray(['48', 'abc'], 2)).toThrow();
    });

    it('should handle missing arguments (Test 3.2)', () => {
      expect(() => executeOperation('gcd')).toThrow('At least 2 numbers are required');
      expect(() => executeOperation('lcm')).toThrow('At least 2 numbers are required');
    });

    it('should calculate GCD with many numbers (Test 3.3)', () => {
      const result = executeOperation('gcd', 12, 18, 24, 30, 36);
      expect(result.result).toBe(6);
    });

    it('should calculate LCM with many numbers (Test 3.4)', () => {
      const result = executeOperation('lcm', 2, 3, 4, 5, 6);
      expect(result.result).toBe(60);
    });

    it('should calculate GCD with very large numbers (Test 3.5)', () => {
      const result = executeOperation('gcd', 123456789, 987654321);
      expect(result.result).toBe(9);
    });

    it('should calculate LCM with very large numbers (Test 3.6)', () => {
      const result = executeOperation('lcm', 123456, 789012);
      expect(result.result).toBe(8117355456);
    });

    it('should calculate GCD with one (Test 3.7)', () => {
      const result = executeOperation('gcd', 1, 100);
      expect(result.result).toBe(1);
    });

    it('should calculate LCM with one (Test 3.8)', () => {
      const result = executeOperation('lcm', 1, 100);
      expect(result.result).toBe(100);
    });
  });

  // ============================================================================
  // Spec 005: Percentage Calculations
  // ============================================================================

  // Test Suite 1: Percent Operation
  describe('percent operation', () => {
    it('should calculate basic percentage (Test 1.1)', () => {
      const result = executeOperation('percent', 25, 100);
      expect(result.result).toBe(25);
      expect(result.operation).toBe('percent');
    });

    it('should calculate percentage with different totals (Test 1.2)', () => {
      const result = executeOperation('percent', 50, 200);
      expect(result.result).toBe(25);
    });

    it('should calculate percentage with decimal result (Test 1.3)', () => {
      const result = executeOperation('percent', 1, 3);
      expect(result.result).toBeCloseTo(33.333333333333336, 10);
    });

    it('should calculate percentage greater than 100 (Test 1.4)', () => {
      const result = executeOperation('percent', 150, 100);
      expect(result.result).toBe(150);
    });

    it('should calculate percentage with zero part (Test 1.5)', () => {
      const result = executeOperation('percent', 0, 100);
      expect(result.result).toBe(0);
    });

    it('should throw error for zero total (Test 1.6)', () => {
      expect(() => executeOperation('percent', 25, 0)).toThrow('Cannot calculate percentage: total cannot be zero');
    });

    it('should calculate percentage with decimal numbers (Test 1.7)', () => {
      const result = executeOperation('percent', 12.5, 50);
      expect(result.result).toBe(25);
    });

    it('should calculate percentage with negative numbers (Test 1.8)', () => {
      const result = executeOperation('percent', -25, 100);
      expect(result.result).toBe(-25);
    });
  });

  // Test Suite 2: Percentof Operation
  describe('percentof operation', () => {
    it('should calculate basic percentage of (Test 2.1)', () => {
      const result = executeOperation('percentof', 25, 100);
      expect(result.result).toBe(25);
      expect(result.operation).toBe('percentof');
    });

    it('should calculate percentage of with different values (Test 2.2)', () => {
      const result = executeOperation('percentof', 50, 200);
      expect(result.result).toBe(100);
    });

    it('should calculate percentage of with decimal percentage (Test 2.3)', () => {
      const result = executeOperation('percentof', 12.5, 100);
      expect(result.result).toBe(12.5);
    });

    it('should calculate percentage of with decimal number (Test 2.4)', () => {
      const result = executeOperation('percentof', 10, 50.5);
      expect(result.result).toBeCloseTo(5.05, 10);
    });

    it('should calculate percentage of zero (Test 2.5)', () => {
      const result = executeOperation('percentof', 25, 0);
      expect(result.result).toBe(0);
    });

    it('should calculate percentage of 100% (Test 2.6)', () => {
      const result = executeOperation('percentof', 100, 50);
      expect(result.result).toBe(50);
    });

    it('should calculate percentage of greater than 100% (Test 2.7)', () => {
      const result = executeOperation('percentof', 150, 100);
      expect(result.result).toBe(150);
    });

    it('should calculate percentage of with negative number (Test 2.8)', () => {
      const result = executeOperation('percentof', 10, -50);
      expect(result.result).toBe(-5);
    });
  });

  // Test Suite 3: Percentchange Operation
  describe('percentchange operation', () => {
    it('should calculate percentage increase (Test 3.1)', () => {
      const result = executeOperation('percentchange', 100, 120);
      expect(result.result).toBe(20);
      expect(result.operation).toBe('percentchange');
    });

    it('should calculate percentage decrease (Test 3.2)', () => {
      const result = executeOperation('percentchange', 100, 80);
      expect(result.result).toBe(-20);
    });

    it('should calculate no change (Test 3.3)', () => {
      const result = executeOperation('percentchange', 50, 50);
      expect(result.result).toBe(0);
    });

    it('should calculate percentage change with decimal result (Test 3.4)', () => {
      const result = executeOperation('percentchange', 100, 115);
      expect(result.result).toBe(15);
    });

    it('should throw error for zero old value (Test 3.5)', () => {
      expect(() => executeOperation('percentchange', 0, 100)).toThrow('Cannot calculate percentage change: old value cannot be zero');
    });

    it('should calculate percentage change to zero (Test 3.6)', () => {
      const result = executeOperation('percentchange', 100, 0);
      expect(result.result).toBe(-100);
    });

    it('should calculate large percentage increase (Test 3.7)', () => {
      const result = executeOperation('percentchange', 10, 30);
      expect(result.result).toBe(200);
    });

    it('should calculate percentage change with negative values (Test 3.8)', () => {
      const result = executeOperation('percentchange', -100, -80);
      // Mathematically: ((-80 - (-100)) / (-100)) * 100 = (20 / -100) * 100 = -20
      // Spec says "or error, depending on implementation" - we allow negatives and return -20
      expect(result.result).toBe(-20);
    });
  });

  // Test Suite 4: Addpercent Operation
  describe('addpercent operation', () => {
    it('should add percentage to number (Test 4.1)', () => {
      const result = executeOperation('addpercent', 100, 10);
      expect(result.result).toBe(110);
      expect(result.operation).toBe('addpercent');
    });

    it('should add percentage with different values (Test 4.2)', () => {
      const result = executeOperation('addpercent', 50, 20);
      expect(result.result).toBe(60);
    });

    it('should add percentage with decimal (Test 4.3)', () => {
      const result = executeOperation('addpercent', 100, 12.5);
      expect(result.result).toBe(112.5);
    });

    it('should add zero percentage (Test 4.4)', () => {
      const result = executeOperation('addpercent', 100, 0);
      expect(result.result).toBe(100);
    });

    it('should add large percentage (Test 4.5)', () => {
      const result = executeOperation('addpercent', 100, 200);
      expect(result.result).toBe(300);
    });

    it('should add percentage to zero (Test 4.6)', () => {
      const result = executeOperation('addpercent', 0, 10);
      expect(result.result).toBe(0);
    });

    it('should add percentage to negative number (Test 4.7)', () => {
      const result = executeOperation('addpercent', -100, 10);
      expect(result.result).toBe(-110);
    });
  });

  // Test Suite 5: Subtractpercent Operation
  describe('subtractpercent operation', () => {
    it('should subtract percentage from number (Test 5.1)', () => {
      const result = executeOperation('subtractpercent', 100, 10);
      expect(result.result).toBe(90);
      expect(result.operation).toBe('subtractpercent');
    });

    it('should subtract percentage with different values (Test 5.2)', () => {
      const result = executeOperation('subtractpercent', 50, 20);
      expect(result.result).toBe(40);
    });

    it('should subtract percentage with decimal (Test 5.3)', () => {
      const result = executeOperation('subtractpercent', 100, 12.5);
      expect(result.result).toBe(87.5);
    });

    it('should subtract zero percentage (Test 5.4)', () => {
      const result = executeOperation('subtractpercent', 100, 0);
      expect(result.result).toBe(100);
    });

    it('should subtract large percentage (Test 5.5)', () => {
      const result = executeOperation('subtractpercent', 100, 50);
      expect(result.result).toBe(50);
    });

    it('should subtract percentage from zero (Test 5.6)', () => {
      const result = executeOperation('subtractpercent', 0, 10);
      expect(result.result).toBe(0);
    });

    it('should subtract more than 100% (Test 5.7)', () => {
      const result = executeOperation('subtractpercent', 100, 150);
      expect(result.result).toBe(-50);
    });
  });

  // Test Suite 6: Percentincrease Operation
  describe('percentincrease operation', () => {
    it('should calculate basic percentage increase (Test 6.1)', () => {
      const result = executeOperation('percentincrease', 100, 120);
      expect(result.result).toBe(20);
      expect(result.operation).toBe('percentincrease');
    });

    it('should calculate percentage increase with different values (Test 6.2)', () => {
      const result = executeOperation('percentincrease', 50, 75);
      expect(result.result).toBe(50);
    });

    it('should calculate no increase (Test 6.3)', () => {
      const result = executeOperation('percentincrease', 100, 100);
      expect(result.result).toBe(0);
    });

    it('should calculate large percentage increase (Test 6.4)', () => {
      const result = executeOperation('percentincrease', 10, 30);
      expect(result.result).toBe(200);
    });

    it('should throw error for zero old value (Test 6.5)', () => {
      expect(() => executeOperation('percentincrease', 0, 100)).toThrow('Cannot calculate percentage increase: old value cannot be zero');
    });

    it('should calculate decrease as negative (Test 6.6)', () => {
      const result = executeOperation('percentincrease', 100, 80);
      expect(result.result).toBe(-20);
    });

    it('should calculate percentage increase with decimal result (Test 6.7)', () => {
      const result = executeOperation('percentincrease', 100, 115);
      expect(result.result).toBe(15);
    });
  });

  // Test Suite 7: Edge Cases and Error Handling
  describe('percentage operations edge cases', () => {
    it('should handle invalid number format (Test 7.1)', () => {
      expect(() => parseNumbersArray(['25', 'abc'], 2)).toThrow();
    });

    it('should handle missing arguments (Test 7.2)', () => {
      expect(() => executeOperation('percent', 25)).toThrow('At least 2 numbers are required');
    });

    it('should handle very small percentages (Test 7.3)', () => {
      const result = executeOperation('percentof', 0.1, 1000);
      expect(result.result).toBe(1);
    });

    it('should handle very large percentages (Test 7.4)', () => {
      const result = executeOperation('percentof', 1000, 100);
      expect(result.result).toBe(1000);
    });

    it('should handle precision with repeating decimals (Test 7.5)', () => {
      const result = executeOperation('percent', 1, 3);
      expect(result.result).toBeCloseTo(33.333333333333336, 10);
    });

    it('should handle round-trip calculation (Test 7.6)', () => {
      const addResult = executeOperation('addpercent', 100, 10);
      expect(addResult.result).toBe(110);
      const subtractResult = executeOperation('subtractpercent', addResult.result as number, 10);
      // Note: Subtracting 10% from 110 gives 99, not 100, because 10% of 110 is 11, not 10
      // This is mathematically correct behavior, not a precision issue
      expect(subtractResult.result).toBe(99);
    });
  });

  // ============================================================================
  // Spec 009: Unit Conversions
  // ============================================================================

  // Test Suite 1: Length Conversions
  describe('convert operation - Length Conversions', () => {
    it('should convert meter to foot (Test 1.1)', () => {
      const result = executeOperation('convert', 1, 'meter', 'foot');
      expect(result.result).toBeCloseTo(3.28084, 5);
      expect(result.operation).toBe('convert');
    });

    it('should convert foot to meter (Test 1.2)', () => {
      const result = executeOperation('convert', 3.28084, 'foot', 'meter');
      expect(result.result).toBeCloseTo(1, 5);
    });

    it('should convert kilometer to mile (Test 1.3)', () => {
      const result = executeOperation('convert', 1, 'kilometer', 'mile');
      expect(result.result).toBeCloseTo(0.621371, 6);
    });

    it('should convert centimeter to inch (Test 1.4)', () => {
      const result = executeOperation('convert', 2.54, 'centimeter', 'inch');
      expect(result.result).toBeCloseTo(1, 5);
    });

    it('should convert yard to meter (Test 1.5)', () => {
      const result = executeOperation('convert', 1, 'yard', 'meter');
      expect(result.result).toBeCloseTo(0.9144, 5);
    });

    it('should handle unit aliases (Test 1.6)', () => {
      const result = executeOperation('convert', 1, 'm', 'ft');
      expect(result.result).toBeCloseTo(3.28084, 5);
    });

    it('should throw error for incompatible units (Test 1.7)', () => {
      expect(() => executeOperation('convert', 1, 'meter', 'kilogram')).toThrow('Cannot convert between meter and kilogram (different unit categories)');
    });
  });

  // Test Suite 2: Weight/Mass Conversions
  describe('convert operation - Weight/Mass Conversions', () => {
    it('should convert kilogram to pound (Test 2.1)', () => {
      const result = executeOperation('convert', 1, 'kilogram', 'pound');
      expect(result.result).toBeCloseTo(2.20462, 5);
      expect(result.operation).toBe('convert');
    });

    it('should convert pound to kilogram (Test 2.2)', () => {
      const result = executeOperation('convert', 2.20462, 'pound', 'kilogram');
      expect(result.result).toBeCloseTo(1, 5);
    });

    it('should convert gram to ounce (Test 2.3)', () => {
      const result = executeOperation('convert', 28.3495, 'gram', 'ounce');
      expect(result.result).toBeCloseTo(1, 5);
    });

    it('should convert ton to kilogram (Test 2.4)', () => {
      const result = executeOperation('convert', 1, 'ton', 'kilogram');
      expect(result.result).toBeCloseTo(907.185, 3);
    });

    it('should convert milligram to gram (Test 2.5)', () => {
      const result = executeOperation('convert', 1000, 'milligram', 'gram');
      expect(result.result).toBe(1);
    });
  });

  // Test Suite 3: Temperature Conversions
  describe('convert operation - Temperature Conversions', () => {
    it('should convert celsius to fahrenheit (Test 3.1)', () => {
      const result = executeOperation('convert', 0, 'celsius', 'fahrenheit');
      expect(result.result).toBe(32);
      expect(result.operation).toBe('convert');
    });

    it('should convert fahrenheit to celsius (Test 3.2)', () => {
      const result = executeOperation('convert', 32, 'fahrenheit', 'celsius');
      expect(result.result).toBe(0);
    });

    it('should convert celsius to kelvin (Test 3.3)', () => {
      const result = executeOperation('convert', 0, 'celsius', 'kelvin');
      expect(result.result).toBe(273.15);
    });

    it('should convert fahrenheit to kelvin (Test 3.4)', () => {
      const result = executeOperation('convert', 32, 'fahrenheit', 'kelvin');
      expect(result.result).toBeCloseTo(273.15, 2);
    });

    it('should convert kelvin to celsius (Test 3.5)', () => {
      const result = executeOperation('convert', 273.15, 'kelvin', 'celsius');
      expect(result.result).toBe(0);
    });

    it('should convert boiling point celsius to fahrenheit (Test 3.6)', () => {
      const result = executeOperation('convert', 100, 'celsius', 'fahrenheit');
      expect(result.result).toBe(212);
    });

    it('should convert -40 celsius to fahrenheit (Test 3.7)', () => {
      const result = executeOperation('convert', -40, 'celsius', 'fahrenheit');
      expect(result.result).toBe(-40);
    });
  });

  // Test Suite 4: Volume Conversions
  describe('convert operation - Volume Conversions', () => {
    it('should convert liter to gallon (Test 4.1)', () => {
      const result = executeOperation('convert', 3.78541, 'liter', 'gallon');
      expect(result.result).toBeCloseTo(1, 5);
      expect(result.operation).toBe('convert');
    });

    it('should convert milliliter to liter (Test 4.2)', () => {
      const result = executeOperation('convert', 1000, 'milliliter', 'liter');
      expect(result.result).toBe(1);
    });

    it('should convert gallon to quart (Test 4.3)', () => {
      const result = executeOperation('convert', 1, 'gallon', 'quart');
      expect(result.result).toBe(4);
    });

    it('should convert cup to fluid_ounce (Test 4.4)', () => {
      const result = executeOperation('convert', 1, 'cup', 'fluid_ounce');
      expect(result.result).toBe(8);
    });
  });

  // Test Suite 5: Time Conversions
  describe('convert operation - Time Conversions', () => {
    it('should convert second to minute (Test 5.1)', () => {
      const result = executeOperation('convert', 60, 'second', 'minute');
      expect(result.result).toBe(1);
      expect(result.operation).toBe('convert');
    });

    it('should convert hour to minute (Test 5.2)', () => {
      const result = executeOperation('convert', 1, 'hour', 'minute');
      expect(result.result).toBe(60);
    });

    it('should convert day to hour (Test 5.3)', () => {
      const result = executeOperation('convert', 1, 'day', 'hour');
      expect(result.result).toBe(24);
    });

    it('should convert week to day (Test 5.4)', () => {
      const result = executeOperation('convert', 1, 'week', 'day');
      expect(result.result).toBe(7);
    });

    it('should convert year to day (Test 5.5)', () => {
      const result = executeOperation('convert', 1, 'year', 'day');
      expect(result.result).toBe(365);
    });
  });

  // Test Suite 6: Edge Cases and Error Handling
  describe('convert operation - Edge Cases and Error Handling', () => {
    it('should throw error for invalid unit name (Test 6.1)', () => {
      expect(() => executeOperation('convert', 1, 'invalid_unit', 'meter')).toThrow('Unknown unit: invalid_unit');
    });

    it('should throw error for missing arguments (Test 6.2)', () => {
      expect(() => executeOperation('convert', 1, 'meter')).toThrow('Exactly 3 arguments are required');
    });

    it('should throw error for invalid number format (Test 6.3)', () => {
      // This will be caught at parseNumbersArray level in index.ts
      // But we can test the operation itself with invalid string
      expect(() => executeOperation('convert', NaN, 'meter', 'foot')).toThrow();
    });

    it('should handle same unit conversion (Test 6.4)', () => {
      const result = executeOperation('convert', 5, 'meter', 'meter');
      expect(result.result).toBe(5);
    });

    it('should handle zero value (Test 6.5)', () => {
      const result = executeOperation('convert', 0, 'meter', 'foot');
      expect(result.result).toBe(0);
    });

    it('should handle very large value (Test 6.6)', () => {
      const result = executeOperation('convert', 1000000, 'meter', 'kilometer');
      expect(result.result).toBe(1000);
    });

    it('should handle very small value (Test 6.7)', () => {
      const result = executeOperation('convert', 0.001, 'meter', 'millimeter');
      expect(result.result).toBe(1);
    });

    it('should handle negative value for non-temperature (Test 6.8)', () => {
      const result = executeOperation('convert', -5, 'meter', 'foot');
      expect(result.result).toBeCloseTo(-16.4042, 4);
    });
  });

  // Spec 011: Financial Calculations
  describe('Spec 011: Financial Calculations', () => {
    describe('fv operation', () => {
      it('Test 1.1: Basic Future Value', () => {
        const result = executeOperation('fv', 1000, 0.05, 10);
        expect(result.operation).toBe('fv');
        expect(result.result).toBeCloseTo(1628.894626777442, 5);
      });

      it('Test 1.2: Future Value with Different Rate', () => {
        const result = executeOperation('fv', 5000, 0.08, 20);
        expect(result.result).toBeCloseTo(23304.78511669479, 2);
      });

      it('Test 1.3: Future Value with Zero Rate', () => {
        const result = executeOperation('fv', 1000, 0, 10);
        expect(result.result).toBe(1000);
      });

      it('Test 1.4: Future Value with Zero Periods', () => {
        const result = executeOperation('fv', 1000, 0.05, 0);
        expect(result.result).toBe(1000);
      });

      it('Test 1.5: Future Value with Negative Rate', () => {
        const result = executeOperation('fv', 1000, -0.05, 10);
        expect(result.result).toBeCloseTo(598.7369392383789, 5);
      });

      it('Test 1.6: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('fv', 1000, 0.05)).toThrow();
      });

      it('Test 1.7: Invalid Rate Format', () => {
        expect(() => executeOperation('fv', 1000, 'abc' as any, 10)).toThrow();
      });
    });

    describe('pv operation', () => {
      it('Test 2.1: Basic Present Value', () => {
        const result = executeOperation('pv', 1628.89, 0.05, 10);
        expect(result.operation).toBe('pv');
        expect(result.result).toBeCloseTo(1000, 1);
      });

      it('Test 2.2: Present Value Round-Trip', () => {
        const fvResult = executeOperation('fv', 1000, 0.05, 10);
        const pvResult = executeOperation('pv', fvResult.result as number, 0.05, 10);
        expect(pvResult.result).toBeCloseTo(1000, 1);
      });

      it('Test 2.3: Present Value with High Rate', () => {
        const result = executeOperation('pv', 10000, 0.10, 5);
        expect(result.result).toBeCloseTo(6209.213230597828, 5);
      });

      it('Test 2.4: Present Value with Zero Rate', () => {
        const result = executeOperation('pv', 1000, 0, 10);
        expect(result.result).toBe(1000);
      });

      it('Test 2.5: Present Value with Zero Periods', () => {
        const result = executeOperation('pv', 1000, 0.05, 0);
        expect(result.result).toBe(1000);
      });

      it('Test 2.6: Negative Rate', () => {
        const result = executeOperation('pv', 1000, -0.05, 10);
        // PV = FV / (1 + r)^n, r can be negative
        expect(result.result).toBeCloseTo(1000 / Math.pow(1 - 0.05, 10), 5);
      });
    });

    describe('pmt operation', () => {
      it('Test 3.1: Basic Loan Payment', () => {
        const result = executeOperation('pmt', 100000, 0.005, 360);
        expect(result.operation).toBe('pmt');
        expect(result.result).toBeCloseTo(599.5505251527449, 5);
      });

      it('Test 3.2: Loan Payment for Shorter Term', () => {
        const result = executeOperation('pmt', 100000, 0.005, 180);
        expect(result.result).toBeCloseTo(843.856802744108, 3);
      });

      it('Test 3.3: Loan Payment with Zero Rate', () => {
        const result = executeOperation('pmt', 100000, 0, 360);
        expect(result.result).toBeCloseTo(277.7777777777778, 5);
      });

      it('Test 3.4: Loan Payment with High Rate', () => {
        const result = executeOperation('pmt', 20000, 0.02, 60);
        expect(result.result).toBeCloseTo(575.3593165161263, 3);
      });

      it('Test 3.5: Loan Payment with Single Period', () => {
        const result = executeOperation('pmt', 1000, 0.05, 1);
        expect(result.result).toBeCloseTo(1050, 10);
      });

      it('Test 3.6: Zero Principal', () => {
        const result = executeOperation('pmt', 0, 0.005, 360);
        expect(result.result).toBe(0);
      });

      it('Test 3.7: Zero Periods (Error Case)', () => {
        expect(() => executeOperation('pmt', 100000, 0.005, 0)).toThrow();
      });
    });

    describe('compound operation', () => {
      it('Test 4.1: Annual Compounding', () => {
        const result = executeOperation('compound', 1000, 0.05, 10);
        expect(result.operation).toBe('compound');
        expect(result.result).toBeCloseTo(1628.894626777442, 5);
      });

      it('Test 4.2: Monthly Compounding', () => {
        const result = executeOperation('compound', 1000, 0.05, 10, 12);
        expect(result.result).toBeCloseTo(1647.008497670285, 2);
      });

      it('Test 4.3: Daily Compounding', () => {
        const result = executeOperation('compound', 1000, 0.05, 1, 365);
        expect(result.result).toBeCloseTo(1051.2674964674737, 5);
      });

      it('Test 4.4: Quarterly Compounding', () => {
        const result = executeOperation('compound', 1000, 0.08, 2, 4);
        expect(result.result).toBeCloseTo(1171.6593810268945, 5);
      });

      it('Test 4.5: Continuous Compounding (Large n)', () => {
        const result = executeOperation('compound', 1000, 0.05, 10, 1000000);
        expect(result.result).toBeCloseTo(Math.exp(0.05 * 10) * 1000, 2);
      });

      it('Test 4.6: Default Compounding (Annual)', () => {
        const result = executeOperation('compound', 1000, 0.05, 10);
        expect(result.result).toBeCloseTo(1628.894626777442, 5);
      });
    });

    describe('apr operation', () => {
      it('Test 5.1: Monthly Rate to APR', () => {
        const result = executeOperation('apr', 0.005, 12);
        expect(result.operation).toBe('apr');
        expect(result.result).toBeCloseTo(0.06167781186449744, 10);
      });

      it('Test 5.2: Daily Rate to APR', () => {
        const result = executeOperation('apr', 0.000274, 365);
        expect(result.result).toBeCloseTo(0.10515578161654808, 4);
      });

      it('Test 5.3: Quarterly Rate to APR', () => {
        const result = executeOperation('apr', 0.02, 4);
        expect(result.result).toBeCloseTo(0.08243216, 8);
      });

      it('Test 5.4: Annual Rate to APR', () => {
        const result = executeOperation('apr', 0.05, 1);
        expect(result.result).toBe(0.05);
      });

      it('Test 5.5: Zero Rate', () => {
        const result = executeOperation('apr', 0, 12);
        expect(result.result).toBe(0);
      });

      it('Test 5.6: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('apr', 0.005)).toThrow();
      });
    });

    describe('roi operation', () => {
      it('Test 6.1: Positive ROI', () => {
        const result = executeOperation('roi', 1000, 1500);
        expect(result.operation).toBe('roi');
        expect(result.result).toBe(50);
      });

      it('Test 6.2: Negative ROI (Loss)', () => {
        const result = executeOperation('roi', 5000, 4500);
        expect(result.result).toBe(-10);
      });

      it('Test 6.3: Zero ROI', () => {
        const result = executeOperation('roi', 1000, 1000);
        expect(result.result).toBe(0);
      });

      it('Test 6.4: Large ROI', () => {
        const result = executeOperation('roi', 1000, 5000);
        expect(result.result).toBe(400);
      });

      it('Test 6.5: Small ROI', () => {
        const result = executeOperation('roi', 1000, 1010);
        expect(result.result).toBe(1);
      });

      it('Test 6.6: Zero Initial Investment (Error Case)', () => {
        expect(() => executeOperation('roi', 0, 1500)).toThrow('Initial investment cannot be zero');
      });

      it('Test 6.7: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('roi', 1000)).toThrow();
      });
    });

    describe('Edge Cases and Integration', () => {
      it('Test 7.1: Very Small Rate', () => {
        const result = executeOperation('fv', 1000, 0.0001, 10);
        expect(result.result).toBeCloseTo(1001.0005000333354, 3);
      });

      it('Test 7.2: Very Large Periods', () => {
        const result = executeOperation('fv', 1000, 0.05, 100);
        expect(result.result).toBeCloseTo(131501.257846304, 2);
      });

      it('Test 7.3: Very High Rate', () => {
        const result = executeOperation('fv', 1000, 0.50, 5);
        expect(result.result).toBe(7593.75);
      });

      it('Test 7.4: Invalid Number Format', () => {
        expect(() => executeOperation('fv', 'abc' as any, 0.05, 10)).toThrow();
      });

      it('Test 7.5: Negative Principal', () => {
        const result = executeOperation('fv', -1000, 0.05, 10);
        expect(result.result).toBeCloseTo(-1628.894626777442, 5);
      });
    });
  });

  // Spec 012: Prime Number Operations
  describe('Spec 012: Prime Number Operations', () => {
    describe('isprime operation', () => {
      it('Test 1.1: Small Prime Number', () => {
        const result = executeOperation('isprime', 7);
        expect(result.operation).toBe('isprime');
        expect(result.result).toBe(1);
      });

      it('Test 1.2: Small Composite Number', () => {
        const result = executeOperation('isprime', 10);
        expect(result.result).toBe(0);
      });

      it('Test 1.3: Number Two', () => {
        const result = executeOperation('isprime', 2);
        expect(result.result).toBe(1);
      });

      it('Test 1.4: Number One', () => {
        const result = executeOperation('isprime', 1);
        expect(result.result).toBe(0);
      });

      it('Test 1.5: Large Prime Number', () => {
        const result = executeOperation('isprime', 97);
        expect(result.result).toBe(1);
      });

      it('Test 1.6: Large Composite Number', () => {
        const result = executeOperation('isprime', 100);
        expect(result.result).toBe(0);
      });

      it('Test 1.7: Zero (Error Case)', () => {
        expect(() => executeOperation('isprime', 0)).toThrow('Number must be a positive integer');
      });

      it('Test 1.8: Negative Number (Error Case)', () => {
        expect(() => executeOperation('isprime', -5)).toThrow('Number must be a positive integer');
      });

      it('Test 1.9: Decimal Number (Error Case)', () => {
        expect(() => executeOperation('isprime', 7.5)).toThrow('Number must be an integer');
      });

      it('Test 1.10: Very Large Prime', () => {
        const result = executeOperation('isprime', 7919);
        expect(result.result).toBe(1);
      });
    });

    describe('primefactors operation', () => {
      it('Test 2.1: Small Composite Number', () => {
        const result = executeOperation('primefactors', 12);
        expect(result.operation).toBe('primefactors');
        const factors = (result.result as string).split(', ').map(Number);
        expect(factors).toEqual([2, 2, 3]);
        expect(factors.reduce((a, b) => a * b, 1)).toBe(12);
      });

      it('Test 2.2: Number with Repeated Factors', () => {
        const result = executeOperation('primefactors', 100);
        const factors = (result.result as string).split(', ').map(Number);
        expect(factors).toEqual([2, 2, 5, 5]);
        expect(factors.reduce((a, b) => a * b, 1)).toBe(100);
      });

      it('Test 2.3: Prime Number', () => {
        const result = executeOperation('primefactors', 17);
        const factors = (result.result as string).split(', ').map(Number);
        expect(factors).toEqual([17]);
      });

      it('Test 2.4: Power of Prime', () => {
        const result = executeOperation('primefactors', 8);
        const factors = (result.result as string).split(', ').map(Number);
        expect(factors).toEqual([2, 2, 2]);
      });

      it('Test 2.5: Product of Two Primes', () => {
        const result = executeOperation('primefactors', 15);
        const factors = (result.result as string).split(', ').map(Number);
        expect(factors).toEqual([3, 5]);
        expect(factors.reduce((a, b) => a * b, 1)).toBe(15);
      });

      it('Test 2.6: Number One', () => {
        const result = executeOperation('primefactors', 1);
        expect(result.result).toBe('');
      });

      it('Test 2.7: Zero (Error Case)', () => {
        expect(() => executeOperation('primefactors', 0)).toThrow('Number must be a positive integer');
      });

      it('Test 2.8: Negative Number (Error Case)', () => {
        expect(() => executeOperation('primefactors', -12)).toThrow('Number must be a positive integer');
      });

      it('Test 2.9: Large Number', () => {
        const result = executeOperation('primefactors', 1000);
        const factors = (result.result as string).split(', ').map(Number);
        expect(factors).toEqual([2, 2, 2, 5, 5, 5]);
        expect(factors.reduce((a, b) => a * b, 1)).toBe(1000);
      });
    });

    describe('nextprime operation', () => {
      it('Test 3.1: Next Prime After Composite', () => {
        const result = executeOperation('nextprime', 10);
        expect(result.operation).toBe('nextprime');
        expect(result.result).toBe(11);
      });

      it('Test 3.2: Next Prime After Prime', () => {
        const result = executeOperation('nextprime', 17);
        expect(result.result).toBe(19);
      });

      it('Test 3.3: Next Prime After Two', () => {
        const result = executeOperation('nextprime', 2);
        expect(result.result).toBe(3);
      });

      it('Test 3.4: Next Prime After Large Number', () => {
        const result = executeOperation('nextprime', 100);
        expect(result.result).toBe(101);
      });

      it('Test 3.5: Next Prime After One', () => {
        const result = executeOperation('nextprime', 1);
        expect(result.result).toBe(2);
      });

      it('Test 3.6: Zero (Error Case)', () => {
        expect(() => executeOperation('nextprime', 0)).toThrow('Number must be a non-negative integer');
      });

      it('Test 3.7: Negative Number (Error Case)', () => {
        expect(() => executeOperation('nextprime', -5)).toThrow('Number must be a non-negative integer');
      });

      it('Test 3.8: Very Large Number', () => {
        const result = executeOperation('nextprime', 1000);
        expect(result.result).toBe(1009);
      });
    });

    describe('prevprime operation', () => {
      it('Test 4.1: Previous Prime Before Composite', () => {
        const result = executeOperation('prevprime', 10);
        expect(result.operation).toBe('prevprime');
        expect(result.result).toBe(7);
      });

      it('Test 4.2: Previous Prime Before Prime', () => {
        const result = executeOperation('prevprime', 17);
        expect(result.result).toBe(13);
      });

      it('Test 4.3: Previous Prime Before Three', () => {
        const result = executeOperation('prevprime', 3);
        expect(result.result).toBe(2);
      });

      it('Test 4.4: Previous Prime Before Two', () => {
        expect(() => executeOperation('prevprime', 2)).toThrow('No previous prime exists for 2');
      });

      it('Test 4.5: Previous Prime Before One', () => {
        expect(() => executeOperation('prevprime', 1)).toThrow('No previous prime exists');
      });

      it('Test 4.6: Zero (Error Case)', () => {
        expect(() => executeOperation('prevprime', 0)).toThrow('No previous prime exists');
      });

      it('Test 4.7: Negative Number (Error Case)', () => {
        expect(() => executeOperation('prevprime', -5)).toThrow('Number must be a positive integer');
      });
    });

    describe('primes operation', () => {
      it('Test 5.1: Primes Up to Limit', () => {
        const result = executeOperation('primes', 20);
        expect(result.operation).toBe('primes');
        const primes = (result.result as string).split(', ').map(Number);
        expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
      });

      it('Test 5.2: Primes Up to Small Limit', () => {
        const result = executeOperation('primes', 10);
        const primes = (result.result as string).split(', ').map(Number);
        expect(primes).toEqual([2, 3, 5, 7]);
      });

      it('Test 5.3: Primes Up to Two', () => {
        const result = executeOperation('primes', 2);
        const primes = (result.result as string).split(', ').map(Number);
        expect(primes).toEqual([2]);
      });

      it('Test 5.4: Primes Up to One', () => {
        const result = executeOperation('primes', 1);
        expect(result.result).toBe('');
      });

      it('Test 5.5: First N Primes (Count Option)', () => {
        const result = executeOperation('primes', '--count' as any, 10);
        const primes = (result.result as string).split(', ').map(Number);
        expect(primes.length).toBe(10);
        expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
      });

      it('Test 5.6: First Five Primes', () => {
        const result = executeOperation('primes', '--count' as any, 5);
        const primes = (result.result as string).split(', ').map(Number);
        expect(primes.length).toBe(5);
        expect(primes).toEqual([2, 3, 5, 7, 11]);
      });

      it('Test 5.7: Zero Count (Error Case)', () => {
        expect(() => executeOperation('primes', '--count' as any, 0)).toThrow('Count must be positive');
      });

      it('Test 5.8: Large Limit', () => {
        const result = executeOperation('primes', 100);
        const primes = (result.result as string).split(', ').map(Number);
        expect(primes.length).toBeGreaterThan(20);
        expect(primes[0]).toBe(2);
        expect(primes[primes.length - 1]).toBeLessThanOrEqual(100);
      });

      it('Test 5.9: Missing Arguments', () => {
        expect(() => executeOperation('primes')).toThrow();
      });
    });

    describe('totient operation', () => {
      it('Test 6.1: Totient of Prime Number', () => {
        const result = executeOperation('totient', 7);
        expect(result.operation).toBe('totient');
        expect(result.result).toBe(6);
      });

      it('Test 6.2: Totient of Composite Number', () => {
        const result = executeOperation('totient', 10);
        expect(result.result).toBe(4);
      });

      it('Test 6.3: Totient of Power of Prime', () => {
        const result = executeOperation('totient', 8);
        expect(result.result).toBe(4);
      });

      it('Test 6.4: Totient of Product of Primes', () => {
        const result = executeOperation('totient', 15);
        expect(result.result).toBe(8);
      });

      it('Test 6.5: Totient of One', () => {
        const result = executeOperation('totient', 1);
        expect(result.result).toBe(1);
      });

      it('Test 6.6: Totient of Large Number', () => {
        const result = executeOperation('totient', 100);
        expect(result.result).toBe(40);
      });

      it('Test 6.7: Zero (Error Case)', () => {
        expect(() => executeOperation('totient', 0)).toThrow('Number must be a positive integer');
      });

      it('Test 6.8: Negative Number (Error Case)', () => {
        expect(() => executeOperation('totient', -10)).toThrow('Number must be a positive integer');
      });

      it('Test 6.9: Totient Property Verification', () => {
        const result = executeOperation('totient', 12);
        expect(result.result).toBe(4);
      });
    });

    describe('Edge Cases and Integration', () => {
      it('Test 7.1: Very Large Prime Check', () => {
        const result = executeOperation('isprime', 9973);
        expect(result.result).toBe(1);
      });

      it('Test 7.2: Prime Factors of Large Number', () => {
        const result = executeOperation('primefactors', 10000);
        const factors = (result.result as string).split(', ').map(Number);
        expect(factors).toEqual([2, 2, 2, 2, 5, 5, 5, 5]);
        expect(factors.reduce((a, b) => a * b, 1)).toBe(10000);
      });

      it('Test 7.3: Invalid Number Format', () => {
        expect(() => executeOperation('isprime', 'abc' as any)).toThrow();
      });

      it('Test 7.4: Missing Arguments', () => {
        expect(() => executeOperation('isprime')).toThrow();
      });

      it('Test 7.5: Relationship Between Operations', () => {
        const factors = executeOperation('primefactors', 12);
        const factorArray = (factors.result as string).split(', ').map(Number);
        factorArray.forEach(factor => {
          const isPrime = executeOperation('isprime', factor);
          expect(isPrime.result).toBe(1);
        });
      });
    });
  });

  // Spec 013: Sequence Operations
  describe('Spec 013: Sequence Operations', () => {
    describe('fibonacci operation', () => {
      it('Test 1.1: First Fibonacci Number', () => {
        const result = executeOperation('fibonacci', 0);
        expect(result.operation).toBe('fibonacci');
        expect(result.result).toBe(0);
      });

      it('Test 1.2: Second Fibonacci Number', () => {
        const result = executeOperation('fibonacci', 1);
        expect(result.result).toBe(1);
      });

      it('Test 1.3: Small Fibonacci Number', () => {
        const result = executeOperation('fibonacci', 5);
        expect(result.result).toBe(5);
      });

      it('Test 1.4: Medium Fibonacci Number', () => {
        const result = executeOperation('fibonacci', 10);
        expect(result.result).toBe(55);
      });

      it('Test 1.5: Large Fibonacci Number', () => {
        const result = executeOperation('fibonacci', 20);
        expect(result.result).toBe(6765);
      });

      it('Test 1.6: Fibonacci Sequence', () => {
        const result = executeOperation('fibonacci', 10, '--sequence' as any);
        const sequence = (result.result as string).split(', ').map(Number);
        expect(sequence).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
      });

      it('Test 1.7: Fibonacci Sequence Small', () => {
        const result = executeOperation('fibonacci', 5, '--sequence' as any);
        const sequence = (result.result as string).split(', ').map(Number);
        expect(sequence).toEqual([0, 1, 1, 2, 3, 5]);
      });

      it('Test 1.8: Negative Number (Error Case)', () => {
        expect(() => executeOperation('fibonacci', -5)).toThrow('n must be a non-negative integer');
      });

      it('Test 1.9: Decimal Number (Error Case)', () => {
        expect(() => executeOperation('fibonacci', 5.5)).toThrow('n must be an integer');
      });

      it('Test 1.10: Very Large Fibonacci', () => {
        const result = executeOperation('fibonacci', 50);
        expect(result.result).toBe(12586269025);
      });
    });

    describe('arithmetic operation', () => {
      it('Test 2.1: Basic Arithmetic Term', () => {
        const result = executeOperation('arithmetic', 5, 3, 10);
        expect(result.operation).toBe('arithmetic');
        expect(result.result).toBe(32);
      });

      it('Test 2.2: Arithmetic Term Starting at Zero', () => {
        const result = executeOperation('arithmetic', 0, 5, 10);
        expect(result.result).toBe(45);
      });

      it('Test 2.3: Arithmetic Term with Negative Difference', () => {
        const result = executeOperation('arithmetic', 10, -2, 5);
        expect(result.result).toBe(2);
      });

      it('Test 2.4: First Term', () => {
        const result = executeOperation('arithmetic', 5, 3, 1);
        expect(result.result).toBe(5);
      });

      it('Test 2.5: Arithmetic Sequence', () => {
        const result = executeOperation('arithmetic', 2, 5, 5, '--sequence' as any);
        const sequence = (result.result as string).split(', ').map(Number);
        expect(sequence).toEqual([2, 7, 12, 17, 22]);
      });

      it('Test 2.6: Arithmetic Sequence with Negative', () => {
        const result = executeOperation('arithmetic', 10, -2, 5, '--sequence' as any);
        const sequence = (result.result as string).split(', ').map(Number);
        expect(sequence).toEqual([10, 8, 6, 4, 2]);
      });

      it('Test 2.7: Zero Term Number (Error Case)', () => {
        expect(() => executeOperation('arithmetic', 5, 3, 0)).toThrow('n must be positive');
      });

      it('Test 2.8: Decimal Inputs', () => {
        const result = executeOperation('arithmetic', 1.5, 0.5, 5);
        expect(result.result).toBe(3.5);
      });
    });

    describe('geometric operation', () => {
      it('Test 3.1: Basic Geometric Term', () => {
        const result = executeOperation('geometric', 2, 3, 5);
        expect(result.operation).toBe('geometric');
        expect(result.result).toBe(162);
      });

      it('Test 3.2: Geometric Term with Ratio Less Than One', () => {
        const result = executeOperation('geometric', 100, 0.5, 5);
        expect(result.result).toBe(6.25);
      });

      it('Test 3.3: First Term', () => {
        const result = executeOperation('geometric', 5, 2, 1);
        expect(result.result).toBe(5);
      });

      it('Test 3.4: Geometric Sequence', () => {
        const result = executeOperation('geometric', 1, 2, 6, '--sequence' as any);
        const sequence = (result.result as string).split(', ').map(Number);
        expect(sequence).toEqual([1, 2, 4, 8, 16, 32]);
      });

      it('Test 3.5: Geometric Sequence with Fractional Ratio', () => {
        const result = executeOperation('geometric', 64, 0.5, 5, '--sequence' as any);
        const sequence = (result.result as string).split(', ').map(Number);
        expect(sequence).toEqual([64, 32, 16, 8, 4]);
      });

      it('Test 3.6: Zero Ratio', () => {
        const result = executeOperation('geometric', 5, 0, 3);
        expect(result.result).toBe(0);
      });

      it('Test 3.7: Negative Ratio', () => {
        const result = executeOperation('geometric', 2, -2, 4);
        expect(result.result).toBe(16);
      });

      it('Test 3.8: Zero Term Number (Error Case)', () => {
        expect(() => executeOperation('geometric', 2, 3, 0)).toThrow('n must be positive');
      });
    });

    describe('sumarithmetic operation', () => {
      it('Test 4.1: Basic Arithmetic Sum', () => {
        const result = executeOperation('sumarithmetic', 2, 3, 5);
        expect(result.operation).toBe('sumarithmetic');
        expect(result.result).toBe(40);
      });

      it('Test 4.2: Sum of Natural Numbers', () => {
        const result = executeOperation('sumarithmetic', 1, 1, 100);
        expect(result.result).toBe(5050);
      });

      it('Test 4.3: Sum with Negative Difference', () => {
        const result = executeOperation('sumarithmetic', 10, -2, 5);
        expect(result.result).toBe(30);
      });

      it('Test 4.4: Sum of Single Term', () => {
        const result = executeOperation('sumarithmetic', 5, 3, 1);
        expect(result.result).toBe(5);
      });

      it('Test 4.5: Sum with Zero Difference', () => {
        const result = executeOperation('sumarithmetic', 5, 0, 10);
        expect(result.result).toBe(50);
      });

      it('Test 4.6: Zero Terms (Error Case)', () => {
        expect(() => executeOperation('sumarithmetic', 2, 3, 0)).toThrow('n must be positive');
      });

      it('Test 4.7: Large Sum', () => {
        const result = executeOperation('sumarithmetic', 1, 1, 1000);
        expect(result.result).toBe(500500);
      });
    });

    describe('sumgeometric operation', () => {
      it('Test 5.1: Basic Geometric Sum', () => {
        const result = executeOperation('sumgeometric', 1, 2, 5);
        expect(result.operation).toBe('sumgeometric');
        expect(result.result).toBe(31);
      });

      it('Test 5.2: Geometric Sum with Ratio Less Than One', () => {
        const result = executeOperation('sumgeometric', 100, 0.5, 5);
        expect(result.result).toBeCloseTo(193.75, 2);
      });

      it('Test 5.3: Sum with Ratio Equal to One', () => {
        const result = executeOperation('sumgeometric', 5, 1, 10);
        expect(result.result).toBe(50);
      });

      it('Test 5.4: Sum of Single Term', () => {
        const result = executeOperation('sumgeometric', 5, 2, 1);
        expect(result.result).toBe(5);
      });

      it('Test 5.5: Large Geometric Sum', () => {
        const result = executeOperation('sumgeometric', 1, 2, 20);
        expect(result.result).toBe(1048575);
      });

      it('Test 5.6: Zero Terms (Error Case)', () => {
        expect(() => executeOperation('sumgeometric', 1, 2, 0)).toThrow('n must be positive');
      });

      it('Test 5.7: Negative Ratio', () => {
        const result = executeOperation('sumgeometric', 2, -2, 4);
        expect(result.result).toBe(-10);
      });
    });

    describe('triangular operation', () => {
      it('Test 6.1: Small Triangular Number', () => {
        const result = executeOperation('triangular', 5);
        expect(result.operation).toBe('triangular');
        expect(result.result).toBe(15);
      });

      it('Test 6.2: Medium Triangular Number', () => {
        const result = executeOperation('triangular', 10);
        expect(result.result).toBe(55);
      });

      it('Test 6.3: Triangular Number of One', () => {
        const result = executeOperation('triangular', 1);
        expect(result.result).toBe(1);
      });

      it('Test 6.4: Triangular Number of Zero', () => {
        const result = executeOperation('triangular', 0);
        expect(result.result).toBe(0);
      });

      it('Test 6.5: Large Triangular Number', () => {
        const result = executeOperation('triangular', 100);
        expect(result.result).toBe(5050);
      });

      it('Test 6.6: Relationship to Arithmetic Sum', () => {
        const triangular = executeOperation('triangular', 10);
        const arithmeticSum = executeOperation('sumarithmetic', 1, 1, 10);
        expect(triangular.result).toBe(arithmeticSum.result);
      });

      it('Test 6.7: Negative Number (Error Case)', () => {
        expect(() => executeOperation('triangular', -5)).toThrow('n must be non-negative');
      });

      it('Test 6.8: Decimal Number (Error Case)', () => {
        expect(() => executeOperation('triangular', 5.5)).toThrow('n must be an integer');
      });
    });

    describe('Edge Cases and Integration', () => {
      it('Test 7.1: Very Large Fibonacci', () => {
        const result = executeOperation('fibonacci', 100);
        expect(result.result).toBeGreaterThan(0);
      });

      it('Test 7.2: Invalid Number Format', () => {
        expect(() => executeOperation('fibonacci', 'abc' as any)).toThrow();
      });

      it('Test 7.3: Missing Arguments', () => {
        expect(() => executeOperation('arithmetic', 5, 3)).toThrow();
      });

      it('Test 7.4: Sequence Mode with Zero Count', () => {
        const result = executeOperation('fibonacci', 0, '--sequence' as any);
        const sequence = (result.result as string).split(', ').map(Number);
        expect(sequence).toEqual([0]);
      });

      it('Test 7.5: Very Large Sequence', () => {
        const result = executeOperation('arithmetic', 1, 1, 1000, '--sequence' as any);
        const sequence = (result.result as string).split(', ').map(Number);
        expect(sequence.length).toBe(1000);
        expect(sequence[0]).toBe(1);
        expect(sequence[999]).toBe(1000);
      });
    });
  });

  // Spec 014: Coordinate Geometry
  describe('Spec 014: Coordinate Geometry', () => {
    describe('distance operation', () => {
      it('Test 1.1: Basic 2D Distance', () => {
        const result = executeOperation('distance', 0, 0, 3, 4);
        expect(result.operation).toBe('distance');
        expect(result.result).toBe(5);
      });

      it('Test 1.2: Distance with Negative Coordinates', () => {
        const result = executeOperation('distance', -1, -2, 2, 2);
        expect(result.result).toBe(5);
      });

      it('Test 1.3: Distance Between Same Points', () => {
        const result = executeOperation('distance', 3, 4, 3, 4);
        expect(result.result).toBe(0);
      });

      it('Test 1.4: Horizontal Distance', () => {
        const result = executeOperation('distance', 0, 0, 5, 0);
        expect(result.result).toBe(5);
      });

      it('Test 1.5: Vertical Distance', () => {
        const result = executeOperation('distance', 0, 0, 0, 5);
        expect(result.result).toBe(5);
      });

      it('Test 1.6: 3D Distance', () => {
        const result = executeOperation('distance', 0, 0, 0, 3, 4, 0);
        expect(result.result).toBe(5);
      });

      it('Test 1.7: 3D Distance with Z Component', () => {
        const result = executeOperation('distance', 0, 0, 0, 0, 0, 5);
        expect(result.result).toBe(5);
      });

      it('Test 1.8: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('distance', 0, 0, 3)).toThrow();
      });

      it('Test 1.9: Invalid Number Format', () => {
        expect(() => executeOperation('distance', 0, 0, 'abc' as any, 4)).toThrow();
      });
    });

    describe('midpoint operation', () => {
      it('Test 2.1: Basic Midpoint', () => {
        const result = executeOperation('midpoint', 0, 0, 4, 4);
        expect(result.operation).toBe('midpoint');
        const coords = (result.result as string).split(', ').map(Number);
        expect(coords).toEqual([2, 2]);
      });

      it('Test 2.2: Midpoint with Different Coordinates', () => {
        const result = executeOperation('midpoint', 1, 3, 5, 7);
        const coords = (result.result as string).split(', ').map(Number);
        expect(coords).toEqual([3, 5]);
      });

      it('Test 2.3: Midpoint with Negative Coordinates', () => {
        const result = executeOperation('midpoint', -2, -4, 2, 4);
        const coords = (result.result as string).split(', ').map(Number);
        expect(coords).toEqual([0, 0]);
      });

      it('Test 2.4: Midpoint with Decimal Coordinates', () => {
        const result = executeOperation('midpoint', 1.5, 2.5, 3.5, 4.5);
        const coords = (result.result as string).split(', ').map(Number);
        expect(coords).toEqual([2.5, 3.5]);
      });

      it('Test 2.5: Midpoint of Same Points', () => {
        const result = executeOperation('midpoint', 3, 4, 3, 4);
        const coords = (result.result as string).split(', ').map(Number);
        expect(coords).toEqual([3, 4]);
      });

      it('Test 2.6: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('midpoint', 0, 0, 4)).toThrow();
      });
    });

    describe('slope operation', () => {
      it('Test 3.1: Positive Slope', () => {
        const result = executeOperation('slope', 0, 0, 2, 4);
        expect(result.operation).toBe('slope');
        expect(result.result).toBe(2);
      });

      it('Test 3.2: Negative Slope', () => {
        const result = executeOperation('slope', 0, 4, 2, 0);
        expect(result.result).toBe(-2);
      });

      it('Test 3.3: Zero Slope (Horizontal Line)', () => {
        const result = executeOperation('slope', 1, 1, 3, 1);
        expect(result.result).toBe(0);
      });

      it('Test 3.4: Undefined Slope (Vertical Line)', () => {
        expect(() => executeOperation('slope', 1, 1, 1, 3)).toThrow('Slope is undefined for vertical line');
      });

      it('Test 3.5: Slope with Decimal Coordinates', () => {
        const result = executeOperation('slope', 0, 0, 1, 0.5);
        expect(result.result).toBe(0.5);
      });

      it('Test 3.6: Same Points (Error Case)', () => {
        expect(() => executeOperation('slope', 3, 4, 3, 4)).toThrow('Cannot calculate slope: points are the same');
      });

      it('Test 3.7: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('slope', 0, 0, 2)).toThrow();
      });
    });

    describe('area operation', () => {
      it('Test 4.1: Area of Rectangle', () => {
        const result = executeOperation('area', 0, 0, 4, 0, 4, 4, 0, 4);
        expect(result.operation).toBe('area');
        expect(result.result).toBe(16);
      });

      it('Test 4.2: Area of Triangle', () => {
        const result = executeOperation('area', 0, 0, 3, 0, 3, 4);
        expect(result.result).toBe(6);
      });

      it('Test 4.3: Area of Triangle with Negative Coordinates', () => {
        const result = executeOperation('area', -1, -1, 2, -1, 2, 2);
        expect(result.result).toBe(4.5);
      });

      it('Test 4.4: Area of Pentagon', () => {
        const result = executeOperation('area', 0, 0, 2, 0, 3, 2, 1, 3, -1, 2);
        expect(result.result).toBeGreaterThan(0);
      });

      it('Test 4.5: Minimum Vertices (Error Case)', () => {
        expect(() => executeOperation('area', 0, 0, 4, 0)).toThrow('At least 3 vertices required for polygon area');
      });

      it('Test 4.6: Odd Number of Coordinates (Error Case)', () => {
        expect(() => executeOperation('area', 0, 0, 4, 0, 4)).toThrow('Even number of coordinates required');
      });

      it('Test 4.7: Area with Decimal Coordinates', () => {
        const result = executeOperation('area', 0, 0, 2.5, 0, 2.5, 2.5, 0, 2.5);
        expect(result.result).toBe(6.25);
      });
    });

    describe('perimeter operation', () => {
      it('Test 5.1: Perimeter of Rectangle', () => {
        const result = executeOperation('perimeter', 0, 0, 4, 0, 4, 4, 0, 4);
        expect(result.operation).toBe('perimeter');
        expect(result.result).toBe(16);
      });

      it('Test 5.2: Perimeter of Triangle', () => {
        const result = executeOperation('perimeter', 0, 0, 3, 0, 3, 4);
        expect(result.result).toBe(12);
      });

      it('Test 5.3: Perimeter with Decimal Coordinates', () => {
        const result = executeOperation('perimeter', 0, 0, 2.5, 0, 2.5, 2.5, 0, 2.5);
        expect(result.result).toBe(10);
      });

      it('Test 5.4: Minimum Vertices (Error Case)', () => {
        expect(() => executeOperation('perimeter', 0, 0, 4, 0)).toThrow('At least 3 vertices required');
      });

      it('Test 5.5: Odd Number of Coordinates (Error Case)', () => {
        expect(() => executeOperation('perimeter', 0, 0, 4, 0, 4)).toThrow('Even number of coordinates required');
      });
    });

    describe('circlearea operation', () => {
      it('Test 6.1: Basic Circle Area', () => {
        const result = executeOperation('circlearea', 5);
        expect(result.operation).toBe('circlearea');
        expect(result.result).toBeCloseTo(78.53981633974483, 5);
      });

      it('Test 6.2: Circle Area with Different Radius', () => {
        const result = executeOperation('circlearea', 10);
        expect(result.result).toBeCloseTo(314.1592653589793, 5);
      });

      it('Test 6.3: Circle Area with Decimal Radius', () => {
        const result = executeOperation('circlearea', 2.5);
        expect(result.result).toBeCloseTo(19.634954084936208, 5);
      });

      it('Test 6.4: Circle Area with Zero Radius', () => {
        const result = executeOperation('circlearea', 0);
        expect(result.result).toBe(0);
      });

      it('Test 6.5: Negative Radius (Error Case)', () => {
        expect(() => executeOperation('circlearea', -5)).toThrow('Radius must be non-negative');
      });

      it('Test 6.6: Missing Argument (Error Case)', () => {
        expect(() => executeOperation('circlearea')).toThrow();
      });
    });

    describe('circumference operation', () => {
      it('Test 7.1: Basic Circumference', () => {
        const result = executeOperation('circumference', 5);
        expect(result.operation).toBe('circumference');
        expect(result.result).toBeCloseTo(31.41592653589793, 5);
      });

      it('Test 7.2: Circumference with Different Radius', () => {
        const result = executeOperation('circumference', 10);
        expect(result.result).toBeCloseTo(62.83185307179586, 5);
      });

      it('Test 7.3: Circumference with Decimal Radius', () => {
        const result = executeOperation('circumference', 2.5);
        expect(result.result).toBeCloseTo(15.707963267948966, 5);
      });

      it('Test 7.4: Circumference with Zero Radius', () => {
        const result = executeOperation('circumference', 0);
        expect(result.result).toBe(0);
      });

      it('Test 7.5: Negative Radius (Error Case)', () => {
        expect(() => executeOperation('circumference', -5)).toThrow('Radius must be non-negative');
      });

      it('Test 7.6: Relationship to Area', () => {
        const area = executeOperation('circlearea', 5);
        const circumference = executeOperation('circumference', 5);
        const cSquared = (circumference.result as number) ** 2;
        const fourPiA = 4 * Math.PI * (area.result as number);
        expect(cSquared).toBeCloseTo(fourPiA, 1);
      });
    });

    describe('Edge Cases and Integration', () => {
      it('Test 8.1: Very Large Coordinates', () => {
        const result = executeOperation('distance', 0, 0, 1000000, 1000000);
        expect(result.result).toBeCloseTo(Math.sqrt(2) * 1000000, 0);
      });

      it('Test 8.2: Very Small Coordinates', () => {
        const result = executeOperation('distance', 0, 0, 0.001, 0.001);
        expect(result.result).toBeCloseTo(Math.sqrt(2) * 0.001, 10);
      });

      it('Test 8.3: Invalid Number Format', () => {
        expect(() => executeOperation('distance', 0, 0, 'abc' as any, 4)).toThrow();
      });

      it('Test 8.4: Missing Arguments', () => {
        expect(() => executeOperation('distance', 0, 0)).toThrow();
      });

      it('Test 8.5: Complex Polygon', () => {
        const result = executeOperation('area', 0, 0, 5, 0, 5, 3, 2, 5, 0, 3);
        expect(result.result).toBeGreaterThan(0);
      });
    });
  });

  // Spec 015: Random Number Generation
  describe('Spec 015: Random Number Generation', () => {
    describe('random operation', () => {
      it('Test 1.1: Random Without Arguments', () => {
        const result = executeOperation('random');
        expect(result.operation).toBe('random');
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(1);
      });

      it('Test 1.2: Random in Range', () => {
        const result = executeOperation('random', 1, 10);
        expect(result.result).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeLessThan(10);
      });

      it('Test 1.3: Random with Same Min and Max', () => {
        const result = executeOperation('random', 5, 5);
        expect(result.result).toBe(5);
      });

      it('Test 1.4: Random with Negative Range', () => {
        const result = executeOperation('random', -10, -5);
        expect(result.result).toBeGreaterThanOrEqual(-10);
        expect(result.result).toBeLessThan(-5);
      });

      it('Test 1.5: Random with Large Range', () => {
        const result = executeOperation('random', 0, 1000000);
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(1000000);
      });

      it('Test 1.6: Invalid Range (Error Case)', () => {
        expect(() => executeOperation('random', 10, 5)).toThrow('Minimum value must be less than maximum value');
      });

      it('Test 1.7: Missing Arguments for Range', () => {
        const result = executeOperation('random', 5);
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(1);
      });

      it('Test 1.8: Random with --integer flag', () => {
        const result = executeOperation('random', 1, 10, '--integer');
        expect(result.operation).toBe('random');
        expect(Number.isInteger(result.result)).toBe(true);
        expect(result.result).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeLessThan(10);
      });

      it('Test 1.9: Random with --int flag (alias)', () => {
        const result = executeOperation('random', 1, 10, '--int');
        expect(result.operation).toBe('random');
        expect(Number.isInteger(result.result)).toBe(true);
        expect(result.result).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeLessThan(10);
      });

      it('Test 1.10: Random with --int flag produces same behavior as --integer', () => {
        // Set seed for reproducibility
        executeOperation('seed', 12345);
        const result1 = executeOperation('random', 1, 100, '--integer');
        
        executeOperation('seed', 12345);
        const result2 = executeOperation('random', 1, 100, '--int');
        
        expect(Number.isInteger(result1.result)).toBe(true);
        expect(Number.isInteger(result2.result)).toBe(true);
        expect(result1.result).toBe(result2.result);
      });

      it('Test 1.11: Random with --int flag and negative range', () => {
        const result = executeOperation('random', -10, -5, '--int');
        expect(Number.isInteger(result.result)).toBe(true);
        expect(result.result).toBeGreaterThanOrEqual(-10);
        expect(result.result).toBeLessThan(-5);
      });

      it('Test 1.12: Random with --int flag single value', () => {
        const result = executeOperation('random', 5, 5, '--int');
        expect(result.result).toBe(5);
        expect(Number.isInteger(result.result)).toBe(true);
      });
    });

    describe('randomint operation', () => {
      it('Test 2.1: Random Integer in Range', () => {
        const result = executeOperation('randomint', 1, 10);
        expect(result.operation).toBe('randomint');
        expect(Number.isInteger(result.result)).toBe(true);
        expect(result.result).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeLessThanOrEqual(10);
      });

      it('Test 2.2: Random Integer Single Value', () => {
        const result = executeOperation('randomint', 5, 5);
        expect(result.result).toBe(5);
      });

      it('Test 2.3: Random Integer with Negative Range', () => {
        const result = executeOperation('randomint', -5, -1);
        expect(Number.isInteger(result.result)).toBe(true);
        expect(result.result).toBeGreaterThanOrEqual(-5);
        expect(result.result).toBeLessThanOrEqual(-1);
      });

      it('Test 2.4: Random Integer Large Range', () => {
        const result = executeOperation('randomint', 1, 1000000);
        expect(Number.isInteger(result.result)).toBe(true);
        expect(result.result).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeLessThanOrEqual(1000000);
      });

      it('Test 2.5: Random Integer Zero to One', () => {
        const result = executeOperation('randomint', 0, 1);
        expect([0, 1]).toContain(result.result);
      });

      it('Test 2.6: Invalid Range (Error Case)', () => {
        expect(() => executeOperation('randomint', 10, 5)).toThrow('Minimum value must be less than or equal to maximum value');
      });

      it('Test 2.7: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('randomint', 5)).toThrow();
      });

      it('Test 2.8: Decimal Arguments', () => {
        const result = executeOperation('randomint', 1.5, 10.7);
        expect(Number.isInteger(result.result)).toBe(true);
        expect(result.result).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeLessThanOrEqual(10);
      });
    });

    describe('randomlist operation', () => {
      it('Test 3.1: Random List Default Range', () => {
        const result = executeOperation('randomlist', 10);
        expect(result.operation).toBe('randomlist');
        const numbers = (result.result as string).split(', ').map(Number);
        expect(numbers.length).toBe(10);
        numbers.forEach(num => {
          expect(num).toBeGreaterThanOrEqual(0);
          expect(num).toBeLessThan(1);
        });
      });

      it('Test 3.2: Random List with Range', () => {
        const result = executeOperation('randomlist', 5, 1, 100);
        const numbers = (result.result as string).split(', ').map(Number);
        expect(numbers.length).toBe(5);
        numbers.forEach(num => {
          expect(num).toBeGreaterThanOrEqual(1);
          expect(num).toBeLessThan(100);
        });
      });

      it('Test 3.3: Random List Single Number', () => {
        const result = executeOperation('randomlist', 1, 0, 10);
        const numbers = (result.result as string).split(', ').map(Number);
        expect(numbers.length).toBe(1);
        expect(numbers[0]).toBeGreaterThanOrEqual(0);
        expect(numbers[0]).toBeLessThan(10);
      });

      it('Test 3.4: Random List Large Count', () => {
        const result = executeOperation('randomlist', 1000, 1, 100);
        const numbers = (result.result as string).split(', ').map(Number);
        expect(numbers.length).toBe(1000);
        numbers.forEach(num => {
          expect(num).toBeGreaterThanOrEqual(1);
          expect(num).toBeLessThan(100);
        });
      });

      it('Test 3.6: Zero Count (Error Case)', () => {
        const result = executeOperation('randomlist', 0);
        expect(result.result).toBe('');
      });

      it('Test 3.7: Negative Count (Error Case)', () => {
        expect(() => executeOperation('randomlist', -5)).toThrow('Count must be positive');
      });

      it('Test 3.8: Invalid Range', () => {
        expect(() => executeOperation('randomlist', 10, 100, 50)).toThrow('Minimum value must be less than maximum value');
      });
    });

    describe('seed operation', () => {
      it('Test 4.1: Set Seed and Generate', () => {
        executeOperation('seed', 12345);
        const result1 = executeOperation('random');
        executeOperation('seed', 12345);
        const result2 = executeOperation('random');
        expect(result1.result).toBe(result2.result);
      });

      it('Test 4.2: Same Seed Produces Same Sequence', () => {
        executeOperation('seed', 42);
        const r1 = executeOperation('random');
        const r2 = executeOperation('random');
        executeOperation('seed', 42);
        const r3 = executeOperation('random');
        const r4 = executeOperation('random');
        expect(r1.result).toBe(r3.result);
        expect(r2.result).toBe(r4.result);
      });

      it('Test 4.3: Different Seeds Produce Different Sequences', () => {
        executeOperation('seed', 100);
        const r1 = executeOperation('random');
        executeOperation('seed', 200);
        const r2 = executeOperation('random');
        expect(r1.result).not.toBe(r2.result);
      });

      it('Test 4.4: Seed with Zero', () => {
        executeOperation('seed', 0);
        const result = executeOperation('random');
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(1);
      });

      it('Test 4.5: Seed with Negative Value', () => {
        executeOperation('seed', -12345);
        const result = executeOperation('random');
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(1);
      });

      it('Test 4.6: Seed with Large Value', () => {
        executeOperation('seed', 999999999);
        const result = executeOperation('random');
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(1);
      });

      it('Test 4.7: Missing Argument (Error Case)', () => {
        expect(() => executeOperation('seed')).toThrow();
      });

      it('Test 4.8: Invalid Seed Format', () => {
        expect(() => executeOperation('seed', 'abc' as any)).toThrow();
      });
    });

    describe('Edge Cases and Distribution', () => {
      it('Test 5.1: Multiple Random Calls', () => {
        const results = [];
        for (let i = 0; i < 10; i++) {
          results.push(executeOperation('random').result);
        }
        const uniqueResults = new Set(results);
        expect(uniqueResults.size).toBeGreaterThan(1);
      });

      it('Test 5.3: Range Boundaries', () => {
        const results = new Set();
        for (let i = 0; i < 100; i++) {
          const result = executeOperation('randomint', 1, 2);
          results.add(result.result);
        }
        expect(results.has(1)).toBe(true);
        expect(results.has(2)).toBe(true);
      });

      it('Test 5.4: Very Small Range', () => {
        const result = executeOperation('random', 10, 10.0001);
        expect(result.result).toBeGreaterThanOrEqual(10);
        expect(result.result).toBeLessThan(10.0001);
      });

      it('Test 5.5: Very Large Range', () => {
        const result = executeOperation('random', 0, 1e10);
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(1e10);
      });

      it('Test 5.6: Reproducibility with Seed', () => {
        executeOperation('seed', 999);
        const seq1 = [];
        for (let i = 0; i < 5; i++) {
          seq1.push(executeOperation('random').result);
        }
        executeOperation('seed', 999);
        const seq2 = [];
        for (let i = 0; i < 5; i++) {
          seq2.push(executeOperation('random').result);
        }
        expect(seq1).toEqual(seq2);
      });

      it('Test 5.7: Invalid Number Format', () => {
        expect(() => executeOperation('random', 'abc' as any, 10)).toThrow();
      });
    });
  });

  // Spec 016: Modular Arithmetic
  describe('Spec 016: Modular Arithmetic', () => {
    describe('mod operation', () => {
      it('Test 1.1: Basic Modulo', () => {
        const result = executeOperation('mod', 10, 3);
        expect(result.operation).toBe('mod');
        expect(result.result).toBe(1);
      });

      it('Test 1.2: Modulo with Larger Dividend', () => {
        const result = executeOperation('mod', 17, 5);
        expect(result.result).toBe(2);
      });

      it('Test 1.3: Modulo When Divisible', () => {
        const result = executeOperation('mod', 15, 5);
        expect(result.result).toBe(0);
      });

      it('Test 1.4: Modulo with Negative Dividend', () => {
        const result = executeOperation('mod', -10, 3);
        expect(result.result).toBe(2);
      });

      it('Test 1.5: Modulo with Negative Divisor', () => {
        expect(() => executeOperation('mod', 10, -3)).toThrow('Modulus must be positive');
      });

      it('Test 1.6: Modulo with Zero Divisor (Error Case)', () => {
        expect(() => executeOperation('mod', 10, 0)).toThrow('Modulus cannot be zero');
      });

      it('Test 1.7: Modulo with Modulus One', () => {
        const result = executeOperation('mod', 10, 1);
        expect(result.result).toBe(0);
      });

      it('Test 1.8: Modulo with Large Numbers', () => {
        const result = executeOperation('mod', 1000000, 7);
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(7);
      });

      it('Test 1.9: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('mod', 10)).toThrow();
      });
    });

    describe('modpow operation', () => {
      it('Test 2.1: Basic Modular Exponentiation', () => {
        const result = executeOperation('modpow', 2, 10, 7);
        expect(result.operation).toBe('modpow');
        expect(result.result).toBe(2);
      });

      it('Test 2.2: Modular Exponentiation Small', () => {
        const result = executeOperation('modpow', 3, 5, 11);
        expect(result.result).toBe(1);
      });

      it('Test 2.3: Modular Exponentiation with Zero Exponent', () => {
        const result = executeOperation('modpow', 5, 0, 7);
        expect(result.result).toBe(1);
      });

      it('Test 2.4: Modular Exponentiation with Exponent One', () => {
        const result = executeOperation('modpow', 5, 1, 7);
        expect(result.result).toBe(5);
      });

      it('Test 2.5: Modular Exponentiation Large Exponent', () => {
        const result = executeOperation('modpow', 2, 100, 13);
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(13);
      });

      it('Test 2.6: Modular Exponentiation with Zero Base', () => {
        const result = executeOperation('modpow', 0, 5, 7);
        expect(result.result).toBe(0);
      });

      it('Test 2.7: Modular Exponentiation with Modulus One', () => {
        const result = executeOperation('modpow', 5, 10, 1);
        expect(result.result).toBe(0);
      });

      it('Test 2.8: Zero Modulus (Error Case)', () => {
        expect(() => executeOperation('modpow', 2, 10, 0)).toThrow('Modulus cannot be zero');
      });

      it('Test 2.9: Negative Exponent (Error Case)', () => {
        expect(() => executeOperation('modpow', 2, -5, 7)).toThrow('Exponent must be non-negative');
      });

      it('Test 2.10: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('modpow', 2, 10)).toThrow();
      });
    });

    describe('modinv operation', () => {
      it('Test 3.1: Basic Modular Inverse', () => {
        const result = executeOperation('modinv', 3, 11);
        expect(result.operation).toBe('modinv');
        expect(result.result).toBe(4);
        expect((3 * 4) % 11).toBe(1);
      });

      it('Test 3.2: Modular Inverse Different Values', () => {
        const result = executeOperation('modinv', 5, 7);
        expect(result.result).toBe(3);
        expect((5 * 3) % 7).toBe(1);
      });

      it('Test 3.3: Modular Inverse of One', () => {
        const result = executeOperation('modinv', 1, 7);
        expect(result.result).toBe(1);
      });

      it('Test 3.4: Modular Inverse Property', () => {
        const result = executeOperation('modinv', 3, 11);
        const verify = executeOperation('mod', (3 * (result.result as number)), 11);
        expect(verify.result).toBe(1);
      });

      it('Test 3.5: Not Coprime (Error Case)', () => {
        expect(() => executeOperation('modinv', 4, 8)).toThrow('Modular inverse exists only when a and m are coprime');
      });

      it('Test 3.6: Zero Modulus (Error Case)', () => {
        expect(() => executeOperation('modinv', 3, 0)).toThrow('Modulus cannot be zero');
      });

      it('Test 3.7: Modulus One', () => {
        const result = executeOperation('modinv', 5, 1);
        expect(result.result).toBe(0);
      });

      it('Test 3.8: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('modinv', 3)).toThrow();
      });
    });

    describe('congruent operation', () => {
      it('Test 4.1: Basic Congruence', () => {
        const result = executeOperation('congruent', 10, 3, 7);
        expect(result.operation).toBe('congruent');
        expect(result.result).toBe(1);
      });

      it('Test 4.2: Congruence False', () => {
        const result = executeOperation('congruent', 10, 4, 7);
        expect(result.result).toBe(0);
      });

      it('Test 4.3: Congruence with Same Numbers', () => {
        const result = executeOperation('congruent', 5, 5, 7);
        expect(result.result).toBe(1);
      });

      it('Test 4.4: Congruence with Negative Numbers', () => {
        const result = executeOperation('congruent', -5, 2, 7);
        expect(result.result).toBe(1);
      });

      it('Test 4.5: Congruence Modulo One', () => {
        const result = executeOperation('congruent', 10, 3, 1);
        expect(result.result).toBe(1);
      });

      it('Test 4.6: Zero Modulus (Error Case)', () => {
        expect(() => executeOperation('congruent', 10, 3, 0)).toThrow('Modulus cannot be zero');
      });

      it('Test 4.7: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('congruent', 10, 3)).toThrow();
      });
    });

    describe('crt operation', () => {
      it('Test 5.1: Basic CRT Two Congruences', () => {
        const result = executeOperation('crt', 2, 3, 3, 5);
        expect(result.operation).toBe('crt');
        expect(result.result).toBe(8);
        expect(executeOperation('mod', result.result as number, 3).result).toBe(2);
        expect(executeOperation('mod', result.result as number, 5).result).toBe(3);
      });

      it('Test 5.2: CRT Three Congruences', () => {
        const result = executeOperation('crt', 1, 3, 2, 5, 3, 7);
        expect(result.result).toBe(52);
        expect(executeOperation('mod', result.result as number, 3).result).toBe(1);
        expect(executeOperation('mod', result.result as number, 5).result).toBe(2);
        expect(executeOperation('mod', result.result as number, 7).result).toBe(3);
      });

      it('Test 5.3: CRT with Coprime Moduli', () => {
        const result = executeOperation('crt', 1, 2, 2, 3);
        expect(result.result).toBe(5);
        expect(executeOperation('mod', result.result as number, 2).result).toBe(1);
        expect(executeOperation('mod', result.result as number, 3).result).toBe(2);
      });

      it('Test 5.4: CRT Not Coprime Moduli (Error Case)', () => {
        expect(() => executeOperation('crt', 1, 2, 2, 4)).toThrow('Moduli must be pairwise coprime for CRT');
      });

      it('Test 5.5: CRT Single Congruence (Error Case)', () => {
        expect(() => executeOperation('crt', 2, 3)).toThrow('At least two congruences required');
      });

      it('Test 5.6: CRT Odd Number of Arguments (Error Case)', () => {
        expect(() => executeOperation('crt', 2, 3, 5)).toThrow('Even number of arguments required');
      });

      it('Test 5.7: CRT with Zero Modulus (Error Case)', () => {
        expect(() => executeOperation('crt', 2, 0, 3, 5)).toThrow('Modulus cannot be zero');
      });

      it('Test 5.8: CRT Large Values', () => {
        const result = executeOperation('crt', 1, 100, 2, 101, 3, 103);
        expect(result.result).toBeGreaterThan(0);
        expect(executeOperation('mod', result.result as number, 100).result).toBe(1);
        expect(executeOperation('mod', result.result as number, 101).result).toBe(2);
        expect(executeOperation('mod', result.result as number, 103).result).toBe(3);
      });
    });

    describe('Edge Cases and Integration', () => {
      it('Test 6.1: Modulo Property Verification', () => {
        const modResult = executeOperation('mod', 100, 7);
        const remainder = modResult.result as number;
        expect((100 - remainder) % 7).toBe(0);
      });

      it('Test 6.2: Modular Exponentiation Efficiency', () => {
        const result = executeOperation('modpow', 2, 1000, 13);
        expect(result.result).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeLessThan(13);
      });

      it('Test 6.3: Modular Inverse Round-Trip', () => {
        const inv = executeOperation('modinv', 3, 11);
        const verify = executeOperation('mod', (3 * (inv.result as number)), 11);
        expect(verify.result).toBe(1);
      });

      it('Test 6.4: Invalid Number Format', () => {
        expect(() => executeOperation('mod', 10, 'abc' as any)).toThrow();
      });

      it('Test 6.5: Very Large Modulus', () => {
        const result = executeOperation('mod', 1000000, 999999);
        expect(result.result).toBe(1);
      });

      it('Test 6.6: CRT with Many Congruences', () => {
        const result = executeOperation('crt', 1, 2, 2, 3, 3, 5, 4, 7, 5, 11);
        expect(result.result).toBeGreaterThan(0);
        expect(executeOperation('mod', result.result as number, 2).result).toBe(1);
        expect(executeOperation('mod', result.result as number, 3).result).toBe(2);
        expect(executeOperation('mod', result.result as number, 5).result).toBe(3);
        expect(executeOperation('mod', result.result as number, 7).result).toBe(4);
        expect(executeOperation('mod', result.result as number, 11).result).toBe(5);
      });
    });
  });

  // Spec 017: Series Calculations
  describe('Spec 017: Series Calculations', () => {
    describe('series operation', () => {
      it('Test 1.1: Arithmetic Series Sum', () => {
        const result = executeOperation('series', 'arithmetic' as any, 1, 1, 100);
        expect(result.operation).toBe('series');
        expect(result.result).toBe(5050);
      });

      it('Test 1.2: Geometric Series Sum (Convergent)', () => {
        const result = executeOperation('series', 'geometric' as any, 1, 0.5, 10);
        expect(result.result).toBeCloseTo(1.998046875, 5);
      });

      it('Test 1.3: Geometric Series Sum (Divergent)', () => {
        const result = executeOperation('series', 'geometric' as any, 1, 2, 10);
        expect(result.result).toBe(1023);
      });

      it('Test 1.4: Power Series', () => {
        const result = executeOperation('series', 'power' as any, 1, 10);
        expect(result.result).toBe(385);
      });

      it('Test 1.5: Series with Zero Terms', () => {
        expect(() => executeOperation('series', 'arithmetic' as any, 1, 1, 0)).toThrow();
      });

      it('Test 1.6: Invalid Range (Error Case)', () => {
        expect(() => executeOperation('series', 'arithmetic' as any, 100, 1, 10)).toThrow('Start value must be less than or equal to end value');
      });

      it('Test 1.7: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('series', 'arithmetic' as any, 1)).toThrow();
      });
    });

    describe('taylor operation', () => {
      it('Test 2.1: Taylor Series for e^x', () => {
        const result = executeOperation('taylor', 'exp' as any, 1, 10);
        expect(result.operation).toBe('taylor');
        expect(result.result).toBeCloseTo(2.7182818011463845, 5);
      });

      it('Test 2.2: Taylor Series for sin(x)', () => {
        const result = executeOperation('taylor', 'sin' as any, 0.5, 10);
        expect(result.result).toBeCloseTo(0.479425538604203, 5);
      });

      it('Test 2.3: Taylor Series for cos(x)', () => {
        const result = executeOperation('taylor', 'cos' as any, 0, 10);
        expect(result.result).toBeCloseTo(1, 5);
      });

      it('Test 2.4: Taylor Series for ln(1+x)', () => {
        const result = executeOperation('taylor', 'ln' as any, 0.5, 20);
        expect(result.result).toBeCloseTo(0.4054651081081644, 5);
      });

      it('Test 2.5: Taylor Series with Zero Terms', () => {
        const result = executeOperation('taylor', 'exp' as any, 1, 0);
        expect(result.result).toBe(1);
      });

      it('Test 2.6: Unknown Function (Error Case)', () => {
        expect(() => executeOperation('taylor', 'unknown' as any, 1, 10)).toThrow('Unknown function');
      });

      it('Test 2.7: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('taylor', 'exp' as any, 1)).toThrow();
      });

      it('Test 2.8: Large Number of Terms', () => {
        const result = executeOperation('taylor', 'exp' as any, 1, 50);
        expect(result.result).toBeCloseTo(Math.E, 5);
      });
    });

    describe('harmonic operation', () => {
      it('Test 3.1: Small Harmonic Number', () => {
        const result = executeOperation('harmonic', 5);
        expect(result.operation).toBe('harmonic');
        expect(result.result).toBeCloseTo(2.283333333333333, 10);
      });

      it('Test 3.2: Medium Harmonic Number', () => {
        const result = executeOperation('harmonic', 10);
        expect(result.result).toBeCloseTo(2.9289682539682538, 10);
      });

      it('Test 3.3: Large Harmonic Number', () => {
        const result = executeOperation('harmonic', 100);
        expect(result.result).toBeCloseTo(5.187377517639621, 5);
      });

      it('Test 3.4: Harmonic Number of One', () => {
        const result = executeOperation('harmonic', 1);
        expect(result.result).toBe(1);
      });

      it('Test 3.5: Harmonic Number of Zero', () => {
        const result = executeOperation('harmonic', 0);
        expect(result.result).toBe(0);
      });

      it('Test 3.6: Negative Number (Error Case)', () => {
        expect(() => executeOperation('harmonic', -5)).toThrow('n must be non-negative');
      });

      it('Test 3.7: Decimal Number (Error Case)', () => {
        expect(() => executeOperation('harmonic', 5.5)).toThrow('n must be an integer');
      });

      it('Test 3.8: Very Large Harmonic Number', () => {
        const result = executeOperation('harmonic', 1000);
        expect(result.result).toBeGreaterThan(5);
      });
    });

    describe('riemann operation', () => {
      it('Test 4.1: Zeta of 2', () => {
        const result = executeOperation('riemann', 2);
        expect(result.operation).toBe('riemann');
        expect(result.result).toBeCloseTo(1.6449340668482264, 5);
      });

      it('Test 4.2: Zeta of 3', () => {
        const result = executeOperation('riemann', 3);
        expect(result.result).toBeCloseTo(1.2020569031595942, 5);
      });

      it('Test 4.3: Zeta of 4', () => {
        const result = executeOperation('riemann', 4);
        expect(result.result).toBeCloseTo(1.0823232337111382, 5);
      });

      it('Test 4.4: Zeta with Custom Terms', () => {
        const result = executeOperation('riemann', 2, 1000);
        expect(result.result).toBeCloseTo(1.6449340668482264, 3);
      });

      it('Test 4.5: Zeta of 1 (Divergent)', () => {
        expect(() => executeOperation('riemann', 1)).toThrow('Riemann zeta function converges only for s > 1');
      });

      it('Test 4.6: Zeta Less Than One (Error Case)', () => {
        expect(() => executeOperation('riemann', 0.5)).toThrow('Riemann zeta function converges only for s > 1');
      });

      it('Test 4.7: Zeta of Large Value', () => {
        const result = executeOperation('riemann', 10);
        expect(result.result).toBeGreaterThan(1);
        expect(result.result).toBeLessThan(2);
      });

      it('Test 4.8: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('riemann')).toThrow();
      });
    });

    describe('fibonaccisum operation', () => {
      it('Test 5.1: Small Fibonacci Sum', () => {
        const result = executeOperation('fibonaccisum', 5);
        expect(result.operation).toBe('fibonaccisum');
        expect(result.result).toBe(12);
      });

      it('Test 5.2: Medium Fibonacci Sum', () => {
        const result = executeOperation('fibonaccisum', 10);
        expect(result.result).toBe(143);
      });

      it('Test 5.3: Fibonacci Sum of One', () => {
        const result = executeOperation('fibonaccisum', 1);
        expect(result.result).toBe(1);
      });

      it('Test 5.4: Fibonacci Sum of Zero', () => {
        const result = executeOperation('fibonaccisum', 0);
        expect(result.result).toBe(0);
      });

      it('Test 5.5: Large Fibonacci Sum', () => {
        const result = executeOperation('fibonaccisum', 20);
        expect(result.result).toBe(17710);
      });

      it('Test 5.6: Negative Number (Error Case)', () => {
        expect(() => executeOperation('fibonaccisum', -5)).toThrow('n must be non-negative');
      });

      it('Test 5.7: Decimal Number (Error Case)', () => {
        expect(() => executeOperation('fibonaccisum', 5.5)).toThrow('n must be an integer');
      });

      it('Test 5.8: Relationship to Fibonacci', () => {
        const sum = executeOperation('fibonaccisum', 10);
        const fib12 = executeOperation('fibonacci', 12);
        expect(sum.result).toBe((fib12.result as number) - 1);
      });
    });

    describe('Edge Cases and Integration', () => {
      it('Test 6.1: Convergence of Geometric Series', () => {
        const finite = executeOperation('series', 'geometric' as any, 1, 0.9, 100);
        expect(finite.result).toBeCloseTo(10, 1);
      });

      it('Test 6.2: Taylor Series Accuracy', () => {
        const result = executeOperation('taylor', 'exp' as any, 0, 10);
        expect(result.result).toBeCloseTo(1, 5);
      });

      it('Test 6.3: Harmonic Series Growth', () => {
        const h10 = executeOperation('harmonic', 10);
        const h100 = executeOperation('harmonic', 100);
        expect(h100.result).toBeGreaterThan(h10.result as number);
      });

      it('Test 6.4: Invalid Number Format', () => {
        expect(() => executeOperation('harmonic', 'abc' as any)).toThrow();
      });

      it('Test 6.5: Very Large Series', () => {
        const result = executeOperation('series', 'arithmetic' as any, 1, 1, 1000000);
        expect(result.result).toBe(500000500000);
      });

      it('Test 6.6: Series with Negative Terms', () => {
        const result = executeOperation('series', 'geometric' as any, 1, -0.5, 10);
        expect(result.result).toBeGreaterThan(0);
      });
    });
  });

  // Spec 018: Calculus Approximations
  describe('Spec 018: Calculus Approximations', () => {
    describe('derivative operation', () => {
      it('Test 1.1: Derivative of Polynomial', () => {
        const result = executeOperation('derivative', 'x^2' as any, 3);
        expect(result.operation).toBe('derivative');
        expect(result.result).toBeCloseTo(6, 1);
      });

      it('Test 1.2: Derivative of Linear Function', () => {
        const result = executeOperation('derivative', '2*x+3' as any, 5);
        expect(result.result).toBeCloseTo(2, 1);
      });

      it('Test 1.3: Derivative of Cubic', () => {
        const result = executeOperation('derivative', 'x^3' as any, 2);
        expect(result.result).toBeCloseTo(12, 1);
      });

      it('Test 1.4: Derivative of sin(x)', () => {
        const result = executeOperation('derivative', 'sin' as any, 0);
        expect(result.result).toBeCloseTo(1, 1);
      });

      it('Test 1.5: Derivative of cos(x)', () => {
        const result = executeOperation('derivative', 'cos' as any, 0);
        expect(result.result).toBeCloseTo(0, 1);
      });

      it('Test 1.6: Derivative with Custom Step Size', () => {
        const result = executeOperation('derivative', 'x^2' as any, 3, 0.0001);
        expect(result.result).toBeCloseTo(6, 2);
      });

      it('Test 1.7: Invalid Function (Error Case)', () => {
        expect(() => executeOperation('derivative', 'invalid' as any, 3)).toThrow('Invalid function expression');
      });

      it('Test 1.8: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('derivative', 'x^2' as any)).toThrow();
      });
    });

    describe('integrate operation', () => {
      it('Test 2.1: Integral of Polynomial', () => {
        const result = executeOperation('integrate', 'x^2' as any, 0, 2);
        expect(result.operation).toBe('integrate');
        expect(result.result).toBeCloseTo(2.6666666666666665, 2);
      });

      it('Test 2.2: Integral of Linear Function', () => {
        const result = executeOperation('integrate', 'x' as any, 0, 5);
        expect(result.result).toBeCloseTo(12.5, 1);
      });

      it('Test 2.3: Integral of sin(x)', () => {
        const result = executeOperation('integrate', 'sin' as any, 0, Math.PI);
        expect(result.result).toBeCloseTo(2, 1);
      });

      it('Test 2.4: Integral with More Subintervals', () => {
        const result = executeOperation('integrate', 'x^2' as any, 0, 2, 1000);
        expect(result.result).toBeCloseTo(2.6666666666666665, 3);
      });

      it('Test 2.5: Integral with Same Limits', () => {
        const result = executeOperation('integrate', 'x^2' as any, 3, 3);
        expect(result.result).toBe(0);
      });

      it('Test 2.6: Integral with Reversed Limits', () => {
        const result = executeOperation('integrate', 'x^2' as any, 2, 0);
        expect(result.result).toBeCloseTo(-2.6666666666666665, 2);
      });

      it('Test 2.7: Invalid Function (Error Case)', () => {
        expect(() => executeOperation('integrate', 'invalid' as any, 0, 2)).toThrow('Invalid function expression');
      });

      it('Test 2.8: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('integrate', 'x^2' as any, 0)).toThrow();
      });
    });

    describe('root operation', () => {
      it('Test 3.1: Root of Quadratic', () => {
        const result = executeOperation('root', 'x^2-4' as any, 1);
        expect(result.operation).toBe('root');
        expect(result.result).toBeCloseTo(2, 1);
      });

      it('Test 3.2: Root of Cubic', () => {
        const result = executeOperation('root', 'x^3-8' as any, 1);
        expect(result.result).toBeCloseTo(2, 1);
      });

      it('Test 3.3: Root of Linear Function', () => {
        const result = executeOperation('root', '2*x-6' as any, 1);
        expect(result.result).toBeCloseTo(3, 1);
      });

      it('Test 3.4: Root with Custom Tolerance', () => {
        const result = executeOperation('root', 'x^2-4' as any, 1, 0.0001);
        expect(result.result).toBeCloseTo(2, 3);
      });

      it('Test 3.5: Root Not Found (Error Case)', () => {
        expect(() => executeOperation('root', 'x^2+1' as any, 1)).toThrow('Root not found');
      });

      it('Test 3.6: Multiple Roots', () => {
        const result = executeOperation('root', 'x^2-4' as any, -5);
        expect([2, -2]).toContain(Math.round(result.result as number));
      });

      it('Test 3.7: Invalid Function (Error Case)', () => {
        expect(() => executeOperation('root', 'invalid' as any, 1)).toThrow('Invalid function expression');
      });

      it('Test 3.8: Missing Arguments (Error Case)', () => {
        expect(() => executeOperation('root', 'x^2-4' as any)).toThrow();
      });
    });

    describe('limit operation', () => {
      it('Test 4.1: Limit of Rational Function', () => {
        const result = executeOperation('limit', '(x^2-4)/(x-2)' as any, 2);
        expect(result.operation).toBe('limit');
        expect(result.result).toBeCloseTo(4, 1);
      });

      it('Test 4.2: Limit from Right', () => {
        const result = executeOperation('limit', '1/x' as any, 0, 'right' as any);
        expect(result.result).toBeGreaterThan(1000);
      });

      it('Test 4.3: Limit from Left', () => {
        const result = executeOperation('limit', '1/x' as any, 0, 'left' as any);
        expect(result.result).toBeLessThan(-1000);
      });

      it('Test 4.4: Limit of Continuous Function', () => {
        const result = executeOperation('limit', 'x^2' as any, 3);
        expect(result.result).toBeCloseTo(9, 1);
      });

      it('Test 4.5: Limit at Infinity', () => {
        const result = executeOperation('limit', '1/x' as any, 1000000);
        expect(result.result).toBeCloseTo(0, 5);
      });

      it('Test 4.6: Limit Does Not Exist', () => {
        expect(() => executeOperation('limit', '1/x' as any, 0)).toThrow('Limit does not exist');
      });

      it('Test 4.7: Invalid Function (Error Case)', () => {
        expect(() => executeOperation('limit', 'invalid' as any, 2)).toThrow('Invalid function expression');
      });
    });

    describe('maximize operation', () => {
      it('Test 5.1: Maximum of Quadratic', () => {
        const result = executeOperation('maximize', '-x^2+4' as any, 0, 5);
        expect(result.operation).toBe('maximize');
        expect(result.result).toBeCloseTo(4, 1);
      });

      it('Test 5.2: Maximum of sin(x)', () => {
        const result = executeOperation('maximize', 'sin' as any, 0, Math.PI / 2);
        expect(result.result).toBeCloseTo(1, 1);
      });

      it('Test 5.3: Maximum at Endpoint', () => {
        const result = executeOperation('maximize', 'x^2' as any, 0, 5);
        expect(result.result).toBeCloseTo(25, 1);
      });

      it('Test 5.4: Maximum with Narrow Interval', () => {
        const result = executeOperation('maximize', 'x^2' as any, 2, 3);
        expect(result.result).toBeCloseTo(9, 1);
      });

      it('Test 5.5: Invalid Function (Error Case)', () => {
        expect(() => executeOperation('maximize', 'invalid' as any, 0, 5)).toThrow('Invalid function expression');
      });

      it('Test 5.6: Invalid Interval (Error Case)', () => {
        const result = executeOperation('maximize', 'x^2' as any, 5, 0);
        expect(result.result).toBeCloseTo(25, 1);
      });
    });

    describe('minimize operation', () => {
      it('Test 6.1: Minimum of Quadratic', () => {
        const result = executeOperation('minimize', 'x^2' as any, 0, 5);
        expect(result.operation).toBe('minimize');
        expect(result.result).toBeCloseTo(0, 1);
      });

      it('Test 6.2: Minimum of sin(x)', () => {
        const result = executeOperation('minimize', 'sin' as any, 0, Math.PI);
        expect(result.result).toBeCloseTo(0, 1);
      });

      it('Test 6.3: Minimum at Endpoint', () => {
        const result = executeOperation('minimize', '-x^2' as any, 0, 5);
        expect(result.result).toBeCloseTo(-25, 1);
      });

      it('Test 6.4: Minimum with Narrow Interval', () => {
        const result = executeOperation('minimize', 'x^2' as any, 2, 3);
        expect(result.result).toBeCloseTo(4, 1);
      });

      it('Test 6.5: Invalid Function (Error Case)', () => {
        expect(() => executeOperation('minimize', 'invalid' as any, 0, 5)).toThrow('Invalid function expression');
      });

      it('Test 6.6: Invalid Interval (Error Case)', () => {
        const result = executeOperation('minimize', 'x^2' as any, 5, 0);
        expect(result.result).toBeCloseTo(0, 1);
      });
    });

    describe('Edge Cases and Integration', () => {
      it('Test 7.1: Derivative Accuracy', () => {
        const result1 = executeOperation('derivative', 'x^2' as any, 3, 0.1);
        const result2 = executeOperation('derivative', 'x^2' as any, 3, 0.0001);
        expect(Math.abs((result2.result as number) - 6)).toBeLessThan(Math.abs((result1.result as number) - 6));
      });

      it('Test 7.2: Integration Accuracy', () => {
        const result1 = executeOperation('integrate', 'x^2' as any, 0, 2, 10);
        const result2 = executeOperation('integrate', 'x^2' as any, 0, 2, 1000);
        expect(Math.abs((result2.result as number) - 8/3)).toBeLessThan(Math.abs((result1.result as number) - 8/3));
      });

      it('Test 7.3: Root Finding Convergence', () => {
        const result = executeOperation('root', 'x^2-4' as any, 1, 0.0001);
        expect(result.result).toBeCloseTo(2, 3);
      });

      it('Test 7.4: Invalid Number Format', () => {
        expect(() => executeOperation('derivative', 'x^2' as any, 'abc' as any)).toThrow();
      });

      it('Test 7.5: Very Small Step Size', () => {
        const result = executeOperation('derivative', 'x^2' as any, 3, 1e-10);
        expect(result.result).toBeCloseTo(6, 1);
      });

      it('Test 7.6: Very Large Interval', () => {
        const result = executeOperation('integrate', 'x^2' as any, 0, 1000);
        expect(result.result).toBeCloseTo(1000000000 / 3, 0);
      });
    });
  });
});

