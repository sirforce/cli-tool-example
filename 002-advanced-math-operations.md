# Spec 002: Advanced Mathematical Operations

## Overview
Add support for advanced mathematical operations including trigonometric functions, logarithms, square roots, and other common mathematical functions that operate on a single number.

## Feature Description
Extend the CLI tool to support unary mathematical operations (operations that take a single number as input), enabling users to perform advanced calculations like finding square roots, logarithms, and trigonometric values.

## Operations to Add

### 1. `sqrt` - Square Root
Calculates the square root of a number.

**Syntax:** `calc sqrt <num>`

**Examples:**
- `calc sqrt 16` → 4
- `calc sqrt 2` → ~1.4142135623730951
- `calc sqrt 0` → 0

### 2. `log` - Natural Logarithm
Calculates the natural logarithm (base e) of a number.

**Syntax:** `calc log <num>`

**Examples:**
- `calc log 1` → 0
- `calc log 2.718281828` → ~1
- `calc log 10` → ~2.302585092994046

### 3. `log10` - Base-10 Logarithm
Calculates the base-10 logarithm of a number.

**Syntax:** `calc log10 <num>`

**Examples:**
- `calc log10 1` → 0
- `calc log10 10` → 1
- `calc log10 100` → 2

### 4. `sin` - Sine
Calculates the sine of an angle in radians.

**Syntax:** `calc sin <angle_in_radians>`

**Examples:**
- `calc sin 0` → 0
- `calc sin 1.5707963267948966` → ~1 (sin of π/2)
- `calc sin 3.141592653589793` → ~0 (sin of π)

### 5. `cos` - Cosine
Calculates the cosine of an angle in radians.

**Syntax:** `calc cos <angle_in_radians>`

**Examples:**
- `calc cos 0` → 1
- `calc cos 1.5707963267948966` → ~0 (cos of π/2)
- `calc cos 3.141592653589793` → ~-1 (cos of π)

### 6. `tan` - Tangent
Calculates the tangent of an angle in radians.

**Syntax:** `calc tan <angle_in_radians>`

**Examples:**
- `calc tan 0` → 0
- `calc tan 0.7853981633974483` → ~1 (tan of π/4)
- `calc tan 1.5707963267948966` → Very large number (approaching infinity)

### 7. `abs` - Absolute Value
Returns the absolute value of a number.

**Syntax:** `calc abs <num>`

**Examples:**
- `calc abs 5` → 5
- `calc abs -5` → 5
- `calc abs 0` → 0

### 8. `ceil` - Ceiling
Rounds a number up to the nearest integer.

**Syntax:** `calc ceil <num>`

**Examples:**
- `calc ceil 4.3` → 5
- `calc ceil -4.3` → -4
- `calc ceil 5` → 5

### 9. `floor` - Floor
Rounds a number down to the nearest integer.

**Syntax:** `calc floor <num>`

**Examples:**
- `calc floor 4.7` → 4
- `calc floor -4.7` → -5
- `calc floor 5` → 5

### 10. `round` - Round
Rounds a number to the nearest integer.

**Syntax:** `calc round <num>`

**Examples:**
- `calc round 4.3` → 4
- `calc round 4.7` → 5
- `calc round -4.5` → -4

## Implementation Requirements

1. Modify the CLI argument parser to support unary operations (single argument)
2. Update operation registry to support both unary and binary operations
3. Handle domain errors (e.g., sqrt of negative, log of non-positive)
4. Provide clear error messages for invalid inputs
5. Ensure trigonometric functions work with radians (consider adding degree support in future)
6. Handle floating-point precision appropriately

## Test Scenarios

### Test Suite 1: Square Root Operation

**Test 1.1: Perfect Square**
- **Input:** `calc sqrt 16`
- **Expected Output:** `Sqrt Math Result: 4`
- **Assertions:**
  - Result equals exactly 4
  - Operation name is "sqrt"

**Test 1.2: Non-Perfect Square**
- **Input:** `calc sqrt 2`
- **Expected Output:** `Sqrt Math Result: 1.4142135623730951` (approximately)
- **Assertions:**
  - Result is approximately 1.4142135623730951
  - Precision is maintained

**Test 1.3: Square Root of Zero**
- **Input:** `calc sqrt 0`
- **Expected Output:** `Sqrt Math Result: 0`
- **Assertions:**
  - Result equals 0
  - No errors thrown

**Test 1.4: Square Root of One**
- **Input:** `calc sqrt 1`
- **Expected Output:** `Sqrt Math Result: 1`
- **Assertions:**
  - Result equals exactly 1

**Test 1.5: Square Root of Decimal**
- **Input:** `calc sqrt 2.25`
- **Expected Output:** `Sqrt Math Result: 1.5`
- **Assertions:**
  - Result equals 1.5

**Test 1.6: Square Root of Negative Number (Error Case)**
- **Input:** `calc sqrt -4`
- **Expected Behavior:** Error message indicating square root of negative number is not allowed
- **Assertions:**
  - Error is thrown
  - Error message is clear: "Square root of negative number is not allowed"

**Test 1.7: Square Root of Very Large Number**
- **Input:** `calc sqrt 1000000`
- **Expected Output:** `Sqrt Math Result: 1000`
- **Assertions:**
  - Result equals 1000
  - Handles large numbers correctly

### Test Suite 2: Logarithm Operations

**Test 2.1: Natural Logarithm of One**
- **Input:** `calc log 1`
- **Expected Output:** `Log Math Result: 0`
- **Assertions:**
  - Result equals exactly 0
  - Operation name is "log"

**Test 2.2: Natural Logarithm of e**
- **Input:** `calc log 2.718281828459045`
- **Expected Output:** `Log Math Result: 1` (approximately)
- **Assertions:**
  - Result is approximately 1
  - Handles e correctly

**Test 2.3: Natural Logarithm of Positive Number**
- **Input:** `calc log 10`
- **Expected Output:** `Log Math Result: 2.302585092994046` (approximately)
- **Assertions:**
  - Result is approximately 2.302585092994046

**Test 2.4: Natural Logarithm of Zero (Error Case)**
- **Input:** `calc log 0`
- **Expected Behavior:** Error message indicating logarithm of zero is not allowed
- **Assertions:**
  - Error is thrown
  - Error message: "Logarithm of zero or negative number is not allowed"

**Test 2.5: Natural Logarithm of Negative Number (Error Case)**
- **Input:** `calc log -5`
- **Expected Behavior:** Error message indicating logarithm of negative number is not allowed
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.6: Base-10 Logarithm of One**
- **Input:** `calc log10 1`
- **Expected Output:** `Log10 Math Result: 0`
- **Assertions:**
  - Result equals exactly 0

**Test 2.7: Base-10 Logarithm of Ten**
- **Input:** `calc log10 10`
- **Expected Output:** `Log10 Math Result: 1`
- **Assertions:**
  - Result equals exactly 1

**Test 2.8: Base-10 Logarithm of One Hundred**
- **Input:** `calc log10 100`
- **Expected Output:** `Log10 Math Result: 2`
- **Assertions:**
  - Result equals exactly 2

**Test 2.9: Base-10 Logarithm of Zero (Error Case)**
- **Input:** `calc log10 0`
- **Expected Behavior:** Error message indicating logarithm of zero is not allowed
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 3: Trigonometric Operations

**Test 3.1: Sine of Zero**
- **Input:** `calc sin 0`
- **Expected Output:** `Sin Math Result: 0`
- **Assertions:**
  - Result equals exactly 0
  - Operation name is "sin"

**Test 3.2: Sine of π/2**
- **Input:** `calc sin 1.5707963267948966`
- **Expected Output:** `Sin Math Result: 1` (approximately)
- **Assertions:**
  - Result is approximately 1 (within floating point precision)

**Test 3.3: Sine of π**
- **Input:** `calc sin 3.141592653589793`
- **Expected Output:** `Sin Math Result: 0` (approximately)
- **Assertions:**
  - Result is approximately 0 (within floating point precision)

**Test 3.4: Cosine of Zero**
- **Input:** `calc cos 0`
- **Expected Output:** `Cos Math Result: 1`
- **Assertions:**
  - Result equals exactly 1
  - Operation name is "cos"

**Test 3.5: Cosine of π/2**
- **Input:** `calc cos 1.5707963267948966`
- **Expected Output:** `Cos Math Result: 0` (approximately)
- **Assertions:**
  - Result is approximately 0

**Test 3.6: Cosine of π**
- **Input:** `calc cos 3.141592653589793`
- **Expected Output:** `Cos Math Result: -1` (approximately)
- **Assertions:**
  - Result is approximately -1

**Test 3.7: Tangent of Zero**
- **Input:** `calc tan 0`
- **Expected Output:** `Tan Math Result: 0`
- **Assertions:**
  - Result equals exactly 0
  - Operation name is "tan"

**Test 3.8: Tangent of π/4**
- **Input:** `calc tan 0.7853981633974483`
- **Expected Output:** `Tan Math Result: 1` (approximately)
- **Assertions:**
  - Result is approximately 1

**Test 3.9: Tangent Near π/2 (Large Value)**
- **Input:** `calc tan 1.5707963267948966`
- **Expected Output:** Very large number (approaching infinity)
- **Assertions:**
  - Result is a very large positive number
  - No error thrown (handles asymptote gracefully)

### Test Suite 4: Absolute Value Operation

**Test 4.1: Absolute Value of Positive Number**
- **Input:** `calc abs 5`
- **Expected Output:** `Abs Math Result: 5`
- **Assertions:**
  - Result equals 5
  - Operation name is "abs"

**Test 4.2: Absolute Value of Negative Number**
- **Input:** `calc abs -5`
- **Expected Output:** `Abs Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 4.3: Absolute Value of Zero**
- **Input:** `calc abs 0`
- **Expected Output:** `Abs Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 4.4: Absolute Value of Decimal**
- **Input:** `calc abs -3.14`
- **Expected Output:** `Abs Math Result: 3.14`
- **Assertions:**
  - Result equals 3.14

### Test Suite 5: Rounding Operations

**Test 5.1: Ceiling of Positive Decimal**
- **Input:** `calc ceil 4.3`
- **Expected Output:** `Ceil Math Result: 5`
- **Assertions:**
  - Result equals 5
  - Operation name is "ceil"

**Test 5.2: Ceiling of Negative Decimal**
- **Input:** `calc ceil -4.3`
- **Expected Output:** `Ceil Math Result: -4`
- **Assertions:**
  - Result equals -4 (rounds toward positive infinity)

**Test 5.3: Ceiling of Integer**
- **Input:** `calc ceil 5`
- **Expected Output:** `Ceil Math Result: 5`
- **Assertions:**
  - Result equals 5 (no change for integers)

**Test 5.4: Floor of Positive Decimal**
- **Input:** `calc floor 4.7`
- **Expected Output:** `Floor Math Result: 4`
- **Assertions:**
  - Result equals 4
  - Operation name is "floor"

**Test 5.5: Floor of Negative Decimal**
- **Input:** `calc floor -4.7`
- **Expected Output:** `Floor Math Result: -5`
- **Assertions:**
  - Result equals -5 (rounds toward negative infinity)

**Test 5.6: Floor of Integer**
- **Input:** `calc floor 5`
- **Expected Output:** `Floor Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 5.7: Round Up**
- **Input:** `calc round 4.7`
- **Expected Output:** `Round Math Result: 5`
- **Assertions:**
  - Result equals 5
  - Operation name is "round"

**Test 5.8: Round Down**
- **Input:** `calc round 4.3`
- **Expected Output:** `Round Math Result: 4`
- **Assertions:**
  - Result equals 4

**Test 5.9: Round Half Up**
- **Input:** `calc round 4.5`
- **Expected Output:** `Round Math Result: 5`
- **Assertions:**
  - Result equals 5 (rounds up at 0.5)

**Test 5.10: Round Half Down (Edge Case)**
- **Input:** `calc round -4.5`
- **Expected Output:** `Round Math Result: -4` (or -5, depending on implementation)
- **Assertions:**
  - Result is consistent with JavaScript's Math.round behavior

### Test Suite 6: Edge Cases and Error Handling

**Test 6.1: Invalid Number Format**
- **Input:** `calc sqrt abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies the invalid argument

**Test 6.2: Missing Argument**
- **Input:** `calc sqrt`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 6.3: Very Small Positive Number**
- **Input:** `calc sqrt 0.0001`
- **Expected Output:** `Sqrt Math Result: 0.01`
- **Assertions:**
  - Result equals 0.01
  - Handles small numbers correctly

**Test 6.4: Very Large Number**
- **Input:** `calc log 1e10`
- **Expected Output:** `Log Math Result: 23.02585092994046` (approximately)
- **Assertions:**
  - Result is approximately correct
  - Handles scientific notation correctly

## Acceptance Criteria

1. ✅ All 10 operations are implemented (sqrt, log, log10, sin, cos, tan, abs, ceil, floor, round)
2. ✅ Operations accept exactly 1 argument
3. ✅ Domain errors are handled with clear error messages
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle edge cases gracefully (zero, negatives, very large/small numbers)
8. ✅ Floating-point precision is handled appropriately
9. ✅ Trigonometric functions work with radians

