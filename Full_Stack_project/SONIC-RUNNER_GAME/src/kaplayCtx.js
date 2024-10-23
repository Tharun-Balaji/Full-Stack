// Import the kaplay context, which provides functionality for game development
import kaplay from 'kaplay';

/**
 * The main game context.
 */
const k = kaplay({
  width: 1920, // Set the width of the game window
  height: 1080, // Set the height of the game window
  letterbox: true, // Enable letterboxing to maintain aspect ratio
  background: [0, 0, 0], // Set the background color to black
  global: false, // Disable global mode (not sure what this does)
  touchToMouse: true, // Enable touch input to simulate mouse input
  buttons: {
    jump: {
      keyboard: ['space'], // Map the 'jump' button to the spacebar key
      mouse: 'left' // Map the 'jump' button to the left mouse button
    }
  },
  debugKey: 'd', // Set the key to toggle debug mode
  debug: true // Enable debug mode
});

export default k; // Export the game context for use in other files