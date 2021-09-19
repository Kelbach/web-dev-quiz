var highScore = {name: "",score: ""};
var formEl = document.querySelector("#quiz-name");
var timerEl = document.getElementById('timer');
var i = 0;

const questions = [
    {
        question: "What does HTML stand for?",
        choices: [
            "Heat The Meat Loaf",
            "Hyper Turing Molecule L-dwarf",
            "Hypertext Markup Language",
            "Happy Turtles Made Love",
        ],
        answer: 2
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

var quizGo = function(event) {
    event.preventDefault();
    var quizNameInput = document.querySelector("input[name='quiz-name']").value;
    if (!quizNameInput) {
        alert("Please Enter Your Name");
        return false;
    };
    var timeLeft = 90;
    var countdown = function() {
        // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
        var timeInterval = setInterval(function() {
          // As long as the `timeLeft` is greater than 1
          if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
          } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerEl.textContent = timeLeft;
            timeLeft--;
          } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `displayMessage()` function
            alert("Time's up. Score: 0");
          }
        }, 1000);
    };

    var createQuestions = function() {
        var questionEl = document.createElement("div");
        questionEl.className = "questions";

        var c0El = document.querySelector("#q0");
        var c1El = document.querySelector("#q1");
        var c2El = document.querySelector("#q2");
        var c3El = document.querySelector("#q3");

        var answerEl = document.createElement("div")
        answerEl.className = "answer";
        
        var checkAnswer = function() {
            console.log("poo");
        };
        
        while (timeLeft > 0) {
            questionEl.innerHTML = "<h3 class='question'>" + questions[i].question + "</h3>";
            document.querySelector("#question").append(questionEl);
            c0El.textContent = questions[i].choices[0];
            c1El.textContent = questions[i].choices[1];
            c2El.textContent = questions[i].choices[2];
            c3El.textContent = questions[i].choices[3];

            document.querySelector("#q0").addEventListener("click", checkAnswer());

            //problem with how to change click event into boolean
            if(document.getElementById('#q0').clicked == true || questions[i].answer !== 0){
                i++;
                createQuestions();
                timeLeft = timeLeft - 5;
            }
            if(document.getElementById('#q1').clicked == true || questions[i].answer !== 1){
                i++;
                createQuestions();
                timeLeft = timeLeft - 5
            }
            if(document.getElementById('#q2').clicked == true || questions[i].answer !== 2){
                i++;
                createQuestions();
                timeLeft = timeLeft - 5
            }
            if(document.getElementById('#q3').clicked == true || questions[i].answer !== 3){
                i++;
                createQuestions();
                timeLeft = timeLeft - 5
            }
            else {
                i++;
                createQuestions();
            }
        };
    };

    countdown();
    createQuestions();

    
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