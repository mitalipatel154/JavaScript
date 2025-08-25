function toDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculate() {
    let exp = display.value;
    let num = "";
    let result = 0;
    let operator = "+";

    for (let i = 0; i < exp.length; i++) {
        let char = exp[i];   

        if (/[0-9]/.test(char) || char === ".") {
            num += char;   
        } 
        else {  
            let number = Number(num);  

            if (operator === "+")
                result = result + number;
            else if (operator === "-") 
                result = result - number;
            else if (operator === "*") 
                result = result * number;
            else if (operator === "/")
                result = result / number;
            else if (operator === "%") 
                result = result % number; 

            operator = char; 
            num = "";       
        }
    }

    if (num !== "") {
        let number = Number(num);
        if (operator === "+") 
            result = result + number;
        else if (operator === "-") 
            result = result - number;
        else if (operator === "*") 
            result = result * number;
        else if (operator === "/") 
            result = result / number;
        else if (operator === "%") 
            result = result % number;
    }

    display.value = result;
}



function calculateSquare() {
    let num = document.getElementById("display").value;
    let result = num * num;
    console.log(`Square of ${num} = ${result}`);
    document.getElementById("display").value = result;
}


function calculateCube() {
    let num = document.getElementById("display").value;
    let result = num * num * num;
    console.log(`Cube of ${num} = ${result}`);
    document.getElementById("display").value = result;
}


function calculateFactorial() {
    let num = Number(document.getElementById("display").value);
    function fact(n) {
        return (n === 0 || n === 1) ? 1 : n * fact(n - 1);
    }
    let result = fact(num);
    console.log(`Factorial of ${num} = ${result}`);
    document.getElementById("display").value = result;
}

function checkEvenOdd() {
    let num = Number(document.getElementById("display").value);
    let result = (num % 2 === 0) ? "Even" : "Odd";
    console.log(`${num} is ${result}`);
    document.getElementById("display").value = result;
}
