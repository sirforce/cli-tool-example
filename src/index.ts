#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('add')
  .description('A CLI tool to add two numbers together')
  .version('1.0.0')
  .argument('<num1>', 'First number to add', parseFloat)
  .argument('<num2>', 'Second number to add', parseFloat)
  .action((num1: number, num2: number) => {
    if (isNaN(num1) || isNaN(num2)) {
      console.error('Error: Both arguments must be valid numbers');
      process.exit(1);
    }
    
    const result: number = num1 + num2;
    console.log(`Addition Math Result: ${result}`);
  });

program.parse();

