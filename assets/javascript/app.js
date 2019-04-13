$(document).ready(function () {
    // Set up all questions and results, each resulting in a "correct" or "incorrect" and displaying a gif.
    var quiz = [{
        question: "What is Hermione's middle name?",
        options: {
            option1: ["Jane", "incorrect"],
            option2: ["Rachel", "incorrect"],
            option3: ["Sarah", "incorrect"],
            option4: ["Jean", "correct"],
        },
        correctAnswer: "Jane",
        gif: "assets/images/hermione.gif"
    }, {
        question: "What is Narcissa Malfoy's maiden name?",
        options: {
            option1: ["Pettigrew", "incorrect"],
            option2: ["Black", "correct"],
            option3: ["Prewett", "incorrect"],
            option4: ["Evans", "incorrect"],
        },
        correctAnswer: "Black",
        gif: "assets/images/narcissa.gif"
    }, {
        question: "How many names does Dumbledore have in his full name?",
        options: {
            option1: ["Two", "incorrect"],
            option2: ["Three", "incorrect"],
            option3: ["Four", "incorrect"],
            option4: ["Five", "correct"],
        },
        correctAnswer: "Five",
        gif: "assets/images/dumbledore2.gif"
    }, {
        question: "Who does Draco Malfoy take to the Yule Ball in Book Four?",
        options: {
            option1: ["Pansy Parkinson", "correct"],
            option2: ["Hermione Granger", "incorrect"],
            option3: ["Millicent Bullstrode", "incorrect"],
            option4: ["Fleur Delacour", "incorrect"],
        },
        correctAnswer: "Pansy Parkinson",
        gif: "assets/images/malfoy.gif"
    }, {
        question: "What is Rita Skeeter's Animagus form?",
        options: {
            option1: ["mouse", "incorrect"],
            option2: ["fish", "incorrect"],
            option3: ["frog", "incorrect"],
            option4: ["beetle", "correct"],
        },
        correctAnswer: "beetle",
        gif: "assets/images/rita.gif"
    }, {
        question: "Who knocks out the troll in the ladies' bathroom in Book One?",
        options: {
            option1: ["Harry", "incorrect"],
            option2: ["Ron", "correct"],
            option3: ["Professor Snape", "incorrect"],
            option4: ["Professor Quirrell", "incorrect"],
        },
        correctAnswer: "Ron",
        gif: "assets/images/ron.gif"
    }, {
        question: "Who knocks out the troll in the corridor that leads to the Sorcerer's Stone in Book One?",
        options: {
            option1: ["Harry", "incorrect"],
            option2: ["Hermione", "incorrect"],
            option3: ["Professor Snape", "incorrect"],
            option4: ["Professor Quirrell", "correct"],
        },
        correctAnswer: "Professor Quirrell",
        gif: "assets/images/quirrell.gif"
    }, {
        question: "Who was the student that was petrified by the Basilisk by looking through Nearly-Headless Nick in Book Two?",
        options: {
            option1: ["Ernie Macmillan", "incorrect"],
            option2: ["Justin Finch-Fletchley", "correct"],
            option3: ["Lee Jordan", "incorrect"],
            option4: ["Seamus Finnigan", "incorrect"],
        },
        correctAnswer: "Justin Finch-Fletchley",
        gif: "assets/images/nick.gif"
    }, {
        question: "Who placed the Imperius Curse on Katie Bell in Book Six?",
        options: {
            option1: ["Professor Snape", "incorrect"],
            option2: ["Voldermort", "incorrect"],
            option3: ["Draco Malfoy", "incorrect"],
            option4: ["Madam Rosmerta", "correct"],
        },
        correctAnswer: "Madam Rosmerta",
        gif: "assets/images/bell.gif"
    }, {
        question: "What is the name of the dog that Aunt Marge brings with her to Privet Drive in Book Three?",
        options: {
            option1: ["Ripper", "correct"],
            option2: ["Buster", "incorrect"],
            option3: ["Rover", "incorrect"],
            option4: ["Bowser", "incorrect"],
        },
        correctAnswer: "Ripper",
        gif: "assets/images/marge.gif"
    }];

    // Variables for Game
    var index = 0;
    var nextQuestion;
    var countDown = 15;
    var intervalId;
    var userChoice;
    var rightQuestions;
    var wrongQuestions;
    var missedQuestions;

    // Set up begining of game, hide the choice buttons and start again button, onclick start game and answer choices. Outcomes should be logged and displayed at the end in the final results page. Once a choice is clicked,the result will display... Game restarts upon onclick of Once More?
    $(".choices").hide();
    $("#startAgain").hide();
    $("#startGame").click(beginGame);

    $(".choices").on("click", function () {
        userChoice = $(this).attr("value");
        console.log(userChoice);
        results();
    });

    $("#startAgain").click(beginGame);

    // Function Timer for Questions
    function myTimer() {
        countDown--;
        $("#timeRemaining").html("Quickly, Potter! Only " + countDown + " seconds left!");
        if (countDown === 0) {
            results();
        }
        console.log(countDown);
    }

    // Set up functions to begin the quiz, display the questions, and display the results. Don't forget the timer!
    function beginGame() {
        console.log("The Game Has Begun");
        rightQuestions = 0;
        wrongQuestions = 0;
        missedQuestions = 0;
        index = 0;

        $("#startGame").hide();
        $("#results").hide();
        $("#startAgain").hide();
        displayQuestion();
    }

    function displayQuestion() {
        $("#answer").hide();
        $("#result").hide();
        $("#gif").hide();
        $(".choices").show();
        $("#question").show();
        $('#timeRemaining').show();

        intervalId = setInterval(myTimer, 1000);

        $('#timeRemaining').html("Quickly, Potter! Only " + countDown + " seconds left!");
        $('#question').html(quiz[index].question);
        $('#choice1').html(quiz[index].options.option1[0]);
        $('#choice2').html(quiz[index].options.option2[0]);
        $('#choice3').html(quiz[index].options.option3[0]);
        $('#choice4').html(quiz[index].options.option4[0]);
    }

    // Results should be determined using an if else statement.
    function results() {
        $("#question").hide();
        $(".choices").hide();
        $("#gif").show();
        $("#result").show();

        clearInterval(intervalId);

        $("#answer").html("The correct answer: " + quiz[index].correctAnswer);
        $("#gif").html("<img src=" + quiz[index].gif + " />");

        if (countDown === 0) {
            $("#timeRemaining").hide();
            $("#answer").show();
            $("#result").html("Time's up, Potter!");
            missedQuestions++;
        } else if (quiz[index].options[userChoice][1] === "correct") {
            $("#timeRemaining").hide();
            $("#answer").show();
            $("#result").html("Correct! Well done, Potter!");
            rightQuestions++;
        } else if (quiz[index].options[userChoice][1] === "incorrect") {
            $("#timeRemaining").hide();
            $("#answer").show();
            $("#result").html("Wrong! Better luck next time, eh Potter?");
            wrongQuestions++;
        }

        nextQuestion = setTimeout(reset, 4500);
    }

    // Reset for the next question, display the results page
    function reset() {
        console.log("Reset");
        countDown = 15;
        if (index < (quiz.length - 1)) {
            index++;
            displayQuestion();
        } else {
            $("#gif").hide();
            $("#answer").hide();
            $("#question").hide();
            $("#results").show();
            $("#startAgain").show();
            $("#timeRemaining").hide();

            $("#result").html("Quills down! Here are your marks:");
            $("#right").html("Good Marks: " + rightQuestions);
            $("#wrong").html("Bad Marks: " + wrongQuestions);
            $("#missed").html("Missed the Mark: " + missedQuestions);
        }
    }
})