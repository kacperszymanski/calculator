
const DEFAULT_VALUE = 0;

let currentNumber = DEFAULT_VALUE;
let previousNumber = 0;
let operationType = '';

const displayLastOperation = document.getElementById('displayLastOperation');
const displayCurrentOperation = document.getElementById('displayCurrentOperation');
const clearButton = document.getElementById('clearButton');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operationType]');
const equalButton = document.getElementById('equal');
const decimalButton = document.querySelector('[data-action="decimal"]');
const deleteButton = document.getElementById('delete');

clearButton.addEventListener('click', clearDisplay);
equalButton.addEventListener('click', calculate);
deleteButton.addEventListener('click', deleteDigit);

numberButtons.forEach(button => button.addEventListener('click', () => appendDigit(button.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', () => setOperation(button.textContent)));
decimalButton.addEventListener('click', () => appendDigit('.'));

function setOperation(operator) {
    if (operationType && previousNumber) {
        currentNumber = operate(operationType, previousNumber, currentNumber);
        displayCurrentOperation.textContent = currentNumber;
    }
    operationType = operator;
    previousNumber = currentNumber;
    currentNumber = DEFAULT_VALUE;
    displayLastOperation.textContent = `${previousNumber} ${operationType}`;
    displayCurrentOperation.textContent = DEFAULT_VALUE;
}

function operate(operator, operand1, operand2) {
    switch (operator) {
        case '+': return parseFloat(operand1) + parseFloat(operand2);
        case '-': return parseFloat(operand1) - parseFloat(operand2);
        case 'x': return parseFloat(operand1) * parseFloat(operand2);
        case '÷': return parseFloat(operand1) / parseFloat(operand2);
        default: return DEFAULT_VALUE;
    }
}

function calculate() {
    if (operationType && previousNumber) {
        const result = operate(operationType, previousNumber, currentNumber);
        displayCurrentOperation.textContent = result;
        displayLastOperation.textContent = `${previousNumber} ${operationType} ${currentNumber} = ${result}`;
        previousNumber = DEFAULT_VALUE;
        currentNumber = result;
        operationType = '';
    }
}

function appendDigit(digit) {
    if (displayCurrentOperation.textContent === '0') {
        displayCurrentOperation.textContent = '';
    }
    if (digit === '.' && currentNumber.includes('.')) {
        return;
    }
    currentNumber = displayCurrentOperation.textContent += digit;
}

function deleteDigit() {
    displayCurrentOperation.textContent = displayCurrentOperation.textContent.slice(0, -1);
    currentNumber = parseFloat(displayCurrentOperation.textContent) || DEFAULT_VALUE;
}

function clearDisplay() {
    currentNumber = DEFAULT_VALUE;
    previousNumber = DEFAULT_VALUE;
    operationType = 0;
    displayCurrentOperation.textContent = DEFAULT_VALUE;
    displayLastOperation.textContent = DEFAULT_VALUE;
}
