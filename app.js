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
    console.log(eval(`${displayValue}`));
    displayValue = `${eval(`${displayValue}`)} ${operator} `;
    display.textContent = displayValue;
  } else {
    displayValue += ` ${operator} `;
    display.textContent = displayValue;
  }
}

function calculate() {
  const operator = this.dataset.operator;
  switch (operator) {
    case "+":
    case "-":
    case "*":
    case "/":
      showArithmetic.call(this, operator);
      break;

    case "=":
      console.log(eval(`${displayValue}`));
      break;
    case "ac":
      displayValue = "";
      display.textContent = "";
      break;
  }
}

const operators = document.querySelectorAll(".buttons .secondary");
[...operators].forEach((digit) => digit.addEventListener("click", calculate));
