# CLI Tool Example - Calculator

A command-line interface (CLI) tool built with Node.js and TypeScript for performing basic mathematical operations. This project demonstrates a clean, maintainable, and easily extensible CLI tool architecture.

## Features

- 🧮 **Basic Math Operations**: Add, subtract, multiply, and divide two numbers
- 📝 **Type-Safe**: Built with TypeScript for type safety and better developer experience
- 🎯 **Extensible**: Easy to add new operations with minimal code changes
- 📖 **Built-in Help**: Comprehensive help command showing all available operations
- ✅ **Error Handling**: Validates inputs and provides clear error messages
- 🏗️ **Modular Architecture**: Clean separation of concerns with organized code structure

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cli-tool-example
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. (Optional) Link the CLI tool globally:
```bash
npm link
```

After linking, you can use the `calc` command from anywhere on your system.

## Usage

### Basic Usage

```bash
calc <operation> <num1> <num2>
```

### Examples

```bash
# Addition
calc add 5 3
# Output: Add Math Result: 8

# Subtraction
calc subtract 10 4
# Output: Subtract Math Result: 6

# Multiplication
calc multiply 6 7
# Output: Multiply Math Result: 42

# Division
calc divide 20 4
# Output: Divide Math Result: 5
```

### Help Command

View all available operations and usage information:

```bash
calc --help
# or
calc -h
# or
calc help
```

## Available Operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `add` | Add two numbers together | `calc add 5 3` |
| `subtract` | Subtract the second number from the first | `calc subtract 10 4` |
| `multiply` | Multiply two numbers together | `calc multiply 6 7` |
| `divide` | Divide the first number by the second | `calc divide 20 4` |

## Development

### Running in Development Mode

Run the CLI tool directly with TypeScript (no build required):

```bash
npm run dev <operation> <num1> <num2>
```

Example:
```bash
npm run dev add 5 3
```

### Building the Project

Compile TypeScript to JavaScript:

```bash
npm run build
```

The compiled files will be output to the `dist/` directory.

### Project Structure

```
cli-tool-example/
├── src/
│   ├── index.ts          # Main CLI entry point
│   ├── operations.ts     # Operation registry and execution logic
│   └── utils.ts          # Validation and formatting utilities
├── dist/                 # Compiled JavaScript (generated)
├── node_modules/         # Dependencies (generated)
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Extending the Tool

Adding a new operation is straightforward. Here's how to add a new operation (e.g., `power`):

### Step 1: Add the Operation Function

Edit `src/operations.ts` and add your operation to the `operations` object:

```typescript
export const operations: Record<string, Operation> = {
  // ... existing operations ...
  
  power: (num1: number, num2: number): number => Math.pow(num1, num2),
};
```

### Step 2: Add Operation Metadata

Add the description and example to the `operationDescriptions` object:

```typescript
export const operationDescriptions: Record<string, OperationMetadata> = {
  // ... existing descriptions ...
  
  power: {
    description: 'Raise the first number to the power of the second number',
    example: 'calc power 2 8',
  },
};
```

That's it! The new operation will automatically:
- Be available in the CLI
- Appear in the help command
- Be validated and executed like other operations

### Example: Adding Modulo Operation

```typescript
// In operations.ts

// Add to operationDescriptions
modulo: {
  description: 'Get the remainder of dividing the first number by the second',
  example: 'calc modulo 10 3',
},

// Add to operations
modulo: (num1: number, num2: number): number => {
  if (num2 === 0) {
    throw new Error('Modulo by zero is not allowed');
  }
  return num1 % num2;
},
```

## Error Handling

The CLI tool includes comprehensive error handling:

- **Invalid Operation**: Shows available operations if an unknown operation is provided
- **Invalid Numbers**: Validates that both arguments are valid numbers
- **Division by Zero**: Prevents division by zero with a clear error message

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript version
- `npm run dev` - Run directly with TypeScript (development mode)

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Commander.js** - CLI framework for Node.js
- **Node.js** - JavaScript runtime

## License

ISC

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

