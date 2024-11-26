// Game variables and initialization
const mazeData = [
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], // Finish cell at (9, 9) -- Open space
];

const mazeContainer = document.getElementById("maze");
const player = document.getElementById("player");
const winMessage = document.getElementById("win-message");

// Player's starting position
const mazeSize = 10;
let playerPosition = { x: 0, y: 0 };

const wallColors = ["wall", "wall-1", "wall-2", "wall-3", "wall-4"]; // Different colors for walls

const createMaze = () => {
  mazeContainer.innerHTML = ""; // Clear existing maze cells

  for (let y = 0; y < mazeSize; y++) {
    for (let x = 0; x < mazeSize; x++) {
      const cell = document.createElement("div");

      // If the cell is a wall, assign a random wall color
      if (mazeData[y][x] === 1) {
        const randomWallClass =
          wallColors[Math.floor(Math.random() * wallColors.length)];
        cell.classList.add(randomWallClass);
      }

      mazeContainer.appendChild(cell);

      // Create and position the finish cell
      if (x === mazeSize - 1 && y === mazeSize - 1) {
        // Finish is at (9, 9)
        cell.classList.add("finish");
        const finishImage = document.createElement("img");
        finishImage.src = "princess_peach.png"; // Replace with your finish image URL
        cell.appendChild(finishImage);
      }
    }
  }
};

const movePlayer = (dx, dy) => {
  const newX = playerPosition.x + dx;
  const newY = playerPosition.y + dy;

  // Ensure the player can move within bounds and doesn't collide with walls
  if (
    newX >= 0 &&
    newX < mazeSize &&
    newY >= 0 &&
    newY < mazeSize &&
    mazeData[newY][newX] === 0
  ) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    player.style.top = playerPosition.y * 50 + "px";
    player.style.left = playerPosition.x * 50 + "px";
  }

  // Check for win condition
  if (playerPosition.x === mazeSize - 1 && playerPosition.y === mazeSize - 1) {
    winMessage.style.display = "block";
  }
};

// Handle keyboard input for player movement
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    movePlayer(0, -1);
  } else if (event.key === "ArrowDown") {
    movePlayer(0, 1);
  } else if (event.key === "ArrowLeft") {
    movePlayer(-1, 0);
  } else if (event.key === "ArrowRight") {
    movePlayer(1, 0);
  }
});

// Initialize the game
createMaze();
