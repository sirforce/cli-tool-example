# Spec 012: Prime Number Operations

## Overview
Add support for prime number operations including checking if a number is prime, finding prime factors, generating prime numbers, and calculating prime-related functions.

## Feature Description
Extend the CLI tool to support operations for working with prime numbers, which are fundamental in number theory, cryptography, and various mathematical applications.

## Operations to Add

### 1. `isprime` - Check if Prime
Determines whether a number is prime.

**Syntax:** `calc isprime <n>`

**Examples:**
- `calc isprime 7` → true (or 1)
- `calc isprime 10` → false (or 0)
- `calc isprime 2` → true (or 1)

### 2. `primefactors` - Prime Factorization
Finds all prime factors of a number.

**Syntax:** `calc primefactors <n>`

**Examples:**
- `calc primefactors 12` → 2, 2, 3 (or [2, 2, 3])
- `calc primefactors 100` → 2, 2, 5, 5 (or [2, 2, 5, 5])
- `calc primefactors 17` → 17 (prime number)

### 3. `nextprime` - Next Prime Number
Finds the next prime number greater than the given number.

**Syntax:** `calc nextprime <n>`

**Examples:**
- `calc nextprime 10` → 11
- `calc nextprime 17` → 19
- `calc nextprime 2` → 3

### 4. `prevprime` - Previous Prime Number
Finds the previous prime number less than the given number.

**Syntax:** `calc prevprime <n>`

**Examples:**
- `calc prevprime 10` → 7
- `calc prevprime 17` → 13
- **Note:** For n ≤ 2, may return error or special value

### 5. `primes` - Generate Prime Numbers
Generates a list of prime numbers up to a given limit or count.

**Syntax:** `calc primes <limit>` or `calc primes --count <n>`

**Examples:**
- `calc primes 20` → 2, 3, 5, 7, 11, 13, 17, 19
- `calc primes --count 10` → 2, 3, 5, 7, 11, 13, 17, 19, 23, 29

### 6. `totient` - Euler's Totient Function
Calculates φ(n), the count of numbers less than n that are coprime with n.

**Syntax:** `calc totient <n>`

**Examples:**
- `calc totient 10` → 4 (numbers: 1, 3, 7, 9)
- `calc totient 7` → 6 (all numbers 1-6 are coprime with 7)
- `calc totient 12` → 4

## Implementation Requirements

1. Operations accept 1 argument (except primes which may have options)
2. Validate that inputs are positive integers
3. Handle edge cases (0, 1, 2, negative numbers)
4. Use efficient algorithms (Sieve of Eratosthenes for generating primes)
5. For large numbers, consider performance optimizations
6. Provide clear error messages for invalid inputs
7. Return format should be consistent (boolean as 1/0 or true/false, arrays as comma-separated or JSON)

## Test Scenarios

### Test Suite 1: Is Prime Operation

**Test 1.1: Small Prime Number**
- **Input:** `calc isprime 7`
- **Expected Output:** `Isprime Math Result: 1` (or true)
- **Assertions:**
  - Result indicates prime (1 or true)
  - Operation name is "isprime"

**Test 1.2: Small Composite Number**
- **Input:** `calc isprime 10`
- **Expected Output:** `Isprime Math Result: 0` (or false)
- **Assertions:**
  - Result indicates not prime (0 or false)

**Test 1.3: Number Two**
- **Input:** `calc isprime 2`
- **Expected Output:** `Isprime Math Result: 1` (or true)
- **Assertions:**
  - Result indicates prime (2 is the only even prime)

**Test 1.4: Number One**
- **Input:** `calc isprime 1`
- **Expected Output:** `Isprime Math Result: 0` (or false)
- **Assertions:**
  - Result indicates not prime (1 is not prime by definition)

**Test 1.5: Large Prime Number**
- **Input:** `calc isprime 97`
- **Expected Output:** `Isprime Math Result: 1` (or true)
- **Assertions:**
  - Result indicates prime
  - Handles larger primes correctly

**Test 1.6: Large Composite Number**
- **Input:** `calc isprime 100`
- **Expected Output:** `Isprime Math Result: 0` (or false)
- **Assertions:**
  - Result indicates not prime

**Test 1.7: Zero (Error Case)**
- **Input:** `calc isprime 0`
- **Expected Behavior:** Error message indicating number must be positive
- **Assertions:**
  - Error is thrown
  - Error message: "Number must be a positive integer"

**Test 1.8: Negative Number (Error Case)**
- **Input:** `calc isprime -5`
- **Expected Behavior:** Error message indicating number must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 1.9: Decimal Number (Error Case)**
- **Input:** `calc isprime 7.5`
- **Expected Behavior:** Error message indicating number must be an integer
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 1.10: Very Large Prime**
- **Input:** `calc isprime 7919`
- **Expected Output:** `Isprime Math Result: 1` (or true)
- **Assertions:**
  - Result indicates prime
  - Handles larger numbers efficiently

### Test Suite 2: Prime Factors Operation

**Test 2.1: Small Composite Number**
- **Input:** `calc primefactors 12`
- **Expected Output:** `Primefactors Math Result: 2, 2, 3` (or [2, 2, 3])
- **Assertions:**
  - Result contains all prime factors
  - Factors multiply to 12 (2 × 2 × 3 = 12)
  - Operation name is "primefactors"

**Test 2.2: Number with Repeated Factors**
- **Input:** `calc primefactors 100`
- **Expected Output:** `Primefactors Math Result: 2, 2, 5, 5` (or [2, 2, 5, 5])
- **Assertions:**
  - Result contains all prime factors
  - Factors multiply to 100 (2 × 2 × 5 × 5 = 100)

**Test 2.3: Prime Number**
- **Input:** `calc primefactors 17`
- **Expected Output:** `Primefactors Math Result: 17` (or [17])
- **Assertions:**
  - Result equals the number itself (prime numbers only have themselves as factors)

**Test 2.4: Power of Prime**
- **Input:** `calc primefactors 8`
- **Expected Output:** `Primefactors Math Result: 2, 2, 2` (or [2, 2, 2])
- **Assertions:**
  - Result contains three 2's (2³ = 8)

**Test 2.5: Product of Two Primes**
- **Input:** `calc primefactors 15`
- **Expected Output:** `Primefactors Math Result: 3, 5` (or [3, 5])
- **Assertions:**
  - Result contains 3 and 5
  - Factors multiply to 15

**Test 2.6: Number One**
- **Input:** `calc primefactors 1`
- **Expected Output:** Empty result or [1] (depending on implementation)
- **Assertions:**
  - Either returns empty or [1]
  - Behavior is documented

**Test 2.7: Zero (Error Case)**
- **Input:** `calc primefactors 0`
- **Expected Behavior:** Error message indicating number must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.8: Negative Number (Error Case)**
- **Input:** `calc primefactors -12`
- **Expected Behavior:** Error message indicating number must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.9: Large Number**
- **Input:** `calc primefactors 1000`
- **Expected Output:** `Primefactors Math Result: 2, 2, 2, 5, 5, 5` (or [2, 2, 2, 5, 5, 5])
- **Assertions:**
  - Result contains correct factors
  - Factors multiply to 1000

### Test Suite 3: Next Prime Operation

**Test 3.1: Next Prime After Composite**
- **Input:** `calc nextprime 10`
- **Expected Output:** `Nextprime Math Result: 11`
- **Assertions:**
  - Result equals 11 (next prime after 10)
  - Operation name is "nextprime"

**Test 3.2: Next Prime After Prime**
- **Input:** `calc nextprime 17`
- **Expected Output:** `Nextprime Math Result: 19`
- **Assertions:**
  - Result equals 19 (next prime after 17)

**Test 3.3: Next Prime After Two**
- **Input:** `calc nextprime 2`
- **Expected Output:** `Nextprime Math Result: 3`
- **Assertions:**
  - Result equals 3

**Test 3.4: Next Prime After Large Number**
- **Input:** `calc nextprime 100`
- **Expected Output:** `Nextprime Math Result: 101`
- **Assertions:**
  - Result equals 101

**Test 3.5: Next Prime After One**
- **Input:** `calc nextprime 1`
- **Expected Output:** `Nextprime Math Result: 2`
- **Assertions:**
  - Result equals 2

**Test 3.6: Zero (Error Case)**
- **Input:** `calc nextprime 0`
- **Expected Behavior:** Error message or return 2
- **Assertions:**
  - Either returns 2 or throws error
  - Behavior is documented

**Test 3.7: Negative Number (Error Case)**
- **Input:** `calc nextprime -5`
- **Expected Behavior:** Error message indicating number must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.8: Very Large Number**
- **Input:** `calc nextprime 1000`
- **Expected Output:** `Nextprime Math Result: 1009`
- **Assertions:**
  - Result equals 1009
  - Handles larger numbers efficiently

### Test Suite 4: Previous Prime Operation

**Test 4.1: Previous Prime Before Composite**
- **Input:** `calc prevprime 10`
- **Expected Output:** `Prevprime Math Result: 7`
- **Assertions:**
  - Result equals 7 (previous prime before 10)
  - Operation name is "prevprime"

**Test 4.2: Previous Prime Before Prime**
- **Input:** `calc prevprime 17`
- **Expected Output:** `Prevprime Math Result: 13`
- **Assertions:**
  - Result equals 13 (previous prime before 17)

**Test 4.3: Previous Prime Before Three**
- **Input:** `calc prevprime 3`
- **Expected Output:** `Prevprime Math Result: 2` (or error)
- **Assertions:**
  - Either returns 2 or throws error
  - Behavior is documented

**Test 4.4: Previous Prime Before Two**
- **Input:** `calc prevprime 2`
- **Expected Behavior:** Error message indicating no previous prime exists
- **Assertions:**
  - Error is thrown
  - Error message: "No previous prime exists for 2"

**Test 4.5: Previous Prime Before One**
- **Input:** `calc prevprime 1`
- **Expected Behavior:** Error message indicating no previous prime exists
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.6: Zero (Error Case)**
- **Input:** `calc prevprime 0`
- **Expected Behavior:** Error message indicating no previous prime exists
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.7: Negative Number (Error Case)**
- **Input:** `calc prevprime -5`
- **Expected Behavior:** Error message indicating number must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Generate Primes Operation

**Test 5.1: Primes Up to Limit**
- **Input:** `calc primes 20`
- **Expected Output:** `Primes Math Result: 2, 3, 5, 7, 11, 13, 17, 19` (or array)
- **Assertions:**
  - Result contains all primes up to 20
  - Operation name is "primes"

**Test 5.2: Primes Up to Small Limit**
- **Input:** `calc primes 10`
- **Expected Output:** `Primes Math Result: 2, 3, 5, 7` (or array)
- **Assertions:**
  - Result contains all primes up to 10

**Test 5.3: Primes Up to Two**
- **Input:** `calc primes 2`
- **Expected Output:** `Primes Math Result: 2` (or [2])
- **Assertions:**
  - Result contains only 2

**Test 5.4: Primes Up to One**
- **Input:** `calc primes 1`
- **Expected Output:** Empty result (or error)
- **Assertions:**
  - Either returns empty or throws error
  - Behavior is documented

**Test 5.5: First N Primes (Count Option)**
- **Input:** `calc primes --count 10`
- **Expected Output:** `Primes Math Result: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29` (or array)
- **Assertions:**
  - Result contains exactly 10 primes
  - Uses count option correctly

**Test 5.6: First Five Primes**
- **Input:** `calc primes --count 5`
- **Expected Output:** `Primes Math Result: 2, 3, 5, 7, 11` (or array)
- **Assertions:**
  - Result contains exactly 5 primes

**Test 5.7: Zero Count (Error Case)**
- **Input:** `calc primes --count 0`
- **Expected Behavior:** Error message or empty result
- **Assertions:**
  - Either returns empty or throws error
  - Behavior is documented

**Test 5.8: Large Limit**
- **Input:** `calc primes 100`
- **Expected Output:** All primes up to 100
- **Assertions:**
  - Result contains all primes up to 100
  - Uses efficient algorithm (Sieve of Eratosthenes)

**Test 5.9: Missing Arguments**
- **Input:** `calc primes`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 6: Totient Function

**Test 6.1: Totient of Prime Number**
- **Input:** `calc totient 7`
- **Expected Output:** `Totient Math Result: 6`
- **Assertions:**
  - Result equals 6 (all numbers 1-6 are coprime with 7)
  - Operation name is "totient"

**Test 6.2: Totient of Composite Number**
- **Input:** `calc totient 10`
- **Expected Output:** `Totient Math Result: 4`
- **Assertions:**
  - Result equals 4 (numbers: 1, 3, 7, 9 are coprime with 10)

**Test 6.3: Totient of Power of Prime**
- **Input:** `calc totient 8`
- **Expected Output:** `Totient Math Result: 4`
- **Assertions:**
  - Result equals 4 (φ(p^k) = p^k - p^(k-1) = 8 - 4 = 4)

**Test 6.4: Totient of Product of Primes**
- **Input:** `calc totient 15`
- **Expected Output:** `Totient Math Result: 8`
- **Assertions:**
  - Result equals 8 (φ(pq) = (p-1)(q-1) = 2 × 4 = 8)

**Test 6.5: Totient of One**
- **Input:** `calc totient 1`
- **Expected Output:** `Totient Math Result: 1`
- **Assertions:**
  - Result equals 1 (by definition)

**Test 6.6: Totient of Large Number**
- **Input:** `calc totient 100`
- **Expected Output:** `Totient Math Result: 40`
- **Assertions:**
  - Result equals 40

**Test 6.7: Zero (Error Case)**
- **Input:** `calc totient 0`
- **Expected Behavior:** Error message indicating number must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 6.8: Negative Number (Error Case)**
- **Input:** `calc totient -10`
- **Expected Behavior:** Error message indicating number must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 6.9: Totient Property Verification**
- **Input:** `calc totient 12` and verify φ(12) = 4
- **Expected Output:** `Totient Math Result: 4`
- **Assertions:**
  - Result equals 4
  - Can verify: numbers coprime with 12 are 1, 5, 7, 11

### Test Suite 7: Edge Cases and Integration

**Test 7.1: Very Large Prime Check**
- **Input:** `calc isprime 9973`
- **Expected Output:** `Isprime Math Result: 1` (or true)
- **Assertions:**
  - Result indicates prime
  - Handles larger numbers efficiently

**Test 7.2: Prime Factors of Large Number**
- **Input:** `calc primefactors 10000`
- **Expected Output:** `Primefactors Math Result: 2, 2, 2, 2, 5, 5, 5, 5` (or [2, 2, 2, 2, 5, 5, 5, 5])
- **Assertions:**
  - Result contains correct factors
  - Factors multiply to 10000

**Test 7.3: Invalid Number Format**
- **Input:** `calc isprime abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

**Test 7.4: Missing Arguments**
- **Input:** `calc isprime`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.5: Relationship Between Operations**
- **Input:** `calc primefactors 12` then verify each factor is prime using `isprime`
- **Expected:** All factors should be prime
- **Assertions:**
  - Prime factors operation returns only prime numbers
  - Can verify with isprime operation

## Acceptance Criteria

1. ✅ All 6 prime operations are implemented (isprime, primefactors, nextprime, prevprime, primes, totient)
2. ✅ Operations validate inputs are positive integers
3. ✅ All test scenarios pass
4. ✅ Error messages are clear and helpful
5. ✅ Help command displays new operations with examples
6. ✅ Operations handle edge cases gracefully (0, 1, 2, negatives, decimals)
7. ✅ Prime generation uses efficient algorithm (Sieve of Eratosthenes)
8. ✅ Prime factorization is correct and complete
9. ✅ Totient function uses correct formula
10. ✅ Operations handle large numbers efficiently
11. ✅ Return formats are consistent (boolean as 1/0, arrays as comma-separated or JSON)

