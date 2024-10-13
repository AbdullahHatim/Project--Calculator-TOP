let displayValue = "";

function operate(a, op, b) {
  switch (op) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "×":
      return a * b;

    case "/":
      return a / b;

    case "%":
      return a % b;
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

function showArithmetic(operator) {
  if (
    displayValue.split(" ").some((v) => {
      return ["+", "-", "×", "/", "%"].includes(v);
    })
  ) {
    const result = getResult(displayValue);
    if (Number.isNaN(+result)) setDisplay(result);
    else setDisplay(`${result} ${operator} `);
  } else {
    updateDisplay(` ${operator} `);
  }
}
function handleAthematicMessage() {
  setTimeout(() => {
    buttons.addEventListener(
      "click",
      (e) => {
        if (e.target.className == "primary") {
          setDisplay(e.target.dataset.digit);
        } else {
          clearDisplay();
        }
      },
      { once: true }
    );
  }, 1);
}

// Author Claude.ai
function formatLargeNumber(number, maxDigits = 14) {
  // Convert to string to count digits
  let numStr = Math.abs(number).toString();

  if (numStr.length <= maxDigits) {
    // If within maxDigits, return as is
    return number.toString();
  } else {
    // If more than maxDigits, use toExponential or toPrecision
    if (
      number >= 10 ** maxDigits ||
      number <= -(10 ** maxDigits) ||
      (number > 0 && number < 10 ** -(maxDigits - 1)) ||
      (number < 0 && number > -(10 ** -(maxDigits - 1)))
    ) {
      // Use scientific notation for very large or very small numbers
      return number.toExponential(maxDigits - 1); // 1 digit for integer part + (maxDigits-1) decimal places
    } else {
      // For numbers that don't need scientific notation, round to maxDigits significant digits
      return number.toPrecision(maxDigits);
    }
  }
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
  return formatLargeNumber(result, 8);
}

function calculate() {
  const operator = this.dataset.operator;

  if (["+", "-", "×", "/", "%"].includes(operator)) {
    showArithmetic.call(this, operator);
  } else if (operator === "=") {
    const result = getResult(displayValue);
    setDisplay(`${result}`);
  } else if (operator === "ac") {
    clearDisplay();
  } else if (operator === "backspace") {
    const equationArray = displayValue.split(" ");
    if (equationArray.length === 1) setDisplay(displayValue.slice(0, -1));
    else if (!!equationArray[2]) setDisplay(displayValue.slice(0, -1));
    else setDisplay(equationArray[0]);
  }
}

const digits = document.querySelectorAll(".primary");
[...digits].forEach((digit) => digit.addEventListener("click", showDigit));

const operators = document.querySelectorAll(".secondary");
[...operators].forEach((digit) => digit.addEventListener("click", calculate));

addEventListener("keydown", (e) => {
  if ("1234567890.".split("").includes(e.key)) {
    let digit = document.querySelector(`[data-digit="${e.key}"]`);
    digit.dispatchEvent(new Event("click"));
  } else if (e.key == "Enter") {
    let button = document.querySelector(`[data-operator="="]`);
    if (button) button.dispatchEvent(new Event("click"));
  } else {
    let button = document.querySelector(
      `[data-operator="${e.key.toLowerCase()}"]`
    );
    if (button) button.dispatchEvent(new Event("click"));
  }
});
