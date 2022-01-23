const Player = (sign) => {
    this.sign = sign;

    const getSign = () => sign;

    return {getSign};
}

const gameBoard = (() => {
    const btns = document.querySelectorAll(".btn");
    const grids = document.querySelectorAll(".grid9");
    const board = ["","","","","","","","",""];

    btns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            let index = parseInt(event.target.dataset.index)-1;
            if(gameController.getIsOver() || board[index] !== "") return;
            gameController.playRound(index);
        })
    });
    
    const setField = (index,sign) => {
        board[index] = sign;
        if(gameBoard.getField(index) == "X") {
            grids[index].setAttribute('src',"./Images/close.svg");
            grids[index].style.display="block";
        }
        else {
            grids[index].setAttribute('src',"./Images/circle.svg");
            grids[index].style.display="block";
        } 
    };

    const getField = (index) => {
        return board[index];
    };

    return {setField,getField};
})();

const displayController = (() => {
    // selector 
    const displayp1 = document.querySelector(".displayp1");
    const displayp2 = document.querySelector(".displayp2");

    const winner = (player) => {
        if(player == 'X') {
            displayp1.textContent = `Winner ${displayp1.textContent}  🎉🙌`;
            displayp2.style.display="none";
        }
        else if(player == 'O') {
            displayp2.textContent = `Winner ${displayp2.textContent} 🎉🙌`;
            displayp1.style.display="none";
        }
        else {
            displayp1.textContent = "Match is Draw! 😴";
            displayp2.style.display="none";
        }
    }

    return {winner};
})();

const gameController = (() => {
    const Player1 = Player("X");
    const Player2 = Player("O");
    let round = 1;
    let isOver = false;


    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
          displayController.winner(getCurrentPlayerSign());
          isOver = true;
          return;
        }
        if (round === 9) {
          displayController.winner(3);
          isOver = true;
          return;
        }
        round++;
    };

    const checkWinner = (fieldIndex) => {
        const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]; 

        return winConditions.filter((combination) => combination.includes(fieldIndex)).some((possibleCombination) => possibleCombination.every((index) => gameBoard.getField(index) === getCurrentPlayerSign()));
    }

    const getIsOver = () => {
        return isOver;
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? Player1.getSign() : Player2.getSign();
    };
    
    return {playRound,getIsOver,getCurrentPlayerSign};

})();