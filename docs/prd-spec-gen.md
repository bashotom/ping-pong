# Produkt-Spezifikation: Ping Pong Web-App (Stand: 10.09.2025)

## Übersicht

Die Ping Pong Web-App ist ein browserbasiertes Spiel, das in zwei modernen Frontend-Frameworks umgesetzt ist: Vue.js und React. Ziel ist es, ein klassisches Pong-Spiel mit ansprechendem, responsivem Layout und einfacher Steuerung bereitzustellen. Die App ist als Lern- und Demonstrationsprojekt konzipiert.

## Features

- Zwei Implementierungen: Vue.js (`ping-pong-frontend-vue`) und React (`ping-pong-frontend-react`)
- Mensch gegen Computer (KI) spielbar
- Steuerung des Spieler-Paddles per Maus (React) bzw. Mausbewegung (Vue)
- Computer-Paddle folgt dem Ball mit flüssiger, interpolierter Bewegung
- Ballbewegung und Kollisionen sind realistisch und ruckelfrei
- Scoreboard mit Anzeige von Spieler- und Computerpunkten
- Start-Button zum Neustart des Spiels
- Modernes, zentriertes Layout mit responsivem Spielfeld
- Klare Farbgebung für Ball und Paddles

## Technische Details

### Gemeinsame Parameter

- Spielfeldgröße: 600 x 400 Pixel
- Paddle-Größe: 20 x 80 Pixel
- Ball: Kreis mit Radius 10 Pixel
- Spieler-Paddle links, Computer-Paddle rechts
- Score wird bei jedem Punktgewinn aktualisiert

### React-Variante

- Verzeichnis: `ping-pong-frontend-react`
- Framework: React + TypeScript + Vite
- Spielfeld als SVG-Element
- Steuerung: Mausbewegung im SVG für das Spieler-Paddle
- Computer-Paddle folgt dem Ball mit sanfter Interpolation (lerp)
- Spiel-Loop über `requestAnimationFrame` für flüssige Animationen
- Layout und Farben an Vue-Variante angelehnt

### Vue-Variante

- Verzeichnis: `ping-pong-frontend-vue`
- Framework: Vue 3 + Vite
- Spielfeld als SVG-Element
- Steuerung: Mausbewegung im Canvas für das Spieler-Paddle
- Computer-Paddle folgt dem Ball mit Interpolation
- Spiel-Loop über `setInterval`
- Modernes, zentriertes Layout

## Steuerung

- Spieler: Paddle wird per Maus vertikal bewegt
- Computer: Paddle folgt automatisch dem Ball
- Start: Button „Spiel starten“

## Design

- Spielfeld und Elemente sind mittig im Browserfenster zentriert
- Farbgebung: Spieler-Paddle grün (#42b883), Computer-Paddle blau (#646cff), Ball orange (#f39c12), Hintergrund dunkel (#222)
- Responsive für verschiedene Bildschirmgrößen

## Ausblick / Erweiterungen (optional)

- Zwei-Spieler-Modus (lokal oder online)
- Mobile Touch-Steuerung
- Soundeffekte
- Highscore-Liste
- Einstellungen für Geschwindigkeit und Schwierigkeitsgrad

Letzte Aktualisierung: 10.09.2025

---

Letzte Aktualisierung: 10.09.2025
