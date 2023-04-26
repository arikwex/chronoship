import bus from "./bus";
import { canvas, ctx } from "./canvas";
import COLOR from "./color";
import Controls from "./controls";
import engine from "./engine";

function HUD() {
  let forcedPulse = 10;

  function update(dT) {
    forcedPulse += dT;

    const player = engine.getByTag('player')[0];
    const controls = engine.getByTag('controls')[0];
    if (!player && controls.getDown('r')) {
      bus.emit('soft-reset');
    }
  }

  function render() {
    const player = engine.getByTag('player')[0];
    if (!player) {
      ctx.save();
      ctx.setTransform(1,0,0,1,0,0);
      ctx.font = "64px Arial";
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = COLOR.RED;
      ctx.fillText(`Press [R] to retry`, canvas.width/2, canvas.height/2);
      ctx.restore();
      return;
    }
    const t = player.getTime();
    let sz = 50;

    ctx.save();
    ctx.translate(player.getX(), player.getY());
    if (t < 15) {
      ctx.fillStyle = COLOR.RED;
      ctx.strokeStyle = COLOR.RED;
    } else {
      ctx.fillStyle = COLOR.GREEN;
      ctx.strokeStyle = COLOR.GREEN;
    }
    ctx.font = "32px Arial";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    ctx.fillText(`${t.toFixed(1)}`, 0, sz * 2 + 20);

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
    let pulse = Math.exp(-forcedPulse * 6.0) * 0.4 + 1;
    if (t < 15) {
      pulse += Math.exp(-(1 - t % 1) * 6.0) * 0.4;
    }
    ctx.translate(0, sz + 10);
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

  function triggerPulse() {
    forcedPulse = 0;
  }

  return {
    tag: 'hud',
    order: 9999,
    triggerPulse,
    update,
    render,
  };
}

export default HUD;