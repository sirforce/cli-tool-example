# Spec 017: Series Calculations

## Overview
Add support for calculating sums and values of mathematical series including arithmetic series, geometric series, power series, and other common infinite and finite series.

## Feature Description
Extend the CLI tool to support operations for calculating series sums, evaluating series terms, and working with various mathematical series including Taylor series approximations.

## Operations to Add

### 1. `series` - General Series Sum
Calculates the sum of a series given a formula or pattern.

**Syntax:** `calc series <formula> <start> <end>` or `calc series <n>` for predefined series

**Examples:**
- `calc series arithmetic 1 1 100` → 5050 (sum of 1 to 100)
- `calc series geometric 1 0.5 10` → ~1.999 (sum of geometric series)

### 2. `taylor` - Taylor Series Approximation
Approximates a function using its Taylor series expansion.

**Syntax:** `calc taylor <function> <x> <n>` (n terms)

**Examples:**
- `calc taylor exp 1 10` → ~2.718 (e^x approximation at x=1)
- `calc taylor sin 0.5 10` → ~0.479 (sin(x) approximation)

### 3. `harmonic` - Harmonic Series
Calculates the nth harmonic number or sum of harmonic series.

**Syntax:** `calc harmonic <n>`

**Examples:**
- `calc harmonic 10` → ~2.929 (H_10 = 1 + 1/2 + ... + 1/10)
- `calc harmonic 100` → ~5.187 (H_100)

### 4. `riemann` - Riemann Zeta Function Approximation
Approximates the Riemann zeta function ζ(s) for real s > 1.

**Syntax:** `calc riemann <s> [terms]`

**Examples:**
- `calc riemann 2` → ~1.645 (ζ(2) = π²/6)
- `calc riemann 3` → ~1.202 (ζ(3))

### 5. `fibonaccisum` - Sum of Fibonacci Sequence
Calculates the sum of the first n Fibonacci numbers.

**Syntax:** `calc fibonaccisum <n>`

**Examples:**
- `calc fibonaccisum 10` → 143 (sum of F(0) through F(9))
- `calc fibonaccisum 5` → 12 (sum of F(0) through F(4))

## Implementation Requirements

1. Operations accept 1-4 arguments depending on the operation
2. For series, validate that start ≤ end
3. For Taylor series, support common functions (exp, sin, cos, ln)
4. Handle convergence appropriately (geometric series with |r| < 1)
5. Use appropriate number of terms for approximations
6. Handle edge cases (n=0, n=1, etc.)
7. Provide clear error messages

## Test Scenarios

### Test Suite 1: General Series Operation

**Test 1.1: Arithmetic Series Sum**
- **Input:** `calc series arithmetic 1 1 100`
- **Expected Output:** `Series Math Result: 5050`
- **Assertions:**
  - Result equals 5050 (sum of 1 to 100)
  - Operation name is "series"

**Test 1.2: Geometric Series Sum (Convergent)**
- **Input:** `calc series geometric 1 0.5 10`
- **Expected Output:** `Series Math Result: 1.9990234375` (approximately)
- **Assertions:**
  - Result is approximately 2 (limit of infinite series)
  - Formula: S = a(1-r^n)/(1-r) for finite, S = a/(1-r) for infinite when |r|<1

**Test 1.3: Geometric Series Sum (Divergent)**
- **Input:** `calc series geometric 1 2 10`
- **Expected Output:** `Series Math Result: 1023` (finite sum)
- **Assertions:**
  - Result equals 1023 (1+2+4+...+512 = 2^10 - 1)

**Test 1.4: Power Series**
- **Input:** `calc series power 1 10` (sum of n^2 from 1 to 10)
- **Expected Output:** `Series Math Result: 385` (1²+2²+...+10²)
- **Assertions:**
  - Result equals 385
  - Formula: n(n+1)(2n+1)/6

**Test 1.5: Series with Zero Terms**
- **Input:** `calc series arithmetic 1 1 0`
- **Expected Output:** `Series Math Result: 0` (or error)
- **Assertions:**
  - Either returns 0 or throws error
  - Behavior is documented

**Test 1.6: Invalid Range (Error Case)**
- **Input:** `calc series arithmetic 100 1 10`
- **Expected Behavior:** Error message indicating start > end
- **Assertions:**
  - Error is thrown
  - Error message: "Start value must be less than or equal to end value"

**Test 1.7: Missing Arguments (Error Case)**
- **Input:** `calc series arithmetic 1`
- **Expected Behavior:** Error message indicating missing arguments
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 2: Taylor Series Operation

**Test 2.1: Taylor Series for e^x**
- **Input:** `calc taylor exp 1 10`
- **Expected Output:** `Taylor Math Result: 2.7182818011463845` (approximately)
- **Assertions:**
  - Result approximates e ≈ 2.718
  - Formula: e^x = Σ(x^n/n!) from n=0 to infinity
  - Operation name is "taylor"

**Test 2.2: Taylor Series for sin(x)**
- **Input:** `calc taylor sin 0.5 10`
- **Expected Output:** `Taylor Math Result: 0.479425538604203` (approximately)
- **Assertions:**
  - Result approximates sin(0.5) ≈ 0.479
  - Formula: sin(x) = Σ((-1)^n × x^(2n+1)/(2n+1)!) from n=0

**Test 2.3: Taylor Series for cos(x)**
- **Input:** `calc taylor cos 0 10`
- **Expected Output:** `Taylor Math Result: 1` (approximately)
- **Assertions:**
  - Result approximates cos(0) = 1
  - Formula: cos(x) = Σ((-1)^n × x^(2n)/(2n)!) from n=0

**Test 2.4: Taylor Series for ln(1+x)**
- **Input:** `calc taylor ln 0.5 20`
- **Expected Output:** `Taylor Math Result: 0.4054651081081644` (approximately)
- **Assertions:**
  - Result approximates ln(1.5) ≈ 0.405
  - Formula: ln(1+x) = Σ((-1)^(n+1) × x^n/n) from n=1

**Test 2.5: Taylor Series with Zero Terms**
- **Input:** `calc taylor exp 1 0`
- **Expected Output:** `Taylor Math Result: 1` (or error)
- **Assertions:**
  - Either returns 1 (first term) or throws error
  - Behavior is documented

**Test 2.6: Unknown Function (Error Case)**
- **Input:** `calc taylor unknown 1 10`
- **Expected Behavior:** Error message indicating unknown function
- **Assertions:**
  - Error is thrown
  - Error message: "Unknown function: unknown. Supported: exp, sin, cos, ln"

**Test 2.7: Missing Arguments (Error Case)**
- **Input:** `calc taylor exp 1`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.8: Large Number of Terms**
- **Input:** `calc taylor exp 1 50`
- **Expected Output:** More accurate approximation of e
- **Assertions:**
  - Result is more accurate with more terms
  - Handles large number of terms

### Test Suite 3: Harmonic Series

**Test 3.1: Small Harmonic Number**
- **Input:** `calc harmonic 5`
- **Expected Output:** `Harmonic Math Result: 2.283333333333333`
- **Assertions:**
  - Result equals 2.283... (1 + 1/2 + 1/3 + 1/4 + 1/5)
  - Operation name is "harmonic"

**Test 3.2: Medium Harmonic Number**
- **Input:** `calc harmonic 10`
- **Expected Output:** `Harmonic Math Result: 2.9289682539682538`
- **Assertions:**
  - Result equals 2.929... (H_10)

**Test 3.3: Large Harmonic Number**
- **Input:** `calc harmonic 100`
- **Expected Output:** `Harmonic Math Result: 5.187377517639621`
- **Assertions:**
  - Result equals 5.187... (H_100)
  - Handles larger numbers

**Test 3.4: Harmonic Number of One**
- **Input:** `calc harmonic 1`
- **Expected Output:** `Harmonic Math Result: 1`
- **Assertions:**
  - Result equals 1 (H_1 = 1)

**Test 3.5: Harmonic Number of Zero**
- **Input:** `calc harmonic 0`
- **Expected Output:** `Harmonic Math Result: 0` (or error)
- **Assertions:**
  - Either returns 0 or throws error
  - Behavior is documented

**Test 3.6: Negative Number (Error Case)**
- **Input:** `calc harmonic -5`
- **Expected Behavior:** Error message indicating n must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.7: Decimal Number (Error Case)**
- **Input:** `calc harmonic 5.5`
- **Expected Behavior:** Error message indicating n must be an integer
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.8: Very Large Harmonic Number**
- **Input:** `calc harmonic 1000`
- **Expected Output:** Appropriate harmonic number
- **Assertions:**
  - Result is correct
  - Handles very large n efficiently

### Test Suite 4: Riemann Zeta Function

**Test 4.1: Zeta of 2**
- **Input:** `calc riemann 2`
- **Expected Output:** `Riemann Math Result: 1.6449340668482264` (approximately)
- **Assertions:**
  - Result approximates ζ(2) = π²/6 ≈ 1.645
  - Operation name is "riemann"

**Test 4.2: Zeta of 3**
- **Input:** `calc riemann 3`
- **Expected Output:** `Riemann Math Result: 1.2020569031595942` (approximately)
- **Assertions:**
  - Result approximates ζ(3) ≈ 1.202

**Test 4.3: Zeta of 4**
- **Input:** `calc riemann 4`
- **Expected Output:** `Riemann Math Result: 1.0823232337111382` (approximately)
- **Assertions:**
  - Result approximates ζ(4) = π⁴/90 ≈ 1.082

**Test 4.4: Zeta with Custom Terms**
- **Input:** `calc riemann 2 1000`
- **Expected Output:** More accurate approximation
- **Assertions:**
  - Result is more accurate with more terms
  - Uses specified number of terms

**Test 4.5: Zeta of 1 (Divergent)**
- **Input:** `calc riemann 1`
- **Expected Behavior:** Error message indicating s must be greater than 1
- **Assertions:**
  - Error is thrown
  - Error message: "Riemann zeta function converges only for s > 1"

**Test 4.6: Zeta Less Than One (Error Case)**
- **Input:** `calc riemann 0.5`
- **Expected Behavior:** Error message indicating s must be greater than 1
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.7: Zeta of Large Value**
- **Input:** `calc riemann 10`
- **Expected Output:** Appropriate zeta value
- **Assertions:**
  - Result is correct
  - Handles larger s values

**Test 4.8: Missing Arguments (Error Case)**
- **Input:** `calc riemann`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Fibonacci Sum

**Test 5.1: Small Fibonacci Sum**
- **Input:** `calc fibonaccisum 5`
- **Expected Output:** `Fibonaccisum Math Result: 12`
- **Assertions:**
  - Result equals 12 (F(0)+F(1)+F(2)+F(3)+F(4) = 0+1+1+2+3 = 7, or F(0) through F(4) = 12)
  - Formula: Sum = F(n+2) - 1
  - Operation name is "fibonaccisum"

**Test 5.2: Medium Fibonacci Sum**
- **Input:** `calc fibonaccisum 10`
- **Expected Output:** `Fibonaccisum Math Result: 143`
- **Assertions:**
  - Result equals 143 (F(0) through F(9), sum = F(11) - 1 = 144 - 1 = 143)

**Test 5.3: Fibonacci Sum of One**
- **Input:** `calc fibonaccisum 1`
- **Expected Output:** `Fibonaccisum Math Result: 1` (or 0, depending on whether F(0) is included)
- **Assertions:**
  - Result is consistent with definition
  - Behavior is documented

**Test 5.4: Fibonacci Sum of Zero**
- **Input:** `calc fibonaccisum 0`
- **Expected Output:** `Fibonaccisum Math Result: 0`
- **Assertions:**
  - Result equals 0 (no terms)

**Test 5.5: Large Fibonacci Sum**
- **Input:** `calc fibonaccisum 20`
- **Expected Output:** `Fibonaccisum Math Result: 17710`
- **Assertions:**
  - Result equals 17710 (F(22) - 1 = 17711 - 1)
  - Handles larger numbers

**Test 5.6: Negative Number (Error Case)**
- **Input:** `calc fibonaccisum -5`
- **Expected Behavior:** Error message indicating n must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 5.7: Decimal Number (Error Case)**
- **Input:** `calc fibonaccisum 5.5`
- **Expected Behavior:** Error message indicating n must be an integer
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 5.8: Relationship to Fibonacci**
- **Input:** `calc fibonaccisum 10` and verify relationship to `calc fibonacci 12`
- **Expected:** Sum should equal F(12) - 1
- **Assertions:**
  - Relationship holds: Sum(n) = F(n+2) - 1
  - Results are consistent

### Test Suite 6: Edge Cases and Integration

**Test 6.1: Convergence of Geometric Series**
- **Input:** `calc series geometric 1 0.9 100` vs `calc series geometric 1 0.9 infinite`
- **Expected:** Finite sum approaches infinite sum limit
- **Assertions:**
  - Finite sum approaches a/(1-r) = 1/(1-0.9) = 10
  - Convergence is correct

**Test 6.2: Taylor Series Accuracy**
- **Input:** `calc taylor exp 0 10` should equal 1 (e^0 = 1)
- **Expected:** Result equals 1
- **Assertions:**
  - Taylor series at x=0 gives correct value
  - Accuracy improves with more terms

**Test 6.3: Harmonic Series Growth**
- **Input:** Compare `calc harmonic 10` vs `calc harmonic 100`
- **Expected:** H_100 > H_10
- **Assertions:**
  - Harmonic series increases (slowly)
  - Results are consistent

**Test 6.4: Invalid Number Format**
- **Input:** `calc harmonic abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

**Test 6.5: Very Large Series**
- **Input:** `calc series arithmetic 1 1 1000000`
- **Expected Output:** Very large sum
- **Assertions:**
  - Result is correct
  - Handles very large ranges efficiently

**Test 6.6: Series with Negative Terms**
- **Input:** `calc series geometric 1 -0.5 10`
- **Expected Output:** Alternating series sum
- **Assertions:**
  - Result is correct
  - Handles alternating series

## Acceptance Criteria

1. ✅ All 5 series operations are implemented (series, taylor, harmonic, riemann, fibonaccisum)
2. ✅ Series formulas are mathematically correct
3. ✅ All test scenarios pass
4. ✅ Error messages are clear and helpful
5. ✅ Help command displays new operations with examples
6. ✅ Operations handle edge cases gracefully (zero terms, invalid ranges, etc.)
7. ✅ Taylor series supports common functions (exp, sin, cos, ln)
8. ✅ Convergence is handled appropriately (geometric series, zeta function)
9. ✅ Operations handle large numbers efficiently
10. ✅ Series relationships are verified (Fibonacci sum formula, etc.)

