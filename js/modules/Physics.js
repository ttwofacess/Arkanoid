// ==========================================
// modules/Physics.js
// Handles ball movement, paddle movement, and boundary collisions
// ==========================================
export const Physics = (() => {
  const PADDLE_SENSITIVITY = 8;

  // Update ball position and handle wall collisions
  // Returns updated { x, y, dx, dy, gameOverFlag }
  function updateBall(gameState, canvasDim, ballRadius) {
    let x = gameState.getBallX();
    let y = gameState.getBallY();
    let dx = gameState.getBallDx();
    let dy = gameState.getBallDy();
    let gameOverFlag = false;

    // Wall collisions (left/right/top)
    if (x + dx > canvasDim.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    }

    x += dx;
    y += dy;

    gameState.setBallX(x);
    gameState.setBallY(y);
    gameState.setBallDx(dx);
    gameState.setBallDy(dy);

    return { x, y, dx, dy };
  }

  // Handle paddle collision and bottom boundary (game over)
  function handlePaddleCollisionAndBottom(gameState, paddleX, paddleY, paddleWidth, paddleHeight, canvasHeight, ballRadius) {
    let dy = gameState.getBallDy();
    let y = gameState.getBallY();
    let x = gameState.getBallX();
    let gameOverFlag = false;

    const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;
    const isBallTouchingPaddle = y + dy > paddleY;

    if (isBallSameXAsPaddle && isBallTouchingPaddle) {
      dy = -dy;
    } else if (y + dy > canvasHeight - ballRadius || y + dy > paddleY + paddleHeight) {
      gameOverFlag = true;
    }

    gameState.setBallDy(dy);
    return gameOverFlag;
  }

  // Move paddle based on pressed keys
  function updatePaddle(gameState, canvasWidth, paddleWidth) {
    let paddleX = gameState.getPaddleX();
    const rightPressed = gameState.getRightPressed();
    const leftPressed = gameState.getLeftPressed();

    if (rightPressed && paddleX < canvasWidth - paddleWidth) {
      paddleX += PADDLE_SENSITIVITY;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= PADDLE_SENSITIVITY;
    }

    gameState.setPaddleX(paddleX);
    return paddleX;
  }

  return {
    updateBall,
    handlePaddleCollisionAndBottom,
    updatePaddle
  };
})();