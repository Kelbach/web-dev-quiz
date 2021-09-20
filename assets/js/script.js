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
        answer: "Application Programming Interface"
    },
    {
        question: "What seperates a class from an element in a stylesheet?",
        choices: [
            "()",
            ",",
            "[]",
            ".",
        ],
        answer: "."
    },
    {
        question: "What is a boolean?",
        choices: [
            "An alien.",
            "A dessert.",
            "A true/false data type.",
            "A ghastly event.",
        ],
        answer: "A true/false data type."
    },
    {
        question: "In a for loop, what does i++ do?",
        choices: [
            "adds 2 to i",
            "adds two i's",
            "adds one second",
            "increases i counter by one",
        ],
        answer: "increases i counter by one"
    },
    {
        question: "How many milliseconds are in a second?",
        choices: [
            "1/1000",
            "100",
            "1000",
            "1E-3",
        ],
        answer: "1000"
    },
    {
        question: "If a division is inside of a division, that first division is known as _____",
        choices: [
            "div soup",
            "a child",
            "a parent",
            "class",
        ],
        answer: "a child"
    }
];

var quizGo = function(event) {
    event.preventDefault();
    var quizNameInput = document.querySelector("input[name='quiz-name']").value;
    if (!quizNameInput) {
        alert("Please Enter Your Name");
        return false;
    };

    var timeLeft = 40;
    countdown();
    createQuestions();

    

    function countdown() {
        var timeInterval = setInterval(function() {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
            if (timeLeft <= 0){
            clearInterval(timeInterval);
            timerEl.textContent = "";
            };      
        }, 1000); 
    };

    function createQuestions() {
        var questionEl = document.getElementById("question");
        questionEl.innerHTML = "";
        questionEl.className = "questions";

        var h2El = document.createElement("h2");
        h2El.textContent = questions[Q].question;
        questionEl.appendChild(h2El);
        
        var choicesEl = document.getElementById("choices");
        choicesEl.innerHTML = "";

        if (timeLeft <= 0) {
            questionEl.innerHTML = "";
            choicesEl.innerHTML = "";
        }    

        questions[Q].choices.forEach(function(choice){
            var button = document.createElement("button");
            button.textContent = choice;
            button.setAttribute("value", choice);
            button.onclick = checkAnswer;
            choicesEl.appendChild(button);
        })
        
    };

    function checkAnswer(){
        var answerEl = document.createElement("answer");
        answerEl.textcontent = questions[Q].answer;
        document.querySelector("#answer").append(answerEl);

        if (this.value !== questions[Q].answer){
            timeLeft = timeLeft - 10;
            console.log("wrong");
        } else {console.log("right");}
        Q++;
        if (Q === questions.length || timeLeft <= 0 ){ 
            console.log("endgame");
            endgame();
        }else {createQuestions();};
    }

    function endgame() {
        if (timeLeft <= 0){
            timeLeft = 0;
        }  
        Q = 0;
        alert("Game Over. Your score is " + timeLeft + ".");
        highScore.name = quizNameInput;
        highScore.score = timeLeft;
        saveHighScore(highScore);
        createHighScore(highScore);
        console.log("game-over");
        return timeLeft = 0;
    }

    formEl.reset();
};

var createHighScore = function(x) {
    var highScoreEl = document.createElement("li");
    highScoreEl.className = "list-group";
    highScoreEl.setAttribute("high-score", highScoreCounter); //i was going to add multiple high scores using this but ran out of time
    highScoreEl.innerHTML = "<h3 class = 'text-center'>" + x.name + ": " + x.score + "</h3>"   
    document.querySelector("#high-score").append(highScoreEl);    
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
//i hate this challenge