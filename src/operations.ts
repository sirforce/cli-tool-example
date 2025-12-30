/**
 * Type definition for mathematical operations
 */
export type Operation = (num1: number, num2: number) => number;

/**
 * Operation result interface
 */
export interface OperationResult {
  result: number;
  operation: string;
}

/**
 * Operation metadata interface
 */
export interface OperationMetadata {
  description: string;
  example: string;
}

/**
 * Operation descriptions
 */
export const operationDescriptions: Record<string, OperationMetadata> = {
  add: {
    description: 'Add two numbers together',
    example: 'calc add 5 3',
  },
  subtract: {
    description: 'Subtract the second number from the first number',
    example: 'calc subtract 10 4',
  },
  multiply: {
    description: 'Multiply two numbers together',
    example: 'calc multiply 6 7',
  },
  divide: {
    description: 'Divide the first number by the second number',
    example: 'calc divide 20 4',
  },
  pow: {
    description: 'Raise the first number to the power of the second number',
    example: 'calc pow 2 3',
  },
};

/**
 * Mathematical operations
 */
export const operations: Record<string, Operation> = {
  add: (num1: number, num2: number): number => num1 + num2,
  
  subtract: (num1: number, num2: number): number => num1 - num2,
  
  multiply: (num1: number, num2: number): number => num1 * num2,
  
  divide: (num1: number, num2: number): number => {
    if (num2 === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return num1 / num2;
  },
  
  pow: (num1: number, num2: number): number => num1 ** num2,
};

/**
 * Get available operation names
 */
export const getAvailableOperations = (): string[] => {
  return Object.keys(operations);
};

/**
 * Get operation description
 */
export const getOperationDescription = (operation: string): string => {
  return operationDescriptions[operation]?.description || 'No description available';
};

/**
 * Get operation example
 */
export const getOperationExample = (operation: string): string => {
  return operationDescriptions[operation]?.example || '';
};

/**
 * Get all operations with their descriptions
 */
export const getAllOperationsWithDescriptions = (): Array<{ name: string; description: string; example: string }> => {
  return getAvailableOperations().map(op => ({
    name: op,
    description: getOperationDescription(op),
    example: getOperationExample(op),
  }));
};

/**
 * Check if an operation exists
 */
export const isValidOperation = (operation: string): boolean => {
  return operation in operations;
};

/**
 * Execute an operation
 */
export const executeOperation = (
  operation: string,
  num1: number,
  num2: number
): OperationResult => {
  if (!isValidOperation(operation)) {
    throw new Error(`Unknown operation: ${operation}`);
  }

  const operationFn = operations[operation];
  const result = operationFn(num1, num2);

  return {
    result,
    operation,
  };
};

