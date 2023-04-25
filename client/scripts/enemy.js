import bus from "./bus";
import { ctx } from "./canvas";
import COLOR from "./color";
import engine from "./engine";

const sz = 40;
function Enemy(x, y, type = 0) {
  let self;
  let hp = 4 + type;

  function enable() {
    bus.on('bullet-hit', onBulletHit);
  }

  function disable() {
    bus.off('bullet-hit', onBulletHit);
  }

  function onBulletHit(bullet, enemy) {
    if (enemy === self) {
      hp -= bullet.getHitDamage();
    }
  }

  function update(dT) {
    // y += 100 * dT;

    if (y > 400 || hp <= 0) {
      engine.removeGameObject(self);
    }
  }

  function render() {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.translate(x, y);
    ctx.strokeStyle = COLOR.RED;
    ctx.fillStyle = COLOR.RED;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, sz/2);
    ctx.arc(sz/4, sz/2, sz * 0.5, -Math.PI/2, 1.0);
    ctx.arc(0, sz/2, sz * 1.0, 0.7, -Math.PI - 0.7, true);
    ctx.arc(-sz/4, sz/2, sz * 0.5, 2.0, -Math.PI/2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  function inBound(tx, ty) {
    const dx = tx - x;
    const dy = ty - y;
    return (dx * dx + dy * dy) < sz * sz;
  }

  self = {
    tag: 'enemy',
    order: 100,
    update,
    render,
    inBound,
    enable,
    disable,
  };
  return self;
}

export default Enemy;
