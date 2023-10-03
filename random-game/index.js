const levels = {
  beginner: {
    width: 9,
    height: 9,
    mines_amount: 10,
  },
  intermediate: {
    width: 16,
    height: 16,
    mines_amount: 40,
  },
  expert: {
    width: 30,
    height: 16,
    mines_amount: 99,
  },
};

const gridHTML = document.querySelector('.grid');

function createGrid(width, height) {
  let grid = [];
  for (let i = 0; i < width; i++) {
    grid[i] = [];
    for (let j = 0; j < height; j++) {
      grid[i][j] = {isMine: false, isRevealed: false, adjMines: 0};
    }
  }
  return grid;
}

function renderGrid(grid) {
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

function plantMines(grid, minesNum) {
  let addedMines = 0;
  while (addedMines < minesNum) {
    let i = getRandomInt(0, grid.length - 1);
    let j = getRandomInt(0, grid[0].length - 1);
    if (!grid[i][j].isMine || !grid[i][j].isRevealed) {
      grid[i][j].isMine = true;
      addedMines++;
      ////////
      // let cell = document.getElementById(`${i}-${j}`);
      // cell.classList.add('cell-mine');
      ///////
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Calculate adjacent mines for every cell in a grid */
function calculateAdjacentMines(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (!grid[i][j].isMine) {
        grid[i][j].adjMines = calculateAdjacentMinesCell(i, j, grid);
        ////
        // let cell = document.getElementById(`${i}-${j}`);
        // cell.textContent = grid[i][j].adjMines;
        ////
      }
    }
  }
}

/* Traverse through given cell's neighbors and calculate amount of mines */
function calculateAdjacentMinesCell(i, j, grid) {
  /* +----------+--------+----------+
     | i-1, j-1 | i-1, j | i-1, j+1 |
     +----------+--------+----------+
     | i, j-1   | i, j   | i, j+1   |
     +----------+--------+----------+
     | i+1, j-1 | i+1, j | i+1, j+1 |
     +----------+--------+----------+ */
  let adjacentMines = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const neighborRow = i + x;
      const neighborCol = j + y;
      if (
        neighborRow >= 0 && neighborRow < grid.length &&
        neighborCol >= 0 && neighborCol < grid[0].length &&
        grid[neighborRow][neighborCol].isMine
      ) {
        adjacentMines++;
      }
    }
  }
  return adjacentMines;
}

function findMines(grid) {
  let mines = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {

      if (grid[i][j].isMine) {
        mines.push({ i, j });
      }
    }
  }
  return mines;
}

function revealMines(grid) {
  let mines = findMines(grid);
  mines.forEach((mine) => {
    let cellMine = document.getElementById(`${mine.i}-${mine.j}`);
    cellMine.classList.add('cell-mine');
  })
}


// let grid = createGrid(levels.beginner.width, levels.beginner.height);
// renderGrid(grid);
// plantMines(grid, levels.beginner.mines_amount);
// calculateAdjacentMines(grid);
// findMines(grid);
// revealMines(grid);
