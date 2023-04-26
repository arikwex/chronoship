import Controls from './controls';
import Engine from './engine';
import HUD from './hud';
import Player from './player';
import Camera from './camera';
import bus from './bus';
import Bullet from './bullet';
import EnemySpawner from './enemy-spawner';
import Text from './text';
import color from './color';
import BoostSpawner from './boost-spawner';
import AudioManager from './audio';

function initGame() {
  Engine.init();

  Engine.clearAllGameObjects();
  Engine.addGameObject(new Controls());
  Engine.addGameObject(new Camera());
  Engine.addGameObject(new Player(0, 0));
  Engine.addGameObject(new HUD());

  bus.on('fire', onFire);
  bus.on('add-time', onAddTime);
  bus.on('soft-reset', onSoftReset);

  function onInteract() {
    Engine.addGameObject(new EnemySpawner());
    Engine.addGameObject(new BoostSpawner());
    AudioManager.init();
    window.removeEventListener('keydown', onInteract);
  }
  window.addEventListener('keydown', onInteract);
}

function onFire(x, y, type) {
  const p = Engine.getByTag('player')[0];
  if (!p) {
    return;
  }
  const h = Engine.getByTag('hud')[0];
  h.triggerPulse();
  if (type === 0) {
    p.addTime(-0.9);
    Engine.addGameObject(new Bullet(x, y, { type, angle: 0 }));
  } else if (type === 1) {
    p.addTime(-1.5);
    Engine.addGameObject(new Bullet(x-5, y, { type, angle: -1 }));
    Engine.addGameObject(new Bullet(x+5, y, { type, angle: 1 }));
  } else if (type === 2) {
    p.addTime(-2.2);
    Engine.addGameObject(new Bullet(x, y, { type, angle: 0 }));
    Engine.addGameObject(new Bullet(x, y, { type, angle: 4 }));
    Engine.addGameObject(new Bullet(x, y, { type, angle: -4 }));
  }
}

function onAddTime(amt, x, y) {
  const p = Engine.getByTag('player')[0];
  if (!p) {
    return;
  }
  p.addTime(amt);
  if (amt > 0) {
    Engine.addGameObject(new Text(`+${amt} sec`, x, y, color.GREEN));
  } else {
    Engine.addGameObject(new Text(`${amt} sec`, x, y, color.RED));
  }
}

function onSoftReset() {
  Engine.addGameObject(new EnemySpawner());
  Engine.addGameObject(new BoostSpawner());
  Engine.addGameObject(new Player(0, 0));
}

initGame();
