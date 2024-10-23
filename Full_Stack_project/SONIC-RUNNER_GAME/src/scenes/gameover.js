import k from '../kaplayCtx';

function gameover(citySfx) {
  citySfx.paused = true;
  let bestScore = k.getData('best-score');
  const currentScore = k.getData('current-score');

  const rankGrades = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
  const rankValues = [50, 80, 100, 200, 300, 400, 500];

  let currentRank = 'F';
  let bestRank = 'F';
  for (let i = 0; i < rankValues.length; i++) {
    if (rankValues[i] < currentScore) {
      currentRank = rankGrades[i];
    }

    if (rankValues[i] < bestScore) {
      bestRank = rankGrades[i];
    }
  }

  if (bestScore < currentScore) {
    k.setData('best-score', currentScore);
    bestScore = currentScore;
    bestRank = currentRank;
  }

  k.add([
    k.text('GAME OVER', { font: 'mania', size: 96 }),
    k.anchor('center'),
    k.pos(k.center().x, k.center().y - 300),
  ]);
  k.add([
    k.text(`BEST SCORE : ${bestScore}`, {
      font: 'mania',
      size: 64,
    }),
    k.anchor('center'),
    k.pos(k.center().x - 400, k.center().y - 200),
  ]);
  k.add([
    k.text(`CURRENT SCORE : ${currentScore}`, {
      font: 'mania',
      size: 64,
    }),
    k.anchor('center'),
    k.pos(k.center().x + 400, k.center().y - 200),
  ]);

};

export default gameover;