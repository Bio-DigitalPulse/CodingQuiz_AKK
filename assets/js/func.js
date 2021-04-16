var quizBody = document.getElementById("quiz");
var scoreItem = document.getElementById("final-score");
var gameOverItem = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startBtn = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscore-container");
var highscoreDiv = document.getElementById("highscore-page");
var initialsInput = document.getElementById("initials");
var initialsDisplay = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitBtn = document.getElementById("submit-score");
var displayWindow = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


var quizQuestions = [{
    question: "____ tag is an extension to HTML that can enclose JavaScript statements?",
    choiceA: "SCRIPT",
    choiceB: "BODY",
    choiceC: "HEAD",
    choiceD: "TITLE",
    correctAnswer: "a"},
  {
    question: "JavaScript is interpreted by ____",
    choiceA: "Client",
    choiceB: "Server",
    choiceC: "Object",
    choiceD: "None of the above",
    correctAnswer: "a"},
   {
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"},
    {
    question: "Which of the following attribute can hold the JavaScript version?",
    choiceA: "LANGUAGE",
    choiceB: "SCRIPT",
    choiceC: "VERSION",
    choiceD: "None of the above",
    correctAnswer: "a"},
    {
    question: "Which of the following is not considered a JavaScript operator?",
    choiceA: "new",
    choiceB: "this",
    choiceC: "delete",
    choiceD: "typeof",
    correctAnswer: "b"},  
    {
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "js",
    choiceB: "scripting",
    choiceC: "script",
    choiceD: "javascript",
    correctAnswer: "c"},
    {
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
        ];

var finalQIndex = quizQuestions.length;
var currentQIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

function generateQuestions(){
    gameOverItem.style.display = "none";
    if (currentQIndex === finalQIndex){
        return displayScore();
    } 
    var currentQuestion = quizQuestions[currentQIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz(){
    gameOverItem.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuestions();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          displayScore();
        }
        
      }, 1000);

    quizBody.style.display = "block";
}




function displayScore(){
    quizBody.style.display = "none"
    gameOverItem.style.display = "flex";
    clearInterval(timerInterval);
    initialsInput.value = "";
    scoreItem.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitBtn.addEventListener("click", function highscore(){
    
    
    if(initialsInput.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = initialsInput.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameOverItem.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHScores();

    }
    
});

function generateHScores(){

    initialsDisplay.innerHTML = "";
    displayWindow.innerHTML = "";

    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

    for (i = 0; i < highscores.length; i++) {

        var newName = document.createElement("li");
        var newScore = document.createElement("li");

        newName.textContent = highscores[i].name;
        newScore.textContent = highscores[i].score;

        initialsDisplay.appendChild(newName);
        displayWindow.appendChild(newScore);
    }
}

function displayHighScore(){

    startQuizDiv.style.display = "none"
    gameOverItem.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHScores();
}

function clearScore(){

    window.localStorage.clear();
    initialsDisplay.textContent = "";
    displayWindow.textContent = "";
}

function replayQuiz(){

    highscoreContainer.style.display = "none";
    gameOverItem.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQIndex = 0;

}

function checkAnswer(answer){

    correct = quizQuestions[currentQIndex].correctAnswer;

    if (answer === correct && currentQIndex !== finalQIndex){
        score++;

    alert("That Is Correct!");
        currentQIndex++;
        generateQuestions();

    }else if (answer !== correct && currentQIndex !== finalQIndex){
        timeLeft -= 5;
        quizTimer.textContent = 'Time left: '+ timeLeft;

    alert("That Is Incorrect.")
        currentQIndex++;
        generateQuestions();

    }else{

        displayScore();

    }
}

startBtn.addEventListener("click",startQuiz);