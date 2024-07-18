const buttons = document.querySelectorAll(".button");
const display= document.querySelector(".display")
const displayOperation = document.querySelector(".operation")

let firstValue = null;
let currentValue="0"
let currentOperator=""
let operator = null;
let awaitSecondValue=false;

display.textContent=currentValue;
displayOperation.textContent=currentOperator

buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        console.log(button.getAttribute('data-value'))
        let value = button.getAttribute("data-value")
        handleInput(value)
    })
})
document.addEventListener('keydown', (event) => {
    const key = event.key;

    const keyMappings = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '.': '.',
        '+': '+',
        '-': '-',
        '*': 'x',
        '/': '÷',
        '=': '=',
        'Enter': '=',
        'Escape': 'c',
        'Backspace': 'c',
        '%': '%',
        '±': '+/-'
    };

    if (keyMappings[key]) {
        handleInput(keyMappings[key]);
        updateDisplay();
    }
});
function handleInput(value){
    if(!isNaN(value) || value === "."){
        handleNumber(value);
    }
    else{
        handleOperator(value)
    }
    

    
     updateDisplay();
    
}

function handleNumber(value){
  if(awaitSecondValue){
      currentValue=value
      awaitSecondValue=false; 
  }
  else{
    currentValue = currentValue === "0" ? value : currentValue + value;
  }
  currentOperator+=value
}

function handleOperator(value){
    switch(value){
        case "c" : currentValue="0"
                   firstValue=null
                   operator=null
                   currentOperator=""
                   awaitSecondValue=false
                   break;
        case "+/-" :currentValue= (parseFloat(currentValue) * -1).toString()
                     break;
        case "%" : currentValue = (parseFloat(currentValue)/100).toString();
                   break;     
        case "=" : if(operator && firstValue!=null){
                       currentValue=calculate(firstValue,operator,currentValue)  
                       currentOperator += ` = ${currentValue}`;  
                       operator=null
                       firstValue=null
                     }
        default :if(operator && firstValue !== null){
                      currentValue=calculate(firstValue,operator,currentValue);
                      currentOperator = `${currentValue} ${value} `;
                 }
                 else{
                    currentOperator += ` ${value} `;
                 }
                 firstValue=currentValue;
                 operator=value 
               
                 awaitSecondValue=true  
                 break;       
    }
}

function calculate(firstNumber,operator,secondNumber){
    let first = parseFloat(firstNumber);
    console.log(first)
    let second = parseFloat(secondNumber);
    console.log(second)
    switch(operator){
        case "+" : return (first + second).toString();
        case "x" : return (first * second).toString();
        case "-" : return (first - second).toString();
        case "÷" : return (first / second).toString();
        default:return second
    }
}

function updateDisplay(){
    display.textContent=currentValue
    displayOperation.textContent = currentOperator.replace(/=\s*$/, '').trim();
}
