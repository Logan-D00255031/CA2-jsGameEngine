// Import the necessary classes from the 'engine' directory
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

// Define a new class, Wall, which extends (inherits from) GameObject
class Wall extends GameObject {
  
  // Define the constructor for the Wall class. It takes arguments for the x and y coordinates,
  // width, height, and color (with a default value of 'gray' if no color is provided)
  constructor(x, y, width, height, color = 'red') {
    
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    
    // Add a Renderer component to this wall with the specified color, width, and height.
    // The Renderer component is responsible for rendering the wall on the canvas
    this.addComponent(new Renderer(color, width, height));
    
    // Add a Physics component to this wall, with initial velocity, acceleration, and forces set to zero.
    // Since walls don't move, these values will remain zero throughout the game
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    
    // Set the tag property to 'wall'. This can be used to identify walls later in the game logic
    this.tag = 'wall'; 
  }
}

// Export the Wall class as the default export of this module
export default Wall;
