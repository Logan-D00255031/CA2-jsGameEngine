// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
  enemy2: new Image(), // The Image instance for the enemy2.
  bullet: new Image(), // The Image instance for the bullet.
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump.mp3', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player.src = './resources/images/player/square.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/Green-Slime.png'; // Update the image path

// Set the source of the enemy2 image.
Images.enemy2.src = './resources/images/enemy/enemy2.png'; // Update the image path

// Set the source of the bullet image.
Images.bullet.src = './resources/images/bullet.png'; // Update the image path

const Animations = {
  playerMove: "./resources/animations/player/move/1.png",
};

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
