# Spec 014: Coordinate Geometry Operations

## Overview
Add support for coordinate geometry calculations including distance between points, midpoint, slope, area of polygons, and other geometric calculations.

## Feature Description
Extend the CLI tool to support operations for working with points, lines, and shapes in coordinate geometry, enabling users to perform geometric calculations.

## Operations to Add

### 1. `distance` - Distance Between Two Points
Calculates the Euclidean distance between two points in 2D or 3D space.

**Syntax:** `calc distance <x1> <y1> <x2> <y2>` or `calc distance <x1> <y1> <z1> <x2> <y2> <z2>`

**Examples:**
- `calc distance 0 0 3 4` → 5 (distance between (0,0) and (3,4))
- `calc distance 1 2 4 6` → 5 (distance between (1,2) and (4,6))

### 2. `midpoint` - Midpoint of Two Points
Finds the midpoint between two points.

**Syntax:** `calc midpoint <x1> <y1> <x2> <y2>`

**Examples:**
- `calc midpoint 0 0 4 4` → 2, 2 (or (2, 2))
- `calc midpoint 1 3 5 7` → 3, 5 (or (3, 5))

### 3. `slope` - Slope of a Line
Calculates the slope of a line passing through two points.

**Syntax:** `calc slope <x1> <y1> <x2> <y2>`

**Examples:**
- `calc slope 0 0 2 4` → 2 (slope = 2)
- `calc slope 1 1 3 1` → 0 (horizontal line)

### 4. `area` - Area of Polygon
Calculates the area of a polygon given its vertices (using shoelace formula).

**Syntax:** `calc area <x1> <y1> <x2> <y2> ... <xn> <yn>`

**Examples:**
- `calc area 0 0 4 0 4 4 0 4` → 16 (area of square)
- `calc area 0 0 3 0 3 4` → 6 (area of triangle)

### 5. `perimeter` - Perimeter of Polygon
Calculates the perimeter of a polygon given its vertices.

**Syntax:** `calc perimeter <x1> <y1> <x2> <y2> ... <xn> <yn>`

**Examples:**
- `calc perimeter 0 0 4 0 4 4 0 4` → 16 (perimeter of square)
- `calc perimeter 0 0 3 0 3 4` → ~12.65 (perimeter of triangle)

### 6. `circlearea` - Area of Circle
Calculates the area of a circle given its radius.

**Syntax:** `calc circlearea <radius>`

**Examples:**
- `calc circlearea 5` → ~78.54 (π × 5²)
- `calc circlearea 10` → ~314.16 (π × 10²)

### 7. `circumference` - Circumference of Circle
Calculates the circumference of a circle given its radius.

**Syntax:** `calc circumference <radius>`

**Examples:**
- `calc circumference 5` → ~31.42 (2 × π × 5)
- `calc circumference 10` → ~62.83 (2 × π × 10)

## Implementation Requirements

1. Operations accept variable numbers of arguments depending on the operation
2. Validate that coordinates are numbers
3. Handle edge cases (same points, collinear points, zero radius, etc.)
4. For slope, handle vertical lines (undefined slope) appropriately
5. For polygon operations, validate minimum number of vertices (3 for triangle)
6. Use appropriate geometric formulas
7. Provide clear error messages

## Test Scenarios

### Test Suite 1: Distance Operation

**Test 1.1: Basic 2D Distance**
- **Input:** `calc distance 0 0 3 4`
- **Expected Output:** `Distance Math Result: 5`
- **Assertions:**
  - Result equals 5 (3-4-5 right triangle)
  - Formula: √((x2-x1)² + (y2-y1)²)
  - Operation name is "distance"

**Test 1.2: Distance with Negative Coordinates**
- **Input:** `calc distance -1 -2 2 2`
- **Expected Output:** `Distance Math Result: 5`
- **Assertions:**
  - Result equals 5
  - Handles negative coordinates correctly

**Test 1.3: Distance Between Same Points**
- **Input:** `calc distance 3 4 3 4`
- **Expected Output:** `Distance Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 1.4: Horizontal Distance**
- **Input:** `calc distance 0 0 5 0`
- **Expected Output:** `Distance Math Result: 5`
- **Assertions:**
  - Result equals 5 (horizontal line)

**Test 1.5: Vertical Distance**
- **Input:** `calc distance 0 0 0 5`
- **Expected Output:** `Distance Math Result: 5`
- **Assertions:**
  - Result equals 5 (vertical line)

**Test 1.6: 3D Distance**
- **Input:** `calc distance 0 0 0 3 4 0`
- **Expected Output:** `Distance Math Result: 5`
- **Assertions:**
  - Result equals 5 (distance in 3D, z=0)
  - Handles 3D coordinates

**Test 1.7: 3D Distance with Z Component**
- **Input:** `calc distance 0 0 0 0 0 5`
- **Expected Output:** `Distance Math Result: 5`
- **Assertions:**
  - Result equals 5 (distance along z-axis)

**Test 1.8: Missing Arguments (Error Case)**
- **Input:** `calc distance 0 0 3`
- **Expected Behavior:** Error message indicating missing arguments
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 1.9: Invalid Number Format**
- **Input:** `calc distance 0 0 abc 4`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

### Test Suite 2: Midpoint Operation

**Test 2.1: Basic Midpoint**
- **Input:** `calc midpoint 0 0 4 4`
- **Expected Output:** `Midpoint Math Result: 2, 2` (or (2, 2))
- **Assertions:**
  - Result equals (2, 2)
  - Formula: ((x1+x2)/2, (y1+y2)/2)
  - Operation name is "midpoint"

**Test 2.2: Midpoint with Different Coordinates**
- **Input:** `calc midpoint 1 3 5 7`
- **Expected Output:** `Midpoint Math Result: 3, 5` (or (3, 5))
- **Assertions:**
  - Result equals (3, 5)

**Test 2.3: Midpoint with Negative Coordinates**
- **Input:** `calc midpoint -2 -4 2 4`
- **Expected Output:** `Midpoint Math Result: 0, 0` (or (0, 0))
- **Assertions:**
  - Result equals (0, 0)
  - Handles negative coordinates

**Test 2.4: Midpoint with Decimal Coordinates**
- **Input:** `calc midpoint 1.5 2.5 3.5 4.5`
- **Expected Output:** `Midpoint Math Result: 2.5, 3.5` (or (2.5, 3.5))
- **Assertions:**
  - Result equals (2.5, 3.5)
  - Handles decimal coordinates

**Test 2.5: Midpoint of Same Points**
- **Input:** `calc midpoint 3 4 3 4`
- **Expected Output:** `Midpoint Math Result: 3, 4` (or (3, 4))
- **Assertions:**
  - Result equals (3, 4)

**Test 2.6: Missing Arguments (Error Case)**
- **Input:** `calc midpoint 0 0 4`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 3: Slope Operation

**Test 3.1: Positive Slope**
- **Input:** `calc slope 0 0 2 4`
- **Expected Output:** `Slope Math Result: 2`
- **Assertions:**
  - Result equals 2 (slope = (4-0)/(2-0) = 2)
  - Formula: m = (y2-y1)/(x2-x1)
  - Operation name is "slope"

**Test 3.2: Negative Slope**
- **Input:** `calc slope 0 4 2 0`
- **Expected Output:** `Slope Math Result: -2`
- **Assertions:**
  - Result equals -2

**Test 3.3: Zero Slope (Horizontal Line)**
- **Input:** `calc slope 1 1 3 1`
- **Expected Output:** `Slope Math Result: 0`
- **Assertions:**
  - Result equals 0 (horizontal line)

**Test 3.4: Undefined Slope (Vertical Line)**
- **Input:** `calc slope 1 1 1 3`
- **Expected Behavior:** Error message indicating undefined slope or special value
- **Assertions:**
  - Either throws error or returns special value (Infinity, "undefined")
  - Error message: "Slope is undefined for vertical line"

**Test 3.5: Slope with Decimal Coordinates**
- **Input:** `calc slope 0 0 1 0.5`
- **Expected Output:** `Slope Math Result: 0.5`
- **Assertions:**
  - Result equals 0.5
  - Handles decimal coordinates

**Test 3.6: Same Points (Error Case)**
- **Input:** `calc slope 3 4 3 4`
- **Expected Behavior:** Error message indicating points are the same
- **Assertions:**
  - Error is thrown
  - Error message: "Cannot calculate slope: points are the same"

**Test 3.7: Missing Arguments (Error Case)**
- **Input:** `calc slope 0 0 2`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Area of Polygon

**Test 4.1: Area of Rectangle**
- **Input:** `calc area 0 0 4 0 4 4 0 4`
- **Expected Output:** `Area Math Result: 16`
- **Assertions:**
  - Result equals 16 (4×4 rectangle)
  - Uses shoelace formula
  - Operation name is "area"

**Test 4.2: Area of Triangle**
- **Input:** `calc area 0 0 3 0 3 4`
- **Expected Output:** `Area Math Result: 6`
- **Assertions:**
  - Result equals 6 (right triangle: 3×4/2 = 6)

**Test 4.3: Area of Triangle with Negative Coordinates**
- **Input:** `calc area -1 -1 2 -1 2 2`
- **Expected Output:** `Area Math Result: 6`
- **Assertions:**
  - Result equals 6
  - Handles negative coordinates

**Test 4.4: Area of Pentagon**
- **Input:** `calc area 0 0 2 0 3 2 1 3 -1 2`
- **Expected Output:** Appropriate area value
- **Assertions:**
  - Result is correct
  - Handles polygons with more than 4 vertices

**Test 4.5: Minimum Vertices (Error Case)**
- **Input:** `calc area 0 0 4 0`
- **Expected Behavior:** Error message indicating at least 3 vertices required
- **Assertions:**
  - Error is thrown
  - Error message: "At least 3 vertices required for polygon area"

**Test 4.6: Odd Number of Coordinates (Error Case)**
- **Input:** `calc area 0 0 4 0 4`
- **Expected Behavior:** Error message indicating even number of coordinates required
- **Assertions:**
  - Error is thrown
  - Error message: "Even number of coordinates required (x, y pairs)"

**Test 4.7: Area with Decimal Coordinates**
- **Input:** `calc area 0 0 2.5 0 2.5 2.5 0 2.5`
- **Expected Output:** `Area Math Result: 6.25`
- **Assertions:**
  - Result equals 6.25
  - Handles decimal coordinates

### Test Suite 5: Perimeter of Polygon

**Test 5.1: Perimeter of Rectangle**
- **Input:** `calc perimeter 0 0 4 0 4 4 0 4`
- **Expected Output:** `Perimeter Math Result: 16`
- **Assertions:**
  - Result equals 16 (4+4+4+4 = 16)
  - Operation name is "perimeter"

**Test 5.2: Perimeter of Triangle**
- **Input:** `calc perimeter 0 0 3 0 3 4`
- **Expected Output:** `Perimeter Math Result: 12` (approximately)
- **Assertions:**
  - Result equals 12 (3+4+5 = 12, right triangle)

**Test 5.3: Perimeter with Decimal Coordinates**
- **Input:** `calc perimeter 0 0 2.5 0 2.5 2.5 0 2.5`
- **Expected Output:** `Perimeter Math Result: 10`
- **Assertions:**
  - Result equals 10 (2.5+2.5+2.5+2.5 = 10)

**Test 5.4: Minimum Vertices (Error Case)**
- **Input:** `calc perimeter 0 0 4 0`
- **Expected Behavior:** Error message indicating at least 3 vertices required
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 5.5: Odd Number of Coordinates (Error Case)**
- **Input:** `calc perimeter 0 0 4 0 4`
- **Expected Behavior:** Error message indicating even number of coordinates required
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 6: Circle Area

**Test 6.1: Basic Circle Area**
- **Input:** `calc circlearea 5`
- **Expected Output:** `Circlearea Math Result: 78.53981633974483` (approximately)
- **Assertions:**
  - Result is approximately 78.54 (π × 5²)
  - Formula: A = πr²
  - Operation name is "circlearea"

**Test 6.2: Circle Area with Different Radius**
- **Input:** `calc circlearea 10`
- **Expected Output:** `Circlearea Math Result: 314.1592653589793` (approximately)
- **Assertions:**
  - Result is approximately 314.16 (π × 10²)

**Test 6.3: Circle Area with Decimal Radius**
- **Input:** `calc circlearea 2.5`
- **Expected Output:** `Circlearea Math Result: 19.634954084936208` (approximately)
- **Assertions:**
  - Result is approximately 19.63 (π × 2.5²)

**Test 6.4: Circle Area with Zero Radius**
- **Input:** `calc circlearea 0`
- **Expected Output:** `Circlearea Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 6.5: Negative Radius (Error Case)**
- **Input:** `calc circlearea -5`
- **Expected Behavior:** Error message indicating radius must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message: "Radius must be non-negative"

**Test 6.6: Missing Argument (Error Case)**
- **Input:** `calc circlearea`
- **Expected Behavior:** Error message indicating missing argument
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 7: Circumference

**Test 7.1: Basic Circumference**
- **Input:** `calc circumference 5`
- **Expected Output:** `Circumference Math Result: 31.41592653589793` (approximately)
- **Assertions:**
  - Result is approximately 31.42 (2 × π × 5)
  - Formula: C = 2πr
  - Operation name is "circumference"

**Test 7.2: Circumference with Different Radius**
- **Input:** `calc circumference 10`
- **Expected Output:** `Circumference Math Result: 62.83185307179586` (approximately)
- **Assertions:**
  - Result is approximately 62.83 (2 × π × 10)

**Test 7.3: Circumference with Decimal Radius**
- **Input:** `calc circumference 2.5`
- **Expected Output:** `Circumference Math Result: 15.707963267948966` (approximately)
- **Assertions:**
  - Result is approximately 15.71 (2 × π × 2.5)

**Test 7.4: Circumference with Zero Radius**
- **Input:** `calc circumference 0`
- **Expected Output:** `Circumference Math Result: 0`
- **Assertions:**
  - Result equals 0

**Test 7.5: Negative Radius (Error Case)**
- **Input:** `calc circumference -5`
- **Expected Behavior:** Error message indicating radius must be non-negative
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 7.6: Relationship to Area**
- **Input:** `calc circlearea 5` and `calc circumference 5`
- **Expected:** Verify C² = 4πA (circumference squared equals 4π times area)
- **Assertions:**
  - Relationship holds: C² = 4πA
  - Results are consistent

### Test Suite 8: Edge Cases and Integration

**Test 8.1: Very Large Coordinates**
- **Input:** `calc distance 0 0 1000000 1000000`
- **Expected Output:** Very large distance
- **Assertions:**
  - Result is correct
  - Handles large coordinates

**Test 8.2: Very Small Coordinates**
- **Input:** `calc distance 0 0 0.001 0.001`
- **Expected Output:** Very small distance
- **Assertions:**
  - Result is correct
  - Handles small coordinates

**Test 8.3: Invalid Number Format**
- **Input:** `calc distance 0 0 abc 4`
- **Expected Behavior:** Error message indicating invalid number format
- **Assertions:**
  - Error is thrown
  - Error message identifies invalid argument

**Test 8.4: Missing Arguments**
- **Input:** `calc distance 0 0`
- **Expected Behavior:** Error message indicating missing arguments
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 8.5: Complex Polygon**
- **Input:** `calc area 0 0 5 0 5 3 2 5 0 3`
- **Expected Output:** Appropriate area value
- **Assertions:**
  - Result is correct
  - Handles complex polygons

## Acceptance Criteria

1. ✅ All 7 coordinate geometry operations are implemented (distance, midpoint, slope, area, perimeter, circlearea, circumference)
2. ✅ Operations handle 2D and 3D coordinates appropriately
3. ✅ All test scenarios pass
4. ✅ Error messages are clear and helpful
5. ✅ Help command displays new operations with examples
6. ✅ Operations handle edge cases gracefully (same points, vertical lines, zero radius, etc.)
7. ✅ Geometric formulas are mathematically correct
8. ✅ Polygon operations validate minimum vertices
9. ✅ Slope handles vertical lines (undefined) appropriately
10. ✅ Operations handle decimal coordinates correctly

