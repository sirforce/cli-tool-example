/**
 * Expression Evaluator
 * Safely parses and evaluates mathematical expressions without using eval()
 */

// Token types
enum TokenType {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  FUNCTION = 'FUNCTION',
  CONSTANT = 'CONSTANT',
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  COMMA = 'COMMA',
}

interface Token {
  type: TokenType;
  value: string | number;
}

// Supported functions
const UNARY_FUNCTIONS = new Set(['sqrt', 'abs', 'sin', 'cos', 'tan', 'log', 'log10', 'ceil', 'floor', 'round']);
const VARIADIC_FUNCTIONS = new Set(['max', 'min']);

// Constants
const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  π: Math.PI,
  e: Math.E,
};

// Operator precedence (higher number = higher precedence)
const PRECEDENCE: Record<string, number> = {
  '^': 4,
  '**': 4,
  '*': 3,
  '/': 3,
  '%': 3,
  '+': 2,
  '-': 2,
};

/**
 * Tokenize the expression string
 */
function tokenize(expression: string): Token[] {
  if (!expression || expression.trim() === '') {
    throw new Error('Empty expression');
  }

  const tokens: Token[] = [];
  let i = 0;
  const len = expression.length;

  while (i < len) {
    const char = expression[i];

    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Numbers (including decimals and scientific notation)
    if (/\d/.test(char) || char === '.') {
      let numStr = '';
      
      // Parse number
      while (i < len) {
        const currentChar = expression[i];
        if (/\d/.test(currentChar) || currentChar === '.') {
          numStr += currentChar;
          i++;
        } else if ((currentChar === 'e' || currentChar === 'E') && i + 1 < len) {
          // Handle scientific notation
          numStr += currentChar;
          i++;
          if (i < len && (expression[i] === '+' || expression[i] === '-')) {
            numStr += expression[i];
            i++;
          }
        } else {
          break;
        }
      }

      // Validate number format (no multiple decimal points)
      const decimalCount = (numStr.match(/\./g) || []).length;
      if (decimalCount > 1) {
        throw new Error(`Invalid number format: ${numStr}`);
      }

      const num = parseFloat(numStr);
      if (isNaN(num)) {
        throw new Error(`Invalid number format: ${numStr}`);
      }
      tokens.push({ type: TokenType.NUMBER, value: num });
      continue;
    }

    // Operators
    if (char === '+' || char === '/' || char === '%' || char === '^') {
      tokens.push({ type: TokenType.OPERATOR, value: char });
      i++;
      continue;
    }

    // Exponentiation operator **
    if (char === '*' && i + 1 < len && expression[i + 1] === '*') {
      tokens.push({ type: TokenType.OPERATOR, value: '**' });
      i += 2;
      continue;
    }

    // Multiplication operator *
    if (char === '*') {
      tokens.push({ type: TokenType.OPERATOR, value: '*' });
      i++;
      continue;
    }

    // Subtraction operator (unary minus handled in parser)
    if (char === '-') {
      tokens.push({ type: TokenType.OPERATOR, value: '-' });
      i++;
      continue;
    }

    // Parentheses
    if (char === '(') {
      tokens.push({ type: TokenType.LPAREN, value: '(' });
      i++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: TokenType.RPAREN, value: ')' });
      i++;
      continue;
    }

    // Comma
    if (char === ',') {
      tokens.push({ type: TokenType.COMMA, value: ',' });
      i++;
      continue;
    }

    // Functions and constants (identifiers)
    if (/[a-zA-Zπ]/.test(char)) {
      let ident = '';
      while (i < len && /[a-zA-Z0-9π]/.test(expression[i])) {
        ident += expression[i];
        i++;
      }

      // Check if it's a constant
      if (ident in CONSTANTS) {
        tokens.push({ type: TokenType.CONSTANT, value: ident });
      } else if (UNARY_FUNCTIONS.has(ident) || VARIADIC_FUNCTIONS.has(ident)) {
        tokens.push({ type: TokenType.FUNCTION, value: ident });
      } else {
        throw new Error(`Unknown function or constant: ${ident}`);
      }
      continue;
    }

    // Invalid character
    throw new Error(`Invalid character: ${char}`);
  }

  return tokens;
}

/**
 * Evaluate a function call
 */
function evaluateFunction(funcName: string, args: number[]): number {
  if (UNARY_FUNCTIONS.has(funcName)) {
    if (args.length !== 1) {
      throw new Error(`Wrong number of arguments: Function ${funcName} expects 1 argument, got ${args.length}`);
    }
    const x = args[0];

    switch (funcName) {
      case 'sqrt':
        if (x < 0) {
          throw new Error('Square root of negative number is not allowed');
        }
        return Math.sqrt(x);
      case 'abs':
        return Math.abs(x);
      case 'sin':
        return Math.sin(x);
      case 'cos':
        return Math.cos(x);
      case 'tan':
        return Math.tan(x);
      case 'log':
        if (x <= 0) {
          throw new Error('Logarithm of zero or negative number is not allowed');
        }
        return Math.log(x);
      case 'log10':
        if (x <= 0) {
          throw new Error('Logarithm of zero or negative number is not allowed');
        }
        return Math.log10(x);
      case 'ceil':
        return Math.ceil(x);
      case 'floor':
        return Math.floor(x);
      case 'round':
        return Math.round(x);
      default:
        throw new Error(`Unknown unary function: ${funcName}`);
    }
  } else if (VARIADIC_FUNCTIONS.has(funcName)) {
    if (args.length < 1) {
      throw new Error(`Function ${funcName} expects at least 1 argument, got ${args.length}`);
    }
    switch (funcName) {
      case 'max':
        return Math.max(...args);
      case 'min':
        return Math.min(...args);
      default:
        throw new Error(`Unknown variadic function: ${funcName}`);
    }
  } else {
    throw new Error(`Unknown function: ${funcName}`);
  }
}

/**
 * Parser state
 */
class Parser {
  tokens: Token[];
  index: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.index = 0;
  }

  current(): Token | null {
    return this.index < this.tokens.length ? this.tokens[this.index] : null;
  }

  advance(): void {
    this.index++;
  }

  expect(type: TokenType): Token {
    const token = this.current();
    if (!token || token.type !== type) {
      throw new Error(`Expected ${type}, got ${token?.type || 'EOF'}`);
    }
    this.advance();
    return token;
  }

  /**
   * Parse expression with operator precedence
   */
  parseExpression(): number {
    return this.parseAdditive();
  }

  /**
   * Parse additive expressions (+, -)
   */
  parseAdditive(): number {
    let left = this.parseMultiplicative();

    while (this.current() && 
           this.current()!.type === TokenType.OPERATOR && 
           (this.current()!.value === '+' || this.current()!.value === '-')) {
      const op = this.current()!.value as string;
      this.advance();
      const right = this.parseMultiplicative();
      
      if (op === '+') {
        left = left + right;
      } else {
        left = left - right;
      }
    }

    return left;
  }

  /**
   * Parse multiplicative expressions (*, /, %)
   */
  parseMultiplicative(): number {
    let left = this.parseExponentiation();

    while (this.current() && 
           this.current()!.type === TokenType.OPERATOR && 
           (this.current()!.value === '*' || this.current()!.value === '/' || this.current()!.value === '%')) {
      const op = this.current()!.value as string;
      this.advance();
      const right = this.parseExponentiation();
      
      if (op === '*') {
        left = left * right;
      } else if (op === '/') {
        if (right === 0) {
          throw new Error('Division by zero is not allowed');
        }
        left = left / right;
      } else {
        left = left % right;
      }
    }

    return left;
  }

  /**
   * Parse exponentiation expressions (^, **) - right-associative
   */
  parseExponentiation(): number {
    let left = this.parseUnary();

    if (this.current() && 
        this.current()!.type === TokenType.OPERATOR && 
        (this.current()!.value === '^' || this.current()!.value === '**')) {
      this.advance();
      // Right-associative: a^b^c = a^(b^c)
      const right = this.parseExponentiation();
      return Math.pow(left, right);
    }

    return left;
  }

  /**
   * Parse unary expressions and primary expressions
   */
  parseUnary(): number {
    const token = this.current();
    if (!token) {
      throw new Error('Invalid expression: missing operand');
    }

    // Unary minus
    if (token.type === TokenType.OPERATOR && token.value === '-') {
      this.advance();
      return -this.parseUnary();
    }

    return this.parsePrimary();
  }

  /**
   * Parse primary expressions (numbers, constants, functions, parentheses)
   */
  parsePrimary(): number {
    const token = this.current();
    if (!token) {
      throw new Error('Invalid expression: missing operand');
    }

    // Number
    if (token.type === TokenType.NUMBER) {
      this.advance();
      return token.value as number;
    }

    // Constant
    if (token.type === TokenType.CONSTANT) {
      this.advance();
      return CONSTANTS[token.value as string];
    }

    // Function call
    if (token.type === TokenType.FUNCTION) {
      const funcName = token.value as string;
      this.advance();
      const { args } = this.parseFunctionArguments();
      return evaluateFunction(funcName, args);
    }

    // Parentheses
    if (token.type === TokenType.LPAREN) {
      this.advance();
      const value = this.parseExpression();
      this.expect(TokenType.RPAREN);
      return value;
    }

    throw new Error(`Unexpected token: ${token.type} ${token.value}`);
  }

  /**
   * Parse function arguments
   */
  parseFunctionArguments(): { args: number[] } {
    const args: number[] = [];
    
    this.expect(TokenType.LPAREN);

    // Handle empty arguments
    if (this.current() && this.current()!.type === TokenType.RPAREN) {
      this.advance();
      return { args };
    }

    // Parse first argument
    args.push(this.parseExpression());

    // Parse remaining arguments
    while (this.current() && this.current()!.type === TokenType.COMMA) {
      this.advance();
      args.push(this.parseExpression());
    }

    this.expect(TokenType.RPAREN);
    return { args };
  }
}

/**
 * Evaluate tokens using recursive descent parser with operator precedence
 */
function evaluateTokens(tokens: Token[]): number {
  if (tokens.length === 0) {
    throw new Error('Empty expression');
  }

  // Check for unmatched parentheses
  let parenCount = 0;
  for (const token of tokens) {
    if (token.type === TokenType.LPAREN) parenCount++;
    if (token.type === TokenType.RPAREN) parenCount--;
    if (parenCount < 0) {
      throw new Error('Unmatched parentheses in expression');
    }
  }
  if (parenCount !== 0) {
    throw new Error('Unmatched parentheses in expression');
  }

  const parser = new Parser(tokens);
  const result = parser.parseExpression();
  
  // Ensure we consumed all tokens
  if (parser.index < tokens.length) {
    throw new Error('Unexpected tokens at end of expression');
  }

  return result;
}

/**
 * Main function to evaluate an expression string
 */
export function evaluateExpression(expression: string): number {
  const tokens = tokenize(expression);
  return evaluateTokens(tokens);
}

