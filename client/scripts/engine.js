import { canvas, ctx } from "./canvas";
import COLOR from "./color";

const gameObjects = [];
const gameObjectsByTag = new Map();
const removeQueue = [];
let lastTime = 0;
let deltaTime = 0.01;

function init() {
  lastTime = 0;
  clearAllGameObjects();
  requestAnimationFrame(tick);
}

function tick(t) {
  deltaTime = Math.min(Math.max((t - lastTime) / 1000.0, 0.001), 0.1);
  ctx.fillStyle = COLOR.PINK;
  ctx.fillRect(0, 0, canvas.width, canvas. height);

  // Game updates
  removeQueue.length = 0;
  gameObjects.forEach(updateGameObject);
  removeQueue.forEach(removeGameObject);

  // Camera setup
  ctx.save();
  const cam = getByTag('camera')[0];
  ctx.translate(cam.getX() + canvas.width / 2, cam.getY() + canvas.height / 2);
  const z = cam.getZoom() / (canvas.height / canvas.width);
  ctx.scale(z, z);
  gameObjects.forEach(renderGameObject);
  ctx.restore();

  lastTime = t;
  requestAnimationFrame(tick);
}

function updateGameObject(g) {
  g.update(deltaTime);
}

function renderGameObject(g) {
  g.render();
}

function removeElementFromArray(element, array) {
  if (array) {
    const idx = array.findIndex(element);
    if (idx >= 0) {
      array.splice(idx, 1);
    }
  }
}

function addGameObject(g) {
  gameObjects.push(g);
  gameObjects.sort((a, b) => a.order - b.order);

  if (!gameObjectsByTag.has(g.tag)) {
    gameObjectsByTag.set(g.tag, []);
  }
  const objectsWithTag = gameObjectsByTag.get(g.tag);
  objectsWithTag.push(g);
}

function removeGameObject(g) {
  removeElementFromArray(g, gameObjects);
  removeElementFromArray(g, gameObjectsByTag.get(g.tag));
}

function clearAllGameObjects() {
  gameObjects.length = 0;
  gameObjectsByTag.clear();
}

function getByTag(tag) {
  const res = gameObjectsByTag.get(tag);
  if (res) {
    return res;
  } else {
    return [];
  }
}

export default {
  init,
  addGameObject,
  removeGameObject,
  clearAllGameObjects,
  getByTag,
}
