// ==========================================
// modules/HighScoreManager.js
// Manages local storage high scores and UI display
// ==========================================
const HighScoreManager = (() => {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  function checkHighScore(score, onShowCallback) {
    const lowestScore = highScores[highScores.length - 1]?.score || 0;

    if (score > lowestScore) {
      let name = prompt("¡Nuevo High Score! Ingresa tus iniciales:");
      if (name) {
        name = name.slice(0, 3).toUpperCase();
        const newScore = { name, score };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        highScores = highScores.slice(0, 10);
        localStorage.setItem("highScores", JSON.stringify(highScores));
      }
    }

    if (onShowCallback) onShowCallback();
  }

  function showHighScores(onCloseCallback) {
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
    // Remove previous listeners to avoid duplicates
    const newCloseButton = closeButton.cloneNode(true);
    closeButton.parentNode.replaceChild(newCloseButton, closeButton);
    newCloseButton.addEventListener("click", () => {
      highScoreBoard.style.display = "none";
      if (onCloseCallback) onCloseCallback();
    });
  }

  function getHighScores() {
    return [...highScores];
  }

  return {
    checkHighScore,
    showHighScores,
    getHighScores
  };
})();