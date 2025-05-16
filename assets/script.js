document.addEventListener("DOMContentLoaded", () => {
    const holes = [...document.querySelectorAll(".hole")];
    const scoreElement = document.querySelector('.score span');
    let score = 0;
    let timerInterval; 
    let gameRunning = false;
    const title = "BRICK CLICK";
    const titleElement = document.querySelector("h1");
    titleElement.textContent = "";
    let index = 0;

    function titleEffect() {
        if (index < title.length) {
            titleElement.textContent += title[index];
            index++;
            setTimeout(titleEffect, 200);
        }
    }

    titleEffect();

    // sounds
    const clickSound = new Audio('assets/audio/clickSound.mp3');
    const startSound = new Audio('assets/audio/startSound.mp3');
    startSound.volume = 0.02;

    // Start the game
    function startGame() {
        if (gameRunning) return; 
        gameRunning = true; 
        const startButton = document.getElementById("start-button");
        startButton.style.display = "none"; // hide the button
        startSound.play(); // Play start sound
        let timeLeft = 30; // Countdown
        const timerElement = document.getElementById("timer");

        // Reset the score
        score = 0;
        scoreElement.textContent = score;

        // Timer countdown
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `${timeLeft}ث`;

            // Stop the game after 30 seconds
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "Time's up!";
                alert("Game Over! Your score is: " + score);
                gameRunning = false; 
                startButton.style.display = "inline-block" // Re-enable the button after game ends
            }
        }, 1000);

        // Running the game
        function run() {
            const num = Math.floor(Math.random() * holes.length);
            const hole = holes[num];
        
            // Skip this hole if it's already in use
            if (hole.dataset.locked === "true") {
                run();
                return;
            }
        
            const img = document.createElement('img');
            img.classList.add('plant');
            img.src = 'assets/photos/plant.png';
            hole.dataset.locked = "true"; // Lock the hole
        
            let clicked = false; // Track whether the plant was clicked
        
            // Click event for plants
            img.addEventListener('click', () => {
                if (clicked) return; // Prevent multiple clicks
                clicked = true;
        
                clickSound.play();
        
                // Cycle through images
                setTimeout(() => { img.src = 'assets/photos/plant2.png'; }, 100);
                setTimeout(() => { img.src = 'assets/photos/plant3.png'; }, 200);
                setTimeout(() => {
                    if (hole.contains(img)) {
                        hole.removeChild(img); // Remove the plant after the final image
                        hole.dataset.locked = "false"; // Unlock the hole
                    }
                }, 300);
        
                // Update the score
                score += 10;
                scoreElement.textContent = score;
            });
        
            hole.appendChild(img);
        
            // Remove plant after a second if not clicked
            setTimeout(() => {
                if (!clicked && hole.contains(img)) {
                    hole.removeChild(img); // Simply remove if not clicked
                    hole.dataset.locked = "false"; // Unlock the hole
                }
                if (timeLeft > 0 && gameRunning) {
                    run(); // Continue running the game
                }
            }, 700);
        }

        // Run the game
        run();
    }

    // Event listener to the start button
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startGame);
});
