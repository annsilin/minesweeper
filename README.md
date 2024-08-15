# Minesweeper Game
This project is a classic implementation of Minesweeper game made with HTML, CSS and vanilla Javascript. It was created as part of a [RSSchool](https://rs.school/) FrontEnd course.

## Features
- **Classic Windows Style Design**: The game replicates the look and feel of the classic Windows Minesweeper.
- **Three Levels of Difficulty**: Choose from Beginner, Intermediate, and Expert levels.
- **First Click Safety**: The first click is guaranteed to be safe and not a mine.
- **Local Storage**: Stores the results of the last 10 games in the browser's local storage and displays them on the game page.

## How to Play
1. **Objective**: Uncover all the cells on the grid that do not contain mines.
2. **Controls**:
   - **Left Click**: Reveal a square.
   - **Right Click**: Place a flag on a suspected mine.
3. **Rules**:
   - The game ends when all non-mine cells are revealed (or all of the mine cells are marked with flags) or if a mine is clicked.
   - Numbers on revealed cells indicate how many mines are adjacent to that square.
   - If you flag all of the mines touching a number, left click on the number opens the remaining cells. However, if you place the correct number of flags on the wrong cells, clicking on a number will explode the mines.
   - Use logic and deduction to avoid mines and uncover safe squares.

## Game Levels
- **Beginner**: 9x9 grid with 10 mines.
- **Intermediate**: 16x16 grid with 40 mines.
- **Expert**: 30x16 grid with 99 mines.
