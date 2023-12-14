// Import the required modules and classes.
import Component from './component.js';

// The Renderer class extends Component and handles the visual representation of a game object.
class Renderer extends Component {
  // The constructor initializes the renderer component with optional color, width, height, and image.
  constructor(color = 'white', width = 50, height = 50, image = null, rotation = null) {
    super(); // Call the parent constructor.
    this.color = color; // Initialize the color.
    this.width = width; // Initialize the width.
    this.height = height; // Initialize the height.
    this.image = image; // Initialize the image.
    this.rotation = rotation //Initialize the rotation.
  }

  // The draw method handles rendering the game object on the canvas.
  draw(ctx) {
    // If a rotaion value is provided, rotate the game object the specified degrees.
    if(this.rotation != null) {
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
          // Then use that new canvas as the image to draw on the game canvas.
          // Learned from Youtube video: https://youtu.be/uNkFZWp4ywg?si=uM-H83LCc2wu3xIW
          this.newCanvas = document.createElement("canvas");
          this.newCanvas.width = w;
          this.newCanvas.height = h;
          this.newCtx = this.newCanvas.getContext("2d");
          this.newCtx.save();
          this.newCtx.translate( w/2, h/2 );
          this.newCtx.rotate(this.rotation*Math.PI/180);
          this.newCtx.translate( -w/2, -h/2 );
          this.newCtx.drawImage(this.image, 0, 0, w, h);
          this.newCtx.restore();

          ctx.drawImage(this.newCanvas, x, y, w, h);
        }
        else {
          ctx.drawImage(this.image, x, y, w, h);
        }
      } else {
        // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
        // Create a new canvas the size of the rectangle and create a context from it,
        // Use that context to rotate the rectangle in its centre and draw it on the new canvas,
        // Then use that canvas as the image to draw on the game canvas.
        // Learned from Youtube video: https://youtu.be/uNkFZWp4ywg?si=uM-H83LCc2wu3xIW
        // --- NOT WORKING ---
        this.newCanvas = document.createElement("canvas");
        this.newCanvas.width = w;
        this.newCanvas.height = h;
        this.newCtx = this.newCanvas.getContext("2d");
        this.newCtx.save();
        this.newCtx.translate( w/2, h/2 );
        this.newCtx.rotate(this.rotation*Math.PI/180);
        this.newCtx.translate( -w/2, -h/2 );
        this.newCtx.fillStyle = this.color;
        this.newCtx.fillRect(x, y, w, h);
        this.newCtx.restore();

        ctx.drawImage(this.newCanvas, x, y, w, h);
      }
    } else {
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
          ctx.drawImage(this.image, x, y, w, h);
        } else {
        // If the image should be flipped, save the current drawing state,
        // translate and scale the drawing context to flip the image,
        // draw the image, and then restore the drawing state.
        ctx.save();
        ctx.translate(x + w, y);
        ctx.scale(-1, 1);
        ctx.drawImage(this.image, 0, 0, w, h);
        ctx.restore();
        }
      } else {
        // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
        ctx.fillStyle = this.color;
        ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
      }
    }
  }
}

// The Renderer class is then exported as the default export of this module.
export default Renderer;
