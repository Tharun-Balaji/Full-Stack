// Import the kaplay context, which provides functionality for game development
import k from '../kaplayCtx';

/**
 * The disclaimer scene.
 */
function disclaimer() {
  // Add a text element to the scene with a disclaimer message
  k.add([
    k.text(
      `
        Sonic is owned by SEGA.
        This is a fangame made by Tharun Balaji using assets from Sonic Mania
      `,
      { font: 'mania', size: 32 }
    ),
  ]);

  // Add a text element to the scene with a prompt to start the game
  k.add([
    k.text('Press Space/Click/Touch to Start The Game', {
      font: 'mania',
      size: 64,
    }),
    // Center the text element horizontally
    k.anchor('center'),
    // Position the text element at the center of the screen
    k.pos(k.center()),
  ]);

  // Listen for the 'jump' button press event and transition to the main menu scene
  k.onButtonPress('jump', () => k.go('main-menu'));
};

// Export the disclaimer function
export default disclaimer;