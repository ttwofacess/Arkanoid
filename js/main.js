// ==========================================
// main.js - Application entry point
// Coordinates all modules
// ==========================================
(function main() {
  // Get DOM elements
  const hallButton = document.getElementById("hallClick");
  const startBtn = document.getElementById("startButton");

  // Global references for game control
  let currentGameState = null;

  function resetAndStartGame() {
    // Reset game state
    if (currentGameState) {
      if (currentGameState.getGameLoop()) {
        clearInterval(currentGameState.getGameLoop());
      }
    }

    // Create fresh game state
    const freshState = (() => {
      const state = {
        gameLoop: null,
        isPaused: true,
        gameOver: false,
        counter: 0,
        x: 448 / 2,
        y: 400 - 30,
        dx: -3,
        dy: -3,
        paddleX: (448 - 50) / 2,
        paddleY: 400 - 10 - 10,
        rightPressed: false,
        leftPressed: false
      };
      return {
        getGameLoop: () => state.gameLoop,
        setGameLoop: (loop) => state.gameLoop = loop,
        getIsPaused: () => state.isPaused,
        setIsPaused: (paused) => state.isPaused = paused,
        getGameOver: () => state.gameOver,
        setGameOver: (over) => state.gameOver = over,
        getCounter: () => state.counter,
        setCounter: (val) => state.counter = val,
        addToCounter: (val) => state.counter += val,
        resetCounter: () => state.counter = 0,
        getBallX: () => state.x,
        setBallX: (val) => state.x = val,
        getBallY: () => state.y,
        setBallY: (val) => state.y = val,
        getBallDx: () => state.dx,
        setBallDx: (val) => state.dx = val,
        getBallDy: () => state.dy,
        setBallDy: (val) => state.dy = val,
        getPaddleX: () => state.paddleX,
        setPaddleX: (val) => state.paddleX = val,
        getPaddleY: () => state.paddleY,
        getRightPressed: () => state.rightPressed,
        setRightPressed: (pressed) => state.rightPressed = pressed,
        getLeftPressed: () => state.leftPressed,
        setLeftPressed: (pressed) => state.leftPressed = pressed
      };
    })();

    currentGameState = freshState;

    // Initialize bricks
    BrickManager.initializeBricks();

    // Unpause game
    freshState.setIsPaused(false);
    freshState.setGameOver(false);
    freshState.resetCounter();

    // Start game loop
    GameLoop.start(freshState, (currentFPS) => {
      // Game update function - returns true if game ended
      if (freshState.getGameOver()) {
        return true;
      }

      const canvasDim = Renderer.getCanvasDimensions();
      const ballRadius = Renderer.getBallRadius();
      const paddleDim = Renderer.getPaddleDimensions();

      // 1. Update ball position (walls)
      Physics.updateBall(freshState, canvasDim, ballRadius);

      // 2. Handle paddle collision and check game over
      const paddleX = freshState.getPaddleX();
      const paddleY = freshState.getPaddleY();
      const gameEnded = Physics.handlePaddleCollisionAndBottom(
        freshState, paddleX, paddleY, paddleDim.width, paddleDim.height, canvasDim.height, ballRadius
      );
      if (gameEnded) {
        freshState.setGameOver(true);
        return true;
      }

      // 3. Update paddle position
      Physics.updatePaddle(freshState, canvasDim.width, paddleDim.width);

      // 4. Collision detection with bricks (updates score and brick status)
      const newDy = BrickManager.collisionDetection(
        freshState.getBallX(),
        freshState.getBallY(),
        freshState.getBallDy(),
        (points) => freshState.addToCounter(points)
      );
      freshState.setBallDy(newDy);

      // 5. Check if all bricks destroyed -> reinitialize
      if (BrickManager.areAllBricksDestroyed()) {
        BrickManager.initializeBricks();
      }

      // 6. Render everything
      Renderer.cleanCanvas();
      Renderer.drawBall(freshState.getBallX(), freshState.getBallY());
      Renderer.drawPaddle(freshState.getPaddleX(), freshState.getPaddleY());
      Renderer.drawBricks();
      Renderer.drawCounter(freshState.getCounter());
      Renderer.drawUI(currentFPS);

      return false;
    }, () => {
      // Game over callback
      HighScoreManager.checkHighScore(freshState.getCounter(), () => {
        HighScoreManager.showHighScores(() => {
          // On close: reset and start new game
          resetAndStartGame();
        });
      });
      // Stop the loop after game over
      GameLoop.stop();
    });
  }

  function showHallOfFame() {
    if (currentGameState) {
      currentGameState.setIsPaused(true);
    }
    HighScoreManager.showHighScores(() => {
      // Resume or start game after closing
      if (currentGameState) {
        currentGameState.setIsPaused(false);
      } else {
        resetAndStartGame();
      }
    });
  }

  // Initialize event system
  // We need a temporary state to bind events, but events just set flags
  const tempState = {
    rightPressed: false, leftPressed: false,
    setRightPressed: function(v) { this.rightPressed = v; },
    setLeftPressed: function(v) { this.leftPressed = v; },
    getRightPressed: () => this.rightPressed,
    getLeftPressed: () => this.leftPressed
  };
  EventManager.initEvents({
    setRightPressed: (v) => { if (currentGameState) currentGameState.setRightPressed(v); },
    setLeftPressed: (v) => { if (currentGameState) currentGameState.setLeftPressed(v); },
    getRightPressed: () => currentGameState ? currentGameState.getRightPressed() : false,
    getLeftPressed: () => currentGameState ? currentGameState.getLeftPressed() : false
  });

  // Attach UI button events
  hallButton.addEventListener("click", showHallOfFame);
  startBtn.addEventListener("click", () => {
    if (currentGameState) {
      currentGameState.setIsPaused(false);
      if (currentGameState.getGameOver()) {
        resetAndStartGame();
      }
    } else {
      resetAndStartGame();
    }
  });

  // Initial draw without starting game loop
  Renderer.cleanCanvas();
  BrickManager.initializeBricks();
  Renderer.drawBricks();
  Renderer.drawPaddle((448 - 50) / 2, 400 - 10 - 10);
  Renderer.drawCounter(0);
})();