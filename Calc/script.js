let history = '';
let current = '0';
let flag=0;
let lastPressed = '';
let lastOpration = '';

// Selectors
let btns = document.querySelectorAll(".btn");
let clearScreen = document.querySelector(".delete");
let backSpace = document.querySelector(".backspace");
let currentScreen = document.querySelector(".current");
let historyScreen = document.querySelector(".history");


// Events 
btns.forEach( btn => btn.addEventListener('click',doTheThing));
clearScreen.addEventListener('click',removeAll);
backSpace.addEventListener('click',removeLast);


// functions
// Display on screen
function displayCurrent(curr) {
    currentScreen.textContent = curr;
}

function displayHistory(hist) {
    historyScreen.textContent = hist;
}

function isOpration(pressed) {
    return (pressed == '+' || pressed == '-' || pressed == 'x' || pressed == '÷')
}

function cal(hist,curr,opration) {
    let num1 = parseFloat(hist);
    let num2 = parseFloat(curr);
    let ans = 0;

    switch(opration) {
        case '+':
            ans = num1 + num2;
            break;
        case '-':
            ans = num1 - num2;
            break;
        case '÷':
            ans = num1/num2;
            break;
        case 'x':
            ans = num1*num2;
            break;            
    }
    return ans;
}

// btns actions
function doTheThing(event) {
    let pressed = event.target.innerHTML;

    if(!flag) {
        flag=1;
        current='';
        lastPressed = '';
        lastOpration = '';
    }

    if(isOpration(pressed)) {
        if(isOpration(lastPressed)) {
            history = history.slice(0,history.length-2);
            history = history + ' ' + pressed;
            current = '';
            lastOpration = pressed;
        }
        else if(history.length>=1 && current.length>=1) {
            let ans = cal(history,current,lastOpration);
            history = ans.toString() + ' ' + pressed;
            current = ''; 
        }
        else {
            history = history + current + ' ' + pressed;
            current = '';
            lastOpration = pressed;
        } 
    }
    else if(pressed == '=') {
        let ans = cal(history,current,lastOpration);
        history = ans.toString();
        current = ''; 
        lastPressed = '';
    }
    else {
        current = current + pressed;
    }

    lastPressed = pressed;
    displayCurrent(current);
    displayHistory(history);
}

function removeAll() {
    history = '';
    current = '0';
    flag=0;
    displayCurrent(current);
    displayHistory(history);
}

function removeLast() {
    let len = current.length;

    if(len>1) {
        current = current.slice(0,len-1);
    }
    else {
        current = '';
    }

    displayCurrent(current);
    displayHistory(history);
}

