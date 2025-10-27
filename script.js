const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");
const inputSection = document.querySelector(".input-section");
const board = document.querySelector(".board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }

  inputSection.style.display = "none";
  board.style.display = "block";
  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`; // ✅ exact text for test
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentSymbol;
    boardState[index] = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`; // ✅ exact match
      gameActive = false;
      return;
    }

    if (!boardState.includes("")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentSymbol = currentSymbol === "x" ? "o" : "x";
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up`; // ✅ exact match
  });
});

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}


