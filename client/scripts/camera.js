import { canvas } from "./canvas";

function Camera() {
  let x = 0;
  let y = -180;
  let zoom = 1;

  function getX() {
    return x;
  }

  function getY() {
    return y;
  }

  function getZoom() {
    return zoom;
  }

  function update(dT) {
    // y = canvas.height * 0.34;
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
  }
}

export default Camera;
