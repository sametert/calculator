const display = document.querySelector(".calculator-input");
const keys    = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue  = false;

updateDisplay = () => {
    display.value = displayValue;
}


updateDisplay();

keys.addEventListener('click' , e => { 

    const element = e.target;
   

    if(!element.matches("button")) return;  

    // if(element.matches(".calculator-keys")) return;
    
    if(element.classList.contains('operator')) {
        // console.log("operator butonudur ", element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')) {
        // console.log("decimal butonudur ", element.value);
        inputDecimal();
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')) {
        // console.log("clear butonudur ", element.value);
        clear();
        updateDisplay();
        return;
    }

    // console.log("number butonudur " , element.value);

    inputNumber(element.value);
    updateDisplay();
    

});


handleOperator = nextOperator => {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if(firstValue === null) {
        firstValue = value;
    }else if(operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue   = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
    console.log(displayValue , firstValue , operator , waitingForSecondValue);
}


calculate = (first,second,operator) => {
    if(operator === "+") {
        return first + second;
    } else if (operator === "-") {
        return first - second;
    }else if(operator === "*") {
        return first * second;
    }else if(operator === "/") {
        return first / second;
    }

    return second;
}


inputNumber = num => {
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num: displayValue + num;
    }
    console.log(displayValue , firstValue , operator , waitingForSecondValue);
    
};


inputDecimal = () => {
    if(!displayValue.includes(".")) {
        displayValue += ".";
    }
};


clear = () => {
    displayValue = "0";
};


