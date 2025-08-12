let num1 = 60;
let num2 = 2;
let operator = "+";

var output = operator == "+" ? num1 + num2 
            : operator == "-" ? num1 - num2
            : operator == "*" ? num1 * num2
            : operator == "/" ? num1 / num2
            : operator == "%" ? num1 % num2
            : "Invalid Operator...";

console.log(`Your calculation is : ${output}`);
