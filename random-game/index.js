const gridHTML = document.querySelector('.grid');
const minesHTML = document.querySelector('.mines');
const timerHTML = document.querySelector(".timer");



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

/* Perform cell reveal when clicking LMB */
let leftClickHandler = (e) => {
  if (e.target.classList.contains('cell')) {
    let id = e.target.id.split('-');
    let i = Number(id[0]);
    let j = Number(id[1]);
    if (!grid[i][j].isRevealed) {
      revealCell(i, j, grid);
    } else {
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
          removeClickListeners(grid);
          grid = createGrid('beginner');
          initGame('beginner', grid);
          break;
        case 'intermediate':
          removeClickListeners(grid);
          grid = createGrid('intermediate');
          initGame('intermediate', grid);
          break;
        case 'expert':
          removeClickListeners(grid);
          grid = createGrid('expert');
          initGame('expert', grid);
          break;
        default:
          break;
      }
    }
  });
})

function checkWinCondition(grid) {
  let mines = findMines(grid);
  let flags = findFlags(grid);
  let revealedCells = findRevealedCells(grid);
  let correctGuesses = findCorrectGuesses(grid);
  return ((correctGuesses.length === mines.length && correctGuesses.length === flags.length) || (grid.length * grid[0].length - revealedCells.length === mines.length) &&
    revealedCells.length === grid.length * grid[0].length - mines.length);
}

function checkGameStatus(loseCondition) {
  let winCondition = checkWinCondition(grid);
  if (!loseCondition && winCondition) {
    alert('win');
  } else if (loseCondition && !winCondition) {
    alert('lose');
  }
}

function initGame(difficulty, grid) {
  renderGrid(grid, difficulty);
  plantMines(grid, difficulty);
  calculateAdjacentMines(grid);
  addClickListeners(grid);
  updateMinesCounter(grid);
  resetTimer();
  // revealMines(grid);
}

let grid = createGrid('beginner');
initGame('beginner', grid);
let loseCondition = false;
let winCondition = false;
