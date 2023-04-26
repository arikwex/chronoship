import bus from "./bus";

function AudioManager() {
  // Sounds
  const blaster = new Audio("./audio/blaster.wav");
  const bulletHit = new Audio("./audio/bullet-hit.wav");
  const enemyBoom = new Audio("./audio/enemy-boom.wav");
  const playerBoom = new Audio("./audio/player-boom.wav");
  const powerup = new Audio("./audio/powerup.wav");
  const rewind = new Audio("./audio/rewind.wav");

  function playSound(snd, offset = 0) {
    snd.currentTime=offset;
    snd.play();
  }

  function init() {
    bus.on('fire', () => { 
      blaster.preservesPitch = false;
      blaster.playbackRate = 1.3 + Math.random() * 0.5;
      playSound(blaster, 0.01);
    });

    bus.on('bullet-hit', () => { 
      bulletHit.preservesPitch = false;
      bulletHit.playbackRate = 2.3 + Math.random() * 1.5;
      playSound(bulletHit);
    });

    bus.on('enemy-boom', () => { 
      enemyBoom.preservesPitch = false;
      enemyBoom.playbackRate = 1.7 + Math.random() * 0.5;
      playSound(enemyBoom);
    });
    
    bus.on('player-boom', () => { 
      playerBoom.preservesPitch = false;
      playerBoom.playbackRate = 1.2 + Math.random() * 0.2;
      playSound(playerBoom);
    });

    bus.on('add-time', (amt) => { 
      if (amt > 0) {
        rewind.preservesPitch = false;
        rewind.playbackRate = 2 + Math.random() * 0.5;
        playSound(rewind);
      }
    });
  }

  return {
    init,
  };
}

export default new AudioManager();
