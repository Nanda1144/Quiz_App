// Question database per category
const quizzes = {
  python: [
    {
      question: "What is the output of print(2 ** 3)?",
      options: ["6", "8", "9", "12"],
      answer: 1 // index of correct
    },
    {
      question: "Which keyword is used for function in Python?",
      options: ["func", "def", "function", "define"],
      answer: 1
    },
    {
      question: "Which of the following is not a data type in Python?",
      options: ["list", "tuple", "array", "set"],
      answer: 2
    }
  ]
};

// changes the web pages.
function getCategoryFromPage() {
  const currentPage = window.location.pathname.split("/").pop();
  return currentPage.replace(".html", "");
}
// understand the user inout and qyiz questions
const quizCategory = getCategoryFromPage();
const quizData = quizzes[quizCategory] || [];
let currentQuestion = 0;
let score = 0;

// store the user name for some time.
function displayUsername() {
  const username = localStorage.getItem("username") || "User";
  document.getElementById("quiz-header").textContent = `${quizCategory.toUpperCase()} Quiz for ${username}`;
}

// it will dispaly the questions and evaluate
function showQuestion() {
  if (currentQuestion >= quizData.length) {
    showFinalScore();
    return;
  }
  const q = quizData[currentQuestion];
  const optionsHtml = q.options
    .map(
      (opt, i) =>
        `<button onclick="checkAnswer(${i})">${opt}</button>`
    )
    .join("");
  document.getElementById("quiz-box").innerHTML = `
    <div class="question">${q.question}</div>
    <div class="options">${optionsHtml}</div>
    <div class="score">Score: ${score}/${quizData.length}</div>
  `;
}

// evalute the correct questions & provide the score.
function checkAnswer(selected) {
  const q = quizData[currentQuestion];
  let resultHtml = "";
  if (selected === q.answer) {
    resultHtml = `<div class="result" style="color:green;">Correct!</div>`;
    score++;
  } else {
    resultHtml = `<div class="result" style="color:red;">Incorrect! Correct Answer: <b>${q.options[q.answer]}</b></div>`;
  }
  document.getElementById("quiz-box").innerHTML += resultHtml;
  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 1200);
}

// if user get high score it will dispaly tge congralutions and go back to the home.
function showFinalScore() {
  document.getElementById("quiz-box").innerHTML = `
    <h2>Quiz Completed!</h2>
  
    <div>Your final score is <b>${score} / ${quizData.length}</b></div>
    <button onclick="window.location.href='index.html'">Go Home</button>
  `;
  alermsg();
}

window.onload = function () {
  displayUsername();
  showQuestion();
};
 
function alermsg()
{
  let name=prompt('This python Quiz you compeleted');
  alert( `Congratulations 🎉🎉 ${name}` );
}