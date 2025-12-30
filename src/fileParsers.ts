import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

/**
 * Parse a plain text file and extract numbers
 * Supports one number per line or delimiter-separated values
 */
export function parseTextFile(filePath: string, delimiter: string = ' '): number[] {
  const resolvedPath = resolve(filePath);
  
  if (!existsSync(resolvedPath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = readFileSync(resolvedPath, 'utf-8');
  const numbers: number[] = [];
  
  // Split by newlines first, then by delimiter
  const lines = content.split(/\r?\n/);
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue; // Skip empty lines
    }
    
    // Split by delimiter (default is whitespace)
    const parts = delimiter === ' ' 
      ? trimmedLine.split(/\s+/) 
      : trimmedLine.split(delimiter);
    
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (!trimmedPart) {
        continue;
      }
      
      const num = parseFloat(trimmedPart);
      if (!isNaN(num) && isFinite(num)) {
        numbers.push(num);
      }
      // Skip invalid numbers silently (as per spec decision)
    }
  }
  
  if (numbers.length === 0) {
    throw new Error('File contains no valid numbers');
  }
  
  return numbers;
}

/**
 * Parse a CSV file and extract numbers from a specific column
 */
export function parseCsvFile(filePath: string, column?: string | number): number[] {
  const resolvedPath = resolve(filePath);
  
  if (!existsSync(resolvedPath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = readFileSync(resolvedPath, 'utf-8');
  const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    throw new Error('File contains no valid numbers');
  }
  
  const numbers: number[] = [];
  let columnIndex: number | null = null;
  let startRow = 0;
  
  // Parse header row
  const headerRow = lines[0].split(',').map(c => c.trim());
  
  if (column === undefined) {
    // Auto-detect first numeric column
    for (let i = 0; i < headerRow.length; i++) {
      const firstDataRow = lines[1]?.split(',').map(c => c.trim())[i];
      if (firstDataRow && !isNaN(parseFloat(firstDataRow)) && isFinite(parseFloat(firstDataRow))) {
        columnIndex = i;
        startRow = 1; // Skip header
        break;
      }
    }
    
    // If no numeric column found in header, try first column
    if (columnIndex === null) {
      columnIndex = 0;
      startRow = 0; // No header to skip
    }
  } else if (typeof column === 'number') {
    // Column index specified
    columnIndex = column;
    startRow = 0; // Assume no header if index is specified
  } else {
    // Column name specified
    columnIndex = headerRow.indexOf(column);
    if (columnIndex === -1) {
      throw new Error(`Column "${column}" not found in CSV file`);
    }
    startRow = 1; // Skip header row
  }
  
  if (columnIndex === null || columnIndex < 0) {
    throw new Error(`Invalid column index: ${columnIndex}`);
  }
  
  // Parse data rows
  for (let i = startRow; i < lines.length; i++) {
    const row = lines[i].split(',').map(c => c.trim());
    
    if (columnIndex >= row.length) {
      throw new Error(`Column index ${columnIndex} is out of range (row has ${row.length} columns)`);
    }
    
    const value = row[columnIndex];
    const num = parseFloat(value);
    
    if (!isNaN(num) && isFinite(num)) {
      numbers.push(num);
    }
    // Skip non-numeric values silently (as per spec decision)
  }
  
  if (numbers.length === 0) {
    throw new Error('File contains no valid numbers');
  }
  
  return numbers;
}

/**
 * Parse a JSON file and extract numbers
 * Supports array of numbers or array of objects with numeric fields
 */
export function parseJsonFile(filePath: string, field?: string): number[] {
  const resolvedPath = resolve(filePath);
  
  if (!existsSync(resolvedPath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = readFileSync(resolvedPath, 'utf-8');
  
  let jsonData: any;
  try {
    jsonData = JSON.parse(content);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
  
  if (!Array.isArray(jsonData)) {
    throw new Error('JSON must be an array');
  }
  
  const numbers: number[] = [];
  
  if (jsonData.length === 0) {
    throw new Error('File contains no valid numbers');
  }
  
  // Check if first element is an object
  const isObjectArray = jsonData.length > 0 && typeof jsonData[0] === 'object' && jsonData[0] !== null && !Array.isArray(jsonData[0]);
  
  if (isObjectArray) {
    if (!field) {
      throw new Error('Field name required for JSON object arrays');
    }
    
    for (const item of jsonData) {
      if (item && typeof item === 'object' && field in item) {
        const value = item[field];
        const num = parseFloat(value);
        if (!isNaN(num) && isFinite(num)) {
          numbers.push(num);
        }
      }
    }
  } else {
    // Array of numbers
    for (const item of jsonData) {
      const num = parseFloat(item);
      if (!isNaN(num) && isFinite(num)) {
        numbers.push(num);
      }
    }
  }
  
  if (numbers.length === 0) {
    throw new Error('File contains no valid numbers');
  }
  
  return numbers;
}

/**
 * Detect file format based on file extension
 */
export function detectFileFormat(filePath: string): 'text' | 'csv' | 'json' {
  const lowerPath = filePath.toLowerCase();
  
  if (lowerPath.endsWith('.csv')) {
    return 'csv';
  }
  
  if (lowerPath.endsWith('.json')) {
    return 'json';
  }
  
  return 'text';
}

