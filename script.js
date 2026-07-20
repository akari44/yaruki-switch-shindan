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
    type: "「見てるよ」スイッチ",
    description: "お子さんは「ちゃんと見てもらえてる」と感じると動き出します。\n褒め言葉より、まず「見てるよ」の一言が力になるタイプです。"
  },
  B: {
    type: "「おもしろいよ」スイッチ",
    description: "お子さんは「面白そう！」という好奇心で動き出します。\n「やってみよう」「どうなるかな？」の言葉がやる気に火をつけます。"
  },
  C: {
    type: "「決めれるよ」スイッチ",
    description: "お子さんは「自分で決めた」という感覚で動き出します。\n選ばせる・任せるが、いちばんのやる気スイッチです。"
  }
};

let current = 0;
let scores = { A: 0, B: 0, C: 0 };

document.getElementById("btn-start").addEventListener("click", () => {
  document.getElementById("screen-start").classList.add("hidden");
  document.getElementById("screen-quiz").classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[current];
  document.getElementById("question-number").textContent = `Q${current + 1} / ${questions.length}`;
  document.getElementById("question-text").textContent = q.text;

  const choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.label;
    btn.addEventListener("click", () => answer(choice.type));
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
  document.getElementById("screen-result").classList.remove("hidden");

  const top = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const result = results[top];
  document.getElementById("result-type").textContent = result.type;
  document.getElementById("result-description").textContent = result.description;
}