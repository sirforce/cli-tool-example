#!/usr/bin/env node

import { Command } from 'commander';
import { 
  executeOperation, 
  getAvailableOperations, 
  isValidOperation,
  getAllOperationsWithDescriptions 
} from './operations';
import { parseNumbers, formatResult } from './utils';

const program = new Command();

program
  .name('calc')
  .description('A CLI tool for basic mathematical operations')
  .version('1.0.0')
  .argument('<operation>', `Operation to perform: ${getAvailableOperations().join(', ')}`)
  .argument('<num1>', 'First number', parseFloat)
  .argument('<num2>', 'Second number', parseFloat)
  .action((operation: string, num1: number, num2: number) => {
    try {
      // Validate operation
      if (!isValidOperation(operation)) {
        console.error(`Error: Unknown operation "${operation}"`);
        console.error(`Available operations: ${getAvailableOperations().join(', ')}`);
        process.exit(1);
      }

      // Validate numbers
      const [validatedNum1, validatedNum2] = parseNumbers(num1.toString(), num2.toString());

      // Execute operation
      const { result, operation: op } = executeOperation(operation, validatedNum1, validatedNum2);

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
