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
export const formatResult = (operation: string, result: number, modes?: number[]): string => {
  const operationName = operation.charAt(0).toUpperCase() + operation.slice(1);
  
  // Special handling for mode operation with multiple modes
  if (operation === 'mode' && modes && modes.length > 1) {
    const modesStr = modes.join(', ');
    return `${operationName} Math Result: ${modesStr}`;
  }
  
  return `${operationName} Math Result: ${result}`;
};

