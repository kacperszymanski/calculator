
const DEFAULT_VALUE = 0


let currentNumber = DEFAULT_VALUE
let previousNumber = 0
let operationType = ''


const displayLastOperation = document.getElementById('displayLastOperation')
const displayCurrentOperation = document.getElementById('displayCurrentOperation')
const clear = document.getElementById('clear')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operationType]')
const equalButton = document.getElementById('equal')
const decimalButton = document.querySelector('[data-action="decimal"]')
const deleteButton = document.getElementById('delete');


clear.onclick = () => clearDisplay()
equalButton.onclick = () => equal()
deleteButton.onclick = () => deleteNumber()

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

decimalButton.addEventListener('click', () => {
    appendNumber('.')
})

function setOperation(operation) {
    
    if (operationType && previousNumber) {
        currentNumber = operate(operationType, currentNumber, previousNumber);

        displayCurrentOperation.textContent = currentNumber;
    }

    operationType = operation;
    previousNumber = currentNumber;
    currentNumber = DEFAULT_VALUE;

    displayLastOperation.textContent = `${previousNumber} ${operationType}`;

    displayCurrentOperation.textContent = DEFAULT_VALUE;
}


function operate(operationType, currentNumber, previousNumber) {
    if (operationType === '+') {
        return parseFloat(previousNumber) + parseFloat(currentNumber); 
    }
    else if (operationType === '-') {
        return parseFloat(previousNumber) - parseFloat(currentNumber);
    }
    else if (operationType === 'x') {
        return parseFloat(previousNumber) * parseFloat(currentNumber);
    }
    else if (operationType === '÷') {
        return parseFloat(previousNumber) / parseFloat(currentNumber);
    }

    else {
        return DEFAULT_VALUE;
    }
}

function equal() {
    if (operationType && previousNumber) {
        const result = operate(operationType, currentNumber, previousNumber);
        displayCurrentOperation.textContent = result;
        displayLastOperation.textContent = `${previousNumber} ${operationType} ${currentNumber} = ${result}`;
        currentNumber = result;
        previousNumber = 0;
        operationType = '';
    }
}


function appendNumber(number) {
    if (displayCurrentOperation.textContent === '0') {
        displayCurrentOperation.textContent = ''
    }

    // If the current number already contains a decimal point, don't add another one
    if (number === '.' && currentNumber.includes('.')) {
        return
    }

    currentNumber = displayCurrentOperation.textContent += number
}

function deleteNumber() {
    const currentText = displayCurrentOperation.textContent;
    displayCurrentOperation.textContent = currentText.slice(0, -1);
    currentNumber = parseInt(displayCurrentOperation.textContent) || 0;
  }

function clearDisplay() {

    currentNumber = DEFAULT_VALUE
    previousNumber = DEFAULT_VALUE

    displayCurrentOperation.textContent = DEFAULT_VALUE
    displayLastOperation.textContent = DEFAULT_VALUE
}


//////////////////////////
// const DEFAULT_VALUE = 0;

// let currentNumber = DEFAULT_VALUE;
// let previousNumber = 0;
// let operationType = '';

// const displayLastOperation = document.getElementById('displayLastOperation');
// const displayCurrentOperation = document.getElementById('displayCurrentOperation');
// const clearButton = document.getElementById('clear');
// const numberButtons = document.querySelectorAll('[data-number]');
// const operatorButtons = document.querySelectorAll('[data-operation]');
// const equalButton = document.getElementById('equal');
// const decimalButton = document.querySelector('[data-action="decimal"]');
// const deleteButton = document.getElementById('delete');

// clearButton.addEventListener('click', clearDisplay);
// equalButton.addEventListener('click', calculate);
// deleteButton.addEventListener('click', deleteDigit);

// numberButtons.forEach(button => button.addEventListener('click', () => appendDigit(button.textContent)));
// operatorButtons.forEach(button => button.addEventListener('click', () => setOperation(button.textContent)));
// decimalButton.addEventListener('click', () => appendDigit('.'));

// function setOperation(operator) {
//   if (operationType && previousNumber) {
//     currentNumber = operate(operationType, previousNumber, currentNumber);
//     displayCurrentOperation.textContent = currentNumber;
//   }
//   operationType = operator;
//   previousNumber = currentNumber;
//   currentNumber = DEFAULT_VALUE;
//   displayLastOperation.textContent = `${previousNumber} ${operationType}`;
//   displayCurrentOperation.textContent = DEFAULT_VALUE;
// }

// function operate(operator, operand1, operand2) {
//   switch (operator) {
//     case '+': return parseFloat(operand1) + parseFloat(operand2);
//     case '-': return parseFloat(operand1) - parseFloat(operand2);
//     case 'x': return parseFloat(operand1) * parseFloat(operand2);
//     case '÷': return parseFloat(operand1) / parseFloat(operand2);
//     default: return DEFAULT_VALUE;
//   }
// }

// function calculate() {
//   if (operationType && previousNumber) {
//     const result = operate(operationType, previousNumber, currentNumber);
//     displayCurrentOperation.textContent = result;
//     displayLastOperation.textContent = `${previousNumber} ${operationType} ${currentNumber} = ${result}`;
//     previousNumber = DEFAULT_VALUE;
//     currentNumber = result;
//     operationType = '';
//   }
// }

// function appendDigit(digit) {
//   if (displayCurrentOperation.textContent === '0') {
//     displayCurrentOperation.textContent = '';
//   }
//   if (digit === '.' && currentNumber.includes('.')) {
//     return;
//   }
//   currentNumber = displayCurrentOperation.textContent += digit;
// }

// function deleteDigit() {
//   displayCurrentOperation.textContent = displayCurrentOperation.textContent.slice(0, -1);
//   currentNumber = parseFloat(displayCurrentOperation.textContent) || DEFAULT_VALUE;
// }

// function clearDisplay() {
//   currentNumber = DEFAULT_VALUE;
//   previousNumber = DEFAULT_VALUE;
//   operationType = '';
//   displayCurrentOperation.textContent = DEFAULT_VALUE;
//   displayLastOperation.textContent = DEFAULT_VALUE;
// }
// The main changes are:

// Renamed some variables and elements for clarity and consistency.
// Used addEventListener() instead of onclick for better separation of concerns.
// Replaced parseInt() with parseFloat() to support decimal numbers.
// Used a switch statement instead of multiple if-else statements in the operate() function.
// Moved some statements around to simplify the code and avoid unnecessary assignments.
// Added some semicolons for good measure.
// Removed unnecessary DEFAULT_VALUE assignments in some functions.
// Used single quotes for string literals for consistency.