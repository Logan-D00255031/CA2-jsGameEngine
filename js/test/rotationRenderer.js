// Import the required modules and classes.
import Renderer from '../engine/renderer.js';

// The RotationRenderer class extends Renderer and handles the visual representation of a game object.
class RotationRenderer extends Renderer {
  // The constructor initializes the renderer component with optional color, width, height, and image.
  constructor(color, width, height, image, rotation = 0) {
    super(); // Call the parent constructor.
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
      // If a rotaion value is provided, rotate the game object the specified degrees.
      if (this.rotation != null) {
        // Create a new canvas the size of the image and create a context from it,
        // Use that context to rotate the image in its centre and draw it on the new canvas,
        // Then use that canvas as the image to draw on the game canvas.
        this.newCanvas = document.createElement("canvas");
        this.newCanvas.width = w;
        this.newCanvas.height = h;
        this.newCtx = this.newCanvas.getContext("2d");
        this.newCtx.save();
        this.newCtx.translate( w/2, h/2 );
        this.newCtx.rotate(Math.abs(this.rotation)*Math.PI/180);
        this.newCtx.translate( -w/2, -h/2 );
        this.newCtx.drawImage(this.image, 0, 0, h, h);
        this.newCtx.restore();

        ctx.drawImage(this.newCanvas, 0, 0, w, h);
      }
      else {
        ctx.drawImage(this.image, x, y, w, h);
      }
    } else {
      // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
      ctx.save();
      ctx.fillStyle = this.color;
      // If a rotaion value is provided, rotate the game object the specified degrees.
      if (this.rotation != 0) {
        ctx.rotate(this.rotation*Math.PI/180);
      }
      ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
      ctx.restore();
    }
  }
}

// The Renderer class is then exported as the default export of this module.
export default Renderer;
