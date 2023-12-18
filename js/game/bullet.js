// Import the GameObject class from the 'engine' directory
import GameObject from '../engine/gameobject.js';

// Import the Renderer class from the 'engine' directory
import Renderer from '../engine/renderer.js';

// Import the Physics class from the 'engine' directory
import Physics from '../engine/physics.js';

// Import the Images object from the 'engine' directory. This object contains all the game's image resources
import {Images} from '../engine/resources.js';

// Import the ParticleSystem class from the 'engine' directory
import ParticleSystem from '../engine/particleSystem.js';

// Import the appropriate classes from the current directory
import Enemy2 from './enemy2.js';
import Platform from './platform.js';
import Wall from './wall.js';
import GravityPlatform from './gravityPlatform.js';

// Define a new class, Bullet, which extends (i.e., inherits from) GameObject
class Bullet extends GameObject {

    // Define the constructor for this class, which takes three arguments for the x and y coordinates and the rotation
    constructor(x, y, rotation = 0) {
        // Call the constructor of the superclass (GameObject) with the x and y coordinates
        super(x, y);
        // Add a Renderer component to this bullet, responsible for rendering it in the game.
        this.addComponent(new Renderer('white', 30, 30, Images.bullet, rotation));
        // Add a Physics component to this bullet, responsible for managing its physical interactions
        this.addComponent(new Physics({ x: Math.sin(rotation*Math.PI/180) * 1000, y: Math.cos(rotation*Math.PI/180) * -1 * 1000}, { x: 0, y: 0 }, { x: 0, y: 0 }));
        // Initialize variables related to the bullet's movement
        this.movementDistance = 0;
        this.movementLimit = 1500;
    }

    update(deltaTime) {
        // Get the Physics component of this bullet
        const physics = this.getComponent(Physics);
        const renderer = this.getComponent(Renderer);

        // Check if the bullets has not reached its movement limit
        if (this.movementDistance < this.movementLimit) {
            this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
            this.movementDistance += Math.abs(physics.velocity.y) * deltaTime;
        } else {
            // If it reached the limit, remove the bullet from the game
            this.game.removeGameObject(this);
        }

        // Handle collisions with bullets
        const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy2);
        for (const enemy of enemies) {
            // Check for collision on the right of the enemy
            if (physics.isCollidingRight(enemy.getComponent(Physics))) {
                enemy.splitHorizontal(this);
                this.x += renderer.width;
                this.y += renderer.height/2;
                this.game.removeGameObject(this);
                console.log("Colliding on right");
            } 
            // Check for collision on the left of the enemy
            if (physics.isCollidingLeft(enemy.getComponent(Physics))) {
                enemy.splitHorizontal(this);
                this.game.removeGameObject(this);
                console.log("Colliding on left");
            } 
            // Check for collision on the top of the enemy
            if (physics.isCollidingTop(enemy.getComponent(Physics))) {
                enemy.splitVertical(this);
                this.game.removeGameObject(this);
                console.log("Colliding on top");
            } 
            // Check for collision on the bottom of the enemy
            if (physics.isCollidingBottom(enemy.getComponent(Physics))) {
                enemy.splitVertical(this);
                this.x += renderer.width/2;
                this.y += renderer.height;
                this.game.removeGameObject(this);
                console.log("Colliding on bottom");
            }
        }

        // Handle collisions with platforms
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for (const platform of platforms) {
            // Check for collision on the right of the bullet
            if (physics.isCollidingRight(platform.getComponent(Physics))) {
                this.x += renderer.width;
                this.y += renderer.height/2;
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the left of the bullet
            if (physics.isCollidingLeft(platform.getComponent(Physics))) {
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the top of the bullet
                if (physics.isCollidingTop(platform.getComponent(Physics))) {
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the bottom of the bullet
            if (physics.isCollidingBottom(platform.getComponent(Physics))) {
                this.x += renderer.width/2;
                this.y += renderer.height;
                this.game.removeGameObject(this);
                this.emitHitParticles();
            }
        }

        // Handle collisions with walls
        const walls = this.game.gameObjects.filter((obj) => obj instanceof Wall);
        for (const wall of walls) {
            // Check for collision on the right of the bullet
            if (physics.isCollidingRight(wall.getComponent(Physics))) {
                this.x += renderer.width;
                this.y += renderer.height/2;
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the left of the bullet
            if (physics.isCollidingLeft(wall.getComponent(Physics))) {
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the top of the bullet
            if (physics.isCollidingTop(wall.getComponent(Physics))) {
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the bottom of the bullet
            if (physics.isCollidingBottom(wall.getComponent(Physics))) {
                this.x += renderer.width/2;
                this.y += renderer.height;
                this.game.removeGameObject(this);
                this.emitHitParticles();
            }
        }

        // Handle collisions with gravityPlatforms
        const gravityPlatforms = this.game.gameObjects.filter((obj) => obj instanceof GravityPlatform);
        for (const gravityPlatform of gravityPlatforms) {
            // Check for collision on the right of the bullet
            if (physics.isCollidingRight(gravityPlatform.getComponent(Physics))) {
                this.x += renderer.width;
                this.y += renderer.height/2;
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the left of the bullet
            if (physics.isCollidingLeft(gravityPlatform.getComponent(Physics))) {
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the top of the bullet
                if (physics.isCollidingTop(gravityPlatform.getComponent(Physics))) {
                this.game.removeGameObject(this);
                this.emitHitParticles();
            } 
            // Check for collision on the bottom of the bullet
            if (physics.isCollidingBottom(gravityPlatform.getComponent(Physics))) {
                this.x += renderer.width/2;
                this.y += renderer.height;
                this.game.removeGameObject(this);
                this.emitHitParticles();
            }
        }
        
        // Log bullet position before next update
        // Used when handling collisions
        this.oldX = this.x;
        this.oldY = this.y;

        super.update(deltaTime);
    }

    emitHitParticles() {
        // Get the Physics component of this bullet
        const physics = this.getComponent(Physics);

        // Check what direction bullet is travelling for particle gravity.
        this.gravityX = physics.velocity.x * -0.1;
        this.gravityY = physics.velocity.y * -0.1;

        // Create a particle system at the bullet's position
        const particleSystem = new ParticleSystem(this.x, this.y, 'white', 20, 0.5, 0.5, { x: this.gravityX, y: this.gravityY});
        this.game.addGameObject(particleSystem);
    }

}

// Export the Bullet class as the default export of this module
export default Bullet;