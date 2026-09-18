# Soccer Flexbox Game

A browser-based learning game that teaches CSS Flexbox through soccer-themed puzzles. Arrange players and the ball on a fixed-size pitch by choosing flex properties from button controls - no typing CSS required.

## Overview

Each stage gives you an instruction (for example, line up strikers across the top, or split substitutes into two rows). Use the **Tactics Board** to set `flex-direction`, `justify-content`, `align-items`, and `flex-wrap`, then press **Check Formation** to see if your layout is correct.

The game includes 10 stages with increasing difficulty, sequential level unlocking, saved progress, and a short celebration animation when you solve a stage.

## Features

- **10 soccer-themed levels** with clear instructions
- **Button controls** for all four required flex properties
- **Fixed game board** - 480×320 px on every screen size
- **Level navigation** - numbered dots plus Prev / Next buttons
- **Sequential progression** - beat the current stage before moving forward; revisit earlier stages anytime
- **Discover Result** - reveal the correct layout without counting as a win
- **Reset Level** - restart the current stage from its starting formation
- **Attempt counter** per stage
- **Progress saved** in `localStorage` (survives browser restarts)
- **Messi & Ronaldo celebration** on a correct answer
- **Responsive page layout** - panels and controls adapt to mobile and desktop; the pitch size stays constant

## Project Structure

```
flexbox-game/
├── index.html       # Page structure and panels
├── styles.css       # Layout, pitch styling, responsive rules
├── js/
│   ├── app.js       # Game logic, controls, validation, progress
│   └── levels.js    # Level data, instructions, solutions, start values
├── .gitignore
└── README.md
```

## How to Play

1. Read the instructions for the current stage.
2. Click buttons on the **Tactics Board** to set flex properties.
3. Press **Check Formation** when you think the layout is correct.
4. After a success, use **Next Level** or the **Next** nav button to continue.
5. Use **Prev** or an earlier stage number to go back and review completed stages.
6. Use **Discover Result** to peek at the solution (you must still beat the stage yourself to progress).
7. Use **Reset Level** to practise again from the starting formation.

### Progression rules

- You can only move **one stage forward** after beating the current stage with **Check Formation**.
- You can always return to **earlier stages** you have already reached.
- Stages you have already beaten open in **review mode** (winning formation shown) until you press **Reset Level**.
