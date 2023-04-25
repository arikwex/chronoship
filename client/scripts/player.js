import { ctx } from "./canvas";
import COLOR from "./color";

const sz = 40;
function Player(xi, yi) {
  let x = xi;
  let y = yi;
  let time = 0;

  function getX() {
    return x;
  }

  function getY() {
    return y;
  }

  function getTime() {
    return time;
  }

  function update(dT) {
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

  return {
    tag: 'player',
    getX,
    getY,
    getTime,
    update,
    render,
  }
}

export default Player;
