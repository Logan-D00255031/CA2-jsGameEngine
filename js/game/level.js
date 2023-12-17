// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import Enemy2 from './enemy2.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Wall from './wall.js';
import GravityPlatform from './gravityPlatform.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 200;

    // Define the sides of the game's border
    const gameBorderTop = -1000;
    const gameBorderBottom = 2000;
    const gameBorderRight = -1000;
    const gameBorderLeft = 4000;

    // Define how thick the walls are
    const wallWidth = 50;

    // Create platforms and add them to the game
    const platforms = [
      //new Platform(3 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      //new Platform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      //new Platform(5 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      //new Platform(6 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      //new Platform(7 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      //new Platform(8 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      //new Platform(9 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      new Platform(5 * (platformWidth) - 20, this.canvas.height - platformWidth - 20, 20, platformWidth + 20),
      new Platform(gameBorderLeft/2 + gameBorderRight, gameBorderBottom - 250, 20, 150),
      new Platform(gameBorderLeft/2 + gameBorderRight, gameBorderBottom - 250, 1000, 20),
      new Platform(gameBorderLeft/2 + gameBorderRight + 150, gameBorderBottom - 100, 20, 120),
      new Platform(gameBorderLeft/2 + gameBorderRight + 1000 - 20, gameBorderBottom - 250, 20, 150),
      new Platform(gameBorderLeft/2 + gameBorderRight + 1000 - 150 - 20, gameBorderBottom - 100, 20, 120),
      new Platform(0, this.canvas.height - 20, 1000, 20),
      new Platform(300, this.canvas.height - 20 - 200, 450, 20),
      new Platform(900, this.canvas.height - 20 - 200, 100, 20),
      new Platform(300, this.canvas.height - platformWidth - 20, 20, 40),
      new Platform(200, this.canvas.height - platformWidth, 120, 20),
      new Platform(150, this.canvas.height - platformWidth + 20, 70, 20),
      new Platform(100, this.canvas.height - platformWidth + 40, 70, 20),
      new Platform(75, this.canvas.height - platformWidth + 60, 45, 20),
      new Platform(50, this.canvas.height - platformWidth + 80, 45, 20),
      new Platform(25, this.canvas.height - platformWidth + 100, 45, 20),
      new Platform(0, this.canvas.height - platformWidth + 120, 45, 20),
      new Platform(0, this.canvas.height - platformWidth + 120, 20, 70),
      new Platform(3 * (platformWidth) - 20, this.canvas.height - 50 - 20, platformWidth * 2, 20),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    const walls = [
      new Wall(gameBorderRight, gameBorderTop, 5000, wallWidth),
      new Wall(gameBorderRight, gameBorderTop, wallWidth, 3000),
      new Wall(gameBorderLeft - wallWidth, gameBorderTop, wallWidth, 3000),
      new Wall(2000, 0, 200, 200),
      new Wall(3000, 800, 150, 150),
      new Wall(-500, -500, 150, 150),
      new Wall(500, 1200, 100, 100),
    ];
    for (const wall of walls) {
      this.addGameObject(wall);
    }

    const gravityPlatforms = [
      new GravityPlatform(gameBorderRight, gameBorderBottom, 5000, wallWidth),
    ];
    for (const gravityPlatform of gravityPlatforms) {
      this.addGameObject(gravityPlatform);
    }

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(50, this.canvas.height - 80));
    this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 80));
    this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 80));

    this.addGameObject(new Enemy2(3 * (platformWidth + gap) + 50, this.canvas.height - 160), 4);

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(100, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(500, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(900, this.canvas.height - 100, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
