// Import the required modules and classes.
import Component from './component.js';

// The Renderer class extends Component and handles the visual representation of a game object.
class Renderer extends Component {
  // The constructor initializes the renderer component with optional color, width, height, and image.
  constructor(color = 'white', width = 50, height = 50, image = null, rotation = 0) {
    super(); // Call the parent constructor.
    this.color = color; // Initialize the color.
    this.width = width; // Initialize the width.
    this.height = height; // Initialize the height.
    this.image = image; // Initialize the image.
    this.rotation = rotation //Initialize the rotation.
  }

  // The draw method handles rendering the game object on the canvas.
  draw(ctx) {
    // If an image is provided and it has finished loading, draw the image.
    if (this.image && this.image.complete) {
      // Get the position and dimensions of the game object.
      const x = this.gameObject.x;
      const y = this.gameObject.y;
      const w = this.width;
      const h = this.height;
      // Check if the image should be flipped horizontally based on the direction of the game object.
      const flipX = this.gameObject.direction === -1;
      if (!flipX) {
        // If the image should not be flipped, draw it as is.
        // If a rotaion value is provided, rotate the game object the specified degrees.
        if (this.rotation > 0) {
          ctx.save();
          ctx.translate(x + w, y);
          ctx.rotate(this.rotation*Math.PI/180);
          ctx.drawImage(this.image, 0, 0, w, h);
          ctx.restore();
        }
        else {
          ctx.drawImage(this.image, x, y, w, h);
        }
      } else {
        // If the image should be flipped, save the current drawing state,
        // translate and scale the drawing context to flip the image,
        // draw the image, and then restore the drawing state.
        ctx.save();
        ctx.translate(x + w, y);
        ctx.scale(-1, 1);
        // If a rotaion value is provided, rotate the game object the specified degrees.
        if (this.rotation > 0) {
          ctx.rotate(this.rotation*Math.PI/180);
          ctx.drawImage(this.image, 0, 0, w, h);
        }
        else {
          ctx.drawImage(this.image, 0, 0, w, h);
        }
        ctx.restore();
      }
    } else {
      // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
      ctx.save();
      ctx.fillStyle = this.color;
      // If a rotaion value is provided, rotate the game object the specified degrees.
      if (this.rotation > 0) {
        ctx.rotate(this.rotation*Math.PI/180);
      }
      ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
      ctx.restore();
    }
  }
}

// The Renderer class is then exported as the default export of this module.
export default Renderer;
