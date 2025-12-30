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
  modes?: number[]; // For mode operation when multiple modes exist
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
  mean: {
    description: 'Calculate the arithmetic mean (average) of multiple numbers',
    example: 'calc mean 2 4 6',
  },
  median: {
    description: 'Find the median value from multiple numbers',
    example: 'calc median 1 3 5',
  },
  mode: {
    description: 'Find the most frequent value(s) from multiple numbers',
    example: 'calc mode 1 2 2 3',
  },
  stddev: {
    description: 'Calculate the population standard deviation of multiple numbers',
    example: 'calc stddev 2 4 6',
  },
  variance: {
    description: 'Calculate the population variance of multiple numbers',
    example: 'calc variance 2 4 6',
  },
  range: {
    description: 'Calculate the range (max - min) of multiple numbers',
    example: 'calc range 1 5 3',
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
const nAryOperations = new Set(['add', 'subtract', 'multiply', 'divide', 'pow', 'sum', 'product', 'max', 'min', 'mean', 'median', 'mode', 'stddev', 'variance', 'range']);

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

  // Statistical operations (require 2+ arguments)
  mean: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  },

  median: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
  },

  mode: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    const frequency: Map<number, number> = new Map();
    
    // Count frequency of each number
    numbers.forEach(num => {
      frequency.set(num, (frequency.get(num) || 0) + 1);
    });
    
    // Find maximum frequency
    const maxFreq = Math.max(...Array.from(frequency.values()));
    
    // Get all numbers with maximum frequency
    const modes = Array.from(frequency.entries())
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num, _]) => num);
    
    // Return first mode (for backward compatibility), modes array will be handled in executeOperation
    return modes[0];
  },

  stddev: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
    const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
    return Math.sqrt(variance);
  },

  variance: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
    return numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
  },

  range: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    return max - min;
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
  
  // Special handling for mode operation to return modes array
  if (operation === 'mode') {
    const frequency: Map<number, number> = new Map();
    args.forEach(num => {
      frequency.set(num, (frequency.get(num) || 0) + 1);
    });
    const maxFreq = Math.max(...Array.from(frequency.values()));
    const modes = Array.from(frequency.entries())
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num, _]) => num)
      .sort((a, b) => a - b); // Sort for consistent output
    
    // Return modes array if: multiple modes exist, or all values are unique (all have frequency 1)
    const shouldReturnModes = modes.length > 1 || (modes.length === frequency.size && maxFreq === 1 && args.length > 1);
    
    return {
      result,
      operation,
      modes: shouldReturnModes ? modes : undefined,
    };
  }
  
  return {
    result,
    operation,
  };
}

