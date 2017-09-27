var triviaObjects = [
  {
    name: "Q1",
    question: "Which is a name of one who dated with Taylor Swift?",
    c1: "David Beckham",
    c2: "Jude Law",
    c3: "Taylor Lautner",
    c4: "Ashton Kutcher",
    ans: "Taylor Lautner",
    ansImg: "assets/images/taylor.jpg"
  },
  {
    name: "Q2",
    question: "The original Starbucks was established in 1971 in what U.S. city?",
    c1: "Seattle",
    c2: "San Francisco",
    c3: "Boston",
    c4: "New York",
    ans: "Seattle",
    ansImg: "assets/images/starbucks.jpg"
  },
  {
    name: "Q3",
    question: "SpaceX was founded by what South African-born inventor?",
    c1: "Jeff Bezos",
    c2: "Richard Branson",
    c3: "Mark Zackerberg",
    c4: "Elon Musk",
    ans: "Elon Musk",
    ansImg: "assets/images/elon.jpg"
  },
  {
    name: "Q4",
    question: "A panda's daily diet consists almost entirely of what plant?",
    c1: "Bamboo",
    c2: "Banana",
    c3: "Insect",
    c4: "Eucalyptus",
    ans: "Bamboo",
    ansImg: "assets/images/panda.jpg"
  },
  {
    name: "Q5",
    question: "Who is credited with suggesting the word 'hello' be used when answering the telephone?",
    c1: "Thomas Edison",
    c2: "Thomas Bell",
    c3: "Alan Turing",
    c4: "Nikola Tesla",
    ans: "Thomas Edison",
    ansImg: "assets/images/edison.jpg"
  },
  {
    name: "Q6",
    question: "When talking about computer memory, what does the acronym ROM stand for?",
    c1: "Roming memory",
    c2: "Random memory",
    c3: "Read-on memory",
    c4: "Read-only memory",
    ans: "Read-only memory",
    ansImg: "assets/images/rom.jpg"
  },
  {
    name: "Q7",
    question: "To be legally sold as bourbon, a whiskey's mash must contain at least 51% of what grain?",
    c1: "Corn",
    c2: "Rice",
    c3: "Wheat",
    c4: "Rye",
    ans: "Corn",
    ansImg: "assets/images/corn.jpg"
  },
  {
    name: "Q8",
    question: "In 1975 an engineer created the first electronic camera while working for what company?",
    c1: "Canon",
    c2: "Nikon",
    c3: "Konica",
    c4: "Kodak",
    ans: "Kodak",
    ansImg: "assets/images/kodak.jpg"
  }
];

var triviaNum;
var correctAnsNum;
var incorrectAnsNum;
var unansweredNum;
var intervalID;
var limitedTime;

var selectedItem;
var correctAnswer;
var message; // Correct! or Nop! or Out of Time!

var resetTrivia = function() {

	intervalID = 0;

	selectedItem = "";
	correctAnswer = "";
	message = "";
	limitedTime = 5;

	$("#message").remove();
	
};

var resetGame = function() {

	correctAnsNum = 0;
	incorrectAnsNum = 0;
	unansweredNum = 0;

}

var setStartButton = function() {

	var charDiv = document.createElement("div");
	$(".main").append(charDiv);

	$(charDiv).attr("id", "startButton");
	$("#startButton").html("Start");

};


var setTimerDiv = function() {

	var charDiv = document.createElement("div");
	$(".main").append(charDiv);

	$(charDiv).attr("id", "remainSeconds");

};

var removeTimerDiv = function() {

	$("#remainSeconds").remove();
}

var setQandADiv = function() {

	var charDiv = document.createElement("div");
	$(".main").append(charDiv);
	$(charDiv).attr("id", "question");

	var charDiv = document.createElement("div");
	$(".main").append(charDiv);
	$(charDiv).attr("id", "ansDiv");

};

var removeQandADiv = function() {

	$("#question").remove();
	$("#ansDiv").remove();

}

var setMessage = function() {

	// set Message Div
	var charDiv = document.createElement("div");
	$(".main").append(charDiv);

	$(charDiv).attr("id", "message");

};

var removeMessage = function() {

	$("#message").remove();

};

var run = function() {
 	intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
var decrement = function() {

	limitedTime--;

	$("#remainSeconds").html("Time remaining: " + limitedTime + " Seconds");

	if (limitedTime === 0) {

		stop();

		console.log("out of time");

		removeQandADiv();

		message = "<h1>Out of Time!</h1>";
		message += "<p>The Correct Answer was: " + triviaObjects[triviaNum].ans + "</p>";
		
		// Count up the number of unanswered
		unansweredNum++;

		// Dispaly message
		setMessage();
		$("#message").html(message);
		$("#message").append("<img src='" + triviaObjects[triviaNum].ansImg + "'>");

		// Move to next
		nextTrivia()
	}
}

//  The stop function
var stop = function() {
 	clearInterval(intervalId);
}

var nextTrivia = function() {
	intervalId = setInterval(moveToNext, 1000 * 3); // <-  Seconds unitl moving next
}

var moveToNext = function() {
	console.log("next");

	// Stop Interval
	stop();

	// Remove Divs
	removeTimerDiv();
	removeMessage();

	triviaNum++;

	if (triviaNum !== triviaObjects.length) {
	// Trivia is remaining
		printTrivia(triviaNum);
	}
	else {
	// All trivia was finished
		gameEnd();
	}
}

var setRestartButton = function() {

	var charDiv = document.createElement("div");
	$(".main").append(charDiv);

	$(charDiv).attr("id", "restartButton");
	$("#restartButton").html("Start Over?");

};

var gameEnd = function() {
	console.log(correctAnsNum);
	console.log(incorrectAnsNum);
	console.log(unansweredNum);

	// create Message Div
	setMessage();

	// Print numbers
	var charDiv = document.createElement("div");
	$("#message").append(charDiv);
	$(charDiv).html("<h1>All Done, heres how you did!</h1>");
	$(charDiv).append("<p>Correct Answers: " + correctAnsNum + "</p>");
	$(charDiv).append("<p>Incorrect Answers: " + incorrectAnsNum + "</p>");
	$(charDiv).append("<p>Unanswered: " + unansweredNum + "</p>");

	// Display Restart button
	setRestartButton();

	// Push Restart button
	$("#restartButton").on("click",  function(event) {

		// Remove Start button
		$("#restartButton").remove();

		console.log("restart button pushed");

		printTrivia(0);

		// Reset variables
		resetGame();

	});

}


var printTrivia = function(triviaNum) {

	// Reset
	resetTrivia();

	// Print timer
	setTimerDiv();
	$("#remainSeconds").html("Time remaining: " +limitedTime + " Seconds"); //Default
	run();

	// Set Div for Question and Options 
	setQandADiv();

	// Print Question
	$("#question").html(triviaObjects[triviaNum].question);

	// Print Options
	var charDiv = document.createElement("li");
	$("#ansDiv").append(charDiv);
	$(charDiv).attr("class", "option");
	$(charDiv).attr("id", "c1");
	$(charDiv).attr("value", triviaObjects[triviaNum].c1);
	$(charDiv).html(triviaObjects[triviaNum].c1);

	var charDiv = document.createElement("li");
	$("#ansDiv").append(charDiv);
	$(charDiv).attr("class", "option");
	$(charDiv).attr("id", "c2");
	$(charDiv).attr("value", triviaObjects[triviaNum].c2);
	$(charDiv).html(triviaObjects[triviaNum].c2);

	var charDiv = document.createElement("li");
	$("#ansDiv").append(charDiv);
	$(charDiv).attr("class", "option");
	$(charDiv).attr("id", "c3");
	$(charDiv).attr("value", triviaObjects[triviaNum].c3);
	$(charDiv).html(triviaObjects[triviaNum].c3);

	var charDiv = document.createElement("li");
	$("#ansDiv").append(charDiv);
	$(charDiv).attr("class", "option");
	$(charDiv).attr("id", "c4");
	$(charDiv).attr("value", triviaObjects[triviaNum].c4);
	$(charDiv).html(triviaObjects[triviaNum].c4);

	// When a option was selected...
	$("#ansDiv").on("click", '.option', function(event) {
	//$("#ansUL").click(function(event) {
		console.log("selected");
		console.log($(this).attr("id"));// c1,c2,c3,c4
		console.log(triviaObjects[triviaNum].ans);

		// Stop Interval
		stop();
		
		var selectedItem = $(this).attr("value");
		var correctAnswer = triviaObjects[triviaNum].ans

		// Remove question and options
		$("#question").remove();
		$("#ansDiv").remove();

		if (selectedItem === correctAnswer) {
		// Answer is correct...
			console.log("correct");

			message = "<h1>Correct!</h1>";

			correctAnsNum++;
		}
		else {
		// Answer is incorrect...
			console.log("incorrect");

			message = "<h1>Nope</h1>";
			message += "<p>The Correct Answer was: " + triviaObjects[triviaNum].ans + "</p>";

			incorrectAnsNum++;
		}

		// Dispaly message
		setMessage();
		$("#message").html(message);

		$("#message").append("<img src='" + triviaObjects[triviaNum].ansImg + "'>");


		// Move to Next question
		nextTrivia()

	});

}


$(document).ready(function() {

	// Reset values
	resetTrivia();
	resetGame();

	// Set Start button
	setStartButton();

	// Push Start button
	$("#startButton").on("click",  function(event) {

		// Remove Start button
		$("#startButton").remove();

		console.log("start button pushed");

		printTrivia(0);

	});


});



