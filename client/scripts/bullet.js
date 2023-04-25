import bus from "./bus";
import { canvas, ctx } from "./canvas";
import COLOR from "./color";
import engine from "./engine";

const sz = 20;
const BASE_SPEED = 1100;

function Bullet(xi, yi, { angle, type }) {
  let x = xi;
  let y = yi;
  let self;
  angle *= Math.PI / 180;

  function getHitDamage() {
    return 1;
  }

  function update(dT) {
    const dy = -Math.cos(angle) * BASE_SPEED;
    const dx = Math.sin(angle) * BASE_SPEED;
    x += dx * dT;
    y += dy * dT;

    // Hit enemy
    let hitTarget = false;
    engine.getByTag('enemy').forEach((enemy) => {
      if (hitTarget) {
        return;
      }
      if (enemy.inBound(x, y)) {
        bus.emit('bullet-hit', self, enemy);
        hitTarget = true;
      }
    });

    // Out of bounds
    if (y < -canvas.height + 150 || hitTarget) {
      engine.removeGameObject(self);
    }
  }

  function render() {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = COLOR.PURPLE;
    ctx.fillStyle = COLOR.PURPLE;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -sz/4);
    ctx.lineTo(sz/4, 0);
    ctx.lineTo(0, sz*1.5);
    ctx.lineTo(-sz/4, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  function getX() {
    return x;
  }

  function getY() {
    return y;
  }

  self = {
    tag: 'bullet',
    order: 50,
    getHitDamage,
    update,
    render,
    getX,
    getY,
  };

  return self;
}

export default Bullet;