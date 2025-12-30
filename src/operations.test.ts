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
});

