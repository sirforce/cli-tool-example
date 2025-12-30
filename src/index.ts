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
  .description('A CLI tool for basic mathematical operations')
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

      // Check if this is a "from" operation or "eval" operation (needs string input)
      const isFromOperation = operation === 'frombinary' || operation === 'fromhex' || operation === 'fromoctal';
      const isEvalOperation = operation === 'eval';
      
      let result: { result: number | string; operation: string; modes?: number[] };
      
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
  .description('Perform operations on numbers from a file')
  .argument('<operation>', 'Operation to perform')
  .argument('<file_path>', 'Path to file containing numbers')
  .option('--format <format>', 'File format: text, csv, or json', 'text')
  .option('--column <column>', 'CSV column index (0-based) or column name')
  .option('--field <field>', 'JSON field name for object arrays')
  .option('--delimiter <delimiter>', 'Text file delimiter character', ' ')
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
  
  operations.forEach(op => {
    helpText += `\n  ${op.name.padEnd(12)} ${op.description}\n`;
    helpText += `  ${' '.repeat(12)} Example: ${op.example}\n`;
  });
  
  helpText += '\nBatch Operations:\n';
  helpText += '\n  batch         Perform operations on numbers from a file\n';
  helpText += '                 Example: calc batch sum numbers.txt\n';
  helpText += '                 Example: calc batch mean data.csv --format csv --column value\n';
  helpText += '                 Example: calc batch max values.json --format json --field value\n';
  
  return helpText;
});

program.parse();
