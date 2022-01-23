// Selector 
const boxes = document.querySelector('.boxes');
const colorPicker = document.querySelector('#color-picker');
const randomColor = document.querySelector('.random');
const erase = document.querySelector('.erase');
const clearBoard = document.querySelector('.clear');
const label = document.querySelector('label');
const range = document.querySelector('#range');
let eraseStatus = 0;
let randomColorMode = 0;
let changedColor = '#000';
let eventListen = false;

// Event listner 
function start() {

    let newSize = 16;
    
    // Color Changing
    colorPicker.addEventListener('change', e => {
        changedColor = e.target.value;
    });

    // random Color 
    randomColor.addEventListener('click', (e) => {
        randomColorMode = 1 - randomColorMode;
        if(randomColorMode) {
            e.target.id = 'pressed';
        } else {
            e.target.id = '';
        }
    });

    // Erase
    erase.addEventListener('click', (e) => {
        eraseStatus = 1 - eraseStatus;
        if(eraseStatus) {
            e.target.id = 'pressed';
        } else {
            e.target.id = '';
        }
    });
    
    // range changes
    range.addEventListener('change',(e) => {
        newSize = e.target.value;
        makeGrid(newSize);
    });
    makeGrid(newSize);
}

start();

// add Boxes
function addBoxes(size) {

    size = size*size;
    while(size--) {
        const box = document.createElement('div');
        box.className = `box-${size}`;
        box.style.backgroundColor = '#fff'
        boxes.appendChild(box);
    }
}   


// Coloring
function coloring(event, changedColor) {
    
    if(eraseStatus) {
        event.target.style.backgroundColor = '#fff';
    } else {
        if(randomColorMode) {
            event.target.style.backgroundColor = `rgb(${get()},${get()},${get()})`;
        } else {
            event.target.style.backgroundColor = changedColor;
        }
    }

}

// Changing size, Coloring and Erasing
function doThething() {
    let boxesArr = [].slice.call(boxes.children);

    boxesArr.forEach(box => {
        box.addEventListener('mouseover', function(event) {
            coloring(event, changedColor);
        });
    });
   
}


// making boxes
function makeGrid(newSize) {
    boxes.innerHTML = '';
    boxes.style.gridTemplateColumns = `repeat(${newSize},1fr)`;
    boxes.style.gridTemplateRows = `repeat(${newSize},1fr)`;
    addBoxes(parseInt(newSize));
    doThething();   
}

// random color 
function get() {
    return Math.floor(Math.random()*256);
}