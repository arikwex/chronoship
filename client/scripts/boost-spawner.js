import { canvas } from "./canvas";
import engine from "./engine";
import TimeBoost from "./time-boost";

const PADX = 80;
function BoostSpawner() {
  let anim = 10;

  function update(dT) {
    anim += dT;

    if (anim > 5) {
      engine.addGameObject(new TimeBoost(getRandomX(), getTopY(), 5));
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

export default BoostSpawner;
