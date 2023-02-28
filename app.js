
const DEFAULT_VALUE = 0

let firstValue = DEFAULT_VALUE
let secondValue = ''
let operator = ''

const displayLastOperation = document.getElementById('displayLastOperation')
const displayCurrentOperation = document.getElementById('displayCurrentOperation')
const clear = document.getElementById('clear')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')


clear.onclick = () => clearDisplay()



numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

function setOperation(operation) {
    operator = operation
}


// firstValue = document.getElementById('displayCurrentOperation').textContent
// if (operation === '+') {
//     displayLastOperation.textContent = `${firstValue} ${operation}`


function operate(operation, firstValue, secondValue) { }

function appendNumber(number) {
    if (displayCurrentOperation.textContent === '0') {
        displayCurrentOperation.textContent = ''
    }
    displayCurrentOperation.textContent += number
}


function clearDisplay() {
    firstValue = DEFAULT_VALUE
    displayCurrentOperation.textContent = DEFAULT_VALUE
}

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

window.onload = () => {

}