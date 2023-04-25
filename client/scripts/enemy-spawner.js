import { canvas } from "./canvas";
import Enemy from "./enemy";
import engine from "./engine";

const PADX = 80;
function EnemySpawner() {
  let anim = 10;

  function update(dT) {
    anim += dT;

    if (anim > 1.5) {
      engine.addGameObject(new Enemy(getRandomX(), getTopY(), 0));
      anim = 0;
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
