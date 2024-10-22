// Import the kaplay context, which provides functionality for game development
import { makeSonic } from '../entities/sonic';
import k from '../kaplayCtx';

// Define the MainMenu function, which represents the main menu scene of the game
function MainMenu() {

  // Check if the best score data exists; if not, set it to 0
  if (!k.getData('best-score')) { // if best score doesn't exist
    k.setData('best-score', 0);
  };

  // Set up an event listener for the 'jump' button press
  k.onButtonPress('jump', () => { // when jump button is pressed
    // Transition to the 'game' scene when the 'jump' button is pressed
    k.go('game'); // go to game scene
  });

  // Define the width of each background piece
  const bgPieceWidth = 1920; // background piece width

  // Create an array of background pieces
  const bgPieces = [ // background pieces
    // Add the first background piece to the scene
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]), // first background piece
    // Add the second background piece to the scene, positioned to the right of the first piece
    k.add([k.sprite('chemical-bg'), k.pos(bgPieceWidth, 0), k.scale(2), k.opacity(0.8)]) // second background piece
  ];


  // Create an array of platforms
  const platforms = [ // platforms
    // Add the first platform to the scene
    k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(4)]), // first platform
    // Add the second platform to the scene, positioned to the right of the first platform
    k.add([k.sprite('platforms'), k.pos(384, 450), k.scale(4)]), // second platform
  ];

  k.add([
    k.text('SONIC RING RUN',
      {
        font: 'mania',
        size: 96,
      }
    ),
    k.pos(k.center().x, 200),
    k.anchor('center')
  ]);

  k.add([
    k.text('Press Space/Click/Touch to Play', { font: 'mania', size: 32 }),
    k.anchor('center'),
    k.pos(k.center().x, k.center().y - 200),
  ]); 

  makeSonic(k.vec2(200, 745));

  // Set up an event listener for the update loop
  k.onUpdate(() => {  // on update
    // Check if the second background piece has moved off the screen to the left
    if (bgPieces[1].pos.x < 0) {
      // Move the first background piece to the position of the second piece, effectively wrapping it around to the right
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0); // move first background piece to second
      // Remove the first background piece from the array and add it to the end, effectively moving it to the right
      bgPieces.push(bgPieces.shift()); // add first background piece to second
    }

    // Move the first background piece to the left
    bgPieces[0].move(-100, 0); // move first background piece to left
    // Move the second background piece to the position of the first piece, effectively wrapping it around to the right
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0); // move second background piece to first

  });

};

// Export the MainMenu function as the default export
export default MainMenu;