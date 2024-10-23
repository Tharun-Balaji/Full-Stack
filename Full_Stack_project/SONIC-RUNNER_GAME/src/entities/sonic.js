// Import the kaplay context, which provides functionality for game development
import k from '../kaplayCtx';

/** 
 * Creates a new Sonic entity at the specified position.
 */
export function makeSonic(pos) {
  // Create a new entity using the kaplay context's add method
  const sonic = k.add([
    // Set the sprite of the entity to 'sonic' and play the 'run' animation
    k.sprite('sonic', { anim: 'run' }),
    // Scale the entity by a factor of 4
    k.scale(4),
    // Set the area of the entity (not specified, so defaults will be used)
    k.area(),
    // Set the anchor point of the entity to its center
    k.anchor('center'),
    // Set the position of the entity to the specified position
    k.pos(pos),
    // Set the entity's body properties, including the jump force
    k.body({ jumpForce: 1700 }),
    // Add custom properties and methods to the entity
    {
      // Initialize the ringCollectUI property to null
      ringCollectUI: null,
      /**
       * Sets up the controls for Sonic, including the jump button press event.
       */
      setControls() {
        // Listen for the 'jump' button press event
        k.onButtonPress('jump', () => {
          // Check if Sonic is grounded before allowing him to jump
          if (this.isGrounded()) {
            // Play the 'jump' animation
            this.play('jump');
            // Make Sonic jump
            this.jump();
            // Play the jump sound effect
            k.play('jump', { volume: 0.5 });
          }
        });
      },
      /**
       * Sets up the events for Sonic, including the onGround event.
       */
      setEvents() {
        // Listen for the onGround event
        this.onGround(() => {
          // Play the 'run' animation when Sonic is on the ground
          this.play('run');
        });
      },
    },
  ]);

  // Add a ring collect UI element to Sonic
  sonic.ringCollectUI = sonic.add([
    // Create a text element to display the ring count
    k.text('', { font: 'mania', size: 24 }),
    // Set the color of the text to yellow
    k.color(255, 255, 0),
    // Set the anchor point of the text to its center
    k.anchor('center'),
    // Set the position of the text relative to Sonic
    k.pos(30, -10),
  ]);

  // Return the newly created Sonic entity
  return sonic;
}