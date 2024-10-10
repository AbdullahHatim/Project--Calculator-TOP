let firstOperand = 0;
let operator = "+";
let secondOperand = 0;
let displayValue = "";

function add() {
  return [...arguments].reduce((tot, curr) => tot + curr);
}
function subtract() {
  return [...arguments].reduce((tot, curr) => tot - curr);
}
function multiply() {
  return [...arguments].reduce((tot, curr) => tot * curr);
}
function divide() {
  return [...arguments].reduce((tot, curr) => tot / curr);
}

function operate(a, op, b) {
  switch (op) {
    case "+":
      return add(a, b);

    case "-":
      return subtract(a, b);

    case "*":
      return multiply(a, b);

    case "/":
      return divide(a, b);

    default:
      return "Invalid Arguments";
  }
}
