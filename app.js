/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: "What color is broccoli?",
      answers: ["red", "orange", "pink", "green"],
      correctAnswer: "green",
    },
    {
      question: "What is the current year?",
      answers: ["1970", "2015", "2019", "2005"],
      correctAnswer: "2019",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

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
  <h2>A quizz about the show "Girlfriends"</h2>
  <button class="start-btn" id="start-btn">Start Quiz</button></div>`;
}

function generateQuestions() {
  let question = store.questions[store.questionNumber];

  let answer = question.answers.map((answer, index) => {
    

    if (index === 0) {
      return `<div class="feedback"><input type="radio" id="answer${index}" name="answer" value="${answer}" required>
    <label for="answer${index}">${answer}</label><br /></div>`;
    }  
    return `<input type="radio" id="answer${index}" name="answer" value="${answer}"/>
    <label for="answer${index}">${answer}</label><br />`;
  });
  return `<div class="container">
  <div class="status"><span>Current question: ${store.questionNumber+1}</span></div>
  <span><div class="score"><span>Current score:${store.score}</div><span>
  <form class="questions"id="question">
  <h2>${question.question}</h2>
  ${answer.join("")}
  <button class="submit-btn" id="submit" type="submit">Submit</button></div>
  </form>
</div>`;
}
// function generateCorrectAnswer(){
//   return `
//   <div class="correct-answer">
//   <h2> yeay, that's the right answer</h2>
//   <button id="next-btn>Next</button></div>
//   <p>Current Score:${store.score}</p>`;
// }
function generateFinalPage(){
  if(questionNumber === question.length){
    return `
    <div class="finalPage">
    <h2>Congrats, this is the end</h2>;
    <p>Final Score: ${store.score}</p>
    <button id="restart-btn">Start Over</button>`;

  }
 
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/
function handleStartQuiz() {
  $("main").on("click", ".start-btn", function (event) {
    store.quizStarted = true;
    render();
  });
}

function handleAnswerSubmit() {
  $("main").on("submit",'#question',function(event){
    event.preventDefault();
    let chosenAnswer = $("input[name='answer']:checked").val();
    let correctAnswer =store.questions[store.questionNumber].correctAnswer;
    if(chosenAnswer===correctAnswer) {
      store.score++;
      $('main').html(`<div class="checkAnswer"><h3> This is the right answer</h3> <button type="submit" class="next-button" id="nextQuestion" name="next">NEXT </button><p>${store.score} ${store.questionNumber+1}</p></div>`);
    } else {
      $('main').html(`<div class="checkAnswer"><h3>This is wrong</h3><button type="submit" id="nextQuestion" class="next-button" name="next">NEXT </button></div><p>${store.score} ${store.questionNumber+1}</p></div>`);
    }
    
  });
}
function handleNextQuestion() {
  $("main").on("click",' #nextQuestion',function(event){
    store.questionNumber++;
    if(store.questionNumber===store.questions.length){
      $('main').html(`<button type="submit"  class="restartButton"id="restart-btn">Reset</button><div class="final-score">Final Score: ${store.score}</div>`);
      render();
    }
    render();
  });

}

function handleRestart() {
  $('main').on('click',"#restart-btn",function(){
    store.quizStarted =false;
    store.questionNumber=0;
    render();
  });
}
// These functions handle events (submit, click, etc)

function render() {
  let html = "";
  store.quizStarted
    ? (html = generateQuestions())
    : store.questionNumber === store.questions.length ?
      (html = generateFinalPage):
      (html = generateMainPage());

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
