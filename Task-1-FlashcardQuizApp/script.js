// Sound FX Control
let isSoundMuted = false;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(freq, type = 'sine') {
    if (isSoundMuted) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {}
}

document.getElementById('sound-toggle-btn').addEventListener('click', () => {
    isSoundMuted = !isSoundMuted;
    const icon = document.getElementById('sound-icon');
    if (isSoundMuted) {
        icon.className = "fa-solid fa-volume-xmark";
        icon.style.color = "#ef4444";
    } else {
        icon.className = "fa-solid fa-volume-high";
        icon.style.color = "inherit";
    }
});

// Comprehensive Multi-Track University Style Course Dataset
const defaultCards = [
    // --- HTML TRACK ---
    {
        id: 101, category: "HTML", type: "Standard Q&A", difficulty: "Easy",
        code: ``,
        question: "Unordered bulleted list create karne ke liye konsa HTML tag use hota hai?",
        answer: "<ul>", explanation: "<ul> tag Unordered list banata hai jabki <ol> Ordered (numbered) list banata hai.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },
    {
        id: 102, category: "HTML", type: "Syntax Fill-in", difficulty: "Easy",
        code: `<a ________="https://google.com">Search</a>`,
        question: "Hyperlink URL define karne ke liye missing attribute name fill karein:",
        answer: "href", explanation: "<a> tag ke sath href attribute destination URL link add karne ke liye use hota hai.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },
    {
        id: 103, category: "HTML", type: "Bug Hunt", difficulty: "Medium",
        code: `<img src="photo.jpg" title="User Picture">`,
        question: "Accessibility aur screen readers ke liye image tag mein konsa attribute miss hai?",
        answer: "alt", explanation: "alt attribute (alternate text) image render na hone par text show karta hai aur SEO/accessibility ke liye zaroori hai.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },

    // --- CSS TRACK ---
    {
        id: 201, category: "CSS", type: "Bug Hunt", difficulty: "Easy",
        code: `.card {\n  display: flex;\n  font-colour: red;\n}`,
        question: "Is CSS snippet mein konsi property name invalid/wrong hai?",
        answer: "font-colour", explanation: "CSS mein text color change karne ke liye valid property 'color' hoti hai, 'font-colour' nahi.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },
    {
        id: 202, category: "CSS", type: "Dry Run Output", difficulty: "Medium",
        code: `.box {\n  width: 100px;\n  padding: 10px;\n  border: 5px solid black;\n  box-sizing: border-box;\n}`,
        question: "Is element ki total rendered layout width kitni pixels hogi?",
        answer: "100px", explanation: "box-sizing: border-box se padding aur border padding total width (100px) ke andar hi integrate ho jate hain.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },
    {
        id: 203, category: "CSS", type: "Syntax Fill-in", difficulty: "Hard",
        code: `.container {\n  display: grid;\n  grid-template-columns: ________(3, 1fr);\n}`,
        question: "3 equal columns repeat karne ke liye CSS grid function ka naam fill karein:",
        answer: "repeat", explanation: "repeat(3, 1fr) 3 equal fractional tracks create karta hai grid layout mein.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },

    // --- JAVASCRIPT TRACK ---
    {
        id: 301, category: "JavaScript", type: "Dry Run Output", difficulty: "Easy",
        code: `let x = 5;\nlet y = "5";\nconsole.log(x == y);`,
        question: "Is JS snippet ka console terminal output kya hoga?",
        answer: "true", explanation: "Loose equality (==) type conversion karti hai. Strict equality (===) use karne par false milta.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },
    {
        id: 302, category: "JavaScript", type: "Syntax Fill-in", difficulty: "Medium",
        code: `document.________('btn').addEventListener('click', run);`,
        question: "DOM se element ID ke zariye select karne ke liye missing method fill karein:",
        answer: "getElementById", explanation: "getElementById DOM node select karne ka sabse fast native JS method hai.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },
    {
        id: 303, category: "JavaScript", type: "Dry Run Output", difficulty: "Hard",
        code: `const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled[1]);`,
        question: "Is snippet ka console terminal output kya hoga?",
        answer: "4", explanation: "map array [2, 4, 6] create karega. Index 1 par second element (4) hoga.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },

    // --- DATA SCIENCE TRACK ---
    {
        id: 401, category: "Data Science", type: "Dry Run Output", difficulty: "Medium",
        code: `import numpy as np\na = np.array([1, 2, 3])\nprint(a.shape)`,
        question: "Is Python Numpy array code snippet ka output shape kya print hoga?",
        answer: "(3,)", explanation: "3 elements wale 1D Numpy vector array ka tuple shape (3,) hota hai.",
        box: 1, bookmarked: false, wrongAttempts: 0
    },
    {
        id: 402, category: "Data Science", type: "Syntax Fill-in", difficulty: "Hard",
        code: `import pandas as pd\ndf = pd.read_________('data.csv')`,
        question: "CSV file load karne ke liye Pandas method fill karein:",
        answer: "csv", explanation: "Pandas mein CSV read karne ke liye pd.read_csv() method use hota hai.",
        box: 1, bookmarked: false, wrongAttempts: 0
    }
];

// App State
let allCards = JSON.parse(localStorage.getItem('flashcards_v7')) || defaultCards;
let filteredCards = [...allCards];
let leaderboardData = JSON.parse(localStorage.getItem('leaderboard_v2')) || [];
let currentIndex = 0;
let score = 0;
let attempts = 0;
let streak = 0;
let currentMode = 'flashcard';
let isAnswerUnlocked = false;

let timerInterval = null;
let timerSeconds = 30;
let selectedTimerDuration = 30;

let categoryStats = JSON.parse(localStorage.getItem('category_stats_v5')) || {
    HTML: { correct: 0, total: 0 },
    CSS: { correct: 0, total: 0 },
    JavaScript: { correct: 0, total: 0 },
    "Data Science": { correct: 0, total: 0 }
};

// DOM Elements
const flashcard = document.getElementById('flashcard');
const codeBlock = document.getElementById('card-code-block');
const codeContainer = document.getElementById('code-container');
const questionText = document.getElementById('card-question');
const answerText = document.getElementById('card-answer');
const categoryBadge = document.getElementById('card-category-badge');
const typeBadge = document.getElementById('card-type-badge');
const difficultyBadge = document.getElementById('card-difficulty-badge');
const cardCounter = document.getElementById('card-counter');
const categoryFilter = document.getElementById('category-filter');
const difficultyFilter = document.getElementById('difficulty-filter');
const bucketFilter = document.getElementById('bucket-filter');
const scoreVal = document.getElementById('score-val');
const attemptsVal = document.getElementById('attempts-val');
const accuracyVal = document.getElementById('accuracy-val');
const streakVal = document.getElementById('streak-val');
const boxNum = document.getElementById('box-num');
const timerDisplay = document.getElementById('timer-display');
const timerSelect = document.getElementById('timer-select');
const userAnswerInput = document.getElementById('user-answer-input');
const feedbackMsg = document.getElementById('feedback-msg');
const toggleAnswerBtn = document.getElementById('toggle-answer-btn');
const starIcon = document.getElementById('star-icon');
const mcqOptionsContainer = document.getElementById('mcq-options-container');
const mcqQuestionText = document.getElementById('mcq-question-text');

function saveState() {
    localStorage.setItem('flashcards_v7', JSON.stringify(allCards));
    localStorage.setItem('category_stats_v5', JSON.stringify(categoryStats));
    localStorage.setItem('leaderboard_v2', JSON.stringify(leaderboardData));
}

function applyFilters() {
    const cat = categoryFilter.value;
    const diff = difficultyFilter.value;
    const bucket = bucketFilter.value;

    filteredCards = allCards.filter(card => {
        const catMatch = (cat === 'All' || card.category === cat);
        const diffMatch = (diff === 'All' || card.difficulty === diff);
        const bucketMatch = (bucket === 'All' || (bucket === 'Revision' && (card.wrongAttempts || 0) >= 2));
        return catMatch && diffMatch && bucketMatch;
    });

    currentIndex = 0;
    renderCard();
}

categoryFilter.addEventListener('change', applyFilters);
difficultyFilter.addEventListener('change', applyFilters);
bucketFilter.addEventListener('change', applyFilters);

function renderCard() {
    flashcard.classList.remove('flipped');
    userAnswerInput.value = "";
    feedbackMsg.style.display = "none";
    isAnswerUnlocked = false;

    toggleAnswerBtn.disabled = true;
    toggleAnswerBtn.classList.add('locked-btn');
    toggleAnswerBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Type Answer First to Unlock`;

    if (filteredCards.length === 0) {
        questionText.textContent = "No cards found in selection!";
        codeContainer.style.display = "none";
        cardCounter.textContent = "0 / 0";
        return;
    }

    const current = filteredCards[currentIndex];
    categoryBadge.textContent = current.category || "General";
    typeBadge.textContent = current.type || "Q&A";
    difficultyBadge.textContent = current.difficulty || "Easy";
    boxNum.textContent = current.box || 1;

    // Code Window Visibility & Rendering
    if (current.code && current.code.trim() !== "") {
        codeContainer.style.display = "block";
        codeBlock.textContent = current.code;
    } else {
        codeContainer.style.display = "none";
    }

    if (current.bookmarked) {
        starIcon.className = "fa-solid fa-star";
        starIcon.style.color = "#f59e0b";
    } else {
        starIcon.className = "fa-regular fa-star";
        starIcon.style.color = "inherit";
    }

    cardCounter.textContent = `${currentIndex + 1} / ${filteredCards.length}`;

    if (currentMode === 'flashcard' || currentMode === 'exam') {
        document.getElementById('flashcard-mode-view').style.display = 'block';
        document.getElementById('mcq-mode-view').style.display = 'none';
        questionText.textContent = current.question;
        answerText.textContent = current.answer;
    } else if (currentMode === 'mcq') {
        document.getElementById('flashcard-mode-view').style.display = 'none';
        document.getElementById('mcq-mode-view').style.display = 'block';
        document.getElementById('mcq-code-block').textContent = current.code || "";
        document.getElementById('mcq-code-container').style.display = (current.code && current.code.trim()) ? 'block' : 'none';
        mcqQuestionText.textContent = current.question;
        renderMCQOptions(current);
    }
}

function renderMCQOptions(card) {
    mcqOptionsContainer.innerHTML = "";
    let options = card.options ? [...card.options] : [card.answer, "undefined", "null", "Error"];
    if (!options.includes(card.answer)) options.push(card.answer);
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'mcq-option-btn';
        btn.textContent = opt;
        btn.onclick = () => validateAnswer(opt, card.answer, btn);
        mcqOptionsContainer.appendChild(btn);
    });
}

function validateAnswer(selectedVal, correctVal, optionBtnElement = null) {
    const current = filteredCards[currentIndex];
    const typed = selectedVal.trim().toLowerCase();
    const correct = correctVal.trim().toLowerCase();
    attempts++;

    if (!categoryStats[current.category]) categoryStats[current.category] = { correct: 0, total: 0 };
    categoryStats[current.category].total++;

    const isCorrect = (typed === correct || (correct.includes(typed) && typed.length >= 2));

    isAnswerUnlocked = true;
    toggleAnswerBtn.disabled = false;
    toggleAnswerBtn.classList.remove('locked-btn');
    toggleAnswerBtn.innerHTML = `<i class="fa-solid fa-eye"></i> Show Answer`;

    if (isCorrect) {
        score++;
        streak++;
        categoryStats[current.category].correct++;
        if (current.wrongAttempts > 0) current.wrongAttempts--;
        if (!current.box) current.box = 1;
        if (current.box < 3) current.box++;

        playSound(600);
        feedbackMsg.className = "feedback-box correct";
        feedbackMsg.style.display = "block";
        feedbackMsg.textContent = "✓ Correct Answer!";

        if (optionBtnElement) optionBtnElement.classList.add('correct-selected');
    } else {
        streak = 0;
        current.box = 1;
        current.wrongAttempts = (current.wrongAttempts || 0) + 1;

        playSound(200, 'sawtooth');
        feedbackMsg.className = "feedback-box incorrect";
        feedbackMsg.style.display = "block";
        feedbackMsg.textContent = `✗ Incorrect! Expected: "${correctVal}"`;

        if (optionBtnElement) optionBtnElement.classList.add('wrong-selected');
    }

    saveState();
    updateStatsAndBadges();

    if (currentMode === 'exam') {
        setTimeout(() => {
            if (currentIndex < filteredCards.length - 1) {
                currentIndex++;
                renderCard();
            } else {
                showExamResults();
            }
        }, 800);
    }
}

// Hint Modal Logic
const hintModal = document.getElementById('hint-modal');
document.getElementById('hint-btn').addEventListener('click', () => {
    if (filteredCards.length === 0) return;
    const current = filteredCards[currentIndex];

    document.getElementById('hint-topic-title').textContent = `${current.category}: ${current.type}`;
    document.getElementById('hint-explanation-text').textContent = current.explanation || "Is question ka detail concept revise karein.";
    document.getElementById('hint-code-example').textContent = current.code || current.answer;

    hintModal.style.display = 'flex';
});
document.getElementById('close-hint').addEventListener('click', () => hintModal.style.display = 'none');

// Submit Answer Events
document.getElementById('submit-answer-btn').addEventListener('click', () => {
    if (filteredCards.length === 0) return;
    const typed = userAnswerInput.value;
    if (!typed.trim()) return;
    validateAnswer(typed, filteredCards[currentIndex].answer);
});

userAnswerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const typed = userAnswerInput.value;
        if (typed.trim()) validateAnswer(typed, filteredCards[currentIndex].answer);
    }
});

document.getElementById('bookmark-btn').addEventListener('click', () => {
    if (filteredCards.length === 0) return;
    const current = filteredCards[currentIndex];
    current.bookmarked = !current.bookmarked;
    saveState();
    renderCard();
});

function updateStatsAndBadges() {
    scoreVal.textContent = score;
    attemptsVal.textContent = attempts;
    streakVal.textContent = streak;

    const acc = attempts === 0 ? 0 : Math.round((score / attempts) * 100);
    accuracyVal.textContent = `${acc}%`;

    if (attempts >= 1) document.getElementById('badge-starter').classList.add('unlocked');
    if (streak >= 5) document.getElementById('badge-streak5').classList.add('unlocked');
    if (attempts >= 5 && acc >= 80) document.getElementById('badge-master').classList.add('unlocked');
}

// Exam & Verified Certificate Logic
function showExamResults() {
    document.getElementById('quiz-main-view').style.display = 'none';
    const examView = document.getElementById('exam-result-view');
    examView.style.display = 'block';

    const acc = attempts === 0 ? 0 : Math.round((score / attempts) * 100);
    document.getElementById('exam-final-score').textContent = `${score} / ${attempts}`;
    document.getElementById('exam-final-accuracy').textContent = `${acc}%`;

    let grade = 'F';
    if (acc >= 90) grade = 'A+ (Excellent)';
    else if (acc >= 75) grade = 'B (Very Good)';
    else if (acc >= 60) grade = 'C (Pass)';
    document.getElementById('exam-final-grade').textContent = grade;

    leaderboardData.push({ score, attempts, accuracy: acc, date: new Date().toLocaleDateString() });
    leaderboardData.sort((a, b) => b.accuracy - a.accuracy);
    saveState();

    const certBox = document.getElementById('cert-eligible-box');
    if (acc >= 80) certBox.style.display = 'block';
    else certBox.style.display = 'none';
}

// Generate PDF Certificate + Verification QR Code
document.getElementById('download-cert-btn').addEventListener('click', () => {
    const candidateName = document.getElementById('candidate-name-input').value.trim() || 'Student Candidate';
    const verifyID = `#QMP-${Math.floor(1000 + Math.random() * 9000)}`;

    document.getElementById('cert-user-name').textContent = candidateName;
    document.getElementById('cert-date').textContent = `Date: ${new Date().toLocaleDateString()}`;
    document.getElementById('cert-verification-id').textContent = verifyID;

    const qrContainer = document.getElementById('cert-qrcode-box');
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: `https://codequiz-verify.internal/cert/${verifyID}`,
        width: 60, height: 60
    });

    const certElement = document.getElementById('certificate-template');
    certElement.style.display = 'block';

    const opt = {
        margin:       0.4,
        filename:     `${candidateName.replace(/\s+/g, '_')}_Verified_Certificate.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(certElement).save().then(() => {
        certElement.style.display = 'none';
    });
});

// Leaderboard Modal
const leaderboardModal = document.getElementById('leaderboard-modal');
document.getElementById('leaderboard-btn').addEventListener('click', () => {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = "";

    if (leaderboardData.length === 0) {
        list.innerHTML = `<p style="text-align:center; opacity:0.7;">No exam records yet!</p>`;
    } else {
        leaderboardData.slice(0, 5).forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            div.innerHTML = `
                <span><strong>#${index + 1}</strong> - ${item.date}</span>
                <span>Score: ${item.score}/${item.attempts} (<strong>${item.accuracy}%</strong>)</span>
            `;
            list.appendChild(div);
        });
    }

    leaderboardModal.style.display = 'flex';
});

document.getElementById('close-leaderboard').addEventListener('click', () => leaderboardModal.style.display = 'none');

document.getElementById('restart-exam-btn').addEventListener('click', () => {
    score = 0; attempts = 0; streak = 0; currentIndex = 0;
    updateStatsAndBadges();
    document.getElementById('exam-result-view').style.display = 'none';
    document.getElementById('quiz-main-view').style.display = 'block';
    renderCard();
});

// TTS Speech synthesis
document.getElementById('tts-btn').addEventListener('click', () => {
    if (filteredCards.length === 0) return;
    const current = filteredCards[currentIndex];
    const textToSpeak = `${current.question}. Answer is ${current.answer}`;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
});

// Modes Selection
document.getElementById('mode-flashcard-btn').addEventListener('click', function() {
    currentMode = 'flashcard';
    this.classList.add('active');
    document.getElementById('mode-mcq-btn').classList.remove('active');
    document.getElementById('mode-exam-btn').classList.remove('active');
    document.getElementById('quiz-main-view').style.display = 'block';
    document.getElementById('exam-result-view').style.display = 'none';
    renderCard();
});

document.getElementById('mode-mcq-btn').addEventListener('click', function() {
    currentMode = 'mcq';
    this.classList.add('active');
    document.getElementById('mode-flashcard-btn').classList.remove('active');
    document.getElementById('mode-exam-btn').classList.remove('active');
    document.getElementById('quiz-main-view').style.display = 'block';
    document.getElementById('exam-result-view').style.display = 'none';
    renderCard();
});

document.getElementById('mode-exam-btn').addEventListener('click', function() {
    currentMode = 'exam';
    this.classList.add('active');
    document.getElementById('mode-flashcard-btn').classList.remove('active');
    document.getElementById('mode-mcq-btn').classList.remove('active');
    score = 0; attempts = 0; streak = 0; currentIndex = 0;
    updateStatsAndBadges();
    document.getElementById('quiz-main-view').style.display = 'block';
    document.getElementById('exam-result-view').style.display = 'none';
    renderCard();
});

// Navigation
document.getElementById('next-btn').addEventListener('click', () => {
    if (filteredCards.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredCards.length;
    renderCard();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (filteredCards.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
    renderCard();
});

document.getElementById('shuffle-btn').addEventListener('click', () => {
    filteredCards.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    playSound(500);
    renderCard();
});

function toggleFlip() {
    if (filteredCards.length > 0 && currentMode === 'flashcard' && isAnswerUnlocked) {
        playSound(400);
        flashcard.classList.toggle('flipped');
    }
}
toggleAnswerBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleFlip(); });
document.getElementById('hide-answer-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleFlip(); });
flashcard.addEventListener('click', toggleFlip);

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});

// Analytics Chart
const analyticsModal = document.getElementById('analytics-modal');
document.getElementById('analytics-btn').addEventListener('click', () => {
    analyticsModal.style.display = 'flex';
    renderPerformanceChart();
});
document.getElementById('close-analytics').addEventListener('click', () => analyticsModal.style.display = 'none');

function renderPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const categories = Object.keys(categoryStats);
    const accuracyData = categories.map(cat => {
        const stat = categoryStats[cat];
        return stat.total === 0 ? 0 : Math.round((stat.correct / stat.total) * 100);
    });

    if (window.performanceChartInstance) window.performanceChartInstance.destroy();

    window.performanceChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Accuracy (%)',
                data: accuracyData,
                backgroundColor: ['#38bdf8', '#818cf8', '#a855f7', '#10b981'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });
}

// Timer Controls
timerSelect.addEventListener('change', (e) => {
    selectedTimerDuration = parseInt(e.target.value);
    timerDisplay.textContent = selectedTimerDuration;
});

document.getElementById('toggle-timer-btn').addEventListener('click', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        this.textContent = "Start Timer";
        timerDisplay.textContent = selectedTimerDuration;
    } else {
        timerSeconds = selectedTimerDuration;
        this.textContent = "Stop Timer";
        timerInterval = setInterval(() => {
            timerSeconds--;
            timerDisplay.textContent = timerSeconds;
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                playSound(150, 'square');
                alert("Time's Up!");
                this.textContent = "Start Timer";
            }
        }, 1000);
    }
});

// Add / Edit Card Modal logic
const modal = document.getElementById('card-modal');
document.getElementById('add-card-btn').addEventListener('click', () => {
    document.getElementById('modal-title').textContent = "Add Question Card";
    document.getElementById('question-input').value = "";
    document.getElementById('answer-input').value = "";
    document.getElementById('code-snippet-input').value = "";
    document.getElementById('explanation-input').value = "";
    modal.style.display = 'flex';
});
document.getElementById('close-modal').addEventListener('click', () => modal.style.display = 'none');

document.getElementById('card-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const cat = document.getElementById('category-input').value;
    const type = document.getElementById('type-input').value;
    const q = document.getElementById('question-input').value.trim();
    const a = document.getElementById('answer-input').value.trim();
    const code = document.getElementById('code-snippet-input').value.trim();
    const exp = document.getElementById('explanation-input').value.trim();

    const newCard = {
        id: Date.now(), category: cat, type: type, difficulty: "Medium",
        code: code, question: q, answer: a, explanation: exp,
        box: 1, bookmarked: false, wrongAttempts: 0
    };

    allCards.push(newCard);
    filteredCards = [...allCards];
    currentIndex = filteredCards.length - 1;

    saveState();
    renderCard();
    modal.style.display = 'none';
});

document.getElementById('delete-btn').addEventListener('click', () => {
    if (filteredCards.length === 0) return;
    if (confirm("Delete this question card?")) {
        allCards = allCards.filter(c => c !== filteredCards[currentIndex]);
        filteredCards.splice(currentIndex, 1);
        if (currentIndex >= filteredCards.length) currentIndex = Math.max(0, filteredCards.length - 1);
        saveState();
        renderCard();
    }
});

// Data Export & Import
document.getElementById('export-btn').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allCards));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "codequiz_courses_backup.json");
    dlAnchor.click();
});

document.getElementById('import-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            allCards = JSON.parse(event.target.result);
            saveState();
            filteredCards = [...allCards];
            renderCard();
            alert("Course Data Restored Successfully!");
        } catch (err) {
            alert("Invalid File!");
        }
    };
    reader.readAsText(file);
});

renderCard();