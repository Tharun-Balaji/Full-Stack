// Import the kaplay context, which provides functionality for game development
import k from '../kaplayCtx';

/**
 * Creates a new motobug entity at the specified position.
*/
export function makeMotobug(pos) {
  // Create a new entity with the motobug sprite and the "run" animation.
  return k.add([
    k.sprite('motobug', { anim: 'run' }),
    // Set the area of the entity to be a rectangle with a width of 32 and a height of 32, centered around the entity's position.
    k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }),
    // Scale the entity by a factor of 4.
    k.scale(4),
    // Set the anchor point of the entity to be the center of the entity.
    k.anchor('center'),
    // Set the position of the entity to be the specified position.
    k.pos(pos),
    // Set the entity to be offscreen initially.
    k.offscreen(),
    // Add the "enemy" tag to the entity.
    'enemy',
  ]);
};