const quizData = [
    {
        question: "Which MLB team won the World Series in 2020?",
        options: ["Yankees", "Astros", "Rays", "Dodgers"],
        answer: 3,
    },
    {
        question: "What pitcher threw the last perfect game?",
        options: ["Domingo German", "Blake Snell", "Shohei Ohtani", "Babe Ruth"],
        answer: 0,
    },
    {
        question: "What year did Babe Ruth retire?",
        options: ["1950", "1935", "1921", "1960"],
        answer: 1,
    },
    {
        question: "Which team is the last team to score 30 runs?",
        options: ["Rangers", "Athletics", "Cubs", "Braves"],
        answer: 0,
    },
    {
        question: "Which team has the most World Series wins?",
        options: ["Red Sox", "Astros", "Yankees", "Dodgers"],
        answer: 2,
    },
];

shuffleArray(quizData)

    let currentQuestionIndex = 0;
    let score = 0;
    let answerSelected = false;


    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("nextbutton");
    const scoreContainer = document.getElementById("score-container");
    const scoreDisplay = document.getElementById("score");
    const restartButton = document.getElementById("restart-button");
    const quizContainer = document.getElementById("quiz-container");
    
    function loadQuestion() {
    optionsContainer.innerHTML = "";
    answerSelected = false;

    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option-button");
        optionButton.addEventListener("click", () => handleOption(index));
        optionsContainer.appendChild(optionButton);
    });
    }

    function handleOption(selectedIndex) {
    if (answerSelected) return;
    answerSelected = true;

    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;
    const optionButtons = document.querySelectorAll(".option-button");

    optionButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) {
        button.style.backgroundColor = "#ebdb47ff"; 
        }
        if (index === selectedIndex && selectedIndex !== correctIndex) {
        button.style.backgroundColor = "#ff8710e7"; 
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
    }
    }

    function goToNextQuestion() {
    if (!answerSelected) {
        alert("Please select an answer.");
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
    }

    function showFinalScore() {
        quizContainer.classList.add("hidden");
        scoreContainer.classList.remove("hidden");
        scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}`;
    }

    function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
    }

    nextButton.addEventListener("click", goToNextQuestion);
    restartButton.addEventListener("click", restartQuiz);
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
    }
}


    loadQuestion();
