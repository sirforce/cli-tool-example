# Spec 018: Calculus Approximations

## Overview
Add support for numerical calculus operations including derivative approximations, integral approximations, and root finding using numerical methods.

## Feature Description
Extend the CLI tool to support numerical methods for calculus operations, enabling users to approximate derivatives, integrals, and find roots of functions.

## Operations to Add

### 1. `derivative` - Numerical Derivative
Approximates the derivative of a function at a point using numerical methods.

**Syntax:** `calc derivative <function> <x> [h]`

**Examples:**
- `calc derivative x^2 3` → 6 (derivative of x² at x=3)
- `calc derivative sin 0` → 1 (derivative of sin(x) at x=0)

### 2. `integrate` - Numerical Integration
Approximates the definite integral of a function using numerical methods (Simpson's rule, trapezoidal rule).

**Syntax:** `calc integrate <function> <a> <b> [n]`

**Examples:**
- `calc integrate x^2 0 2` → ~2.667 (integral of x² from 0 to 2)
- `calc integrate sin 0 3.14159` → ~2 (integral of sin(x) from 0 to π)

### 3. `root` - Find Root
Finds a root of a function using numerical methods (Newton-Raphson, bisection).

**Syntax:** `calc root <function> <initial_guess> [tolerance]`

**Examples:**
- `calc root x^2-4 1` → 2 (root of x²-4 = 0)
- `calc root x^3-8 1` → 2 (root of x³-8 = 0)

### 4. `limit` - Limit Approximation
Approximates the limit of a function as x approaches a value.

**Syntax:** `calc limit <function> <x_approaches> [direction]`

**Examples:**
- `calc limit (x^2-4)/(x-2) 2` → 4 (limit as x→2)
- `calc limit 1/x 0 right` → Infinity (limit from right)

### 5. `maximize` - Find Maximum
Finds the maximum value of a function in a given interval.

**Syntax:** `calc maximize <function> <a> <b>`

**Examples:**
- `calc maximize -x^2+4 0 5` → 4 (maximum of -x²+4)
- `calc maximize sin 0 3.14159` → 1 (maximum of sin(x))

### 6. `minimize` - Find Minimum
Finds the minimum value of a function in a given interval.

**Syntax:** `calc minimize <function> <a> <b>`

**Examples:**
- `calc minimize x^2 0 5` → 0 (minimum of x²)
- `calc minimize sin 0 3.14159` → -1 (minimum of sin(x) in [0,π] is actually 0, but in [-π/2, π/2] would be -1)

## Implementation Requirements

1. Support simple function expressions (polynomials, basic functions)
2. Use appropriate numerical methods (finite differences for derivatives, Simpson's rule for integrals)
3. Handle step sizes and tolerances appropriately
4. Validate function expressions
5. Handle edge cases (discontinuities, undefined points)
6. Provide clear error messages for invalid functions or convergence failures
7. Consider using a simple expression parser or predefined functions

## Test Scenarios

### Test Suite 1: Numerical Derivative

**Test 1.1: Derivative of Polynomial**
- **Input:** `calc derivative x^2 3`
- **Expected Output:** `Derivative Math Result: 6` (approximately)
- **Assertions:**
  - Result approximates 6 (derivative of x² is 2x, at x=3: 2×3=6)
  - Uses finite difference method
  - Operation name is "derivative"

**Test 1.2: Derivative of Linear Function**
- **Input:** `calc derivative 2*x+3 5`
- **Expected Output:** `Derivative Math Result: 2`
- **Assertions:**
  - Result equals 2 (derivative of 2x+3 is 2)

**Test 1.3: Derivative of Cubic**
- **Input:** `calc derivative x^3 2`
- **Expected Output:** `Derivative Math Result: 12` (approximately)
- **Assertions:**
  - Result approximates 12 (derivative of x³ is 3x², at x=2: 3×4=12)

**Test 1.4: Derivative of sin(x)**
- **Input:** `calc derivative sin 0`
- **Expected Output:** `Derivative Math Result: 1` (approximately)
- **Assertions:**
  - Result approximates 1 (derivative of sin(x) is cos(x), cos(0)=1)

**Test 1.5: Derivative of cos(x)**
- **Input:** `calc derivative cos 0`
- **Expected Output:** `Derivative Math Result: 0` (approximately)
- **Assertions:**
  - Result approximates 0 (derivative of cos(x) is -sin(x), -sin(0)=0)

**Test 1.6: Derivative with Custom Step Size**
- **Input:** `calc derivative x^2 3 0.0001`
- **Expected Output:** More accurate approximation
- **Assertions:**
  - Result is more accurate with smaller step size
  - Uses specified step size h

**Test 1.7: Invalid Function (Error Case)**
- **Input:** `calc derivative invalid 3`
- **Expected Behavior:** Error message indicating invalid function
- **Assertions:**
  - Error is thrown
  - Error message: "Invalid function expression"

**Test 1.8: Missing Arguments (Error Case)**
- **Input:** `calc derivative x^2`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 2: Numerical Integration

**Test 2.1: Integral of Polynomial**
- **Input:** `calc integrate x^2 0 2`
- **Expected Output:** `Integrate Math Result: 2.6666666666666665` (approximately)
- **Assertions:**
  - Result approximates 8/3 ≈ 2.667 (integral of x² from 0 to 2)
  - Uses Simpson's rule or trapezoidal rule
  - Operation name is "integrate"

**Test 2.2: Integral of Linear Function**
- **Input:** `calc integrate x 0 5`
- **Expected Output:** `Integrate Math Result: 12.5`
- **Assertions:**
  - Result approximates 12.5 (integral of x from 0 to 5 = 25/2 = 12.5)

**Test 2.3: Integral of sin(x)**
- **Input:** `calc integrate sin 0 3.14159`
- **Expected Output:** `Integrate Math Result: 2` (approximately)
- **Assertions:**
  - Result approximates 2 (integral of sin(x) from 0 to π = 2)

**Test 2.4: Integral with More Subintervals**
- **Input:** `calc integrate x^2 0 2 1000`
- **Expected Output:** More accurate approximation
- **Assertions:**
  - Result is more accurate with more subintervals
  - Uses specified number of subintervals n

**Test 2.5: Integral with Same Limits**
- **Input:** `calc integrate x^2 3 3`
- **Expected Output:** `Integrate Math Result: 0`
- **Assertions:**
  - Result equals 0 (integral from a to a is 0)

**Test 2.6: Integral with Reversed Limits**
- **Input:** `calc integrate x^2 2 0`
- **Expected Output:** `Integrate Math Result: -2.6666666666666665` (approximately)
- **Assertions:**
  - Result equals negative of integral from 0 to 2

**Test 2.7: Invalid Function (Error Case)**
- **Input:** `calc integrate invalid 0 2`
- **Expected Behavior:** Error message indicating invalid function
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.8: Missing Arguments (Error Case)**
- **Input:** `calc integrate x^2 0`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 3: Root Finding

**Test 3.1: Root of Quadratic**
- **Input:** `calc root x^2-4 1`
- **Expected Output:** `Root Math Result: 2` (approximately)
- **Assertions:**
  - Result approximates 2 (root of x²-4=0)
  - Uses Newton-Raphson or bisection method
  - Operation name is "root"

**Test 3.2: Root of Cubic**
- **Input:** `calc root x^3-8 1`
- **Expected Output:** `Root Math Result: 2` (approximately)
- **Assertions:**
  - Result approximates 2 (root of x³-8=0)

**Test 3.3: Root of Linear Function**
- **Input:** `calc root 2*x-6 1`
- **Expected Output:** `Root Math Result: 3`
- **Assertions:**
  - Result equals 3 (root of 2x-6=0)

**Test 3.4: Root with Custom Tolerance**
- **Input:** `calc root x^2-4 1 0.0001`
- **Expected Output:** More accurate root
- **Assertions:**
  - Result is more accurate with smaller tolerance
  - Uses specified tolerance

**Test 3.5: Root Not Found (Error Case)**
- **Input:** `calc root x^2+1 1` (no real roots)
- **Expected Behavior:** Error message indicating root not found
- **Assertions:**
  - Error is thrown
  - Error message: "Root not found within tolerance"

**Test 3.6: Multiple Roots**
- **Input:** `calc root x^2-4 -5` (may find -2 instead of 2)
- **Expected:** Finds one of the roots
- **Assertions:**
  - Result is a valid root (either 2 or -2)
  - Behavior is documented (finds closest root to initial guess)

**Test 3.7: Invalid Function (Error Case)**
- **Input:** `calc root invalid 1`
- **Expected Behavior:** Error message indicating invalid function
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.8: Missing Arguments (Error Case)**
- **Input:** `calc root x^2-4`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Limit Approximation

**Test 4.1: Limit of Rational Function**
- **Input:** `calc limit (x^2-4)/(x-2) 2`
- **Expected Output:** `Limit Math Result: 4` (approximately)
- **Assertions:**
  - Result approximates 4 (limit as x→2)
  - Operation name is "limit"

**Test 4.2: Limit from Right**
- **Input:** `calc limit 1/x 0 right`
- **Expected Output:** Very large number (approaching infinity)
- **Assertions:**
  - Result is very large (limit from right is +∞)

**Test 4.3: Limit from Left**
- **Input:** `calc limit 1/x 0 left`
- **Expected Output:** Very large negative number (approaching -infinity)
- **Assertions:**
  - Result is very large negative (limit from left is -∞)

**Test 4.4: Limit of Continuous Function**
- **Input:** `calc limit x^2 3`
- **Expected Output:** `Limit Math Result: 9` (approximately)
- **Assertions:**
  - Result approximates 9 (limit equals function value)

**Test 4.5: Limit at Infinity**
- **Input:** `calc limit 1/x infinity` (or large number)
- **Expected Output:** `Limit Math Result: 0` (approximately)
- **Assertions:**
  - Result approximates 0 (limit as x→∞)

**Test 4.6: Limit Does Not Exist**
- **Input:** `calc limit 1/x 0` (without direction)
- **Expected Behavior:** Error message indicating limit does not exist
- **Assertions:**
  - Error is thrown
  - Error message: "Limit does not exist (different left and right limits)"

**Test 4.7: Invalid Function (Error Case)**
- **Input:** `calc limit invalid 2`
- **Expected Behavior:** Error message indicating invalid function
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Maximize Operation

**Test 5.1: Maximum of Quadratic**
- **Input:** `calc maximize -x^2+4 0 5`
- **Expected Output:** `Maximize Math Result: 4` (approximately)
- **Assertions:**
  - Result approximates 4 (maximum of -x²+4 is 4 at x=0)
  - Operation name is "maximize"

**Test 5.2: Maximum of sin(x)**
- **Input:** `calc maximize sin 0 1.5708`
- **Expected Output:** `Maximize Math Result: 1` (approximately)
- **Assertions:**
  - Result approximates 1 (maximum of sin(x) in [0, π/2] is 1)

**Test 5.3: Maximum at Endpoint**
- **Input:** `calc maximize x^2 0 5`
- **Expected Output:** `Maximize Math Result: 25`
- **Assertions:**
  - Result equals 25 (maximum at x=5)

**Test 5.4: Maximum with Narrow Interval**
- **Input:** `calc maximize x^2 2 3`
- **Expected Output:** `Maximize Math Result: 9`
- **Assertions:**
  - Result equals 9 (maximum at x=3)

**Test 5.5: Invalid Function (Error Case)**
- **Input:** `calc maximize invalid 0 5`
- **Expected Behavior:** Error message indicating invalid function
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 5.6: Invalid Interval (Error Case)**
- **Input:** `calc maximize x^2 5 0`
- **Expected Behavior:** Error message or swap endpoints
- **Assertions:**
  - Either throws error or swaps endpoints
  - Behavior is documented

### Test Suite 6: Minimize Operation

**Test 6.1: Minimum of Quadratic**
- **Input:** `calc minimize x^2 0 5`
- **Expected Output:** `Minimize Math Result: 0`
- **Assertions:**
  - Result equals 0 (minimum of x² in [0,5] is 0 at x=0)
  - Operation name is "minimize"

**Test 6.2: Minimum of sin(x)**
- **Input:** `calc minimize sin 0 3.14159`
- **Expected Output:** `Minimize Math Result: 0` (approximately)
- **Assertions:**
  - Result approximates 0 (minimum of sin(x) in [0,π] is 0)

**Test 6.3: Minimum at Endpoint**
- **Input:** `calc minimize -x^2 0 5`
- **Expected Output:** `Minimize Math Result: -25`
- **Assertions:**
  - Result equals -25 (minimum at x=5)

**Test 6.4: Minimum with Narrow Interval**
- **Input:** `calc minimize x^2 2 3`
- **Expected Output:** `Minimize Math Result: 4`
- **Assertions:**
  - Result equals 4 (minimum at x=2)

**Test 6.5: Invalid Function (Error Case)**
- **Input:** `calc minimize invalid 0 5`
- **Expected Behavior:** Error message indicating invalid function
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 6.6: Invalid Interval (Error Case)**
- **Input:** `calc minimize x^2 5 0`
- **Expected Behavior:** Error message or swap endpoints
- **Assertions:**
  - Either throws error or swaps endpoints
  - Behavior is documented

### Test Suite 7: Edge Cases and Integration

**Test 7.1: Derivative Accuracy**
- **Input:** Compare `calc derivative x^2 3 0.1` vs `calc derivative x^2 3 0.0001`
- **Expected:** Smaller step size gives more accurate result
- **Assertions:**
  - Accuracy improves with smaller step size
  - Results are consistent

**Test 7.2: Integration Accuracy**
- **Input:** Compare `calc integrate x^2 0 2 10` vs `calc integrate x^2 0 2 1000`
- **Expected:** More subintervals give more accurate result
- **Assertions:**
  - Accuracy improves with more subintervals
  - Results are consistent

**Test 7.3: Root Finding Convergence**
- **Input:** `calc root x^2-4 1` with different tolerances
- **Expected:** Smaller tolerance gives more accurate root
- **Assertions:**
  - Convergence works correctly
  - Results are consistent

**Test 7.4: Invalid Number Format**
- **Input:** `calc derivative x^2 abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

**Test 7.5: Very Small Step Size**
- **Input:** `calc derivative x^2 3 1e-10`
- **Expected:** May have numerical precision issues or work correctly
- **Assertions:**
  - Either handles very small step size or warns about precision
  - Behavior is documented

**Test 7.6: Very Large Interval**
- **Input:** `calc integrate x^2 0 1000`
- **Expected Output:** Appropriate integral value
- **Assertions:**
  - Result is correct
  - Handles large intervals

## Acceptance Criteria

1. ✅ All 6 calculus operations are implemented (derivative, integrate, root, limit, maximize, minimize)
2. ✅ Operations use appropriate numerical methods
3. ✅ All test scenarios pass
4. ✅ Error messages are clear and helpful
5. ✅ Help command displays new operations with examples
6. ✅ Operations handle edge cases gracefully (invalid functions, convergence failures, etc.)
7. ✅ Numerical methods are accurate (appropriate step sizes, tolerances)
8. ✅ Function expressions are validated
9. ✅ Operations handle large intervals and small step sizes appropriately
10. ✅ Convergence is checked and reported appropriately

