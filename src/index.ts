#!/usr/bin/env node

import { Command } from 'commander';
import { 
  executeOperation, 
  getAvailableOperations, 
  isValidOperation,
  getAllOperationsWithDescriptions,
  isUnaryOperation
} from './operations';
import { parseNumbers, formatResult, parseNumbersArray } from './utils';
import { executeBatchOperation } from './batch';

const program = new Command();

program
  .name('calc')
  .description('A comprehensive CLI tool for mathematical operations including arithmetic, statistics, unit conversions, expression evaluation, and batch processing')
  .version('1.0.0')
  .allowUnknownOption(true) // Allow negative numbers to be parsed as arguments
  .argument('<operation>', `Operation to perform: ${getAvailableOperations().join(', ')}`)
  .argument('<numbers...>', 'Numbers to operate on', (value, prev: string[] = []) => {
    prev.push(value);
    return prev;
  })
  .action((operation: string, numbers: string[]) => {
    try {
      // Validate operation
      if (!isValidOperation(operation)) {
        console.error(`Error: Unknown operation "${operation}"`);
        console.error(`Available operations: ${getAvailableOperations().join(', ')}`);
        process.exit(1);
      }

      // Determine minimum number of arguments required based on operation type
      const minCount = isUnaryOperation(operation) ? 1 : 2;

      // Check if this is a "from" operation, "eval" operation, or "convert" operation (needs special handling)
      const isFromOperation = operation === 'frombinary' || operation === 'fromhex' || operation === 'fromoctal';
      const isEvalOperation = operation === 'eval';
      const isConvertOperation = operation === 'convert';
      const isSequenceOperation = operation === 'fibonacci' || operation === 'arithmetic' || operation === 'geometric';
      const isPrimeCountOperation = operation === 'primes' && numbers[0] === '--count';
      const isRandomIntegerFlag = operation === 'random' && (numbers.includes('--integer') || numbers.includes('--int'));
      const isRiemannOperation = operation === 'riemann';
      
      let result: { result: number | string; operation: string; modes?: number[] };

      const parseNum = (value: string, name: string): number => {
        const n = parseFloat(value);
        if (Number.isNaN(n)) {
          throw new Error(`Invalid number format for ${name}: ${value}`);
        }
        return n;
      };
      
      if (isFromOperation) {
        // For "from" operations, pass the raw string argument
        if (numbers.length < minCount) {
          throw new Error(`At least ${minCount} argument${minCount > 1 ? 's' : ''} ${minCount > 1 ? 'are' : 'is'} required`);
        }
        result = executeOperation(operation, numbers[0] as any);
      } else if (isEvalOperation) {
        // For "eval" operation, join all arguments as the expression string
        if (numbers.length < 1) {
          throw new Error('At least 1 argument is required');
        }
        const expression = numbers.join(' ');
        result = executeOperation(operation, expression as any);
      } else if (isConvertOperation) {
        // For "convert" operation, first arg is number, next two are strings
        if (numbers.length !== 3) {
          throw new Error('Exactly 3 arguments are required');
        }
        const value = parseFloat(numbers[0]);
        if (isNaN(value)) {
          throw new Error(`Invalid number format: ${numbers[0]}`);
        }
        result = executeOperation(operation, value, numbers[1], numbers[2]);
      } else if (isPrimeCountOperation) {
        if (numbers.length !== 2) {
          throw new Error('Usage: calc primes --count <n>');
        }
        const count = parseNum(numbers[1], 'count');
        result = executeOperation(operation, '--count' as any, count as any);
      } else if (isRiemannOperation) {
        if (numbers.length < 1 || numbers.length > 2) {
          throw new Error('Usage: calc riemann <s> [terms]');
        }
        const s = parseNum(numbers[0], 's');
        if (numbers.length === 2) {
          const terms = parseNum(numbers[1], 'terms');
          result = executeOperation(operation, s, terms);
        } else {
          result = executeOperation(operation, s);
        }
      } else if (isSequenceOperation) {
        // Support --sequence flag for sequence operations
        const hasSequence = numbers.includes('--sequence');
        const cleaned = numbers.filter(n => n !== '--sequence');
        
        if (operation === 'fibonacci') {
          if (cleaned.length !== 1) {
            throw new Error(hasSequence ? 'Usage: calc fibonacci --sequence <n>' : 'Usage: calc fibonacci <n>');
          }
          const n = parseNum(cleaned[0], 'n');
          result = hasSequence ? executeOperation(operation, n, '--sequence' as any) : executeOperation(operation, n);
        } else {
          // arithmetic/geometric
          if (cleaned.length !== 3) {
            throw new Error(hasSequence ? `Usage: calc ${operation} --sequence <first> <step_or_ratio> <count>` : `Usage: calc ${operation} <first> <step_or_ratio> <n>`);
          }
          const a = parseNum(cleaned[0], 'first');
          const b = parseNum(cleaned[1], operation === 'arithmetic' ? 'difference' : 'ratio');
          const c = parseNum(cleaned[2], hasSequence ? 'count' : 'n');
          result = hasSequence ? executeOperation(operation, a, b, c, '--sequence' as any) : executeOperation(operation, a, b, c);
        }
      } else if (operation === 'random') {
        // Support: calc random; calc random <min> <max>; calc random [--integer|--int] <min> <max>
        const integerFlag = numbers.includes('--integer') ? '--integer' : (numbers.includes('--int') ? '--int' : null);
        const cleaned = numbers.filter(n => n !== '--integer' && n !== '--int');
        if (cleaned.length === 0) {
          result = executeOperation(operation);
        } else if (cleaned.length === 2) {
          const min = parseNum(cleaned[0], 'min');
          const max = parseNum(cleaned[1], 'max');
          result = isRandomIntegerFlag ? executeOperation(operation, min, max, integerFlag as any) : executeOperation(operation, min, max);
        } else {
          throw new Error('Usage: calc random [--integer|--int] <min> <max>');
        }
      } else {
        // For other operations, parse numbers normally
        const validatedNumbers = parseNumbersArray(numbers, minCount);
        result = executeOperation(operation, ...validatedNumbers);
      }

      // Display result
      console.log(formatResult(result.operation, result.result, result.modes));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(`Error: ${errorMessage}`);
      process.exit(1);
    }
  });

// Add batch command
program
  .command('batch')
  .description('Perform operations on numbers from a file. Supports text files (space or custom delimited), CSV files, and JSON files. Only operations that accept multiple arguments are supported.')
  .argument('<operation>', `Operation to perform (must support multiple arguments): ${getAvailableOperations().filter(op => !isUnaryOperation(op)).join(', ')}`)
  .argument('<file_path>', 'Path to file containing numbers')
  .option('--format <format>', 'File format: text, csv, or json. If not specified, auto-detects from file extension (.csv, .json, or default to text)')
  .option('--column <column>', 'CSV column index (0-based) or column name. Required for CSV files with multiple columns.')
  .option('--field <field>', 'JSON field name for object arrays. Required for JSON files containing arrays of objects.')
  .option('--delimiter <delimiter>', 'Text file delimiter character (default: space). Use for text files with custom separators like comma or tab.', ' ')
  .action((operation: string, filePath: string, options: any) => {
    try {
      // Validate operation
      if (!isValidOperation(operation)) {
        console.error(`Error: Unknown operation "${operation}"`);
        console.error(`Available operations: ${getAvailableOperations().join(', ')}`);
        process.exit(1);
      }

      // Parse column option - can be number or string
      let column: string | number | undefined = options.column;
      if (column !== undefined && typeof column === 'string') {
        const columnNum = parseInt(column, 10);
        if (!isNaN(columnNum) && columnNum.toString() === column) {
          column = columnNum;
        }
      }

      // Execute batch operation
      const result = executeBatchOperation(operation, filePath, {
        format: options.format,
        column: column,
        field: options.field,
        delimiter: options.delimiter,
      });

      // Display result
      console.log(formatResult(result.operation, result.result, result.modes));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(`Error: ${errorMessage}`);
      process.exit(1);
    }
  });

// Add custom help text showing all available operations
program.addHelpText('after', () => {
  const operations = getAllOperationsWithDescriptions();
  let helpText = '\nAvailable Operations:\n';
  
  // Special operations that need additional usage notes
  const specialUsageNotes: Record<string, string> = {
    primes: '                 Usage: calc primes <limit> OR calc primes --count <n>',
    fibonacci: '                 Usage: calc fibonacci <n> OR calc fibonacci --sequence <n>',
    arithmetic: '                 Usage: calc arithmetic <first> <diff> <n> OR calc arithmetic --sequence <first> <diff> <count>',
    geometric: '                 Usage: calc geometric <first> <ratio> <n> OR calc geometric --sequence <first> <ratio> <count>',
    random: '                 Usage: calc random OR calc random <min> <max> OR calc random [--integer|--int] <min> <max>',
    riemann: '                 Usage: calc riemann <s> [terms] (terms is optional, defaults to 1000)',
    convert: '                 Usage: calc convert <value> <fromUnit> <toUnit>',
    eval: '                 Usage: calc eval "<expression>" (expression can contain spaces)',
  };
  
  operations.forEach(op => {
    helpText += `\n  ${op.name.padEnd(12)} ${op.description}\n`;
    helpText += `  ${' '.repeat(12)} Example: ${op.example}\n`;
    if (specialUsageNotes[op.name]) {
      helpText += `  ${specialUsageNotes[op.name]}\n`;
    }
  });
  
  helpText += '\nBatch Operations:\n';
  helpText += '\n  batch         Perform operations on numbers from a file\n';
  helpText += '                 Supports text, CSV, and JSON file formats\n';
  helpText += '                 Only operations that accept multiple arguments are supported\n';
  helpText += '                 \n';
  helpText += '                 Examples:\n';
  helpText += '                   calc batch sum numbers.txt\n';
  helpText += '                   calc batch mean data.csv --format csv --column 2\n';
  helpText += '                   calc batch max values.json --format json --field value\n';
  helpText += '                   calc batch stddev data.txt --delimiter ","\n';
  
  return helpText;
});

program.parse();
