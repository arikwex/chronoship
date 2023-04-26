import bus from "./bus";
import { ctx } from "./canvas";
import COLOR from "./color";
import engine from "./engine";
import Wake from "./wake";

const ENEMY_HP_MAP = {
  0: 4,
  1: 2,
  2: 7,
};

const ENEMY_TIME_MAP = {
  0: 6,
  1: 3,
  2: 10,
};

const ENEMY_SPEED_MAP = {
  0: 300,
  1: 400,
  2: 200,
}

const ENEMY_SIZE_MAP = {
  0: 40,
  1: 30,
  2: 50,
}

const ENEMY_POINT_MAP = {
  0: 15,
  1: 5,
  2: 40,
}

const sz = 40;
function Enemy(x, y, type = 0, elapsed = 0) {
  let self;
  let hp = ENEMY_HP_MAP[type] + parseInt(elapsed / 12);
  let timeValue = ENEMY_TIME_MAP[type];
  let crashDamage  = 10;
  let crashed = false;

  function enable() {
    bus.on('bullet-hit', onBulletHit);
    bus.on('player-crash', onPlayerCrash);
  }

  function disable() {
    bus.off('bullet-hit', onBulletHit);
    bus.off('player-crash', onPlayerCrash);
  }

  function onBulletHit(bullet, enemy) {
    if (enemy === self) {
      bus.emit('boom', 0.5);
      hp -= bullet.getHitDamage();
      engine.addGameObject(new Wake(
        bullet.getX() + (Math.random() - 0.5) * 20,
        bullet.getY() + (Math.random() - 0.5) * 20,
        COLOR.PURPLE,
        30 + Math.random() * 14
      ));
    }
  }

  function onPlayerCrash(player, enemy) {
    if (enemy === self) {
      hp = 0;
      crashed = true;
    }
  }

  function update(dT) {
    y += ENEMY_SPEED_MAP[type] * dT;

    if (y > 400 || hp <= 0) {
      engine.removeGameObject(self);
      if (hp <= 0) {
        bus.emit('boom', 2);
        bus.emit('enemy-boom');
        bus.emit('add-points', ENEMY_POINT_MAP[type]);
        if (crashed) {
          bus.emit('add-time', -crashDamage, x, y);
        } else {
          bus.emit('add-time', timeValue, x, y);
        }
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            engine.addGameObject(new Wake(
              x + (Math.random() - 0.5) * sz * 2,
              y + (Math.random() - 0.5) * sz * 1.3,
              COLOR.RED,
              50 + Math.random() * 60
            ));
          }, i * 60);
        }
      }
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
    if (type === 0) {
      ctx.moveTo(0, sz/2);
      ctx.arc(sz/4, sz/2, sz * 0.5, -Math.PI/2, 1.0);
      ctx.arc(0, sz/2, sz * 1.0, 0.7, -Math.PI - 0.7, true);
      ctx.arc(-sz/4, sz/2, sz * 0.5, 2.0, -Math.PI/2);
    } else if (type === 1) {
      ctx.moveTo(0, sz * 0.8);
      ctx.arc(0, 0, sz * 0.8, 0, -Math.PI, true);
    } else if (type === 2) {
      ctx.arc(0, sz * 0.2, sz * 0.8, 0, -Math.PI);
      ctx.lineTo(-sz * 1.4, -sz * 0.3);
      ctx.lineTo(0, -sz * 0.1);
      ctx.lineTo(sz * 1.4, -sz * 0.3);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  function inBound(tx, ty) {
    const dx = tx - x;
    const dy = ty - y;
    const q = ENEMY_SIZE_MAP[type];
    return (dx * dx + dy * dy) < q * q;
  }

  function inRadius(tx, ty, rad) {
    const dx = tx - x;
    const dy = ty - y;
    const q = ENEMY_SIZE_MAP[type];
    return Math.sqrt(dx * dx + dy * dy) < q + rad;
  }

  self = {
    tag: 'enemy',
    order: 100,
    update,
    render,
    inBound,
    inRadius,
    enable,
    disable,
  };
  return self;
}

export default Enemy;
