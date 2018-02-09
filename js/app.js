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
    this.speed = 100 + (170 * Math.random());
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

// Return a random nr between 0 and 2, which will set the bug's initial y-value to one of the three possible rows randomly
function randomNr(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'img/char-boy.png';

  }

  update() {

  }

  render() {

  }

  handleInput(stringOfPressedKey) {

  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy = new Enemy();
allEnemies = [];
allEnemies.push(enemy);
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
