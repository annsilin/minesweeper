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
