var highScore = {name: "",score: ""};
var formEl = document.querySelector("#quiz-name");
var timerEl = document.getElementById('timer');

const questions = [
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
        question: "If a division is inside of a division it is known as _____",
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
    }

    var countdown = function() {
        var timeLeft = 90;
      
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

        var choicesEl = document.createElement("ul");
        choicesEl.className = "choices";

        var answerEl = document.createElement("div")
        answerEl.className = "answer";
        
        var checkAnswer = function() {
            console.log("shit");
        }
        
        function renderQuestion(i) {
            setTimeout(function() {
                questionEl.innerHTML = "<h3 class='question'>" + questions[i].question + "</h3>";
                document.querySelector("#question").append(questionEl);

                choicesEl.innerHTML = "<li><button id='choice-0'>" + questions[i].choices[0] + "</btn></li></br><li><button id='choice-1'>" + questions[i].choices[1] + "</btn></li></br><li><button id='choice-2'>" + questions[i].choices[2] + "</btn></li></br><li><button id='choice-3'>" + questions[i].choices[3] + "</btn></li></br>";
                document.querySelector("#choices").append(choicesEl);
                document.querySelector("#choice-0").addEventListener("click", checkAnswer);
            }, 90000*i);
        }

        //make while loop to set individual conditions
        for (var i = 0; i < questions.length; i++) {
            renderQuestion(i);
        }
    }
       
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