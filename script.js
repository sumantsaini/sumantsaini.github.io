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
