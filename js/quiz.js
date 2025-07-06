const questions = {
    html: [
        { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Machine Language", "Hyperlinking Text Mark"], answer: 0 },
        { q: "HTML element for largest heading?", options: ["<h1>", "<h6>", "<head>", "<header>"], answer: 0 },
        { q: "Which tag is for links?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
        { q: "What tag is used for line breaks?", options: ["<br>", "<lb>", "<break>", "<hr>"], answer: 0 }
    ],
    css: [
        { q: "Which property changes text color?", options: ["font", "text-color", "color", "style"], answer: 2 },
        { q: "CSS stands for?", options: ["Creative Style Sheet", "Cascading Style Sheet", "Computer Style Sheet", "Colorful Style Sheet"], answer: 1 },
        { q: "Which symbol starts an ID selector?", options: [".", "#", "/", "@"], answer: 1 }
    ],
    javascript: [
        { q: "Which symbol is used for comments in JS?", options: ["//", "<!-- -->", "#", "/* */"], answer: 0 },
        { q: "What is 'let' used for?", options: ["Looping", "Variable declaration", "Function", "Comment"], answer: 1 },
        { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Mode", "Document Oriented Method", "Desktop Object Management"], answer: 0 }
    ],
    python: [
        { q: "Keyword to define function in Python?", options: ["function", "def", "define", "fun"], answer: 1 },
        { q: "What symbol is used for comments?", options: ["//", "#", "<!--", "--"], answer: 1 },
        { q: "Which data type is mutable?", options: ["tuple", "list", "str", "int"], answer: 1 }
    ],
    java: [
        { q: "Java is a ...?", options: ["Scripting language", "Compiled language", "Markup language", "None"], answer: 1 },
        { q: "Which keyword defines a class?", options: ["function", "object", "class", "define"], answer: 2 },
        { q: "Java runs on?", options: ["JVM", "Python", "Node.js", "C++"], answer: 0 }
    ],
    "c++": [
        { q: "C++ is an extension of ...?", options: ["C", "Java", "Python", "Ruby"], answer: 0 },
        { q: "Which symbol ends a statement?", options: [".", ":", ";", "/"], answer: 2 },
        { q: "What is used to define a function?", options: ["func", "def", "void", "method"], answer: 2 }
    ]
};

let selectedTopic = "";
let username = "";
let topicQuestions = [];
let current = 0;
let score = 0;
let timeLeft = 15;
let timer;

// Topic selection
document.querySelectorAll('.topic-box').forEach(box => {
    box.addEventListener('click', () => {
        document.querySelectorAll('.topic-box').forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
        selectedTopic = box.getAttribute('data-topic');
    });
});

function startQuiz() {
    username = document.getElementById('username').value.trim() || "Anonymous";
    if (!selectedTopic) return alert("Please select a topic!");

    current = 0;
    score = 0;

    const allQ = questions[selectedTopic];
    topicQuestions = shuffle([...allQ]).slice(0, 3);

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-box').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    if (current >= topicQuestions.length) return endQuiz();

    const q = topicQuestions[current];
    document.getElementById('question').textContent = q.q;
    const answers = document.getElementById('answers');
    answers.innerHTML = '';

    q.options.forEach((opt, i) => {
        const li = document.createElement('li');
        li.textContent = opt;
        li.classList.add('answer-btn');
        li.onclick = () => selectAnswer(i);
        answers.appendChild(li);
    });

    timeLeft = 15;
    document.getElementById('time').textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            current++;
            showQuestion();
        }
    }, 1000);
}

function selectAnswer(i) {
    clearInterval(timer);
    const correct = topicQuestions[current].answer;
    if (i === correct) {
        new Audio('audio/correct.mp3').play();
        score++;
    } else {
        new Audio('audio/wrong.mp3').play();
    }
    current++;
    setTimeout(showQuestion, 800);
}

function endQuiz() {
    alert(`${username}, you got ${score}/${topicQuestions.length}!`);

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const existing = leaderboard.find(u => u.username === username);
    if (existing) {
        existing.score += score;
    } else {
        leaderboard.push({ username: username, score });
    }

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    window.location.href = 'leaderboard.html';
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}