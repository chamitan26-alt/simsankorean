let questions = [];
let quizQuestions = [];
let currentIndex = 0;
let score = 0;
let loaded = false;

const homeButton = document.getElementById("homeButton");
const homeScreen = document.getElementById("homeScreen");
const startButton = document.getElementById("startButton");

const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question");
const choicesBox = document.getElementById("choices");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("nextButton");



// 問題データ読み込み

fetch("./questions.json")

.then(response => {

  if(!response.ok){

    throw new Error("questions.jsonが見つかりません");

  }

  return response.json();

})


.then(data => {

  questions = data;

  loaded = true;

  questionText.textContent =
  "クイズ開始ボタンを押してください";

})


.catch(error => {

  questionText.textContent =
  "問題データを読み込めません";

  console.log(error);

});





// クイズ開始

startButton.addEventListener("click",()=>{


if(!loaded){

 alert("問題を読み込み中です");

 return;

}


homeScreen.style.display="none";

quiz.style.display="block";


startQuiz();


});






function startQuiz(){


quizQuestions =
[...questions]
.sort(()=>Math.random()-0.5)
.slice(0,10);


currentIndex = 0;

score = 0;


scoreText.textContent =
"現在の得点：0 / 10";


nextButton.style.display="block";


showQuestion();


}







function showQuestion(){


const currentQuestion =
quizQuestions[currentIndex];


questionText.textContent =
currentQuestion.question;


choicesBox.innerHTML="";



currentQuestion.choices.forEach(choice=>{


const button =
document.createElement("button");


button.textContent = choice;


button.className =
"choiceButton";



button.onclick = ()=>{


document
.querySelectorAll(".choiceButton")
.forEach(btn=>{

btn.disabled=true;

});



if(choice === currentQuestion.answer){


score++;


scoreText.textContent =
`現在の得点：${score} / 10`;



questionText.innerHTML =
"⭕ 正解！<br><br>" +
currentQuestion.question;



}else{


questionText.innerHTML =
"❌ 不正解<br><br>" +
"正解は「" +
currentQuestion.answer +
"」です";


}




// 解説表示

if(currentQuestion.explanation){


const explanation =
document.createElement("p");


explanation.innerHTML =
"💡 解説<br>" +
currentQuestion.explanation;


explanation.className =
"explanation";


choicesBox.appendChild(explanation);


}



};


choicesBox.appendChild(button);


});


}







// 次へ

nextButton.onclick = ()=>{


currentIndex++;


if(currentIndex < quizQuestions.length){


showQuestion();


}else{


questionText.innerHTML =
"🎉 クイズ終了！";


choicesBox.innerHTML =
`
<p>
あなたの得点は<br>
${score} / 10点
</p>
`;



nextButton.style.display="none";


}


};
// 戻るボタン

homeButton.addEventListener("click",()=>{

  quiz.style.display="none";

  homeScreen.style.display="block";

  currentIndex=0;

  score=0;

  scoreText.textContent =
  "現在の得点：0 / 10";

});
// 戻るボタン
const homeButton = document.getElementById("homeButton");

homeButton.addEventListener("click", () => {

  quiz.style.display = "none";

  homeScreen.style.display = "block";

  nextButton.style.display = "block";

  score = 0;
  currentIndex = 0;

  scoreText.textContent =
    "現在の得点：0 / 10";

});
