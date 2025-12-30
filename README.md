# CLI Tool Example - Calculator

A comprehensive command-line interface (CLI) tool built with Node.js and TypeScript for performing mathematical operations, statistical calculations, unit conversions, expression evaluation, and batch processing. This project demonstrates a clean, maintainable, and easily extensible CLI tool architecture.

## Features

- 🧮 **Arithmetic Operations**: Add, subtract, multiply, divide, and more
- 📊 **Statistical Operations**: Mean, median, mode, standard deviation, variance, range
- 🔢 **Advanced Math**: Powers, roots, logarithms, trigonometric functions
- 🔄 **Number System Conversions**: Binary, hexadecimal, octal conversions
- 📈 **Percentage Calculations**: Various percentage operations
- 🎲 **Combinatorics**: Factorial, combinations, permutations
- 🔧 **GCD/LCM**: Greatest common divisor and least common multiple
- 📐 **Unit Conversions**: Length, weight, temperature, volume, time conversions
- 🧪 **Expression Evaluation**: Evaluate complex mathematical expressions
- 📁 **Batch Processing**: Process numbers from text, CSV, and JSON files
- 📝 **Type-Safe**: Built with TypeScript for type safety and better developer experience
- 🎯 **Extensible**: Easy to add new operations with minimal code changes
- ✅ **Error Handling**: Validates inputs and provides clear error messages
- 🏗️ **Modular Architecture**: Clean separation of concerns with organized code structure
- 🧪 **Tested**: Comprehensive test suite with Vitest

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

### Basic Syntax

```bash
calc <operation> <arguments...>
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

### Arithmetic Operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `add` | Add multiple numbers together | `calc add 5 3 10` |
| `subtract` | Subtract multiple numbers sequentially from the first | `calc subtract 10 4 2` |
| `multiply` | Multiply multiple numbers together | `calc multiply 6 7 2` |
| `divide` | Divide multiple numbers sequentially | `calc divide 20 4 2` |
| `pow` | Raise numbers to powers sequentially | `calc pow 2 3 2` |
| `sum` | Sum multiple numbers together | `calc sum 1 2 3 4 5` |
| `product` | Multiply multiple numbers together | `calc product 2 3 4` |
| `max` | Find the maximum value from multiple numbers | `calc max 1 5 3 9 2` |
| `min` | Find the minimum value from multiple numbers | `calc min 1 5 3 9 2` |

### Advanced Math Operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `sqrt` | Calculate the square root of a number | `calc sqrt 16` |
| `log` | Calculate the natural logarithm (base e) | `calc log 10` |
| `log10` | Calculate the base-10 logarithm | `calc log10 100` |
| `sin` | Calculate the sine of an angle in radians | `calc sin 0` |
| `cos` | Calculate the cosine of an angle in radians | `calc cos 0` |
| `tan` | Calculate the tangent of an angle in radians | `calc tan 0` |
| `abs` | Return the absolute value of a number | `calc abs -5` |
| `ceil` | Round a number up to the nearest integer | `calc ceil 4.3` |
| `floor` | Round a number down to the nearest integer | `calc floor 4.7` |
| `round` | Round a number to the nearest integer | `calc round 4.7` |

### Statistical Operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `mean` | Calculate the arithmetic mean (average) | `calc mean 2 4 6` |
| `median` | Find the median value | `calc median 1 3 5` |
| `mode` | Find the most frequent value(s) | `calc mode 1 2 2 3` |
| `stddev` | Calculate the population standard deviation | `calc stddev 2 4 6` |
| `variance` | Calculate the population variance | `calc variance 2 4 6` |
| `range` | Calculate the range (max - min) | `calc range 1 5 3` |

### Number System Conversions

| Operation | Description | Example |
|-----------|-------------|---------|
| `tobinary` | Convert decimal to binary | `calc tobinary 10` |
| `tohex` | Convert decimal to hexadecimal | `calc tohex 255` |
| `tooctal` | Convert decimal to octal | `calc tooctal 10` |
| `frombinary` | Convert binary to decimal | `calc frombinary 1010` |
| `fromhex` | Convert hexadecimal to decimal | `calc fromhex FF` |
| `fromoctal` | Convert octal to decimal | `calc fromoctal 12` |

### Percentage Calculations

| Operation | Description | Example |
|-----------|-------------|---------|
| `percent` | Calculate what percentage the first number is of the second | `calc percent 25 100` |
| `percentof` | Calculate a given percentage of a number | `calc percentof 25 100` |
| `percentchange` | Calculate percentage change from first to second number | `calc percentchange 100 120` |
| `addpercent` | Add a percentage to a number | `calc addpercent 100 10` |
| `subtractpercent` | Subtract a percentage from a number | `calc subtractpercent 100 10` |
| `percentincrease` | Calculate percentage increase needed | `calc percentincrease 100 120` |

### Combinatorics

| Operation | Description | Example |
|-----------|-------------|---------|
| `factorial` | Calculate factorial of a number (n!) | `calc factorial 5` |
| `combine` | Calculate combinations (n choose k) | `calc combine 5 2` |
| `permute` | Calculate permutations (n permute k) | `calc permute 5 2` |

### GCD/LCM Operations

| Operation | Description | Example |
|-----------|-------------|---------|
| `gcd` | Calculate greatest common divisor | `calc gcd 48 18` |
| `lcm` | Calculate least common multiple | `calc lcm 4 6` |

### Unit Conversions

| Operation | Description | Example |
|-----------|-------------|---------|
| `convert` | Convert between units (length, weight, temperature, volume, time) | `calc convert 100 meter foot` |

Supported unit categories:
- **Length**: meter, foot, inch, kilometer, mile, yard, centimeter, millimeter
- **Weight**: kilogram, pound, ounce, gram, ton
- **Temperature**: celsius, fahrenheit, kelvin
- **Volume**: liter, gallon, quart, pint, cup, milliliter
- **Time**: second, minute, hour, day, week, month, year

### Expression Evaluation

| Operation | Description | Example |
|-----------|-------------|---------|
| `eval` | Evaluate a mathematical expression string | `calc eval "2 + 3 * 4"` |

Supports:
- Basic arithmetic: `+`, `-`, `*`, `/`, `%`
- Powers: `^` or `**`
- Functions: `sin`, `cos`, `tan`, `log`, `sqrt`, `abs`, `ceil`, `floor`, `round`
- Constants: `pi`, `e`
- Parentheses for grouping

## Batch Operations

Process numbers from files using the `batch` command. Supports text files (space or custom delimited), CSV files, and JSON files.

### Syntax

```bash
calc batch <operation> <file_path> [options]
```

### Options

- `--format <format>`: File format (`text`, `csv`, or `json`). Auto-detects from extension if not specified.
- `--column <column>`: CSV column index (0-based) or column name. Required for CSV files with multiple columns.
- `--field <field>`: JSON field name for object arrays. Required for JSON files containing arrays of objects.
- `--delimiter <delimiter>`: Text file delimiter character (default: space). Use for text files with custom separators.

### Examples

```bash
# Process numbers from a text file (space-delimited)
calc batch sum numbers.txt

# Process numbers from a CSV file (specify column)
calc batch mean data.csv --format csv --column 2

# Process numbers from a CSV file (by column name)
calc batch max sales.csv --format csv --column revenue

# Process numbers from a JSON array
calc batch stddev values.json --format json

# Process numbers from a JSON array of objects
calc batch min data.json --format json --field value

# Process numbers from a comma-delimited text file
calc batch range data.txt --delimiter ","
```

**Note**: Only operations that accept multiple arguments are supported for batch processing. Unary operations (like `sqrt`, `factorial`) are not supported.

## Examples

### Basic Arithmetic

```bash
# Addition
calc add 5 3 10
# Output: Add Math Result: 18

# Subtraction
calc subtract 10 4 2
# Output: Subtract Math Result: 4

# Multiplication
calc multiply 6 7 2
# Output: Multiply Math Result: 84

# Division
calc divide 20 4 2
# Output: Divide Math Result: 2.5
```

### Statistical Analysis

```bash
# Calculate mean
calc mean 2 4 6 8 10
# Output: Mean Math Result: 6

# Calculate standard deviation
calc stddev 2 4 6 8 10
# Output: Stddev Math Result: 2.8284271247461903

# Find maximum
calc max 1 5 3 9 2
# Output: Max Math Result: 9
```

### Number Conversions

```bash
# Convert to binary
calc tobinary 10
# Output: Tobinary Math Result: 1010

# Convert from hex
calc fromhex FF
# Output: Fromhex Math Result: 255
```

### Expression Evaluation

```bash
# Evaluate expression
calc eval "2 + 3 * 4"
# Output: Eval Math Result: 14

# With functions
calc eval "sin(pi/2)"
# Output: Eval Math Result: 1
```

### Unit Conversions

```bash
# Convert meters to feet
calc convert 100 meter foot
# Output: Convert Math Result: 328.0839895013123

# Convert Celsius to Fahrenheit
calc convert 25 celsius fahrenheit
# Output: Convert Math Result: 77
```

## Development

### Running in Development Mode

Run the CLI tool directly with TypeScript (no build required):

```bash
npm run dev <operation> <arguments...>
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

### Testing

Run the test suite:

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Project Structure

```
cli-tool-example/
├── src/
│   ├── index.ts                  # Main CLI entry point
│   ├── operations.ts             # Operation registry and execution logic
│   ├── utils.ts                  # Validation and formatting utilities
│   ├── expression-evaluator.ts   # Mathematical expression evaluator
│   ├── batch.ts                  # Batch file processing
│   ├── fileParsers.ts            # File parsing utilities (text, CSV, JSON)
│   └── *.test.ts                 # Test files
├── dist/                         # Compiled JavaScript (generated)
├── implemented/                  # Feature implementation documentation
├── test-files/                   # Test data files
├── node_modules/                 # Dependencies (generated)
├── package.json                  # Project configuration
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Vitest test configuration
└── README.md                      # This file
```

## Extending the Tool

Adding a new operation is straightforward. Here's how to add a new operation (e.g., `modulo`):

### Step 1: Add the Operation Function

Edit `src/operations.ts` and add your operation to the `operations` object:

```typescript
export const operations: Record<string, Operation> = {
  // ... existing operations ...
  
  modulo: (num1: number, num2: number): number => {
    if (num2 === 0) {
      throw new Error('Modulo by zero is not allowed');
    }
    return num1 % num2;
  },
};
```

### Step 2: Add Operation Metadata

Add the description and example to the `operationDescriptions` object:

```typescript
export const operationDescriptions: Record<string, OperationMetadata> = {
  // ... existing descriptions ...
  
  modulo: {
    description: 'Get the remainder of dividing the first number by the second',
    example: 'calc modulo 10 3',
  },
};
```

### Step 3: Update Operation Sets (if needed)

If your operation is unary (requires only 1 argument), add it to the `unaryOperations` set:

```typescript
const unaryOperations = new Set([..., 'modulo']);
```

That's it! The new operation will automatically:
- Be available in the CLI
- Appear in the help command
- Be validated and executed like other operations
- Work with batch processing (if it accepts multiple arguments)

## Error Handling

The CLI tool includes comprehensive error handling:

- **Invalid Operation**: Shows available operations if an unknown operation is provided
- **Invalid Numbers**: Validates that arguments are valid numbers
- **Division by Zero**: Prevents division by zero with a clear error message
- **Invalid File Format**: Validates file formats and provides helpful error messages
- **Missing Required Arguments**: Validates argument counts based on operation type
- **File Not Found**: Clear error messages for missing files

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript version
- `npm run dev` - Run directly with TypeScript (development mode)
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Commander.js** - CLI framework for Node.js
- **Vitest** - Fast unit test framework
- **Node.js** - JavaScript runtime

## License

ISC

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
