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
function showDigit() {
  displayValue += this.dataset.digit;
  display.textContent = displayValue;
}
const digits = document.querySelectorAll(".buttons .primary");
[...digits].forEach((digit) => digit.addEventListener("click", showDigit));

function showArithmetic(operator) {
  if (
    displayValue.split(" ").some((v) => {
      return ["+", "-", "*", "/"].includes(v);
    })
  ) {
    const result = getResult(displayValue);
    displayValue = `${result} ${operator} `;
    display.textContent = displayValue;
  } else {
    displayValue += ` ${operator} `;
    display.textContent = displayValue;
  }
}
function getResult(str = "") {
  if (!str.includes(" ")) {
    str = `${str} + `;
  }
  const equationArray = str.split(" ");
  const a = equationArray[0];
  const op = equationArray[1];
  const b = equationArray[2];

  if (op == "/" && !+b) return "DIVIDE BY 0 WHY?";
  return operate(+a, op, +b);
}
function calculate() {
  const operator = this.dataset.operator;

  if (["+", "-", "*", "/"].includes(operator)) {
    showArithmetic.call(this, operator);
  } else if (operator === "=") {
    const result = getResult(displayValue);
    displayValue = `${result}`;
    display.textContent = displayValue;
  } else if (operator === "ac") {
    displayValue = "";
    display.textContent = "";
  }
}

const operators = document.querySelectorAll(".buttons .secondary");
[...operators].forEach((digit) => digit.addEventListener("click", calculate));
