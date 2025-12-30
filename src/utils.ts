/**
 * Validate that a value is a valid number
 */
export const validateNumber = (value: number, name: string): void => {
  if (isNaN(value)) {
    throw new Error(`${name} must be a valid number`);
  }
};

/**
 * Parse and validate number arguments
 */
export const parseNumbers = (num1Str: string, num2Str: string): [number, number] => {
  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);

  validateNumber(num1, 'First number');
  validateNumber(num2, 'Second number');

  return [num1, num2];
};

/**
 * Parse and validate a single number argument
 */
export const parseNumber = (numStr: string): number => {
  const num = parseFloat(numStr);
  validateNumber(num, 'Number');
  return num;
};

/**
 * Parse and validate variable-length number arguments
 * Supports both unary (1+) and n-ary (2+) operations
 */
export const parseNumbersArray = (numberStrings: string[], minCount: number = 2): number[] => {
  if (numberStrings.length < minCount) {
    throw new Error(`At least ${minCount} number${minCount > 1 ? 's' : ''} ${minCount > 1 ? 'are' : 'is'} required`);
  }

  const numbers = numberStrings.map((str, index) => {
    const num = parseFloat(str);
    validateNumber(num, `Number at position ${index + 1}`);
    return num;
  });

  return numbers;
};

/**
 * Format operation result for display
 */
export const formatResult = (operation: string, result: number | string, modes?: number[]): string => {
  const operationName = operation.charAt(0).toUpperCase() + operation.slice(1);
  
  // Special handling for mode operation with multiple modes
  if (operation === 'mode' && modes && modes.length > 1) {
    const modesStr = modes.join(', ');
    return `${operationName} Math Result: ${modesStr}`;
  }
  
  return `${operationName} Math Result: ${result}`;
};

/**
 * Parse and validate an integer number (for "to" conversion operations)
 */
export const parseIntegerNumber = (numStr: string): number => {
  const num = parseFloat(numStr);
  validateNumber(num, 'Number');
  
  // Check if it's an integer
  if (!Number.isInteger(num)) {
    throw new Error('Only integers can be converted');
  }
  
  return num;
};

/**
 * Parse and validate a binary number (with optional 0b prefix)
 */
export const parseBinaryNumber = (str: string): number => {
  if (!str || str.trim() === '') {
    throw new Error('Invalid binary format. Binary numbers can only contain 0 and 1');
  }
  
  // Remove optional 0b prefix (case-insensitive)
  let binaryStr = str.trim();
  if (binaryStr.toLowerCase().startsWith('0b')) {
    binaryStr = binaryStr.slice(2);
  }
  
  // Validate format: only 0 and 1
  if (!/^[01]+$/.test(binaryStr)) {
    throw new Error('Invalid binary format. Binary numbers can only contain 0 and 1');
  }
  
  // Convert to decimal
  return parseInt(binaryStr, 2);
};

/**
 * Parse and validate a hexadecimal number (with optional 0x prefix)
 */
export const parseHexNumber = (str: string): number => {
  if (!str || str.trim() === '') {
    throw new Error('Invalid hexadecimal format. Hexadecimal numbers can only contain 0-9 and A-F');
  }
  
  // Remove optional 0x prefix (case-insensitive)
  let hexStr = str.trim();
  if (hexStr.toLowerCase().startsWith('0x')) {
    hexStr = hexStr.slice(2);
  }
  
  // Validate format: only 0-9 and A-F (case-insensitive)
  if (!/^[0-9A-Fa-f]+$/.test(hexStr)) {
    throw new Error('Invalid hexadecimal format. Hexadecimal numbers can only contain 0-9 and A-F');
  }
  
  // Convert to decimal
  return parseInt(hexStr, 16);
};

/**
 * Parse and validate an octal number (with optional 0o prefix)
 */
export const parseOctalNumber = (str: string): number => {
  if (!str || str.trim() === '') {
    throw new Error('Invalid octal format. Octal numbers can only contain 0-7');
  }
  
  // Remove optional 0o prefix (case-insensitive)
  let octalStr = str.trim();
  if (octalStr.toLowerCase().startsWith('0o')) {
    octalStr = octalStr.slice(2);
  }
  
  // Validate format: only 0-7
  if (!/^[0-7]+$/.test(octalStr)) {
    throw new Error('Invalid octal format. Octal numbers can only contain 0-7');
  }
  
  // Convert to decimal
  return parseInt(octalStr, 8);
};

