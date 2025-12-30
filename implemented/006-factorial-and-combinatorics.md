# Spec 006: Factorial and Combinatorics

## Overview
Add support for factorial calculations and combinatorial operations, enabling users to perform calculations involving permutations and combinations.

## Feature Description
Extend the CLI tool to support operations for calculating factorials, combinations (n choose k), and permutations, which are fundamental operations in combinatorics and probability.

## Operations to Add

### 1. `factorial` - Factorial
Calculates the factorial of a non-negative integer (n!).

**Syntax:** `calc factorial <n>`

**Examples:**
- `calc factorial 5` → 120
- `calc factorial 0` → 1
- `calc factorial 10` → 3628800

### 2. `combine` - Combinations (n choose k)
Calculates the number of ways to choose k items from n items without regard to order (C(n,k) = n! / (k! * (n-k)!)).

**Syntax:** `calc combine <n> <k>`

**Examples:**
- `calc combine 5 2` → 10
- `calc combine 10 3` → 120
- `calc combine 6 6` → 1

### 3. `permute` - Permutations
Calculates the number of ways to arrange k items from n items with regard to order (P(n,k) = n! / (n-k)!).

**Syntax:** `calc permute <n> <k>`

**Examples:**
- `calc permute 5 2` → 20
- `calc permute 10 3` → 720
- `calc permute 6 6` → 720

## Implementation Requirements

1. Operations accept 1 argument (factorial) or 2 arguments (combine, permute)
2. Validate that inputs are non-negative integers
3. Handle edge cases (factorial of 0, k > n, k = n, k = 0)
4. Provide clear error messages for invalid inputs (negative numbers, decimals, k > n)
5. Consider performance for large factorials (may need BigInt support)
6. Handle integer overflow appropriately

## Test Scenarios

### Test Suite 1: Factorial Operation

**Test 1.1: Factorial of Zero**
- **Input:** `calc factorial 0`
- **Expected Output:** `Factorial Math Result: 1`
- **Assertions:**
  - Result equals 1 (by definition, 0! = 1)
  - Operation name is "factorial"

**Test 1.2: Factorial of One**
- **Input:** `calc factorial 1`
- **Expected Output:** `Factorial Math Result: 1`
- **Assertions:**
  - Result equals 1

**Test 1.3: Factorial of Small Number**
- **Input:** `calc factorial 5`
- **Expected Output:** `Factorial Math Result: 120`
- **Assertions:**
  - Result equals 120 (5! = 5 × 4 × 3 × 2 × 1)

**Test 1.4: Factorial of Medium Number**
- **Input:** `calc factorial 10`
- **Expected Output:** `Factorial Math Result: 3628800`
- **Assertions:**
  - Result equals 3628800

**Test 1.5: Factorial of Negative Number (Error Case)**
- **Input:** `calc factorial -5`
- **Expected Behavior:** Error message indicating factorial is only defined for non-negative integers
- **Assertions:**
  - Error is thrown
  - Error message: "Factorial is only defined for non-negative integers"

**Test 1.6: Factorial of Decimal (Error Case)**
- **Input:** `calc factorial 5.5`
- **Expected Behavior:** Error message indicating factorial requires an integer
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 1.7: Factorial of Large Number**
- **Input:** `calc factorial 20`
- **Expected Output:** `Factorial Math Result: 2432902008176640000` (or appropriate large number)
- **Assertions:**
  - Result is correct
  - Handles large numbers (may need BigInt)

**Test 1.8: Invalid Input Format**
- **Input:** `calc factorial abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 2: Combine Operation

**Test 2.1: Basic Combination**
- **Input:** `calc combine 5 2`
- **Expected Output:** `Combine Math Result: 10`
- **Assertions:**
  - Result equals 10 (C(5,2) = 10)
  - Operation name is "combine"

**Test 2.2: Combination with Larger Numbers**
- **Input:** `calc combine 10 3`
- **Expected Output:** `Combine Math Result: 120`
- **Assertions:**
  - Result equals 120

**Test 2.3: Combination When k Equals n**
- **Input:** `calc combine 6 6`
- **Expected Output:** `Combine Math Result: 1`
- **Assertions:**
  - Result equals 1 (only one way to choose all items)

**Test 2.4: Combination When k Equals Zero**
- **Input:** `calc combine 5 0`
- **Expected Output:** `Combine Math Result: 1`
- **Assertions:**
  - Result equals 1 (only one way to choose zero items)

**Test 2.5: Combination When k Equals One**
- **Input:** `calc combine 5 1`
- **Expected Output:** `Combine Math Result: 5`
- **Assertions:**
  - Result equals 5 (n ways to choose 1 item)

**Test 2.6: Combination Symmetry**
- **Input:** `calc combine 10 3` and `calc combine 10 7`
- **Expected:** Both should return the same result (120)
- **Assertions:**
  - C(n,k) = C(n,n-k)
  - Both results equal 120

**Test 2.7: k Greater Than n (Error Case)**
- **Input:** `calc combine 5 10`
- **Expected Behavior:** Error message indicating k cannot be greater than n
- **Assertions:**
  - Error is thrown
  - Error message: "k cannot be greater than n in combinations"

**Test 2.8: Negative n (Error Case)**
- **Input:** `calc combine -5 2`
- **Expected Behavior:** Error message indicating n must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.9: Negative k (Error Case)**
- **Input:** `calc combine 5 -2`
- **Expected Behavior:** Error message indicating k must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.10: Decimal Inputs (Error Case)**
- **Input:** `calc combine 5.5 2`
- **Expected Behavior:** Error message indicating inputs must be integers
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 3: Permute Operation

**Test 3.1: Basic Permutation**
- **Input:** `calc permute 5 2`
- **Expected Output:** `Permute Math Result: 20`
- **Assertions:**
  - Result equals 20 (P(5,2) = 5 × 4 = 20)
  - Operation name is "permute"

**Test 3.2: Permutation with Larger Numbers**
- **Input:** `calc permute 10 3`
- **Expected Output:** `Permute Math Result: 720`
- **Assertions:**
  - Result equals 720 (P(10,3) = 10 × 9 × 8)

**Test 3.3: Permutation When k Equals n**
- **Input:** `calc permute 6 6`
- **Expected Output:** `Permute Math Result: 720`
- **Assertions:**
  - Result equals 720 (6! = 720)

**Test 3.4: Permutation When k Equals Zero**
- **Input:** `calc permute 5 0`
- **Expected Output:** `Permute Math Result: 1`
- **Assertions:**
  - Result equals 1 (one way to arrange zero items)

**Test 3.5: Permutation When k Equals One**
- **Input:** `calc permute 5 1`
- **Expected Output:** `Permute Math Result: 5`
- **Assertions:**
  - Result equals 5 (n ways to arrange 1 item)

**Test 3.6: k Greater Than n (Error Case)**
- **Input:** `calc permute 5 10`
- **Expected Behavior:** Error message indicating k cannot be greater than n
- **Assertions:**
  - Error is thrown
  - Error message: "k cannot be greater than n in permutations"

**Test 3.7: Negative n (Error Case)**
- **Input:** `calc permute -5 2`
- **Expected Behavior:** Error message indicating n must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.8: Negative k (Error Case)**
- **Input:** `calc permute 5 -2`
- **Expected Behavior:** Error message indicating k must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.9: Relationship Between Permute and Combine**
- **Input:** `calc permute 5 2` and `calc combine 5 2`
- **Expected:** permute result should equal combine result × 2! (20 = 10 × 2)
- **Assertions:**
  - P(n,k) = C(n,k) × k!
  - Results verify this relationship

### Test Suite 4: Edge Cases and Error Handling

**Test 4.1: Missing Arguments**
- **Input:** `calc factorial`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.2: Too Many Arguments**
- **Input:** `calc factorial 5 3`
- **Expected Behavior:** Error message or ignore extra arguments (implementation decision)
- **Assertions:**
  - Either error is thrown or extra arguments are ignored
  - Behavior is consistent

**Test 4.3: Very Large Factorial**
- **Input:** `calc factorial 25`
- **Expected Output:** Correct factorial result (may require BigInt)
- **Assertions:**
  - Result is correct
  - Handles large numbers appropriately (may need BigInt support)

**Test 4.4: Combination with Large Numbers**
- **Input:** `calc combine 20 10`
- **Expected Output:** Correct combination result
- **Assertions:**
  - Result is correct
  - Handles large intermediate calculations

**Test 4.5: Permutation with Large Numbers**
- **Input:** `calc permute 20 10`
- **Expected Output:** Correct permutation result
- **Assertions:**
  - Result is correct
  - Handles large calculations

## Acceptance Criteria

1. ✅ All 3 operations are implemented (factorial, combine, permute)
2. ✅ Operations validate inputs are non-negative integers
3. ✅ Operations handle edge cases correctly (0, k=n, k=0)
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle large numbers appropriately (consider BigInt)
8. ✅ Combination symmetry property is verified
9. ✅ Permutation-combination relationship is verified
10. ✅ Invalid inputs (negatives, decimals, k>n) are handled with errors

