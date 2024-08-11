/* Create grid - array of cells coordinates */
function createGrid(difficulty) {
  let grid = [];
  for (let i = 0; i < levels[difficulty].height; i++) {
    grid[i] = [];
    for (let j = 0; j < levels[difficulty].width; j++) {
      grid[i][j] = {isMine: false, isRevealed: false, adjMines: 0, isFlagged: false};
    }
  }
  return grid;
}

/* Plant mines on an existing grid */
function plantMines(grid, difficulty) {
  let addedMines = 0;
  let minesNum = levels[difficulty].mines_amount;
  while (addedMines < minesNum) {
    let i = getRandomInt(0, grid.length - 1);
    let j = getRandomInt(0, grid[0].length - 1);
    if (!grid[i][j].isMine && !grid[i][j].isRevealed) {
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

/* Get an array of mines coordinates in an existing grid */
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

/* Get an array of flag coordinates in an existing grid */
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

/* Traverse through given cell's neighbors and find flags */
function findAdjacentFlagsCell(i, j, grid) {
  let adjacentFlags = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const neighborRow = i + x;
      const neighborCol = j + y;
      if (
        neighborRow >= 0 && neighborRow < grid.length &&
        neighborCol >= 0 && neighborCol < grid[0].length &&
        grid[neighborRow][neighborCol].isFlagged
      ) {
        adjacentFlags.push(grid[neighborRow][neighborCol]);
      }
    }
  }
  return adjacentFlags;
}

/* Get an array of coordinates for revealed cells */
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

/* Array of correctly guessed mines */
function findCorrectGuesses(grid) {
  let mines = findMines(grid);
  let flags = findFlags(grid);
  let correctGuesses = [];

  // Iterate through all mines
  mines.forEach(mine => {
    // Check if there's a cell with same coordinates in flags array
    const isMatching = flags.some(flag => mine.i === flag.i && mine.j === flag.j);
    if (isMatching) {
      // If there is one - add it to correct guesses
      correctGuesses.push(mine);
    }
  })
  return correctGuesses;
}
