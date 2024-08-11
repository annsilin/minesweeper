function activeCellState(i, j) {
  const cell = document.getElementById(`${i}-${j}`);

  // Clicking on closed cell
  if (cell.classList.contains('cell-closed')) {
    cell.classList.add('cell-active');
  }

  // Clicking on revealed cell
  if (cell.classList.contains('cell-opened')) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const neighborCell = document.getElementById(`${i + x}-${j + y}`);
        if (neighborCell && neighborCell.classList.contains('cell-closed') && !neighborCell.classList.contains('cell-flag')) {
          neighborCell.classList.add('cell-active');
        }
      }
    }
  }
}

function removeActiveCellState() {
  const activeCells = document.querySelectorAll('.cell-active');
  activeCells.forEach((cell) => {
    cell.classList.remove('cell-active');
  });
}

let mouseDownHandler = (e) => {
  if (e.target.classList.contains('cell') && e.button === 0) { // Check for left mouse button
    e.preventDefault();
    let id = e.target.id.split('-');
    let i = Number(id[0]);
    let j = Number(id[1]);
    activeCellState(i, j);
  }
}
