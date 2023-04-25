import bus from "./bus";
import { canvas } from "./canvas";

function Camera() {
  let x = 0;
  let y = -180;
  let zoom = 1;
  let shake = 0;

  function enable() {
    bus.on('boom', onBoom);
  }

  function disable() {
    bus.off('boom', onBoom);
  }

  function onBoom(mag) {
    shake += mag;
    if (shake > 2.0) {
      shake = 2.0;
    }
  }

  function getX() {
    return x + Math.cos(shake * 30) * Math.exp(shake) * 2;
  }

  function getY() {
    return y + Math.cos(shake * 22) * Math.exp(shake) * 2;
  }

  function getZoom() {
    return zoom;
  }

  function update(dT) {
    if (shake > 0) {
      shake -= dT * 6.0;
    } else {
      shake = 0;
    }
  }

  function render() {
  }

  return {
    tag: 'camera',
    order: -1000,
    getX,
    getY,
    getZoom,
    update,
    render,
    enable,
    disable,
  }
}

export default Camera;
