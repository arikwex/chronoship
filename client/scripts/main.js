import Controls from './controls';
import Engine from './engine';
import HUD from './hud';
import Player from './player';
import Camera from './camera';
import bus from './bus';

function initGame() {
  Engine.init();

  Engine.clearAllGameObjects();
  Engine.addGameObject(new Controls());
  Engine.addGameObject(new Camera());
  Engine.addGameObject(new Player(0, 0));
  Engine.addGameObject(new HUD());

  bus.on('fire', () => console.log('bop'));
}

initGame();
