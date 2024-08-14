/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const boardEl = document.querySelector(".board");
const resetBtnEl = document.querySelector("#reset")

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = ['', '', '',
        '', '', '',
        '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((element, index) => {
        squareEls[index].textContent = element;
    });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`;
    } else if (!winner && tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `${turn} has won the match. Congratulations!`;
    }
}

function handleClick(event) {
    if (event.target.tagName === "SECTION") return;

    const squareIndex = event.target.id;
    if (board[squareIndex] == 'O' || board[squareIndex] == 'X') return;

    if (winner) return;

    placePiece(squareIndex);
    checkforWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
}

function checkforWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        const winPositions = winningCombos[i];
        if (board[winningCombos[i][0]] !== '') {
            if (board[winPositions[0]] === board[winPositions[1]] &&
                board[winPositions[0]] === board[winPositions[2]]) {
                winner = true;
                break;
            }
        }
    };
}

function checkForTie() {
    if (winner) return;
    if (!board.includes('')) tie = true;
}

function switchPlayerTurn() {
    if (winner) return;

    if (turn === 'X') turn = 'O';
    else turn = 'X';
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener("click", handleClick);
resetBtnEl.addEventListener("click", init);

init();