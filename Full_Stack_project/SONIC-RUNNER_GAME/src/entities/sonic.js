import k from '../kaplayCtx';


function makeSonic(pos) {

  const sonic = k.add([
    k.sprite('sonic', {
      anim: 'run'
    }),
    k.pos(pos),
    k.scale(4),
    k.area(),
    k.anchor('center'),
  ]);

}

export {
  makeSonic
};