const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restart-button');
const alertBox = document.querySelector('.alertBox');

// making variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

// function to start the game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

// function to handle the click operation
const handleClick = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if (checkWin()) {
            alertBox.style.display = "none";
            disableCells();
            // window.alert(`${playerTurn} is the Winner!`);
           
        }
        else if (checkTie()) {
            alertBox.style.display = "none";
            disableCells();
            window.alert(`It's a Tie!`);
           
        }
        else {
            changePlayerTurn();
            showAlert(`Player: ${playerTurn}'s turn`);
        }
    }
}

// function to change player's turn
const changePlayerTurn = () => {
    if (playerTurn === currentPlayer) {
        playerTurn = nextPlayer;
    }
    else {
        playerTurn = currentPlayer;
    }
}

// function to check the winner
const checkWin = () => {
    const winningCondition = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningCondition.length; i++) {
        const [pos1, pos2, pos3] = winningCondition[i];
        if (gameCells[pos1].textContent !== '' && gameCells[pos1].textContent === gameCells[pos2].textContent && gameCells[pos1].textContent === gameCells[pos3].textContent) {
            return true;
        }
    }
    return false;
}

// function to check a tie
const checkTie = () => {
    let emptyCellCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellCount++;
        }
    });
    return emptyCellCount === 0 && !checkWin();
}

// function to disable game board after a tie or a win is encountered
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

// fucntion to restart the game
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    alertBox.style.display = "none";
    startGame();
}

// function to show alert
const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
}

// when Restart button is clicked, the game board is cleared
restartBtn.addEventListener('click', restartGame);

// calling the startGame function to start the game
startGame();