# Spec 007: GCD and LCM Operations

## Overview
Add support for calculating the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of numbers, enabling users to perform number theory operations.

## Feature Description
Extend the CLI tool to support operations for finding the GCD and LCM of two or more numbers, which are fundamental operations in number theory and useful for fraction operations and modular arithmetic.

## Operations to Add

### 1. `gcd` - Greatest Common Divisor
Calculates the greatest common divisor (also known as greatest common factor) of two or more numbers.

**Syntax:** `calc gcd <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc gcd 48 18` → 6
- `calc gcd 12 18 24` → 6
- `calc gcd 17 19` → 1 (coprime)

### 2. `lcm` - Least Common Multiple
Calculates the least common multiple of two or more numbers.

**Syntax:** `calc lcm <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc lcm 4 6` → 12
- `calc lcm 12 18 24` → 72
- `calc lcm 5 7` → 35

## Implementation Requirements

1. Operations accept 2 or more arguments
2. Validate that at least 2 numbers are provided
3. Handle negative numbers (typically take absolute value for GCD/LCM)
4. Handle zero appropriately (GCD(0, n) = n, LCM(0, n) is undefined or 0)
5. Use efficient algorithm (Euclidean algorithm for GCD)
6. Handle integers (may need to round decimals or error)
7. Provide clear error messages for invalid inputs

## Test Scenarios

### Test Suite 1: GCD Operation

**Test 1.1: Basic GCD with Two Numbers**
- **Input:** `calc gcd 48 18`
- **Expected Output:** `Gcd Math Result: 6`
- **Assertions:**
  - Result equals 6
  - Operation name is "gcd"

**Test 1.2: GCD of Coprime Numbers**
- **Input:** `calc gcd 17 19`
- **Expected Output:** `Gcd Math Result: 1`
- **Assertions:**
  - Result equals 1 (numbers are coprime)

**Test 1.3: GCD with Multiple Numbers**
- **Input:** `calc gcd 12 18 24`
- **Expected Output:** `Gcd Math Result: 6`
- **Assertions:**
  - Result equals 6
  - Handles 3 arguments correctly

**Test 1.4: GCD When One Number Divides Another**
- **Input:** `calc gcd 12 6`
- **Expected Output:** `Gcd Math Result: 6`
- **Assertions:**
  - Result equals 6 (6 divides 12)

**Test 1.5: GCD of Same Numbers**
- **Input:** `calc gcd 5 5`
- **Expected Output:** `Gcd Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 1.6: GCD with Zero**
- **Input:** `calc gcd 0 12`
- **Expected Output:** `Gcd Math Result: 12` (or error, depending on implementation)
- **Assertions:**
  - Either returns 12 (GCD(0, n) = n) or throws error
  - Behavior is documented

**Test 1.7: GCD with Both Zeros**
- **Input:** `calc gcd 0 0`
- **Expected Behavior:** Error message (GCD(0,0) is undefined)
- **Assertions:**
  - Error is thrown
  - Error message: "GCD of (0, 0) is undefined"

**Test 1.8: GCD with Negative Numbers**
- **Input:** `calc gcd -48 18`
- **Expected Output:** `Gcd Math Result: 6`
- **Assertions:**
  - Result equals 6 (GCD is typically taken as absolute value)
  - Handles negative numbers correctly

**Test 1.9: GCD with Large Numbers**
- **Input:** `calc gcd 1071 462`
- **Expected Output:** `Gcd Math Result: 21`
- **Assertions:**
  - Result equals 21
  - Euclidean algorithm works correctly

**Test 1.10: GCD with Single Number (Error Case)**
- **Input:** `calc gcd 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 1.11: GCD with Decimal Numbers**
- **Input:** `calc gcd 48.0 18.0`
- **Expected Output:** `Gcd Math Result: 6` (or error, depending on implementation)
- **Assertions:**
  - Either returns 6 (treats as integers) or throws error
  - Behavior is documented

### Test Suite 2: LCM Operation

**Test 2.1: Basic LCM with Two Numbers**
- **Input:** `calc lcm 4 6`
- **Expected Output:** `Lcm Math Result: 12`
- **Assertions:**
  - Result equals 12
  - Operation name is "lcm"

**Test 2.2: LCM of Coprime Numbers**
- **Input:** `calc lcm 5 7`
- **Expected Output:** `Lcm Math Result: 35`
- **Assertions:**
  - Result equals 35 (5 × 7, since they're coprime)

**Test 2.3: LCM with Multiple Numbers**
- **Input:** `calc lcm 12 18 24`
- **Expected Output:** `Lcm Math Result: 72`
- **Assertions:**
  - Result equals 72
  - Handles 3 arguments correctly

**Test 2.4: LCM When One Number Divides Another**
- **Input:** `calc lcm 12 6`
- **Expected Output:** `Lcm Math Result: 12`
- **Assertions:**
  - Result equals 12 (12 is multiple of 6)

**Test 2.5: LCM of Same Numbers**
- **Input:** `calc lcm 5 5`
- **Expected Output:** `Lcm Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 2.6: LCM with Zero**
- **Input:** `calc lcm 0 12`
- **Expected Output:** `Lcm Math Result: 0` (or error, depending on implementation)
- **Assertions:**
  - Either returns 0 or throws error
  - Behavior is documented

**Test 2.7: LCM with Negative Numbers**
- **Input:** `calc lcm -4 6`
- **Expected Output:** `Lcm Math Result: 12` (or error, depending on implementation)
- **Assertions:**
  - Either returns 12 (takes absolute value) or throws error
  - Behavior is documented

**Test 2.8: LCM with Large Numbers**
- **Input:** `calc lcm 100 150`
- **Expected Output:** `Lcm Math Result: 300`
- **Assertions:**
  - Result equals 300
  - Handles larger numbers correctly

**Test 2.9: LCM Relationship to GCD**
- **Input:** `calc gcd 48 18` and `calc lcm 48 18`
- **Expected:** GCD × LCM should equal 48 × 18 (864)
- **Assertions:**
  - GCD(48, 18) = 6
  - LCM(48, 18) = 144
  - 6 × 144 = 864 = 48 × 18
  - Relationship holds: GCD(a,b) × LCM(a,b) = a × b

**Test 2.10: LCM with Single Number (Error Case)**
- **Input:** `calc lcm 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.11: LCM with Decimal Numbers**
- **Input:** `calc lcm 4.0 6.0`
- **Expected Output:** `Lcm Math Result: 12` (or error, depending on implementation)
- **Assertions:**
  - Either returns 12 (treats as integers) or throws error
  - Behavior is documented

### Test Suite 3: Edge Cases and Error Handling

**Test 3.1: Invalid Number Format**
- **Input:** `calc gcd 48 abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies the invalid argument

**Test 3.2: Missing Arguments**
- **Input:** `calc gcd`
- **Expected Behavior:** Error message indicating insufficient arguments
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.3: GCD with Many Numbers**
- **Input:** `calc gcd 12 18 24 30 36`
- **Expected Output:** `Gcd Math Result: 6`
- **Assertions:**
  - Result equals 6
  - Handles 5 arguments correctly

**Test 3.4: LCM with Many Numbers**
- **Input:** `calc lcm 2 3 4 5 6`
- **Expected Output:** `Lcm Math Result: 60`
- **Assertions:**
  - Result equals 60
  - Handles 5 arguments correctly

**Test 3.5: GCD with Very Large Numbers**
- **Input:** `calc gcd 123456789 987654321`
- **Expected Output:** Correct GCD result
- **Assertions:**
  - Result is correct
  - Euclidean algorithm handles large numbers efficiently

**Test 3.6: LCM with Very Large Numbers**
- **Input:** `calc lcm 123456 789012`
- **Expected Output:** Correct LCM result
- **Assertions:**
  - Result is correct
  - Handles large numbers correctly

**Test 3.7: GCD with One**
- **Input:** `calc gcd 1 100`
- **Expected Output:** `Gcd Math Result: 1`
- **Assertions:**
  - Result equals 1 (1 divides everything)

**Test 3.8: LCM with One**
- **Input:** `calc lcm 1 100`
- **Expected Output:** `Lcm Math Result: 100`
- **Assertions:**
  - Result equals 100 (LCM(1, n) = n)

## Acceptance Criteria

1. ✅ Both operations are implemented (gcd, lcm)
2. ✅ Operations accept 2 or more arguments
3. ✅ Operations validate that at least 2 numbers are provided
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle edge cases gracefully (zero, negatives, same numbers, coprime)
8. ✅ GCD uses efficient Euclidean algorithm
9. ✅ GCD × LCM relationship is verified for two numbers
10. ✅ Operations handle large numbers efficiently
11. ✅ Behavior with negative numbers and zero is documented and consistent

