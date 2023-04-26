import { ctx } from "./canvas";
import engine from "./engine";

function Wake(x, y, color, size) {
  let self;
  let anim = 0;
  const DURATION = 0.4 + Math.random() * 0.2 - 0.1;

  function update(dT) {
    anim += dT;
    if (anim > DURATION) {
      engine.removeGameObject(self);
    }
  }

  function render() {
    const p = anim / DURATION;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.translate(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = size / 10.0 * (1 - p);
    ctx.beginPath();
    ctx.arc(0, 0, size * (1 - Math.exp(-p * 2.0)), 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  self = {
    tag: 'effect',
    order: 350,
    render,
    update,
  };
  return self;
}

export default Wake;
