// ==========================================
// modules/GameLoop.js
// Manages the game loop, frame rate, and main draw/update coordination
// ==========================================
const GameLoop = (() => {
  const fps = 60;
  const msPerFrame = 1000 / fps;
  let msPrev = window.performance.now();
  let msFPSPrev = window.performance.now() + 1000;
  let frames = 0;
  let framePerSec = fps;
  let animationId = null;

  function start(gameState, onGameUpdate, onGameOver) {
    function drawFrame() {
      if (!gameState.getIsPaused()) {
        const msNow = window.performance.now();
        const msPassed = msNow - msPrev;

        if (msPassed >= msPerFrame) {
          const excessTime = msPassed % msPerFrame;
          msPrev = msNow - excessTime;

          frames++;
          if (msFPSPrev < msNow) {
            msFPSPrev = window.performance.now() + 1000;
            framePerSec = frames;
            frames = 0;
          }

          // Execute game update and rendering
          const gameEnded = onGameUpdate(framePerSec);
          if (gameEnded && onGameOver) {
            onGameOver();
            return;
          }
        }
      }
      animationId = window.requestAnimationFrame(drawFrame);
    }

    if (animationId) {
      window.cancelAnimationFrame(animationId);
    }
    animationId = window.requestAnimationFrame(drawFrame);
  }

  function stop() {
    if (animationId) {
      window.cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  return {
    start,
    stop
  };
})();