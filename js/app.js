// Enemies our player must avoid
class Enemy {
  constructor() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'img/enemy-bug.png';
    // Initial x-pos is fixed
    this.x = -101;
    // Initial y-pos is either 63 (1st stone row), 146 (2nd) or 229 (3rd)
    this.y = 63 + (83 * randomNr(3));
    this.speed = 150 + (170 * Math.random());
    // Set width and height for collision detection
    this.width = 97;
    this.height = 66;
  }
  // Update the enemy's position
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }
  render() {
    // Draw the enemy on the screen, required method for game
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'img/char-boy.png';
    // Set initial X and Y positions, mutable one and one for reference when collision or water is reached
    this.initialX = 202;
    this.x = 202;
    this.initialY = 395;
    this.y = 395;
    // Set width and height for collision detection
    this.width = 66;
    this.height = 75;
  }
  // Update x and y position
  update(dx = 0, dy = 0) {
    this.x += dx;
    this.y += dy;
  }
  // Render image on canvas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Handle the keyboard input, with if-statements preventing the player to move off-screen
  handleInput(stringOfPressedKey) {
    switch (stringOfPressedKey) {
      case 'left':
        if (this.x > 0) {
          this.update(-101, undefined);
        }
        break;
      case 'right':
        if (this.x < 404) {
          this.update(101, undefined);
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.update(undefined, -83);
        }
        break;
      case 'down':
        if (this.y < 395) {
          this.update(undefined, 83);
        }
        break;
    }
  }
}

// Return a random nr between 0 and 2, which will set the bug's initial y-value to one of the three possible rows randomly
function randomNr(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

function renderEnemies() {
  const enemy = new Enemy();
  allEnemies.push(enemy);
  //For performance delete first object in array when there are too many
  if (allEnemies.length > 10) {
    allEnemies.shift();
  }
}
setInterval(renderEnemies, 700 + (500 * Math.random()));

// Instantiate player obj
const player = new Player();

function checkCollisions() {
  allEnemies.forEach(enemy => {
    // Because the picture has some whitespace at the top and side, the x and y pos of the actual visual picture needs to be set
    const actualXposEnemy = enemy.x + 1;
    const actualYposEnemy = enemy.y + 76;
    const actualXposPlayer = player.x + 16;
    const actualYposPlayer = player.y + 63;

    // Check if enemy obj and player obj collide (syntax from https://blog.sklambert.com/html5-canvas-game-2d-collision-detection/)

    if (actualXposEnemy < actualXposPlayer + player.width && actualXposEnemy + enemy.width > actualXposPlayer && actualYposEnemy < actualYposPlayer + player.height && actualYposEnemy + enemy.height > actualYposPlayer) {
      // Set small timeout, so player does actually 'collide' for a short amount of time instead of teleporting to start immediately
      setTimeout(() => {
        player.x = player.initialX;
        player.y = player.initialY;
      }, 20);
    }
  });
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
