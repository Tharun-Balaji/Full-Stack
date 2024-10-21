import k from "../kaplayCtx";


function MainMenu() {

  if (!k.getData('best-score')) { // if best score doesn't exist
    k.setData('best-score', 0);
  };

  k.onButtonPress('jump', () => { // when jump button is pressed
    k.go('game'); // go to game scene
  });

  const bgPieceWidth = 1920; // background piece width

  const bgPieces = [ // background pieces
    k.add([k.sprite('chemical-bg'), k.pos(0, 0), k.scale(2), k.opacity(0.8)]), // first background piece
    k.add([k.sprite('chemical-bg'), k.pos(bgPieceWidth, 0), k.scale(2), k.opacity(0.8)]) // second background piece
  ];


  const platforms = [ // platforms
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]), // first platform
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]), // second platform
  ];

  k.onUpdate(() => {  // on update
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0); // move first background piece to second
      bgPieces.push(bgPieces.shift()); // add first background piece to second
    }

    bgPieces[0].move(-100, 0); // move first background piece to left
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0); // move second background piece to first

  });

};

export default MainMenu;