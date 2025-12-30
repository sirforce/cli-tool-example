# Spec 008: Expression Evaluation

## Overview
Add support for evaluating mathematical expressions as strings, enabling users to input complex calculations in a single command without needing separate operations.

## Feature Description
Extend the CLI tool to support a general expression evaluator that can parse and evaluate mathematical expressions containing numbers, operators, parentheses, and functions.

## Operations to Add

### 1. `eval` - Evaluate Expression
Evaluates a mathematical expression string.

**Syntax:** `calc eval "<expression>"`

**Examples:**
- `calc eval "2 + 3"` → 5
- `calc eval "(10 + 5) * 2"` → 30
- `calc eval "sqrt(16) + log(10)"` → ~4.302585092994046

## Supported Features

### Operators
- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Exponentiation: `^` or `**`
- Modulo: `%`

### Functions
- `sqrt(x)` - Square root
- `abs(x)` - Absolute value
- `sin(x)`, `cos(x)`, `tan(x)` - Trigonometric functions
- `log(x)` - Natural logarithm
- `log10(x)` - Base-10 logarithm
- `ceil(x)`, `floor(x)`, `round(x)` - Rounding functions
- `max(x, y, ...)` - Maximum value
- `min(x, y, ...)` - Minimum value

### Constants
- `pi` or `π` - Pi (3.141592653589793)
- `e` - Euler's number (2.718281828459045)

## Implementation Requirements

1. Parse mathematical expressions with proper operator precedence
2. Handle parentheses for grouping
3. Support function calls with proper syntax
4. Validate expression syntax
5. Handle errors gracefully (invalid syntax, division by zero, etc.)
6. Support both integer and floating-point arithmetic
7. Consider security implications (no code execution)

## Test Scenarios

### Test Suite 1: Basic Arithmetic

**Test 1.1: Simple Addition**
- **Input:** `calc eval "2 + 3"`
- **Expected Output:** `Eval Math Result: 5`
- **Assertions:**
  - Result equals 5
  - Operation name is "eval"

**Test 1.2: Simple Subtraction**
- **Input:** `calc eval "10 - 4"`
- **Expected Output:** `Eval Math Result: 6`
- **Assertions:**
  - Result equals 6

**Test 1.3: Simple Multiplication**
- **Input:** `calc eval "5 * 6"`
- **Expected Output:** `Eval Math Result: 30`
- **Assertions:**
  - Result equals 30

**Test 1.4: Simple Division**
- **Input:** `calc eval "20 / 4"`
- **Expected Output:** `Eval Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 1.5: Exponentiation**
- **Input:** `calc eval "2 ^ 3"`
- **Expected Output:** `Eval Math Result: 8`
- **Assertions:**
  - Result equals 8

**Test 1.6: Modulo**
- **Input:** `calc eval "10 % 3"`
- **Expected Output:** `Eval Math Result: 1`
- **Assertions:**
  - Result equals 1

### Test Suite 2: Operator Precedence

**Test 2.1: Multiplication Before Addition**
- **Input:** `calc eval "2 + 3 * 4"`
- **Expected Output:** `Eval Math Result: 14`
- **Assertions:**
  - Result equals 14 (not 20)
  - Multiplication has higher precedence

**Test 2.2: Division Before Subtraction**
- **Input:** `calc eval "10 - 8 / 2"`
- **Expected Output:** `Eval Math Result: 6`
- **Assertions:**
  - Result equals 6 (not 1)

**Test 2.3: Exponentiation Before Multiplication**
- **Input:** `calc eval "2 * 3 ^ 2"`
- **Expected Output:** `Eval Math Result: 18`
- **Assertions:**
  - Result equals 18 (not 36)
  - Exponentiation has highest precedence

**Test 2.4: Multiple Operations**
- **Input:** `calc eval "1 + 2 * 3 - 4 / 2"`
- **Expected Output:** `Eval Math Result: 5`
- **Assertions:**
  - Result equals 5
  - Precedence is correct

### Test Suite 3: Parentheses

**Test 3.1: Parentheses Override Precedence**
- **Input:** `calc eval "(2 + 3) * 4"`
- **Expected Output:** `Eval Math Result: 20`
- **Assertions:**
  - Result equals 20 (not 14)
  - Parentheses work correctly

**Test 3.2: Nested Parentheses**
- **Input:** `calc eval "((10 + 5) * 2) / 3"`
- **Expected Output:** `Eval Math Result: 10`
- **Assertions:**
  - Result equals 10
  - Nested parentheses work correctly

**Test 3.3: Multiple Parentheses Groups**
- **Input:** `calc eval "(10 + 5) * (2 + 3)"`
- **Expected Output:** `Eval Math Result: 75`
- **Assertions:**
  - Result equals 75

**Test 3.4: Unmatched Parentheses (Error Case)**
- **Input:** `calc eval "(2 + 3"`
- **Expected Behavior:** Error message indicating unmatched parentheses
- **Assertions:**
  - Error is thrown
  - Error message: "Unmatched parentheses in expression"

### Test Suite 4: Functions

**Test 4.1: Square Root Function**
- **Input:** `calc eval "sqrt(16)"`
- **Expected Output:** `Eval Math Result: 4`
- **Assertions:**
  - Result equals 4

**Test 4.2: Absolute Value Function**
- **Input:** `calc eval "abs(-5)"`
- **Expected Output:** `Eval Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 4.3: Trigonometric Functions**
- **Input:** `calc eval "sin(0)"`
- **Expected Output:** `Eval Math Result: 0`
- **Assertions:**
  - Result equals 0 (approximately)

**Test 4.4: Logarithm Functions**
- **Input:** `calc eval "log10(100)"`
- **Expected Output:** `Eval Math Result: 2`
- **Assertions:**
  - Result equals 2

**Test 4.5: Rounding Functions**
- **Input:** `calc eval "ceil(4.3)"`
- **Expected Output:** `Eval Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 4.6: Max Function**
- **Input:** `calc eval "max(1, 5, 3)"`
- **Expected Output:** `Eval Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 4.7: Min Function**
- **Input:** `calc eval "min(1, 5, 3)"`
- **Expected Output:** `Eval Math Result: 1`
- **Assertions:**
  - Result equals 1

**Test 4.8: Function in Expression**
- **Input:** `calc eval "sqrt(16) + 5"`
- **Expected Output:** `Eval Math Result: 9`
- **Assertions:**
  - Result equals 9

**Test 4.9: Nested Functions**
- **Input:** `calc eval "sqrt(abs(-16))"`
- **Expected Output:** `Eval Math Result: 4`
- **Assertions:**
  - Result equals 4

**Test 4.10: Invalid Function Name (Error Case)**
- **Input:** `calc eval "invalid(5)"`
- **Expected Behavior:** Error message indicating unknown function
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Constants

**Test 5.1: Pi Constant**
- **Input:** `calc eval "pi"`
- **Expected Output:** `Eval Math Result: 3.141592653589793` (approximately)
- **Assertions:**
  - Result equals pi (approximately)

**Test 5.2: E Constant**
- **Input:** `calc eval "e"`
- **Expected Output:** `Eval Math Result: 2.718281828459045` (approximately)
- **Assertions:**
  - Result equals e (approximately)

**Test 5.3: Constants in Expressions**
- **Input:** `calc eval "2 * pi"`
- **Expected Output:** `Eval Math Result: 6.283185307179586` (approximately)
- **Assertions:**
  - Result equals 2π (approximately)

**Test 5.4: Constants in Functions**
- **Input:** `calc eval "sin(pi / 2)"`
- **Expected Output:** `Eval Math Result: 1` (approximately)
- **Assertions:**
  - Result equals 1 (approximately)

### Test Suite 6: Complex Expressions

**Test 6.1: Complex Expression**
- **Input:** `calc eval "(10 + 5) * 2 - 8 / 4"`
- **Expected Output:** `Eval Math Result: 28`
- **Assertions:**
  - Result equals 28

**Test 6.2: Expression with Functions**
- **Input:** `calc eval "sqrt(16) + log10(100) * 2"`
- **Expected Output:** `Eval Math Result: 8`
- **Assertions:**
  - Result equals 8

**Test 6.3: Expression with Constants**
- **Input:** `calc eval "2 * pi * 5"`
- **Expected Output:** `Eval Math Result: 31.41592653589793` (approximately)
- **Assertions:**
  - Result equals 10π (approximately)

**Test 6.4: Very Complex Expression**
- **Input:** `calc eval "(sqrt(16) + abs(-5)) * (log10(100) + 1)"`
- **Expected Output:** `Eval Math Result: 27`
- **Assertions:**
  - Result equals 27

### Test Suite 7: Error Handling

**Test 7.1: Division by Zero**
- **Input:** `calc eval "10 / 0"`
- **Expected Behavior:** Error message indicating division by zero
- **Assertions:**
  - Error is thrown
  - Error message: "Division by zero is not allowed"

**Test 7.2: Invalid Syntax**
- **Input:** `calc eval "2 + + 3"`
- **Expected Behavior:** Error message indicating invalid syntax
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.3: Missing Operand**
- **Input:** `calc eval "2 +"`
- **Expected Behavior:** Error message indicating missing operand
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.4: Invalid Characters**
- **Input:** `calc eval "2 @ 3"`
- **Expected Behavior:** Error message indicating invalid operator
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.5: Empty Expression**
- **Input:** `calc eval ""`
- **Expected Behavior:** Error message indicating empty expression
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.6: Missing Closing Parenthesis**
- **Input:** `calc eval "(2 + 3"`
- **Expected Behavior:** Error message indicating unmatched parentheses
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.7: Missing Opening Parenthesis**
- **Input:** `calc eval "2 + 3)"`
- **Expected Behavior:** Error message indicating unmatched parentheses
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.8: Function with Wrong Number of Arguments**
- **Input:** `calc eval "sqrt(16, 4)"`
- **Expected Behavior:** Error message indicating wrong number of arguments
- **Assertions:**
  - Error is thrown
  - Error message is clear

## Acceptance Criteria

1. ✅ Expression evaluator is implemented
2. ✅ Supports all basic operators (+, -, *, /, ^, %)
3. ✅ Supports parentheses for grouping
4. ✅ Operator precedence is correct
5. ✅ Supports all listed functions
6. ✅ Supports constants (pi, e)
7. ✅ All test scenarios pass
8. ✅ Error messages are clear and helpful
9. ✅ Help command displays expression syntax and examples
10. ✅ Handles edge cases gracefully (division by zero, invalid syntax, etc.)
11. ✅ Expression parsing is secure (no code execution)

