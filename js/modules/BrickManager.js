// ==========================================
// modules/BrickManager.js
// Manages brick creation, rendering, collision detection, and status
// ==========================================
const BrickManager = (() => {
  const BRICK_STATUS = { ACTIVE: 1, DESTROYED: 0 };
  const brickRowCount = 6;
  const brickColumnCount = 13;
  const brickWidth = 32;
  const brickHeight = 16;
  const brickPadding = 0;
  const brickOffsetTop = 80;
  const brickOffsetLeft = 16;

  let bricks = [];

  // Initialize or reinitialize bricks
  function initializeBricks() {
    bricks = [];
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
          color: random
        };
      }
    }
  }

  // Draw all active bricks
  function drawBricks(ctx, $bricksImg) {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const currentBrick = bricks[c][r];
        if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;
        const clipX = currentBrick.color * 32;
        ctx.drawImage(
          $bricksImg, clipX, 0, brickWidth, brickHeight,
          currentBrick.x, currentBrick.y, brickWidth, brickHeight
        );
      }
    }
  }

  // Check collision between ball and bricks, update score
  function collisionDetection(ballX, ballY, ballDy, addScoreCallback) {
    let newDy = ballDy;
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const currentBrick = bricks[c][r];
        if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

        const isBallSameXAsBrick = ballX > currentBrick.x && ballX < currentBrick.x + brickWidth;
        const isBallSameYAsBrick = ballY > currentBrick.y && ballY < currentBrick.y + brickHeight;

        if (isBallSameXAsBrick && isBallSameYAsBrick) {
          newDy = -newDy;
          currentBrick.status = BRICK_STATUS.DESTROYED;
          if (addScoreCallback) addScoreCallback(5);
        }
      }
    }
    return newDy;
  }

  // Check if all bricks are destroyed
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

  // Getters for brick dimensions and counts (for external use)
  function getBrickColumnCount() { return brickColumnCount; }
  function getBrickRowCount() { return brickRowCount; }

  return {
    initializeBricks,
    drawBricks,
    collisionDetection,
    areAllBricksDestroyed,
    getBrickColumnCount,
    getBrickRowCount
  };
})();