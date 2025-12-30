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

      // Validate and parse numbers
      const validatedNumbers = parseNumbersArray(numbers, minCount);

      // Execute operation
      const { result, operation: op } = executeOperation(operation, ...validatedNumbers);

      // Display result
      console.log(formatResult(op, result));
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
  
  return helpText;
});

program.parse();
