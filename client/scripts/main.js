import Controls from './controls';
import Engine from './engine';
import HUD from './hud';
import Player from './player';
import Camera from './camera';
import bus from './bus';
import Bullet from './bullet';

function initGame() {
  Engine.init();

  Engine.clearAllGameObjects();
  Engine.addGameObject(new Controls());
  Engine.addGameObject(new Camera());
  Engine.addGameObject(new Player(0, 0));
  Engine.addGameObject(new HUD());

  bus.on('fire', onFire);
}

function onFire(x, y, type) {
  const p = Engine.getByTag('player')[0];
  p.addTime(-1);
  const h = Engine.getByTag('hud')[0];
  h.triggerPulse();
  if (type === 0) {
    Engine.addGameObject(new Bullet(x, y, { type, angle: 0 }));
  } else if (type === 1) {
    Engine.addGameObject(new Bullet(x-5, y, { type, angle: -2 }));
    Engine.addGameObject(new Bullet(x+5, y, { type, angle: 2 }));
  } else if (type === 2) {
    Engine.addGameObject(new Bullet(x, y, { type, angle: 0 }));
    Engine.addGameObject(new Bullet(x, y, { type, angle: 10 }));
    Engine.addGameObject(new Bullet(x, y, { type, angle: -10 }));
  }
}

initGame();
