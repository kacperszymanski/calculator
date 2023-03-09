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
document.addEventListener('keydown', handleKeyDown);

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
        case '÷': 
            if (parseFloat(operand2) === 0) {
                return 'ERROR';
            }
            return parseFloat(operand1) / parseFloat(operand2);
        default: return DEFAULT_VALUE;
    }
}


function calculate() {
    if (operationType && previousNumber) {
        const result = operate(operationType, previousNumber, currentNumber);
        if (result === 'ERROR') {
            displayCurrentOperation.textContent = 'ERROR';
            displayLastOperation.textContent = `${previousNumber} ${operationType} ${currentNumber} = ERROR`;
        } else {
            displayCurrentOperation.textContent = result;
            displayLastOperation.textContent = `${previousNumber} ${operationType} ${currentNumber} = ${result}`;
        }
        previousNumber = DEFAULT_VALUE;
        currentNumber = result;
        operationType = '';
    }
}

function appendDigit(digit) {
    if (displayCurrentOperation.textContent === '0' && digit !== '.') {
        displayCurrentOperation.textContent = '';
    }
    if (digit === '.' && !displayCurrentOperation.textContent.includes('.')) {
        if (displayCurrentOperation.textContent === '') {
            displayCurrentOperation.textContent = '0';
        }
        displayCurrentOperation.textContent += digit;
    } else {
        displayCurrentOperation.textContent += digit;
    }
    currentNumber = parseFloat(displayCurrentOperation.textContent) || DEFAULT_VALUE;
}

function deleteDigit() {
    if (displayCurrentOperation.textContent.length <= 1) {
        displayCurrentOperation.textContent = DEFAULT_VALUE;
        currentNumber = DEFAULT_VALUE;
    } else {
        displayCurrentOperation.textContent = displayCurrentOperation.textContent.slice(0, -1);
        currentNumber = parseFloat(displayCurrentOperation.textContent) || DEFAULT_VALUE;
    }
}

function clearDisplay() {
    currentNumber = DEFAULT_VALUE;
    previousNumber = DEFAULT_VALUE;
    operationType = 0;
    displayCurrentOperation.textContent = DEFAULT_VALUE;
    displayLastOperation.textContent = DEFAULT_VALUE;
}

function handleKeyDown(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendDigit(key);
    } else if (key === '.') {
        appendDigit('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperation(convertOperatorSymbol(key));
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteDigit();
    } else if (key === 'Delete') {
        clearDisplay();
    }
}

function convertOperatorSymbol(key) {
    switch (key) {
        case '+':
            return '+';
        case '-':
            return '-';
        case '*':
            return 'x';
        case '/':
            return '÷';
        default:
            return '';
    }
}
  document.addEventListener('keydown', handleKeyDown);
  
