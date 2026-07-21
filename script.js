let questions = [];
let quizQuestions = [];
let currentIndex = 0;
let score = 0;

const homeScreen = document.getElementById("homeScreen");
const startButton = document.getElementById("startButton");

const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question");
const choicesBox = document.getElementById("choices");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("nextButton");


// 問題データ読み込み
fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
  })
  .catch(error => {
    console.log("問題データ読み込みエラー", error);
  });


// クイズ開始ボタン
startButton.addEventListener("click", () => {

  homeScreen.style.display = "none";
  quiz.style.display = "block";

  startQuiz();

});


// クイズ開始
function startQuiz(){

  quizQuestions = [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0,10);

  currentIndex = 0;
  score = 0;

  scoreText.textContent = 
    "現在の得点：0 / 10";

  showQuestion();

}


// 問題表示
function showQuestion(){

  const currentQuestion = quizQuestions[currentIndex];

  questionText.textContent =
    currentQuestion.question;

  choicesBox.innerHTML = "";


  currentQuestion.choices.forEach(choice => {

    const button = document.createElement("button");

    button.textContent = choice;

    button.className = "choiceButton";


    button.addEventListener("click", () => {

      if(choice === currentQuestion.answer){

        score++;

        scoreText.textContent =
          `現在の得点：${score} / 10`;

      }


      // 連続回答防止
      document
        .querySelectorAll(".choiceButton")
        .forEach(btn => {
          btn.disabled = true;
        });

    });


    choicesBox.appendChild(button);

  });

}


// 次へボタン
nextButton.addEventListener("click", () => {


  currentIndex++;


  if(currentIndex < quizQuestions.length){

    showQuestion();

  }else{

    questionText.textContent =
      "🎉 クイズ終了！";

    choicesBox.innerHTML =
      `
      <p>
      あなたの得点は<br>
      ${score} / 10 点
      </p>
      `;

    nextButton.style.display = "none";

  }

});
