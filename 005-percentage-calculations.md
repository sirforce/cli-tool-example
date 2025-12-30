# Spec 005: Percentage Calculations

## Overview
Add support for percentage-related calculations, enabling users to perform common percentage operations like finding percentages, percentage changes, and percentage of totals.

## Feature Description
Extend the CLI tool to support percentage operations that can calculate percentages, find what percentage one number is of another, calculate percentage increases/decreases, and perform percentage-based arithmetic.

## Operations to Add

### 1. `percent` - Calculate Percentage
Calculates what percentage the first number is of the second number.

**Syntax:** `calc percent <part> <total>`

**Examples:**
- `calc percent 25 100` → 25
- `calc percent 50 200` → 25
- `calc percent 1 3` → 33.333... (approximately)

### 2. `percentof` - Percentage of a Number
Calculates a given percentage of a number.

**Syntax:** `calc percentof <percentage> <number>`

**Examples:**
- `calc percentof 25 100` → 25
- `calc percentof 50 200` → 100
- `calc percentof 10 50` → 5

### 3. `percentchange` - Percentage Change
Calculates the percentage change from the first number to the second number.

**Syntax:** `calc percentchange <old_value> <new_value>`

**Examples:**
- `calc percentchange 100 120` → 20 (20% increase)
- `calc percentchange 100 80` → -20 (20% decrease)
- `calc percentchange 50 50` → 0 (no change)

### 4. `addpercent` - Add Percentage
Adds a percentage to a number.

**Syntax:** `calc addpercent <number> <percentage>`

**Examples:**
- `calc addpercent 100 10` → 110 (100 + 10%)
- `calc addpercent 50 20` → 60 (50 + 20%)
- `calc addpercent 200 15` → 230 (200 + 15%)

### 5. `subtractpercent` - Subtract Percentage
Subtracts a percentage from a number.

**Syntax:** `calc subtractpercent <number> <percentage>`

**Examples:**
- `calc subtractpercent 100 10` → 90 (100 - 10%)
- `calc subtractpercent 50 20` → 40 (50 - 20%)
- `calc subtractpercent 200 15` → 170 (200 - 15%)

### 6. `percentincrease` - Percentage Increase
Calculates what percentage increase is needed to go from the first number to the second number (same as percentchange but always positive).

**Syntax:** `calc percentincrease <old_value> <new_value>`

**Examples:**
- `calc percentincrease 100 120` → 20
- `calc percentincrease 50 75` → 50
- `calc percentincrease 100 100` → 0

## Implementation Requirements

1. Operations accept exactly 2 arguments
2. Handle division by zero appropriately (for percent operation when total is 0)
3. Provide clear error messages for invalid inputs
4. Handle decimal percentages correctly
5. Consider precision/rounding for percentage results
6. Handle negative percentages appropriately (for percentchange)

## Test Scenarios

### Test Suite 1: Percent Operation

**Test 1.1: Basic Percentage Calculation**
- **Input:** `calc percent 25 100`
- **Expected Output:** `Percent Math Result: 25`
- **Assertions:**
  - Result equals 25
  - Operation name is "percent"

**Test 1.2: Percentage with Different Totals**
- **Input:** `calc percent 50 200`
- **Expected Output:** `Percent Math Result: 25`
- **Assertions:**
  - Result equals 25 (50 is 25% of 200)

**Test 1.3: Percentage with Decimal Result**
- **Input:** `calc percent 1 3`
- **Expected Output:** `Percent Math Result: 33.333333333333336` (approximately)
- **Assertions:**
  - Result is approximately 33.333...
  - Handles repeating decimals

**Test 1.4: Percentage Greater Than 100**
- **Input:** `calc percent 150 100`
- **Expected Output:** `Percent Math Result: 150`
- **Assertions:**
  - Result equals 150 (part can be greater than total)

**Test 1.5: Percentage with Zero Part**
- **Input:** `calc percent 0 100`
- **Expected Output:** `Percent Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 1.6: Percentage with Zero Total (Error Case)**
- **Input:** `calc percent 25 0`
- **Expected Behavior:** Error message indicating division by zero
- **Assertions:**
  - Error is thrown
  - Error message: "Cannot calculate percentage: total cannot be zero"

**Test 1.7: Percentage with Decimal Numbers**
- **Input:** `calc percent 12.5 50`
- **Expected Output:** `Percent Math Result: 25`
- **Assertions:**
  - Result equals 25
  - Handles decimal inputs correctly

**Test 1.8: Percentage with Negative Numbers**
- **Input:** `calc percent -25 100`
- **Expected Output:** `Percent Math Result: -25` (or error, depending on implementation)
- **Assertions:**
  - Either returns -25 or throws error with clear message
  - Behavior is documented

### Test Suite 2: Percentof Operation

**Test 2.1: Basic Percentage Of**
- **Input:** `calc percentof 25 100`
- **Expected Output:** `Percentof Math Result: 25`
- **Assertions:**
  - Result equals 25
  - Operation name is "percentof"

**Test 2.2: Percentage Of with Different Values**
- **Input:** `calc percentof 50 200`
- **Expected Output:** `Percentof Math Result: 100`
- **Assertions:**
  - Result equals 100 (50% of 200)

**Test 2.3: Percentage Of with Decimal Percentage**
- **Input:** `calc percentof 12.5 100`
- **Expected Output:** `Percentof Math Result: 12.5`
- **Assertions:**
  - Result equals 12.5

**Test 2.4: Percentage Of with Decimal Number**
- **Input:** `calc percentof 10 50.5`
- **Expected Output:** `Percentof Math Result: 5.05`
- **Assertions:**
  - Result equals 5.05
  - Handles decimal calculations correctly

**Test 2.5: Percentage Of Zero**
- **Input:** `calc percentof 25 0`
- **Expected Output:** `Percentof Math Result: 0`
- **Assertions:**
  - Result equals 0 (any percentage of zero is zero)

**Test 2.6: Percentage Of 100%**
- **Input:** `calc percentof 100 50`
- **Expected Output:** `Percentof Math Result: 50`
- **Assertions:**
  - Result equals 50 (100% of 50 is 50)

**Test 2.7: Percentage Of Greater Than 100%**
- **Input:** `calc percentof 150 100`
- **Expected Output:** `Percentof Math Result: 150`
- **Assertions:**
  - Result equals 150 (150% of 100 is 150)

**Test 2.8: Percentage Of with Negative Number**
- **Input:** `calc percentof 10 -50`
- **Expected Output:** `Percentof Math Result: -5` (or error, depending on implementation)
- **Assertions:**
  - Either returns -5 or throws error with clear message
  - Behavior is documented

### Test Suite 3: Percentchange Operation

**Test 3.1: Percentage Increase**
- **Input:** `calc percentchange 100 120`
- **Expected Output:** `Percentchange Math Result: 20`
- **Assertions:**
  - Result equals 20 (20% increase)
  - Operation name is "percentchange"

**Test 3.2: Percentage Decrease**
- **Input:** `calc percentchange 100 80`
- **Expected Output:** `Percentchange Math Result: -20`
- **Assertions:**
  - Result equals -20 (20% decrease)
  - Negative result indicates decrease

**Test 3.3: No Change**
- **Input:** `calc percentchange 50 50`
- **Expected Output:** `Percentchange Math Result: 0`
- **Assertions:**
  - Result equals 0 (no change)

**Test 3.4: Percentage Change with Decimal Result**
- **Input:** `calc percentchange 100 115`
- **Expected Output:** `Percentchange Math Result: 15`
- **Assertions:**
  - Result equals 15 (15% increase)

**Test 3.5: Percentage Change from Zero (Error Case)**
- **Input:** `calc percentchange 0 100`
- **Expected Behavior:** Error message indicating division by zero
- **Assertions:**
  - Error is thrown
  - Error message: "Cannot calculate percentage change: old value cannot be zero"

**Test 3.6: Percentage Change to Zero**
- **Input:** `calc percentchange 100 0`
- **Expected Output:** `Percentchange Math Result: -100`
- **Assertions:**
  - Result equals -100 (100% decrease to zero)

**Test 3.7: Large Percentage Increase**
- **Input:** `calc percentchange 10 30`
- **Expected Output:** `Percentchange Math Result: 200`
- **Assertions:**
  - Result equals 200 (200% increase)

**Test 3.8: Percentage Change with Negative Values**
- **Input:** `calc percentchange -100 -80`
- **Expected Output:** `Percentchange Math Result: 20` (or error, depending on implementation)
- **Assertions:**
  - Either returns 20 or throws error with clear message
  - Behavior is documented

### Test Suite 4: Addpercent Operation

**Test 4.1: Basic Add Percentage**
- **Input:** `calc addpercent 100 10`
- **Expected Output:** `Addpercent Math Result: 110`
- **Assertions:**
  - Result equals 110 (100 + 10% of 100)
  - Operation name is "addpercent"

**Test 4.2: Add Percentage with Different Values**
- **Input:** `calc addpercent 50 20`
- **Expected Output:** `Addpercent Math Result: 60`
- **Assertions:**
  - Result equals 60 (50 + 20% of 50)

**Test 4.3: Add Percentage with Decimal**
- **Input:** `calc addpercent 100 12.5`
- **Expected Output:** `Addpercent Math Result: 112.5`
- **Assertions:**
  - Result equals 112.5
  - Handles decimal percentages correctly

**Test 4.4: Add Zero Percentage**
- **Input:** `calc addpercent 100 0`
- **Expected Output:** `Addpercent Math Result: 100`
- **Assertions:**
  - Result equals 100 (no change)

**Test 4.5: Add Large Percentage**
- **Input:** `calc addpercent 100 200`
- **Expected Output:** `Addpercent Math Result: 300`
- **Assertions:**
  - Result equals 300 (100 + 200% of 100)

**Test 4.6: Add Percentage to Zero**
- **Input:** `calc addpercent 0 10`
- **Expected Output:** `Addpercent Math Result: 0`
- **Assertions:**
  - Result equals 0 (10% of 0 is 0)

**Test 4.7: Add Percentage with Negative Number**
- **Input:** `calc addpercent -100 10`
- **Expected Output:** `Addpercent Math Result: -110` (or error, depending on implementation)
- **Assertions:**
  - Either returns -110 or throws error with clear message
  - Behavior is documented

### Test Suite 5: Subtractpercent Operation

**Test 5.1: Basic Subtract Percentage**
- **Input:** `calc subtractpercent 100 10`
- **Expected Output:** `Subtractpercent Math Result: 90`
- **Assertions:**
  - Result equals 90 (100 - 10% of 100)
  - Operation name is "subtractpercent"

**Test 5.2: Subtract Percentage with Different Values**
- **Input:** `calc subtractpercent 50 20`
- **Expected Output:** `Subtractpercent Math Result: 40`
- **Assertions:**
  - Result equals 40 (50 - 20% of 50)

**Test 5.3: Subtract Percentage with Decimal**
- **Input:** `calc subtractpercent 100 12.5`
- **Expected Output:** `Subtractpercent Math Result: 87.5`
- **Assertions:**
  - Result equals 87.5
  - Handles decimal percentages correctly

**Test 5.4: Subtract Zero Percentage**
- **Input:** `calc subtractpercent 100 0`
- **Expected Output:** `Subtractpercent Math Result: 100`
- **Assertions:**
  - Result equals 100 (no change)

**Test 5.5: Subtract Large Percentage**
- **Input:** `calc subtractpercent 100 50`
- **Expected Output:** `Subtractpercent Math Result: 50`
- **Assertions:**
  - Result equals 50 (100 - 50% of 100)

**Test 5.6: Subtract Percentage from Zero**
- **Input:** `calc subtractpercent 0 10`
- **Expected Output:** `Subtractpercent Math Result: 0`
- **Assertions:**
  - Result equals 0 (10% of 0 is 0)

**Test 5.7: Subtract More Than 100%**
- **Input:** `calc subtractpercent 100 150`
- **Expected Output:** `Subtractpercent Math Result: -50` (or error, depending on implementation)
- **Assertions:**
  - Either returns -50 or throws error with clear message
  - Behavior is documented

### Test Suite 6: Percentincrease Operation

**Test 6.1: Basic Percentage Increase**
- **Input:** `calc percentincrease 100 120`
- **Expected Output:** `Percentincrease Math Result: 20`
- **Assertions:**
  - Result equals 20 (20% increase)
  - Operation name is "percentincrease"

**Test 6.2: Percentage Increase with Different Values**
- **Input:** `calc percentincrease 50 75`
- **Expected Output:** `Percentincrease Math Result: 50`
- **Assertions:**
  - Result equals 50 (50% increase)

**Test 6.3: No Increase**
- **Input:** `calc percentincrease 100 100`
- **Expected Output:** `Percentincrease Math Result: 0`
- **Assertions:**
  - Result equals 0 (no increase)

**Test 6.4: Large Percentage Increase**
- **Input:** `calc percentincrease 10 30`
- **Expected Output:** `Percentincrease Math Result: 200`
- **Assertions:**
  - Result equals 200 (200% increase)

**Test 6.5: Percentage Increase from Zero (Error Case)**
- **Input:** `calc percentincrease 0 100`
- **Expected Behavior:** Error message indicating division by zero
- **Assertions:**
  - Error is thrown
  - Error message: "Cannot calculate percentage increase: old value cannot be zero"

**Test 6.6: Decrease (Should Return Negative or Zero)**
- **Input:** `calc percentincrease 100 80`
- **Expected Output:** `Percentincrease Math Result: -20` (or 0, depending on implementation)
- **Assertions:**
  - Either returns -20 or 0
  - Behavior is documented (should it be absolute value or allow negative?)

**Test 6.7: Percentage Increase with Decimal Result**
- **Input:** `calc percentincrease 100 115`
- **Expected Output:** `Percentincrease Math Result: 15`
- **Assertions:**
  - Result equals 15

### Test Suite 7: Edge Cases and Error Handling

**Test 7.1: Invalid Number Format**
- **Input:** `calc percent 25 abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies the invalid argument

**Test 7.2: Missing Arguments**
- **Input:** `calc percent 25`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.3: Very Small Percentages**
- **Input:** `calc percentof 0.1 1000`
- **Expected Output:** `Percentof Math Result: 1`
- **Assertions:**
  - Result equals 1
  - Handles very small percentages correctly

**Test 7.4: Very Large Percentages**
- **Input:** `calc percentof 1000 100`
- **Expected Output:** `Percentof Math Result: 1000`
- **Assertions:**
  - Result equals 1000 (1000% of 100)
  - Handles percentages > 100% correctly

**Test 7.5: Precision with Repeating Decimals**
- **Input:** `calc percent 1 3`
- **Expected Output:** Result with appropriate precision
- **Assertions:**
  - Result is approximately 33.333...
  - Precision is handled appropriately

**Test 7.6: Round-Trip Calculation**
- **Input:** `calc addpercent 100 10` then `calc subtractpercent <result> 10`
- **Expected:** Should return approximately 100 (may have floating point precision issues)
- **Assertions:**
  - Result is approximately 100
  - Floating point precision is handled appropriately

## Acceptance Criteria

1. ✅ All 6 percentage operations are implemented (percent, percentof, percentchange, addpercent, subtractpercent, percentincrease)
2. ✅ Operations accept exactly 2 arguments
3. ✅ Division by zero errors are handled with clear error messages
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle edge cases gracefully (zero, negatives, decimals, large percentages)
8. ✅ Percentage calculations maintain appropriate precision
9. ✅ Operations handle both positive and negative percentage changes correctly
10. ✅ Behavior with negative numbers is documented and consistent

