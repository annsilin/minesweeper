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
      grid[i][j] = {isMine: false, isRevealed: false, adjMines: 0, isFlagged: false};
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
        mines.push({i, j});
      }
    }
  }
  return mines;
}

function findFlags(grid) {
  let flags = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {

      if (grid[i][j].isFlagged) {
        flags.push({i, j});
      }
    }
  }
  return flags;
}

function findRevealedCells(grid) {
  let revealed = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {

      if (grid[i][j].isRevealed) {
        revealed.push({i, j});
      }
    }
  }
  return revealed;
}

function revealMines(grid) {
  let mines = findMines(grid);
  mines.forEach((mine) => {
    let cellMine = document.getElementById(`${mine.i}-${mine.j}`);
    cellMine.classList.add('cell-mine');
  })
}

function revealCell(i, j, grid) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j].isRevealed) {
    return;
  }

  let cell = document.getElementById(`${i}-${j}`);
  grid[i][j].isRevealed = true;
  cell.classList.add('cell-opened');
  cell.classList.remove('cell-closed');

  if (grid[i][j].isMine) {
    /// game over
    revealMines(grid);
    cell.classList.add('cell-mine-clicked');
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

function flagCell (i, j, grid) {
  let cell = document.getElementById(`${i}-${j}`);
  if (!grid[i][j].isFlagged && !grid[i][j].isRevealed) {
    grid[i][j].isFlagged = true;
    cell.classList.add('cell-flag');
  } else {
    grid[i][j].isFlagged = false;
    cell.classList.remove('cell-flag');
  }
}

function chooseColor (number) {
  let color = '';
  switch(number) {
    case 1:
      color = '#244afc';
      break;
    case 2:
      color = '#407f07';
      break;
    case 3:
      color = '#fe0000';
      break;
    case 4:
      color = '#0d2180';
      break;
    case 5:
      color = '#801e17';
      break;
    case 6:
      color = '#008284';
      break;
    case 7:
      color = '#840084';
      break;
    case 8:
      color = '#757575';
      break;
    default:
      color = '#000000';
      break;
  }
  return color;
}

let grid = createGrid(levels.beginner.width, levels.beginner.height);

renderGrid(grid);
plantMines(grid, levels.beginner.mines_amount);
calculateAdjacentMines(grid);
// findMines(grid);
// revealMines(grid);

gridHTML.addEventListener("click", (e) => {
  let id = e.target.id.split('-');
  let i = Number(id[0]);
  let j = Number(id[1]);
  revealCell(i, j, grid);
});

gridHTML.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  let id = e.target.id.split('-');
  let i = Number(id[0]);
  let j = Number(id[1]);
  flagCell(i, j, grid);
});


