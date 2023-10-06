/* Save game result to local storage */
function saveGameResult(result) {
  let gameResults = JSON.parse(localStorage.getItem('gameResults-annsilin')) || [];
  gameResults.push(result);
  // If there are more than 10 results, remove the oldest one
  if (gameResults.length > 10) {
    gameResults.shift();
  }
  // Store the updated results back in local storage
  localStorage.setItem('gameResults-annsilin', JSON.stringify(gameResults));
  // Render the updated results in HTML
  renderGameResults(gameResults);
}

/* Render game results */
function renderGameResults(results) {
  const leaderboardTable = document.querySelector('.leaderboard');
  leaderboardTable.innerHTML = '';

  // Create a table header row
  const tableHeader = document.createElement('tr');
  tableHeader.innerHTML = `<th>№</th><th>Result</th><th>Correct Guesses</th><th>Difficulty</th><th>Time</th>`;
  leaderboardTable.appendChild(tableHeader);

  // Create and append table rows for each game result
  results.forEach((result, index) => {
    const tableRow = document.createElement('tr');
    const resultText = result.won ? 'Won' : 'Lost';
    const resultTextColor = result.won ? '#407f07' : '#fe0000';
    tableRow.innerHTML = `<td>${index + 1}</td><td>${resultText}</td><td>${result.correctGuesses}</td><td>${result.difficulty}</td><td>${result.time}</td>`;
    tableRow.style.color = resultTextColor;
    leaderboardTable.appendChild(tableRow);
  });
}

/* Display current result */
function renderCurrentResult(result) {
  const currentResultTable = document.querySelector('.current-result');
  currentResultTable.innerHTML = '';
  const resultText = document.querySelector('.result');

  // Create a table with two columns
  const table = document.createElement('table');

  // Create a table row for each header and value pair
  const headers = ['Result', 'Correct Guesses', 'Difficulty', 'Time'];
  const values = [result.won ? 'Won' : 'Lost', result.correctGuesses, result.difficulty, result.time];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const value = values[i];

    const row = document.createElement('tr');
    const headerCell = document.createElement('td');
    const valueCell = document.createElement('td');

    headerCell.textContent = header;
    valueCell.textContent = value;

    row.appendChild(headerCell);
    row.appendChild(valueCell);

    table.appendChild(row);
  }

  if (result.won) {
    resultText.textContent = 'You won!';
    resultText.style.color = '#407f07';
  } else {
    resultText.textContent = 'You lost!';
    resultText.style.color = '#fe0000';
  }

  document.querySelector('.current-result-wrapper').style.display = 'block';
  currentResultTable.appendChild(table);
}
