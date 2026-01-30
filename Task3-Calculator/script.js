// State variables to track the current calculation
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

const currentOperandText = document.getElementById('current-operand');
const previousOperandText = document.getElementById('previous-operand');

/**
 * Appends a number or decimal to the display
 */
function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number.toString();
        shouldResetScreen = false;
    } else {
        // Prevent multiple decimals
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number.toString();
    }
    updateDisplay();
}

/**
 * Clears the entire display and resets state
 */
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

/**
 * Deletes the last character entered
 */
function deleteNumber() {
    if (currentInput === '0') return;
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

/**
 * Sets the operation (e.g., +, -, ×, ÷, ^)
 */
function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        compute();
    }
    operation = op;
    previousInput = currentInput;
    shouldResetScreen = true;
    updateDisplay();
}

/**
 * Handles single-number operations (Square Root, Percent)
 */
function calculateSpecial(type) {
    let result;
    const current = parseFloat(currentInput);
    if (isNaN(current)) return;

    switch (type) {
        case 'sqrt':
            result = Math.sqrt(current);
            break;
        case 'percent':
            result = current / 100;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

/**
 * Performs the actual math for standard operations
 */
function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = (current === 0) ? "Error" : prev / current;
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operation = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

/**
 * Updates the HTML elements to match the current state
 */
function updateDisplay() {
    currentOperandText.innerText = currentInput;
    if (operation != null) {
        previousOperandText.innerText = `${previousInput} ${operation}`;
    } else {
        previousOperandText.innerText = '';
    }
}