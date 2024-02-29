const board = document.getElementById("board");
const statusGame = document.getElementById("status");
const resetBtn = document.getElementById("reset");

const X_CLASS = "x";
const O_CLASS = "o";
let currentPlayerClass = X_CLASS;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = Array.from(document.getElementsByClassName("cell"));

function handleCellClick(event) {
  const cell = event.target;

  if (!cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) {
    placeMark(cell);

    if (checkWin()) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
    }
  }
}

function placeMark(cell) {
  cell.classList.add(currentPlayerClass);
  cell.innerText = currentPlayerClass.toUpperCase();
  cell.classList.add("cell-active");
  cell.classList.add("cell-actives");
  resetBtn.classList.add("reset-btn-active");
}

function swapTurns() {
  currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
}

function checkWin() {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayerClass);
    });
  });
}

function isDraw() {
  return cells.every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    statusGame.innerText = "Draw";
  } else {
    statusGame.innerText = `${
      currentPlayerClass === X_CLASS ? "x" : "o"
    } wins!`;
  }
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

function resetGame() {
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.classList.remove("cell-active");
    cell.classList.remove("cell-actives");
    resetBtn.classList.remove("reset-btn-active");
    cell.innerText = "";
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  statusGame.innerText = "";
  currentPlayerClass = X_CLASS;
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick, { once: true });
});

resetBtn.addEventListener("click", resetGame);
