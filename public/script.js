const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
const rows = canvas.height / boxSize;
const cols = canvas.width / boxSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameStarted = false; // Track if the game has started

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  if (!gameStarted) gameStarted = true; // Start the game on first key press

  const keyPressed = event.keyCode;
  if (keyPressed === 37 && direction.x === 0) direction = { x: -1, y: 0 }; // Left
  if (keyPressed === 38 && direction.y === 0) direction = { x: 0, y: -1 }; // Up
  if (keyPressed === 39 && direction.x === 0) direction = { x: 1, y: 0 };  // Right
  if (keyPressed === 40 && direction.y === 0) direction = { x: 0, y: 1 };  // Down
}

function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
  ctx.strokeStyle = '#333';
  ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
}

function drawSnake() {
  snake.forEach(segment => drawBox(segment.x, segment.y, 'green'));
}

function drawFood() {
  drawBox(food.x, food.y, 'red');
}

function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for collisions with walls or itself
  if (
    head.x < 0 || head.x >= cols ||
    head.y < 0 || head.y >= rows ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert('Game Over!');
    resetGame();
    return;
  }

  snake.unshift(head);

  // Check if snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  gameStarted = false; // Reset the gameStarted flag
  placeFood();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();

  if (gameStarted) {
    updateGame(); // Only update the game if it has started
  }
}

setInterval(gameLoop, 150); // Run the game loop every 150ms
placeFood(); // Place the initial food