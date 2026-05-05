# Donar.md — Plan de Integración del Modal de Donación

## 🎯 Objetivo

Integrar el modal de donación (`donate-modal.html`) dentro de `index.html`, ubicándolo debajo del `<canvas>` sin interferir con los botones existentes, y manteniendo consistencia iconográfica reutilizable entre proyectos.

---

## 🧩 1. Separación de responsabilidades

### 1.1 Extraer solo lo necesario

Eliminar del archivo `donate-modal.html`:

* `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`
* `<style>` y `<script>` (se migrarán)

Conservar únicamente:

* Botón `#donateButton`
* Estructura del modal `#donateModal`

---

## 📍 2. Inserción en index.html

### 2.1 Ubicación correcta

Insertar el bloque justo **debajo del `<canvas>`**:

```html
<canvas></canvas>

<!-- DONATE -->
<button id="donateButton" class="btn">Donar</button>

<div id="donateModal" class="modal">
  ...
</div>
```

### 2.2 Compatibilidad con layout actual

Tu layout usa grid (ver `layout.css`), así que:

Agregar reglas para evitar interferencias:

```css
body > #donateButton {
  grid-row: 4;
  grid-column: 1 / -1;
  margin: 8px auto;
}

body > #donateModal {
  grid-row: auto;
}
```

👉 Esto asegura que:

* No choque con `mobile-controls`
* Mantenga alineación coherente

---

## 🎨 3. Integración de estilos

### 3.1 Migrar CSS

Mover estilos del `<style>` a:

```
/css/components/modal.css
```

Pero dividirlos en:

#### A) Base reutilizable (global)

* `.modal`
* `.modal-content`
* `.close-button`

#### B) Específico de donación

* `.crypto-options`
* `.crypto-option`
* `.crypto-icon`
* `.copy-button`

---

### 3.2 Variables de diseño

Eliminar `:root` del modal aislado y usar tus variables globales:

Reemplazar:

```css
--btnordr → var(--primary)
--btnplus → var(--accent) (o crear una)
```

👉 Mantiene consistencia entre proyectos

---

## 🧠 4. Lógica JavaScript

### 4.1 Crear módulo dedicado

Nuevo archivo:

```
/js/modules/DonateModal.js
```

### 4.2 Migrar lógica

Mover:

* open modal
* close modal
* click outside
* copy to clipboard

Ejemplo:

```js
export function initDonateModal() {
  const donateButton = document.getElementById('donateButton');
  const modal = document.getElementById('donateModal');
  const closeButton = document.querySelector('.close-button');

  donateButton.onclick = () => modal.style.display = 'block';
  closeButton.onclick = () => modal.style.display = 'none';

  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
  };

  document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const input = event.target
        .previousElementSibling
        .querySelector('input');

      navigator.clipboard.writeText(input.value);

      const original = button.textContent;
      button.textContent = '¡Copiado!';
      setTimeout(() => button.textContent = original, 2000);
    });
  });
}
```

---

### 4.3 Inicialización

En `main.js`:

```js
import { initDonateModal } from './modules/DonateModal.js';

initDonateModal();
```

---

## 🎯 5. Consistencia iconográfica (clave de tu requisito)

### 5.1 Problema actual

Usás caracteres:

* ₿
* Ł
* $

👉 Esto **no escala bien entre proyectos**

---

### 5.2 Solución recomendada

Crear sistema reutilizable:

#### Opción A (simple)

Usar SVGs locales:

```
/assets/icons/crypto/bitcoin.svg
/assets/icons/crypto/litecoin.svg
/assets/icons/crypto/usdt.svg
```

Y reemplazar:

```html
<div class="crypto-icon">
  <img src="./assets/icons/crypto/bitcoin.svg" alt="Bitcoin">
</div>
```

---

#### Opción B (más escalable)

Usar librería como:

* Feather Icons
* Heroicons

---

### 5.3 Beneficio

* Consistencia entre sitios
* Mejor control visual
* Fácil tematización

---

## 📱 6. Responsive y UX

### 6.1 Ajustes móviles

Reducir ancho del modal:

```css
.modal-content {
  width: 90%;
  margin: 30% auto;
}
```

---

### 6.2 Accesibilidad (opcional pero recomendable)

Agregar:

```html
<div id="donateModal" class="modal" role="dialog" aria-modal="true">
```

---

## 🧪 7. Validaciones finales

Checklist:

* [ ] El botón "Donar" aparece debajo del canvas
* [ ] No rompe el layout grid
* [ ] Modal abre/cierra correctamente
* [ ] Click fuera funciona
* [ ] Copiado funciona (clipboard API)
* [ ] Iconos consistentes
* [ ] Responsive OK

---

## 🚀 Resultado esperado

* Modal completamente integrado
* Código modular (HTML + CSS + JS separados)
* Sistema reutilizable para otros proyectos
* Consistencia visual mantenida

---

## 🧠 Mejora futura (opcional)

* Convertir modal en componente reutilizable (Web Component o función render)
* Soporte multi-idioma (ya que estás trabajando en i18n)
* Animaciones suaves (CSS o JS)

---

**Fin del plan**
