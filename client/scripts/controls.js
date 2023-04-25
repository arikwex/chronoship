const keysDown = new Map();
const keysUpThisFrame = new Map();

window.addEventListener('keydown', (evt) => {
  if (!keysDown.has(evt.key)) {
    keysDown.set(evt.key, 0);
  }
  // console.log(evt.key);
});

window.addEventListener('keyup', (evt) => {
  keysDown.delete(evt.key);
  keysUpThisFrame.set(evt.key, true);
});

function Controls() {
  function update() {
    keysDown.forEach((tick, key) => {
      if (tick === 0) {
        keysDown.set(key, 1);
      } else if (tick === 1) {
        keysDown.set(key, 2);
      }
    });
    keysUpThisFrame.forEach((_, key) => {
      if (keysUpThisFrame.get(key)) {
        keysUpThisFrame.set(key, false);
      } else {
        keysUpThisFrame.delete(key);
      }
    });
  }

  function render() {
  }

  function get(key) {
    return keysDown.has(key);
  }

  function getDown(key) {
    return keysDown.get(key) === 1;
  }

  function getUp(key) {
    return keysUpThisFrame.has(key);
  }

  return {
    tag: 'controls',
    order: -2000,
    get,
    getDown,
    getUp,
    render,
    update,
  }
}

export default Controls;