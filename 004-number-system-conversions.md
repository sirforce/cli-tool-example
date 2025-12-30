# Spec 004: Number System Conversions

## Overview
Add support for converting numbers between different number systems (decimal, binary, hexadecimal, octal), enabling users to perform base conversions.

## Feature Description
Extend the CLI tool to support conversion operations that can convert numbers between decimal, binary, hexadecimal, and octal number systems. These operations will take a number in one base and convert it to another base.

## Operations to Add

### 1. `tobinary` - Convert to Binary
Converts a decimal number to its binary representation.

**Syntax:** `calc tobinary <decimal_number>`

**Examples:**
- `calc tobinary 10` → 1010
- `calc tobinary 255` → 11111111
- `calc tobinary 0` → 0

### 2. `tohex` - Convert to Hexadecimal
Converts a decimal number to its hexadecimal representation.

**Syntax:** `calc tohex <decimal_number>`

**Examples:**
- `calc tohex 10` → A (or 0xA)
- `calc tohex 255` → FF (or 0xFF)
- `calc tohex 16` → 10 (or 0x10)

### 3. `tooctal` - Convert to Octal
Converts a decimal number to its octal representation.

**Syntax:** `calc tooctal <decimal_number>`

**Examples:**
- `calc tooctal 10` → 12 (or 0o12)
- `calc tooctal 64` → 100 (or 0o100)
- `calc tooctal 8` → 10 (or 0o10)

### 4. `frombinary` - Convert from Binary
Converts a binary number to its decimal representation.

**Syntax:** `calc frombinary <binary_number>`

**Examples:**
- `calc frombinary 1010` → 10
- `calc frombinary 11111111` → 255
- `calc frombinary 0` → 0

### 5. `fromhex` - Convert from Hexadecimal
Converts a hexadecimal number to its decimal representation.

**Syntax:** `calc fromhex <hex_number>`

**Examples:**
- `calc fromhex A` → 10 (or `calc fromhex 0xA` → 10)
- `calc fromhex FF` → 255 (or `calc fromhex 0xFF` → 255)
- `calc fromhex 10` → 16 (or `calc fromhex 0x10` → 16)

### 6. `fromoctal` - Convert from Octal
Converts an octal number to its decimal representation.

**Syntax:** `calc fromoctal <octal_number>`

**Examples:**
- `calc fromoctal 12` → 10 (or `calc fromoctal 0o12` → 10)
- `calc fromoctal 100` → 64 (or `calc fromoctal 0o100` → 64)
- `calc fromoctal 10` → 8 (or `calc fromoctal 0o10` → 8)

## Implementation Requirements

1. Operations accept exactly 1 argument
2. Handle integer numbers only (no decimals for conversions)
3. Support both with and without prefix notation (0x for hex, 0o for octal, 0b for binary)
4. Validate input format (binary should only contain 0-1, hex should contain 0-9 and A-F)
5. Handle negative numbers appropriately
6. Provide clear error messages for invalid formats
7. Consider output format (with or without prefixes)

## Test Scenarios

### Test Suite 1: Convert to Binary

**Test 1.1: Convert Small Decimal to Binary**
- **Input:** `calc tobinary 10`
- **Expected Output:** `Tobinary Math Result: 1010` (or `0b1010`)
- **Assertions:**
  - Result equals "1010" or "0b1010"
  - Operation name is "tobinary"

**Test 1.2: Convert Zero to Binary**
- **Input:** `calc tobinary 0`
- **Expected Output:** `Tobinary Math Result: 0` (or `0b0`)
- **Assertions:**
  - Result equals "0" or "0b0"

**Test 1.3: Convert One to Binary**
- **Input:** `calc tobinary 1`
- **Expected Output:** `Tobinary Math Result: 1` (or `0b1`)
- **Assertions:**
  - Result equals "1" or "0b1"

**Test 1.4: Convert Large Number to Binary**
- **Input:** `calc tobinary 255`
- **Expected Output:** `Tobinary Math Result: 11111111` (or `0b11111111`)
- **Assertions:**
  - Result equals "11111111" or "0b11111111"

**Test 1.5: Convert Power of Two**
- **Input:** `calc tobinary 256`
- **Expected Output:** `Tobinary Math Result: 100000000` (or `0b100000000`)
- **Assertions:**
  - Result equals "100000000" or "0b100000000"

**Test 1.6: Convert Negative Number (Error Case)**
- **Input:** `calc tobinary -5`
- **Expected Behavior:** Error message or convert using two's complement (implementation decision)
- **Assertions:**
  - Either error is thrown OR result is correct two's complement representation
  - Behavior is documented

**Test 1.7: Convert Decimal Number (Error Case)**
- **Input:** `calc tobinary 10.5`
- **Expected Behavior:** Error message indicating only integers are supported
- **Assertions:**
  - Error is thrown
  - Error message: "Only integers can be converted to binary"

**Test 1.8: Invalid Number Format**
- **Input:** `calc tobinary abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 2: Convert to Hexadecimal

**Test 2.1: Convert Small Decimal to Hex**
- **Input:** `calc tohex 10`
- **Expected Output:** `Tohex Math Result: A` (or `0xA` or `A`)
- **Assertions:**
  - Result equals "A" or "0xA"
  - Operation name is "tohex"
  - Letters are uppercase

**Test 2.2: Convert Zero to Hex**
- **Input:** `calc tohex 0`
- **Expected Output:** `Tohex Math Result: 0` (or `0x0`)
- **Assertions:**
  - Result equals "0" or "0x0"

**Test 2.3: Convert Large Number to Hex**
- **Input:** `calc tohex 255`
- **Expected Output:** `Tohex Math Result: FF` (or `0xFF`)
- **Assertions:**
  - Result equals "FF" or "0xFF"
  - Letters are uppercase

**Test 2.4: Convert Power of 16**
- **Input:** `calc tohex 256`
- **Expected Output:** `Tohex Math Result: 100` (or `0x100`)
- **Assertions:**
  - Result equals "100" or "0x100"

**Test 2.5: Convert Number Requiring Multiple Hex Digits**
- **Input:** `calc tohex 4095`
- **Expected Output:** `Tohex Math Result: FFF` (or `0xFFF`)
- **Assertions:**
  - Result equals "FFF" or "0xFFF"

**Test 2.6: Convert Decimal Number (Error Case)**
- **Input:** `calc tohex 10.5`
- **Expected Behavior:** Error message indicating only integers are supported
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.7: Invalid Number Format**
- **Input:** `calc tohex abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 3: Convert to Octal

**Test 3.1: Convert Small Decimal to Octal**
- **Input:** `calc tooctal 10`
- **Expected Output:** `Tooctal Math Result: 12` (or `0o12`)
- **Assertions:**
  - Result equals "12" or "0o12"
  - Operation name is "tooctal"

**Test 3.2: Convert Zero to Octal**
- **Input:** `calc tooctal 0`
- **Expected Output:** `Tooctal Math Result: 0` (or `0o0`)
- **Assertions:**
  - Result equals "0" or "0o0"

**Test 3.3: Convert Power of 8**
- **Input:** `calc tooctal 64`
- **Expected Output:** `Tooctal Math Result: 100` (or `0o100`)
- **Assertions:**
  - Result equals "100" or "0o100"

**Test 3.4: Convert Number Requiring Multiple Octal Digits**
- **Input:** `calc tooctal 511`
- **Expected Output:** `Tooctal Math Result: 777` (or `0o777`)
- **Assertions:**
  - Result equals "777" or "0o777"

**Test 3.5: Convert Decimal Number (Error Case)**
- **Input:** `calc tooctal 10.5`
- **Expected Behavior:** Error message indicating only integers are supported
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 3.6: Invalid Number Format**
- **Input:** `calc tooctal abc`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Convert from Binary

**Test 4.1: Convert Small Binary to Decimal**
- **Input:** `calc frombinary 1010`
- **Expected Output:** `Frombinary Math Result: 10`
- **Assertions:**
  - Result equals 10
  - Operation name is "frombinary"

**Test 4.2: Convert Zero from Binary**
- **Input:** `calc frombinary 0`
- **Expected Output:** `Frombinary Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 4.3: Convert One from Binary**
- **Input:** `calc frombinary 1`
- **Expected Output:** `Frombinary Math Result: 1`
- **Assertions:**
  - Result equals 1

**Test 4.4: Convert Large Binary to Decimal**
- **Input:** `calc frombinary 11111111`
- **Expected Output:** `Frombinary Math Result: 255`
- **Assertions:**
  - Result equals 255

**Test 4.5: Convert Binary with Prefix**
- **Input:** `calc frombinary 0b1010`
- **Expected Output:** `Frombinary Math Result: 10`
- **Assertions:**
  - Result equals 10
  - Handles 0b prefix correctly

**Test 4.6: Invalid Binary Format (Contains Non-Binary Digits)**
- **Input:** `calc frombinary 1012`
- **Expected Behavior:** Error message indicating invalid binary format
- **Assertions:**
  - Error is thrown
  - Error message: "Invalid binary format. Binary numbers can only contain 0 and 1"

**Test 4.7: Invalid Binary Format (Contains Letters)**
- **Input:** `calc frombinary abc`
- **Expected Behavior:** Error message indicating invalid binary format
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.8: Empty Input**
- **Input:** `calc frombinary`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 5: Convert from Hexadecimal

**Test 5.1: Convert Small Hex to Decimal**
- **Input:** `calc fromhex A`
- **Expected Output:** `Fromhex Math Result: 10`
- **Assertions:**
  - Result equals 10
  - Operation name is "fromhex"
  - Handles uppercase letters

**Test 5.2: Convert Hex with Lowercase**
- **Input:** `calc fromhex a`
- **Expected Output:** `Fromhex Math Result: 10`
- **Assertions:**
  - Result equals 10
  - Handles lowercase letters (case-insensitive)

**Test 5.3: Convert Large Hex to Decimal**
- **Input:** `calc fromhex FF`
- **Expected Output:** `Fromhex Math Result: 255`
- **Assertions:**
  - Result equals 255

**Test 5.4: Convert Hex with Prefix**
- **Input:** `calc fromhex 0xFF`
- **Expected Output:** `Fromhex Math Result: 255`
- **Assertions:**
  - Result equals 255
  - Handles 0x prefix correctly

**Test 5.5: Convert Hex with Lowercase Prefix**
- **Input:** `calc fromhex 0xff`
- **Expected Output:** `Fromhex Math Result: 255`
- **Assertions:**
  - Result equals 255
  - Handles lowercase prefix

**Test 5.6: Convert Multi-Digit Hex**
- **Input:** `calc fromhex 1A2B`
- **Expected Output:** `Fromhex Math Result: 6699`
- **Assertions:**
  - Result equals 6699

**Test 5.7: Invalid Hex Format (Invalid Character)**
- **Input:** `calc fromhex G`
- **Expected Behavior:** Error message indicating invalid hexadecimal format
- **Assertions:**
  - Error is thrown
  - Error message: "Invalid hexadecimal format. Hexadecimal numbers can only contain 0-9 and A-F"

**Test 5.8: Invalid Hex Format (Contains Non-Hex Characters)**
- **Input:** `calc fromhex 12G`
- **Expected Behavior:** Error message indicating invalid hexadecimal format
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 6: Convert from Octal

**Test 6.1: Convert Small Octal to Decimal**
- **Input:** `calc fromoctal 12`
- **Expected Output:** `Fromoctal Math Result: 10`
- **Assertions:**
  - Result equals 10
  - Operation name is "fromoctal"

**Test 6.2: Convert Zero from Octal**
- **Input:** `calc fromoctal 0`
- **Expected Output:** `Fromoctal Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 6.3: Convert Large Octal to Decimal**
- **Input:** `calc fromoctal 777`
- **Expected Output:** `Fromoctal Math Result: 511`
- **Assertions:**
  - Result equals 511

**Test 6.4: Convert Octal with Prefix**
- **Input:** `calc fromoctal 0o12`
- **Expected Output:** `Fromoctal Math Result: 10`
- **Assertions:**
  - Result equals 10
  - Handles 0o prefix correctly

**Test 6.5: Convert Octal with Uppercase Prefix**
- **Input:** `calc fromoctal 0O12`
- **Expected Output:** `Fromoctal Math Result: 10`
- **Assertions:**
  - Result equals 10
  - Handles uppercase prefix

**Test 6.6: Invalid Octal Format (Contains Invalid Digits)**
- **Input:** `calc fromoctal 89`
- **Expected Behavior:** Error message indicating invalid octal format
- **Assertions:**
  - Error is thrown
  - Error message: "Invalid octal format. Octal numbers can only contain 0-7"

**Test 6.7: Invalid Octal Format (Contains Letters)**
- **Input:** `calc fromoctal abc`
- **Expected Behavior:** Error message indicating invalid octal format
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 7: Round-Trip Conversions

**Test 7.1: Decimal → Binary → Decimal**
- **Input:** `calc tobinary 42` then `calc frombinary <result>`
- **Expected:** Round-trip conversion returns original value
- **Assertions:**
  - Binary conversion works
  - From binary conversion returns 42

**Test 7.2: Decimal → Hex → Decimal**
- **Input:** `calc tohex 255` then `calc fromhex <result>`
- **Expected:** Round-trip conversion returns original value
- **Assertions:**
  - Hex conversion works
  - From hex conversion returns 255

**Test 7.3: Decimal → Octal → Decimal**
- **Input:** `calc tooctal 64` then `calc fromoctal <result>`
- **Expected:** Round-trip conversion returns original value
- **Assertions:**
  - Octal conversion works
  - From octal conversion returns 64

### Test Suite 8: Edge Cases

**Test 8.1: Very Large Number**
- **Input:** `calc tobinary 4294967295`
- **Expected Output:** Binary representation of 2^32 - 1
- **Assertions:**
  - Handles large numbers correctly
  - Result is correct

**Test 8.2: Maximum Safe Integer**
- **Input:** `calc tohex 9007199254740991`
- **Expected Output:** Hex representation
- **Assertions:**
  - Handles JavaScript's Number.MAX_SAFE_INTEGER correctly
  - Result is correct

**Test 8.3: Missing Argument**
- **Input:** `calc tobinary`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

## Acceptance Criteria

1. ✅ All 6 conversion operations are implemented (tobinary, tohex, tooctal, frombinary, fromhex, fromoctal)
2. ✅ Operations accept exactly 1 argument
3. ✅ Operations validate input format correctly
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays new operations with examples
7. ✅ Operations handle prefixes (0b, 0x, 0o) correctly
8. ✅ Hexadecimal letters are consistently formatted (uppercase recommended)
9. ✅ Round-trip conversions work correctly
10. ✅ Operations handle edge cases gracefully (zero, large numbers, invalid formats)

