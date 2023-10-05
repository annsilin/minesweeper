/* Render created grid */
function renderGrid(grid, difficulty) {
  gridHTML.innerHTML = '';
  chooseSize(difficulty);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('cell-closed');
      cell.id = `${i}-${j}`;
      gridHTML.appendChild(cell);
    }
  }
}

/* Render mines */
function revealMines(grid) {
  let mines = findMines(grid);
  mines.forEach((mine) => {
    let cellMine = document.getElementById(`${mine.i}-${mine.j}`);
    cellMine.classList.add('cell-mine');
  })
}

/* Render correct guesses */
function revealCorrectGuesses(grid) {
  let correctGuesses = findCorrectGuesses(grid);
  correctGuesses.forEach((guess) => {
    let cellGuess = document.getElementById(`${guess.i}-${guess.j}`);
    cellGuess.classList.add('cell-flag-mine-clicked');
  })
}

function updateMinesCounter(grid) {
  minesHTML.textContent = `${findMines(grid).length - findFlags(grid).length}`;
}
