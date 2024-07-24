$(document).ready(function() {
    let firstOperand = '';
    let secondOperand = '';
    let operator = '';
    let resultDisplayed = false;

    function updateDisplay() {
        $('.first-operand').text(firstOperand);
        $('.second-operand').text(secondOperand);
    }

    function handleNumberClick(number) {
        if (resultDisplayed) {
            firstOperand = number;
            secondOperand = '';
            resultDisplayed = false;
        } else {
            if (operator === '') {
                firstOperand += number;
            } else {
                secondOperand += number;
            }
        }
        updateDisplay();
    }

    function handleOperatorClick(op) {
        if (firstOperand !== '' && secondOperand === '') {
            operator = op;
        } else if (firstOperand !== '' && secondOperand !== '') {
            calculateAndDisplayResult();
            operator = op;
            firstOperand = $('.first-operand').text();
            secondOperand = '';
        }
        updateDisplay();
    }

    function calculateAndDisplayResult() {
        let result;
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);

        if (isNaN(num1) || isNaN(num2)) {
            return;
        }

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case 'x':
                result = num1 * num2;
                break;
            case '÷':
                if (num2 === 0) {
                    alert('Cannot divide by zero');
                    return;
                }
                result = num1 / num2;
                break;
            default:
                return;
        }

        firstOperand = result.toString();
        secondOperand = '';
        operator = '';
        resultDisplayed = true;
    }

    function clearAll() {
        firstOperand = '';
        secondOperand = '';
        operator = '';
        resultDisplayed = false;
        updateDisplay();
    }

    function deleteLastEntry() {
        if (resultDisplayed) {
            firstOperand = '';
            resultDisplayed = false;
        } else {
            if (secondOperand !== '') {
                secondOperand = secondOperand.slice(0, -1);
            } else if (operator !== '') {
                operator = '';
            } else if (firstOperand !== '') {
                firstOperand = firstOperand.slice(0, -1);
            }
        }
        updateDisplay();
    }

    $('.number').on('click', function() {
        handleNumberClick($(this).text());
    });

    $('.operator').on('click', function() {
        handleOperatorClick($(this).text());
    });

    $('.equals').on('click', function() {
        calculateAndDisplayResult();
        resultDisplayed = true;
        updateDisplay();
    });

    $('.ac').on('click', function() {
        clearAll();
    });

    $('.del').on('click', function() {
        deleteLastEntry();
    });
});

