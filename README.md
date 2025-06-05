# 🎮 Arkanoid Game - JavaScript Implementation

Un juego clásico de Arkanoid implementado completamente en JavaScript vanilla, HTML5 Canvas y CSS3. Basado en el tutorial de Midudev con mejoras adicionales.

## 🚀 Características

### Funcionalidades Básicas
- **Física de pelota realista** con rebotes en paredes y paddle
- **Sistema de ladrillos destructibles** con 8 colores diferentes generados aleatoriamente
- **Control de paddle** responsivo con teclado y controles táctiles
- **Detección de colisiones** precisa entre pelota, paddle y ladrillos
- **Game loop optimizado** a 60 FPS con requestAnimationFrame

### Mejoras Implementadas
- ✅ **Sistema de puntuación** - 5 puntos por ladrillo destruido
- ✅ **Tabla de mejores puntuaciones** - Top 10 guardado en localStorage
- ✅ **Botón de inicio** para controlar el estado del juego
- ✅ **Reset automático del tablero** - Juego continuo sin interrupciones
- ✅ **Interfaz de High Scores** con modal interactivo
- ✅ **Controles táctiles** para dispositivos móviles
- ✅ **Diseño responsivo** adaptado para smartphones

## 🎯 Controles

### Teclado
- **Flecha Izquierda** o **A**: Mover paddle a la izquierda
- **Flecha Derecha** o **D**: Mover paddle a la derecha

### Dispositivos Móviles
- **Botón ←**: Mover paddle a la izquierda
- **Botón →**: Mover paddle a la derecha

### Interfaz
- **Botón "Jugar"**: Iniciar nueva partida
- **Botón "Salón de la Fama"**: Ver mejores puntuaciones

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas** - Renderizado del juego
- **JavaScript ES6+** - Lógica del juego
- **CSS3** - Estilos y diseño responsivo
- **LocalStorage** - Persistencia de puntuaciones
- **Google Fonts (Poppins)** - Tipografía


## 🎮 Mecánicas del Juego

### Sistema de Puntuación
- **5 puntos** por cada ladrillo destruido
- **High Score automático** cuando se supera un récord
- **Persistencia** de las 10 mejores puntuaciones

### Lógica de Juego
- **78 ladrillos** distribuidos en 6 filas y 13 columnas
- **Colores aleatorios** para cada ladrillo (8 variantes)
- **Reset automático** del tablero al destruir todos los ladrillos
- **Game Over** cuando la pelota toca el suelo

### Optimizaciones
- **60 FPS constantes** con control de frame rate
- **Renderizado eficiente** con limpieza de canvas
- **Detección de colisiones optimizada**

## 🚀 Cómo Ejecutar

1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador web
3. ¡Disfruta del juego!

*No requiere servidor web ni instalación adicional.*

## 📱 Compatibilidad

- ✅ **Navegadores modernos** (Chrome, Firefox, Safari, Edge)
- ✅ **Dispositivos móviles** (iOS, Android)
- ✅ **Diseño responsivo** para diferentes tamaños de pantalla



## 📄 Licencia

Proyecto educativo de código abierto.



