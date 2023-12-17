// Import the GameObject class from the 'engine' directory
import GameObject from '../engine/gameobject.js';

// Import the Renderer class from the 'engine' directory
import Renderer from '../engine/renderer.js';

// Import the Physics class from the 'engine' directory
import Physics from '../engine/physics.js';

// Import the Images object from the 'engine' directory. This object contains all the game's image resources
import {Images} from '../engine/resources.js';

// Import the Player and Platform classes from the current directory
import Player from './player.js';
import Platform from './platform.js';
import Wall from './wall.js';
import Bullet from './bullet.js';

// Define a new class, Enemy, which extends (i.e., inherits from) GameObject
class Enemy2 extends GameObject {

  // Define the constructor for this class, which takes two arguments for the x and y coordinates
  constructor(x, y) {
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    
    // Add a Renderer component to this enemy, responsible for rendering it in the game.
    // The renderer uses the color 'green', dimensions 50x50, and an enemy image from the Images object
    this.addComponent(new Renderer('green', 100, 100, Images.enemy2));
    
    // Add a Physics component to this enemy, responsible for managing its physical interactions
    // Sets the initial velocity and acceleration
    this.addComponent(new Physics({ x: 200, y: 100 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    
    // Initialize variables related to enemy's movement
    this.movementDistance = 0;
    this.movementLimit = 100;
    this.movingRight = false;
  }

  // Define an update method that will run every frame of the game. It takes deltaTime as an argument
  // which represents the time passed since the last frame
  update(deltaTime) {
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);
    this.renderer = this.getComponent(Renderer);

    // Check if the enemy is moving to the right
    if (this.movingRight) {
        physics.velocity.x = 200;
    } else {
        physics.velocity.x = -200;
    }

    // Handle collisions with bullets
    const bullets = this.game.gameObjects.filter((obj) => obj instanceof Bullet);
    for (const bullet of bullets) {
        if (physics.isColliding(bullet.getComponent(Physics))) {
            this.game.removeGameObject(bullet);
            bullet.emitHitParticles();
        }
    }

    // Check if the enemy is colliding with the player
    const player = this.game.gameObjects.find(obj => obj instanceof Player);
    if (physics.isColliding(player.getComponent(Physics))) {
      player.collidedWithEnemy();
    }

    // Check if the enemy is colliding with any platforms
    const platforms = this.game.gameObjects.filter(obj => obj instanceof Platform);
    for (const platform of platforms) {
      // Check for collision on the right of the enemy
      if (physics.isCollidingRight(platform.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.movingRight = false;
        this.x = platform.x - this.renderer.width;
        console.log("Colliding on right")
      } 
      // Check for collision on the left of the enemy
      if (physics.isCollidingLeft(platform.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.movingRight = true;
        this.x = platform.x + platform.getComponent(Renderer).width;
        console.log("Colliding on left")
      } 
      // Check for collision on the top of the enemy
        if (physics.isCollidingTop(platform.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = platform.y + platform.getComponent(Renderer).height;
        console.log("Colliding on top")
      } 
      // Check for collision on the bottom of the enemy
      if (physics.isCollidingBottom(platform.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = platform.y - this.renderer.height;
        console.log("Colliding on bottom")
      }
    }

    // Check if the enemy is colliding with any walls
    const walls = this.game.gameObjects.filter(obj => obj instanceof Wall);
    for (const wall of walls) {
      // Check for collision on the right of the enemy
      if (physics.isCollidingRight(wall.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.movingRight = false;
        this.x = wall.x - this.renderer.width;
        console.log("Colliding on right")
      } 
      // Check for collision on the left of the enemy
      if (physics.isCollidingLeft(wall.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.movingRight = true;
        this.x = wall.x + wall.getComponent(Renderer).width;
        console.log("Colliding on left")
      } 
      // Check for collision on the top of the enemy
        if (physics.isCollidingTop(wall.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = wall.y + wall.getComponent(Renderer).height;
        console.log("Colliding on top")
      } 
      // Check for collision on the bottom of the enemy
      if (physics.isCollidingBottom(wall.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = wall.y - this.renderer.height;
        console.log("Colliding on bottom")
      }
    }

    this.oldX = this.x;
    this.oldY = this.y;

    // Call the update method of the superclass (GameObject), passing along deltaTime
    super.update(deltaTime);
  }
}

// Export the Enemy class as the default export of this module
export default Enemy2;
