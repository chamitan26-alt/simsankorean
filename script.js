let questions = [];
let quizQuestions = [];
let currentIndex = 0;
let score = 0;
const homeButton = document.getElementById("homeButton");
const questionText = document.getElementById("question");
const choicesBox = document.getElementById("choices");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("nextButton");


// 問題データ読み込み
fetch("questions.json")
  .then(response => response.json())
  .then(data => {

    questions = data;

    // 10問ランダム出題
    quizQuestions = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    showQuestion();

  })
  .catch(error => {

    questionText.textContent =
      "問題データを読み込めませんでした";

    console.error(error);

  });



// 問題表示
function showQuestion() {

  const q = quizQuestions[currentIndex];


  questionText.textContent =
    `${currentIndex + 1}問目：${q.question}`;


  choicesBox.innerHTML = "";


  // ★選択肢を毎回シャッフル
  const shuffledChoices =
    [...q.choices].sort(() => Math.random() - 0.5);



  shuffledChoices.forEach(choice => {


    const button =
      document.createElement("button");


    button.textContent = choice;


    button.className =
      "choiceButton";


    button.onclick = () =>
      checkAnswer(button, choice);



    choicesBox.appendChild(button);


  });



  nextButton.style.display = "none";


  scoreText.textContent =
    `現在の得点：${score} / 10`;

}




// 正解判定
function checkAnswer(button, choice) {


  const correct =
    quizQuestions[currentIndex].answer;



  const buttons =
    document.querySelectorAll(".choiceButton");



  buttons.forEach(btn => {


    btn.disabled = true;


    if(btn.textContent === correct){

      btn.style.fontWeight = "bold";

    }


  });



  if(choice === correct){


    button.textContent += " ◎ 正解！";


    score++;


  } else {


    button.textContent += " ✕";


  }



  scoreText.textContent =
    `現在の得点：${score} / 10`;



  nextButton.style.display =
    "block";


}




// 次の問題
nextButton.onclick = () => {


  currentIndex++;



  if(currentIndex < quizQuestions.length){


    showQuestion();



  } else {



    questionText.textContent =
      "🎉 クイズ終了！";



    choicesBox.innerHTML =
      `<p>あなたの得点は ${score} / 10 点でした！</p>`;



    nextButton.style.display =
      "none";



  }


};
homeButton.addEventListener("click", () => {
  location.reload();
});
