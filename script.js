const questions = [
    { id: 1, question: "Analogy: Architect is to Building as Sculptor is to...", options: ["Museum", "Stone", "Chisel", "Statue"], correctAnswer: 3, explanation: "An architect creates a building as a final product. Similarly, a sculptor creates a statue as a final product.", status: 'notVisited', selectedOption: null },
    { id: 2, question: "Series Completion: 7, 10, 8, 11, 9, 12, ... What number should come next?", options: ["7", "10", "12", "13"], correctAnswer: 1, explanation: "This is an alternating series. One series is 7, 8, 9, ... (adds 1). The other is 10, 11, 12, ... (adds 1). The next number would be in the first series, which is 10.", status: 'notVisited', selectedOption: null },
    { id: 3, question: "Coding: If MADRAS is coded as NBESBT, how is BOMBAY coded?", options: ["CPNCBZ", "CPOCBZ", "CQNCBZ", "CQOCBZ"], correctAnswer: 0, explanation: "Each letter in the word is moved one step forward. M becomes N, A becomes B, D becomes E, and so on. Therefore, BOMBAY becomes CPNCBZ.", status: 'notVisited', selectedOption: null },
    { id: 4, question: "Blood Relations: Pointing to a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to the boy?", options: ["Brother", "Uncle", "Cousin", "Father"], correctAnswer: 3, explanation: "The 'only son of my mother' is Suresh himself. Therefore, the boy is the son of Suresh. So, Suresh is the father.", status: 'notVisited', selectedOption: null },
    { id: 5, question: "Direction Sense: A man walks 5 km South, turns right, walks 3 km, then turns left and walks 5 km. In which direction is he from the starting point?", options: ["West", "South", "North-East", "South-West"], correctAnswer: 3, explanation: "He walks South and then West. His final position is to the South and West of his starting point.", status: 'notVisited', selectedOption: null },
    { id: 6, question: "Syllogism: Statements: All actors are girls. All girls are beautiful. Conclusions: 1. All actors are beautiful. 2. Some girls are actors.", options: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"], correctAnswer: 2, explanation: "Since actors are a subset of girls, and girls are a subset of beautiful things, it follows that all actors are beautiful. Also, since all actors are girls, it means some girls are indeed actors.", status: 'notVisited', selectedOption: null },
    { id: 7, question: "Number Series: Find the missing term: 4, 18, ?, 100, 180, 294.", options: ["32", "36", "48", "40"], correctAnswer: 2, explanation: "The pattern is (2³-2²), (3³-3²), (4³-4²), (5³-5²), (6³-6²), (7³-7²). The missing term is (4³-4²) = 64-16 = 48.", status: 'notVisited', selectedOption: null },
    { id: 8, question: "Odd One Out: Choose the word which is different from the rest.", options: ["Kiwi", "Eagle", "Emu", "Ostrich"], correctAnswer: 1, explanation: "All options except for Eagle are flightless birds. The Eagle can fly.", status: 'notVisited', selectedOption: null },
    { id: 9, question: "Arrangement: Six friends are in a circle facing the center. Deepa is between Prakash and Pankaj. Priti is between Mukesh and Lalit. Prakash and Mukesh are opposite each other. Who sits opposite Priti?", options: ["Prakash", "Deepa", "Pankaj", "Lalit"], correctAnswer: 1, explanation: "The seating arrangement is circular with Prakash opposite Mukesh. This places Deepa opposite Priti to satisfy all conditions.", status: 'notVisited', selectedOption: null },
    { id: 10, question: "Statement & Assumption: Statement: 'Use of cell phones is strictly prohibited on office premises.' Assumptions: I. Employees might use cell phones. II. This rule is necessary for productivity.", options: ["Only I is implicit", "Only II is implicit", "Both are implicit", "Neither is implicit"], correctAnswer: 2, explanation: "A rule is made because there's a possibility of the action occurring (I). The prohibition implies it's necessary for a reason, like productivity or discipline (II).", status: 'notVisited', selectedOption: null }
];

let currentQuestionIndex = 0;
let timerInterval;

const mainApp = document.getElementById('main-app');
const timerEl = document.getElementById('timer');
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const markReviewBtn = document.getElementById('mark-review-btn');
const clearResponseBtn = document.getElementById('clear-response-btn');
const submitBtn = document.getElementById('submit-btn');

const confirmModal = document.getElementById('confirm-modal');
const cancelSubmitBtn = document.getElementById('cancel-submit-btn');
const confirmSubmitBtn = document.getElementById('confirm-submit-btn');

const resultModal = document.getElementById('result-modal');
const closeResultBtn = document.getElementById('close-result-btn');
const reviewAnswersBtn = document.getElementById('review-answers-btn');

const reviewModal = document.getElementById('review-modal');
const backToResultsBtn = document.getElementById('back-to-results-btn');

const togglePaletteBtn = document.getElementById('toggle-palette-btn');
const closePaletteBtn = document.getElementById('close-palette-btn');
const questionPalette = document.getElementById('question-palette');

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            submitTest();
        }
    }, 1000);
}

function updatePalette() {
    const answeredContainer = document.getElementById('answered-questions');
    const notAnsweredContainer = document.getElementById('not-answered-questions');
    const notVisitedContainer = document.getElementById('not-visited-questions');
    const reviewContainer = document.getElementById('review-questions');
    const answeredReviewContainer = document.getElementById('answered-review-questions');

    answeredContainer.innerHTML = '';
    notAnsweredContainer.innerHTML = '';
    notVisitedContainer.innerHTML = '';
    reviewContainer.innerHTML = '';
    answeredReviewContainer.innerHTML = '';

    questions.forEach((q, index) => {
        const item = document.createElement('button');
        item.textContent = index + 1;
        item.className = `question-palette-item w-8 h-8 font-semibold transition-all duration-200 border-2 text-white`;

        let targetContainer;
        let hasReviewMark = false;
        let isAnsweredAndReviewed = false;

        switch(q.status) {
            case 'answered':
                item.classList.add('bg-green-500', 'rounded-md');
                targetContainer = answeredContainer;
                break;
            case 'notAnswered':
                 item.classList.add('bg-red-500', 'rounded-md');
                 targetContainer = notAnsweredContainer;
                break;
            case 'markedForReview':
                item.classList.add('bg-purple-500', 'rounded-full');
                hasReviewMark = true;
                targetContainer = reviewContainer;
                break;
            case 'answeredAndMarkedForReview':
                item.classList.add('bg-purple-500', 'rounded-full');
                hasReviewMark = true;
                isAnsweredAndReviewed = true;
                targetContainer = answeredReviewContainer;
                break;
            case 'notVisited':
            default:
                item.classList.add('bg-gray-400', 'rounded-md');
                targetContainer = notVisitedContainer;
        }

        if (index === currentQuestionIndex) {
            item.classList.add('border-blue-500', 'ring-2', 'ring-blue-300');
        } else {
            item.classList.add('border-transparent');
        }

        if (hasReviewMark) {
            const reviewMark = document.createElement('div');
            reviewMark.className = 'review-mark';
            if (isAnsweredAndReviewed) {
                reviewMark.style.backgroundColor = '#22c55e';
                reviewMark.style.borderColor = 'transparent';
            }
            item.appendChild(reviewMark);
        }

        item.onclick = () => {
            jumpToQuestion(index);
        };
        
        if (targetContainer) {
            targetContainer.appendChild(item);
        }
    });
}

function renderQuestion(index) {
    currentQuestionIndex = index;
    const q = questions[index];

    if (q.status === 'notVisited') {
        q.status = 'notAnswered';
    }

    questionContainer.innerHTML = `
        <div class="mb-4">
            <h2 class="text-xl font-semibold mb-1">Question ${q.id}</h2>
            <p class="text-gray-600">${q.question}</p>
        </div>
        <div id="options-container" class="space-y-3">
            ${q.options.map((option, i) => `
                <label class="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-indigo-50 transition-colors duration-200 ${q.selectedOption === i ? 'bg-indigo-100 border-indigo-400' : ''}">
                    <input type="radio" name="option" value="${i}" class="form-radio h-5 w-5 text-indigo-600" ${q.selectedOption === i ? 'checked' : ''}>
                    <span class="ml-3 text-gray-700">${option}</span>
                </label>
            `).join('')}
        </div>
    `;
    
    document.querySelectorAll('input[name="option"]').forEach(input => {
        input.onchange = (e) => {
            q.selectedOption = parseInt(e.target.value);
            if(q.status !== 'answeredAndMarkedForReview') {
                q.status = 'answered';
            }
        };
    });

    updateNavButtons();
    updatePalette();
}

function updateNavButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
    prevBtn.classList.toggle('cursor-not-allowed', prevBtn.disabled);
}

function saveAndGoToNext(isMarkedForReview = false) {
    const currentQ = questions[currentQuestionIndex];
    
    if (isMarkedForReview) {
        if (currentQ.selectedOption !== null) {
            currentQ.status = 'answeredAndMarkedForReview';
        } else {
            currentQ.status = 'markedForReview';
        }
    } else {
         if (currentQ.selectedOption !== null && currentQ.status !== 'answeredAndMarkedForReview') {
            currentQ.status = 'answered';
        }
    }
    
    if (currentQuestionIndex < questions.length - 1) {
        renderQuestion(currentQuestionIndex + 1);
    } else {
        updatePalette();
    }
}

function jumpToQuestion(index) {
    renderQuestion(index);
    if(window.innerWidth < 768){
        questionPalette.classList.add('translate-x-full');
    }
}

function clearResponse() {
    const currentQ = questions[currentQuestionIndex];
    currentQ.selectedOption = null;
    if(currentQ.status === 'answeredAndMarkedForReview') {
         currentQ.status = 'markedForReview';
    } else {
        currentQ.status = 'notAnswered';
    }
    renderQuestion(currentQuestionIndex);
}

function submitTest() {
    clearInterval(timerInterval);
    
    const attempted = questions.filter(q => q.selectedOption !== null).length;
    const notAttempted = questions.length - attempted;
    const markedForReview = questions.filter(q => q.status === 'markedForReview' || q.status === 'answeredAndMarkedForReview').length;
    
    document.getElementById('submission-summary').innerHTML = `
        <div class="text-left space-y-2">
            <p><strong>Total Questions:</strong> ${questions.length}</p>
            <p><strong>Attempted:</strong> ${attempted}</p>
            <p><strong>Not Attempted:</strong> ${notAttempted}</p>
            <p><strong>Marked for Review:</strong> ${markedForReview}</p>
        </div>
    `;
    confirmModal.classList.remove('hidden');
}

function calculateAndShowResults() {
    let score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    const penalty = 1/3;

    questions.forEach(q => {
        if(q.selectedOption !== null) {
            if (q.selectedOption === q.correctAnswer) {
                correctAnswers++;
                score++;
            } else {
                incorrectAnswers++;
                score -= penalty;
            }
        }
    });

    const attempted = correctAnswers + incorrectAnswers;
    score = score < 0 ? 0 : score;

    document.getElementById('result-stats').innerHTML = `
        <div class="bg-blue-100 p-4 rounded-lg">
            <div class="text-4xl font-bold text-blue-600">${score.toFixed(2)}</div>
            <div class="text-sm text-blue-800">Marks Scored</div>
        </div>
        <div class="bg-green-100 p-4 rounded-lg">
            <div class="text-4xl font-bold text-green-600">${correctAnswers}</div>
            <div class="text-sm text-green-800">Correct</div>
        </div>
         <div class="bg-red-100 p-4 rounded-lg">
            <div class="text-4xl font-bold text-red-600">${incorrectAnswers}</div>
            <div class="text-sm text-red-800">Wrong</div>
        </div>
    `;
    confirmModal.classList.add('hidden');
    resultModal.classList.remove('hidden');
}

function renderReview() {
    const reviewContent = document.getElementById('review-content');
    reviewContent.innerHTML = '';

    questions.forEach((q, index) => {
        const userWasCorrect = q.selectedOption === q.correctAnswer;
        const userSkipped = q.selectedOption === null;

        const optionsHtml = q.options.map((option, i) => {
            let classes = 'border-gray-300';
            let indicator = '';

            // Correct answer
            if (i === q.correctAnswer) {
                classes = 'border-green-500 bg-green-50 font-semibold';
                indicator = `<span class="ml-auto text-green-600 font-bold">✓ Correct</span>`;
            }
            // User's incorrect answer
            if (i === q.selectedOption && !userWasCorrect) {
                 classes = 'border-red-500 bg-red-50';
                 indicator = `<span class="ml-auto text-red-600 font-bold">✗ Your Answer</span>`;
            }
            
            return `<li class="flex items-center p-3 rounded-lg border ${classes}">${option} ${indicator}</li>`;
        }).join('');

        const questionCard = document.createElement('div');
        questionCard.className = 'bg-white p-6 rounded-lg shadow-sm';
        questionCard.innerHTML = `
            <p class="font-semibold text-lg mb-2">Q${index + 1}: ${q.question}</p>
            <ul class="space-y-2 mb-4">${optionsHtml}</ul>
            <div class="bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-500">
                <h4 class="font-bold text-indigo-800">Explanation:</h4>
                <p class="text-indigo-700">${q.explanation}</p>
            </div>
        `;
        reviewContent.appendChild(questionCard);
    });

    resultModal.classList.add('hidden');
    reviewModal.classList.remove('hidden');
    mainApp.classList.add('hidden');
}

// Event Listeners
window.onload = () => {
    const testDuration = 60 * 10; // 10 minutes
    startTimer(testDuration, timerEl);
    renderQuestion(0);
};

nextBtn.addEventListener('click', () => saveAndGoToNext());
prevBtn.addEventListener('click', () => {
     if (currentQuestionIndex > 0) {
        renderQuestion(currentQuestionIndex - 1);
    }
});
markReviewBtn.addEventListener('click', () => saveAndGoToNext(true));
clearResponseBtn.addEventListener('click', clearResponse);
submitBtn.addEventListener('click', submitTest);

cancelSubmitBtn.addEventListener('click', () => confirmModal.classList.add('hidden'));
confirmSubmitBtn.addEventListener('click', calculateAndShowResults);

closeResultBtn.addEventListener('click', () => {
    resultModal.classList.add('hidden');
});
reviewAnswersBtn.addEventListener('click', renderReview);
backToResultsBtn.addEventListener('click', () => {
    reviewModal.classList.add('hidden');
    resultModal.classList.remove('hidden');
    mainApp.classList.remove('hidden');
});

togglePaletteBtn.addEventListener('click', () => {
    questionPalette.classList.remove('translate-x-full');
});
closePaletteBtn.addEventListener('click', () => {
     questionPalette.classList.add('translate-x-full');
});
