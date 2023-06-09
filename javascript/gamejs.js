const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

/**
 * Start the game by hiding the start button and shuffling the questions
 */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

/**
 * Start the game by hiding the start button and shuffling the questions
 */
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

/**
 * Set the next question
 */
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Show the question and its answers
 * @param {Object} question 
 */
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

/**
 * Reset the state of the game
 */
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/**
 * Select an answer and set the status class
 * @param {Event} e 
 */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

/**
 * Set the status class
 * @param {HTMLElement} element 
 * @param {Boolean} correct 
 */
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

/**
 * Clear the status class
 * @param {HTMLElement} element 
 */
 
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: ' Ai là cầu thủ giành được Quả bóng vàng FIFA năm 2021? ',
    answers: [
      { text: 'Messi', correct: true },
      { text: 'Cristiano Ronaldo ', correct: false },
      { text: 'Neymar', correct: false },
      { text: 'Luka Modric', correct: false }
    ]
  },
  {
    question: 'Đội tuyển bóng đá nào giành chức vô địch World Cup 2018? ',
    answers: [
      { text: 'Croatia', correct: false },
      { text: ' Đức', correct: false },
      { text: 'Pháp', correct: true },
      { text: 'Argentina', correct: false }
    ]
  },
  {
    question: 'Cầu thủ nào giữ kỷ lục ghi bàn nhiều nhất trong lịch sử World Cup?',
    answers: [
      { text: 'Pele ', correct: false },
      { text: 'Diego Maradona', correct: false },
      { text: 'Miroslav Klose ', correct: true },
      { text: 'Ronaldo', correct: false}
    ]
  },
  {
    question: 'Đội tuyển bóng đá nào giành chức vô địch Euro 2020?',
    answers: [
      { text: ' Anh', correct: false },
      { text: '  Italia ', correct: true },
      { text: 'Tây Ban Nha ', correct: false },
      { text: 'Argentina', correct: false }
    ]
  },
  {
    question: 'Ai là huấn luyện viên của đội tuyển bóng đá Anh tại Euro 2020?',
    answers: [
      { text: 'Roy Hodgson ', correct: false },
      { text: 'Gareth Southgate', correct: true },
      { text: 'Gareth Southgate', correct: false },
      { text: ' Yua Mikami', correct: false }
    ]
  }
];
