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
 * Format operation result for display
 */
export const formatResult = (operation: string, result: number): string => {
  const operationName = operation.charAt(0).toUpperCase() + operation.slice(1);
  return `${operationName} Math Result: ${result}`;
};

