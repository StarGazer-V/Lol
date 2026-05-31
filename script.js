const subjects = [
  "Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology", "Forensic Medicine",
  "Community Medicine", "ENT", "Ophthalmology", "Medicine", "Surgery", "Obstetrics & Gynaecology", "Paediatrics",
  "Orthopaedics", "Dermatology", "Psychiatry", "Radiology", "Anaesthesia"
];

const practiceModes = [
  ["🧠", "AI Adaptive Practice", "Dynamic question blocks based on weak topics, timing, confidence, and revision decay."],
  ["🩺", "Clinical Scenario Mode", "Long-vignette MCQs with history, examination, investigations, diagnosis, and management."],
  ["🖼️", "Image-Based Mode", "Radiology, pathology slides, ECGs, instruments, charts, tables, and clinical images."],
  ["📅", "Daily MCQs", "High-yield daily capsules with streaks, XP, bookmarks, and instant review."],
  ["🏆", "Grand Tests", "Full-length exam engine with negative marking, timer, review-later, and rank prediction."],
  ["⚡", "Rapid Revision", "Flash explanations, memory tricks, high-yield facts, and spaced-repetition prompts."],
  ["📚", "Previous-Year Mode", "Tagged PYQs for NEET PG, INI-CET, FMGE, and university-style revision."],
  ["🧪", "Custom Test Builder", "Choose subject, chapter, topic, difficulty, PYQ flag, time, and number of questions."]
];

const questions = [
  {
    subject: "Medicine",
    difficulty: "Hard",
    time: "90 sec",
    stem: "A 24-year-old woman presents with fever, migratory polyarthritis, and a new apical mid-diastolic murmur 3 weeks after untreated pharyngitis. What is the most likely diagnosis?",
    context: "Throat culture was not performed. ESR and CRP are elevated, PR interval is prolonged, and ASO titre is high.",
    options: ["Infective endocarditis", "Acute rheumatic fever", "Systemic lupus erythematosus", "Viral myocarditis"],
    correct: 1,
    explanation: "The Jones criteria pattern of migratory polyarthritis, carditis suggested by mitral valvulitis, fever, inflammatory markers, prolonged PR interval, and evidence of prior group A streptococcal infection supports acute rheumatic fever.",
    analysis: ["Endocarditis causes persistent bacteremia and vegetations, not classic migratory arthritis after pharyngitis.", "Correct: major Jones criteria plus streptococcal evidence are present.", "SLE can mimic fever and arthritis but ASO rise and murmur timing favor ARF.", "Myocarditis does not explain migratory polyarthritis and ASO-supported post-streptococcal disease."],
    highYield: "Jones criteria: J♥NES = Joints, Heart, Nodules, Erythema marginatum, Sydenham chorea."
  },
  {
    subject: "Pathology",
    difficulty: "Moderate",
    time: "75 sec",
    stem: "A lymph node biopsy shows Reed-Sternberg cells in a mixed inflammatory background. Which immunophenotype is most typical?",
    context: "The patient has painless cervical lymphadenopathy and intermittent fever.",
    options: ["CD15+, CD30+", "CD3+, CD5+", "CD10+, BCL6+", "CD56+, cytoplasmic CD3+"],
    correct: 0,
    explanation: "Classical Hodgkin lymphoma Reed-Sternberg cells typically express CD15 and CD30. The clinical context and morphology support this diagnosis.",
    analysis: ["Correct: classical Hodgkin lymphoma marker pair.", "T-cell phenotype is not typical for classical RS cells.", "Germinal-centre markers suggest follicular lymphoma or DLBCL subsets.", "NK/T-cell phenotype is unrelated to classical Hodgkin lymphoma."],
    highYield: "Classical Hodgkin: CD15 and CD30; nodular lymphocyte predominant: CD20 and BCL6."
  },
  {
    subject: "Radiology",
    difficulty: "Moderate",
    time: "60 sec",
    stem: "An elderly patient with sudden severe tearing chest pain has mediastinal widening on chest radiograph. What is the best next imaging test in a stable patient?",
    context: "Blood pressure is 170/96 mmHg in the right arm and 132/78 mmHg in the left arm.",
    options: ["Non-contrast CT head", "CT pulmonary angiography only", "CT angiography of the aorta", "Barium swallow"],
    correct: 2,
    explanation: "Stable suspected aortic dissection is evaluated with CT angiography of the aorta to define intimal flap, extent, branch involvement, and operative planning.",
    analysis: ["Head CT does not evaluate the suspected thoracic vascular emergency.", "PE protocol may miss full aortic extent if not tailored.", "Correct: CTA aorta is rapid, available, and definitive in stable patients.", "Barium swallow is obsolete and unsafe for this presentation."],
    highYield: "Aortic dissection clues: tearing pain, pulse/BP differential, mediastinal widening; stable → CTA."
  }
];

let currentQuestion = 0;
let selectedOption = null;

function mountPracticeModes() {
  const grid = document.getElementById("practice-grid");
  grid.innerHTML = practiceModes.map(([icon, title, body]) => `
    <article class="feature-card">
      <div class="feature-icon" aria-hidden="true">${icon}</div>
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `).join("");
}

function mountSubjectFilter() {
  const select = document.getElementById("subject-filter");
  select.innerHTML = ["All", ...subjects].map(subject => `<option>${subject}</option>`).join("");
}

function renderQuestion(index) {
  const question = questions[index];
  selectedOption = null;
  document.getElementById("question-subject").textContent = question.subject;
  document.getElementById("question-difficulty").textContent = question.difficulty;
  document.getElementById("question-time").textContent = question.time;
  document.getElementById("question-stem").textContent = question.stem;
  document.getElementById("question-context").textContent = question.context;
  document.getElementById("explanation-panel").classList.add("hidden");
  document.getElementById("options").innerHTML = question.options.map((option, optionIndex) => `
    <button class="option" type="button" aria-pressed="false" data-index="${optionIndex}">
      <strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${option}
    </button>
  `).join("");
}

function submitAnswer() {
  if (selectedOption === null) return;
  const question = questions[currentQuestion];
  document.querySelectorAll(".option").forEach((button, index) => {
    button.classList.toggle("correct", index === question.correct);
    button.classList.toggle("incorrect", index === selectedOption && selectedOption !== question.correct);
  });
  document.getElementById("explanation-text").textContent = question.explanation;
  document.getElementById("option-analysis").innerHTML = question.analysis.map(item => `<li>${item}</li>`).join("");
  document.getElementById("high-yield-text").textContent = question.highYield;
  document.getElementById("explanation-panel").classList.remove("hidden");
}

function drawAccuracyChart() {
  const canvas = document.getElementById("accuracy-chart");
  const context = canvas.getContext("2d");
  const points = [48, 54, 57, 63, 61, 69, 72, 78, 81, 84];
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "rgba(148, 163, 184, 0.28)";
  for (let y = 30; y < 180; y += 40) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
  context.strokeStyle = "#34d399";
  context.lineWidth = 4;
  context.beginPath();
  points.forEach((point, index) => {
    const x = 20 + index * 42;
    const y = 165 - point * 1.55;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
}

function mountHeatmap() {
  const heatmap = document.getElementById("heatmap");
  const intensity = [0.2, 0.45, 0.75, 0.9, 0.35, 0.62, 0.82, 0.5, 0.18, 0.7, 0.88, 0.42, 0.58, 0.32, 0.95, 0.66];
  heatmap.innerHTML = intensity.map(value => `<span title="Weakness ${Math.round(value * 100)}%" style="background: rgba(251, 113, 133, ${value})"></span>`).join("");
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => undefined);
  }
}

function bindEvents() {
  document.querySelector(".nav-toggle").addEventListener("click", event => {
    const navLinks = document.getElementById("nav-links");
    const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
    event.currentTarget.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  document.getElementById("options").addEventListener("click", event => {
    const button = event.target.closest(".option");
    if (!button) return;
    selectedOption = Number(button.dataset.index);
    document.querySelectorAll(".option").forEach(option => option.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
  });

  document.getElementById("submit-answer").addEventListener("click", submitAnswer);
  document.getElementById("next-question").addEventListener("click", () => {
    currentQuestion = (currentQuestion + 1) % questions.length;
    renderQuestion(currentQuestion);
  });
}

mountPracticeModes();
mountSubjectFilter();
renderQuestion(currentQuestion);
drawAccuracyChart();
mountHeatmap();
bindEvents();
registerServiceWorker();
