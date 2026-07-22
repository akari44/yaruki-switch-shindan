// ====================================
// 依頼主カスタマイズ設定（ここを変更）
// ====================================
const config = {
  intro: "何度言っても動かない…\nそれ、「個性」かも？",  // ← 前置き文（雲の中の文字）
  ctaLead: "「じゃあ、どう声をかければいいの？」\nその答えの続きは、ここにあります。",  // ← CTA導入文（来た人の"知りたい"に橋渡し）
  item3: "無料個別相談会（30分）",          // ← 3つ目のプレゼント内容
  limited: "数量限定のプレゼントです！お早めにお受け取りください🎁",  // ← 限定文
  btnText: "LINEで受け取る（無料）",        // ← ボタンの文言
  url: "#",                                 // ← リンク先URL
};
// ====================================

const questions = [
  {
    text: "運動会で、わが子が楽しみにしていることがあるとしたら？",
    choices: [
      { label: "1位をとったり、チームで優勝して、周りから「すごいね」と褒められること", type: "A" },
      { label: "かけっこや玉入れ、ダンスなど、種目やお祭りの雰囲気そのもの", type: "B" },
      { label: "1位とかじゃなくても、自分なりの目標を達成すること", type: "C" }
    ]
  },
  {
    text: "粘土やブロックなど、何かを作っているとき、わが子は何を考えていると思う？",
    choices: [
      { label: "「できたらママに見せよう！」と、完成を見せて喜んでもらうことを思い浮かべてる", type: "A" },
      { label: "「これどうなるかな？」と、作る過程や試すこと自体を楽しんでる", type: "B" },
      { label: "「自分のイメージ通りに仕上げたい」と、こだわりに向かってる", type: "C" }
    ]
  },
  {
    text: "難しいこと（自転車・鉄棒・難しいパズルなど）がうまくいかないとき、わが子は？",
    choices: [
      { label: "拗ねたり「もうやらない」とやめてしまう（できない姿を見られたくない）", type: "A" },
      { label: "「なんで？どうやったらできる？」とやり方・アドバイスを聞く", type: "B" },
      { label: "黙々と自分のやり方で続ける（または「自分でやりたい！」と手出しを怒る）", type: "C" }
    ]
  }
];

const results = {
  A: {
    img: "img/type-a.png",
    type: "「見てるよ」スイッチ",
    description: "3問診断の結果では、お子さんは「見てるよ」タイプ。\n\nついつい…\n<strong>「自分でやって！」</strong>\n<strong>「まだできてないの？」</strong>\nしていませんか？\n\nこの子のやる気は、突き放す言葉の反対側——「ちゃんと見てるよ」の一言の中にあります。\n声が届かなかったんじゃなく、スイッチの場所がちょっと違っただけ。\n場所がわかれば、同じ毎日が驚くほど変わるかもしれません。"
  },
  B: {
    img: "img/type-b.png",
    type: "「おもしろいよ」スイッチ",
    description: "3問診断の結果では、お子さんは「おもしろいよ」タイプ。\n\nついつい…\n<strong>「今その時間じゃない！」</strong>\n<strong>「やることはやるの！」</strong>\nと、理由なくさえぎっていませんか？\n\nこの子のやる気は、正しさよりも「どうなるかな？」のワクワクの中にあります。\nやる気がないんじゃなく、面白さの入り口でブレーキをかけられていただけ。\n夢中の入り口が見つかれば、驚くほど自分から動き出すかもしれません。"
  },
  C: {
    img: "img/type-c.png",
    type: "「決めれるよ」スイッチ",
    description: "3問診断の結果では、お子さんは「決めれるよ」タイプ。\n\nついつい…\n<strong>「こっちにしなさい」</strong>\n<strong>「ママの言うとおりにして」</strong>\nと、先に決めていませんか？\n\nこの子のやる気は、指示の中ではなく「自分で決めた」という実感の中にあります。\n言うことを聞かないんじゃなく、スイッチの場所がちょっと違っただけ。\n選ばせる・任せるに変えるだけで、驚くほど動き出すかもしれません。"
  }
};

let current = 0;
let scores = { A: 0, B: 0, C: 0 };

// 前置き文をセット
document.getElementById("intro-text").textContent = config.intro;

// タイトルホバーで★が飛ぶ
const title = document.getElementById("main-title");
const starsContainer = document.getElementById("stars-container");

title.addEventListener("mouseenter", () => {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => spawnStar(), i * 60);
  }
});

function spawnStar() {
  const star = document.createElement("span");
  star.classList.add("star");
  star.textContent = ["★", "☆", "✦", "✧"][Math.floor(Math.random() * 4)];
  const dx = (Math.random() - 0.5) * 120;
  const dy = -(Math.random() * 80 + 20);
  star.style.setProperty("--dx", dx + "px");
  star.style.setProperty("--dy", dy + "px");
  star.style.left = (30 + Math.random() * 40) + "%";
  star.style.top = (20 + Math.random() * 40) + "%";
  star.style.color = ["#e07060", "#f0a090", "#ffc0b0", "#ffdd88"][Math.floor(Math.random() * 4)];
  starsContainer.appendChild(star);
  setTimeout(() => star.remove(), 800);
}

// スタートボタン
document.getElementById("btn-start").addEventListener("click", () => {
  document.getElementById("screen-start").classList.add("hidden");
  document.getElementById("screen-quiz").classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[current];
  document.getElementById("question-number").textContent = `Q${current + 1} / ${questions.length}`;

  // プログレスバー更新
  const progress = ((current) / questions.length) * 100;
  document.getElementById("progress-fill").style.width = progress + "%";

  document.getElementById("question-text").textContent = q.text;

  const choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.label;
    btn.classList.add("choice-btn");
    btn.addEventListener("click", () => {
      // 光るエフェクト
      btn.classList.add("selected");
      // 少し待ってから次へ
      setTimeout(() => answer(choice.type), 350);
    });
    choicesEl.appendChild(btn);
  });
}

function answer(type) {
  scores[type]++;
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("screen-quiz").classList.add("hidden");

  // プログレスバー100%
  document.getElementById("progress-fill").style.width = "100%";

  const resultScreen = document.getElementById("screen-result");
  resultScreen.classList.remove("hidden");

  const top = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const result = results[top];

  const img = document.getElementById("result-img");
  img.src = result.img;
  img.alt = result.type;
  document.getElementById("result-type").textContent = result.type;
  document.getElementById("result-description").innerHTML = result.description;

  // CTAをconfigから設定
  document.getElementById("cta-lead").textContent = config.ctaLead;
  document.getElementById("cta-item3").textContent = config.item3;
  document.getElementById("cta-limited").textContent = config.limited;
  const btnCta = document.getElementById("btn-cta");
  btnCta.textContent = config.btnText;
  btnCta.href = config.url;

  // キラキラを飛ばす
  setTimeout(() => spawnSparkles(), 400);
}

function spawnSparkles() {
  const container = document.getElementById("sparkles");
  const sparkleChars = ["✨", "⭐", "💫", "🌟", "✦", "★"];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const s = document.createElement("span");
      s.classList.add("sparkle");
      s.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
      const dx = (Math.random() - 0.5) * 200;
      const dy = -(Math.random() * 150 + 30);
      s.style.setProperty("--dx", dx + "px");
      s.style.setProperty("--dy", dy + "px");
      s.style.left = (10 + Math.random() * 80) + "%";
      s.style.top = (20 + Math.random() * 60) + "%";
      s.style.animationDelay = (Math.random() * 0.3) + "s";
      container.appendChild(s);
      setTimeout(() => s.remove(), 1800);
    }, i * 80);
  }
}
