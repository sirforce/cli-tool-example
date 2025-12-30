/**
 * Type definition for binary mathematical operations
 */
export type BinaryOperation = (num1: number, num2: number) => number;

/**
 * Type definition for unary mathematical operations
 */
export type UnaryOperation = (num: number) => number;

/**
 * Type definition for n-ary mathematical operations
 */
export type NAryOperation = (...numbers: number[]) => number;

/**
 * Union type for all operations
 */
export type Operation = BinaryOperation | UnaryOperation | NAryOperation;

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
    description: 'Add multiple numbers together',
    example: 'calc add 5 3 10',
  },
  subtract: {
    description: 'Subtract multiple numbers sequentially from the first number',
    example: 'calc subtract 10 4 2',
  },
  multiply: {
    description: 'Multiply multiple numbers together',
    example: 'calc multiply 6 7 2',
  },
  divide: {
    description: 'Divide multiple numbers sequentially',
    example: 'calc divide 20 4 2',
  },
  pow: {
    description: 'Raise numbers to powers sequentially',
    example: 'calc pow 2 3 2',
  },
  sum: {
    description: 'Sum multiple numbers together',
    example: 'calc sum 1 2 3 4 5',
  },
  product: {
    description: 'Multiply multiple numbers together',
    example: 'calc product 2 3 4',
  },
  max: {
    description: 'Find the maximum value from multiple numbers',
    example: 'calc max 1 5 3 9 2',
  },
  min: {
    description: 'Find the minimum value from multiple numbers',
    example: 'calc min 1 5 3 9 2',
  },
  sqrt: {
    description: 'Calculate the square root of a number',
    example: 'calc sqrt 16',
  },
  log: {
    description: 'Calculate the natural logarithm (base e) of a number',
    example: 'calc log 10',
  },
  log10: {
    description: 'Calculate the base-10 logarithm of a number',
    example: 'calc log10 100',
  },
  sin: {
    description: 'Calculate the sine of an angle in radians',
    example: 'calc sin 0',
  },
  cos: {
    description: 'Calculate the cosine of an angle in radians',
    example: 'calc cos 0',
  },
  tan: {
    description: 'Calculate the tangent of an angle in radians',
    example: 'calc tan 0',
  },
  abs: {
    description: 'Return the absolute value of a number',
    example: 'calc abs -5',
  },
  ceil: {
    description: 'Round a number up to the nearest integer',
    example: 'calc ceil 4.3',
  },
  floor: {
    description: 'Round a number down to the nearest integer',
    example: 'calc floor 4.7',
  },
  round: {
    description: 'Round a number to the nearest integer',
    example: 'calc round 4.7',
  },
};

/**
 * Set of unary operations (require exactly 1 argument)
 */
const unaryOperations = new Set(['sqrt', 'log', 'log10', 'sin', 'cos', 'tan', 'abs', 'ceil', 'floor', 'round']);

/**
 * Set of n-ary operations (require 2+ arguments)
 * All operations now support multiple parameters
 */
const nAryOperations = new Set(['add', 'subtract', 'multiply', 'divide', 'pow', 'sum', 'product', 'max', 'min']);

/**
 * Mathematical operations
 * Supports both unary (1 argument) and n-ary (2+ arguments) operations
 */
export const operations: Record<string, ((...args: number[]) => number)> = {
  add: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return numbers.reduce((acc, num) => acc + num, 0);
  },
  
  subtract: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return numbers.reduce((acc, num, index) => {
      if (index === 0) {
        return num;
      }
      return acc - num;
    }, 0);
  },
  
  multiply: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return numbers.reduce((acc, num) => acc * num, 1);
  },
  
  divide: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return numbers.reduce((acc, num, index) => {
      if (index === 0) {
        return num;
      }
      if (num === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return acc / num;
    }, 0);
  },
  
  pow: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return numbers.reduce((acc, num, index) => {
      if (index === 0) {
        return num;
      }
      return acc ** num;
    }, 0);
  },

  sum: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return numbers.reduce((acc, num) => acc + num, 0);
  },

  product: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return numbers.reduce((acc, num) => acc * num, 1);
  },

  max: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return Math.max(...numbers);
  },

  min: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    return Math.min(...numbers);
  },

  // Unary operations (require exactly 1 argument)
  sqrt: (num: number): number => {
    if (num < 0) {
      throw new Error('Square root of negative number is not allowed');
    }
    return Math.sqrt(num);
  },

  log: (num: number): number => {
    if (num <= 0) {
      throw new Error('Logarithm of zero or negative number is not allowed');
    }
    return Math.log(num);
  },

  log10: (num: number): number => {
    if (num <= 0) {
      throw new Error('Logarithm of zero or negative number is not allowed');
    }
    return Math.log10(num);
  },

  sin: (angle: number): number => {
    return Math.sin(angle);
  },

  cos: (angle: number): number => {
    return Math.cos(angle);
  },

  tan: (angle: number): number => {
    return Math.tan(angle);
  },

  abs: (num: number): number => {
    return Math.abs(num);
  },

  ceil: (num: number): number => {
    return Math.ceil(num);
  },

  floor: (num: number): number => {
    return Math.floor(num);
  },

  round: (num: number): number => {
    return Math.round(num);
  },
};

/**
 * Check if an operation is unary
 */
export const isUnaryOperation = (operation: string): boolean => {
  return unaryOperations.has(operation);
};

/**
 * Check if an operation is n-ary
 */
export const isNAryOperation = (operation: string): boolean => {
  return nAryOperations.has(operation);
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
 * Execute an operation (supports unary, binary, and n-ary)
 */
export function executeOperation(
  operation: string,
  ...args: number[]
): OperationResult {
  if (!isValidOperation(operation)) {
    throw new Error(`Unknown operation: ${operation}`);
  }

  const operationFn = operations[operation];
  
  // Check if operation is unary (requires exactly 1 argument)
  if (isUnaryOperation(operation)) {
    if (args.length !== 1) {
      throw new Error('Exactly 1 number is required');
    }
    const unaryFn = operationFn as UnaryOperation;
    const result = unaryFn(args[0]);
    return {
      result,
      operation,
    };
  }
  
  // Otherwise, it's n-ary (requires 2+ arguments)
  if (args.length < 2) {
    throw new Error('At least 2 numbers are required');
  }
  
  const nAryFn = operationFn as NAryOperation;
  const result = nAryFn(...args);
  
  return {
    result,
    operation,
  };
}

