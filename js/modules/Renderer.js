import { t } from './i18n.js';
import { BrickManager } from './BrickManager.js';

// ==========================================
// modules/Renderer.js
// Handles all canvas drawing operations
// ==========================================
export const Renderer = (() => {
  // Constants for dimensions
  const CANVAS_WIDTH = 448;
  const CANVAS_HEIGHT = 400;
  const BALL_RADIUS = 3;
  const PADDLE_HEIGHT = 10;
  const PADDLE_WIDTH = 50;

  // Private helper to get elements (ensures they are found when needed)
  function getElements() {
    const canvas = document.querySelector("canvas");
    if (canvas && (canvas.width !== CANVAS_WIDTH || canvas.height !== CANVAS_HEIGHT)) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    }
    return {
      canvas,
      ctx: canvas ? canvas.getContext("2d") : null,
      $sprite: document.querySelector("#sprite"),
      $bricks: document.querySelector("#bricks")
    };
  }

  function cleanCanvas() {
    const { canvas, ctx } = getElements();
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function drawBall(x, y) {
    const { ctx } = getElements();
    if (ctx) {
      ctx.beginPath();
      ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();
    }
  }

  function drawPaddle(paddleX, paddleY) {
    const { ctx, $sprite } = getElements();
    if (ctx && $sprite) {
      ctx.drawImage(
        $sprite, 29, 174, PADDLE_WIDTH, PADDLE_HEIGHT,
        paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT
      );
    }
  }

  function drawCounter(counter) {
    const { canvas, ctx } = getElements();
    if (canvas && ctx) {
      const counterString = counter.toString().padStart(6, "0");
      const counterX = canvas.width - 80;
      const counterY = 20;
      ctx.font = "800 18px Monospace";
      ctx.fillStyle = "#ff7a33";
      ctx.fillText(t("points"), counterX - 80, counterY);
      ctx.fillText(counterString, counterX, counterY);
    }
  }

  function drawUI(framePerSec) {
    const { ctx } = getElements();
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`FPS: ${framePerSec}`, 5, 10);
    }
  }

  // Delegate brick drawing to BrickManager
  function drawBricks() {
    const { ctx, $bricks } = getElements();
    if (ctx && $bricks) {
      BrickManager.drawBricks(ctx, $bricks);
    }
  }

  function getCanvasDimensions() {
    return { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
  }

  function getPaddleDimensions() {
    return { width: PADDLE_WIDTH, height: PADDLE_HEIGHT };
  }

  function getBallRadius() {
    return BALL_RADIUS;
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
