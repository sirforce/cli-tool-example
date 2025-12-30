import { parseIntegerNumber, parseBinaryNumber, parseHexNumber, parseOctalNumber } from './utils';

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
  result: number | string;
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
  tobinary: {
    description: 'Convert a decimal number to its binary representation',
    example: 'calc tobinary 10',
  },
  tohex: {
    description: 'Convert a decimal number to its hexadecimal representation',
    example: 'calc tohex 255',
  },
  tooctal: {
    description: 'Convert a decimal number to its octal representation',
    example: 'calc tooctal 10',
  },
  frombinary: {
    description: 'Convert a binary number to its decimal representation',
    example: 'calc frombinary 1010',
  },
  fromhex: {
    description: 'Convert a hexadecimal number to its decimal representation',
    example: 'calc fromhex FF',
  },
  fromoctal: {
    description: 'Convert an octal number to its decimal representation',
    example: 'calc fromoctal 12',
  },
  factorial: {
    description: 'Calculate the factorial of a non-negative integer (n!)',
    example: 'calc factorial 5',
  },
  combine: {
    description: 'Calculate the number of ways to choose k items from n items without regard to order (n choose k)',
    example: 'calc combine 5 2',
  },
  permute: {
    description: 'Calculate the number of ways to arrange k items from n items with regard to order (n permute k)',
    example: 'calc permute 5 2',
  },
  gcd: {
    description: 'Calculate the greatest common divisor of multiple numbers',
    example: 'calc gcd 48 18',
  },
  lcm: {
    description: 'Calculate the least common multiple of multiple numbers',
    example: 'calc lcm 4 6',
  },
  percent: {
    description: 'Calculate what percentage the first number is of the second number',
    example: 'calc percent 25 100',
  },
  percentof: {
    description: 'Calculate a given percentage of a number',
    example: 'calc percentof 25 100',
  },
  percentchange: {
    description: 'Calculate the percentage change from the first number to the second number',
    example: 'calc percentchange 100 120',
  },
  addpercent: {
    description: 'Add a percentage to a number',
    example: 'calc addpercent 100 10',
  },
  subtractpercent: {
    description: 'Subtract a percentage from a number',
    example: 'calc subtractpercent 100 10',
  },
  percentincrease: {
    description: 'Calculate what percentage increase is needed to go from the first number to the second number',
    example: 'calc percentincrease 100 120',
  },
};

/**
 * Set of unary operations (require exactly 1 argument)
 */
const unaryOperations = new Set(['sqrt', 'log', 'log10', 'sin', 'cos', 'tan', 'abs', 'ceil', 'floor', 'round', 'tobinary', 'tohex', 'tooctal', 'frombinary', 'fromhex', 'fromoctal', 'factorial']);

/**
 * Set of n-ary operations (require 2+ arguments)
 * All operations now support multiple parameters
 */
const nAryOperations = new Set(['add', 'subtract', 'multiply', 'divide', 'pow', 'sum', 'product', 'max', 'min', 'mean', 'median', 'mode', 'stddev', 'variance', 'range', 'combine', 'permute', 'gcd', 'lcm', 'percent', 'percentof', 'percentchange', 'addpercent', 'subtractpercent', 'percentincrease']);

/**
 * Validate that a number is a non-negative integer
 */
const validateNonNegativeInteger = (value: number, name: string): void => {
  if (!Number.isInteger(value)) {
    throw new Error(`${name} must be an integer`);
  }
  if (value < 0) {
    throw new Error(`${name} must be non-negative`);
  }
};

/**
 * Calculate factorial using BigInt for large numbers
 * Returns a number if within safe range, otherwise returns BigInt as number
 */
const factorialBigInt = (n: bigint): bigint => {
  if (n === 0n || n === 1n) {
    return 1n;
  }
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * Convert BigInt to number if within safe range, otherwise return as number (may lose precision)
 */
const bigIntToNumber = (value: bigint): number => {
  if (value <= BigInt(Number.MAX_SAFE_INTEGER)) {
    return Number(value);
  }
  // For very large numbers, convert to number (may lose precision but spec allows it)
  return Number(value);
};

/**
 * Mathematical operations
 * Supports both unary (1 argument) and n-ary (2+ arguments) operations
 * Also supports conversion operations that take strings or return strings
 */
export const operations: Record<string, ((...args: any[]) => number | string)> = {
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

  // Percentage operations (require exactly 2 arguments)
  percent: (...numbers: number[]): number => {
    if (numbers.length !== 2) {
      throw new Error('Exactly 2 numbers are required');
    }
    const [part, total] = numbers;
    if (total === 0) {
      throw new Error('Cannot calculate percentage: total cannot be zero');
    }
    return (part / total) * 100;
  },

  percentof: (...numbers: number[]): number => {
    if (numbers.length !== 2) {
      throw new Error('Exactly 2 numbers are required');
    }
    const [percentage, number] = numbers;
    return (percentage / 100) * number;
  },

  percentchange: (...numbers: number[]): number => {
    if (numbers.length !== 2) {
      throw new Error('Exactly 2 numbers are required');
    }
    const [oldValue, newValue] = numbers;
    if (oldValue === 0) {
      throw new Error('Cannot calculate percentage change: old value cannot be zero');
    }
    return ((newValue - oldValue) / oldValue) * 100;
  },

  addpercent: (...numbers: number[]): number => {
    if (numbers.length !== 2) {
      throw new Error('Exactly 2 numbers are required');
    }
    const [number, percentage] = numbers;
    return number + (percentage / 100) * number;
  },

  subtractpercent: (...numbers: number[]): number => {
    if (numbers.length !== 2) {
      throw new Error('Exactly 2 numbers are required');
    }
    const [number, percentage] = numbers;
    return number - (percentage / 100) * number;
  },

  percentincrease: (...numbers: number[]): number => {
    if (numbers.length !== 2) {
      throw new Error('Exactly 2 numbers are required');
    }
    const [oldValue, newValue] = numbers;
    if (oldValue === 0) {
      throw new Error('Cannot calculate percentage increase: old value cannot be zero');
    }
    return ((newValue - oldValue) / oldValue) * 100;
  },

  // Number system conversion operations (unary, return strings for "to" operations)
  tobinary: (num: number): string => {
    // Validate integer
    if (!Number.isInteger(num)) {
      throw new Error('Only integers can be converted to binary');
    }
    
    // Handle negative numbers
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    
    // Convert to binary
    const binary = absNum.toString(2);
    
    return isNegative ? `-${binary}` : binary;
  },

  tohex: (num: number): string => {
    // Validate integer
    if (!Number.isInteger(num)) {
      throw new Error('Only integers can be converted to hexadecimal');
    }
    
    // Handle negative numbers
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    
    // Convert to hex (uppercase)
    const hex = absNum.toString(16).toUpperCase();
    
    return isNegative ? `-${hex}` : hex;
  },

  tooctal: (num: number): string => {
    // Validate integer
    if (!Number.isInteger(num)) {
      throw new Error('Only integers can be converted to octal');
    }
    
    // Handle negative numbers
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    
    // Convert to octal
    const octal = absNum.toString(8);
    
    return isNegative ? `-${octal}` : octal;
  },

  // Number system conversion operations (unary, accept strings for "from" operations)
  frombinary: (str: string): number => {
    return parseBinaryNumber(str);
  },

  fromhex: (str: string): number => {
    return parseHexNumber(str);
  },

  fromoctal: (str: string): number => {
    return parseOctalNumber(str);
  },

  // Factorial and combinatorics operations
  factorial: (n: number): number => {
    if (!Number.isInteger(n)) {
      throw new Error('Factorial is only defined for non-negative integers');
    }
    if (n < 0) {
      throw new Error('Factorial is only defined for non-negative integers');
    }
    const result = factorialBigInt(BigInt(n));
    return bigIntToNumber(result);
  },

  combine: (...numbers: number[]): number => {
    if (numbers.length !== 2) {
      throw new Error('Exactly 2 numbers are required');
    }
    const [n, k] = numbers;
    validateNonNegativeInteger(n, 'n');
    validateNonNegativeInteger(k, 'k');
    
    if (k > n) {
      throw new Error('k cannot be greater than n in combinations');
    }
    
    // Use symmetry property: C(n,k) = C(n,n-k) for efficiency
    const effectiveK = k > n - k ? n - k : k;
    
    // Handle edge cases
    if (effectiveK === 0) {
      return 1;
    }
    
    // Calculate C(n,k) = n! / (k! * (n-k)!) using iterative approach to avoid large factorials
    // C(n,k) = (n * (n-1) * ... * (n-k+1)) / (k * (k-1) * ... * 1)
    let numerator = 1n;
    let denominator = 1n;
    
    for (let i = 0; i < effectiveK; i++) {
      numerator *= BigInt(n - i);
      denominator *= BigInt(effectiveK - i);
    }
    
    const result = numerator / denominator;
    return bigIntToNumber(result);
  },

  permute: (...numbers: number[]): number => {
    if (numbers.length !== 2) {
      throw new Error('Exactly 2 numbers are required');
    }
    const [n, k] = numbers;
    validateNonNegativeInteger(n, 'n');
    validateNonNegativeInteger(k, 'k');
    
    if (k > n) {
      throw new Error('k cannot be greater than n in permutations');
    }
    
    // Handle edge cases
    if (k === 0) {
      return 1;
    }
    
    // Calculate P(n,k) = n! / (n-k)! = n * (n-1) * ... * (n-k+1)
    let result = 1n;
    for (let i = 0; i < k; i++) {
      result *= BigInt(n - i);
    }
    
    return bigIntToNumber(result);
  },

  // GCD and LCM operations
  gcd: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }

    // Helper function to calculate GCD of two numbers using Euclidean algorithm
    const gcdTwo = (a: number, b: number): number => {
      // Take absolute values and round to integers
      a = Math.abs(Math.round(a));
      b = Math.abs(Math.round(b));

      // Handle zero cases
      if (a === 0 && b === 0) {
        throw new Error('GCD of (0, 0) is undefined');
      }
      if (a === 0) return b;
      if (b === 0) return a;

      // Euclidean algorithm
      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    };

    // Apply GCD pairwise: GCD(a, b, c) = GCD(GCD(a, b), c)
    return numbers.reduce((acc, num) => gcdTwo(acc, num));
  },

  lcm: (...numbers: number[]): number => {
    if (numbers.length < 2) {
      throw new Error('At least 2 numbers are required');
    }

    // Helper function to calculate LCM of two numbers using GCD
    const lcmTwo = (a: number, b: number): number => {
      // Take absolute values and round to integers
      a = Math.abs(Math.round(a));
      b = Math.abs(Math.round(b));

      // Handle zero case: LCM(0, n) = 0
      if (a === 0 || b === 0) {
        return 0;
      }

      // Use relationship: LCM(a, b) = |a * b| / GCD(a, b)
      const gcd = (x: number, y: number): number => {
        while (y !== 0) {
          const temp = y;
          y = x % y;
          x = temp;
        }
        return x;
      };

      return Math.abs(a * b) / gcd(a, b);
    };

    // Apply LCM pairwise: LCM(a, b, c) = LCM(LCM(a, b), c)
    return numbers.reduce((acc, num) => lcmTwo(acc, num));
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
  ...args: (number | string)[]
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
    
    // Handle "from" operations that accept strings
    const isFromOperation = operation === 'frombinary' || operation === 'fromhex' || operation === 'fromoctal';
    if (isFromOperation) {
      const result = operationFn(args[0] as string);
      return {
        result,
        operation,
      };
    }
    
    // Handle "to" operations that accept numbers
    const unaryFn = operationFn as UnaryOperation;
    const result = unaryFn(args[0] as number);
    return {
      result,
      operation,
    };
  }
  
  // Otherwise, it's n-ary (requires 2+ arguments)
  if (args.length < 2) {
    throw new Error('At least 2 numbers are required');
  }
  
  // Ensure all args are numbers for n-ary operations
  const numberArgs = args.map(arg => {
    if (typeof arg === 'string') {
      throw new Error('N-ary operations require numeric arguments');
    }
    return arg;
  });
  
  const nAryFn = operationFn as NAryOperation;
  const result = nAryFn(...numberArgs);
  
  // Special handling for mode operation to return modes array
  if (operation === 'mode') {
    const frequency: Map<number, number> = new Map();
    numberArgs.forEach(num => {
      frequency.set(num, (frequency.get(num) || 0) + 1);
    });
    const maxFreq = Math.max(...Array.from(frequency.values()));
    const modes = Array.from(frequency.entries())
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num, _]) => num)
      .sort((a, b) => a - b); // Sort for consistent output
    
    // Return modes array if: multiple modes exist, or all values are unique (all have frequency 1)
    const shouldReturnModes = modes.length > 1 || (modes.length === frequency.size && maxFreq === 1 && numberArgs.length > 1);
    
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

