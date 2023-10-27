const quizes = [
  {
    que: 'What is the result of the expression "5" == 5 in JavaScript?',
    options: ['true', 'false', 'Error', 'NaN'],
    correct: 'true'
  },
  {
  que: 'What does CSS stand for?',
  options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
  correct: 'Cascading Style Sheets'

  },
  {
    que: 'What is the purpose of the JavaScript `parseInt()` function?',
    options: ['To round a number', 'To parse a string and return an integer', 'To format a date', 'To perform addition'],
    correct: 'To parse a string and return an integer'
  },
  {
    que: 'Which keyword is used to declare a variable in JavaScript?',
    options: ['var', 'let', 'const', 'variable'],
    correct: 'var'
  },
  {
    que: 'What does the "NaN" in JavaScript stand for?',
    options: ['Not a Number', 'New Assignment', 'Number Assignment', 'Negative And Null'],
    correct: 'Not a Number'
  },
  {
    que: 'Which of the following is not a JavaScript data type?',
    options: ['Number', 'Boolean', 'Undefined', 'Integer'],
    correct: 'Integer'
  },
  {
    que: 'What is the correct way to comment a single line in JavaScript?',
    options: ['// Comment text', '/* Comment text */', '-- Comment text', '# Comment text'],
    correct: '// Comment text'
  },
  {
    que: 'What is the JavaScript typeof operator used for?',
    options: ['Conditional statements', 'Conversion of variables', 'Checking data type', 'Mathematical operations'],
    correct: 'Checking data type'
  },
  {
    que: 'Which built-in method converts a string to lowercase?',
    options: ['toLowerCase()', 'toLower()', 'lowerCase()', 'changeCaseToLower()'],
    correct: 'toLowerCase()'
  },
  {
    que: 'What is the result of 10 + "5"?',
  options: ['10', '15', 'Error', '105'],
  correct: '105'
  }
];


let currentQuestion = 0;
let rightAnswer = 0;
let wrongAnswer = 0;
let userAnswer = null; // Use null to track unanswered questions
let timer; // Variable to hold the timer

const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
const nextBtn = document.getElementById('next-btn');
const timerDisplay = document.getElementById('timer');

function startTimer() {
  let timeLeft = 50; 

  timer = setInterval(function () {
      if (timeLeft <= 0) {
          clearInterval(timer);
          showNextQuestion();
      } else {
          // Update the timer display
          timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
          timeLeft--;
      }
  }, 1000);
}

const showQuestion = () => {
  clearInterval(timer); 
  quizContainer.innerHTML = null;
  let quediv = document.createElement('div');
  let h3 = document.createElement('h3');
  h3.innerText = quizes[currentQuestion].que;
  h3.className = 'quiz-question';
  quediv.appendChild(h3);

  quizes[currentQuestion].options.map(data => {
      let optionDiv = document.createElement('div');
      let input = document.createElement('input');
      let span = document.createElement('span');
      input.type = 'radio';
      input.name = 'quiz-option';
      input.value = data;
      span.innerText = data;

      input.addEventListener('change', function () {
          userAnswer = this.value;
          nextBtn.disabled = false;
      });

      optionDiv.appendChild(input);
      optionDiv.appendChild(span);
      optionDiv.className = 'option-div';
      quediv.appendChild(optionDiv);
  });

  quizContainer.appendChild(quediv);

  startTimer();
}

showQuestion();

nextBtn.addEventListener('click', showNextQuestion);

function showNextQuestion() {
  const question = quizes[currentQuestion];
  if (userAnswer === question.correct) {
      rightAnswer++;
  } else if (userAnswer !== null) {
      wrongAnswer++;
  }

  if (currentQuestion + 1 < quizes.length) {
      currentQuestion++;
  } else if (currentQuestion + 1 === quizes.length) {
      resultContainer.style.display = 'block';
      showResult();
      quizContainer.style.display = 'none';
      nextBtn.style.display = 'none';
      timerDisplay.style.display = 'none'; 
      clearInterval(timer); 
  }
  nextBtn.disabled = true;
  userAnswer = null; 
  showQuestion();
}

// ... (your existing code)

function showResult() {
  document.getElementById('add').style.display='none'
  resultContainer.innerHTML = null;
  const winImage = document.getElementById('winImage');
  const loseImage = document.getElementById('loseImage');

  if (rightAnswer > wrongAnswer) {
    winImage.style.display = 'block';
  } else {
    loseImage.style.display = 'block';
  }
  
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  h1.innerText = rightAnswer > wrongAnswer ? 'You Win' : 'You Lost';
  const totalPossibleScore = quizes.length * 10;

  const score = document.createElement('h3');
  score.innerText = `Score: ${rightAnswer * 10}/${totalPossibleScore}`;

  div.appendChild(h1);
  div.appendChild(score);
  resultContainer.appendChild(div);
}

let count = 1;

function increment() {
  count++;
  document.getElementById('add').innerHTML = count;
}