// переменные состояния калькулятора 
let runningTotal = 0;
let buffer = "0";
let previousOperator; 

// считывание входных данных
const screen = document.querySelector('.screen');

// обработка нажатия кнопки
function buttonClick (value) {
    if (isNaN (value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

// обоработка нажатия символьных кнопок
function handleSymbol (symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        
        case '=':
            if (previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

        case '←':
            if (buffer.length == 1) {
                buffer = '0'; 
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        // математические операции
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath (symbol);
            break;
    }
}

// обработка мат операций
function handleMath (symbol) { 
    if (buffer === '0') { // ничего не введено - игнор
        return;
    }

    const intBuffer = parseInt(buffer);

    // промежуточный результат 
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation (intBuffer);
    }

    previousOperator = symbol; // сохранение операции 
    buffer = '0';
}

// выполнение мат функций 
function flushOperation (intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    } 
}

// обработка нажатия (вывод на экран)
function handleNumber (numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

// инициализируем калькулятор
function init () {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
}

init(); 