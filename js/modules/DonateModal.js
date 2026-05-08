import { t } from './i18n.js';

export function initDonateModal() {
  const donateButton = document.getElementById('donateButton');
  const modal = document.getElementById('donateModal');
  const closeButton = modal.querySelector('.close-button');

  if (!donateButton || !modal || !closeButton) return;

  donateButton.onclick = () => {
    modal.style.display = 'block';
  };

  closeButton.onclick = () => {
    modal.style.display = 'none';
  };

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const input = event.target
        .previousElementSibling // .crypto-info
        .querySelector('input');

      if (input) {
        navigator.clipboard.writeText(input.value).then(() => {
          const original = button.textContent;
          button.textContent = t("copied");
          button.style.backgroundColor = 'var(--success-color)';
          
          setTimeout(() => {
            button.textContent = original;
            button.style.backgroundColor = '';
          }, 2000);
        }).catch(err => {
          console.error('Error al copiar al portapapeles:', err);
        });
      }
    });
  });
}
