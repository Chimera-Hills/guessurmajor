/*
master.js - 
Author(s): Kevin Hong, add your name here...
Date: 22 November, 2023
*/

// Borrowed some code from https://codepen.io/paigeellenstark/pen/MVGYWO?editors=0010

// Variables

var questionState = 0;	// Keeps track of user's place in quiz
var quizActive = true;	// True until last question is answered

var userStats =	[
    0,	// Literature Major
    0, 	// Film Major
    0, 	// Art History Major 
    0, 	// CompSci Major
    0, 	// Music Major 
    0 	// Biology Major
];

var tempStats = userStats; //Holds stat increases relating to user selection

// Array for questions
var questionArray =	[															
    "What's your favorite color from a rainbow?", 	// q1
    "What's your star sign?", // q2
    "What's your favorite season?", // q3
    "What's your hobby?", // q4
    "How do you like your coffee?", // q5
    "What's your favorite type of bagel?" // q6
];

// Array for answers
var answerArray = [ // q1 answers
    [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "violet"
    ],
    // q2 answers
    [
        "Capricorn",
        "Aquarius",
        "Pisces",
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius"
    ],
    // q3 answers
    [
        "Spring",
        "Summer",
        "Autumn",
        "Winter"
    ],
    // q4 answers
    [
        "photography",
        "gardening",
        "cooking",
        "reading",
        "gaming",
        "singing",
        "dancing",
        "music",
        "drawing",
        "fishing",
        "hiking",
        "sports"
    ],
    // q5 answers
    [
        "black, iced",
        "black, hot",
        "milky, iced",
        "milky, hot",
    ],
    // q6 answers
    [
        "plain",
        "blueberry",
        "onion",
        "poppyseed",
        "garlic",
        "sesame",
        "chocolate",
        "sourdough"
    ]
]

// Array of stat increments for each answer for every question
// Literature | Film | Art History | CompSci | Music | Biology
var answerValues = [ 
    [ // q1 values
        [ 0, 0, 3, 2, 1, 0 ], // red
        [ 3, 2, 1, 0, 0, 0 ], // orange
        [ 2, 3, 0, 0, 0, 1 ], // yellow
        [ 0, 0, 0, 1, 2, 3 ], // green
        [ 1, 0, 0, 3, 0, 2 ], // blue
        [ 0, 1, 2, 0, 3, 0 ] // violet
    ],
    [ // q2 values
        [ 2, 3, 0, 1, 0, 0 ], // Capricorn
        [ 0, 1, 2, 0, 3, 0 ], // Aquarius
        [ 0, 2, 3, 0, 1, 0 ], // Pisces
        [ 3, 2, 0, 0, 1, 0 ], // Aries
        [ 0, 1, 0, 2, 0, 3 ], // Taurus
        [ 2, 0, 1, 0, 3, 0 ], // Gemini
        [ 3, 0, 2, 0, 1, 0 ], // Cancer
        [ 1, 3, 0, 0, 2, 0 ], // Leo
        [ 0, 0, 0, 3, 1, 2 ], // Virgo
        [ 3, 0, 1, 0, 2, 0 ], // Libra
        [ 2, 0, 3, 0, 0, 1 ], // Scorpio
        [ 1, 2, 0, 0, 0, 3 ] // Sagittarius
    ],
    [ // q3 values
        [ 0, 3, 2, 0, 1, 0 ], // Spring
        [ 0, 0, 3, 0, 2, 1 ], // Summer
        [ 3, 1, 2, 0, 0, 0 ], // Autumn
        [ 0, 1, 0, 3, 0, 2 ] // Winter
    ],
    [ // q4 values
        [ 0, 3, 2, 0, 0, 1 ], // photography
        [ 2, 0, 1, 0, 0, 3 ], // gardening
        [ 1, 2, 0, 0, 0, 3 ], // cooking
        [ 3, 0, 0, 0, 2, 1 ], // reading/writing
        [ 0, 0, 0, 3, 1, 2 ], // gaming
        [ 2, 0, 1, 0, 3, 0 ], // singing
        [ 0, 1, 2, 0, 3, 0 ], // dancing
        [ 0, 0, 0, 2, 3, 1 ], // listening to music
        [ 1, 0, 3, 0, 2, 0 ], // drawing/painting
        [ 0, 2, 0, 0, 1, 3 ], // fishing
        [ 0, 3, 1, 0, 0, 2 ], // hiking
        [ 0, 0, 0, 0, 0, 0 ] // sports
    ],
    [ // q5 values
        [ 3, 1, 0, 0, 0, 2 ], // black, iced
        [ 1, 2, 0, 0, 0, 3 ], // black, hot
        [ 0, 0, 2, 1, 3, 0 ], // milky, iced
        [ 0, 0, 3, 2, 1, 0 ], // milky, hot
    ],
    [ // q6 values
        [ 3, 0, 2, 0, 0, 1 ], // plain
        [ 0, 0, 3, 1, 2, 0 ], // blueberry
        [ 2, 3, 0, 0, 0, 1 ], // onion
        [ 0, 0, 2, 1, 3, 0 ], // poppyseed
        [ 0, 2, 0, 3, 1, 0 ], // garlic
        [ 0, 0, 1, 0, 2, 3 ], // sesame
        [ 1, 0, 0, 3, 0, 2 ], // chocolate chip
        [ 0, 1, 3, 2, 0, 0 ] // sourdough
    ]
]

// Array for results
var resultArray = [
    {
        major: "Literature Major",
        desc: "So you called yourself a bookworm when you were a kid? And you would probably take online quizzes about what your patronus was. Now you're in college and English was always your best subject so you've decided to be a Literature major. How's it going? Does Shakespeare finally make sense?"
    },
    {
        major: "Film Major",
        desc: "So you became a seasoned professional with iMovie and decided to try something more complex? Now you've got yourself into quite a pickle. Are you ever gonna get anywhere in the film industry? Do you have a chance? Do you at least have a backup major? But I'm sure you hear enough of that at Thanksgiving dinner."
    },
    {
        major: "Art History Major",
        desc: "So you love old boring art that no one has ever heard of? You must be fun at parties. Does anyone else know of that one niche artist from the Byzantine empire? I know you sure do. Yes please take me to the Art History of the bookstore with you, that sounds so interesting!"
    },
    {
        major: "Computer Science Major",
        desc: "Oh so you like video games and you think you're really smart? Is it worth it for those smelly classrooms? How about you step more than three feet away from your screen and please go outside."
    },
    {
        major: "Music Major",
        desc: "So have you finished any of those fourteen experimental electronica projects sitting in your GarageBand? Or were you just a band kid who dreamt too big?"
    },
    {
        major: "Biology Major",
        desc: "I'm not even gonna ask if you wanna go out tonight because I know you have too much studying to do."
    },
]

// Shortcuts

var results = $("#results-screen");
var quiz = $("#questions-screen");
var printResult = $("#top-score");
var printDesc = $("#score-desc");
var quizButton = $(".quiz-button");
var characterImage = $("#character-image");

/* var results = document.getElementById("results");
var quiz = document.getElementById("questions-screen");
var body = document.body.style;
var printResult = document.getElementById("topScore");
var buttonElement = document.getElementById("quiz-button"); */

// Functions

quizButton.on("click", changeState); //Add click event listener to main button

// Progresses the user through the quiz

function changeState() {								
    
    updatePersonality(); 	//Adds the values of the tempStats to the userStats										
    try {
        if (quizActive) {
            initText(questionState);
            questionState++;
        } else {
            setResults();
        }
    } catch (error) {
        handleException(error);
    }
}

// Determines the question and answer content based on user progress through the quiz

function initText(question) {							
    
    var answerSelection = ""; //text variable containting HTML code for the radio buttons' content
    
    /* Creates radio buttons based on user progress through the quiz - current 'id' generation is not w3c compliant*/
    try {
        for (i = 0; i < answerArray[question].length; i++) {		
            answerSelection += `<li><button class='quiz-button' onClick='setAnswer(${i})' id='${answerArray[question][i]}' class='choices'>${answerArray[question][i]}</button></li>`;
        };
    } catch (error) {
        handleException(error);
    }
    
    $("#questions").html(questionArray[question]); // set question text
    $("#answers").html(answerSelection); // set answer text

    // Apply event handlers only to the buttons within the answers container
    $("#answers button").each(function () {
        handleMouseEvents($(this), "buttonHover", "buttonClick");
    });
}

/* This function is called when a user selects an answer, NOT when answer is submitted */

function setAnswer(input) {
    try {
        for (let i = 0; i < tempStats.length; i++) {
            tempStats[i] += answerValues[questionState - 1][input][i];
        }	//selects personality values based on user selection 

        console.log(tempStats); // debug

        if (questionState < questionArray.length) {
            changeState();
        } else {
            // All questions answered - QUESTION TIME IS OVER!
            quizActive = false;
            changeState();
        }
    } catch (error) {
        handleException(error);
    }
}

// Adds the values of the tempStats to the userStats based on user selection

function updatePersonality() {
    try {
        for (i = 0; i < userStats.length ; i++) {
            userStats[i] += tempStats[i];
        }
    } catch (error) {
        handleException(error);
    }
}

// Determines the highest personality value

function setResults() {
    try {
        var highestStatPosition = 0; //highest stat defaults as Literature Major

         /* This statement loops through all personality stats and updates highestStatPosition based on a highest stat */
        for (var i = 1; i < userStats.length; i++) {
            if (userStats[i] > userStats[highestStatPosition]) {
                highestStatPosition = i;
            }
        }

        /* Hides the quiz content, shows results content */
        loadingScreen();
        quiz.addClass("hide");

        displayResults(highestStatPosition); //passes the index value of the highest stat discovered
    } catch (error) {
        handleException(error);
    }
}

function displayResults(personality) {
    try {
        setTimeout(function () {
            results.removeClass("hide");
            playSound(RESULT_SOUND);
        }, 800)
        switch (personality) {
            case 0:	// Literature Major
                printResult.text(`You are a ${resultArray[0].major}!`);
                characterImage.attr("src", "./img/lit-asset.png").css({ // Individual sizing bc they're all sort of different sizes >.>
                    width: "20%",
                });
                printDesc.text(`${resultArray[0].desc}`);
                break;
                
            case 1:	// Film Major
                printResult.text(`You are a ${resultArray[1].major}!`);
                characterImage.attr("src", "./img/film-asset.png").css({ // Individual sizing bc they're all sort of different sizes >.>
                    width: "17.5%",
                });
                printDesc.text(`${resultArray[1].desc}`);
                break;
                
            case 2:	// Art History Major
                printResult.text(`You are an ${resultArray[2].major}!`);
                printDesc.text(`${resultArray[2].desc}`);
                break;
                
            case 3:	// Computer Science Major
                printResult.text(`You are a ${resultArray[3].major}!`);
                characterImage.attr("src", "./img/compSci-asset.png").css({ // Individual sizing bc they're all sort of different sizes >.>
                    width: "30%",
                });
                printDesc.text(`${resultArray[3].desc}`);
                break;
                
            case 4:	// Music Major
                printResult.text(`You are a ${resultArray[4].major}!`);
                characterImage.attr("src", "./img/music-asset.png").css({ // Individual sizing bc they're all sort of different sizes >.>
                    width: "27.5%",
                });
                printDesc.text(`${resultArray[4].desc}`);
                break;
                
            case 5:	// Biology Major
                printResult.text(`You are a ${resultArray[5].major}!`);
                printDesc.text(`${resultArray[5].desc}`);
                break;
                
            default: 
                console.log("Bleh");
        }
    } catch (error) {
        handleException(error);
    }
    
}

function handleException(error) {
    console.error("An error occurred:", error.message);
}

// Loading Screen

const loadingScreen = function () {
    // Simulate loading delay (replace this with your actual loading logic)
    $("#loading-screen").fadeIn("slow");
    setTimeout(function () {
        // Hide the loading screen when the loading is complete
        $("#loading-screen").fadeOut("slow");
    }, 750); // Replace 500 with the desired delay in milliseconds
}

// Call the loading screen function when the document is ready
$(document).ready(loadingScreen);

// Reusable function for handling mouse events
// From ChatGPT (Simplified the code I made for both button and icons)
function handleMouseEvents(element, hoverClass, clickClass) {
    // Change appearance on mouse enter
    element.on("mouseenter", function () {
        $(this).addClass(hoverClass);
    });

    // Revert on mouse leave
    element.on("mouseleave", function () {
        $(this).removeClass(hoverClass);
    });

    // Change appearance on mouse click
    element.on("mousedown", function () {
        try {
            playSound(CLICK_SOUND);
        } catch(error) {
            handleException(error);
        }
        
        $(this).addClass(clickClass);

        // Bind mouseup to the document to handle cases where the mouse is released outside the button
        $(document).on("mouseup", function () {
            element.removeClass(clickClass);
            // Unbind the mouseup event after it's been triggered once
            $(document).off("mouseup");
        });
    });
}

// Apply the function to buttons
handleMouseEvents($("button"), "buttonHover", "buttonClick");

// Apply the function to icons
handleMouseEvents($(".icon"), "iconHover", "iconClick");

// Tutorial

$("#tutorial-button").click(function () {
    $("#tutorial-screen").removeClass("hide");
});

$("#tutorial-exit").click(function () {
    $("#tutorial-screen").addClass("hide");
});

// Play

$("#play").click(function () {
    // Show loading screen
    loadingScreen();
    setTimeout(function () {
        $("#questions-screen").removeClass("hide");
        $("#landing-page").addClass("hide");
        changeState();
    }, 700)
});

$("#setting-icon").hide()

// Menu

$("#menu-icon").click(function () {
    $("#setting-icon").fadeToggle("slow");
});

// Sound effects

// Define sound file paths as constants
const CLICK_SOUND = 'sounds/click.mp3';
const RESULT_SOUND = 'sounds/result.mp3';

// Function to play a sound
function playSound(soundFile) {
    var sound = new Howl({
        src: [soundFile],
        volume: 1
    });

    sound.play();
}

// Particle effects for the background
particlesJS('particles-js', {
    "particles": {
        "number": {
          "value": 260,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 3.5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 4,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble"
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 250,
            "size": 0,
            "duration": 2,
            "opacity": 0,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
});