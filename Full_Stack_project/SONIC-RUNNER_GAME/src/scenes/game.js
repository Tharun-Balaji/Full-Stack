import { makeMotobug } from '../entities/motobug';
import { makeRing } from '../entities/ring';
import { makeSonic } from '../entities/sonic';
import k from '../kaplayCtx';

/**
 * Main game function that initializes and runs the Sonic-style platformer game
 * Uses the Kaboom.js game engine (accessed through 'k' context)
 */
function game() {
  // Set up basic physics
  k.setGravity(3100); // Higher values make Sonic fall faster

  // Initialize background music
  const citySfx = k.play('city', { volume: 0.2, loop: true });

  // Create infinite scrolling background
  const bgPieceWidth = 1920;
  const bgPieces = [
    // Create two background pieces that will be recycled for infinite scrolling
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite('chemical-bg'),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  // Create initial platform pieces for the ground
  const platforms = [
    k.add([k.sprite('platforms'), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite('platforms'), k.pos(384, 450), k.scale(4)]),
  ];

  // Scoring system
  let score = 0;
  let scoreMultiplier = 0; // Multiplier increases when chain-stomping enemies

  // Display score in the top-left corner
  const scoreText = k.add([
    k.text('SCORE : 0', { font: 'mania', size: 72 }),
    k.pos(20, 20),
  ]);

  // Create and initialize Sonic character
  const sonic = makeSonic(k.vec2(200, 745)); // Position Sonic on the ground
  sonic.setControls(); // Set up keyboard controls
  sonic.setEvents(); // Set up character-specific event handlers

  // Handle Sonic's collision with enemies (Motobugs)
  sonic.onCollide('enemy', (enemy) => {
    // If Sonic is in the air, he can defeat enemies by jumping on them
    if (!sonic.isGrounded()) {
      k.play('destroy', { volume: 0.5 }); // Enemy destruction sound
      k.play('hyper-ring', { volume: 0.5 }); // Bonus sound
      k.destroy(enemy);
      sonic.play('jump');
      sonic.jump(); // Bounce off enemy

      // Increase score based on combo multiplier
      scoreMultiplier += 1;
      score += 10 * scoreMultiplier;
      scoreText.text = `SCORE : ${score}`;

      // Display combo multiplier feedback
      if (scoreMultiplier === 1) {
        sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
      } else {
        sonic.ringCollectUI.text = `x${scoreMultiplier}`;
      }
      return;
    }

    // If Sonic touches enemy while on ground, game over
    k.play('hurt', { volume: 0.5 });
    k.setData('current-score', score);
    k.go('gameover', citySfx);
  });

  // Handle ring collection
  sonic.onCollide('ring', (ring) => {
    k.play('ring', { volume: 0.5 });
    k.destroy(ring);
    score++;
    scoreText.text = `SCORE : ${score}`;

    // Show temporary "+1" feedback
    sonic.ringCollectUI.text = '+1';
    k.wait(1, () => {
      sonic.ringCollectUI.text = '';
    });
  });

  // Game speed increases over time
  let gameSpeed = 300;
  k.loop(1, () => {
    gameSpeed += 50; // Increase speed every second
  });

  // Enemy (Motobug) spawning system
  const spanMotoBug = () => {
    // Create enemy at right side of screen
    const motobug = makeMotobug(k.vec2(1950, 733));

    // Update enemy movement
    motobug.onUpdate(() => {
      // Cap maximum speed for easier gameplay
      if (gameSpeed < 3000) {
        motobug.move(-(gameSpeed + 300), 0);
        return;
      }
      motobug.move(-gameSpeed, 0);
    });

    // Clean up enemies that move off screen
    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) {
        k.destroy(motobug);
      }
    });

    // Schedule next enemy spawn
    const waitTime = k.rand(0.5, 2.5);
    k.wait(waitTime, spanMotoBug);
  };

  spanMotoBug(); // Start enemy spawning

  // Ring spawning system
  const spawnRing = () => {
    const ring = makeRing(k.vec2(1950, 745));

    // Move rings with game speed
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });

    // Clean up rings that move off screen
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring);
    });

    // Schedule next ring spawn
    const waitTime = k.rand(0.5, 3);
    k.wait(waitTime, spawnRing);
  };

  spawnRing(); // Start ring spawning

  // Create invisible ground collision
  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
    'platform',
  ]);

  // Main game update loop
  k.onUpdate(() => {
    // Reset combo multiplier when Sonic lands
    if (sonic.isGrounded()) scoreMultiplier = 0;

    // Infinite scrolling background logic
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-100, 0); // Scroll background
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    // Infinite scrolling platform logic
    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0); // Move platforms with game speed
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}

export default game;