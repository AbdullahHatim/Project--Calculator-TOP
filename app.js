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
