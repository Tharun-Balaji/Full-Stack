import k from './kaplayCtx';
import disclaimer from './scenes/disclaimer';
import game from './scenes/game';
import gameover from './scenes/gameover';
import MainMenu from './scenes/mainMenu';


// Load the background image
k.loadSprite('chemical-bg', '/graphics/chemical-bg.png');

// Load the platform sprite
k.loadSprite('platforms', '/graphics/platforms.png');

// Load the sonic sprite
k.loadSprite('sonic', '/graphics/sonic.png', {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: {
      from: 0,
      to: 7,
      loop: true,
      speed: 30
    },
    jump: { from: 8, to: 15, loop: true, speed: 100 },
  }
});

// Load the ring sprite
k.loadSprite('ring', 'graphics/ring.png', {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});

// Load the motobug sprite
k.loadSprite('motobug', 'graphics/motobug.png', {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});

// Load the font
k.loadFont('mania', 'fonts/mania.ttf');

// Load the sound effects
k.loadSound('destroy', 'sounds/Destroy.wav');
k.loadSound('hurt', 'sounds/Hurt.wav');
k.loadSound('hyper-ring', 'sounds/HyperRing.wav');
k.loadSound('jump', 'sounds/Jump.wav');
k.loadSound('ring', 'sounds/Ring.wav');
k.loadSound('city', 'sounds/city.mp3');

// Define the scenes for the game
k.scene('disclaimer', disclaimer);
k.scene('main-menu', MainMenu);
k.scene('game', game);
k.scene('gameover', gameover);

// Start the game by transitioning to the disclaimer scene
k.go('disclaimer');
