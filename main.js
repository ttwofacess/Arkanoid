const hall = document.getElementById("hallClick");
hall.addEventListener("click", showHighScores);

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const $sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

canvas.width = 448;
canvas.height = 400;

/* Game variables */
let gameLoop = null;
let isPaused = true; //to track the game state
let counter = 0; // contador de puntos

// Crear o cargar los mejores puntajes desde localStorage
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Comprobar si el puntaje actual es el mejor
function checkHighScore(score) {
  const lowestScore = highScores[highScores.length - 1]?.score || 0;

  if (score > lowestScore) {
    let name = prompt("¡Nuevo High Score! Ingresa tus iniciales:");
    name = name.slice(0, 3).toUpperCase();

    const newScore = { name, score };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  showHighScores();
}

// Mostrar los mejores puntajes
function showHighScores() {
  const highScoreBoard = document.getElementById("highScoreBoard");
  const scoreList = document.getElementById("scoreList");

  scoreList.innerHTML = "";

  highScores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${score.name} - ${score.score}`;
    scoreList.appendChild(listItem);
  });

  highScoreBoard.style.display = "flex";

  const closeButton = document.getElementById("closeButton");
  closeButton.addEventListener("click", () => {
    highScoreBoard.style.display = "none";
    gameOver = false;
    startGame();
  });
}

/* Ball variables */
const ballRadius = 3;

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = -3;
let dy = -3;

/* Paddle variables */
const PADDLE_SENSITIVITY = 8;

const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

/* Bricks variables */
const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 32;
const brickHeight = 16;
const brickPadding = 0;
const brickOffsetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];

const BRICK_STATUS = {
  ACTIVE: 1,
  DESTROYED: 0,
};

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    const random = Math.floor(Math.random() * 8);
    bricks[c][r] = {
      x: brickX,
      y: brickY,
      status: BRICK_STATUS.ACTIVE,
      color: random,
    };
  }
}

function drawCounter() {
  const counterString = counter.toString().padStart(6, "0");
  const counterX = canvas.width - 80;
  const counterY = 20;
  ctx.font = "800 18px Monospace";
  ctx.fillStyle = "#ff7a33";
  ctx.fillText("Puntos:", counterX - 80, counterY);
  ctx.fillText(counterString, counterX, counterY);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.drawImage(
    $sprite,
    29,
    174,
    paddleWidth,
    paddleHeight,
    paddleX,
    paddleY,
    paddleWidth,
    paddleHeight
  );
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

      const clipX = currentBrick.color * 32;

      ctx.drawImage(
        $bricks,
        clipX,
        0,
        brickWidth,
        brickHeight,
        currentBrick.x,
        currentBrick.y,
        brickWidth,
        brickHeight
      );
    }
  }
}

function areAllBricksDestroyed() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === BRICK_STATUS.ACTIVE) {
        return false;
      }
    }
  }
  return true;
}

function initializeBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      const random = Math.floor(Math.random() * 8);
      bricks[c][r] = {
        x: brickX,
        y: brickY,
        status: BRICK_STATUS.ACTIVE,
        color: random,
      };
    }
  }
}

function startGame() {
  isPaused = false;
  initializeBricks();
  if (!gameLoop) {
    gameLoop = setInterval(draw, msPerFrame);
  }
}

function drawUI() {
  ctx.fillText(`FPS: ${framePerSec}`, 5, 10);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

      const isBallSameXAsBrick =
        x > currentBrick.x && x < currentBrick.x + brickWidth;
      const isBallSameYAsBrick =
        y > currentBrick.y && y < currentBrick.y + brickHeight;

      if (isBallSameXAsBrick && isBallSameYAsBrick) {
        dy = -dy;
        currentBrick.status = BRICK_STATUS.DESTROYED;
        counter += 5;
      }
    }
  }
}

function ballMovement() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  }

  const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;
  const isBallTouchingPaddle = y + dy > paddleY;

  if (isBallSameXAsPaddle && isBallTouchingPaddle) {
    dy = -dy;
  } else if (
    y + dy > canvas.height - ballRadius ||
    y + dy > paddleY + paddleHeight
  ) {
    gameOver = true;
    console.log("Game Over");
    document.location.reload();
  }

  x += dx;
  y += dy;
}

function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += PADDLE_SENSITIVITY;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SENSITIVITY;
  }
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(event) {
    const { key } = event;
    if (
      key === "Right" ||
      key === "ArrowRight" ||
      key.toLowerCase() === "d"
    ) {
      rightPressed = true;
    } else if (
      key === "Left" ||
      key === "ArrowLeft" ||
      key.toLowerCase() === "a"
    ) {
      leftPressed = true;
    }
  }

  function keyUpHandler(event) {
    const { key } = event;
    if (
      key === "Right" ||
      key === "ArrowRight" ||
      key.toLowerCase() === "d"
    ) {
      rightPressed = false;
    } else if (
      key === "Left" ||
      key === "ArrowLeft" ||
      key.toLowerCase() === "a"
    ) {
      leftPressed = false;
    }
  }

  const leftButton = document.getElementById("leftButton");
  const rightButton = document.getElementById("rightButton");

  leftButton.addEventListener("touchstart", () => {
    leftPressed = true;
  });

  leftButton.addEventListener("touchend", () => {
    leftPressed = false;
  });

  rightButton.addEventListener("touchstart", () => {
    rightPressed = true;
  });

  rightButton.addEventListener("touchend", () => {
    rightPressed = false;
  });
}

const fps = 60;

let msPrev = window.performance.now();
let msFPSPrev = window.performance.now() + 1000;
const msPerFrame = 1000 / fps;
let frames = 0;
let framePerSec = fps;

let gameOver = false;

function draw() {
  if (isPaused) {
    return;
  }

  if (gameOver) {
    checkHighScore(counter);
    counter = 0;
    isPaused = true;
    return;
  }

  window.requestAnimationFrame(draw);

  const msNow = window.performance.now();
  const msPassed = msNow - msPrev;

  if (msPassed < msPerFrame) return;

  const excessTime = msPassed % msPerFrame;
  msPrev = msNow - excessTime;

  frames++;

  if (msFPSPrev < msNow) {
    msFPSPrev = window.performance.now() + 1000;
    framePerSec = frames;
    frames = 0;
  }

  cleanCanvas();
  drawBall();
  drawPaddle();
  drawBricks();
  drawUI();
  drawCounter();
  collisionDetection();

  if (areAllBricksDestroyed()) {
    initializeBricks();
  }

  ballMovement();
  paddleMovement();
}

draw();
initEvents();
