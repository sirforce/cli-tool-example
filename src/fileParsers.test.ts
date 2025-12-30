import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFileSync, writeFileSync, unlinkSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { parseTextFile, parseCsvFile, parseJsonFile, detectFileFormat } from './fileParsers';

describe('fileParsers', () => {
  const testDir = join(__dirname, '..', 'test-files-parsers');
  
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

  describe('parseTextFile', () => {
    it('should parse text file with one number per line (Test 1.1)', () => {
      const filePath = join(testDir, 'p_test1.txt');
      writeFileSync(filePath, '10\n20\n30\n40\n50');
      
      const numbers = parseTextFile(filePath);
      expect(numbers).toEqual([10, 20, 30, 40, 50]);
    });

    it('should parse text file with space-separated numbers (Test 1.4)', () => {
      const filePath = join(testDir, 'p_test4.txt');
      writeFileSync(filePath, '10 20 30 40 50');
      
      const numbers = parseTextFile(filePath);
      expect(numbers).toEqual([10, 20, 30, 40, 50]);
    });

    it('should parse text file with custom delimiter (Test 4.7)', () => {
      const filePath = join(testDir, 'p_custom.txt');
      writeFileSync(filePath, '10,20,30,40,50');
      
      const numbers = parseTextFile(filePath, ',');
      expect(numbers).toEqual([10, 20, 30, 40, 50]);
    });

    it('should parse text file with mixed formats (Test 4.8)', () => {
      const filePath = join(testDir, 'p_mixed.txt');
      writeFileSync(filePath, '10 20\n30 40\n50');
      
      const numbers = parseTextFile(filePath);
      expect(numbers).toEqual([10, 20, 30, 40, 50]);
    });

    it('should skip invalid numbers and continue (Test 1.6)', () => {
      const filePath = join(testDir, 'p_invalid.txt');
      writeFileSync(filePath, '10\nabc\n20\n30');
      
      const numbers = parseTextFile(filePath);
      expect(numbers).toEqual([10, 20, 30]);
    });

    it('should throw error for empty file (Test 1.5)', () => {
      const filePath = join(testDir, 'p_empty.txt');
      writeFileSync(filePath, '');
      
      expect(() => parseTextFile(filePath)).toThrow('File contains no valid numbers');
    });

    it('should throw error for file with only whitespace (Test 4.5)', () => {
      const filePath = join(testDir, 'p_whitespace.txt');
      writeFileSync(filePath, '   \n  \n  ');
      
      expect(() => parseTextFile(filePath)).toThrow('File contains no valid numbers');
    });

    it('should throw error for file not found (Test 1.7)', () => {
      const filePath = join(testDir, 'p_nonexistent.txt');
      
      expect(() => parseTextFile(filePath)).toThrow(/File not found/);
    });

    it('should handle relative file path (Test 4.2)', () => {
      const filePath = join(testDir, 'p_relative.txt');
      writeFileSync(filePath, '10\n20\n30');
      
      const relativePath = join('test-files-parsers', 'p_relative.txt');
      const numbers = parseTextFile(relativePath);
      expect(numbers).toEqual([10, 20, 30]);
    });

    it('should handle large file efficiently (Test 4.4)', () => {
      const filePath = join(testDir, 'p_large.txt');
      const numbers = Array.from({ length: 1000 }, (_, i) => i + 1);
      writeFileSync(filePath, numbers.join('\n'));
      
      const parsed = parseTextFile(filePath);
      expect(parsed.length).toBe(1000);
      expect(parsed[0]).toBe(1);
      expect(parsed[999]).toBe(1000);
    });

    it('should handle empty lines', () => {
      const filePath = join(testDir, 'p_emptylines.txt');
      writeFileSync(filePath, '10\n\n20\n\n30');
      
      const numbers = parseTextFile(filePath);
      expect(numbers).toEqual([10, 20, 30]);
    });
  });

  describe('parseCsvFile', () => {
    it('should parse CSV with single column (Test 2.1)', () => {
      const filePath = join(testDir, 'p_data1.csv');
      writeFileSync(filePath, 'value\n10\n20\n30\n40\n50');
      
      const numbers = parseCsvFile(filePath);
      expect(numbers).toEqual([10, 20, 30, 40, 50]);
    });

    it('should parse CSV with column index (Test 2.2)', () => {
      const filePath = join(testDir, 'p_data2.csv');
      writeFileSync(filePath, 'name,value\nitem1,10\nitem2,20\nitem3,30');
      
      const numbers = parseCsvFile(filePath, 1);
      expect(numbers).toEqual([10, 20, 30]);
    });

    it('should parse CSV with column name (Test 2.3)', () => {
      const filePath = join(testDir, 'p_data3.csv');
      writeFileSync(filePath, 'name,value\nitem1,10\nitem2,25\nitem3,15');
      
      const numbers = parseCsvFile(filePath, 'value');
      expect(numbers).toEqual([10, 25, 15]);
    });

    it('should parse CSV with headers and column name (Test 2.4)', () => {
      const filePath = join(testDir, 'p_data4.csv');
      writeFileSync(filePath, 'id,amount\n1,100\n2,200\n3,300');
      
      const numbers = parseCsvFile(filePath, 'amount');
      expect(numbers).toEqual([100, 200, 300]);
    });

    it('should throw error for invalid column index (Test 2.5)', () => {
      const filePath = join(testDir, 'p_data5.csv');
      writeFileSync(filePath, 'value\n10\n20');
      
      expect(() => parseCsvFile(filePath, 10)).toThrow(/out of range/);
    });

    it('should skip non-numeric values (Test 2.6)', () => {
      const filePath = join(testDir, 'p_data6.csv');
      writeFileSync(filePath, 'value\n10\nabc\n20\n30');
      
      const numbers = parseCsvFile(filePath);
      expect(numbers).toEqual([10, 20, 30]);
    });

    it('should throw error for file not found', () => {
      const filePath = join(testDir, 'p_nonexistent.csv');
      
      expect(() => parseCsvFile(filePath)).toThrow(/File not found/);
    });

    it('should auto-detect first numeric column when no column specified', () => {
      const filePath = join(testDir, 'p_autodetect.csv');
      writeFileSync(filePath, 'name,value\nitem1,10\nitem2,20\nitem3,30');
      
      const numbers = parseCsvFile(filePath);
      expect(numbers).toEqual([10, 20, 30]);
    });

    it('should handle CSV with numeric column index 0', () => {
      const filePath = join(testDir, 'p_col0.csv');
      writeFileSync(filePath, '10,value\n20,item2\n30,item3');
      
      const numbers = parseCsvFile(filePath, 0);
      expect(numbers).toEqual([10, 20, 30]);
    });

    it('should throw error for empty CSV file', () => {
      const filePath = join(testDir, 'p_empty.csv');
      writeFileSync(filePath, '');
      
      expect(() => parseCsvFile(filePath)).toThrow(/File contains no valid numbers/);
    });
  });

  describe('parseJsonFile', () => {
    it('should parse JSON array of numbers (Test 3.1)', () => {
      const filePath = join(testDir, 'p_values1.json');
      writeFileSync(filePath, '[10, 20, 30, 40, 50]');
      
      const numbers = parseJsonFile(filePath);
      expect(numbers).toEqual([10, 20, 30, 40, 50]);
    });

    it('should parse JSON array of objects with field (Test 3.2)', () => {
      const filePath = join(testDir, 'p_values2.json');
      writeFileSync(filePath, '[{"value": 10}, {"value": 20}, {"value": 30}]');
      
      const numbers = parseJsonFile(filePath, 'value');
      expect(numbers).toEqual([10, 20, 30]);
    });

    it('should parse JSON array without field (Test 3.3)', () => {
      const filePath = join(testDir, 'p_values3.json');
      writeFileSync(filePath, '[5, 15, 10, 25, 20]');
      
      const numbers = parseJsonFile(filePath);
      expect(numbers).toEqual([5, 15, 10, 25, 20]);
    });

    it('should throw error for invalid JSON (Test 3.4)', () => {
      const filePath = join(testDir, 'p_invalid.json');
      writeFileSync(filePath, '{invalid json}');
      
      expect(() => parseJsonFile(filePath)).toThrow(/Invalid JSON format/);
    });

    it('should throw error for JSON array of objects without field (Test 3.5)', () => {
      const filePath = join(testDir, 'p_values4.json');
      writeFileSync(filePath, '[{"value": 10}, {"value": 20}]');
      
      expect(() => parseJsonFile(filePath)).toThrow(/Field name required for JSON object arrays/);
    });

    it('should throw error for JSON not an array (Test 3.6)', () => {
      const filePath = join(testDir, 'p_values5.json');
      writeFileSync(filePath, '{"value": 10}');
      
      expect(() => parseJsonFile(filePath)).toThrow(/JSON must be an array/);
    });

    it('should throw error for file not found', () => {
      const filePath = join(testDir, 'p_nonexistent.json');
      
      expect(() => parseJsonFile(filePath)).toThrow(/File not found/);
    });

    it('should throw error for empty JSON array', () => {
      const filePath = join(testDir, 'p_empty.json');
      writeFileSync(filePath, '[]');
      
      expect(() => parseJsonFile(filePath)).toThrow(/File contains no valid numbers/);
    });

    it('should handle JSON with mixed number types', () => {
      const filePath = join(testDir, 'p_mixed.json');
      writeFileSync(filePath, '[10, 20.5, 30, 40.25, 50]');
      
      const numbers = parseJsonFile(filePath);
      expect(numbers).toEqual([10, 20.5, 30, 40.25, 50]);
    });

    it('should skip non-numeric values in JSON array', () => {
      const filePath = join(testDir, 'p_skipnon.json');
      writeFileSync(filePath, '[10, "abc", 20, null, 30]');
      
      const numbers = parseJsonFile(filePath);
      expect(numbers).toEqual([10, 20, 30]);
    });
  });

  describe('detectFileFormat', () => {
    it('should detect CSV format', () => {
      expect(detectFileFormat('data.csv')).toBe('csv');
      expect(detectFileFormat('test/data.CSV')).toBe('csv');
    });

    it('should detect JSON format', () => {
      expect(detectFileFormat('data.json')).toBe('json');
      expect(detectFileFormat('test/values.JSON')).toBe('json');
    });

    it('should default to text format', () => {
      expect(detectFileFormat('data.txt')).toBe('text');
      expect(detectFileFormat('data')).toBe('text');
      expect(detectFileFormat('data.unknown')).toBe('text');
    });
  });
});
