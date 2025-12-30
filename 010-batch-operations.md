# Spec 010: Batch Operations from File

## Overview
Add support for reading numbers from a file and performing operations on them, enabling users to process large datasets and perform batch calculations.

## Feature Description
Extend the CLI tool to support reading numbers from a file (CSV, text file, or JSON) and applying operations to those numbers, enabling batch processing of calculations.

## Operations to Add

### 1. `batch` - Batch Operation from File
Reads numbers from a file and performs an operation on them.

**Syntax:** `calc batch <operation> <file_path> [options]`

**Examples:**
- `calc batch sum numbers.txt` → Sum of all numbers in file
- `calc batch mean data.csv --format csv` → Mean of numbers in CSV file
- `calc batch max values.json --format json` → Maximum value in JSON array

## Supported File Formats

### 1. Plain Text (default)
One number per line or space-separated numbers.

**Example file (numbers.txt):**
```
10
20
30
40
50
```

### 2. CSV
Comma-separated values. Can specify column index.

**Example file (data.csv):**
```
name,value,date
item1,10,2024-01-01
item2,20,2024-01-02
item3,30,2024-01-03
```

### 3. JSON
JSON array of numbers or array of objects with numeric fields.

**Example file (values.json):**
```json
[10, 20, 30, 40, 50]
```

or

```json
[{"value": 10}, {"value": 20}, {"value": 30}]
```

## Options

- `--format <format>` - File format: `text`, `csv`, or `json` (default: `text`)
- `--column <index>` - For CSV: column index (0-based) or column name
- `--field <name>` - For JSON objects: field name to extract
- `--delimiter <char>` - For text files: delimiter character (default: whitespace)

## Implementation Requirements

1. Read and parse files in supported formats
2. Extract numbers from files based on format
3. Apply the specified operation to extracted numbers
4. Handle file not found errors
5. Handle invalid file format errors
6. Support relative and absolute file paths
7. Handle empty files gracefully
8. Validate that operation supports multiple arguments
9. Provide clear error messages

## Test Scenarios

### Test Suite 1: Plain Text File Operations

**Test 1.1: Sum from Text File**
- **File (test1.txt):** Contains `10\n20\n30\n40\n50`
- **Input:** `calc batch sum test1.txt`
- **Expected Output:** `Batch Math Result: 150`
- **Assertions:**
  - Result equals 150
  - Operation name is "batch"
  - Reads all numbers from file

**Test 1.2: Mean from Text File**
- **File (test2.txt):** Contains `10\n20\n30\n40\n50`
- **Input:** `calc batch mean test2.txt`
- **Expected Output:** `Batch Math Result: 30`
- **Assertions:**
  - Result equals 30

**Test 1.3: Max from Text File**
- **File (test3.txt):** Contains `5\n15\n10\n25\n20`
- **Input:** `calc batch max test3.txt`
- **Expected Output:** `Batch Math Result: 25`
- **Assertions:**
  - Result equals 25

**Test 1.4: Space-Separated Numbers**
- **File (test4.txt):** Contains `10 20 30 40 50`
- **Input:** `calc batch sum test4.txt`
- **Expected Output:** `Batch Math Result: 150`
- **Assertions:**
  - Handles space-separated format

**Test 1.5: Empty File**
- **File (empty.txt):** Empty file
- **Input:** `calc batch sum empty.txt`
- **Expected Behavior:** Error message indicating insufficient data
- **Assertions:**
  - Error is thrown
  - Error message: "File contains no valid numbers"

**Test 1.6: File with Invalid Numbers**
- **File (invalid.txt):** Contains `10\nabc\n20\n30`
- **Input:** `calc batch sum invalid.txt`
- **Expected Output:** `Batch Math Result: 60` (skips invalid lines) or error
- **Assertions:**
  - Either skips invalid lines or throws error
  - Behavior is documented

**Test 1.7: File Not Found**
- **Input:** `calc batch sum nonexistent.txt`
- **Expected Behavior:** Error message indicating file not found
- **Assertions:**
  - Error is thrown
  - Error message: "File not found: nonexistent.txt"

### Test Suite 2: CSV File Operations

**Test 2.1: Sum from CSV (Default Column)**
- **File (data1.csv):** Contains `value\n10\n20\n30\n40\n50`
- **Input:** `calc batch sum data1.csv --format csv`
- **Expected Output:** `Batch Math Result: 150`
- **Assertions:**
  - Reads from first numeric column
  - Result equals 150

**Test 2.2: Mean from CSV (Specified Column Index)**
- **File (data2.csv):** Contains `name,value\nitem1,10\nitem2,20\nitem3,30`
- **Input:** `calc batch mean data2.csv --format csv --column 1`
- **Expected Output:** `Batch Math Result: 20`
- **Assertions:**
  - Reads from column index 1
  - Result equals 20

**Test 2.3: Max from CSV (Column Name)**
- **File (data3.csv):** Contains `name,value\nitem1,10\nitem2,25\nitem3,15`
- **Input:** `calc batch max data3.csv --format csv --column value`
- **Expected Output:** `Batch Math Result: 25`
- **Assertions:**
  - Reads from column named "value"
  - Result equals 25

**Test 2.4: CSV with Headers**
- **File (data4.csv):** Contains `id,amount\n1,100\n2,200\n3,300`
- **Input:** `calc batch sum data4.csv --format csv --column amount`
- **Expected Output:** `Batch Math Result: 600`
- **Assertions:**
  - Skips header row
  - Reads from named column
  - Result equals 600

**Test 2.5: Invalid Column Index (Error Case)**
- **File (data5.csv):** Contains `value\n10\n20`
- **Input:** `calc batch sum data5.csv --format csv --column 10`
- **Expected Behavior:** Error message indicating invalid column
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 2.6: CSV with Non-Numeric Values**
- **File (data6.csv):** Contains `value\n10\nabc\n20\n30`
- **Input:** `calc batch sum data6.csv --format csv`
- **Expected Output:** `Batch Math Result: 60` (skips non-numeric) or error
- **Assertions:**
  - Either skips non-numeric values or throws error
  - Behavior is documented

### Test Suite 3: JSON File Operations

**Test 3.1: Sum from JSON Array**
- **File (values1.json):** Contains `[10, 20, 30, 40, 50]`
- **Input:** `calc batch sum values1.json --format json`
- **Expected Output:** `Batch Math Result: 150`
- **Assertions:**
  - Parses JSON array correctly
  - Result equals 150

**Test 3.2: Mean from JSON Array of Objects**
- **File (values2.json):** Contains `[{"value": 10}, {"value": 20}, {"value": 30}]`
- **Input:** `calc batch mean values2.json --format json --field value`
- **Expected Output:** `Batch Math Result: 20`
- **Assertions:**
  - Extracts field from objects
  - Result equals 20

**Test 3.3: Max from JSON Array**
- **File (values3.json):** Contains `[5, 15, 10, 25, 20]`
- **Input:** `calc batch max values3.json --format json`
- **Expected Output:** `Batch Math Result: 25`
- **Assertions:**
  - Result equals 25

**Test 3.4: Invalid JSON (Error Case)**
- **File (invalid.json):** Contains `{invalid json}`
- **Input:** `calc batch sum invalid.json --format json`
- **Expected Behavior:** Error message indicating invalid JSON
- **Assertions:**
  - Error is thrown
  - Error message: "Invalid JSON format"

**Test 3.5: JSON Array of Objects Without Field**
- **File (values4.json):** Contains `[{"value": 10}, {"value": 20}]`
- **Input:** `calc batch sum values4.json --format json`
- **Expected Behavior:** Error message indicating field required
- **Assertions:**
  - Error is thrown
  - Error message: "Field name required for JSON object arrays"

**Test 3.6: JSON Not an Array**
- **File (values5.json):** Contains `{"value": 10}`
- **Input:** `calc batch sum values5.json --format json`
- **Expected Behavior:** Error message indicating JSON must be an array
- **Assertions:**
  - Error is thrown
  - Error message is clear

### Test Suite 4: Edge Cases and Error Handling

**Test 4.1: Operation Not Supporting Multiple Arguments**
- **File (test.txt):** Contains `10\n20\n30`
- **Input:** `calc batch sqrt test.txt`
- **Expected Behavior:** Error message indicating operation doesn't support batch mode
- **Assertions:**
  - Error is thrown
  - Error message: "Operation 'sqrt' does not support batch mode (requires single argument)"

**Test 4.2: Relative File Path**
- **File (./data/test.txt):** Contains `10\n20\n30`
- **Input:** `calc batch sum ./data/test.txt`
- **Expected Output:** `Batch Math Result: 60`
- **Assertions:**
  - Handles relative paths correctly
  - Result equals 60

**Test 4.3: Absolute File Path**
- **File (/absolute/path/test.txt):** Contains `10\n20\n30`
- **Input:** `calc batch sum /absolute/path/test.txt`
- **Expected Output:** `Batch Math Result: 60`
- **Assertions:**
  - Handles absolute paths correctly
  - Result equals 60

**Test 4.4: Large File**
- **File (large.txt):** Contains 1000 numbers (1 to 1000)
- **Input:** `calc batch sum large.txt`
- **Expected Output:** `Batch Math Result: 500500` (sum of 1 to 1000)
- **Assertions:**
  - Handles large files efficiently
  - Result equals 500500

**Test 4.5: File with Only Whitespace**
- **File (whitespace.txt):** Contains only spaces and newlines
- **Input:** `calc batch sum whitespace.txt`
- **Expected Behavior:** Error message indicating no valid numbers
- **Assertions:**
  - Error is thrown
  - Error message is clear

**Test 4.6: Missing Format Option (Auto-detect)**
- **File (data.json):** Contains `[10, 20, 30]`
- **Input:** `calc batch sum data.json` (without --format)
- **Expected Output:** `Batch Math Result: 60` (auto-detects JSON) or error
- **Assertions:**
  - Either auto-detects format or requires format option
  - Behavior is documented

**Test 4.7: Custom Delimiter**
- **File (custom.txt):** Contains `10,20,30,40,50`
- **Input:** `calc batch sum custom.txt --delimiter ,`
- **Expected Output:** `Batch Math Result: 150`
- **Assertions:**
  - Uses custom delimiter correctly
  - Result equals 150

**Test 4.8: File with Mixed Formats**
- **File (mixed.txt):** Contains `10 20\n30 40\n50`
- **Input:** `calc batch sum mixed.txt`
- **Expected Output:** `Batch Math Result: 150`
- **Assertions:**
  - Handles mixed line formats
  - Result equals 150

## Acceptance Criteria

1. ✅ Batch operation is implemented
2. ✅ Supports plain text, CSV, and JSON formats
3. ✅ Supports file format options (--format, --column, --field, --delimiter)
4. ✅ All test scenarios pass
5. ✅ Error messages are clear and helpful
6. ✅ Help command displays batch operation syntax and examples
7. ✅ Operations handle edge cases gracefully (empty files, invalid formats, missing files)
8. ✅ File reading is efficient for large files
9. ✅ Supports both relative and absolute file paths
10. ✅ Validates that operations support batch mode (multiple arguments)
11. ✅ Handles invalid numbers in files appropriately (skip or error)

