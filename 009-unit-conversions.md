# Spec 009: Unit Conversions

## Overview
Add support for converting values between different units of measurement, enabling users to perform unit conversions for length, weight, temperature, and other common measurements.

## Feature Description
Extend the CLI tool to support conversion operations that can convert values between different units within the same measurement category (e.g., meters to feet, kilograms to pounds, Celsius to Fahrenheit).

## Operations to Add

### 1. `convert` - Unit Conversion
Converts a value from one unit to another.

**Syntax:** `calc convert <value> <from_unit> <to_unit>`

**Examples:**
- `calc convert 100 meter foot` → ~328.084 (feet)
- `calc convert 32 fahrenheit celsius` → 0 (Celsius)
- `calc convert 1 kilogram pound` → ~2.20462 (pounds)

## Supported Unit Categories

### Length
- `meter` (m), `kilometer` (km), `centimeter` (cm), `millimeter` (mm)
- `foot` (ft), `inch` (in), `yard` (yd), `mile` (mi)

### Weight/Mass
- `kilogram` (kg), `gram` (g), `milligram` (mg)
- `pound` (lb), `ounce` (oz), `ton` (US ton)

### Temperature
- `celsius` (C), `fahrenheit` (F), `kelvin` (K)

### Volume
- `liter` (L), `milliliter` (mL), `gallon` (gal), `quart` (qt), `pint` (pt), `cup` (cup), `fluid_ounce` (fl_oz)

### Time
- `second` (s), `minute` (min), `hour` (hr), `day` (day), `week` (week), `month` (month), `year` (yr)

## Implementation Requirements

1. Operation accepts exactly 3 arguments (value, from_unit, to_unit)
2. Validate that units are in the same category
3. Handle temperature conversions specially (they have offsets, not just multipliers)
4. Support unit aliases (e.g., "m" for "meter", "ft" for "foot")
5. Provide clear error messages for invalid units or incompatible conversions
6. Use accurate conversion factors
7. Handle precision appropriately

## Test Scenarios

### Test Suite 1: Length Conversions

**Test 1.1: Meter to Foot**
- **Input:** `calc convert 1 meter foot`
- **Expected Output:** `Convert Math Result: 3.28084` (approximately)
- **Assertions:**
  - Result is approximately 3.28084 feet
  - Operation name is "convert"

**Test 1.2: Foot to Meter**
- **Input:** `calc convert 3.28084 foot meter`
- **Expected Output:** `Convert Math Result: 1` (approximately)
- **Assertions:**
  - Result is approximately 1 meter
  - Round-trip conversion works

**Test 1.3: Kilometer to Mile**
- **Input:** `calc convert 1 kilometer mile`
- **Expected Output:** `Convert Math Result: 0.621371` (approximately)
- **Assertions:**
  - Result is approximately 0.621371 miles

**Test 1.4: Centimeter to Inch**
- **Input:** `calc convert 2.54 centimeter inch`
- **Expected Output:** `Convert Math Result: 1` (approximately)
- **Assertions:**
  - Result equals 1 inch

**Test 1.5: Yard to Meter**
- **Input:** `calc convert 1 yard meter`
- **Expected Output:** `Convert Math Result: 0.9144` (approximately)
- **Assertions:**
  - Result is approximately 0.9144 meters

**Test 1.6: Unit Alias Support**
- **Input:** `calc convert 1 m ft`
- **Expected Output:** `Convert Math Result: 3.28084` (approximately)
- **Assertions:**
  - Handles unit aliases correctly

**Test 1.7: Incompatible Units (Error Case)**
- **Input:** `calc convert 1 meter kilogram`
- **Expected Behavior:** Error message indicating incompatible units
- **Assertions:**
  - Error is thrown
  - Error message: "Cannot convert between meter and kilogram (different unit categories)"

### Test Suite 2: Weight/Mass Conversions

**Test 2.1: Kilogram to Pound**
- **Input:** `calc convert 1 kilogram pound`
- **Expected Output:** `Convert Math Result: 2.20462` (approximately)
- **Assertions:**
  - Result is approximately 2.20462 pounds

**Test 2.2: Pound to Kilogram**
- **Input:** `calc convert 2.20462 pound kilogram`
- **Expected Output:** `Convert Math Result: 1` (approximately)
- **Assertions:**
  - Result is approximately 1 kilogram

**Test 2.3: Gram to Ounce**
- **Input:** `calc convert 28.3495 gram ounce`
- **Expected Output:** `Convert Math Result: 1` (approximately)
- **Assertions:**
  - Result equals 1 ounce (approximately)

**Test 2.4: Ton to Kilogram**
- **Input:** `calc convert 1 ton kilogram`
- **Expected Output:** `Convert Math Result: 907.185` (approximately, US ton)
- **Assertions:**
  - Result is approximately 907.185 kilograms

**Test 2.5: Milligram to Gram**
- **Input:** `calc convert 1000 milligram gram`
- **Expected Output:** `Convert Math Result: 1`
- **Assertions:**
  - Result equals 1 gram

### Test Suite 3: Temperature Conversions

**Test 3.1: Celsius to Fahrenheit**
- **Input:** `calc convert 0 celsius fahrenheit`
- **Expected Output:** `Convert Math Result: 32`
- **Assertions:**
  - Result equals 32 (0°C = 32°F)
  - Temperature conversion uses formula correctly

**Test 3.2: Fahrenheit to Celsius**
- **Input:** `calc convert 32 fahrenheit celsius`
- **Expected Output:** `Convert Math Result: 0`
- **Assertions:**
  - Result equals 0 (32°F = 0°C)

**Test 3.3: Celsius to Kelvin**
- **Input:** `calc convert 0 celsius kelvin`
- **Expected Output:** `Convert Math Result: 273.15`
- **Assertions:**
  - Result equals 273.15 (0°C = 273.15K)

**Test 3.4: Fahrenheit to Kelvin**
- **Input:** `calc convert 32 fahrenheit kelvin`
- **Expected Output:** `Convert Math Result: 273.15` (approximately)
- **Assertions:**
  - Result equals 273.15 (approximately)

**Test 3.5: Kelvin to Celsius**
- **Input:** `calc convert 273.15 kelvin celsius`
- **Expected Output:** `Convert Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 3.6: Freezing Point**
- **Input:** `calc convert 100 celsius fahrenheit`
- **Expected Output:** `Convert Math Result: 212`
- **Assertions:**
  - Result equals 212 (100°C = 212°F, boiling point)

**Test 3.7: Negative Temperature**
- **Input:** `calc convert -40 celsius fahrenheit`
- **Expected Output:** `Convert Math Result: -40`
- **Assertions:**
  - Result equals -40 (-40°C = -40°F, the only point where scales meet)

### Test Suite 4: Volume Conversions

**Test 4.1: Liter to Gallon**
- **Input:** `calc convert 3.78541 liter gallon`
- **Expected Output:** `Convert Math Result: 1` (approximately)
- **Assertions:**
  - Result equals 1 gallon (approximately)

**Test 4.2: Milliliter to Liter**
- **Input:** `calc convert 1000 milliliter liter`
- **Expected Output:** `Convert Math Result: 1`
- **Assertions:**
  - Result equals 1 liter

**Test 4.3: Gallon to Quart**
- **Input:** `calc convert 1 gallon quart`
- **Expected Output:** `Convert Math Result: 4`
- **Assertions:**
  - Result equals 4 quarts

**Test 4.4: Cup to Fluid Ounce**
- **Input:** `calc convert 1 cup fluid_ounce`
- **Expected Output:** `Convert Math Result: 8`
- **Assertions:**
  - Result equals 8 fluid ounces

### Test Suite 5: Time Conversions

**Test 5.1: Second to Minute**
- **Input:** `calc convert 60 second minute`
- **Expected Output:** `Convert Math Result: 1`
- **Assertions:**
  - Result equals 1 minute

**Test 5.2: Hour to Minute**
- **Input:** `calc convert 1 hour minute`
- **Expected Output:** `Convert Math Result: 60`
- **Assertions:**
  - Result equals 60 minutes

**Test 5.3: Day to Hour**
- **Input:** `calc convert 1 day hour`
- **Expected Output:** `Convert Math Result: 24`
- **Assertions:**
  - Result equals 24 hours

**Test 5.4: Week to Day**
- **Input:** `calc convert 1 week day`
- **Expected Output:** `Convert Math Result: 7`
- **Assertions:**
  - Result equals 7 days

**Test 5.5: Year to Day**
- **Input:** `calc convert 1 year day`
- **Expected Output:** `Convert Math Result: 365` (or 365.25, depending on implementation)
- **Assertions:**
  - Result equals 365 or 365.25
  - Behavior is documented

### Test Suite 6: Edge Cases and Error Handling

**Test 6.1: Invalid Unit Name**
- **Input:** `calc convert 1 invalid_unit meter`
- **Expected Behavior:** Error message indicating unknown unit
- **Assertions:**
  - Error is thrown
  - Error message: "Unknown unit: invalid_unit"

**Test 6.2: Missing Arguments**
- **Input:** `calc convert 1 meter`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 6.3: Invalid Number Format**
- **Input:** `calc convert abc meter foot`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies the invalid argument

**Test 6.4: Same Unit Conversion**
- **Input:** `calc convert 5 meter meter`
- **Expected Output:** `Convert Math Result: 5`
- **Assertions:**
  - Result equals 5 (no conversion needed)

**Test 6.5: Zero Value**
- **Input:** `calc convert 0 meter foot`
- **Expected Output:** `Convert Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 6.6: Very Large Value**
- **Input:** `calc convert 1000000 meter kilometer`
- **Expected Output:** `Convert Math Result: 1000`
- **Assertions:**
  - Result equals 1000 kilometers

**Test 6.7: Very Small Value**
- **Input:** `calc convert 0.001 meter millimeter`
- **Expected Output:** `Convert Math Result: 1`
- **Assertions:**
  - Result equals 1 millimeter

**Test 6.8: Negative Value (for non-temperature)**
- **Input:** `calc convert -5 meter foot`
- **Expected Output:** Negative result (or error, depending on implementation)
- **Assertions:**
  - Either returns negative result or throws error
  - Behavior is documented

## Acceptance Criteria

1. ✅ Unit conversion operation is implemented
2. ✅ Supports all listed unit categories (length, weight, temperature, volume, time)
3. ✅ Supports unit aliases
4. ✅ Temperature conversions use correct formulas (with offsets)
5. ✅ All test scenarios pass
6. ✅ Error messages are clear and helpful
7. ✅ Help command displays supported units and examples
8. ✅ Operations handle edge cases gracefully (zero, negatives, large/small values)
9. ✅ Incompatible unit conversions are detected and rejected
10. ✅ Conversion factors are accurate
11. ✅ Round-trip conversions work correctly

