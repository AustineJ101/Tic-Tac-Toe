# Tic-Tac-Toe

This is a dynamic and interactive implementation of the classic Tic Tac Toe game built using HTML, CSS, and JavaScript. This project mainly showcases my skills in problem solving, modular javascript design, use of IIFEs for encapsulation and code organization. 

## Features

- **Dynamic Player Input**: Players can input their names to personalize the gameplay.
- **Interactive Gameplay**:
  - Real-time feedback on player turns.
  - Alerts for invalid moves or attempts to play on marked squares.
- **Win Detection**:
  - Checks all possible win conditions dynamically.
  - Displays the winner or a draw message after each game.
- **Restart Functionality**:
  - Reset the game state and start fresh with a single button.
- **Modular Codebase**: Organized into reusable modules for better readability and maintainability.

## Project Structure

- **`gameboard` Module**:
  - Maintains the current state of the gameboard (rows and markers).
- **`players` Module**:
  - Defines player markers and keeps track of whose turn it is.
- **`displayDOM` Module**:
  - Handles the creation and updates of DOM elements for visualizing the game.
- **`play` Module**:
  - Implements the game logic, including move validation, turn switching, and win detection.
