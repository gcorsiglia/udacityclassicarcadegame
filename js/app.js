/*
 * ENTITY CLASS
 */ 
class Entity {
    constructor(x, y) {
        this.sprite = 'images/';
        this.x = x;
        this.y = y;
        this.width = 101;
        this.height = 171;
    }

    // Render sprites
    render() {
        ctx.drawImage(Resources.get(this.sprite), (this.x * 101), (this.y * 83), this.width, this.height);
    }

    // Check if sprites are on the game board
    update(dt) {
        this.isOffBoardX = this.x > 5;
        this.isOffBoardY = this.y < 1;
    }
}

/*
 * ENEMY CLASS
 */
class Enemy extends Entity {
    constructor(x, y, speed) {
        super(x, y);
        this.sprite += 'enemy-bug.png';
        this.speed = speed;
    }
    
    // Update enemy's position
    update(dt) {
        super.update();
        if (this.isOffBoardX) {
            this.x = -1;
        } else {
            this.x += this.speed * dt;
        }
    }
}

/*
 * PLAYER CLASS
 */
class Player extends Entity {
    constructor(x, y) {
        super(x, y);
        this.sprite += 'char-horn-girl.png';
        this.moving = false;
        this.win = false;
    }

    // Check for win
    update() {
        super.update();
        if (this.isOffBoardY && !this.moving && !this.win) {
            this.win = true;
            score.score += 500;
            gameOver();
        }
    }

    // Reset moving to false when rendering occurs
    render() {
        super.render();
        this.moving = false;
    }

    // Move Player based on user input
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= 1;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= 1;
                }
                break;
            case 'right':
                if (this.x < 4) {
                    this.x += 1;
                }
                break;
            case 'down':
                if (this.y < 5) {
                    this.y += 1;
                }
                break;
        }

        this.moving = true;
    }
}

/*
 * GEM CLASS
 */
class Gem extends Entity {
    constructor(x, y, color) {
        super(x, y);
        this.sprite += 'Gem-' + color;
        this.width = 68;
        this.height = 83;
    }
}

/*
 * SCORE
 */
class Score {
    constructor() {
        this.score = 0;
    }

    /*
    render() {
        super.render();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";
        ctx.fillText("Score: " + this.score, this.x, this.y);
    }
    */
}

/* 
 * INSTANTIATE OBJECTS
 */
const score = new Score();

let allEnemies = [];
createEnemies();

// Create 3 enemies + randomly assign y location and speed
function createEnemies() {
    for (let i = 0; i < 3; i++) {
        const x = 0;
        const y = Math.floor((Math.random() * 3) + 1); // random assignment of 1, 2, or 3
        const speed = Math.floor((Math.random() * 6) + 1); // random speed
        
        allEnemies.push(new Enemy(x, y, speed));
    }

    return allEnemies;
}

let allGems = [];
addGems();

// Create 4 gems + randomly assign location and color
function addGems() {
    for (let i = 0; i <= 3; i++) {
        const x = Math.floor((Math.random() * 4)) + 0.15;
        const y = Math.floor((Math.random() * 3) + 1) + 0.55;

        const gemColors = ['Blue2.png', 'Green2.png', 'Orange2.png'];
        const color = gemColors[Math.floor(Math.random() * 3)];

        allGems.push(new Gem(x, y, color));
    }

    return allGems;
}

const player = new Player(2, 5);


/*
 * COLLISIONS
 */ 
const checkCollisions = function() {
    // Check for collision b/t player and enemies; reset player location and decrease score
    allEnemies.forEach(enemy => {
        if (player.y === enemy.y) {
            if (player.x >= enemy.x - 0.5 && player.x <= enemy.x + 0.5) {
                player.x = 2;
                player.y = 5;

                score.score -= 50;
            }
        }
    });

    // Check for collission between player and gems; increase score and remove gem from board
    allGems.forEach(gem => {
        if (player.y + 0.55 === gem.y) {
            if (player.x >+ gem.x - 0.5 && player.x <= gem.x + 0.5) {
                score.score += 100;

                i = allGems.indexOf(gem);
                allGems.splice(i, 1);
            }
        }
    });
};

/*
 * WIN AND RESTART GAME
 */
function clearItems() {
    allEnemies = [];
    allGems = [];
}

function restartGame() {
    player.x = 2;
    player.y = 5;
    player.win = false;

    score.score = 0;

    clearItems();
    createEnemies();
    addGems();
}

const winner = document.getElementById("winner");

function gameOver() {
  setTimeout(function() {
    if (player.win) {
      winner.style.display = "block";
      clearItems();
    }
  }, 250);
}

// Play again button
const playAgain = document.querySelector("#playAgain");
playAgain.addEventListener("click", function() {
  winner.style.display = "none";
  restartGame();
});

// Listen for key presses
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});