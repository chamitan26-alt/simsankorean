let questions = [];
let quizQuestions = [];
let currentIndex = 0;
let score = 0;
let loaded = false;

// HTML要素の取得
const homeButton = document.getElementById("homeButton");
const homeScreen = document.getElementById("homeScreen");
const startButton = document.getElementById("startButton");

const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question");
const choicesBox = document.getElementById("choices");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("nextButton");

// 1. 問題データ（questions.json）の読み込み
fetch("./questions.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("questions.jsonが見つかりません");
    }
    return response.json();
  })
  .then(data => {
    questions = data;
    loaded = true;
  })
  .catch(error => {
    questionText.textContent = "問題データを読み込めません";
    console.error(error);
  });

// 2. クイズ開始ボタンの挙動
startButton.addEventListener("click", () => {
  if (!loaded) {
    alert("問題を読み込み中です。少し待ってから再度お試しください。");
    return;
  }

  homeScreen.style.display = "none";
  quiz.style.display = "block";

  startQuiz();
});

// 3. クイズ初期化処理
function startQuiz() {
  // 10問題をランダム抽出
  quizQuestions = [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  currentIndex = 0;
  score = 0;

  scoreText.textContent = "現在の得点：0 / 10";
  showQuestion();
}

// 4. 問題表示処理
function showQuestion() {
  const currentQuestion = quizQuestions[currentIndex];

  // 問題文のセット
 // 問題文のセット
questionText.textContent = currentQuestion.question;
choicesBox.innerHTML = "";

// 解答するまでは「次へ」ボタンを隠す
nextButton.style.display = "none";

// 選択肢をコピーしてシャッフル
const shuffledChoices = [...currentQuestion.choices].sort(() => Math.random() - 0.5);

// シャッフルした選択肢を表示
shuffledChoices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.className = "choiceButton";

    button.onclick = () => {
      // 全ての選択肢ボタンを無効化（連打防止）
      document.querySelectorAll("#choices button").forEach(btn => {
        btn.disabled = true;
      });

      // 正誤判定
      if (choice === currentQuestion.answer) {
        score++;
        scoreText.textContent = `現在の得点：${score} / 10`;
        questionText.innerHTML = "⭕ 正解！<br><br>" + currentQuestion.question;
      } else {
        questionText.innerHTML = 
          "❌ 不正解<br><br>" + 
          "正解は「" + currentQuestion.answer + "」です";
      }

      // 解説の表示
      if (currentQuestion.explanation) {
        const explanation = document.createElement("p");
        explanation.className = "explanation";
        explanation.innerHTML = "💡 <b>解説</b><br>" + currentQuestion.explanation;
        choicesBox.appendChild(explanation);
      }

      // 回答後に「次へ」ボタンを表示
      nextButton.style.display = "block";
    };

    choicesBox.appendChild(button);
  });
}

// 5. 「次へ」ボタンの挙動
nextButton.onclick = () => {
  currentIndex++;

  if (currentIndex < quizQuestions.length) {
    showQuestion();
  } else {
    // クイズ終了画面の処理
    questionText.innerHTML = "🎉 クイズ終了！";
    document.getElementById("simImage").src = "shimsan2.png";
    choicesBox.innerHTML = `
      <p style="font-size: 1.2rem; font-weight: bold; line-height: 1.6;">
        あなたの最終得点は<br>
        <span style="font-size: 1.8rem; color: #ff6b81;">${score} / 10点</span> です！
      </p>
    `;
    scoreText.style.display = "none";
    nextButton.style.display = "none";
  }
};

// 6. 「← 戻る」ボタンの挙動
homeButton.addEventListener("click", () => {

  // シムさんを元に戻す
  document.getElementById("simImage").src = "shimsan.png";

  quiz.style.display = "none";
  homeScreen.style.display = "block";

  // 状態のリセット
  currentIndex = 0;
  score = 0;
  scoreText.textContent = "現在の得点：0 / 10";
  scoreText.style.display = "block";
});
