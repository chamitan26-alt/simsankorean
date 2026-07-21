let questions = [];
let quiz = [];
let current = 0;
let score = 0;

const startButton = document.getElementById("startButton");
const quizArea = document.getElementById("quiz");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const result = document.getElementById("result");
const explanation = document.getElementById("explanation");
const scoreLabel = document.getElementById("score");
const nextButton = document.getElementById("nextButton");
const homeButton = document.getElementById("homeButton");

fetch("questions.json")
.then(res => res.json())
.then(data => {
    questions = data;
});

startButton.addEventListener("click", () => {

    score = 0;
    current = 0;

    quiz = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0,10);

    startButton.style.display = "none";
    quizArea.style.display = "block";

    showQuestion();

});

function showQuestion(){

    scoreLabel.textContent =
        `現在の得点：${score} / ${quiz.length}`;

    result.textContent = "";
    explanation.textContent = "";
    nextButton.style.display = "none";

    const q = quiz[current];

    question.textContent =
        `第${current+1}問\n${q.question}`;

    choices.innerHTML = "";

    q.choices.forEach(choice=>{

        const btn = document.createElement("button");

        btn.textContent = choice;

        btn.onclick = ()=>checkAnswer(choice);

        choices.appendChild(btn);

    });

}function checkAnswer(choice){

    const q = quiz[current];

    const buttons = choices.querySelectorAll("button");

    buttons.forEach(btn=>{
        btn.disabled = true;

        if(btn.textContent===q.answer){
            btn.style.background="#90EE90";
        }

        if(btn.textContent===choice && choice!==q.answer){
            btn.style.background="#FFB6C1";
        }
    });

    if(choice===q.answer){
        score++;
        result.textContent="⭕ 正解！";
    }else{
        result.textContent=`❌ 不正解（正解：${q.answer}）`;
    }

    explanation.textContent=q.explanation;

    scoreLabel.textContent=`現在の得点：${score} / ${quiz.length}`;

    nextButton.style.display="block";

}

nextButton.addEventListener("click",()=>{

    current++;

    if(current>=quiz.length){

        question.textContent="お疲れさまでした！";

        choices.innerHTML="";

        result.innerHTML=`<h2>あなたの得点は ${score} / ${quiz.length} 点でした！🎉</h2>`;

        explanation.textContent="また挑戦してくださいね♪";

        nextButton.style.display="none";

        return;

    }

    showQuestion();

});

homeButton.addEventListener("click",()=>{

    quizArea.style.display="none";

    startButton.style.display="block";

    result.textContent="";

    explanation.textContent="";

    choices.innerHTML="";

});
