import bus from "./bus";
import { ctx } from "./canvas";
import COLOR from "./color";
import engine from "./engine";
import Wake from "./wake";

function TimeBoost(x, y, amt) {
  let t = 0;
  let self;
  
  function update(dT) {
    y += 200 * dT;
    t += dT * 3.5;

    // Player Collision
    let collided = false;
    engine.getByTag('player').forEach((p) => {
      if (p.inRadius(x, y, 20)) {
        collided = true;
      }
    });

    if (collided) {
      bus.emit('add-time', amt, x, y);
      setTimeout(() => { engine.addGameObject(new Wake(x, y, COLOR.BLACK, 50)); }, 0);
      setTimeout(() => { engine.addGameObject(new Wake(x, y, COLOR.GREEN, 70)); }, 100);
      setTimeout(() => { engine.addGameObject(new Wake(x, y, COLOR.WHITE, 90)); }, 200);
      engine.removeGameObject(self);
    }
  }

  function render() {
    let sz = 50;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = COLOR.GREEN;
    ctx.strokeStyle = COLOR.GREEN;

    ctx.font = "26px Arial";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    ctx.fillText(`+${amt}`, 0, sz + 8);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;
    
    // "seconds"
    const a = -t * 2 * Math.PI;
    const cx = Math.sin(a) * sz / 2;
    const cy = -Math.cos(a) * sz / 2;

    // "minutes"
    const a2 = -parseInt(t) * 2 * Math.PI / 12;
    const cx2 = Math.sin(a2) * sz / 4;
    const cy2 = -Math.cos(a2) * sz / 4;

    // Clock pulsar
    ctx.translate(0, 0);
    const pulse = Math.cos(t * 4.0) * 0.1 + 1;
    ctx.scale(pulse, pulse);
    ctx.beginPath();
    ctx.arc(0, 0, sz/2, 0, 2 * Math.PI);
    ctx.moveTo(0, 0);
    ctx.lineTo(cx, cy);
    ctx.moveTo(0, 0);
    ctx.lineTo(cx2, cy2);
    ctx.stroke();

    ctx.restore();
  }

  self = {
    tag: 'time-boost',
    order: 800,
    update,
    render,
  };

  return self;
}

export default TimeBoost;