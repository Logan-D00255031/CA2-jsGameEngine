import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player.js';

// The PlayerUI class extends GameObject.
class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); // Call the constructor of the GameObject class.

    // Create new UI components with initial text and add it to this object's components.
    this.uiComponent = new UI('Health: 5 Score: 0', x, y);
    this.addComponent(this.uiComponent);
    this.uiComponent2 = new UI('Asteroids Left: 8', 10, 40);
    this.addComponent(this.uiComponent2);
    this.uiComponent3 = new UI('FPS: 5', 10, 70);
    this.addComponent(this.uiComponent3);
  }

  // The update method is called every frame.
  update(deltaTime) {
    // Find the player object in the game's gameObjects array.
    const player = this.game.gameObjects.find((obj) => obj instanceof Player);

    // Update the text of the UI component to reflect the player's current lives and score.
    this.uiComponent.setText(`Health: ${player.lives} Score: ${player.score}`);
    // Update the text of the UI component to reflect the current amount of asteroids left.
    this.uiComponent2.setText(`Asteroids Left: ${player.asteroidsLeft}`);
    // Update the text of the UI component to reflect the current FPS.
    this.uiComponent3.setText(`FPS: ${Math.round(1/deltaTime)}`);
  }
}

export default PlayerUI; // Export the PlayerUI class for use in other modules.
