import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFileSync, unlinkSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { executeBatchOperation, isBatchOperationSupported } from './batch';
import { OperationResult } from './operations';

describe('batch', () => {
  const testDir = join(__dirname, '..', 'test-files-batch');
  
  beforeEach(() => {
    // Create test directory if it doesn't exist
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up all files in test directory
    try {
      if (existsSync(testDir)) {
        const files = readdirSync(testDir);
        files.forEach(file => {
          try {
            unlinkSync(join(testDir, file));
          } catch (e) {
            // Ignore errors
          }
        });
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('isBatchOperationSupported', () => {
    it('should return true for n-ary operations', () => {
      expect(isBatchOperationSupported('sum')).toBe(true);
      expect(isBatchOperationSupported('mean')).toBe(true);
      expect(isBatchOperationSupported('max')).toBe(true);
      expect(isBatchOperationSupported('min')).toBe(true);
      expect(isBatchOperationSupported('add')).toBe(true);
      expect(isBatchOperationSupported('multiply')).toBe(true);
    });

    it('should return false for unary operations', () => {
      expect(isBatchOperationSupported('sqrt')).toBe(false);
      expect(isBatchOperationSupported('log')).toBe(false);
      expect(isBatchOperationSupported('abs')).toBe(false);
      expect(isBatchOperationSupported('tobinary')).toBe(false);
    });
  });

  describe('executeBatchOperation', () => {
    describe('Text file operations', () => {
      it('should execute sum operation on text file (Test 1.1)', () => {
        const filePath = join(testDir, 'b_test1.txt');
        writeFileSync(filePath, '10\n20\n30\n40\n50');
        
        const result = executeBatchOperation('sum', filePath, { format: 'text' });
        expect(result.result).toBe(150);
        expect(result.operation).toBe('batch');
      });

      it('should execute mean operation on text file (Test 1.2)', () => {
        const filePath = join(testDir, 'b_test2.txt');
        writeFileSync(filePath, '10\n20\n30\n40\n50');
        
        const result = executeBatchOperation('mean', filePath, { format: 'text' });
        expect(result.result).toBe(30);
        expect(result.operation).toBe('batch');
      });

      it('should execute max operation on text file (Test 1.3)', () => {
        const filePath = join(testDir, 'b_test3.txt');
        writeFileSync(filePath, '5\n15\n10\n25\n20');
        
        const result = executeBatchOperation('max', filePath, { format: 'text' });
        expect(result.result).toBe(25);
        expect(result.operation).toBe('batch');
      });

      it('should handle space-separated numbers (Test 1.4)', () => {
        const filePath = join(testDir, 'b_test4_space.txt');
        writeFileSync(filePath, '10 20 30 40 50');
        
        const result = executeBatchOperation('sum', filePath, { format: 'text' });
        expect(result.result).toBe(150);
      });

      it('should handle custom delimiter (Test 4.7)', () => {
        const filePath = join(testDir, 'b_test4_delim.txt');
        writeFileSync(filePath, '10,20,30,40,50');
        
        const result = executeBatchOperation('sum', filePath, { format: 'text', delimiter: ',' });
        expect(result.result).toBe(150);
      });

      it('should throw error for empty file (Test 1.5)', () => {
        const filePath = join(testDir, 'b_empty.txt');
        writeFileSync(filePath, '');
        
        expect(() => executeBatchOperation('sum', filePath, { format: 'text' }))
          .toThrow('File contains no valid numbers');
      });

      it('should skip invalid numbers (Test 1.6)', () => {
        const filePath = join(testDir, 'b_invalid.txt');
        writeFileSync(filePath, '10\nabc\n20\n30');
        
        const result = executeBatchOperation('sum', filePath, { format: 'text' });
        expect(result.result).toBe(60);
      });

      it('should throw error for file not found (Test 1.7)', () => {
        const filePath = join(testDir, 'b_nonexistent.txt');
        
        expect(() => executeBatchOperation('sum', filePath, { format: 'text' }))
          .toThrow(/File not found/);
      });
    });

    describe('CSV file operations', () => {
      it('should execute sum operation on CSV file (Test 2.1)', () => {
        const filePath = join(testDir, 'b_data1.csv');
        writeFileSync(filePath, 'value\n10\n20\n30\n40\n50');
        
        const result = executeBatchOperation('sum', filePath, { format: 'csv' });
        expect(result.result).toBe(150);
        expect(result.operation).toBe('batch');
      });

      it('should execute mean operation with column index (Test 2.2)', () => {
        const filePath = join(testDir, 'b_data2.csv');
        writeFileSync(filePath, 'name,value\nitem1,10\nitem2,20\nitem3,30');
        
        const result = executeBatchOperation('mean', filePath, { format: 'csv', column: 1 });
        expect(result.result).toBe(20);
      });

      it('should execute max operation with column name (Test 2.3)', () => {
        const filePath = join(testDir, 'b_data3.csv');
        writeFileSync(filePath, 'name,value\nitem1,10\nitem2,25\nitem3,15');
        
        const result = executeBatchOperation('max', filePath, { format: 'csv', column: 'value' });
        expect(result.result).toBe(25);
      });

      it('should execute sum with column name (Test 2.4)', () => {
        const filePath = join(testDir, 'b_data4.csv');
        writeFileSync(filePath, 'id,amount\n1,100\n2,200\n3,300');
        
        const result = executeBatchOperation('sum', filePath, { format: 'csv', column: 'amount' });
        expect(result.result).toBe(600);
      });

      it('should throw error for invalid column index (Test 2.5)', () => {
        const filePath = join(testDir, 'b_data5.csv');
        writeFileSync(filePath, 'value\n10\n20');
        
        expect(() => executeBatchOperation('sum', filePath, { format: 'csv', column: 10 }))
          .toThrow(/out of range/);
      });

      it('should skip non-numeric values (Test 2.6)', () => {
        const filePath = join(testDir, 'b_data6.csv');
        writeFileSync(filePath, 'value\n10\nabc\n20\n30');
        
        const result = executeBatchOperation('sum', filePath, { format: 'csv' });
        expect(result.result).toBe(60);
      });
    });

    describe('JSON file operations', () => {
      it('should execute sum operation on JSON array (Test 3.1)', () => {
        const filePath = join(testDir, 'b_values1.json');
        writeFileSync(filePath, '[10, 20, 30, 40, 50]');
        
        const result = executeBatchOperation('sum', filePath, { format: 'json' });
        expect(result.result).toBe(150);
        expect(result.operation).toBe('batch');
      });

      it('should execute mean operation on JSON array of objects (Test 3.2)', () => {
        const filePath = join(testDir, 'b_values2.json');
        writeFileSync(filePath, '[{"value": 10}, {"value": 20}, {"value": 30}]');
        
        const result = executeBatchOperation('mean', filePath, { format: 'json', field: 'value' });
        expect(result.result).toBe(20);
      });

      it('should execute max operation on JSON array (Test 3.3)', () => {
        const filePath = join(testDir, 'b_values3.json');
        writeFileSync(filePath, '[5, 15, 10, 25, 20]');
        
        const result = executeBatchOperation('max', filePath, { format: 'json' });
        expect(result.result).toBe(25);
      });

      it('should throw error for invalid JSON (Test 3.4)', () => {
        const filePath = join(testDir, 'b_invalid.json');
        writeFileSync(filePath, '{invalid json}');
        
        expect(() => executeBatchOperation('sum', filePath, { format: 'json' }))
          .toThrow(/Invalid JSON format/);
      });

      it('should throw error for JSON objects without field (Test 3.5)', () => {
        const filePath = join(testDir, 'b_values4.json');
        writeFileSync(filePath, '[{"value": 10}, {"value": 20}]');
        
        expect(() => executeBatchOperation('sum', filePath, { format: 'json' }))
          .toThrow(/Field name required for JSON object arrays/);
      });

      it('should throw error for JSON not an array (Test 3.6)', () => {
        const filePath = join(testDir, 'b_values5.json');
        writeFileSync(filePath, '{"value": 10}');
        
        expect(() => executeBatchOperation('sum', filePath, { format: 'json' }))
          .toThrow(/JSON must be an array/);
      });
    });

    describe('Edge cases and error handling', () => {
      it('should throw error for unary operation (Test 4.1)', () => {
        const filePath = join(testDir, 'b_test_unary.txt');
        writeFileSync(filePath, '10\n20\n30');
        
        expect(() => executeBatchOperation('sqrt', filePath, { format: 'text' }))
          .toThrow(/does not support batch mode/);
      });

      it('should auto-detect format from file extension (Test 4.6)', () => {
        const filePath = join(testDir, 'b_autodetect.json');
        writeFileSync(filePath, '[10, 20, 30]');
        
        const result = executeBatchOperation('sum', filePath, {});
        expect(result.result).toBe(60);
      });

      it('should handle relative file path (Test 4.2)', () => {
        const filePath = join(testDir, 'b_relative.txt');
        writeFileSync(filePath, '10\n20\n30');
        
        const relativePath = join('test-files-batch', 'b_relative.txt');
        const result = executeBatchOperation('sum', relativePath, { format: 'text' });
        expect(result.result).toBe(60);
      });

      it('should handle large file (Test 4.4)', () => {
        const filePath = join(testDir, 'b_large.txt');
        const numbers = Array.from({ length: 1000 }, (_, i) => i + 1);
        writeFileSync(filePath, numbers.join('\n'));
        
        const result = executeBatchOperation('sum', filePath, { format: 'text' });
        expect(result.result).toBe(500500); // Sum of 1 to 1000
      });

      it('should handle mixed line formats (Test 4.8)', () => {
        const filePath = join(testDir, 'b_mixed.txt');
        writeFileSync(filePath, '10 20\n30 40\n50');
        
        const result = executeBatchOperation('sum', filePath, { format: 'text' });
        expect(result.result).toBe(150);
      });

      it('should throw error for whitespace-only file (Test 4.5)', () => {
        const filePath = join(testDir, 'b_whitespace.txt');
        writeFileSync(filePath, '   \n  \n  ');
        
        expect(() => executeBatchOperation('sum', filePath, { format: 'text' }))
          .toThrow(/File contains no valid numbers/);
      });
    });

    describe('Operation validation', () => {
      it('should support all n-ary operations', () => {
        const filePath = join(testDir, 'b_ops.txt');
        writeFileSync(filePath, '10\n20\n30');
        
        const operations = ['sum', 'mean', 'max', 'min', 'median', 'stddev', 'variance', 'range'];
        
        operations.forEach(op => {
          expect(() => executeBatchOperation(op, filePath, { format: 'text' })).not.toThrow();
        });
      });

      it('should reject all unary operations', () => {
        const filePath = join(testDir, 'b_unary.txt');
        writeFileSync(filePath, '10\n20\n30');
        
        const operations = ['sqrt', 'log', 'log10', 'sin', 'cos', 'tan', 'abs', 'ceil', 'floor', 'round'];
        
        operations.forEach(op => {
          expect(() => executeBatchOperation(op, filePath, { format: 'text' }))
            .toThrow(/does not support batch mode/);
        });
      });
    });
  });
});
