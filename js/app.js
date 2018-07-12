/*
 * ENTITY CLASS
 */ 
class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    // Render sprites
    render() {
        ctx.drawImage(Resources.get(this.sprite), (this.x * 101), (this.y * 83));
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
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
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
    constructor() {
        super();
        this.sprite += 'char-boy.png';
    }

    // Update Player's position
    update() {
        super.update();
        // Check for collison
            // Did Player's x and y collide with enemy?
                // IF yes, move player to begninning

        // Check for win
            // Did player's x and y reach final tile?
                // IF yes, alert of win and restartGame()
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
    }
}


/* 
 * INSTANTIATE OBJECTS
 */
let allEnemies = [];
createEnemies();

function createEnemies() {
    for (let i = 0; i < 4; i++) {
        const x = 0;
        const y = Math.floor((Math.random() * 3) + 1); // random assignment of 1, 2, or 3
        const speed = Math.floor((Math.random() * 6) + 1); // random speed
        
        allEnemies.push(new Enemy(x, y, speed));
    }
}

const player = new Player();

/*
 * RESTART GAME
 */
function clearEnemies() {
    allEnemies = [];
}

function restartGame() {
    player.x = 2;
    player.y = 5;

    clearEnemies();
    createEnemies();
}

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
