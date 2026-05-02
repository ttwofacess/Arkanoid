// ==========================================
// modules/Renderer.js
// Handles all canvas drawing operations
// ==========================================
const Renderer = (() => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const $sprite = document.querySelector("#sprite");
  const $bricks = document.querySelector("#bricks");

  canvas.width = 448;
  canvas.height = 400;

  const ballRadius = 3;
  const paddleHeight = 10;
  const paddleWidth = 50;

  function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle(paddleX, paddleY) {
    ctx.drawImage(
      $sprite, 29, 174, paddleWidth, paddleHeight,
      paddleX, paddleY, paddleWidth, paddleHeight
    );
  }

  function drawCounter(counter) {
    const counterString = counter.toString().padStart(6, "0");
    const counterX = canvas.width - 80;
    const counterY = 20;
    ctx.font = "800 18px Monospace";
    ctx.fillStyle = "#ff7a33";
    ctx.fillText("Puntos:", counterX - 80, counterY);
    ctx.fillText(counterString, counterX, counterY);
  }

  function drawUI(framePerSec) {
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`FPS: ${framePerSec}`, 5, 10);
  }

  // Delegate brick drawing to BrickManager
  function drawBricks() {
    BrickManager.drawBricks(ctx, $bricks);
  }

  function getCanvasDimensions() {
    return { width: canvas.width, height: canvas.height };
  }

  function getPaddleDimensions() {
    return { width: 50, height: 10 };
  }

  function getBallRadius() {
    return 3;
  }

  return {
    cleanCanvas,
    drawBall,
    drawPaddle,
    drawCounter,
    drawUI,
    drawBricks,
    getCanvasDimensions,
    getPaddleDimensions,
    getBallRadius
  };
})();