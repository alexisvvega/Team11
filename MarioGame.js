const mario = document.getElementById('mario');
const game = document.getElementById('game');
const scoreboard = document.getElementById('scoreboard');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const restartButton = document.getElementById('restartButton');
const controls = document.getElementById('controls');
let score = 0;
let gameInterval;
let gameRunning = false;
let isPaused = false;  // Track if the game is paused
let activeCoins = []; // Store active coins
let activeCursedCoins = []; // Store active cursed coins

// Function to update the scoreboard
function updateScore(points) {
    score += points;
    scoreboard.innerText = `Score: ${score}`;
}

// Function to start the game
function startGame() {
    startButton.style.display = 'none'; // Hide the Start button
    controls.classList.remove('hidden'); // Show the Pause and Restart buttons
    gameRunning = true;
    isPaused = false; // Reset paused state
    pauseButton.innerText = 'Pause'; // Set the button text to 'Pause'
    
    // Start spawning coins and cursed coins
    gameInterval = setInterval(() => {
        spawnCoin();
        spawnCursedCoin();
    }, 1000);
}

// Function to pause the game
function pauseGame() {
    clearInterval(gameInterval); // Stop the coin and cursed coin spawn
    gameRunning = false;
    isPaused = true;
    pauseButton.innerText = 'Resume'; // Change button text to 'Resume'
    // Stop all active falling coins
    activeCoins.forEach(coin => {
        coin.fallInterval && clearInterval(coin.fallInterval);
    });
    activeCursedCoins.forEach(cursedCoin => {
        cursedCoin.fallInterval && clearInterval(cursedCoin.fallInterval);
    });
}

// Function to resume the game
function resumeGame() {
    gameRunning = true;
    isPaused = false;
    pauseButton.innerText = 'Pause'; // Change button text back to 'Pause'
    
    // Restart the falling intervals for coins and cursed coins
    activeCoins.forEach(coin => {
        coin.fallInterval = setInterval(coin.fall, 50);
    });
    activeCursedCoins.forEach(cursedCoin => {
        cursedCoin.fallInterval = setInterval(cursedCoin.fall, 50);
    });

    // Restart coin and cursed coin spawning
    gameInterval = setInterval(() => {
        spawnCoin();
        spawnCursedCoin();
    }, 1000);
}

// Function to restart the game
function restartGame() {
    score = 0;
    scoreboard.innerText = `Score: ${score}`;

    // Remove only coins and bombs from the game area
    const allCoins = document.querySelectorAll('.coin');
    const allCursedCoins = document.querySelectorAll('.cursed-coin');

    // Remove all coin elements
    allCoins.forEach(coin => coin.remove());

    // Remove all cursed coin (bomb) elements
    allCursedCoins.forEach(bomb => bomb.remove());

    clearInterval(gameInterval);
    gameRunning = false;
    isPaused = false;

    startButton.style.display = 'block'; // Show the Start button again
    controls.classList.add('hidden'); // Hide the controls
    pauseButton.innerText = 'Pause'; // Reset the button text to 'Pause'

    activeCoins = []; // Reset active coins
    activeCursedCoins = []; // Reset active cursed coins
}

// Move Mario with the arrow keys
document.addEventListener('keydown', (event) => {
    const left = parseInt(window.getComputedStyle(mario).getPropertyValue("left"));

    if (event.key === 'ArrowLeft' && left > 0) {
        mario.style.left = `${left - 10}px`;
    }
    if (event.key === 'ArrowRight' && left < 370) { // Boundary check
        mario.style.left = `${left + 10}px`;
    }
});

// Check if Mario collides with a coin
function checkCollision(coin) {
    const marioRect = mario.getBoundingClientRect();
    const coinRect = coin.getBoundingClientRect();

    return !(
        marioRect.top > coinRect.bottom ||
        marioRect.bottom < coinRect.top ||
        marioRect.left > coinRect.right ||
        marioRect.right < coinRect.left
    );
}

// Function to create a falling regular coin
function spawnCoin() {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${Math.random() * 380}px`;
    coin.style.top = `0px`; // Start at the top
    game.appendChild(coin);

    // Create the coin object with its fall behavior
    const coinObj = {
        element: coin,
        fall: function () {
            let top = parseInt(coin.style.top);
            if (top < 330) { // Make sure the coin falls all the way down (stopping before grass)
                coin.style.top = `${top + 5}px`;

                // Check for collision
                if (checkCollision(coin)) {
                    updateScore(10);
                    coin.remove();
                    clearInterval(coinObj.fallInterval);
                    activeCoins = activeCoins.filter(c => c !== coinObj); // Remove from active coins
                }
            } else {
                coin.remove();
                clearInterval(coinObj.fallInterval);
                activeCoins = activeCoins.filter(c => c !== coinObj); // Remove from active coins
            }
        },
        fallInterval: setInterval(function() {
            coinObj.fall();
        }, 50) // Start the falling
    };

    // Add to active coins array
    activeCoins.push(coinObj);
}

// Function to create a falling cursed coin
function spawnCursedCoin() {
    const cursedCoin = document.createElement('div');
    cursedCoin.classList.add('cursed-coin');
    cursedCoin.style.left = `${Math.random() * 380}px`;
    cursedCoin.style.top = `0px`; // Start at the top
    game.appendChild(cursedCoin);

    // Create the cursed coin object with its fall behavior
    const cursedCoinObj = {
        element: cursedCoin,
        fall: function () {
            let top = parseInt(cursedCoin.style.top);
            if (top < 330) { // Make sure the cursed coin falls all the way down (stopping before grass)
                cursedCoin.style.top = `${top + 5}px`;

                // Check for collision
                if (checkCollision(cursedCoin)) {
                    updateScore(-20);
                    cursedCoin.remove();
                    clearInterval(cursedCoinObj.fallInterval);
                    activeCursedCoins = activeCursedCoins.filter(c => c !== cursedCoinObj); // Remove from active cursed coins
                }
            } else {
                cursedCoin.remove();
                clearInterval(cursedCoinObj.fallInterval);
                activeCursedCoins = activeCursedCoins.filter(c => c !== cursedCoinObj); // Remove from active cursed coins
            }
        },
        fallInterval: setInterval(function() {
            cursedCoinObj.fall();
        }, 50) // Start the falling
    };

    // Add to active cursed coins array
    activeCursedCoins.push(cursedCoinObj);
}

// Event listeners for control buttons
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', () => {
    if (isPaused) {
        resumeGame(); // Resume if the game is currently paused
    } else {
        pauseGame(); // Pause if the game is currently running
    }
});
restartButton.addEventListener('click', restartGame);

function goBack() {
    window.location.href = "index.html"; // Replace with your home screen's relative path
}