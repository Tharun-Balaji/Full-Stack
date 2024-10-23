// Import the kaplay context, which provides functionality for game development
import k from '../kaplayCtx';

/**
 * Creates a new ring entity at the specified position.
 */
export function makeRing(pos) {
  // Create a new entity using the kaplay context's add method
  return k.add([
    // Set the sprite of the entity to 'ring' and play the 'spin' animation
    k.sprite('ring', { anim: 'spin' }),
    // Set the area of the entity (not specified, so defaults will be used)
    k.area(),
    // Scale the entity by a factor of 4
    k.scale(4),
    // Set the anchor point of the entity to its center
    k.anchor('center'),
    // Set the position of the entity to the specified position
    k.pos(pos),
    // Set the entity to be offscreen initially
    k.offscreen(),
    // Add the 'ring' tag to the entity
    'ring',
  ]);
}