# Spec 016: Modular Arithmetic Operations

## Overview
Add support for modular arithmetic operations including modulo operations, modular exponentiation, modular inverse, and Chinese Remainder Theorem calculations.

## Feature Description
Extend the CLI tool to support operations for working with modular arithmetic, which is fundamental in cryptography, number theory, and computer science.

## Operations to Add

### 1. `mod` - Modulo Operation
Calculates the remainder when dividing one number by another.

**Syntax:** `calc mod <dividend> <divisor>`

**Examples:**
- `calc mod 10 3` → 1
- `calc mod 17 5` → 2
- `calc mod -10 3` → 2 (or -1, depending on implementation)

### 2. `modpow` - Modular Exponentiation
Calculates (base^exponent) mod modulus efficiently.

**Syntax:** `calc modpow <base> <exponent> <modulus>`

**Examples:**
- `calc modpow 2 10 7` → 2 (2^10 mod 7 = 1024 mod 7 = 2)
- `calc modpow 3 5 11` → 1 (3^5 mod 11 = 243 mod 11 = 1)

### 3. `modinv` - Modular Multiplicative Inverse
Finds the modular multiplicative inverse of a number.

**Syntax:** `calc modinv <a> <m>`

**Examples:**
- `calc modinv 3 11` → 4 (3 × 4 mod 11 = 1)
- `calc modinv 5 7` → 3 (5 × 3 mod 7 = 1)

### 4. `congruent` - Check Congruence
Checks if two numbers are congruent modulo m.

**Syntax:** `calc congruent <a> <b> <m>`

**Examples:**
- `calc congruent 10 3 7` → true (or 1) - 10 ≡ 3 (mod 7)
- `calc congruent 15 3 6` → true (or 1) - 15 ≡ 3 (mod 6)

### 5. `crt` - Chinese Remainder Theorem
Solves a system of congruences using the Chinese Remainder Theorem.

**Syntax:** `calc crt <a1> <m1> <a2> <m2> [a3] [m3] ...`

**Examples:**
- `calc crt 2 3 3 5` → 8 (x ≡ 2 mod 3, x ≡ 3 mod 5, solution: x = 8)
- `calc crt 1 3 2 5 3 7` → 52 (system of 3 congruences)

## Implementation Requirements

1. Operations accept 2-6+ arguments depending on the operation
2. Handle negative numbers appropriately (Euclidean vs truncated division)
3. Validate that modulus is positive
4. For modular inverse, check that numbers are coprime
5. Use efficient algorithms (extended Euclidean for inverse, fast exponentiation for modpow)
6. Handle edge cases (modulus = 1, zero values, etc.)
7. Provide clear error messages

## Test Scenarios

### Test Suite 1: Modulo Operation

**Test 1.1: Basic Modulo**
- **Input:** `calc mod 10 3`
- **Expected Output:** `Mod Math Result: 1`
- **Assertions:**
  - Result equals 1 (10 mod 3 = 1)
  - Operation name is "mod"

**Test 1.2: Modulo with Larger Dividend**
- **Input:** `calc mod 17 5`
- **Expected Output:** `Mod Math Result: 2`
- **Assertions:**
  - Result equals 2 (17 mod 5 = 2)

**Test 1.3: Modulo When Divisible**
- **Input:** `calc mod 15 5`
- **Expected Output:** `Mod Math Result: 0`
- **Assertions:**
  - Result equals 0 (15 is divisible by 5)

**Test 1.4: Modulo with Negative Dividend**
- **Input:** `calc mod -10 3`
- **Expected Output:** `Mod Math Result: 2` (Euclidean) or -1 (Truncated)
- **Assertions:**
  - Result is consistent with chosen definition
  - Behavior is documented (Euclidean: always positive, Truncated: sign of dividend)

**Test 1.5: Modulo with Negative Divisor**
- **Input:** `calc mod 10 -3`
- **Expected Behavior:** Error message or result based on implementation
- **Assertions:**
  - Either throws error or returns result
  - Behavior is documented

**Test 1.6: Modulo with Zero Divisor (Error Case)**
- **Input:** `calc mod 10 0`
- **Expected Behavior:** Error message indicating division by zero
- **Assertions:**
  - Error is thrown
  - Error message: "Modulus cannot be zero"

**Test 1.7: Modulo with Modulus One**
- **Input:** `calc mod 10 1`
- **Expected Output:** `Mod Math Result: 0`
- **Assertions:**
  - Result equals 0 (any number mod 1 = 0)

**Test 1.8: Modulo with Large Numbers**
- **Input:** `calc mod 1000000 7`
- **Expected Output:** Appropriate remainder
- **Assertions:**
  - Result is correct
  - Handles large numbers

**Test 1.9: Missing Arguments (Error Case)**
- **Input:** `calc mod 10`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 2: Modular Exponentiation

**Test 2.1: Basic Modular Exponentiation**
- **Input:** `calc modpow 2 10 7`
- **Expected Output:** `Modpow Math Result: 2`
- **Assertions:**
  - Result equals 2 (2^10 mod 7 = 1024 mod 7 = 2)
  - Uses efficient algorithm (fast exponentiation)
  - Operation name is "modpow"

**Test 2.2: Modular Exponentiation Small**
- **Input:** `calc modpow 3 5 11`
- **Expected Output:** `Modpow Math Result: 1`
- **Assertions:**
  - Result equals 1 (3^5 mod 11 = 243 mod 11 = 1)

**Test 2.3: Modular Exponentiation with Zero Exponent**
- **Input:** `calc modpow 5 0 7`
- **Expected Output:** `Modpow Math Result: 1`
- **Assertions:**
  - Result equals 1 (any number^0 = 1)

**Test 2.4: Modular Exponentiation with Exponent One**
- **Input:** `calc modpow 5 1 7`
- **Expected Output:** `Modpow Math Result: 5`
- **Assertions:**
  - Result equals 5 (5^1 mod 7 = 5)

**Test 2.5: Modular Exponentiation Large Exponent**
- **Input:** `calc modpow 2 100 13`
- **Expected Output:** Appropriate result
- **Assertions:**
  - Result is correct
  - Uses efficient algorithm (doesn't compute 2^100 directly)

**Test 2.6: Modular Exponentiation with Zero Base**
- **Input:** `calc modpow 0 5 7`
- **Expected Output:** `Modpow Math Result: 0`
- **Assertions:**
  - Result equals 0 (0^n = 0 for n > 0)

**Test 2.7: Modular Exponentiation with Modulus One**
- **Input:** `calc modpow 5 10 1`
- **Expected Output:** `Modpow Math Result: 0`
- **Assertions:**
  - Result equals 0 (any number mod 1 = 0)

**Test 2.8: Zero Modulus (Error Case)**
- **Input:** `calc modpow 2 10 0`
- **Expected Behavior:** Error message indicating modulus cannot be zero
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.9: Negative Exponent (Error Case)**
- **Input:** `calc modpow 2 -5 7`
- **Expected Behavior:** Error message or calculate using modular inverse
- **Assertions:**
  - Either throws error or calculates correctly using inverse
  - Behavior is documented

**Test 2.10: Missing Arguments (Error Case)**
- **Input:** `calc modpow 2 10`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 3: Modular Inverse

**Test 3.1: Basic Modular Inverse**
- **Input:** `calc modinv 3 11`
- **Expected Output:** `Modinv Math Result: 4`
- **Assertions:**
  - Result equals 4 (3 × 4 mod 11 = 12 mod 11 = 1)
  - Uses extended Euclidean algorithm
  - Operation name is "modinv"

**Test 3.2: Modular Inverse Different Values**
- **Input:** `calc modinv 5 7`
- **Expected Output:** `Modinv Math Result: 3`
- **Assertions:**
  - Result equals 3 (5 × 3 mod 7 = 15 mod 7 = 1)

**Test 3.3: Modular Inverse of One**
- **Input:** `calc modinv 1 7`
- **Expected Output:** `Modinv Math Result: 1`
- **Assertions:**
  - Result equals 1 (1 × 1 mod 7 = 1)

**Test 3.4: Modular Inverse Property**
- **Input:** `calc modinv 3 11` then verify (3 × result) mod 11 = 1
- **Expected:** Verification should pass
- **Assertions:**
  - Inverse property holds: (a × modinv(a, m)) mod m = 1

**Test 3.5: Not Coprime (Error Case)**
- **Input:** `calc modinv 4 8`
- **Expected Behavior:** Error message indicating numbers must be coprime
- **Assertions:**
  - Error is thrown
  - Error message: "Modular inverse exists only when a and m are coprime"

**Test 3.6: Zero Modulus (Error Case)**
- **Input:** `calc modinv 3 0`
- **Expected Behavior:** Error message indicating modulus cannot be zero
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.7: Modulus One**
- **Input:** `calc modinv 5 1`
- **Expected Output:** `Modinv Math Result: 0` (or error)
- **Assertions:**
  - Either returns 0 or throws error
  - Behavior is documented

**Test 3.8: Missing Arguments (Error Case)**
- **Input:** `calc modinv 3`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Congruence Check

**Test 4.1: Basic Congruence**
- **Input:** `calc congruent 10 3 7`
- **Expected Output:** `Congruent Math Result: 1` (or true)
- **Assertions:**
  - Result indicates true (10 ≡ 3 mod 7, since 10 mod 7 = 3)
  - Operation name is "congruent"

**Test 4.2: Congruence False**
- **Input:** `calc congruent 10 4 7`
- **Expected Output:** `Congruent Math Result: 0` (or false)
- **Assertions:**
  - Result indicates false (10 mod 7 = 3 ≠ 4)

**Test 4.3: Congruence with Same Numbers**
- **Input:** `calc congruent 5 5 7`
- **Expected Output:** `Congruent Math Result: 1` (or true)
- **Assertions:**
  - Result indicates true (any number is congruent to itself)

**Test 4.4: Congruence with Negative Numbers**
- **Input:** `calc congruent -5 2 7`
- **Expected Output:** `Congruent Math Result: 1` (or true)
- **Assertions:**
  - Result indicates true (-5 mod 7 = 2)

**Test 4.5: Congruence Modulo One**
- **Input:** `calc congruent 10 3 1`
- **Expected Output:** `Congruent Math Result: 1` (or true)
- **Assertions:**
  - Result indicates true (all numbers are congruent mod 1)

**Test 4.6: Zero Modulus (Error Case)**
- **Input:** `calc congruent 10 3 0`
- **Expected Behavior:** Error message indicating modulus cannot be zero
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.7: Missing Arguments (Error Case)**
- **Input:** `calc congruent 10 3`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Chinese Remainder Theorem

**Test 5.1: Basic CRT Two Congruences**
- **Input:** `calc crt 2 3 3 5`
- **Expected Output:** `Crt Math Result: 8`
- **Assertions:**
  - Result equals 8 (x ≡ 2 mod 3, x ≡ 3 mod 5, solution: x = 8)
  - Verifies: 8 mod 3 = 2, 8 mod 5 = 3
  - Operation name is "crt"

**Test 5.2: CRT Three Congruences**
- **Input:** `calc crt 1 3 2 5 3 7`
- **Expected Output:** `Crt Math Result: 52`
- **Assertions:**
  - Result equals 52
  - Verifies: 52 mod 3 = 1, 52 mod 5 = 2, 52 mod 7 = 3

**Test 5.3: CRT with Coprime Moduli**
- **Input:** `calc crt 1 2 2 3`
- **Expected Output:** `Crt Math Result: 5`
- **Assertions:**
  - Result equals 5 (x ≡ 1 mod 2, x ≡ 2 mod 3, solution: x = 5)

**Test 5.4: CRT Not Coprime Moduli (Error Case)**
- **Input:** `calc crt 1 2 2 4`
- **Expected Behavior:** Error message indicating moduli must be pairwise coprime
- **Assertions:**
  - Error is thrown
  - Error message: "Moduli must be pairwise coprime for CRT"

**Test 5.5: CRT Single Congruence (Error Case)**
- **Input:** `calc crt 2 3`
- **Expected Behavior:** Error message indicating at least two congruences required
- **Assertions:**
  - Error is thrown
  - Error message: "At least two congruences required"

**Test 5.6: CRT Odd Number of Arguments (Error Case)**
- **Input:** `calc crt 2 3 5`
- **Expected Behavior:** Error message indicating even number of arguments required
- **Assertions:**
  - Error is thrown
  - Error message: "Even number of arguments required (a, m pairs)"

**Test 5.7: CRT with Zero Modulus (Error Case)**
- **Input:** `calc crt 2 0 3 5`
- **Expected Behavior:** Error message indicating modulus cannot be zero
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 5.8: CRT Large Values**
- **Input:** `calc crt 1 100 2 101 3 103`
- **Expected Output:** Appropriate solution
- **Assertions:**
  - Result is correct
  - Handles larger moduli

### Test Suite 6: Edge Cases and Integration

**Test 6.1: Modulo Property Verification**
- **Input:** `calc mod 100 7` and verify (100 - result) is divisible by 7
- **Expected:** Property holds
- **Assertions:**
  - (dividend - remainder) is divisible by divisor
  - Modulo operation is correct

**Test 6.2: Modular Exponentiation Efficiency**
- **Input:** `calc modpow 2 1000 13`
- **Expected:** Result computed efficiently (not by computing 2^1000)
- **Assertions:**
  - Result is correct
  - Computation is efficient (uses fast exponentiation)

**Test 6.3: Modular Inverse Round-Trip**
- **Input:** `calc modinv 3 11` then verify (3 × result) mod 11 = 1
- **Expected:** Round-trip verification passes
- **Assertions:**
  - Inverse property holds
  - Result is correct

**Test 6.4: Invalid Number Format**
- **Input:** `calc mod 10 abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

**Test 6.5: Very Large Modulus**
- **Input:** `calc mod 1000000 999999`
- **Expected Output:** `Mod Math Result: 1`
- **Assertions:**
  - Result equals 1
  - Handles large numbers

**Test 6.6: CRT with Many Congruences**
- **Input:** `calc crt 1 2 2 3 3 5 4 7 5 11`
- **Expected Output:** Appropriate solution
- **Assertions:**
  - Result satisfies all congruences
  - Handles multiple congruences

## Acceptance Criteria

1. ✅ All 5 modular arithmetic operations are implemented (mod, modpow, modinv, congruent, crt)
2. ✅ Operations use efficient algorithms (extended Euclidean, fast exponentiation)
3. ✅ All test scenarios pass
4. ✅ Error messages are clear and helpful
5. ✅ Help command displays new operations with examples
6. ✅ Operations handle edge cases gracefully (zero modulus, not coprime, etc.)
7. ✅ Modulo operation behavior with negatives is documented
8. ✅ Modular inverse checks for coprimality
9. ✅ CRT validates pairwise coprime moduli
10. ✅ Operations handle large numbers efficiently
11. ✅ Mathematical properties are verified (inverse property, congruence equivalence)

