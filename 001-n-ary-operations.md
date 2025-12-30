# Spec 001: N-ary Operations (Variable Number of Arguments)

## Overview
Extend the CLI tool to support operations that can accept a variable number of arguments (n-ary operations), allowing users to perform operations on multiple numbers at once.

## Feature Description
Currently, all operations require exactly two arguments. This feature will add support for operations that can accept two or more numbers, enabling more powerful calculations like summing or multiplying multiple numbers in a single command.

## Operations to Add

### 1. `sum` - Sum Multiple Numbers
Adds together all provided numbers.

**Syntax:** `calc sum <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc sum 5 3` → 8
- `calc sum 1 2 3 4 5` → 15
- `calc sum 10 -5 3` → 8

### 2. `product` - Multiply Multiple Numbers
Multiplies all provided numbers together.

**Syntax:** `calc product <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc product 5 3` → 15
- `calc product 2 3 4` → 24
- `calc product 1 2 3 4 5` → 120

### 3. `max` - Find Maximum Value
Returns the largest number from the provided arguments.

**Syntax:** `calc max <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc max 5 3` → 5
- `calc max 1 5 3 9 2` → 9
- `calc max -5 -10 -1` → -1

### 4. `min` - Find Minimum Value
Returns the smallest number from the provided arguments.

**Syntax:** `calc min <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc min 5 3` → 3
- `calc min 1 5 3 9 2` → 1
- `calc min -5 -10 -1` → -10

## Implementation Requirements

1. Modify the CLI argument parser to accept variable-length arguments
2. Update operation registry to support n-ary operations
3. Ensure backward compatibility with existing binary operations
4. Validate that at least 2 arguments are provided for n-ary operations
5. Handle edge cases (single number, empty input, etc.)

## Test Scenarios

### Test Suite 1: Sum Operation

**Test 1.1: Basic Sum with Two Numbers**
- **Input:** `calc sum 5 3`
- **Expected Output:** `Sum Math Result: 8`
- **Assertions:**
  - Result equals 8
  - Operation name is "sum"
  - No errors thrown

**Test 1.2: Sum with Multiple Positive Numbers**
- **Input:** `calc sum 1 2 3 4 5`
- **Expected Output:** `Sum Math Result: 15`
- **Assertions:**
  - Result equals 15
  - Handles 5 arguments correctly

**Test 1.3: Sum with Negative Numbers**
- **Input:** `calc sum 10 -5 3 -2`
- **Expected Output:** `Sum Math Result: 6`
- **Assertions:**
  - Result equals 6
  - Handles negative numbers correctly

**Test 1.4: Sum with Decimal Numbers**
- **Input:** `calc sum 1.5 2.3 3.7`
- **Expected Output:** `Sum Math Result: 7.5`
- **Assertions:**
  - Result equals 7.5 (or 7.500000000000001 due to floating point)
  - Handles decimal precision correctly

**Test 1.5: Sum with Zero**
- **Input:** `calc sum 5 0 3`
- **Expected Output:** `Sum Math Result: 8`
- **Assertions:**
  - Zero doesn't affect the sum
  - Result equals 8

**Test 1.6: Sum with Single Number (Edge Case)**
- **Input:** `calc sum 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear and helpful

**Test 1.7: Sum with Large Numbers**
- **Input:** `calc sum 999999999 1 1`
- **Expected Output:** `Sum Math Result: 1000000001`
- **Assertions:**
  - Handles large integers correctly
  - No overflow issues

### Test Suite 2: Product Operation

**Test 2.1: Basic Product with Two Numbers**
- **Input:** `calc product 5 3`
- **Expected Output:** `Product Math Result: 15`
- **Assertions:**
  - Result equals 15
  - Operation name is "product"

**Test 2.2: Product with Multiple Numbers**
- **Input:** `calc product 2 3 4`
- **Expected Output:** `Product Math Result: 24`
- **Assertions:**
  - Result equals 24
  - Handles 3 arguments correctly

**Test 2.3: Product with Zero**
- **Input:** `calc product 5 0 3`
- **Expected Output:** `Product Math Result: 0`
- **Assertions:**
  - Any zero in the product results in zero
  - Result equals 0

**Test 2.4: Product with Negative Numbers**
- **Input:** `calc product -2 3 -4`
- **Expected Output:** `Product Math Result: 24`
- **Assertions:**
  - Handles negative numbers correctly
  - Result equals 24 (negative × positive × negative = positive)

**Test 2.5: Product with Decimal Numbers**
- **Input:** `calc product 1.5 2 3`
- **Expected Output:** `Product Math Result: 9`
- **Assertions:**
  - Handles decimal multiplication correctly
  - Result equals 9

**Test 2.6: Product with Single Number (Edge Case)**
- **Input:** `calc product 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 3: Max Operation

**Test 3.1: Basic Max with Two Numbers**
- **Input:** `calc max 5 3`
- **Expected Output:** `Max Math Result: 5`
- **Assertions:**
  - Result equals 5
  - Operation name is "max"

**Test 3.2: Max with Multiple Numbers**
- **Input:** `calc max 1 5 3 9 2`
- **Expected Output:** `Max Math Result: 9`
- **Assertions:**
  - Result equals 9 (the maximum value)
  - Handles 5 arguments correctly

**Test 3.3: Max with Negative Numbers**
- **Input:** `calc max -5 -10 -1`
- **Expected Output:** `Max Math Result: -1`
- **Assertions:**
  - Result equals -1 (least negative = maximum)
  - Handles negative numbers correctly

**Test 3.4: Max with Duplicate Maximum Values**
- **Input:** `calc max 5 3 5 2`
- **Expected Output:** `Max Math Result: 5`
- **Assertions:**
  - Result equals 5
  - Handles duplicates correctly

**Test 3.5: Max with Decimal Numbers**
- **Input:** `calc max 1.5 2.3 1.8`
- **Expected Output:** `Max Math Result: 2.3`
- **Assertions:**
  - Result equals 2.3
  - Handles decimal comparison correctly

**Test 3.6: Max with Single Number (Edge Case)**
- **Input:** `calc max 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Min Operation

**Test 4.1: Basic Min with Two Numbers**
- **Input:** `calc min 5 3`
- **Expected Output:** `Min Math Result: 3`
- **Assertions:**
  - Result equals 3
  - Operation name is "min"

**Test 4.2: Min with Multiple Numbers**
- **Input:** `calc min 1 5 3 9 2`
- **Expected Output:** `Min Math Result: 1`
- **Assertions:**
  - Result equals 1 (the minimum value)
  - Handles 5 arguments correctly

**Test 4.3: Min with Negative Numbers**
- **Input:** `calc min -5 -10 -1`
- **Expected Output:** `Min Math Result: -10`
- **Assertions:**
  - Result equals -10 (most negative = minimum)
  - Handles negative numbers correctly

**Test 4.4: Min with Duplicate Minimum Values**
- **Input:** `calc min 5 3 3 2`
- **Expected Output:** `Min Math Result: 2`
- **Assertions:**
  - Result equals 2
  - Handles duplicates correctly

**Test 4.5: Min with Decimal Numbers**
- **Input:** `calc min 1.5 2.3 1.8`
- **Expected Output:** `Min Math Result: 1.5`
- **Assertions:**
  - Result equals 1.5
  - Handles decimal comparison correctly

**Test 4.6: Min with Single Number (Edge Case)**
- **Input:** `calc min 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Integration and Edge Cases

**Test 5.1: Very Large Number of Arguments**
- **Input:** `calc sum 1 2 3 4 5 6 7 8 9 10`
- **Expected Output:** `Sum Math Result: 55`
- **Assertions:**
  - Handles 10 arguments correctly
  - Result equals 55 (sum of 1-10)

**Test 5.2: Invalid Number Format**
- **Input:** `calc sum 5 abc 3`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies the invalid argument

**Test 5.3: Empty Arguments**
- **Input:** `calc sum`
- **Expected Behavior:** Error message indicating insufficient arguments
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 5.4: Very Small Decimal Precision**
- **Input:** `calc sum 0.1 0.2`
- **Expected Output:** `Sum Math Result: 0.3` (or close to 0.3)
- **Assertions:**
  - Handles floating point precision correctly
  - Result is approximately 0.3

**Test 5.5: Scientific Notation Support**
- **Input:** `calc sum 1e2 2e1`
- **Expected Output:** `Sum Math Result: 120`
- **Assertions:**
  - Parses scientific notation correctly
  - Result equals 120

## Acceptance Criteria

1. ✅ All four operations (sum, product, max, min) are implemented
2. ✅ Operations accept 2 or more arguments
3. ✅ Operations validate that at least 2 arguments are provided
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Backward compatibility with existing binary operations is maintained
7. ✅ Help command displays new operations with examples
8. ✅ Operations handle edge cases gracefully (zero, negatives, decimals, large numbers)

