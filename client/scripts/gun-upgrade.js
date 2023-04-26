import bus from "./bus";
import { ctx } from "./canvas";
import COLOR from "./color";
import engine from "./engine";
import Wake from "./wake";

function GunUpgrade(x, y) {
  let t = 0;
  let self;
  
  function update(dT) {
    y += 200 * dT;
    t += dT * 3.5;

    // Player Collision
    let collided = false;
    engine.getByTag('player').forEach((p) => {
      if (p.inRadius(x, y, 25)) {
        collided = true;
      }
    });

    if (collided) {
      bus.emit('powerup');
      setTimeout(() => { engine.addGameObject(new Wake(x, y, COLOR.PURPLE, 50)); }, 0);
      setTimeout(() => { engine.addGameObject(new Wake(x, y, COLOR.PURPLE, 70)); }, 100);
      setTimeout(() => { engine.addGameObject(new Wake(x, y, COLOR.PURPLE, 90)); }, 200);
      engine.removeGameObject(self);
    }

    if (y > 300) {
      engine.removeGameObject(self);
    }
  }

  function render() {
    let sz = 60;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = COLOR.PURPLE;
    ctx.strokeStyle = COLOR.PURPLE;

    ctx.font = "18px Arial";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;

    // Pulsar
    ctx.translate(0, 0);
    const pulse = Math.cos(t * 4.0) * 0.1 + 1;
    ctx.scale(pulse, pulse);
    ctx.fillText(`UPG`, 0, 1);

    ctx.beginPath();
    ctx.arc(0, 0, sz/2, 0, 2 * Math.PI);
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

export default GunUpgrade;