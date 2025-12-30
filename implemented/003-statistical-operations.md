# Spec 003: Statistical Operations

## Overview
Add support for statistical operations that can calculate measures of central tendency and dispersion from multiple numbers, enabling users to perform basic statistical analysis.

## Feature Description
Extend the CLI tool to support statistical operations that accept multiple numbers and calculate statistical measures like mean, median, mode, standard deviation, and variance.

## Operations to Add

### 1. `mean` - Arithmetic Mean (Average)
Calculates the average of all provided numbers.

**Syntax:** `calc mean <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc mean 2 4 6` → 4
- `calc mean 1 2 3 4 5` → 3
- `calc mean 10 20 30` → 20

### 2. `median` - Median Value
Finds the middle value when numbers are sorted. If there's an even number of values, returns the average of the two middle values.

**Syntax:** `calc median <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc median 1 3 5` → 3
- `calc median 1 2 3 4` → 2.5
- `calc median 5 2 8 1 9` → 5

### 3. `mode` - Most Frequent Value
Finds the value(s) that appear most frequently. If multiple values have the same highest frequency, returns all of them (comma-separated or as a list).

**Syntax:** `calc mode <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc mode 1 2 2 3` → 2
- `calc mode 1 1 2 2 3` → 1, 2 (or both values)
- `calc mode 5 5 5 3 3` → 5

### 4. `stddev` - Standard Deviation
Calculates the population standard deviation of the provided numbers.

**Syntax:** `calc stddev <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc stddev 2 4 6` → ~1.633 (approximately)
- `calc stddev 1 2 3 4 5` → ~1.414 (approximately)
- `calc stddev 10 10 10` → 0

### 5. `variance` - Variance
Calculates the population variance of the provided numbers.

**Syntax:** `calc variance <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc variance 2 4 6` → ~2.667 (approximately)
- `calc variance 1 2 3 4 5` → 2
- `calc variance 10 10 10` → 0

### 6. `range` - Range
Calculates the difference between the maximum and minimum values.

**Syntax:** `calc range <num1> <num2> [num3] [num4] ...`

**Examples:**
- `calc range 1 5 3` → 4
- `calc range 10 20 15 25` → 15
- `calc range 5 5 5` → 0

## Implementation Requirements

1. Operations must accept 2 or more arguments
2. Validate that at least 2 numbers are provided
3. Handle edge cases (all same numbers, two numbers, etc.)
4. For mode operation, handle multiple modes appropriately
5. Use population standard deviation/variance (not sample)
6. Sort numbers appropriately for median calculation
7. Handle decimal precision correctly

## Test Scenarios

### Test Suite 1: Mean Operation

**Test 1.1: Basic Mean with Two Numbers**
- **Input:** `calc mean 2 4`
- **Expected Output:** `Mean Math Result: 3`
- **Assertions:**
  - Result equals 3
  - Operation name is "mean"

**Test 1.2: Mean with Three Numbers**
- **Input:** `calc mean 2 4 6`
- **Expected Output:** `Mean Math Result: 4`
- **Assertions:**
  - Result equals exactly 4

**Test 1.3: Mean with Multiple Numbers**
- **Input:** `calc mean 1 2 3 4 5`
- **Expected Output:** `Mean Math Result: 3`
- **Assertions:**
  - Result equals exactly 3

**Test 1.4: Mean with Decimal Numbers**
- **Input:** `calc mean 1.5 2.5 3.5`
- **Expected Output:** `Mean Math Result: 2.5`
- **Assertions:**
  - Result equals 2.5

**Test 1.5: Mean with Negative Numbers**
- **Input:** `calc mean -2 0 2`
- **Expected Output:** `Mean Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 1.6: Mean with Single Number (Error Case)**
- **Input:** `calc mean 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 1.7: Mean with All Same Numbers**
- **Input:** `calc mean 5 5 5 5`
- **Expected Output:** `Mean Math Result: 5`
- **Assertions:**
  - Result equals 5

### Test Suite 2: Median Operation

**Test 2.1: Median with Odd Number of Values**
- **Input:** `calc median 1 3 5`
- **Expected Output:** `Median Math Result: 3`
- **Assertions:**
  - Result equals 3
  - Operation name is "median"

**Test 2.2: Median with Even Number of Values**
- **Input:** `calc median 1 2 3 4`
- **Expected Output:** `Median Math Result: 2.5`
- **Assertions:**
  - Result equals 2.5 (average of 2 and 3)

**Test 2.3: Median with Unsorted Values**
- **Input:** `calc median 5 2 8 1 9`
- **Expected Output:** `Median Math Result: 5`
- **Assertions:**
  - Result equals 5 (middle value when sorted: 1, 2, 5, 8, 9)

**Test 2.4: Median with Two Numbers**
- **Input:** `calc median 3 7`
- **Expected Output:** `Median Math Result: 5`
- **Assertions:**
  - Result equals 5 (average of 3 and 7)

**Test 2.5: Median with Decimal Numbers**
- **Input:** `calc median 1.5 2.5 3.5 4.5`
- **Expected Output:** `Median Math Result: 3`
- **Assertions:**
  - Result equals 3 (average of 2.5 and 3.5)

**Test 2.6: Median with Negative Numbers**
- **Input:** `calc median -5 -1 -3`
- **Expected Output:** `Median Math Result: -3`
- **Assertions:**
  - Result equals -3 (middle value when sorted: -5, -3, -1)

**Test 2.7: Median with Duplicate Values**
- **Input:** `calc median 2 2 5 5 8`
- **Expected Output:** `Median Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 2.8: Median with Single Number (Error Case)**
- **Input:** `calc median 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 3: Mode Operation

**Test 3.1: Single Mode**
- **Input:** `calc mode 1 2 2 3`
- **Expected Output:** `Mode Math Result: 2`
- **Assertions:**
  - Result equals 2
  - Operation name is "mode"

**Test 3.2: Multiple Modes (Two Values)**
- **Input:** `calc mode 1 1 2 2 3`
- **Expected Output:** `Mode Math Result: 1, 2` (or similar format showing both)
- **Assertions:**
  - Result includes both 1 and 2
  - Format is clear and readable

**Test 3.3: All Values Are Mode**
- **Input:** `calc mode 5 5 5`
- **Expected Output:** `Mode Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 3.4: No Mode (All Unique)**
- **Input:** `calc mode 1 2 3 4 5`
- **Expected Output:** `Mode Math Result: No mode` (or all values, depending on implementation)
- **Assertions:**
  - Handles case where all values appear once
  - Output is clear

**Test 3.5: Mode with Decimal Numbers**
- **Input:** `calc mode 1.5 1.5 2.5 3.5`
- **Expected Output:** `Mode Math Result: 1.5`
- **Assertions:**
  - Result equals 1.5

**Test 3.6: Mode with Three Modes**
- **Input:** `calc mode 1 1 2 2 3 3 4`
- **Expected Output:** `Mode Math Result: 1, 2, 3` (or similar)
- **Assertions:**
  - Result includes all three modes
  - Format is clear

**Test 3.7: Mode with Single Number (Error Case)**
- **Input:** `calc mode 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Standard Deviation Operation

**Test 4.1: Standard Deviation with Two Numbers**
- **Input:** `calc stddev 2 4`
- **Expected Output:** `Stddev Math Result: 1` (approximately)
- **Assertions:**
  - Result equals 1 (population stddev of [2, 4] with mean 3)
  - Operation name is "stddev"

**Test 4.2: Standard Deviation with Three Numbers**
- **Input:** `calc stddev 2 4 6`
- **Expected Output:** `Stddev Math Result: 1.632993161855452` (approximately)
- **Assertions:**
  - Result is approximately 1.633
  - Uses population standard deviation formula

**Test 4.3: Standard Deviation with Same Numbers**
- **Input:** `calc stddev 5 5 5`
- **Expected Output:** `Stddev Math Result: 0`
- **Assertions:**
  - Result equals exactly 0

**Test 4.4: Standard Deviation with Multiple Numbers**
- **Input:** `calc stddev 1 2 3 4 5`
- **Expected Output:** `Stddev Math Result: 1.4142135623730951` (approximately)
- **Assertions:**
  - Result is approximately 1.414 (√2)

**Test 4.5: Standard Deviation with Decimal Numbers**
- **Input:** `calc stddev 1.5 2.5 3.5`
- **Expected Output:** `Stddev Math Result: 0.816496580927726` (approximately)
- **Assertions:**
  - Result is approximately 0.816
  - Handles decimals correctly

**Test 4.6: Standard Deviation with Negative Numbers**
- **Input:** `calc stddev -2 0 2`
- **Expected Output:** `Stddev Math Result: 1.632993161855452` (approximately)
- **Assertions:**
  - Result is approximately 1.633
  - Handles negative numbers correctly

**Test 4.7: Standard Deviation with Single Number (Error Case)**
- **Input:** `calc stddev 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Variance Operation

**Test 5.1: Variance with Two Numbers**
- **Input:** `calc variance 2 4`
- **Expected Output:** `Variance Math Result: 1`
- **Assertions:**
  - Result equals 1 (variance of [2, 4])
  - Operation name is "variance"

**Test 5.2: Variance with Three Numbers**
- **Input:** `calc variance 2 4 6`
- **Expected Output:** `Variance Math Result: 2.6666666666666665` (approximately)
- **Assertions:**
  - Result is approximately 2.667
  - Uses population variance formula

**Test 5.3: Variance with Same Numbers**
- **Input:** `calc variance 5 5 5`
- **Expected Output:** `Variance Math Result: 0`
- **Assertions:**
  - Result equals exactly 0

**Test 5.4: Variance Relationship to Standard Deviation**
- **Input:** `calc variance 1 2 3 4 5`
- **Expected Output:** `Variance Math Result: 2`
- **Assertions:**
  - Result equals 2
  - Variance should equal stddev²

**Test 5.5: Variance with Decimal Numbers**
- **Input:** `calc variance 1.5 2.5 3.5`
- **Expected Output:** `Variance Math Result: 0.6666666666666666` (approximately)
- **Assertions:**
  - Result is approximately 0.667
  - Handles decimals correctly

**Test 5.6: Variance with Single Number (Error Case)**
- **Input:** `calc variance 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 6: Range Operation

**Test 6.1: Basic Range**
- **Input:** `calc range 1 5 3`
- **Expected Output:** `Range Math Result: 4`
- **Assertions:**
  - Result equals 4 (5 - 1)
  - Operation name is "range"

**Test 6.2: Range with Multiple Numbers**
- **Input:** `calc range 10 20 15 25`
- **Expected Output:** `Range Math Result: 15`
- **Assertions:**
  - Result equals 15 (25 - 10)

**Test 6.3: Range with Same Numbers**
- **Input:** `calc range 5 5 5`
- **Expected Output:** `Range Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 6.4: Range with Negative Numbers**
- **Input:** `calc range -5 -1 -3`
- **Expected Output:** `Range Math Result: 4`
- **Assertions:**
  - Result equals 4 (-1 - (-5))

**Test 6.5: Range with Mixed Positive and Negative**
- **Input:** `calc range -5 0 5`
- **Expected Output:** `Range Math Result: 10`
- **Assertions:**
  - Result equals 10 (5 - (-5))

**Test 6.6: Range with Decimal Numbers**
- **Input:** `calc range 1.5 2.5 3.5`
- **Expected Output:** `Range Math Result: 2`
- **Assertions:**
  - Result equals 2 (3.5 - 1.5)

**Test 6.7: Range with Single Number (Error Case)**
- **Input:** `calc range 5`
- **Expected Behavior:** Error message indicating at least 2 numbers required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 7: Integration and Edge Cases

**Test 7.1: Large Dataset**
- **Input:** `calc mean 1 2 3 4 5 6 7 8 9 10`
- **Expected Output:** `Mean Math Result: 5.5`
- **Assertions:**
  - Result equals 5.5
  - Handles 10 arguments correctly

**Test 7.2: Very Small Numbers**
- **Input:** `calc mean 0.001 0.002 0.003`
- **Expected Output:** `Mean Math Result: 0.002`
- **Assertions:**
  - Result equals 0.002
  - Handles very small numbers correctly

**Test 7.3: Very Large Numbers**
- **Input:** `calc mean 1000000 2000000 3000000`
- **Expected Output:** `Mean Math Result: 2000000`
- **Assertions:**
  - Result equals 2000000
  - Handles large numbers correctly

**Test 7.4: Invalid Number Format**
- **Input:** `calc mean 5 abc 3`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies the invalid argument

**Test 7.5: Empty Arguments**
- **Input:** `calc mean`
- **Expected Behavior:** Error message indicating insufficient arguments
- **Assertions:**
  - Error is thrown
  - Error message is clear

## Acceptance Criteria

1. ✅ All 6 statistical operations are implemented (mean, median, mode, stddev, variance, range)
2. ✅ Operations accept 2 or more arguments
3. ✅ Operations validate that at least 2 numbers are provided
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle edge cases gracefully (same numbers, negatives, decimals, large numbers)
8. ✅ Mode operation handles multiple modes appropriately
9. ✅ Standard deviation and variance use population formulas (not sample)
10. ✅ Median correctly sorts and finds middle value(s)

