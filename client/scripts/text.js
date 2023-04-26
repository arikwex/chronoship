import { ctx } from "./canvas";
import engine from "./engine";
import COLOR from "./color";

function Text(msg, x, y, color) {
  let self;
  let anim = 0;
  const DURATION = 1;

  function update(dT) {
    anim += dT;
    if (anim > DURATION) {
      engine.removeGameObject(self);
    }
  }

  function render() {
    ctx.save();
    ctx.translate(x, y);
    const p = Math.min(1, 2 * (1 - anim / DURATION));
    ctx.scale(p, p);
    ctx.font = "32px Arial";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    ctx.fillStyle = COLOR.BLACK;
    ctx.fillText(msg, 0, 1);
    ctx.fillStyle = color;
    ctx.fillText(msg, 0, 0);
    
    ctx.restore();
  }

  self = {
    tag: 'effect',
    order: 360,
    render,
    update,
  };
  return self;
}

export default Text;
