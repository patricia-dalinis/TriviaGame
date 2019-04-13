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

    // Set up hide and onclick functions, hide the choice buttons and start again button, onclick start game and answer choices. Outcomes should be logged and displayed at the end in the final results page. Once a choice is clicked, the result will display...

    $(".choices").hide();
    $("#startAgain").hide();
    $("#startGame").click(beginGame);

    $(".choices").on("click", function () {
        userChoice = $(this).attr("value");
        console.log(userChoice);
        results();
    });

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
        $("#startOver").hide();
        displayQuestion();
    }

    function displayQuestion() {
        $("#answer").hide();
        $("#result").hide();
        $("#gif").hide();
        $(".choices").show();
        $("#question").show();

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

        $('#timeRemaining').html("Quickly, Potter! Only " + countDown + " seconds left!");
        $("#answer").html("The correct answer: " + quiz[index].correctAnswer);
        $("#gif").html("<img src=" + quiz[index.gif + " />"]);

        if (countDown === 0) {
            $("#answer").show();
            $("#result").html("Time's up, Potter!");
            missedQuestions++;
        } else if (quiz[index].options[userChoice][1] === "correct") {
            $("#result").html("Well done, Potter!");
            rightQuestions++;
        } else if (quiz[index].options[userChoice][1] === "incorrect") {
            $("#answer").show();
            $("#result").html("Better luck next time, eh Potter?");
            wrongQuestions++;
        }

        nextQuestion = setTimeout(reset, 4000);
    }

    // Reset for the next question, display the results page
    function reset() {
        countTimer = 15;
        if (index < (quiz.length - 1)) {
            index++;
            displayQuestion();
        } else {
            $("#gif").hide();
            $("#answer").hide();
            $("#question").hide();
            $("#results").show();
            $("#startAgain").show();

            $('#timeRemaining').html("Quickly, Potter! Only " + countDown + " seconds left!");
            $("#result").html("Until next year, Potter! Here are your marks.");
            $("#right").html("Good Marks: " + rightQuestions);
            $("#wrong").html("Bad Marks: " + wrongQuestions);
            $("#missed").html("Missed Marks: " + missedQuestions);
        }
    }
})