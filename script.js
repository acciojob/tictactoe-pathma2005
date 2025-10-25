const playerInputDiv = document.querySelector(".player-input");
const gameBoardDiv = document.querySelector(".game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const submitBtn = document.querySelector("#submit");

let player1 = "";
let player2 = "";
let turn = "X"; // should be uppercase to match your winner logic
let board = ["", "", "", "", "", "", "", "", ""];

// ❌ Wrong: 'cell' was used directly — it doesn’t exist yet
// ✅ Correct: use submitBtn to start the game
submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names");
    return;
  }

  playerInputDiv.style.display = "none";
  gameBoardDiv.style.display = "block";
  messageDiv.textContent = `${player1}, you're up!`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = parseInt(cell.id) - 1;
    if (board[index] !== "") return;

    board[index] = turn;
    cell.textContent = turn;

    if (checkWinner()) {
      const winnerName = turn === "X" ? player1 : player2;
      messageDiv.textContent = `${winnerName}, congratulations you won!`;
      disableBoard();
      return;
    }

    if (board.every(cell => cell !== "")) {
      messageDiv.textContent = "It's a draw!";
      return;
    }

    turn = turn === "X" ? "O" : "X";
    messageDiv.textContent = turn === "X" ? `${player1}, you're up!` : `${player2}, you're up!`;
  });
});

function checkWinner() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
      return true;
    }
  }
  return false;
}

function disableBoard() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}

