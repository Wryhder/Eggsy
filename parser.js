function parseExpression(program) {
  program = skipSpaceAndComments(program);

  let match, expr;

  /* Constructs a different data structure depending
  * on what is matched - strings, numbers, or words
  */
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = { type: "value", value: match[1] };
  } else if (match = /^\d+\b/.exec(program)) {
    expr = { type: "value", value: Number(match[0]) };
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = { type: "word", name: match[0] };
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

// Skip leading space and comments
function skipSpaceAndComments(string) {
  let firstNonWhiteSpaceChar = string.search(/\S/);
  let comments = /(#.*\s)+/.exec(string);

  if (firstNonWhiteSpaceChar == -1) return "";

  if (comments) {
    string = string.slice(firstNonWhiteSpaceChar);
    string = string.replace(comments[0], '');
  } else {
    string = string.slice(firstNonWhiteSpaceChar);
  }

  return string;
}

function parseApply(expr, program) {
  program = skipSpaceAndComments(program);

  if (program[0] != "(") {
    return { expr: expr, rest: program };
  }

  program = skipSpaceAndComments(program.slice(1));
  expr = { type: "apply", operator: expr, args: [] };

  while (program[0] != ")") {
    let arg = parseExpression(program);

    expr.args.push(arg.expr);

    program = skipSpaceAndComments(arg.rest);

    if (program[0] == ",") {
      program = skipSpaceAndComments(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  return parseApply(expr, program.slice(1));
}

export default function parse(program) {
  let {expr, rest} = parseExpression(program);

  if (skipSpaceAndComments(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}
