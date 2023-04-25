import { ctx } from "./canvas";
import COLOR from "./color";
import engine from "./engine";

function HUD() {
  let forcedPulse = 10;

  function update(dT) {
    forcedPulse += dT;
    const controls = engine.getByTag('controls')[0];
    if (controls.getDown(' ')) {
      forcedPulse = 0;
    }
  }

  function render() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = COLOR.GREEN;
    ctx.strokeStyle = COLOR.GREEN;
    ctx.font = "32px Arial";
    const sz = 50;
    ctx.textBaseline = 'middle';
    const player = engine.getByTag('player')[0];
    const t = player.getTime();
    ctx.fillText(`${t.toFixed(1)}`, sz * 1.85, sz);

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

    const pulse = Math.exp(-(Math.min(1 - t % 1.0, forcedPulse)) * 6.0) * 0.4 + 1;
    ctx.translate(sz, sz);
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

  return {
    tag: 'hud',
    order: 9999,
    update,
    render,
  };
}

export default HUD;