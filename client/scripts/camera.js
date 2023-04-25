function Camera() {
  let x = 0;
  let y = 350;
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

  }

  function render() {
  }

  return {
    tag: 'camera',
    getX,
    getY,
    getZoom,
    update,
    render,
  }
}

export default Camera;
