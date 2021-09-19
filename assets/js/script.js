var highScore = {name: "",score: ""};
var formEl = document.querySelector("#quiz-form");
var timerEl = document.getElementById('timer');
highScoreCounter = 0;
var Q = 0;

const questions =[
    {
        question: "What does HTML stand for?",
        choices: [
            "Heat The Meat Loaf",
            "Hyper Turing Molecule L-dwarf",
            "Hypertext Markup Language",
            "Happy Turtles Made Love",
        ],
        answer: "Hypertext Markup Language"
    },
    {
        question: "What does API stand for?",
        choices: [
            "Application Programming Interface",
            "Applied Protocol Initiation",
            "Apple I",
            "Ape Private Investigator",
        ],
        answer: 0
    },
    {
        question: "What seperates a class from an element in a stylesheet?",
        choices: [
            "()",
            ",",
            "[]",
            ".",
        ],
        answer: 3
    },
    {
        question: "What is a boolean?",
        choices: [
            "An alien.",
            "A dessert.",
            "A true/false data type.",
            "A ghastly event.",
        ],
        answer: 2
    },
    {
        question: "In a for loop, what does i++ do?",
        choices: [
            "adds 2 to i",
            "adds two i's",
            "adds one second",
            "increases i counter by one",
        ],
        answer: 3
    },
    {
        question: "How many milliseconds are in a second?",
        choices: [
            "1/1000",
            "100",
            "1000",
            "1E-3",
        ],
        answer: 2
    },
    {
        question: "If a division is inside of a division it is known as _____",
        choices: [
            "div soup",
            "a child",
            "a parent",
            "class",
        ],
        answer: 1
    }
];

// //buttons might be a pain
// var isClicked0 = false;
// document.querySelector('#q0').addEventListener("click", function(){
//     if(isClicked0 == false){
//     isClicked0 = true;
//     } else {
//     isClicked0 = false;
//     }
// });
// var isClicked1 = false;
// document.querySelector('#q1').addEventListener("click", function(){
//     if(isClicked1 == false){
//     isClicked1 = true;
//     } else {
//     isClicked1 = false;
//     }
// });
// var isClicked2 = false;
// document.querySelector('#q2').addEventListener("click", function(){
//     if(isClicked2 == false){
//     isClicked2 = true;
//     } else {
//     isClicked2 = false;
//     }
// });
// var isClicked3 = false;
// document.querySelector('#q3').addEventListener("click", function(){
//     if(isClicked3 == false){
//     isClicked3 = true;
//     } else {
//     isClicked3 = false;
//     }
// });

var quizGo = function(event) {
    event.preventDefault();
    var quizNameInput = document.querySelector("input[name='quiz-name']").value;
    if (!quizNameInput) {
        alert("Please Enter Your Name");
        return false;
    };

    var timeLeft = 40;
    createQuestions();

    var countdown = function() {
        var timeInterval = setInterval(function() {
          if (timeLeft > 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;        
          } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            alert("Time's up. Score: 0");
            highScore.name = quizNameInput;
            highScore.score = 0;
            saveHighScore(highScore);
            quizNameInput = ('');
          }
        }, 1000);
    };

    function createQuestions() {
        var questionEl = document.getElementById("question");
        questionEl.className = "questions";
        //clearquestionEl
        var h2El = document.createElement("h2");
        h2El.textContent = questions[Q].question;

        questionEl.appendChild(h2El);
        var choicesEl = document.getElementById("choices");
        choicesEl.innerHTML = "";
            
        questions[Q].choices.forEach(function(choice){
            var button = document.createElement("button");
            button.textContent = choice;
            button.setAttribute("value", choice);
            button.onclick = checkAnswer;
            choicesEl.appendChild(button);
        })
    };
    
    function checkAnswer(){
        if (this.value !== questions[Q].answer){
            console.log("wrong"); //checktimer
        } else {
            console.log("right");
        }
        Q++;
        if (Q === questions.length){ //savetimer
            console.log("endgame");
        }else {createQuestions();
            
        }
    }

    countdown();

    playerScore = timeLeft;
    var playerObj = {
        name: quizNameInput,
        score: playerScore
    };

    createHighScore(playerObj);
    formEl.reset();
};

//this function is pulling info from highScores array
var createHighScore = function() {
    var highScoreEl = document.createElement("li");
    highScoreEl.className = "list-group";
    highScoreEl.setAttribute("high-score", highScoreCounter);
    highScoreEl.innerHTML = "<h3 class = 'text-center'>" + highScore.name + ": " + highScore.score + "</h3>"
    
    document.querySelector("#high-score").append(highScoreEl);
    saveHighScore(highScore);
    
};

var loadHighScore = function() {
    var savedHighScore = localStorage.getItem("high-score");
    if (!savedHighScore) {
        return false;
    }
    console.log("HighScores retrieved.")

    highScore = JSON.parse(savedHighScore);

    createHighScore(highScore);
};

var saveHighScore = function() {
    localStorage.setItem("high-score", JSON.stringify(highScore));
};

document.querySelector("#start-btn").addEventListener("click", quizGo);
loadHighScore();