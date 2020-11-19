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
    console.log(answer, index);

    if (index === 0) {
      return `<input type="radio" id="answer${index}" name="answer" value="${answer}" required>
    <label for="answer${index}">${answer}</label><br />`;
    } 
    return `<input type="radio" id="answer${index}" name="answer" value="${answer}" required />
    <label for="answer${index}">${answer}</label><br />`;
  });

  console.log(answer);
  return `<div class="container">
  <div class="status">Current question: ${store.questionNumber+1}</div>
  <div class="score">Current score:${store.score}</div>
  <form class="questions"id="question">
  <h2>${question.question}</h2>
  ${answer.join("")}
  </form>
  <button class="submit-btn"type="submit">Submit</button></div>
</div>`;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/
function handleStartQuiz() {
  $("main").on("click", "#start-btn", function (event) {
    store.quizStarted = true;
    render();
  });
}

function handleAnswerSubmit() {
  $("main").on("submit",'#question',function(event){
    event.preventDefault();
    let chosenAnswer = $("input[name='answer']:checked").val();
    console.log(chosenAnswer);

    store.question++;
    console.log("question number", store.questionNumber);
    render();
  });
}

function handleRestart() {
  $('main').on('click',"#restart",function(){
    store.quizStarted =false;
    store.questionNumber=0;
    render();
  });
}
// These functions handle events (submit, click, etc)

function render() {
  let html = "";
  !store.quizStarted
    ? (html = generateMainPage())
    : (html = generateQuestions());

  $("main").html(html);
}

function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleRestart();

}

$(main);
