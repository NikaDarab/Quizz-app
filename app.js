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
      question: "Who are the four women who star in Girlfriends?",
      answers: ["Joann, Lisa, Mia, Tasha", "Lynn, Jessica, Mia, Tonya", "Joan, Toni, Maya, Lynn", "Tony, Maya, Lynn, Monica"],
      correctAnswer: "Joan, Toni, Maya, Lynn",
    },
    {
      question: "Did Toni and William ever date?",
      answers: ["true", "false"],
      correctAnswer: "false",
    },
    {
      question: "Who do Toni call her bestfriend ?",
      answers: ["Joan", "Lynn","Maya",'Herself'],
      correctAnswer: "Joan",
    },
    {
      question: "Who did Maya have an 'Almost' affair with ?",
      answers: ["William", "Stan","James",'Steve'],
      correctAnswer: "Stan",
    },
    {
      question: "How did Maya get the start to her book, 'Oh Hell Yes' ?",
      answers: ["Inspired by her divorce", "From writing an essay for school","Listening to Joan constant complain about dating","Trying to encourage Lynn to work"],
      correctAnswer: "From writing an essay for school",
    },
    {
      question: "What person told Maya that she should turn the essay into a book?",
      answers: ["Joan", "Toni","Peaches","Cousin Ronnie"],
      correctAnswer: "Cousin Ronnie",
    },
    {
      question: "What TV Show character did William have a crush on?",
      answers: ["Thelma from Good Times", "Gina from Martin","Kim from the Parkers","None of the above"],
      correctAnswer: "Thelma from Good Times",
    },
    {
      question: "Where did Joan take Toni to get over the breakup that Joan caused with Toni and Greg?",
      answers: ["Yolanda Adams' One Love Cruise", "Arsenio's Cancun Jazz Festival","Sinbad's Soul Music Festival in Aruba","None the above"],
      correctAnswer: "Sinbad's Soul Music Festival in Aruba",
    },
    {
      question: "What celebrity guest appeared at Joan's opening of the J-Spot?",
      answers: ["Diana Ross", "Mo'Nique","Jill Scoot","Queen Latifah"],
      correctAnswer: "Mo'Nique",
    },
    {
      question: "Which girl saw their father while on a Nude beach celebrating her 30th Birthday?",
      answers: ["Joan", "Lynn","Toni","Maya"],
      correctAnswer: "Joan",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

let gifArr = [
  'https://giphy.com/embed/3ohhwxCQmcq7dB6JBm',
  "https://giphy.com/embed/l2QDSFhrmHU3MI1tS"
  // <div style="width:100%;height:0;padding-bottom:47%;position:relative;"><iframe src="https://giphy.com/embed/l2QDSFhrmHU3MI1tS" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/dawniemarie-no-girlfriends-l2QDSFhrmHU3MI1tS">via GIPHY</a></p>
  
]

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
      let randomGif=gifArr[Math.floor(Math.random()* gifArr.length)];
      $('main').html(`<div class="checkAnswer"><h3>This is wrong</h3><button type="submit" id="nextQuestion" class="next-button" name="next">NEXT </button><iframe src="${randomGif}" width="480" height="234" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dawniemarie-season-1-no-3ohhwxCQmcq7dB6JBm">via GIPHY</a></p></div><p>${store.score} ${store.questionNumber+1}</p></div>`);
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
