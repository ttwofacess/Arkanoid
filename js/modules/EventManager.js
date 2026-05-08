// ==========================================
// modules/EventManager.js
// Handles keyboard and touch events for paddle control
// ==========================================
export const EventManager = (() => {
  let isInitialized = false;

  function initEvents(gameState) {
    if (isInitialized) return;
    isInitialized = true;

    function keyDownHandler(event) {
      const { key } = event;
      if (key === "Right" || key === "ArrowRight" || key.toLowerCase() === "d") {
        gameState.setRightPressed(true);
      } else if (key === "Left" || key === "ArrowLeft" || key.toLowerCase() === "a") {
        gameState.setLeftPressed(true);
      }
    }

    function keyUpHandler(event) {
      const { key } = event;
      if (key === "Right" || key === "ArrowRight" || key.toLowerCase() === "d") {
        gameState.setRightPressed(false);
      } else if (key === "Left" || key === "ArrowLeft" || key.toLowerCase() === "a") {
        gameState.setLeftPressed(false);
      }
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");

    if (leftButton) {
      leftButton.addEventListener("touchstart", () => gameState.setLeftPressed(true));
      leftButton.addEventListener("touchend", () => gameState.setLeftPressed(false));
      leftButton.addEventListener("mousedown", () => gameState.setLeftPressed(true));
      leftButton.addEventListener("mouseup", () => gameState.setLeftPressed(false));
    }

    if (rightButton) {
      rightButton.addEventListener("touchstart", () => gameState.setRightPressed(true));
      rightButton.addEventListener("touchend", () => gameState.setRightPressed(false));
      rightButton.addEventListener("mousedown", () => gameState.setRightPressed(true));
      rightButton.addEventListener("mouseup", () => gameState.setRightPressed(false));
    }
  }

  return {
    initEvents
  };
})();