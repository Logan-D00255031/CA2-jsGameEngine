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
import Enemy from './enemy.js';
import Enemy2 from './enemy.js';
import Platform from './platform.js';
import Wall from './wall.js';
import ParticleSystem from '../engine/particleSystem.js';

// Define a new class, Bullet, which extends (i.e., inherits from) GameObject
class Bullet extends GameObject {

    // Define the constructor for this class, which takes two arguments for the x and y coordinates
    constructor(x, y, rotation = 0) {
        // Call the constructor of the superclass (GameObject) with the x and y coordinates
        super(x, y);
        // Add a Renderer component to this bullet, responsible for rendering it in the game.
        this.addComponent(new Renderer('white', 30, 30, Images.bullet, rotation));
        // Add a Physics component to this bullet, responsible for managing its physical interactions
        this.addComponent(new Physics({ x: Math.sin(rotation*Math.PI/180) * 500, y: Math.cos(rotation*Math.PI/180) * -1 * 500}, { x: 0, y: 0 }, { x: 0, y: 0 }));
    }

    update(deltaTime) {
        // Get the Physics component of this bullet
        const physics = this.getComponent(Physics);

        // Handle collisions with platforms
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for (const platform of platforms) {
            // Check for collision on the right of the bullet
            if (physics.isCollidingRight(platform.getComponent(Physics))) {
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
                this.game.removeGameObject(this);
                this.emitHitParticles();
            }
        }

        // Handle collisions with walls
        const walls = this.game.gameObjects.filter((obj) => obj instanceof Wall);
        for (const wall of walls) {
            // Check for collision on the right of the bullet
            if (physics.isCollidingRight(wall.getComponent(Physics))) {
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
                this.game.removeGameObject(this);
                this.emitHitParticles();
            }
        }
        
        // Log player position before next update
        // Used when handling collisions
        this.oldX = this.x;
        this.oldY = this.y;

        super.update(deltaTime);
    }

    emitHitParticles() {
        // Get the Physics component of this bullet
        const physics = this.getComponent(Physics);

        // Check what direction bullet is travelling for particle gravity.
        if(physics.velocity.x > 0) {
            this.gravityX = -50;
        } else {
            this.gravityX = 50;
        }
        if(physics.velocity.y > 0) {
            this.gravityY = -50;
        } else {
            this.gravityY = 50;
        }

        // Create a particle system at the collectible's position when a collectible is collected
        const particleSystem = new ParticleSystem(this.x, this.y, 'white', 20, 1, 0.5, { x: this.gravityX, y: this.gravityY});
        this.game.addGameObject(particleSystem);
    }

}

// Export the Bullet class as the default export of this module
export default Bullet;