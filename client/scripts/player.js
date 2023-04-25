import { canvas, ctx } from "./canvas";
import COLOR from "./color";
import Engine from "./engine";
import bus from "./bus.js";
import engine from "./engine";
import Wake from "./wake";

const sz = 40;
const MAX_VEL = 800;
const ACCELERATION = 12000;
const SHIP_WIDTH = sz * 1.8;

function Player(xi, yi) {
  let x = xi;
  let y = yi;
  let vx = 0;
  let time = 99.9;
  let self;

  function getX() {
    return x;
  }

  function getY() {
    return y;
  }

  function getTime() {
    return time;
  }

  function addTime(a) {
    time += a;
    if (time > 99.9) {
      time = 99.9;
    }
    if (time < 0) {
      time = 0;
    }
  }

  function update(dT) {
    time -= dT;

    const controls = Engine.getByTag('controls')[0];
    const moveRight = controls.get('ArrowRight');
    const moveLeft = controls.get('ArrowLeft');

    // Controls
    if (moveRight) {
      vx += ACCELERATION * dT;
    }
    if (moveLeft) {
      vx -= ACCELERATION * dT;
    }
    if (!(moveLeft ^ moveRight)) {
      vx -= vx * 15.0 * dT;
    }
    vx = Math.max(-MAX_VEL, Math.min(MAX_VEL, vx));
    x += vx * dT;

    // Bounds
    if (x < -canvas.width / 2 + SHIP_WIDTH) {
      x = -canvas.width / 2 + SHIP_WIDTH;
      vx = 0;
    }
    if (x > canvas.width / 2 - SHIP_WIDTH) {
      x = canvas.width / 2 - SHIP_WIDTH;
      vx = 0;
    }

    // Shooting
    if (controls.getDown(' ')) {
      bus.emit('fire', x, y, 2);
      // bus.emit('boom', 1);
    }

    if (time <= 0) {
      bus.emit('boom', 2);
      setTimeout(() => { bus.emit('boom', 2); }, 500);
      setTimeout(() => { bus.emit('boom', 2); }, 1000);
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          engine.addGameObject(new Wake(
            x + (Math.random() - 0.5) * sz * 3,
            y + (Math.random() - 0.5) * sz * 2.3,
            i % 2 == 0 ? COLOR.PURPLE : COLOR.WHITE,
            40 + Math.random() * 80
          ));
        }, i * 30);
      }
      engine.removeGameObject(self);
    }
  }

  function render() {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.translate(x, y);
    ctx.strokeStyle = COLOR.PURPLE;
    ctx.fillStyle = COLOR.PURPLE;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -sz/2);
    ctx.lineTo(sz/2, sz/2);
    ctx.lineTo(-sz/2, sz/2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  self = {
    tag: 'player',
    order: 0,
    getX,
    getY,
    getTime,
    addTime,
    update,
    render,
  };

  return self;
}

export default Player;
