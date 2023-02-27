
let displayValue = 0

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, firstNum, secondNum) {
    if (operator === 'add') { add(firstNum, secondNum) }
    else if (operator === 'substract') { substract(firstNum, secondNum) }
    else if (operator === 'multiply') { multiply(firstNum, secondNum) }
    else if (operator === 'divide') { divide(firstNum, secondNum) }
}