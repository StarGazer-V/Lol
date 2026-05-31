const curriculum = {
  Anatomy: {
    chapters: {
      "Upper limb": ["Brachial plexus", "Axilla", "Hand muscles"],
      Neuroanatomy: ["Brainstem", "Cranial nerves", "Spinal tracts"],
      Embryology: ["Pharyngeal arches", "Heart development", "Neural tube"]
    },
    pool: 18420
  },
  Physiology: { chapters: { Cardiovascular: ["Cardiac cycle", "ECG", "Shock"], Renal: ["Tubular transport", "Acid-base", "GFR"], Neurophysiology: ["Reflexes", "Vision", "Pain pathways"] }, pool: 16280 },
  Biochemistry: { chapters: { Metabolism: ["Glycolysis", "Urea cycle", "TCA cycle"], Genetics: ["PCR", "Blotting", "Inborn errors"], Vitamins: ["B12", "Vitamin D", "Antioxidants"] }, pool: 14160 },
  Pathology: { chapters: { Hematology: ["Anemia", "Leukemia", "Coagulation"], Neoplasia: ["Tumor markers", "Oncogenes", "Grading"], Immunology: ["Hypersensitivity", "Amyloidosis", "Transplant"] }, pool: 22140 },
  Pharmacology: { chapters: { "Autonomic drugs": ["Sympathomimetics", "Anticholinergics", "Ganglion blockers"], Cardiovascular: ["Antiarrhythmics", "Antihypertensives", "Diuretics"], Chemotherapy: ["Antitubercular", "Antimalarial", "Antiretroviral"] }, pool: 19870 },
  Microbiology: { chapters: { Bacteriology: ["Staphylococcus", "Mycobacteria", "Enterobacteriaceae"], Virology: ["Hepatitis", "HIV", "Herpes"], Parasitology: ["Malaria", "Leishmania", "Amoebiasis"] }, pool: 17640 },
  "Forensic Medicine": { chapters: { Toxicology: ["OP poisoning", "Snake bite", "Alcohol"], Injuries: ["Firearm", "Asphyxia", "Burns"], Jurisprudence: ["Consent", "Dying declaration", "Negligence"] }, pool: 9820 },
  "Community Medicine": { chapters: { Epidemiology: ["Study designs", "Screening", "Bias"], Biostatistics: ["Sensitivity", "P value", "Sampling"], Programs: ["TB", "HIV", "Immunization"] }, pool: 18850 },
  ENT: { chapters: { Ear: ["CSOM", "Otosclerosis", "Facial nerve"], Nose: ["Epistaxis", "Sinusitis", "Polyps"], Throat: ["Tonsil", "Larynx", "Dysphagia"] }, pool: 10320 },
  Ophthalmology: { chapters: { Retina: ["Diabetic retinopathy", "Retinal detachment", "CRAO"], Glaucoma: ["Open angle", "Angle closure", "Drugs"], Lens: ["Cataract", "IOL", "Complications"] }, pool: 11140 },
  Medicine: { chapters: { Cardiology: ["Valvular heart disease", "Arrhythmias", "Heart failure"], Neurology: ["Stroke", "Seizures", "Neuropathies"], Endocrinology: ["Diabetes", "Thyroid", "Adrenal"] }, pool: 32480 },
  Surgery: { chapters: { Abdomen: ["Appendicitis", "Obstruction", "Hernia"], Urology: ["Stones", "BPH", "Testicular tumors"], Trauma: ["ATLS", "Burns", "Shock"] }, pool: 28420 },
  "Obstetrics & Gynaecology": { chapters: { Obstetrics: ["Hypertension", "APH", "Labour"], Gynaecology: ["Fibroid", "Endometriosis", "Infertility"], Oncology: ["Cervix", "Ovary", "Endometrium"] }, pool: 23860 },
  Paediatrics: { chapters: { Neonatology: ["Neonatal sepsis", "RDS", "Jaundice"], Growth: ["Milestones", "Nutrition", "Vaccines"], Cardiology: ["CHD", "Cyanosis", "Murmurs"] }, pool: 18770 },
  Orthopaedics: { chapters: { Trauma: ["Fracture neck femur", "Supracondylar", "Dislocations"], Spine: ["PIVD", "Scoliosis", "TB spine"], Pediatrics: ["CTEV", "DDH", "Perthes"] }, pool: 10650 },
  Dermatology: { chapters: { Infections: ["Leprosy", "Fungal", "Viral exanthems"], Papulosquamous: ["Psoriasis", "Lichen planus", "Pityriasis"], Autoimmune: ["Pemphigus", "SLE", "Vasculitis"] }, pool: 9340 },
  Psychiatry: { chapters: { Psychosis: ["Schizophrenia", "Delusional disorder", "Catatonia"], Mood: ["Depression", "Bipolar", "Suicide"], Substances: ["Alcohol", "Opioids", "Cannabis"] }, pool: 8450 },
  Radiology: { chapters: { Chest: ["CXR signs", "CT chest", "Mediastinum"], Neuroimaging: ["Stroke CT", "MRI basics", "Tumors"], Abdomen: ["USG", "Bowel obstruction", "Hepatobiliary"] }, pool: 12130 },
  Anaesthesia: { chapters: { General: ["Airway", "Inhalational agents", "Muscle relaxants"], Regional: ["Spinal", "Epidural", "Nerve blocks"], CriticalCare: ["Ventilation", "Shock", "CPR"] }, pool: 7820 }
};

const questions = [
  {
    path: "Medicine / Cardiology / Valvular heart disease",
    difficulty: "Hard",
    time: 90,
    stem: "A 24-year-old woman presents with fever, migratory polyarthritis, and a new apical mid-diastolic murmur 3 weeks after untreated pharyngitis. What is the most likely diagnosis?",
    context: "ESR and CRP are elevated, PR interval is prolonged, and ASO titre is high.",
    media: "No image required · clinical vignette",
    options: ["Infective endocarditis", "Acute rheumatic fever", "Systemic lupus erythematosus", "Viral myocarditis"],
    correct: 1,
    explanation: "Migratory polyarthritis, carditis suggested by mitral valvulitis, fever, inflammatory markers, prolonged PR interval, and evidence of prior group A streptococcal infection support acute rheumatic fever.",
    analysis: ["Endocarditis usually has bacteremia and vegetations rather than classic post-pharyngitis migratory arthritis.", "Correct: Jones criteria plus streptococcal evidence are present.", "SLE can mimic fever and arthritis but ASO rise and murmur timing favor ARF.", "Myocarditis does not explain migratory polyarthritis and ASO-supported disease."],
    highYield: "Jones criteria: J♥NES = Joints, Heart, Nodules, Erythema marginatum, Sydenham chorea.",
    related: "Mitral stenosis, Jones criteria, streptococcal prophylaxis"
  },
  {
    path: "Pathology / Hematology / Leukemia",
    difficulty: "Moderate",
    time: 75,
    stem: "A lymph node biopsy shows Reed-Sternberg cells in a mixed inflammatory background. Which immunophenotype is most typical?",
    context: "The patient has painless cervical lymphadenopathy and intermittent fever.",
    media: "Pathology slide slot · lymph node biopsy",
    options: ["CD15+, CD30+", "CD3+, CD5+", "CD10+, BCL6+", "CD56+, cytoplasmic CD3+"],
    correct: 0,
    explanation: "Classical Hodgkin lymphoma Reed-Sternberg cells typically express CD15 and CD30.",
    analysis: ["Correct: classical Hodgkin lymphoma marker pair.", "T-cell phenotype is not typical for classical RS cells.", "Germinal-centre markers suggest follicular lymphoma or DLBCL subsets.", "NK/T-cell phenotype is unrelated to classical Hodgkin lymphoma."],
    highYield: "Classical Hodgkin: CD15 and CD30; nodular lymphocyte predominant: CD20 and BCL6.",
    related: "Ann Arbor staging, B symptoms, lymphoma immunophenotyping"
  },
  {
    path: "Radiology / Chest / CXR signs",
    difficulty: "Moderate",
    time: 60,
    stem: "An elderly patient with sudden severe tearing chest pain has mediastinal widening on chest radiograph. What is the best next imaging test in a stable patient?",
    context: "Blood pressure is 170/96 mmHg in the right arm and 132/78 mmHg in the left arm.",
    media: "Radiology image slot · CXR mediastinal widening",
    options: ["Non-contrast CT head", "CT pulmonary angiography only", "CT angiography of the aorta", "Barium swallow"],
    correct: 2,
    explanation: "Stable suspected aortic dissection is evaluated with CT angiography of the aorta to define intimal flap, extent, branch involvement, and operative planning.",
    analysis: ["Head CT does not evaluate the suspected thoracic vascular emergency.", "PE protocol may miss full aortic extent if not tailored.", "Correct: CTA aorta is rapid, available, and definitive in stable patients.", "Barium swallow is obsolete and unsafe for this presentation."],
    highYield: "Aortic dissection clues: tearing pain, pulse/BP differential, mediastinal widening; stable → CTA.",
    related: "Stanford classification, hypertensive emergency, pulse deficit"
  }
];

let currentQuestion = 0;
let selectedOption = null;
let correct = 0;
let marked = 0;

function subjectNames() { return Object.keys(curriculum); }
function selectedSubject() { return document.getElementById("subject-select").value; }
function selectedChapter() { return document.getElementById("chapter-select").value; }

function populateSubjects() {
  const subjectSelect = document.getElementById("subject-select");
  subjectSelect.innerHTML = subjectNames().map(subject => `<option>${subject}</option>`).join("");
  subjectSelect.value = "Medicine";
  populateChapters();
  mountSubjectGrid();
}

function populateChapters() {
  const chapters = Object.keys(curriculum[selectedSubject()].chapters);
  const chapterSelect = document.getElementById("chapter-select");
  chapterSelect.innerHTML = chapters.map(chapter => `<option>${chapter}</option>`).join("");
  populateTopics();
}

function populateTopics() {
  const topics = curriculum[selectedSubject()].chapters[selectedChapter()];
  document.getElementById("topic-select").innerHTML = topics.map(topic => `<option>${topic}</option>`).join("");
}

function mountSubjectGrid() {
  const grid = document.getElementById("subject-grid");
  grid.innerHTML = subjectNames().map(subject => `
    <button class="subject-card" type="button" data-subject="${subject}">
      <strong>${subject}</strong>
      <span>${curriculum[subject].pool.toLocaleString("en-IN")} questions · ${Object.keys(curriculum[subject].chapters).length} chapters</span>
    </button>
  `).join("");
}

function generateModule(event) {
  event.preventDefault();
  const subject = selectedSubject();
  const chapter = selectedChapter();
  const topic = document.getElementById("topic-select").value;
  const count = document.getElementById("question-count").value;
  const difficulty = document.getElementById("difficulty-select").value;
  const mode = document.getElementById("mode-select").value;
  const prompt = document.getElementById("student-prompt").value.trim();
  const promptText = prompt ? ` · tailored note: ${prompt}` : "";
  document.getElementById("generated-module").innerHTML = `<strong>Generated module:</strong> ${subject} → ${chapter} → ${topic} · ${count} ${difficulty.toLowerCase()} questions · ${mode.toLowerCase()}${promptText}`;
  document.getElementById("quiz-path").textContent = `${subject} / ${chapter}`;
  document.getElementById("quiz-progress").textContent = `Question 1 of ${count}`;
  document.getElementById("recommendation").textContent = `AI will start with ${topic}, mix in recent mistakes, and adjust difficulty after every 5 questions.`;
}

function renderQuestion(index) {
  const question = questions[index];
  selectedOption = null;
  document.getElementById("quiz-path").textContent = question.path;
  document.getElementById("difficulty-tag").textContent = question.difficulty;
  document.getElementById("timer").textContent = `0${Math.floor(question.time / 60)}:${String(question.time % 60).padStart(2, "0")}`;
  document.getElementById("question-stem").textContent = question.stem;
  document.getElementById("question-context").textContent = question.context;
  document.getElementById("media-placeholder").textContent = question.media;
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
  const wasCorrect = selectedOption === question.correct;
  if (wasCorrect) correct += 1;
  document.querySelectorAll(".option").forEach((button, index) => {
    button.classList.toggle("correct", index === question.correct);
    button.classList.toggle("incorrect", index === selectedOption && !wasCorrect);
  });
  document.getElementById("explanation-text").textContent = question.explanation;
  document.getElementById("option-analysis").innerHTML = question.analysis.map(item => `<li>${item}</li>`).join("");
  document.getElementById("high-yield-text").textContent = question.highYield;
  document.getElementById("related-concepts").textContent = question.related;
  document.getElementById("explanation-panel").classList.remove("hidden");
  updateSessionStats();
}

function updateSessionStats() {
  const attempted = currentQuestion + 1;
  document.getElementById("correct-count").textContent = String(correct);
  document.getElementById("marked-count").textContent = String(marked);
  document.getElementById("accuracy-count").textContent = `${Math.round((correct / attempted) * 100)}%`;
}

function bindEvents() {
  document.getElementById("subject-select").addEventListener("change", populateChapters);
  document.getElementById("chapter-select").addEventListener("change", populateTopics);
  document.getElementById("module-form").addEventListener("submit", generateModule);
  document.getElementById("subject-grid").addEventListener("click", event => {
    const card = event.target.closest(".subject-card");
    if (!card) return;
    document.getElementById("subject-select").value = card.dataset.subject;
    populateChapters();
    document.getElementById("module-builder").scrollIntoView({ behavior: "smooth" });
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
    document.getElementById("quiz-progress").textContent = `Question ${currentQuestion + 1} of 30`;
    renderQuestion(currentQuestion);
  });
  document.getElementById("mark-review").addEventListener("click", () => {
    marked += 1;
    document.getElementById("marked-count").textContent = String(marked);
  });
  document.querySelector(".menu-button").addEventListener("click", event => {
    const menu = document.getElementById("mobile-menu");
    const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
    event.currentTarget.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open");
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => undefined);
  }
}

populateSubjects();
renderQuestion(currentQuestion);
bindEvents();
registerServiceWorker();
