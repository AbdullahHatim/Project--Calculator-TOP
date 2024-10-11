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

function setDisplay(str) {
  displayValue = str;
  display.textContent = displayValue;
}
function updateDisplay(str) {
  displayValue += str;
  display.textContent = displayValue;
}
function clearDisplay() {
  displayValue = "";
  display.textContent = "";
}

function showDigit() {
  updateDisplay(this.dataset.digit);
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
    setDisplay(`${result} ${operator} `);
  } else {
    updateDisplay(` ${operator} `);
  }
}
function handleAthematicMessage() {
  const buttons = document.querySelector(".buttons");
  setTimeout(() => {
    buttons.addEventListener(
      "click",
      (e) => {
        console.log(e.target.className);
        if (e.target.className == ".primary") {
          setDisplay(e.target.dataset.digit);
        } else {
          clearDisplay();
        }
      },
      { once: true }
    );
  }, 1);
}

function getResult(str = "") {
  if (!str.includes(" ")) {
    str = `${str} + `;
  }
  const equationArray = str.split(" ");
  const [a, op, b] = [...equationArray];

  if (op == "/" && !+b) {
    handleAthematicMessage();
    return "DIVIDE BY 0 WHY?";
  }
  const result = operate(+a, op, +b);
  if (Number.isNaN(result)) {
    handleAthematicMessage();
    return "Wrong Input";
  }
  return result;
}
function calculate() {
  const operator = this.dataset.operator;

  if (["+", "-", "*", "/"].includes(operator)) {
    showArithmetic.call(this, operator);
  } else if (operator === "=") {
    const result = getResult(displayValue);
    setDisplay(`${result}`);
  } else if (operator === "ac") {
    clearDisplay();
  }
}

const operators = document.querySelectorAll(".buttons .secondary");
[...operators].forEach((digit) => digit.addEventListener("click", calculate));
