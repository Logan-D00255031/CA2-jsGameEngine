// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import Wall from './wall.js';
import Bullet from './bullet.js';
import GravityPlatform from './gravityPlatform.js';
import Enemy2 from './enemy2.js';

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.addComponent(new Renderer('blue', 50, 50, Images.player2, 0));
    this.renderer = new Renderer('blue', 50, 50, Images.player, 0); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 5;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 400;
    this.jumpTime = 0.1;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.hitWall = false;
    this.bulletCooldown = false;
    this.gravity = false;
    this.asteroidsLeft = 8;
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    // Gamepad input method was not updated for game
    //this.handleGamepadInput(input);
    
    // Handle player movement
    // Check if player is on a platform
    if(this.isOnPlatform) {
      // Handle player movement for platforms
      if (!this.isGamepadMovement && input.isKeyDown('KeyD') && !this.hitWall) {
        physics.acceleration.x = 300;
        this.direction = -1;
      } else if (!this.isGamepadMovement && input.isKeyDown('KeyA') && !this.hitWall) {
        physics.acceleration.x = -300;
        this.direction = 1;
      } else if (!this.isGamepadMovement) {
        physics.acceleration.x = 0;
      }
    } else {
      // If not, Handle player movement while in space
      if (!this.isGamepadMovement && input.isKeyDown('ArrowUp') && !this.hitWall) {
        physics.acceleration.x = Math.sin(this.renderer.rotation*Math.PI/180) * 600;
        physics.acceleration.y = Math.cos(this.renderer.rotation*Math.PI/180) * 600 * -1;
      } else {
        physics.acceleration.x = 0;
        physics.acceleration.y = 0;
      }
    }

    // Handle player rotation
    if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft') && !this.hitWall) {
      this.renderer.rotation -= 3;
    } else if (!this.isGamepadMovement && input.isKeyDown('ArrowRight') && !this.hitWall) {
      this.renderer.rotation += 3;
    }

    // Handle player jumping
    if (!this.isGamepadJump && input.isKeyDown('KeyW') && this.isOnPlatform) {
      this.startJump();
    }

    // Handle player shooting
    if (!this.isGamepadJump && input.isKeyDown('Space') && !this.bulletCooldown) {
      this.fireBullet();
    }

    // Check if player is jumping
    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy2);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        const newX = enemy.getComponent(Physics).velocity.x;
        const newY = enemy.getComponent(Physics).velocity.y;
        enemy.getComponent(Physics).velocity.x = physics.velocity.x;
        enemy.getComponent(Physics).velocity.y = physics.velocity.y;
        physics.velocity.x = newX;
        physics.velocity.y = newY;
        this.collidedWithEnemy();
        console.log("Collided with enemy");
      }
    }
  
    // Handle collisions with platforms
    this.isOnPlatform = false;  // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
    for (const platform of platforms) {
      // Check for collision on the right of the player
      if (physics.isCollidingRight(platform.getComponent(Physics))) {
        physics.velocity.x = 0;
        physics.acceleration.x = 0;
        this.x = platform.x - this.renderer.width;
        console.log("Colliding on right");
      } 
      // Check for collision on the left of the player
      if (physics.isCollidingLeft(platform.getComponent(Physics))) {
        physics.velocity.x = 0;
        physics.acceleration.x = 0;
        this.x = platform.x + platform.getComponent(Renderer).width;
        console.log("Colliding on left");
      } 
      // Check for collision on the top of the player
        if (physics.isCollidingTop(platform.getComponent(Physics))) {
        physics.velocity.y = 0;
        physics.acceleration.y = 0;
        this.y = platform.y + platform.getComponent(Renderer).height;
        console.log("Colliding on top");
      } 
      // Check for collision on the bottom of the player
      if (physics.isCollidingBottom(platform.getComponent(Physics))) {
        physics.velocity.y = 0;
        physics.acceleration.y = 0;
        this.y = platform.y - this.renderer.height;
        this.isOnPlatform = true;
        console.log("Colliding on bottom");
      }
    }

    // Handle collisions with walls
    const walls = this.game.gameObjects.filter((obj) => obj instanceof Wall);
    for (const wall of walls) {
      // Check for collision on the right of the player
      if (physics.isCollidingRight(wall.getComponent(Physics))) {
        this.collidedWithWall();
        this.leftWall = false;
        physics.velocity.x *= -0.1;
        //physics.velocity.y *= 0.2;
        physics.acceleration.x + 0;
        this.x = wall.x - this.renderer.width - 1;
        console.log("Colliding on right");
      } 
      // Check for collision on the left of the player
      if (physics.isCollidingLeft(wall.getComponent(Physics))) {
        this.collidedWithWall();
        this.leftWall = false;
        physics.velocity.x *= -0.1;
        //physics.velocity.y *= 0.2;
        physics.acceleration.x = 0;
        this.x = wall.x + wall.getComponent(Renderer).width + 1;
        console.log("Colliding on left");
      } 
      // Check for collision on the top of the player
      if (physics.isCollidingTop(wall.getComponent(Physics))) {
        this.collidedWithWall();
        this.leftWall = false;
        physics.velocity.y *= -0.1;
        //physics.velocity.x *= 0.2;
        physics.acceleration.y = 0;
        this.y = wall.y + wall.getComponent(Renderer).height + 1;
        console.log("Colliding on top");
      } 
      // Check for collision on the bottom of the player
      if (physics.isCollidingBottom(wall.getComponent(Physics))) {
        this.collidedWithWall();
        this.leftWall = false;
        physics.velocity.y *= -0.1;
        //physics.velocity.x *= 0.2;
        physics.acceleration.y = 0;
        this.y = wall.y - this.renderer.height - 1;
        console.log("Colliding on bottom");
      }
    }

    // Handle collisions with gravityPlatforms
    this.gravity = false;   // Reset this before checking collisions with gravity platforms
    const gravityPlatforms = this.game.gameObjects.filter((obj) => obj instanceof GravityPlatform);
    for (const gravityPlatform of gravityPlatforms) {
      // Check for collision on the right of the player
      if (physics.isCollidingRight(gravityPlatform.getComponent(Physics))) {
        physics.velocity.x = 0;
        physics.acceleration.x = 0;
        this.x = gravityPlatform.x - this.renderer.width;
        console.log("Colliding on right");
      } 
      // Check for collision on the left of the player
      if (physics.isCollidingLeft(gravityPlatform.getComponent(Physics))) {
        physics.velocity.x = 0;
        physics.acceleration.x = 0;
        this.x = gravityPlatform.x + gravityPlatform.getComponent(Renderer).width;
        console.log("Colliding on left");
      } 
      // Check for collision on the top of the player
        if (physics.isCollidingTop(gravityPlatform.getComponent(Physics))) {
        physics.velocity.y = 0;
        physics.acceleration.y = 0;
        this.y = gravityPlatform.y + gravityPlatform.getComponent(Renderer).height;
        console.log("Colliding on top");
      } 
      // Check for collision on the bottom of the player
      if (physics.isCollidingBottom(gravityPlatform.getComponent(Physics))) {
        physics.velocity.y = 0;
        physics.acceleration.y = 0;
        this.y = gravityPlatform.y - this.renderer.height;
        this.isOnPlatform = true;
        console.log("Colliding on bottom");
      }
      // Check if the player is within the gravityPlatform's gravity
      if (physics.isAffectedByGravity(gravityPlatform.getComponent(Physics), 500)) {
        this.gravity = true;
      }
    }

    // Check if player is not affected by gravity
    if(!this.gravity)
    {
      physics.gravity.y = 10;
    } else {
      physics.gravity.y = 500;
    }

    console.log("Gravity Y: " + physics.gravity.y);
  
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height + 2000) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      location.reload();
    }

    // Check if player has destroyed all asteroids
    if (this.asteroidsLeft <= 0) {
      console.log('You win!');
      location.reload();
    }

    // Log player position before next update
    // Used when handling collisions
    this.oldX = this.x;
    this.oldY = this.y;
    
    super.update(deltaTime);
  }

  // This method has not been updated and does not have the updated control scheme as I couldn't get to test the game out with a gamepad
  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 100;
        this.direction = -1;
      } 
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -100;
        this.direction = 1;
      } 
      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.isOnPlatform) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
    }
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    // Add health to player if not at max
    if(this.lives < 5) {
      this.lives += collectible.value;
      console.log(`Health: ${this.lives}`);
    }
    this.emitCollectParticles(collectible);
  }

  emitCollectParticles(collectible) {
    // Create a particle system at the collectible's position when a collectible is collected
    const particleSystem = new ParticleSystem(collectible.x, collectible.y, 'lime', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = this.game.canvas.width / 2;
    this.y = 1800;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 5;
    this.score = 0;
    this.asteroidsLeft = 8;
    this.resetPlayerState();
  }

  collidedWithWall() {
    // Checks collision with a wall and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
      // Set the hit wall check to false after 0.5 seconds
      this.hitWall = true;
      setTimeout(() => {
        this.hitWall = false;
      }, 500);
    }
  }

  fireBullet() {
    // Check if the player can fire a bullet again
    if(!this.bulletCooldown) {
      // Create a bullet in front of the player's gun.
      const bullet = new Bullet(this.x + (this.renderer.width/2 - 15) + Math.sin(this.renderer.rotation*Math.PI/180) * 25, this.y + (this.renderer.height/2) - 15 + (Math.cos(this.renderer.rotation*Math.PI/180) * 25 * -1), this.renderer.rotation);
      this.game.addGameObject(bullet);
      // Let the player fire again after 0.2 seconds
      this.bulletCooldown = true;
      setTimeout(() => {
        this.bulletCooldown = false;
      }, 200);
    }
  }
  
}

export default Player;
