let player;  // Global variable to hold the player instance

// Game state object to hold progress data
let gameState = {
    score: 0,
    level: 1,
    blueSeeds: 0,
    // Add other game state attributes as needed
};

function loadSWFGame() {
    let file = document.getElementById("swfUpload").files[0];
    if (!file) {
        alert("Please upload a SWF file!");
        return;
    }

    let url = URL.createObjectURL(file);
    let flashContainer = document.getElementById("flash-container");

    let ruffle = window.RufflePlayer.newest();
    player = ruffle.createPlayer();
    flashContainer.innerHTML = ""; // Clear previous game
    flashContainer.appendChild(player);
    player.load(url);

    // Resize player to fit the container
    player.style.width = '100%';
    player.style.height = '100%';

    // Assuming the game’s SWF is capable of providing information about the level, etc.
    // This may require custom modifications to the SWF file to be able to communicate with this page.
    // Otherwise, we would need to simulate or set values manually.
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
    let flashContainer = document.getElementById("flash-container");

    if (!document.fullscreenElement) {
        if (flashContainer.requestFullscreen) {
            flashContainer.requestFullscreen();
        } else if (flashContainer.mozRequestFullScreen) { // Firefox
            flashContainer.mozRequestFullScreen();
        } else if (flashContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
            flashContainer.webkitRequestFullscreen();
        } else if (flashContainer.msRequestFullscreen) { // IE/Edge
            flashContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

// Save Game Progress
function saveGame() {
    // Save actual game state (score, level, etc.)
    const gameProgress = {
        score: gameState.score, // Replace this with your actual game state
        level: gameState.level,
        blueSeeds: gameState.blueSeeds
    };

    // Save the game data to a JSON file
    const blob = new Blob([JSON.stringify(gameProgress)], { type: "application/json" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "game-progress.json";
    link.click();
}

// Load Game Progress
function loadProgress() {
    const fileInput = document.getElementById("loadInput");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const gameData = JSON.parse(event.target.result);
            console.log("Game Progress Loaded:", gameData);

            // Load the game state from the file
            gameState.score = gameData.score;
            gameState.level = gameData.level;
            gameState.blueSeeds = gameData.blueSeeds;

            // Update the game with the loaded progress
            // For example, if you're tracking the score, update that value in your game
            // Update UI or game logic based on the loaded state

            // You may also need to reset the game state in the SWF file if it's necessary.
        };

        reader.readAsText(file);
    } else {
        alert("Please upload a saved game file!");
    }
}

// Event listener to adjust the player size when fullscreen is toggled
document.addEventListener("fullscreenchange", function() {
    let flashContainer = document.getElementById("flash-container");
    if (document.fullscreenElement) {
        // Resize player to fill the container
        player.style.width = '100%';
        player.style.height = '100%';
    } else {
        // Reset player size after exiting fullscreen
        player.style.width = '100%';
        player.style.height = '100%';
    }
});

// Placeholder functions for updating the game state when player performs actions
// These would need to be tied to your game's logic (score increase, level change, etc.)

function updateScore(amount) {
    gameState.score += amount;
}

function updateLevel(level) {
    gameState.level = level;
}

function updateBlueSeeds(amount) {
    gameState.blueSeeds += amount;
}
