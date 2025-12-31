# Spec 013: Sequence Operations

## Overview
Add support for generating and calculating values from mathematical sequences including Fibonacci, arithmetic, geometric, and other common sequences.

## Feature Description
Extend the CLI tool to support operations for generating sequence terms, finding sequence sums, and working with arithmetic and geometric progressions.

## Operations to Add

### 1. `fibonacci` - Fibonacci Sequence
Generates Fibonacci numbers or finds the nth Fibonacci number.

**Syntax:** `calc fibonacci <n>` or `calc fibonacci --sequence <n>`

**Examples:**
- `calc fibonacci 10` → 55 (10th Fibonacci number)
- `calc fibonacci --sequence 10` → 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

### 2. `arithmetic` - Arithmetic Sequence
Generates terms or finds the nth term of an arithmetic sequence.

**Syntax:** `calc arithmetic <first_term> <common_difference> <n>` or `calc arithmetic --sequence <first> <diff> <count>`

**Examples:**
- `calc arithmetic 5 3 10` → 32 (10th term: 5 + 9×3 = 32)
- `calc arithmetic --sequence 2 5 5` → 2, 7, 12, 17, 22

### 3. `geometric` - Geometric Sequence
Generates terms or finds the nth term of a geometric sequence.

**Syntax:** `calc geometric <first_term> <common_ratio> <n>` or `calc geometric --sequence <first> <ratio> <count>`

**Examples:**
- `calc geometric 2 3 5` → 162 (5th term: 2 × 3^4 = 162)
- `calc geometric --sequence 1 2 6` → 1, 2, 4, 8, 16, 32

### 4. `sumarithmetic` - Sum of Arithmetic Sequence
Calculates the sum of the first n terms of an arithmetic sequence.

**Syntax:** `calc sumarithmetic <first_term> <common_difference> <n>`

**Examples:**
- `calc sumarithmetic 2 3 5` → 40 (sum: 2+5+8+11+14 = 40)
- `calc sumarithmetic 1 1 100` → 5050 (sum of 1 to 100)

### 5. `sumgeometric` - Sum of Geometric Sequence
Calculates the sum of the first n terms of a geometric sequence.

**Syntax:** `calc sumgeometric <first_term> <common_ratio> <n>`

**Examples:**
- `calc sumgeometric 1 2 5` → 31 (sum: 1+2+4+8+16 = 31)
- `calc sumgeometric 3 2 4` → 45 (sum: 3+6+12+24 = 45)

### 6. `triangular` - Triangular Numbers
Generates triangular numbers (sum of first n natural numbers).

**Syntax:** `calc triangular <n>`

**Examples:**
- `calc triangular 10` → 55 (1+2+...+10 = 55)
- `calc triangular 5` → 15 (1+2+3+4+5 = 15)

## Implementation Requirements

1. Operations accept 1-3 arguments depending on the operation
2. Validate that n is a non-negative integer
3. Handle edge cases (n=0, n=1, negative n)
4. Support both single term and sequence generation modes
5. Use efficient algorithms (especially for Fibonacci)
6. Handle large numbers appropriately
7. Provide clear error messages

## Test Scenarios

### Test Suite 1: Fibonacci Operation

**Test 1.1: First Fibonacci Number**
- **Input:** `calc fibonacci 0`
- **Expected Output:** `Fibonacci Math Result: 0`
- **Assertions:**
  - Result equals 0 (F(0) = 0)
  - Operation name is "fibonacci"

**Test 1.2: Second Fibonacci Number**
- **Input:** `calc fibonacci 1`
- **Expected Output:** `Fibonacci Math Result: 1`
- **Assertions:**
  - Result equals 1 (F(1) = 1)

**Test 1.3: Small Fibonacci Number**
- **Input:** `calc fibonacci 5`
- **Expected Output:** `Fibonacci Math Result: 5`
- **Assertions:**
  - Result equals 5 (F(5) = 5)

**Test 1.4: Medium Fibonacci Number**
- **Input:** `calc fibonacci 10`
- **Expected Output:** `Fibonacci Math Result: 55`
- **Assertions:**
  - Result equals 55 (F(10) = 55)

**Test 1.5: Large Fibonacci Number**
- **Input:** `calc fibonacci 20`
- **Expected Output:** `Fibonacci Math Result: 6765`
- **Assertions:**
  - Result equals 6765 (F(20) = 6765)

**Test 1.6: Fibonacci Sequence**
- **Input:** `calc fibonacci --sequence 10`
- **Expected Output:** `Fibonacci Math Result: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55` (or array)
- **Assertions:**
  - Result contains first 11 Fibonacci numbers (F(0) through F(10))
  - Sequence is correct

**Test 1.7: Fibonacci Sequence Small**
- **Input:** `calc fibonacci --sequence 5`
- **Expected Output:** `Fibonacci Math Result: 0, 1, 1, 2, 3, 5` (or array)
- **Assertions:**
  - Result contains first 6 Fibonacci numbers

**Test 1.8: Negative Number (Error Case)**
- **Input:** `calc fibonacci -5`
- **Expected Behavior:** Error message indicating n must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message: "n must be a non-negative integer"

**Test 1.9: Decimal Number (Error Case)**
- **Input:** `calc fibonacci 5.5`
- **Expected Behavior:** Error message indicating n must be an integer
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 1.10: Very Large Fibonacci**
- **Input:** `calc fibonacci 50`
- **Expected Output:** Very large number (12586269025)
- **Assertions:**
  - Result is correct
  - Handles large numbers (may need BigInt)

### Test Suite 2: Arithmetic Sequence

**Test 2.1: Basic Arithmetic Term**
- **Input:** `calc arithmetic 5 3 10`
- **Expected Output:** `Arithmetic Math Result: 32`
- **Assertions:**
  - Result equals 32 (5 + 9×3 = 32)
  - Formula: a_n = a_1 + (n-1)×d
  - Operation name is "arithmetic"

**Test 2.2: Arithmetic Term Starting at Zero**
- **Input:** `calc arithmetic 0 5 10`
- **Expected Output:** `Arithmetic Math Result: 45`
- **Assertions:**
  - Result equals 45 (0 + 9×5 = 45)

**Test 2.3: Arithmetic Term with Negative Difference**
- **Input:** `calc arithmetic 10 -2 5`
- **Expected Output:** `Arithmetic Math Result: 2`
- **Assertions:**
  - Result equals 2 (10 + 4×(-2) = 2)

**Test 2.4: First Term**
- **Input:** `calc arithmetic 5 3 1`
- **Expected Output:** `Arithmetic Math Result: 5`
- **Assertions:**
  - Result equals 5 (first term)

**Test 2.5: Arithmetic Sequence**
- **Input:** `calc arithmetic --sequence 2 5 5`
- **Expected Output:** `Arithmetic Math Result: 2, 7, 12, 17, 22` (or array)
- **Assertions:**
  - Result contains first 5 terms
  - Sequence is correct

**Test 2.6: Arithmetic Sequence with Negative**
- **Input:** `calc arithmetic --sequence 10 -2 5`
- **Expected Output:** `Arithmetic Math Result: 10, 8, 6, 4, 2` (or array)
- **Assertions:**
  - Result contains first 5 terms
  - Sequence decreases correctly

**Test 2.7: Zero Term Number (Error Case)**
- **Input:** `calc arithmetic 5 3 0`
- **Expected Behavior:** Error message indicating n must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.8: Decimal Inputs**
- **Input:** `calc arithmetic 1.5 0.5 5`
- **Expected Output:** `Arithmetic Math Result: 3.5`
- **Assertions:**
  - Result equals 3.5 (1.5 + 4×0.5 = 3.5)
  - Handles decimal inputs

### Test Suite 3: Geometric Sequence

**Test 3.1: Basic Geometric Term**
- **Input:** `calc geometric 2 3 5`
- **Expected Output:** `Geometric Math Result: 162`
- **Assertions:**
  - Result equals 162 (2 × 3^4 = 162)
  - Formula: a_n = a_1 × r^(n-1)
  - Operation name is "geometric"

**Test 3.2: Geometric Term with Ratio Less Than One**
- **Input:** `calc geometric 100 0.5 5`
- **Expected Output:** `Geometric Math Result: 6.25`
- **Assertions:**
  - Result equals 6.25 (100 × 0.5^4 = 6.25)

**Test 3.3: First Term**
- **Input:** `calc geometric 5 2 1`
- **Expected Output:** `Geometric Math Result: 5`
- **Assertions:**
  - Result equals 5 (first term)

**Test 3.4: Geometric Sequence**
- **Input:** `calc geometric --sequence 1 2 6`
- **Expected Output:** `Geometric Math Result: 1, 2, 4, 8, 16, 32` (or array)
- **Assertions:**
  - Result contains first 6 terms
  - Sequence is correct

**Test 3.5: Geometric Sequence with Fractional Ratio**
- **Input:** `calc geometric --sequence 64 0.5 5`
- **Expected Output:** `Geometric Math Result: 64, 32, 16, 8, 4` (or array)
- **Assertions:**
  - Result contains first 5 terms
  - Sequence decreases correctly

**Test 3.6: Zero Ratio**
- **Input:** `calc geometric 5 0 3`
- **Expected Output:** `Geometric Math Result: 0` (for n > 1)
- **Assertions:**
  - Result equals 0 (all terms after first are 0)

**Test 3.7: Negative Ratio**
- **Input:** `calc geometric 2 -2 4`
- **Expected Output:** `Geometric Math Result: -16` (or 16, depending on implementation)
- **Assertions:**
  - Result is correct
  - Handles negative ratios

**Test 3.8: Zero Term Number (Error Case)**
- **Input:** `calc geometric 2 3 0`
- **Expected Behavior:** Error message indicating n must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Sum of Arithmetic Sequence

**Test 4.1: Basic Arithmetic Sum**
- **Input:** `calc sumarithmetic 2 3 5`
- **Expected Output:** `Sumarithmetic Math Result: 40`
- **Assertions:**
  - Result equals 40 (2+5+8+11+14 = 40)
  - Formula: S_n = n/2 × (2a + (n-1)d)
  - Operation name is "sumarithmetic"

**Test 4.2: Sum of Natural Numbers**
- **Input:** `calc sumarithmetic 1 1 100`
- **Expected Output:** `Sumarithmetic Math Result: 5050`
- **Assertions:**
  - Result equals 5050 (sum of 1 to 100)

**Test 4.3: Sum with Negative Difference**
- **Input:** `calc sumarithmetic 10 -2 5`
- **Expected Output:** `Sumarithmetic Math Result: 30`
- **Assertions:**
  - Result equals 30 (10+8+6+4+2 = 30)

**Test 4.4: Sum of Single Term**
- **Input:** `calc sumarithmetic 5 3 1`
- **Expected Output:** `Sumarithmetic Math Result: 5`
- **Assertions:**
  - Result equals 5 (only first term)

**Test 4.5: Sum with Zero Difference**
- **Input:** `calc sumarithmetic 5 0 10`
- **Expected Output:** `Sumarithmetic Math Result: 50`
- **Assertions:**
  - Result equals 50 (all terms are 5)

**Test 4.6: Zero Terms (Error Case)**
- **Input:** `calc sumarithmetic 2 3 0`
- **Expected Behavior:** Error message indicating n must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.7: Large Sum**
- **Input:** `calc sumarithmetic 1 1 1000`
- **Expected Output:** `Sumarithmetic Math Result: 500500`
- **Assertions:**
  - Result equals 500500 (sum of 1 to 1000)
  - Handles large n efficiently

### Test Suite 5: Sum of Geometric Sequence

**Test 5.1: Basic Geometric Sum**
- **Input:** `calc sumgeometric 1 2 5`
- **Expected Output:** `Sumgeometric Math Result: 31`
- **Assertions:**
  - Result equals 31 (1+2+4+8+16 = 31)
  - Formula: S_n = a × (r^n - 1) / (r - 1) for r ≠ 1
  - Operation name is "sumgeometric"

**Test 5.2: Geometric Sum with Ratio Less Than One**
- **Input:** `calc sumgeometric 100 0.5 5`
- **Expected Output:** `Sumgeometric Math Result: 193.75`
- **Assertions:**
  - Result equals 193.75 (100+50+25+12.5+6.25)

**Test 5.3: Sum with Ratio Equal to One**
- **Input:** `calc sumgeometric 5 1 10`
- **Expected Output:** `Sumgeometric Math Result: 50`
- **Assertions:**
  - Result equals 50 (all terms are 5, sum = 5×10)

**Test 5.4: Sum of Single Term**
- **Input:** `calc sumgeometric 5 2 1`
- **Expected Output:** `Sumgeometric Math Result: 5`
- **Assertions:**
  - Result equals 5 (only first term)

**Test 5.5: Large Geometric Sum**
- **Input:** `calc sumgeometric 1 2 20`
- **Expected Output:** `Sumgeometric Math Result: 1048575`
- **Assertions:**
  - Result equals 1048575 (2^20 - 1)
  - Handles large calculations

**Test 5.6: Zero Terms (Error Case)**
- **Input:** `calc sumgeometric 1 2 0`
- **Expected Behavior:** Error message indicating n must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 5.7: Negative Ratio**
- **Input:** `calc sumgeometric 2 -2 4`
- **Expected Output:** `Sumgeometric Math Result: -10` (or appropriate result)
- **Assertions:**
  - Result is correct
  - Handles negative ratios

### Test Suite 6: Triangular Numbers

**Test 6.1: Small Triangular Number**
- **Input:** `calc triangular 5`
- **Expected Output:** `Triangular Math Result: 15`
- **Assertions:**
  - Result equals 15 (1+2+3+4+5 = 15)
  - Formula: T_n = n(n+1)/2
  - Operation name is "triangular"

**Test 6.2: Medium Triangular Number**
- **Input:** `calc triangular 10`
- **Expected Output:** `Triangular Math Result: 55`
- **Assertions:**
  - Result equals 55 (1+2+...+10 = 55)

**Test 6.3: Triangular Number of One**
- **Input:** `calc triangular 1`
- **Expected Output:** `Triangular Math Result: 1`
- **Assertions:**
  - Result equals 1

**Test 6.4: Triangular Number of Zero**
- **Input:** `calc triangular 0`
- **Expected Output:** `Triangular Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 6.5: Large Triangular Number**
- **Input:** `calc triangular 100`
- **Expected Output:** `Triangular Math Result: 5050`
- **Assertions:**
  - Result equals 5050 (100×101/2 = 5050)

**Test 6.6: Relationship to Arithmetic Sum**
- **Input:** `calc triangular 10` and `calc sumarithmetic 1 1 10`
- **Expected:** Both should return 55
- **Assertions:**
  - Triangular(n) equals sum of arithmetic sequence starting at 1 with difference 1
  - Results match

**Test 6.7: Negative Number (Error Case)**
- **Input:** `calc triangular -5`
- **Expected Behavior:** Error message indicating n must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 6.8: Decimal Number (Error Case)**
- **Input:** `calc triangular 5.5`
- **Expected Behavior:** Error message indicating n must be an integer
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 7: Edge Cases and Integration

**Test 7.1: Very Large Fibonacci**
- **Input:** `calc fibonacci 100`
- **Expected Output:** Very large number (354224848179261915075)
- **Assertions:**
  - Result is correct
  - Handles very large numbers (may need BigInt)

**Test 7.2: Invalid Number Format**
- **Input:** `calc fibonacci abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

**Test 7.3: Missing Arguments**
- **Input:** `calc arithmetic 5 3`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.4: Sequence Mode with Zero Count**
- **Input:** `calc fibonacci --sequence 0`
- **Expected Output:** Empty result or [0]
- **Assertions:**
  - Either returns empty or [0]
  - Behavior is documented

**Test 7.5: Very Large Sequence**
- **Input:** `calc arithmetic --sequence 1 1 1000`
- **Expected Output:** Sequence of 1000 terms
- **Assertions:**
  - Result contains 1000 terms
  - Handles large sequences efficiently

## Acceptance Criteria

1. ✅ All 6 sequence operations are implemented (fibonacci, arithmetic, geometric, sumarithmetic, sumgeometric, triangular)
2. ✅ Operations support both single term and sequence generation modes
3. ✅ Operations validate inputs appropriately
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle edge cases gracefully (zero, negatives, decimals, large numbers)
8. ✅ Fibonacci uses efficient algorithm (iterative or matrix exponentiation)
9. ✅ Sequence formulas are mathematically correct
10. ✅ Operations handle large numbers efficiently (consider BigInt for very large Fibonacci)

