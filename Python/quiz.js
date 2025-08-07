const quizzes = {
  python: {
    basic: [
      {
        question: "What is the output of print(2 + 3 * 2)?",
        options: ["10", "8", "12", "7"],
        answer: 1
      },
      {
        question: "Which keyword is used to define a function?",
        options: ["function", "func", "define", "def"],
        answer: 3
      }
    ],
    intermediate: [
      {
        question: "What is the output of: print('apple'[::-1])?",
        options: ["elppa", "apple", "pple", "error"],
        answer: 0
      },
      {
        question: "Which is a mutable built-in type?",
        options: ["tuple", "str", "list", "int"],
        answer: 2
      }
    ],
    advanced: [
      {
        question: "What does the `@staticmethod` decorator do?",
        options: [
          "Creates class method",
          "Creates static method",
          "Creates property",
          "None of the above"
        ],
        answer: 1
      },
      {
        question: "Which of the following uses a generator expression?",
        options: [
          "[x*x for x in range(10)]",
          "{x*x for x in range(10)}",
          "(x*x for x in range(10))",
          "{x: x*x for x in range(10)}"
        ],
        answer: 2
      }
    ]
  }
};

let currentCategory = "python";
let currentLevel = "";
let quizData = [];
let currentQuestion = 0;
let score = 0;

function displayUsername() {
  const username = localStorage.getItem("username") || "User";
  document.getElementById("quiz-header").textContent = `Python Quiz for ${username}`;
}

function startQuiz(level) {
  currentLevel = level;
  quizData = quizzes[currentCategory][level];
  currentQuestion = 0;
  score = 0;
  document.getElementById("difficulty-selection").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= quizData.length) {
    finishQuiz();
    return;
  }
  const q = quizData[currentQuestion];
  const optionsHtml = q.options.map(
    (opt, i) => `<button onclick="checkAnswer(${i})">${opt}</button>`
  ).join("");
  document.getElementById("quiz-box").innerHTML = `
    <div class="question">${q.question}</div>
    <div class="options">${optionsHtml}</div>
    <div class="score">Score: ${score}/${quizData.length}</div>
  `;
}

function checkAnswer(selected) {
  const q = quizData[currentQuestion];
  let result = "";
  if (selected === q.answer) {
    score++;
    result = `<div class="result" style="color:green;">Correct!</div>`;
  } else {
    result = `<div class="result" style="color:red;">Incorrect! Correct: <b>${q.options[q.answer]}</b></div>`;
  }

  document.getElementById("quiz-box").innerHTML += result;

  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 1000);
}

function finishQuiz() {
  const username = localStorage.getItem("username") || "Unknown";
  updateLeaderboard(username, currentLevel, score);

  document.getElementById("quiz-box").innerHTML = `
    <h2>Quiz Completed!</h2>
    <div>Your Score: <b>${score}/${quizData.length}</b></div>
    <button onclick="window.location.href='python.html'">Try Again</button>
    <button onclick="window.location.href='index.html'">Home</button>
  `;

  displayLeaderboard(currentLevel);
}
