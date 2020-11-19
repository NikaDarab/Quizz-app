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
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
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

function generateMainPage(){
  return `<div class="container">
  <h2>A quizz about the show "Girlfriends"</h2>
  <button class="start-btn" id="start-btn">Start Quiz</button></div>`;
}

function generateQuestions(){
  let question = store.questions[store.questionNumber];
  let answers = question.answers.map((answer,index) => {
    console.log(answer,index);
    return `<input type="radio" id="answer${index}" name="answer" value="${answer}" />
    <label for="answer${index}">${answer}</label><br />`;
  });

  console.log(answers);
  return `<div class="container">
  <form class="questions"id="question">
  <h2>${question.question}</h2>
  <div class="answers">
            <input type="radio" id="answer${index}" name="answer" value="${answer}" />
            <label for="a1">${question.answers[0]}</label><br />
            <input type="radio" id="answer2" name="answer" value="${question.answers[1]}" />
            <label for="a2">${question.answers[1]}</label><br />
            <input type="radio" id="answer2" name="answer" value="${question.answers[2]}" />
            <label for="a2">${question.answers[2]}</label>
            <input type="radio" id="answer2" name="answer" value="${question.answers[3]}" />
            <label for="a2">${question.answers[3]}</label>
  </div>
  </form>
  <button class="submit-btn"type="submit">Submit</button></div>
</div>`;
}




/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/
function handleStartQuiz(){
  $('main').on('click','#start-btn', function(event){
    store.quizStarted= true;
    render();
  });
}
// These functions handle events (submit, click, etc)

function render (){
  let html = '';
  (!store.quizStarted) ?html =generateMainPage()
    : html = generateQuestions();
  

  $('main').html(html);
}

function main (){
  render();
  handleStartQuiz();
}

$(main);
