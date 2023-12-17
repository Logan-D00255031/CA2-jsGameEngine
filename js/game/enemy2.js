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
import GravityPlatform from './gravityPlatform.js';
import ParticleSystem from '../engine/particleSystem.js';

// Define a new class, Enemy, which extends (i.e., inherits from) GameObject
class Enemy2 extends GameObject {

  // Define the constructor for this class, which takes two arguments for the x and y coordinates
  constructor(x, y, size = 4, velocity =  { x: -200 , y: 100 }) {
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    
    // Add a Renderer component to this enemy, responsible for rendering it in the game.
    // The renderer uses the color 'green', dimensions 50x50, and an enemy image from the Images object
    this.addComponent(new Renderer('green', size * 25, size * 25, Images.enemy2));
    
    // Add a Physics component to this enemy, responsible for managing its physical interactions
    // Sets the initial velocity and acceleration
    this.addComponent(new Physics({ x: velocity.x, y: velocity.y }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    
    // Initialize variables related to enemy's movement
    this.movingRight = false;
    this.size = size;
    //console.log(this.size);
    //console.log(this.getComponent(Physics).velocity.x);
  }

  // Define an update method that will run every frame of the game. It takes deltaTime as an argument
  // which represents the time passed since the last frame
  update(deltaTime) {
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);
    // Get the Renderer component of this enemy
    this.renderer = this.getComponent(Renderer);

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
        this.x = platform.x - this.renderer.width;
        console.log("Colliding on right");
      } 
      // Check for collision on the left of the enemy
      if (physics.isCollidingLeft(platform.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.x = platform.x + platform.getComponent(Renderer).width;
        console.log("Colliding on left");
      } 
      // Check for collision on the top of the enemy
        if (physics.isCollidingTop(platform.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = platform.y + platform.getComponent(Renderer).height;
        console.log("Colliding on top");
      } 
      // Check for collision on the bottom of the enemy
      if (physics.isCollidingBottom(platform.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = platform.y - this.renderer.height;
        console.log("Colliding on bottom");
      }
    }

    // Check if the enemy is colliding with any walls
    const walls = this.game.gameObjects.filter(obj => obj instanceof Wall);
    for (const wall of walls) {
      // Check for collision on the right of the enemy
      if (physics.isCollidingRight(wall.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.x = wall.x - this.renderer.width;
        console.log("Colliding on right");
      } 
      // Check for collision on the left of the enemy
      if (physics.isCollidingLeft(wall.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.x = wall.x + wall.getComponent(Renderer).width;
        console.log("Colliding on left");
      } 
      // Check for collision on the top of the enemy
        if (physics.isCollidingTop(wall.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = wall.y + wall.getComponent(Renderer).height;
        console.log("Colliding on top");
      } 
      // Check for collision on the bottom of the enemy
      if (physics.isCollidingBottom(wall.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = wall.y - this.renderer.height;
        console.log("Colliding on bottom");
      }
    }

    // Check if the enemy is colliding with any gravityPlatforms
    const gravityPlatforms = this.game.gameObjects.filter(obj => obj instanceof GravityPlatform);
    for (const gravityPlatform of gravityPlatforms) {
      // Check for collision on the right of the enemy
      if (physics.isCollidingRight(gravityPlatform.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.x = gravityPlatform.x - this.renderer.width;
        console.log("Colliding on right");
      } 
      // Check for collision on the left of the enemy
      if (physics.isCollidingLeft(gravityPlatform.getComponent(Physics))) {
        physics.velocity.x *= -1;
        physics.acceleration.x *= -1;
        this.x = gravityPlatform.x + gravityPlatform.getComponent(Renderer).width;
        console.log("Colliding on left");
      } 
      // Check for collision on the top of the enemy
        if (physics.isCollidingTop(gravityPlatform.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = gravityPlatform.y + gravityPlatform.getComponent(Renderer).height;
        console.log("Colliding on top");
      } 
      // Check for collision on the bottom of the enemy
      if (physics.isCollidingBottom(gravityPlatform.getComponent(Physics))) {
        physics.velocity.y *= -1;
        physics.acceleration.y *= -1;
        this.y = gravityPlatform.y - this.renderer.height;
        console.log("Colliding on bottom");
      }
    }

    this.oldX = this.x;
    this.oldY = this.y;
    
    // Call the update method of the superclass (GameObject), passing along deltaTime
    super.update(deltaTime);
  }

  splitHorizontal(hitObject) {
    const player = this.game.gameObjects.find(obj => obj instanceof Player);
    player.score += 30 - (this.size * 5);
    this.emitHitParticles();
    this.game.removeGameObject(this);
    this.size -= 1;
    const w = this.size * 25;
    const physics = hitObject.getComponent(Physics);
    this.renderer = this.getComponent(Renderer);
    if(this.size > 0) {
      const split1 = new Enemy2(this.x + this.renderer.width/2 - w/2, this.y + this.renderer.height/2 - w/2, this.size, { x: physics.velocity.x/3, y: physics.velocity.y/4 });
      const split2 = new Enemy2(this.x + this.renderer.width/2 - w/2, this.y + this.renderer.height/2 - w/2, this.size, { x: physics.velocity.x/3, y: -physics.velocity.y/4 });
      this.game.addGameObject(split1);
      this.game.addGameObject(split2);
    }
  }

  splitVertical(hitObject) {
    const player = this.game.gameObjects.find(obj => obj instanceof Player);
    player.score += 30 - (this.size * 5);
    this.emitHitParticles();
    this.game.removeGameObject(this);
    this.size -= 1;
    const w = this.size * 25;
    const physics = hitObject.getComponent(Physics);
    this.renderer = this.getComponent(Renderer);
    if(this.size > 0) {
      const split1 = new Enemy2(this.x + this.renderer.width/2 - w/2, this.y + this.renderer.height/2 - w/2, this.size, { x: physics.velocity.x/4, y: physics.velocity.y/3 });
      const split2 = new Enemy2(this.x + this.renderer.width/2 - w/2, this.y + this.renderer.height/2 - w/2, this.size, { x: -physics.velocity.x/4, y: physics.velocity.y/3 });
      this.game.addGameObject(split1);
      this.game.addGameObject(split2);
    }
  }

  emitHitParticles() {
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);
    // Get the Renderer component of this enemy
    this.renderer = this.getComponent(Renderer);

    // Check what direction bullet is travelling for particle gravity.
    this.gravityX = physics.velocity.x * -0.1;
    this.gravityY = physics.velocity.y * -0.1;

    // Create a particle system at the centre of the enemy's sprite
    const particleSystem = new ParticleSystem(this.x + this.renderer.width, this.y + this.renderer.height, 'gray', 20, 0.5, 1, { x: this.gravityX, y: this.gravityY});
    this.game.addGameObject(particleSystem);
  }

}

// Export the Enemy2 class as the default export of this module
export default Enemy2;
