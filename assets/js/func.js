

var questions = [
    {
        question: "Commonly used data type Do Not include:---",
        answers: [
            {text: "strings", correct: false},
            {text: "booleance", correct: false},
            {text: "alerts", correct: true},
            {text: "numbers", correct: false}
        ],
    },

    {
        question: "The condition in an if/else statement is enclosed within:---",
        answers: [
            {text: "quotes", correct: false},
            {text: "curly brackets", correct: false},
            {text: "parentheses", correct: true},
            {text: "square brackets", correct: false}
        ],  
    },
    {
        question: "Arrays in JavaScript can be used to store:---",
        answers: [
            {text: "numbers and strings", correct: false},
            {text: "others Arrays", correct: false},
            {text: "booleances", correct: false},
            {text: "all of the above", correct: true}
        ],    
    },
    {
        question: "String values must be enclosed within --- when being assigned to variables ",
        answers: [
            {text: "commas", correct: false},
            {text: "curly brackets", correct: false},
            {text: "quotes", correct: true},
            {text: "parentheses", correct: false}
        ],    
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:---",
        answers: [
            {text: "JavaScript", correct: false},
            {text: "terminal/bash", correct: false},
            {text: "alerts", correct: false},
            {text: "console.log", correct: true}
        ],    
    },
]

var questionContainerElement = document.getElementById("question-container");
var shuffledQuestions, currentQuestionIndex
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var startBtn = document.getElementById("start-btn");
var nextBtn = document.getElementById("next-btn");
var scoreBtn = document.getElementById("score-btn");
var info = document.getElementById("info");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++
    displaynextQuestion()
})

function startQuiz(){
    info.classList.add("hide")
    startBtn.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    displaynextQuestion()
}

function displayQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
     var button =document.createElement("button")
    button.innerText=answer.text
    button.classList.add("btn")
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
    });
}


function displaynextQuestion(){
    resetState()
    displayQuestion(shuffledQuestions[currentQuestionIndex])
}

function resetState() {
clearStatusClass(document.body)    
nextBtn.classList.add("hide")
while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide")
    } else {
        startBtn.innerText = "Restart"
        startBtn.classList.remove("hide")
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}


function timecounter() {
    var timeLeft = 75;
    button.addEventListener.add("click", startQuiz)
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        displayMessage();
      }
    }, 1000);
  }