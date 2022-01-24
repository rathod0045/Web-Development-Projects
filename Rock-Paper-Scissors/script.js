// start game

let playerPoint = 0;
let computerPoint = 0;

// all selectors
let title = document.querySelector(".title");
let subtitle = document.querySelector(".subtitle");
let playerPointDom = document.querySelector(".player");
let computerPointDom = document.querySelector(".computer");
let img = document.querySelectorAll(".Img");
let gameOver = document.querySelector(".game");

// computer guess
function guessForCom() {
    return Math.floor(Math.random()*3);
}

// button part
let playerGuess, computerGuess;
let btns = document.querySelectorAll(".btn");
btns.forEach( btn => {
    btn.addEventListener("click",playGame);
});

function playGame(event) {
    
    playerGuess=parseInt(event.target.alt);
    computerGuess=guessForCom();

    img[0].attributes.src.nodeValue='./Images/'+playerGuess+'.png';
    img[1].attributes.src.nodeValue='./Images/'+computerGuess+'.png';
    subtitle.style.display='none';
    if(playerGuess == computerGuess) {
        title.textContent="Draw !!🤜🤛";
    }
    else if(playerGuess == (computerGuess+1)%3) {
        title.textContent="Hurry!! 👍";
        playerPoint++;
        playerPointDom.textContent="Player: "+playerPoint;
    }
    else {
        title.textContent="Lose!! 👎";
        computerPoint++;
        computerPointDom.textContent="Computer: "+computerPoint;
    }

    // End game
    let flag=0;
    if(playerPoint==5) {
        title.textContent="You Won 🎉";
        flag=1;
    }
    if(computerPoint==5) {
        title.textContent="Game over 😢";
        flag=1;
    }
    if(flag) {
        playerPoint=0;
        computerPoint=0;
        gameOver.style.display='block';
    }
}

//Play again
gameOver.addEventListener('click',playAgain);

function playAgain() {
    title.textContent="Choose your weapon";
    subtitle.style.display='block';
    playerPointDom.textContent="Player: "+playerPoint;
    computerPointDom.textContent="Computer: "+computerPoint;
    img[1].attributes.src.nodeValue=img[0].attributes.src.nodeValue='./Images/question.png';
}




