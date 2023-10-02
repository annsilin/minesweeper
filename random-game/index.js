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
      cell.id = `${i}${j}`;
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
