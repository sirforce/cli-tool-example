# Spec 015: Random Number Generation

## Overview
Add support for generating random numbers with various distributions and ranges, enabling users to generate random values for simulations, testing, and other applications.

## Feature Description
Extend the CLI tool to support random number generation operations that can generate random integers, floating-point numbers, and numbers within specified ranges.

## Operations to Add

### 1. `random` - Random Number
Generates a random number between 0 and 1, or within a specified range.

**Syntax:** `calc random` or `calc random <min> <max>` or `calc random --integer <min> <max>`

**Examples:**
- `calc random` → Random number between 0 and 1
- `calc random 1 10` → Random number between 1 and 10
- `calc random --integer 1 10` → Random integer between 1 and 10 (inclusive)

### 2. `randomint` - Random Integer
Generates a random integer within a specified range.

**Syntax:** `calc randomint <min> <max>`

**Examples:**
- `calc randomint 1 100` → Random integer between 1 and 100
- `calc randomint 0 9` → Random integer between 0 and 9

### 3. `randomlist` - Generate Random List
Generates a list of random numbers.

**Syntax:** `calc randomlist <count> [min] [max]`

**Examples:**
- `calc randomlist 10` → 10 random numbers between 0 and 1
- `calc randomlist 5 1 100` → 5 random numbers between 1 and 100

### 4. `seed` - Set Random Seed
Sets the seed for the random number generator (for reproducibility).

**Syntax:** `calc seed <value>` (affects subsequent random operations)

**Examples:**
- `calc seed 12345` → Sets seed, then `calc random` uses that seed

## Implementation Requirements

1. Use a cryptographically secure or high-quality PRNG
2. Support seed setting for reproducibility
3. Handle range validation (min < max)
4. For integer ranges, include both endpoints (inclusive)
5. For float ranges, typically include min, exclude max (or include both, document behavior)
6. Provide clear error messages for invalid ranges
7. Consider thread-safety if applicable

## Test Scenarios

### Test Suite 1: Random Operation (Float)

**Test 1.1: Random Without Arguments**
- **Input:** `calc random`
- **Expected Output:** Random number between 0 and 1
- **Assertions:**
  - Result is between 0 and 1 (inclusive or exclusive max, document behavior)
  - Operation name is "random"

**Test 1.2: Random in Range**
- **Input:** `calc random 1 10`
- **Expected Output:** Random number between 1 and 10
- **Assertions:**
  - Result is between 1 and 10
  - Result is a floating-point number

**Test 1.3: Random with Same Min and Max**
- **Input:** `calc random 5 5`
- **Expected Output:** `Random Math Result: 5` (or error)
- **Assertions:**
  - Either returns 5 or throws error
  - Behavior is documented

**Test 1.4: Random with Negative Range**
- **Input:** `calc random -10 -5`
- **Expected Output:** Random number between -10 and -5
- **Assertions:**
  - Result is between -10 and -5
  - Handles negative ranges

**Test 1.5: Random with Large Range**
- **Input:** `calc random 0 1000000`
- **Expected Output:** Random number between 0 and 1000000
- **Assertions:**
  - Result is within range
  - Handles large ranges

**Test 1.6: Invalid Range (Error Case)**
- **Input:** `calc random 10 5`
- **Expected Behavior:** Error message indicating min must be less than max
- **Assertions:**
  - Error is thrown
  - Error message: "Minimum value must be less than maximum value"

**Test 1.7: Missing Arguments for Range**
- **Input:** `calc random 5`
- **Expected Behavior:** Error message indicating missing argument or default behavior
- **Assertions:**
  - Either error or uses default (0 to 1)
  - Behavior is documented

### Test Suite 2: Random Integer Operation

**Test 2.1: Random Integer in Range**
- **Input:** `calc randomint 1 10`
- **Expected Output:** Random integer between 1 and 10 (inclusive)
- **Assertions:**
  - Result is an integer
  - Result is between 1 and 10 (inclusive)
  - Operation name is "randomint"

**Test 2.2: Random Integer Single Value**
- **Input:** `calc randomint 5 5`
- **Expected Output:** `Randomint Math Result: 5`
- **Assertions:**
  - Result equals 5

**Test 2.3: Random Integer with Negative Range**
- **Input:** `calc randomint -5 -1`
- **Expected Output:** Random integer between -5 and -1 (inclusive)
- **Assertions:**
  - Result is an integer
  - Result is between -5 and -1
  - Handles negative ranges

**Test 2.4: Random Integer Large Range**
- **Input:** `calc randomint 1 1000000`
- **Expected Output:** Random integer between 1 and 1000000
- **Assertions:**
  - Result is within range
  - Handles large ranges

**Test 2.5: Random Integer Zero to One**
- **Input:** `calc randomint 0 1`
- **Expected Output:** Either 0 or 1
- **Assertions:**
  - Result is either 0 or 1
  - Both values are possible

**Test 2.6: Invalid Range (Error Case)**
- **Input:** `calc randomint 10 5`
- **Expected Behavior:** Error message indicating min must be less than or equal to max
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.7: Missing Arguments (Error Case)**
- **Input:** `calc randomint 5`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.8: Decimal Arguments**
- **Input:** `calc randomint 1.5 10.7`
- **Expected Output:** Random integer (may round arguments or error)
- **Assertions:**
  - Either rounds to integers or throws error
  - Behavior is documented

### Test Suite 3: Random List Operation

**Test 3.1: Random List Default Range**
- **Input:** `calc randomlist 10`
- **Expected Output:** 10 random numbers between 0 and 1
- **Assertions:**
  - Result contains exactly 10 numbers
  - All numbers are between 0 and 1
  - Operation name is "randomlist"

**Test 3.2: Random List with Range**
- **Input:** `calc randomlist 5 1 100`
- **Expected Output:** 5 random numbers between 1 and 100
- **Assertions:**
  - Result contains exactly 5 numbers
  - All numbers are between 1 and 100

**Test 3.3: Random List Single Number**
- **Input:** `calc randomlist 1 0 10`
- **Expected Output:** Single random number
- **Assertions:**
  - Result contains exactly 1 number
  - Number is within range

**Test 3.4: Random List Large Count**
- **Input:** `calc randomlist 1000 1 100`
- **Expected Output:** 1000 random numbers
- **Assertions:**
  - Result contains exactly 1000 numbers
  - All numbers are within range
  - Handles large counts efficiently

**Test 3.5: Random List Integers**
- **Input:** `calc randomlist 10 1 10 --integer`
- **Expected Output:** 10 random integers (if supported)
- **Assertions:**
  - Result contains integers
  - All numbers are integers within range

**Test 3.6: Zero Count (Error Case)**
- **Input:** `calc randomlist 0`
- **Expected Behavior:** Error message or empty result
- **Assertions:**
  - Either returns empty or throws error
  - Behavior is documented

**Test 3.7: Negative Count (Error Case)**
- **Input:** `calc randomlist -5`
- **Expected Behavior:** Error message indicating count must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.8: Invalid Range**
- **Input:** `calc randomlist 10 100 50`
- **Expected Behavior:** Error message indicating invalid range
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Seed Operation

**Test 4.1: Set Seed and Generate**
- **Input:** `calc seed 12345` then `calc random`
- **Expected:** First random number should be deterministic based on seed
- **Assertions:**
  - Seed is set correctly
  - Subsequent random operations use the seed
  - Operation name is "seed"

**Test 4.2: Same Seed Produces Same Sequence**
- **Input:** `calc seed 42` then `calc random` (multiple times)
- **Expected:** Same seed produces same sequence
- **Assertions:**
  - Sequence is reproducible with same seed

**Test 4.3: Different Seeds Produce Different Sequences**
- **Input:** `calc seed 100` then `calc random` vs `calc seed 200` then `calc random`
- **Expected:** Different seeds produce different values
- **Assertions:**
  - Values are different (with high probability)

**Test 4.4: Seed with Zero**
- **Input:** `calc seed 0`
- **Expected:** Seed is set to 0
- **Assertions:**
  - Seed accepts 0
  - Random generation works with seed 0

**Test 4.5: Seed with Negative Value**
- **Input:** `calc seed -12345`
- **Expected:** Seed is set (may convert to unsigned or error)
- **Assertions:**
  - Either accepts negative or throws error
  - Behavior is documented

**Test 4.6: Seed with Large Value**
- **Input:** `calc seed 999999999`
- **Expected:** Seed is set
- **Assertions:**
  - Handles large seed values
  - Random generation works

**Test 4.7: Missing Argument (Error Case)**
- **Input:** `calc seed`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.8: Invalid Seed Format**
- **Input:** `calc seed abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Edge Cases and Distribution

**Test 5.1: Multiple Random Calls**
- **Input:** `calc random` (called multiple times)
- **Expected:** Each call produces different value (with high probability)
- **Assertions:**
  - Values are different (statistically)
  - Randomness is maintained

**Test 5.2: Uniform Distribution Check**
- **Input:** Generate many random numbers and check distribution
- **Expected:** Distribution should be approximately uniform
- **Assertions:**
  - For large sample, distribution is approximately uniform
  - Can verify statistically

**Test 5.3: Range Boundaries**
- **Input:** `calc randomint 1 2` (many times)
- **Expected:** Both 1 and 2 appear (with equal probability ideally)
- **Assertions:**
  - Both boundary values are possible
  - Distribution is fair

**Test 5.4: Very Small Range**
- **Input:** `calc random 10 10.0001`
- **Expected:** Random number in very small range
- **Assertions:**
  - Result is within range
  - Handles small ranges

**Test 5.5: Very Large Range**
- **Input:** `calc random 0 1e10`
- **Expected:** Random number in very large range
- **Assertions:**
  - Result is within range
  - Handles large ranges

**Test 5.6: Reproducibility with Seed**
- **Input:** Set seed, generate sequence, reset seed, generate again
- **Expected:** Sequences match
- **Assertions:**
  - Reproducibility works correctly
  - Same seed produces same sequence

**Test 5.7: Invalid Number Format**
- **Input:** `calc random abc 10`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

## Acceptance Criteria

1. ✅ All 4 random operations are implemented (random, randomint, randomlist, seed)
2. ✅ Random number generation uses quality PRNG
3. ✅ Seed setting works for reproducibility
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle edge cases gracefully (invalid ranges, zero count, etc.)
8. ✅ Range validation is correct (min < max)
9. ✅ Integer ranges are inclusive of both endpoints
10. ✅ Random numbers are uniformly distributed (statistically)
11. ✅ Reproducibility with seeds works correctly

