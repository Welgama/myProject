const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Jupiter", "Saturn", "Earth"],
        correctAnswer: "Jupiter"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H", "O", "W", "HO"],
        correctAnswer: "H"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Rhinoceros"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Mercury", "Neptune"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Liver", "Lungs", "Skin"],
        correctAnswer: "Skin"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Gd", "Go"],
        correctAnswer: "Au"
    },
    {
        question: "What is the main language spoken in Japan?",
        options: ["Chinese", "Korean", "Japanese", "Thai"],
        correctAnswer: "Japanese"
    }
];

const totalQuestions = questions.length;
const timePerQuestion = 60; // 60 seconds (1 minute)
let currentQuestion = 0;
let score = 0;
let timer;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();

    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("submitBtn").style.display = "block";
    startTimer();
}

function startTimer() {
    let timeLeft = timePerQuestion;
    const timerElement = document.getElementById("timer");

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft === 0) {
            clearInterval(timer);
            checkOption(null); // No option selected (unanswered question)
        }
    }, 1000);
}

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const questionData = questions[currentQuestion];

    questionElement.textContent = questionData.question;
    optionsElement.innerHTML = "";

    questionData.options.forEach((option) => {
        const liElement = document.createElement("li");
        liElement.textContent = option;
        liElement.addEventListener("click", () => checkOption(option));
        optionsElement.appendChild(liElement);
    });
}

function checkOption(selectedOption) {
    clearInterval(timer); // Stop the timer

    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < totalQuestions) {
        loadQuestion();
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = score;
    document.getElementById("totalQuestions").textContent = totalQuestions;
}

function restartQuiz() {
    document.getElementById("result").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    document.getElementById("submitBtn").style.display = "block";
    startTimer();
}

function reloadQuiz() {
    location.reload();
}

// Load the first question when the page loads
document.getElementById("quiz-container").style.display = "none";
document.getElementById("result").style.display = "none";
