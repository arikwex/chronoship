import { canvas } from "./canvas";
import Enemy from "./enemy";
import engine from "./engine";

const PADX = 80;
function EnemySpawner() {
  let anim = 10;
  let elapsed = 0;

  function update(dT) {
    anim += dT;

    if (anim > Math.max(0.7, 1.5 - elapsed/18)) {
      if (elapsed < 3) {
        engine.addGameObject(new Enemy(getRandomX(), getTopY(), 0));
      } else if (elapsed < 7) {
        engine.addGameObject(new Enemy(getRandomX(), getTopY(), parseInt(Math.random() * 2)));
      } else {
        engine.addGameObject(new Enemy(getRandomX(), getTopY(), parseInt(Math.random() * 3)));
      }
      anim = 0;
      elapsed += 1;
    }
  }

  function getTopY() {
    return -canvas.height - 100;
  }

  function getRandomX() {
    return Math.random() * (canvas.width - PADX * 2) + PADX - canvas.width/2;
  }

  function render() {
  }

  return {
    tag: 'spawner',
    order: -10,
    update,
    render,
  };
}

export default EnemySpawner;
