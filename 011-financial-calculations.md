# Spec 011: Financial Calculations

## Overview
Add support for financial calculations including compound interest, loan payments, present/future value, and other common financial formulas.

## Feature Description
Extend the CLI tool to support financial operations that can calculate interest, loan payments, investment returns, and other time-value-of-money calculations.

## Operations to Add

### 1. `fv` - Future Value
Calculates the future value of an investment with compound interest.

**Syntax:** `calc fv <principal> <rate> <periods>`

**Examples:**
- `calc fv 1000 0.05 10` → ~1628.89 (FV of $1000 at 5% for 10 periods)
- `calc fv 5000 0.08 20` → ~23304.79 (FV of $5000 at 8% for 20 periods)

### 2. `pv` - Present Value
Calculates the present value of a future amount (discounting).

**Syntax:** `calc pv <future_value> <rate> <periods>`

**Examples:**
- `calc pv 1628.89 0.05 10` → ~1000 (PV of $1628.89 discounted at 5% for 10 periods)
- `calc pv 10000 0.06 5` → ~7472.58 (PV of $10000 discounted at 6% for 5 periods)

### 3. `pmt` - Loan Payment
Calculates the periodic payment for a loan (annuity payment).

**Syntax:** `calc pmt <principal> <rate> <periods>`

**Examples:**
- `calc pmt 100000 0.005 360` → ~599.55 (Monthly payment for $100k loan at 6% APR for 30 years)
- `calc pmt 20000 0.01 60` → ~444.89 (Monthly payment for $20k loan at 12% APR for 5 years)

### 4. `compound` - Compound Interest
Calculates the final amount after compound interest.

**Syntax:** `calc compound <principal> <rate> <periods> [compounds_per_period]`

**Examples:**
- `calc compound 1000 0.05 10` → ~1628.89 (Annual compounding)
- `calc compound 1000 0.05 10 12` → ~1647.01 (Monthly compounding)

### 5. `apr` - Annual Percentage Rate
Calculates the APR from periodic rate and compounding frequency.

**Syntax:** `calc apr <periodic_rate> <compounds_per_year>`

**Examples:**
- `calc apr 0.005 12` → 0.06168 (6.168% APR from 0.5% monthly rate)
- `calc apr 0.01 365` → 0.10516 (10.516% APR from 1% daily rate)

### 6. `roi` - Return on Investment
Calculates the return on investment percentage.

**Syntax:** `calc roi <initial_investment> <final_value>`

**Examples:**
- `calc roi 1000 1500` → 50 (50% ROI)
- `calc roi 5000 4500` → -10 (-10% ROI, loss)

## Implementation Requirements

1. Operations accept 2-4 arguments depending on the operation
2. Rate should be expressed as decimal (0.05 for 5%)
3. Handle edge cases (zero rate, zero periods, etc.)
4. Provide clear error messages for invalid inputs
5. Use appropriate financial formulas
6. Handle negative values appropriately (for losses)

## Test Scenarios

### Test Suite 1: Future Value (FV)

**Test 1.1: Basic Future Value**
- **Input:** `calc fv 1000 0.05 10`
- **Expected Output:** `Fv Math Result: 1628.894626777442` (approximately)
- **Assertions:**
  - Result is approximately 1628.89
  - Formula: FV = PV × (1 + r)^n
  - Operation name is "fv"

**Test 1.2: Future Value with Different Rate**
- **Input:** `calc fv 5000 0.08 20`
- **Expected Output:** `Fv Math Result: 23304.78511669479` (approximately)
- **Assertions:**
  - Result is approximately 23304.79

**Test 1.3: Future Value with Zero Rate**
- **Input:** `calc fv 1000 0 10`
- **Expected Output:** `Fv Math Result: 1000`
- **Assertions:**
  - Result equals 1000 (no interest)

**Test 1.4: Future Value with Zero Periods**
- **Input:** `calc fv 1000 0.05 0`
- **Expected Output:** `Fv Math Result: 1000`
- **Assertions:**
  - Result equals 1000 (no time passed)

**Test 1.5: Future Value with Negative Rate**
- **Input:** `calc fv 1000 -0.05 10`
- **Expected Output:** `Fv Math Result: 598.7369392383789` (approximately)
- **Assertions:**
  - Result is approximately 598.74 (depreciation)

**Test 1.6: Missing Arguments (Error Case)**
- **Input:** `calc fv 1000 0.05`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 1.7: Invalid Rate Format**
- **Input:** `calc fv 1000 abc 10`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

### Test Suite 2: Present Value (PV)

**Test 2.1: Basic Present Value**
- **Input:** `calc pv 1628.89 0.05 10`
- **Expected Output:** `Pv Math Result: 1000` (approximately)
- **Assertions:**
  - Result is approximately 1000
  - Formula: PV = FV / (1 + r)^n
  - Operation name is "pv"

**Test 2.2: Present Value Round-Trip**
- **Input:** `calc fv 1000 0.05 10` then `calc pv <result> 0.05 10`
- **Expected:** Should return approximately 1000
- **Assertions:**
  - Round-trip calculation works correctly
  - Result is approximately 1000

**Test 2.3: Present Value with High Rate**
- **Input:** `calc pv 10000 0.10 5`
- **Expected Output:** `Pv Math Result: 6209.213230597828` (approximately)
- **Assertions:**
  - Result is approximately 6209.21

**Test 2.4: Present Value with Zero Rate**
- **Input:** `calc pv 1000 0 10`
- **Expected Output:** `Pv Math Result: 1000`
- **Assertions:**
  - Result equals 1000 (no discounting)

**Test 2.5: Present Value with Zero Periods**
- **Input:** `calc pv 1000 0.05 0`
- **Expected Output:** `Pv Math Result: 1000`
- **Assertions:**
  - Result equals 1000 (no time discount)

**Test 2.6: Negative Rate (Error Case)**
- **Input:** `calc pv 1000 -0.05 10`
- **Expected Output:** `Pv Math Result: 1628.894626777442` (approximately) or error
- **Assertions:**
  - Either returns result or throws error
  - Behavior is documented

### Test Suite 3: Loan Payment (PMT)

**Test 3.1: Basic Loan Payment**
- **Input:** `calc pmt 100000 0.005 360`
- **Expected Output:** `Pmt Math Result: 599.5505251527449` (approximately)
- **Assertions:**
  - Result is approximately 599.55
  - Formula: PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
  - Operation name is "pmt"

**Test 3.2: Loan Payment for Shorter Term**
- **Input:** `calc pmt 100000 0.005 180`
- **Expected Output:** `Pmt Math Result: 843.856802744108` (approximately)
- **Assertions:**
  - Result is approximately 843.86 (higher payment for shorter term)

**Test 3.3: Loan Payment with Zero Rate**
- **Input:** `calc pmt 100000 0 360`
- **Expected Output:** `Pmt Math Result: 277.7777777777778` (approximately)
- **Assertions:**
  - Result equals 100000/360 = 277.78 (simple division)

**Test 3.4: Loan Payment with High Rate**
- **Input:** `calc pmt 20000 0.02 60`
- **Expected Output:** `Pmt Math Result: 586.1527903596792` (approximately)
- **Assertions:**
  - Result is approximately 586.15

**Test 3.5: Loan Payment with Single Period**
- **Input:** `calc pmt 1000 0.05 1`
- **Expected Output:** `Pmt Math Result: 1050`
- **Assertions:**
  - Result equals 1050 (principal + interest)

**Test 3.6: Zero Principal (Error Case)**
- **Input:** `calc pmt 0 0.005 360`
- **Expected Output:** `Pmt Math Result: 0` or error
- **Assertions:**
  - Either returns 0 or throws error
  - Behavior is documented

**Test 3.7: Zero Periods (Error Case)**
- **Input:** `calc pmt 100000 0.005 0`
- **Expected Behavior:** Error message indicating periods must be positive
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Compound Interest

**Test 4.1: Annual Compounding**
- **Input:** `calc compound 1000 0.05 10`
- **Expected Output:** `Compound Math Result: 1628.894626777442` (approximately)
- **Assertions:**
  - Result is approximately 1628.89
  - Operation name is "compound"

**Test 4.2: Monthly Compounding**
- **Input:** `calc compound 1000 0.05 10 12`
- **Expected Output:** `Compound Math Result: 1647.008497670285` (approximately)
- **Assertions:**
  - Result is approximately 1647.01
  - Formula: A = P × (1 + r/n)^(n×t)

**Test 4.3: Daily Compounding**
- **Input:** `calc compound 1000 0.05 1 365`
- **Expected Output:** `Compound Math Result: 1051.2674964674737` (approximately)
- **Assertions:**
  - Result is approximately 1051.27

**Test 4.4: Quarterly Compounding**
- **Input:** `calc compound 1000 0.08 2 4`
- **Expected Output:** `Compound Math Result: 1171.6593810268945` (approximately)
- **Assertions:**
  - Result is approximately 1171.66

**Test 4.5: Continuous Compounding (Large n)**
- **Input:** `calc compound 1000 0.05 10 1000000`
- **Expected Output:** Result close to continuous compounding limit
- **Assertions:**
  - Result approaches e^(rt) limit
  - Handles large compounding frequency

**Test 4.6: Default Compounding (Annual)**
- **Input:** `calc compound 1000 0.05 10` (without compounds_per_period)
- **Expected Output:** `Compound Math Result: 1628.894626777442` (approximately)
- **Assertions:**
  - Defaults to annual compounding (1)
  - Result matches annual compounding

### Test Suite 5: APR Calculation

**Test 5.1: Monthly Rate to APR**
- **Input:** `calc apr 0.005 12`
- **Expected Output:** `Apr Math Result: 0.06167781186449744` (approximately)
- **Assertions:**
  - Result is approximately 0.06168 (6.168% APR)
  - Formula: APR = (1 + r)^n - 1
  - Operation name is "apr"

**Test 5.2: Daily Rate to APR**
- **Input:** `calc apr 0.000274 365`
- **Expected Output:** `Apr Math Result: 0.10515578161654808` (approximately)
- **Assertions:**
  - Result is approximately 0.10516 (10.516% APR)

**Test 5.3: Quarterly Rate to APR**
- **Input:** `calc apr 0.02 4`
- **Expected Output:** `Apr Math Result: 0.08243216`
- **Assertions:**
  - Result equals 0.08243 (8.243% APR)

**Test 5.4: Annual Rate to APR**
- **Input:** `calc apr 0.05 1`
- **Expected Output:** `Apr Math Result: 0.05`
- **Assertions:**
  - Result equals 0.05 (same as periodic rate)

**Test 5.5: Zero Rate**
- **Input:** `calc apr 0 12`
- **Expected Output:** `Apr Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 5.6: Missing Arguments (Error Case)**
- **Input:** `calc apr 0.005`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 6: Return on Investment (ROI)

**Test 6.1: Positive ROI**
- **Input:** `calc roi 1000 1500`
- **Expected Output:** `Roi Math Result: 50`
- **Assertions:**
  - Result equals 50 (50% ROI)
  - Formula: ROI = ((FV - PV) / PV) × 100
  - Operation name is "roi"

**Test 6.2: Negative ROI (Loss)**
- **Input:** `calc roi 5000 4500`
- **Expected Output:** `Roi Math Result: -10`
- **Assertions:**
  - Result equals -10 (-10% ROI, loss)

**Test 6.3: Zero ROI**
- **Input:** `calc roi 1000 1000`
- **Expected Output:** `Roi Math Result: 0`
- **Assertions:**
  - Result equals 0 (no gain or loss)

**Test 6.4: Large ROI**
- **Input:** `calc roi 1000 5000`
- **Expected Output:** `Roi Math Result: 400`
- **Assertions:**
  - Result equals 400 (400% ROI)

**Test 6.5: Small ROI**
- **Input:** `calc roi 1000 1010`
- **Expected Output:** `Roi Math Result: 1`
- **Assertions:**
  - Result equals 1 (1% ROI)

**Test 6.6: Zero Initial Investment (Error Case)**
- **Input:** `calc roi 0 1500`
- **Expected Behavior:** Error message indicating division by zero
- **Assertions:**
  - Error is thrown
  - Error message: "Initial investment cannot be zero"

**Test 6.7: Missing Arguments (Error Case)**
- **Input:** `calc roi 1000`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 7: Edge Cases and Integration

**Test 7.1: Very Small Rate**
- **Input:** `calc fv 1000 0.0001 10`
- **Expected Output:** `Fv Math Result: 1001.0005000333354` (approximately)
- **Assertions:**
  - Handles very small rates correctly
  - Result is approximately correct

**Test 7.2: Very Large Periods**
- **Input:** `calc fv 1000 0.05 100`
- **Expected Output:** Very large number
- **Assertions:**
  - Handles large periods correctly
  - Result is correct

**Test 7.3: Very High Rate**
- **Input:** `calc fv 1000 0.50 5`
- **Expected Output:** `Fv Math Result: 7593.75`
- **Assertions:**
  - Handles high rates correctly
  - Result equals 7593.75

**Test 7.4: Invalid Number Format**
- **Input:** `calc fv abc 0.05 10`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

**Test 7.5: Negative Principal**
- **Input:** `calc fv -1000 0.05 10`
- **Expected Output:** `Fv Math Result: -1628.894626777442` (approximately) or error
- **Assertions:**
  - Either returns negative result or throws error
  - Behavior is documented

## Acceptance Criteria

1. ✅ All 6 financial operations are implemented (fv, pv, pmt, compound, apr, roi)
2. ✅ Operations use correct financial formulas
3. ✅ Rate is expressed as decimal (0.05 for 5%)
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle edge cases gracefully (zero rate, zero periods, etc.)
8. ✅ Round-trip calculations work correctly (FV/PV)
9. ✅ Compound interest handles different compounding frequencies
10. ✅ ROI correctly calculates percentage returns (including negative)

