/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/**
 * Example  store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: "Who are the four women who star in Girlfriends?",
      answers: [
        "Joann, Lisa, Mia, Tasha",
        "Lynn, Jessica, Mia, Tonya",
        "Joan, Toni, Maya, Lynn",
        "Tony, Maya, Lynn, Monica",
      ],
      correctAnswer: "Joan, Toni, Maya, Lynn",
    },
    {
      question: "Did Toni and William ever date?",
      answers: ["true", "false"],
      correctAnswer: "false",
    },
    {
      question: "Who do Toni call her bestfriend ?",
      answers: ["Joan", "Lynn", "Maya", "Herself"],
      correctAnswer: "Joan",
    },
    {
      question: "Who did Maya have an 'Almost' affair with ?",
      answers: ["William", "Stan", "James", "Steve"],
      correctAnswer: "Stan",
    },
    {
      question: "How did Maya get the start to her book, 'Oh Hell Yes' ?",
      answers: [
        "Inspired by her divorce",
        "From writing an essay for school",
        "Listening to Joan constant complain about dating",
        "Trying to encourage Lynn to work",
      ],
      correctAnswer: "From writing an essay for school",
    },
    {
      question:
        "What person told Maya that she should turn the essay into a book?",
      answers: ["Joan", "Toni", "Peaches", "Cousin Ronnie"],
      correctAnswer: "Cousin Ronnie",
    },
    {
      question: "What TV Show character did William have a crush on?",
      answers: [
        "Thelma from Good Times",
        "Gina from Martin",
        "Kim from the Parkers",
        "None of the above",
      ],
      correctAnswer: "Thelma from Good Times",
    },
    {
      question:
        "Where did Joan take Toni to get over the breakup that Joan caused with Toni and Greg?",
      answers: [
        "Yolanda Adams' One Love Cruise",
        "Arsenio's Cancun Jazz Festival",
        "Sinbad's Soul Music Festival in Aruba",
        "None the above",
      ],
      correctAnswer: "Sinbad's Soul Music Festival in Aruba",
    },
    {
      question:
        "What celebrity guest appeared at Joan's opening of the J-Spot?",
      answers: ["Diana Ross", "Mo'Nique", "Jill Scoot", "Queen Latifah"],
      correctAnswer: "Mo'Nique",
    },
    {
      question:
        "Which girl saw their father while on a Nude beach celebrating her 30th Birthday?",
      answers: ["Joan", "Lynn", "Toni", "Maya"],
      correctAnswer: "Joan",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

let gifArrayWrong = [
  "https://giphy.com/embed/3ohhwxCQmcq7dB6JBm",
  "https://giphy.com/embed/l2QDSFhrmHU3MI1tS",
];

let gifArrayCorrect = ["https://giphy.com/gifs/gffcSKwGREETNo9rsy/html5",'https://giphy.com/gifs/kfXJTsTzz0hx6zDfBn/html5'];
/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templat

function generateMainPage() {
  return `<div class="container">
  <h2 class="intro">A Quizz About The Show <span class="gf">GIRLFRIENDS</span></h2>
  <button class="start-btn" id="start-btn">Start Quiz</button></div>`;
}

function generateQuestions() {
  let question = store.questions[store.questionNumber];

  let answer = question.answers.map((answer, index) => {
    if (index === 0) {
      return `<div class="answers"><input type="radio" id="answer${index}" name="answer" value="${answer}" required>
    <label for="answer${index}">${answer}</label><br /></div>`;
    }
    return `<input type="radio" id="answer${index}" name="answer" value="${answer}"/>
    <label for="answer${index}">${answer}</label><br />`;
  });
  return `<div class="container">
  <div class="status">Current question: ${store.questionNumber + 1}</div>
  <div class="score"><span>Current score:${store.score}</div>
  <form class="questions"id="question">
  <h2>${question.question}</h2>
  ${answer.join("")}
  <button class="submit-btn" id="submit" type="submit">Submit</button></div>
  </form>
</div>`;
}

function generateFinalPage() {
  return `<div class="correctPage">
  <h2 class="final">Yay! You finished the quiz!</h2>
  <p class="answerCounter">Correct: ${store.score} Incorrect: ${store.wrong}</p>
  <img class="correctGif" src="./images/party-hard.gif" alt="Harry and Ron smiling">
  <button id="reset">Try Again?</button>
</div>`;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

function renderPage() {
  let html = '';
  if (store.quizStarted) {
    if (store.questionNumber === store.questions.length) {
      html = generateFinalPage();
    } else {
      html = generateQuestions();
    } 
  } else {
    html = generateMainPage();
  }
  $('main').html(html);
}

function handleStartQuiz() {
  $("main").on("click", ".start-btn", function (event) {
    store.quizStarted = true;
    renderPage();
  });
}
function checkAnswer(){
  $('main').on('submit', '#questionForm', function(event) {
    event.preventDefault();
    let e = store.questions[store.questionNumber].correctAnswer;
    let submitValue = $('input[name="answer"]:checked').val();
    console.log(e, submitValue);
    if (submitValue === e) {
      store.score++;
      $('main').html(`<div class="correctPage">
       <h2 class="correct">Yay! you were correct!</h2>
       <p class="answerCounter">Correct: ${store.score} Incorrect: ${store.wrong}</p>
       <button id="nextBtn">Next Question</button>
       <img class="correctGif" src="./images/harry-and-ron.gif" alt="Harry and Ron smiling">
     </div>
     `);
    } else {
      store.wrong++;
      $('main').html(`<div class="incorrectPage">
       <h2 class="incorrect">Oh no! That is the wrong answer!</h2>
       <p class="answerCounter">Correct: ${store.score} Incorrect: ${store.wrong}</p>
       <button id="nextBtn">Next Question</button>
       <img class="incorrectGif" src="./images/harry-rubber-arm.gif" alt="Harry holding rubber arm in shock">
     </div>
     `);
    }   
  });
}


function handleNextQuestion() {
  $("main").on("click", " #nextQuestion", function (event) {
    store.questionNumber++;
    render();
  });
}

function handleAnswerSubmit() {
  $("main").on("submit", "#question", function (event) {
    event.preventDefault();
    let chosenAnswer = $("input[name='answer']:checked").val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    if (chosenAnswer === correctAnswer) {
      store.score++;
      let randomGifCorrect =
        gifArrayCorrect[Math.floor(Math.random() * gifArrayCorrect.length)];
      $("main").html(`<div class="checkAnswer"><div class="container">
      <a href="https://giphy.com/gifs/dawniemarie-season-1-no-3ohhwxCQmcq7dB6JBm"></a></div>
      <div class="status">Current question: ${store.questionNumber + 1}</div>
      <div class="score"><span>Current score:${store.score}</div></p>
      <iframe src="${randomGifCorrect}" width="480" height="234" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </form><button type="submit" class="next-button" id="nextQuestion" name="next">NEXT </button></form></div>`);
    } else {
      let randomGifWrong =
        gifArrayWrong[Math.floor(Math.random() * gifArrayWrong.length)];

      $("main").html(`<div class="checkAnswer"><div class="container">
      <a href="https://giphy.com/gifs/dawniemarie-season-1-no-3ohhwxCQmcq7dB6JBm"></a></div><div class="status">Current question: ${
  store.questionNumber + 1
}</div>
      <div class="score"><span>Current score:${store.score}</div>
      <iframe src="${randomGifWrong}" width="480" height="234" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      <form><button type="submit" class="next-button" id="nextQuestion" name="next">NEXT </button></form></div>`);
    }
  });
}


function handleRestart() {
  $("main").on("click", "#restart-btn", function () {
    store.quizStarted = false;
    store.questionNumber = 0;
    render();
  });
}
// These functions handle events (submit, click, etc)

function render() {
  let html = "";
  store.quizStarted
    ? (html = generateQuestions())
    : store.questionNumber === store.questions.length
      ? (html = generateFinalPage)
      : (html = generateMainPage());

  $("main").html(html);
}

function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleNextQuestion();
  handleRestart();
}

$(main);
