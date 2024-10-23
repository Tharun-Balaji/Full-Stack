import k from '../kaplayCtx';

// Function to handle the game over scenario
function gameover(citySfx) {
  // Pause the city sound effect
  citySfx.paused = true;

  // Get the best score and current score from storage
  let bestScore = k.getData('best-score');
  const currentScore = k.getData('current-score');

  // Define the rank grades and values
  const rankGrades = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
  const rankValues = [50, 80, 100, 200, 300, 400, 500];

  // Initialize the current rank and best rank to 'F'
  let currentRank = 'F';
  let bestRank = 'F';

  // Loop through the rank values to determine the current rank and best rank
  for (let i = 0; i < rankValues.length; i++) {

    // If the current score is less than the rank value, update the current rank
    if (rankValues[i] < currentScore) {
      currentRank = rankGrades[i];
    }

    // If the best score is less than the rank value, update the best rank
    if (rankValues[i] < bestScore) {
      bestRank = rankGrades[i];
    }
  }

  // Check if the current score is higher than the best score
  if (bestScore < currentScore) {

    // Set the best score to the current score
    k.setData('best-score', currentScore);
    bestScore = currentScore;
    bestRank = currentRank;
  }

  // Add the game over text to the screen
  k.add([ // GAME OVER TEXT
    k.text('GAME OVER', { font: 'mania', size: 96 }),
    k.anchor('center'),
    k.pos(k.center().x, k.center().y - 300),
  ]);

  // Add the best score text to the screen
  k.add([ // BEST SCORE TEXT
    k.text(`BEST SCORE : ${bestScore}`, {
      font: 'mania',
      size: 64,
    }),
    k.anchor('center'),
    k.pos(k.center().x - 400, k.center().y - 200),
  ]);

  // Add the current score text to the screen
  k.add([ // CURRENT SCORE TEXT
    k.text(`CURRENT SCORE : ${currentScore}`, {
      font: 'mania',
      size: 64,
    }),
    k.anchor('center'),
    k.pos(k.center().x + 400, k.center().y - 200),
  ]);

  // Create a rectangle for the best rank display
  const bestRankBox = k.add([
    k.rect(400, 400, { radius: 4 }),
    k.color(0, 0, 0),
    k.area(),
    k.anchor('center'),
    k.outline(6, k.Color.fromArray([255, 255, 255])),
    k.pos(k.center().x - 400, k.center().y + 50),
  ]);

  // Add the best rank text to the best rank box
  bestRankBox.add([
    k.text(bestRank, { font: 'mania', size: 100 }),
    k.anchor('center'),
  ]);

  // Create a rectangle for the current rank display
  const currentRankBox = k.add([
    k.rect(400, 400, { radius: 4 }),
    k.color(0, 0, 0),
    k.area(),
    k.anchor('center'),
    k.outline(6, k.Color.fromArray([255, 255, 255])),
    k.pos(k.center().x + 400, k.center().y + 50),
  ]);

  // Add the current rank text to the current rank box
  currentRankBox.add([
    k.text(currentRank, { font: 'mania', size: 100 }),
    k.anchor('center'),
  ]);

  // Wait for 1 second before continuing
  k.wait(1, () => {
    k.add([
      k.text('Press Space/Click/Touch to Play Again', {
        font: 'mania',
        size: 64,
      }),
      k.anchor('center'),
      k.pos(k.center().x, k.center().y + 350),
    ]);
    k.onButtonPress('jump', () => k.go('game'));
  });

};

// Export the gameover function
export default gameover;