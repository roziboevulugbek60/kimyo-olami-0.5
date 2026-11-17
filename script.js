
const questions = [
  // 1-DARAJA — OSON
  {
    level: 1,
    levelName: "Boshlang‘ich kimyogar",
    question: "Suv formulasini tuzing",
    description: "Vodorod va kisloroddan foydalaning.",
    answer: "H2O",
    name: "Suv",
    info: "Suv formulasi H₂O. Uning tarkibida 2 ta vodorod va 1 ta kislorod atomi bor."
  },
  {
    level: 1,
    levelName: "Boshlang‘ich kimyogar",
    question: "Osh tuzi formulasini tuzing",
    description: "Natriy va xlor elementlarini birlashtiring.",
    answer: "NaCl",
    name: "Natriy xlorid",
    info: "NaCl — natriy xlorid, ya'ni osh tuzi."
  },
  {
    level: 1,
    levelName: "Boshlang‘ich kimyogar",
    question: "Karbonat angidrid formulasini tuzing",
    description: "Uglerod va kisloroddan foydalaning.",
    answer: "CO2",
    name: "Karbonat angidrid",
    info: "CO₂ tarkibida 1 ta uglerod va 2 ta kislorod atomi bor."
  },
  {
    level: 1,
    levelName: "Boshlang‘ich kimyogar",
    question: "Magniy oksid formulasini tuzing",
    description: "Magniy va kislorodni birlashtiring.",
    answer: "MgO",
    name: "Magniy oksid",
    info: "MgO — magniy oksid. Uning tarkibida magniy va kislorod bor."
  },

  // 2-DARAJA — O‘RTA
  {
    level: 2,
    levelName: "Tajribali kimyogar",
    question: "Kalsiy oksid formulasini tuzing",
    description: "Kalsiy va kisloroddan foydalaning.",
    answer: "CaO",
    name: "Kalsiy oksid",
    info: "CaO — kalsiy oksid. Bu birikma kalsiy va kisloroddan tashkil topgan."
  },
  {
    level: 2,
    levelName: "Tajribali kimyogar",
    question: "Vodorod xlorid formulasini tuzing",
    description: "Vodorod va xlor elementlarini tanlang.",
    answer: "HCl",
    name: "Vodorod xlorid",
    info: "HCl — vodorod xlorid formulasi."
  },
  {
    level: 2,
    levelName: "Tajribali kimyogar",
    question: "Ammiak formulasini tuzing",
    description: "Azot va vodoroddan foydalaning.",
    answer: "NH3",
    name: "Ammiak",
    info: "NH₃ tarkibida 1 ta azot va 3 ta vodorod atomi bor."
  },
  {
    level: 2,
    levelName: "Tajribali kimyogar",
    question: "Magniy xlorid formulasini tuzing",
    description: "Magniy va xlor elementlarini birlashtiring.",
    answer: "MgCl2",
    name: "Magniy xlorid",
    info: "MgCl₂ tarkibida 1 ta magniy va 2 ta xlor atomi bor."
  },

  // 3-DARAJA — QIYIN
  {
    level: 3,
    levelName: "Kimyo professori",
    question: "Temir sulfidi formulasini tuzing",
    description: "Temir va oltingugurt elementlaridan foydalaning.",
    answer: "FeS",
    name: "Temir sulfidi",
    info: "FeS — temir sulfidi formulasi."
  },
  {
    level: 3,
    levelName: "Kimyo professori",
    question: "Alyuminiy oksid formulasini tuzing",
    description: "Alyuminiy va kisloroddan foydalaning.",
    answer: "Al2O3",
    name: "Alyuminiy oksid",
    info: "Al₂O₃ tarkibida 2 ta alyuminiy va 3 ta kislorod atomi bor."
  },
  {
    level: 3,
    levelName: "Kimyo professori",
    question: "Sulfat kislota formulasini tuzing",
    description: "Vodorod, oltingugurt va kisloroddan foydalaning.",
    answer: "H2SO4",
    name: "Sulfat kislota",
    info: "H₂SO₄ tarkibida vodorod, oltingugurt va kislorod atomlari bor."
  },
  {
    level: 3,
    levelName: "Kimyo professori",
    question: "Kalsiy karbonat formulasini tuzing",
    description: "Kalsiy, uglerod va kisloroddan foydalaning.",
    answer: "CaCO3",
    name: "Kalsiy karbonat",
    info: "CaCO₃ — kalsiy karbonat formulasi. Tabiatda ohaktosh tarkibida uchraydi."
  }
];

const elements = [
  ["H", "Vodorod"],
  ["O", "Kislorod"],
  ["Na", "Natriy"],
  ["Cl", "Xlor"],
  ["Mg", "Magniy"],
  ["Ca", "Kalsiy"],
  ["C", "Uglerod"],
  ["N", "Azot"],
  ["Fe", "Temir"],
  ["S", "Oltingugurt"],
  ["Al", "Alyuminiy"]
];

const numbers = ["2", "3", "4"];

let currentIndex = 0;
let score = 0;
let timeLeft = 35;
let selected = [];
let timer = null;
let answered = false;

let record = Number(localStorage.getItem("chemistryRecord")) || 0;

const $ = id => document.getElementById(id);

function renderElements() {
  const grid = $("elementsGrid");
  grid.innerHTML = "";

  elements.forEach(([symbol, name]) => {
    const button = document.createElement("button");
    button.className = "element-btn";
    button.innerHTML = `
      <strong>${symbol}</strong>
      <small>${name}</small>
    `;

    button.addEventListener("click", () => addToken(symbol));
    grid.appendChild(button);
  });

  const numberGrid = $("numbersGrid");
  numberGrid.innerHTML = "";

  numbers.forEach(number => {
    const button = document.createElement("button");
    button.className = "number-btn";
    button.textContent = number;

    button.addEventListener("click", () => addToken(number));
    numberGrid.appendChild(button);
  });
}

function addToken(token) {
  if (answered) return;

  selected.push(token);
  renderFormula();
}

function renderFormula() {
  const display = $("formulaDisplay");

  if (selected.length === 0) {
    display.innerHTML = '<span class="placeholder">Elementlarni tanlang...</span>';
    return;
  }

  display.textContent = selected.join("");
}

function clearFormula() {
  selected = [];
  renderFormula();
}

function backspace() {
  if (answered) return;

  selected.pop();
  renderFormula();
}

function startTimer() {
  clearInterval(timer);

  timeLeft = 35;
  $("timer").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    $("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showTimeout();
    }
  }, 1000);
}

function loadQuestion() {
  if (currentIndex >= questions.length) {
    finishGame();
    return;
  }

  const q = questions[currentIndex];

  answered = false;
  selected = [];

  $("gameArea").classList.remove("hidden");
  $("finishScreen").classList.add("hidden");

  $("level").textContent = q.level + "-DARAJA";
  $("levelName").textContent = q.levelName;
  $("question").textContent = q.question;
  $("description").textContent = q.description;

  const position = currentIndex % 4 + 1;

  $("progressText").textContent = position + " / 4";
  $("progressFill").style.width = (position / 4 * 100) + "%";

  $("feedback").className = "feedback hidden";
  $("feedback").textContent = "";

  $("checkBtn").classList.remove("hidden");
  $("checkBtn").disabled = false;

  $("nextBtn").classList.add("hidden");

  $("backspaceBtn").disabled = false;
  $("clearBtn").disabled = false;

  renderFormula();
  startTimer();
}

function checkAnswer() {
  if (answered) return;

  if (selected.length === 0) {
    showFeedback("Avval elementlarni tanlang!", "error");
    return;
  }

  const answer = selected.join("");
  const q = questions[currentIndex];

  if (answer === q.answer) {
    answered = true;
    clearInterval(timer);

    const gained = 10 + Math.floor(timeLeft / 5);
    score += gained;

    updateStats();

    showFeedback(
      `🎉 To‘g‘ri javob!<br>
      Birikma: <b>${q.name}</b><br>
      Formula: <b>${formatFormula(q.answer)}</b><br>
      ${q.info}<br>
      <b>+${gained} ball!</b>`,
      "success"
    );

    endQuestion();
  } else {
    showFeedback("❌ Noto‘g‘ri formula. Yana bir bor urinib ko‘ring!", "error");
  }
}

function formatFormula(formula) {
  return formula.replace(/[0-9]/g, number => {
    return "₀₁₂₃₄₅₆₇₈₉"[Number(number)];
  });
}

function showTimeout() {
  if (answered) return;

  answered = true;

  const q = questions[currentIndex];

  showFeedback(
    `⏰ Vaqt tugadi!<br>
    To‘g‘ri javob: <b>${formatFormula(q.answer)}</b><br>
    ${q.info}`,
    "error"
  );

  endQuestion();
}

function showFeedback(message, type) {
  const feedback = $("feedback");

  feedback.innerHTML = message;
  feedback.className = "feedback " + type;
}

function endQuestion() {
  $("checkBtn").classList.add("hidden");

  $("backspaceBtn").disabled = true;
  $("clearBtn").disabled = true;

  $("nextBtn").classList.remove("hidden");

  if (currentIndex === questions.length - 1) {
    $("nextBtn").textContent = "NATIJANI KO‘RISH 🏆";
  } else {
    $("nextBtn").textContent = "KEYINGI TOPSHIRIQ ➜";
  }
}

function nextQuestion() {
  if (!answered) return;

  currentIndex++;
  loadQuestion();
}

function updateStats() {
  if (score > record) {
    record = score;
    localStorage.setItem("chemistryRecord", record);
  }

  $("score").textContent = score;
  $("record").textContent = record;
}

function finishGame() {
  clearInterval(timer);

  $("gameArea").classList.add("hidden");
  $("finishScreen").classList.remove("hidden");

  $("finalScore").textContent = score;

  $("finishMessage").textContent =
    `12 ta topshiriq yakunlandi! Rekordingiz: ${record} ball.`;
}

function restartGame() {
  clearInterval(timer);

  currentIndex = 0;
  score = 0;
  selected = [];
  answered = false;

  updateStats();
  loadQuestion();
}

$("checkBtn").addEventListener("click", checkAnswer);
$("clearBtn").addEventListener("click", clearFormula);
$("backspaceBtn").addEventListener("click", backspace);
$("nextBtn").addEventListener("click", nextQuestion);
$("restartBtn").addEventListener("click", restartGame);

renderElements();
updateStats();
loadQuestion();
