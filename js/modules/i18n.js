const translations = {
  es: {
    play: "Jugar",
    donate: "Donar",
    hallOfFame: "Salon de la fama",
    highScores: "Mejores Puntuaciones",
    points: "Puntos:",
    copy: "Copiar",
    copied: "¡Copiado!",
    newHighScore: "¡Nuevo High Score! Ingresa tus iniciales:"
  },

  ptBR: {
    play: "Jogar",
    donate: "Doar",
    hallOfFame: "Hall da Fama",
    highScores: "Melhores Pontuações",
    points: "Pontos:",
    copy: "Copiar",
    copied: "Copiado!",
    newHighScore: "Novo Recorde! Digite suas iniciais:"
  }
};

const browserLanguage = navigator.language || navigator.userLanguage || "es";
let currentLanguage = "es";

if (browserLanguage.toLowerCase() === "pt-br") {
  currentLanguage = "ptBR";
}

/**
 * Translates a key based on the current language.
 * @param {string} key 
 * @returns {string}
 */
function t(key) {
  return translations[currentLanguage][key] || key;
}

/**
 * Updates all DOM elements with the data-i18n attribute.
 */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  document.documentElement.lang = currentLanguage === "ptBR" ? "pt-BR" : "es";
}

export {
  t,
  currentLanguage,
  applyTranslations
};
