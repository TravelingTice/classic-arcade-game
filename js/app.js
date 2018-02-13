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
    // Bug accelerates as score gets higher
    this.speed = 150 + (170 * Math.random() + (10 * player.score));
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

// Our player
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
    // Set initial score + hearts for player
    this.score = 0;
    this.hearts = 5;
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
  // When player touches bug, it loses one heart. When all hearts are lost -> go to end screen
  loseHeart() {
    this.hearts -= 0.5;
    const heart1 = document.getElementById('heart1');
    const heart2 = document.getElementById('heart2');
    const heart3 = document.getElementById('heart3');
    const heart4 = document.getElementById('heart4');
    const heart5 = document.getElementById('heart5');
    if (player.hearts <= 4) {
      heart5.setAttribute('class', 'fa fa-heart-o');
    }
    if (player.hearts <= 3) {
      heart4.setAttribute('class', 'fa fa-heart-o');
    }
    if (player.hearts <= 2) {
      heart3.setAttribute('class', 'fa fa-heart-o');
    }
    if (player.hearts <= 1) {
      heart2.setAttribute('class', 'fa fa-heart-o');
    }
    if (player.hearts <= 0) {
      heart1.setAttribute('class', 'fa fa-heart-o');
      renderEndScreen();
    }
  }
}

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

const allEnemies = [];
// Set initial interval speed
let counterInterval = 1200;

//Get audio tags from HTML file
const dieSound = document.getElementById('dieSound');
const scoreSound = document.getElementById('scoreSound');

//Render enemies
function renderEnemies() {
  const enemy = new Enemy();
  allEnemies.push(enemy);
  //For performance delete first object in array when there are too many
  if (allEnemies.length > 20) {
    allEnemies.shift();
  }
  //Accelerates time gap between bug renders => the higher the score, the smaller the interval time
  setTimeout(renderEnemies, counterInterval);
}
setTimeout(renderEnemies, counterInterval);

// Return a random nr between 0 and 2, which will set the bug's initial y-value to one of the three possible rows randomly
function randomNr(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Check if enemy obj and player obj collide
function checkCollisions() {
  allEnemies.forEach(enemy => {
    // Because the picture has some whitespace at the top and side, the x and y pos of the actual visual picture needs to be set
    const actualXposEnemy = enemy.x + 1;
    const actualYposEnemy = enemy.y + 76;
    const actualXposPlayer = player.x + 16;
    const actualYposPlayer = player.y + 63;

    // syntax from https://blog.sklambert.com/html5-canvas-game-2d-collision-detection/

    if (actualXposEnemy < actualXposPlayer + player.width && actualXposEnemy + enemy.width > actualXposPlayer && actualYposEnemy < actualYposPlayer + player.height && actualYposEnemy + enemy.height > actualYposPlayer) {
      // Play died sound
      dieSound.play();
      // Set small timeout, so player does actually 'collide' for a short amount of time instead of teleporting to start pos immediately
      setTimeout(() => {
        player.x = player.initialX;
        player.y = player.initialY;
        // Heart goes down by 1 (because of delay player collides for 2 ticks, so this function gets run twice)
        player.loseHeart();
      }, 20);
    }
  });
}

// When water is reached player goes back to initial pos and score gets updated, also the interval for bug spawns gets less
function waterReached() {
  if (player.y < 63) {
    // Play point.wav
    scoreSound.play();
    // Add 1 to score (stays on water for 2 ticks, so 0.5 * 2)
    player.score += 0.5;
    setTimeout(() => {
      player.x = player.initialX;
      player.y = player.initialY;
      // Minimum interval is 0.5 sec
      if (!counterInterval <= 500) {
        counterInterval -= 20;
      }
      updateScore();
    }, 20);
  }
}

// Update score panel
function updateScore() {
  const score = document.getElementById('score');
  score.textContent = player.score;
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

// Put all game elements to class none and remove this class from end screen
function renderEndScreen() {
  const scorePanel = document.querySelector('.container');
  const canvas = document.getElementById('gamecanvas');
  const endScreen = document.querySelector('.none');
  const score = document.getElementById('endScore');
  scorePanel.setAttribute('class', 'none');
  canvas.setAttribute('class', 'none');
  endScreen.setAttribute('class', 'endScreen');
  score.textContent = player.score;
}
