const gridHTML = document.querySelector('.grid');
const minesHTML = document.querySelector('.mines');
const timerHTML = document.querySelector(".timer");
const restartBtn = document.querySelector(".restart-btn");


/* Handle clicking on a cell to reveal it */
function revealCell(i, j, grid) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j].isRevealed) {
    return;
  }

  let cell = document.getElementById(`${i}-${j}`);
  grid[i][j].isRevealed = true;
  cell.classList.add('cell-opened');
  cell.classList.remove('cell-closed');

  if (grid[i][j].isFlagged) {
    flagCell(i, j, grid);
  }
  if (grid[i][j].isMine) {
    /// game over
    revealMines(grid);
    cell.classList.add('cell-mine-clicked');
    revealCorrectGuesses(grid);
    loseCondition = true;
  } else if (grid[i][j].adjMines !== 0) {
    cell.textContent = grid[i][j].adjMines;
    cell.style.color = chooseColor(grid[i][j].adjMines);
  } else {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        revealCell(i + x, j + y, grid);
      }
    }
  }
}

/* Handle clicking on an already revealed cell */
function clickRevealedCell(i, j, grid) {
  if (grid[i][j].adjMines > 0 && findAdjacentFlagsCell(i, j, grid).length === grid[i][j].adjMines) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (!(i + x < 0 || j + y < 0 || i + x >= grid.length || j + y >= grid[0].length)) {
          if (!grid[i + x][j + y].isFlagged) {
            revealCell(i + x, j + y, grid);
          }
        }
      }
    }
  }
}

/* Flag cell and render */
function flagCell(i, j, grid) {
  let cell = document.getElementById(`${i}-${j}`);
  if (!grid[i][j].isFlagged && !grid[i][j].isRevealed) {
    grid[i][j].isFlagged = true;
    cell.classList.add('cell-flag');
  } else {
    grid[i][j].isFlagged = false;
    cell.classList.remove('cell-flag');
  }
}

/* If user's first click/flag === mine => reshuffle the grid */
function handleFirstMove(i, j) {
  while (isFirstMove) {
    if (isFirstMove && grid[i][j].isMine) {
      loseCondition = false;
      winCondition = false;
      grid = createGrid(currentDifficulty);
      initGame(currentDifficulty, grid);
    } else {
      isFirstMove = false;
    }
  }
}

/* Perform cell reveal when clicking LMB */
let leftClickHandler = (e) => {
  if (e.target.classList.contains('cell')) {
    let id = e.target.id.split('-');
    let i = Number(id[0]);
    let j = Number(id[1]);

    handleFirstMove(i, j);

    if (!grid[i][j].isRevealed) {
      revealCell(i, j, grid);
    }
    else {
      clickRevealedCell(i, j, grid);
    }
    updateMinesCounter(grid);
    checkGameStatus(loseCondition, winCondition);
  }
};

/* Perform cell flagging when clicking RMB */
let rightClickHandler = (e) => {
  if (e.target.classList.contains('cell')) {
    e.preventDefault();
    let id = e.target.id.split('-');
    let i = Number(id[0]);
    let j = Number(id[1]);

    handleFirstMove(i, j);

    flagCell(i, j, grid);
    updateMinesCounter(grid);
    checkGameStatus(loseCondition, winCondition);
  }
};

function addClickListeners() {
  gridHTML.addEventListener("click", leftClickHandler);
  gridHTML.addEventListener("contextmenu", rightClickHandler);
  gridHTML.addEventListener("click", timerEvent);
  gridHTML.addEventListener("contextmenu", timerEvent);
}

function removeClickListeners() {
  gridHTML.removeEventListener("click", leftClickHandler);
  gridHTML.removeEventListener("contextmenu", rightClickHandler);
  gridHTML.removeEventListener("click", timerEvent);
  gridHTML.removeEventListener("contextmenu", timerEvent);
}

document.querySelectorAll("input[name='difficulty']").forEach((radio) => {
  radio.addEventListener('click', (event) => {
    if (event.target.checked) {
      switch (event.target.value) {
        case 'beginner':
          loseCondition = false;
          winCondition = false;
          removeClickListeners(grid);
          currentDifficulty = 'beginner';
          grid = createGrid('beginner');
          initGame('beginner', grid);
          break;
        case 'intermediate':
          loseCondition = false;
          winCondition = false;
          removeClickListeners(grid);
          currentDifficulty = 'intermediate';
          grid = createGrid('intermediate');
          initGame('intermediate', grid);
          break;
        case 'expert':
          loseCondition = false;
          winCondition = false;
          removeClickListeners(grid);
          currentDifficulty = 'expert';
          grid = createGrid('expert');
          initGame('expert', grid);
          break;
        default:
          break;
      }
    }
  });
})

restartBtn.addEventListener("click", (e) => {
  loseCondition = false;
  winCondition = false;
  removeClickListeners(grid);
  grid = createGrid(currentDifficulty);
  initGame(currentDifficulty, grid);
});

function checkWinCondition(grid) {
  let mines = findMines(grid);
  let flags = findFlags(grid);
  let revealedCells = findRevealedCells(grid);
  let correctGuesses = findCorrectGuesses(grid);
  return (correctGuesses.length === mines.length && correctGuesses.length === flags.length) || (grid.length * grid[0].length - revealedCells.length === mines.length);
}

function checkGameStatus(loseCondition) {
  let winCondition = checkWinCondition(grid);
  if (!loseCondition && winCondition) {
    console.log('win');
    restartBtn.classList.add('restart-btn-won');
    removeClickListeners(grid);
    const result = {
      won: true,
      correctGuesses: findMines(grid).length,
      time: stopTimer(),
    };
    console.log(result);
  } else if (loseCondition && !winCondition) {
    console.log('lose');
    restartBtn.classList.add('restart-btn-lost');
    removeClickListeners(grid);
    const result = {
      won: false,
      correctGuesses: findCorrectGuesses(grid).length,
      time: stopTimer(),
    };
    console.log(result);
  }
}

function initGame(difficulty, grid) {
  isFirstMove = true;
  restartBtn.classList.remove('restart-btn-won');
  restartBtn.classList.remove('restart-btn-lost');
  renderGrid(grid, difficulty);
  plantMines(grid, difficulty);
  calculateAdjacentMines(grid);
  addClickListeners(grid);
  updateMinesCounter(grid);
  resetTimer();
}

let isFirstMove = true;
let currentDifficulty = 'beginner'
let grid = createGrid(currentDifficulty);
initGame(currentDifficulty, grid);
let loseCondition = false;
let winCondition = false;
