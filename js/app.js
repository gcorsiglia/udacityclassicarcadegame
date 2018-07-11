/*
 * ENTITY CLASS
 */ 
class Entity {
    constructor() {
        this.sprite = 'images/';
        this.col = 101;
        this.row = 83;
        this.x = 0;
        this.y = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/*
 * ENEMY CLASS
 */
class Enemy extends Entity {
    constructor(x, y) {
        super();
        // Set image
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        // Set speed
    }
    
    // Update enemy's position
    update(dt) {
        // Parameter: dt, a time delta between ticks

        // Multiply any movement by the dt parameter

        // If enemy is not paseed edge of board
            // Move forward
            // Increment x by speed * dt
        // else
            // Resest position to start
    }    
}

/*
 * PLAYER CLASS
 */
class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
        this.startX = this.col * 2;
        this.startY = this.row * 5;
        this.x = this.startX;
        this.y = this.startY;
    }

    // Update Player's position
    update() {
        // Check for collison
            // Did Player's x and y collide with enemy?
                // IF yes, move player to begninning

        // Check for win
            // Did player's x and y reach final tile?
                // IF yes, reset game
    }

    // Move Player based on user input
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.col;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.row;
                }
                break;
            case 'right':
                if (this.x < this.col * 4) {
                    this.x += this.col;
                }
                break;
            case 'down':
                if (this.y < this.row * 5) {
                    this.y += this.row;
                }
                break;
        }
    }

    // Reset Player
    reset() {
        // Set x and y to starting x an y
    }
}


/* 
 * INSTANTIATE OBJECTS
 */
const allEnemies = [];
// Create multiple new enemy objects
    // Use loop to create up to certain number
// Push each enemy object to allEnemies array

/* for (const i = 0; i <= 5; i += 1) {
    let enemy[i] = new Enemy();
    allEnemies.push(enemy[i]);
} */

// Player object
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
