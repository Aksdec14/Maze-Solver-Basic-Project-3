const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

// Maze grid size and cell size
const rows = 10;
const cols = 10;
const cellSize = 50;

// Player's initial position
let playerX = 0;
let playerY = 0;

// Maze setup: 0 for open path, 1 for wall, 2 for trap, 3 for exit
const maze = [
  [0, 1, 0, 0, 0, 1, 0, 2, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 0]
];

// Draw maze
function drawMaze() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = maze[row][col];
      ctx.fillStyle = cell === 1 ? '#000' : (cell === 2 ? '#f00' : (cell === 3 ? '#0f0' : '#fff'));
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

// Draw the player
function drawPlayer() {
  ctx.fillStyle = '#00f';
  ctx.beginPath();
  ctx.arc(playerX * cellSize + cellSize / 2, playerY * cellSize + cellSize / 2, cellSize / 4, 0, Math.PI * 2);
  ctx.fill();
}

// Handle keyboard input for player movement
function handleKeyPress(event) {
  let newX = playerX;
  let newY = playerY;

  if (event.key === 'ArrowUp') newY--;
  if (event.key === 'ArrowDown') newY++;
  if (event.key === 'ArrowLeft') newX--;
  if (event.key === 'ArrowRight') newX++;

  // Check if the new position is within bounds and not a wall or trap
  if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newY][newX] !== 1) {
    playerX = newX;
    playerY = newY;
  }

  // Check if player is on a trap
  if (maze[playerY][playerX] === 2) {
    alert('You hit a trap! Game Over!');
    resetGame();
  }

  // Check if player reached the exit
  if (maze[playerY][playerX] === 3) {
    alert('You reached the exit! You win!');
    resetGame();
  }

  drawGame();
}

// Reset the game to initial position
function resetGame() {
  playerX = 0;
  playerY = 0;
  drawGame();
}

// Draw the complete game (maze and player)
function drawGame() {
  drawMaze();
  drawPlayer();
}

// Initialize the game
document.addEventListener('keydown', handleKeyPress);
drawGame();
