console.log("Welcome to Imperialistic's website!");

// LIGHT / DARK MODE TOGGLE

const themeButton = document.getElementById("theme-toggle");

function applyTheme() {
    const savedTheme = localStorage.getItem("websiteTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }

    if (themeButton) {
        if (savedTheme === "light") {
            themeButton.textContent = "Switch to Dark Mode";
        } else {
            themeButton.textContent = "Switch to Light Mode";
        }
    }
}

// Load the saved theme
applyTheme();

// Change and save the theme when the button is clicked
if (themeButton) {
    themeButton.addEventListener("click", function() {
        const isLightMode = document.body.classList.toggle("light-mode");

        if (isLightMode) {
            localStorage.setItem("websiteTheme", "light");
        } else {
            localStorage.setItem("websiteTheme", "dark");
        }

        applyTheme();
    });
}


// PERSONALIZED GREETING

const greetingButton = document.getElementById("greeting-button");

if (greetingButton) {
    greetingButton.addEventListener("click", function() {
        let visitorName = prompt("What is your name?");

        if (visitorName !== null && visitorName.trim() !== "") {
            alert("Hello, " + visitorName + "! Welcome to Imperialistic's website.");
        } else {
            alert("You did not enter a name. Welcome anyway!");
        }
    });
}


// FACT GENERATOR

const facts = [
    "I am a big aviation enthusiast and spend time using flight simulators. I like to think I could take over in an emergency.",
    "I consider myself a good cook and enjoy preparing food.",
    "I am developing an Indiana Jones-style exploration game involving ancient tombs.",
    "I enjoy riding dirt bikes.",
    "I really dislike math.",
];

const factButton = document.getElementById("fact-button");
const factDisplay = document.getElementById("random-fact");

if (factButton && factDisplay) {
    factButton.addEventListener("click", function() {
        let randomIndex = Math.floor(Math.random() * facts.length);

        factDisplay.textContent = facts[randomIndex];
    });
}


/* SIMPLE SNAKE GAME */

// Only run this code on the page with the game
if (document.getElementById("snake-board")) {

    const board = document.getElementById("snake-board");
    const scoreText = document.getElementById("snake-score");
    const message = document.getElementById("snake-message");
    const startButton = document.getElementById("snake-start");

    let snake = [{ x: 7, y: 7 }];
    let food = { x: 4, y: 4 };
    let direction = "right";
    let nextDirection = "right";
    let score = 0;
    let timer;
    let playing = false;

    // Draw the game board
    function drawGame() {
        board.innerHTML = "";

        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                let cell = document.createElement("div");
                cell.classList.add("snake-cell");

                for (let part of snake) {
                    if (part.x === x && part.y === y) {
                        cell.classList.add("snake-body");
                    }
                }

                if (food.x === x && food.y === y) {
                    cell.classList.add("snake-food");
                }

                board.appendChild(cell);
            }
        }
    }

    // Move the snake
    function moveSnake() {
        direction = nextDirection;

        let head = {
            x: snake[0].x,
            y: snake[0].y
        };

        if (direction === "up") head.y--;
        if (direction === "down") head.y++;
        if (direction === "left") head.x--;
        if (direction === "right") head.x++;

        // Check if food was eaten
        let ateFood = head.x === food.x && head.y === food.y;

        // Check walls and snake body
        let body = ateFood ? snake : snake.slice(0, -1);

        if (
            head.x < 0 || head.x >= 15 ||
            head.y < 0 || head.y >= 15 ||
            body.some(part => part.x === head.x && part.y === head.y)
        ) {
            clearInterval(timer);
            playing = false;
            message.textContent = "Game Over! Final Score: " + score;
            return;
        }

        snake.unshift(head);

        if (ateFood) {
            score += 10;
            scoreText.textContent = score;
            message.textContent = "Nice! +10 points!";

            // Find an empty spot for new food
            if (snake.length === 225) {
                clearInterval(timer);
                playing = false;
                message.textContent = "You win! Score: " + score;
                drawGame();
                return;
            }

            do {
                food = {
                    x: Math.floor(Math.random() * 15),
                    y: Math.floor(Math.random() * 15)
                };
            } while (snake.some(part =>
                part.x === food.x && part.y === food.y
            ));

        } else {
            snake.pop();
        }

        drawGame();
    }

    // Start or restart
    function startGame() {
        clearInterval(timer);

        snake = [{ x: 7, y: 7 }];
        food = { x: 4, y: 4 };
        direction = "right";
        nextDirection = "right";
        score = 0;
        playing = true;

        scoreText.textContent = score;
        message.textContent = "Use the arrow keys!";
        startButton.textContent = "Start Game";

        drawGame();
        timer = setInterval(moveSnake, 200);
    }

    // Button click event
    startButton.addEventListener("click", startGame);

    // Keyboard event
    document.addEventListener("keydown", function(event) {
        if (!playing) return;

        if (event.key.startsWith("Arrow")) {
            event.preventDefault();
        }

        if (event.key === "ArrowUp" && direction !== "down") {
            nextDirection = "up";
        }
        if (event.key === "ArrowDown" && direction !== "up") {
            nextDirection = "down";
        }
        if (event.key === "ArrowLeft" && direction !== "right") {
            nextDirection = "left";
        }
        if (event.key === "ArrowRight" && direction !== "left") {
            nextDirection = "right";
        }
    });

    // Show the board before the game starts
    drawGame();
}
