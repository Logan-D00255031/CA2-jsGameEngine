// Import the necessary classes from the 'engine' directory
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

// Define a new class, GravityPlatform, which extends (inherits from) GameObject
class GravityPlatform extends GameObject {
  
  // Define the constructor for the GravityPlatform class. It takes arguments for the x and y coordinates,
  // width, height, and color (with a default value of 'gray' if no color is provided)
  constructor(x, y, width, height, color = 'gray') {
    
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    
    // Add a Renderer component to this gravityPlatform with the specified color, width, and height.
    // The Renderer component is responsible for rendering the gravityPlatform on the canvas
    this.addComponent(new Renderer(color, width, height));
    
    // Add a Physics component to this gravityPlatform, with initial velocity, acceleration, and forces set to zero.
    // Since gravityPlatforms don't move, these values will remain zero throughout the game
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    
    // Set the tag property to 'gravityPlatform'. This can be used to identify gravityPlatforms later in the game logic
    this.tag = 'gravityPlatform'; 
  }
}

// Export the GravityPlatform class as the default export of this module
export default GravityPlatform;
