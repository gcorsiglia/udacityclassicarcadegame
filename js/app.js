/*
 * ENEMY CLASS
 */
class Enemy {
    constructor() {
        // Set image
        this.sprite = 'images/enemy-bug.png';

        // Rest of properties and variables go here
            // Set initial location
                // x pos
                // y pos
            // Set speed
    }

    // Methods go here
    
    // Update enemy's position
    update(dt) {
        // Parameter: dt, a time delta between ticks

        // Multiply any movement by the dt parameter

        // If enemy is not paseed boundary
            // Move forward
            // Increment x by speed * dt
        // else
            // Resest position to start
    }

    // Draw the enemy on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/*
 * PLAYER CLASS
 */
class Player {
    constructor() {
        // Set image
        this.sprite = 'images/char-boy.png';

        // Rest of properties and variables go here
            // Set location
                // x pos
                // y pos
    }

    // Methods go here

    // Update Player's position
    update(dt) {
        // Multiply any movement by the dt parameter

        // Check for collison
            // Did Player's x and y collide with enemy?

        // Check for win
            // Did player's x and y reach final tile?
                // IF yes, reset game
    }

    // Draw the player on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Move Player based on user input
    handleInput() {
        // Receive key presses + allowedKeys
        // Update Player's x and y according to input
        // NO moving offscreen
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
