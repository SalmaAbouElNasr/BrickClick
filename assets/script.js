document.addEventListener("DOMContentLoaded", () => {
    const holes = [...document.querySelectorAll(".hole")];
    const scoreElement = document.querySelector('.score span');
    let score = 0;
    let timerInterval; 

    const title = "Brick Click";
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

    // start the game
    function startGame() {
        let timeLeft = 30; // count down
        const timerElement = document.getElementById("timer");

        // Reset 
        score = 0;
        scoreElement.textContent = score;

        //timer
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `${timeLeft}ث`;

            // Stop the game after 30 seconds
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "Time's up!";
                alert("Game Over! Your score is: " + score);
            }
        }, 1000);

        // Running the game
        function run() {
            const num = Math.floor(Math.random() * holes.length);
            const hole = holes[num];
            const img = document.createElement('img');
            img.classList.add('plant');
            img.src = 'assets/photos/plant.png';

            // click event for plants
            img.addEventListener('click', () => {
                score += 10;
                scoreElement.textContent = score;
                hole.removeChild(img);
            });

            hole.appendChild(img);

            // Remove cactus after a second
            setTimeout(() => {
                if (hole.contains(img)) {
                    hole.removeChild(img);
                }
                if (timeLeft > 0) {
                    run(); 
                }
            }, 700);
        }

        // running
        run();
    }

    //event listener to the start button
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startGame);
});