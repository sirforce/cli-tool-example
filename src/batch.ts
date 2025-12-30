import { executeOperation, isUnaryOperation, OperationResult } from './operations';
import { parseTextFile, parseCsvFile, parseJsonFile, detectFileFormat } from './fileParsers';

/**
 * Options for batch operations
 */
export interface BatchOptions {
  format?: 'text' | 'csv' | 'json';
  column?: string | number;
  field?: string;
  delimiter?: string;
}

/**
 * Check if an operation supports batch mode (multiple arguments)
 */
export function isBatchOperationSupported(operation: string): boolean {
  return !isUnaryOperation(operation);
}

/**
 * Execute a batch operation on numbers from a file
 */
export function executeBatchOperation(
  operation: string,
  filePath: string,
  options: BatchOptions = {}
): OperationResult {
  // Validate that operation supports batch mode
  if (!isBatchOperationSupported(operation)) {
    throw new Error(`Operation '${operation}' does not support batch mode (requires single argument)`);
  }

  // Determine file format
  const format = options.format || detectFileFormat(filePath);
  
  // Parse file based on format
  let numbers: number[];
  
  try {
    switch (format) {
      case 'csv':
        numbers = parseCsvFile(filePath, options.column);
        break;
      case 'json':
        numbers = parseJsonFile(filePath, options.field);
        break;
      case 'text':
      default:
        numbers = parseTextFile(filePath, options.delimiter);
        break;
    }
  } catch (error) {
    // Re-throw file parsing errors as-is
    throw error;
  }
  
  // Validate that we have at least 2 numbers (required for n-ary operations)
  if (numbers.length < 2) {
    throw new Error('At least 2 numbers are required for batch operations');
  }
  
  // Execute the operation
  const result = executeOperation(operation, ...numbers);
  
  // Return result with operation name "batch" (as per spec Test 1.1)
  return {
    result: result.result,
    operation: 'batch',
    modes: result.modes,
  };
}

