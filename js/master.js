/*
master.js - Creating a personality quiz using arrays, JS libraries, and a bunch of other stuff
Author(s): Kevin Hong, Jess Brass, Juliet Montel, Michelle Wang
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
    0, 	// Biology Major
    0   // Psychology Major
];

var tempStats = userStats; //Holds stat increases relating to user selection

// Array for questions
var questionArray =	[															
    "1. What's your favorite color from a rainbow?", 	// q1
    "2. What's your star sign?", // q2
    "3. What's your favorite season?", // q3
    "4. What's your hobby?", // q4
    "5. How do you like your coffee?", // q5
    "6. What's your favorite type of bagel?", // q6
    "7. What's your preferred method of to-do list?", //q7
    "8. Do you prefer to read a book or watch a movie?", //q8
    "9. When you're assigned a long-term project, do you start right away or wait?", //q9
    "10. What is your best memory from your childhood?", //q10
    "11. Are you a morning person or a night owl?", //q11
    "12. Are you organized or do you prefer a more flexible approach?" //q12
];

// Array for answers
var answerArray = [ 
    [ // q1 answers
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "violet"
    ],
    [ // q2 answers
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
    [ // q3 answers
        "Spring",
        "Summer",
        "Autumn",
        "Winter"
    ],
    [ // q4 answers
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
    [ // q5 answers
        "black, iced",
        "black, hot",
        "milky, iced",
        "milky, hot",
    ],
    [ // q6 answers
        "plain",
        "onion",
        "asiago",
        "sesame",
        "jalapeño",
        "blueberry",
        "chocolate",
        "poppyseed",
        "whole wheat",
        "pumpernickel",
        "cinnamon raisin",
        "everything"
    ],
    [ //q7 answers
        "physical planner",
        "wall calendar",
        "sticky notes",
        "virtual planner",
        "bullet journal",
        "the notes app",
        "my brain",
        "all of the above"
    ],
    [ //q8 answers
        "read a book",
        "watch a movie"
    ],
    [ //q9 answers
        "start right away",
        "wait until deadline"
    ],
    [ //q10 answers
        "family vacations",
        "birthday celebrations",
        "field trips",
        "playing with friends",
        "special holidays",
        "learning new skills",
        "family gatherings",
        "camping adventures"
    ],
    [ //q11 answers
        "morning person",
        "night owl"
    ],
    [ //q12 answers
        "highly organized",
        "moderately organized",
        "balanced",
        "somewhat flexible",
        "highly flexible"
    ]
]

// Array of stat increments for each answer for every question
// Literature | Film | Art History | CompSci | Music | Biology | Psychology
// Template model to copy + paste: [ 0, 0, 0, 0, 0, 0, 0 ]
var answerValues = [ 
    [ // q1 values
        [ 0, 1, 3, 0, 1, 0, 0 ], // red
        [ 3, 2, 0, 0, 0, 1, 0 ], // orange
        [ 2, 3, 1, 0, 2, 0, 0 ], // yellow
        [ 0, 0, 0, 0, 0, 3, 3 ], // green
        [ 1, 0, 2, 3, 0, 2, 2 ], // blue
        [ 0, 2, 0, 0, 3, 0, 0 ] // violet
    ],
    [ // q2 values
        [ 1, 0, 0, 1, 0, 2, 0 ], // Capricorn
        [ 0, 1, 1, 3, 0, 0, 2 ], // Aquarius
        [ 0, 0, 2, 0, 3, 1, 0 ], // Pisces
        [ 0, 3, 0, 2, 0, 0, 0 ], // Aries
        [ 0, 0, 3, 0, 1, 2, 0 ], // Taurus
        [ 3, 1, 0, 3, 2, 0, 1 ], // Gemini
        [ 2, 0, 2, 0, 0, 3, 3 ], // Cancer
        [ 1, 3, 1, 0, 3, 0, 0 ], // Leo
        [ 0, 0, 0, 2, 0, 3, 2 ], // Virgo
        [ 2, 2, 3, 0, 2, 0, 0 ], // Libra
        [ 0, 0, 0, 0, 0, 1, 3 ], // Scorpio
        [ 3, 2, 0, 1, 1, 0, 1 ] // Sagittarius
    ],
    [ // q3 values
        [ 1, 3, 2, 1, 2, 3, 1 ], // Spring
        [ 0, 2, 0, 0, 3, 2, 0 ], // Summer
        [ 3, 1, 3, 2, 1, 1, 2 ], // Autumn
        [ 2, 0, 1, 3, 0, 0, 3 ] // Winter
    ],
    [ // q4 values
        [ 1, 3, 3, 1, 0, 1, 1 ], // photography
        [ 0, 0, 0, 0, 0, 3, 0 ], // gardening
        [ 2, 1, 1, 2, 1, 1, 1 ], // cooking
        [ 3, 2, 1, 1, 2, 1, 3 ], // reading/writing
        [ 0, 1, 0, 3, 1, 0, 0 ], // gaming
        [ 0, 0, 0, 0, 3, 0, 2 ], // singing
        [ 0, 0, 2, 0, 0, 0, 2 ], // dancing
        [ 1, 0, 1, 1, 2, 0, 0 ], // listening to music
        [ 2, 2, 2, 2, 1, 0, 1 ], // drawing/painting
        [ 0, 0, 0, 0, 0, 2, 0 ], // fishing
        [ 1, 1, 0, 0, 0, 2, 0 ], // hiking
        [ 0, 0, 0, 0, 0, 0, 0 ] // sports
    ],
    [ // q5 values
        [ 3, 1, 0, 0, 0, 2, 1 ], // black, iced
        [ 1, 2, 0, 0, 0, 3, 2 ], // black, hot
        [ 0, 0, 2, 1, 3, 0, 0 ], // milky, iced
        [ 0, 0, 3, 2, 1, 0, 1 ], // milky, hot
    ],
    [ // q6 values
        [ 0, 1, 0, 3, 1, 2, 0 ], // "plain",
        [ 1, 2, 0, 1, 0, 1, 1 ], // "onion",
        [ 0, 1, 3, 0, 0, 1, 0 ], // "asiago",
        [ 3, 0, 1, 2, 1, 2, 0 ], // "sesame",
        [ 0, 2, 0, 0, 0, 0, 2 ], // "jalapeño",
        [ 0, 0, 1, 0, 3, 0, 2 ], // "blueberry",
        [ 0, 0, 0, 0, 1, 0, 0 ], // "chocolate",
        [ 2, 1, 2, 1, 0, 1, 1 ], // "poppyseed",
        [ 2, 0, 0, 1, 0, 0, 0 ], // "whole wheat",
        [ 1, 0, 2, 0, 0, 0, 0 ], // "pumpernickel",
        [ 1, 0, 1, 0, 2, 0, 3 ], // "cinnamon raisin",
        [ 0, 3, 0, 2, 2, 3, 1 ], // "everything"
    ],
    [ //q7 values
        [ 1, 0, 2, 0, 1, 3, 0 ], // physical planner,
        [ 2, 0, 3, 0, 1, 0, 2 ], // calendar on the wall,
        [ 2, 3, 0, 0, 1, 0, 2 ], // sticky notes,
        [ 0, 2, 0, 3, 1, 1, 0 ], // virtual planner/calendar,
        [ 3, 1, 2, 0, 0, 0, 2 ], // bullet journal,
        [ 2, 3, 0, 0, 1, 0, 2 ], // the notes app,
        [ 0, 1, 0, 3, 0, 0, 2 ], // my brain,
        [ 0, 2, 0, 0, 0, 1, 3 ] // all of the above

    ],
    [ //q8 values 
        [ 2, 0, 0, 0, 0, 2, 2 ], // read a book
        [ 0, 2, 2, 2, 2, 0, 0 ], // watch a movie
    ],
    [ //q9 values
        [ 2, 0, 2, 0, 0, 2, 2 ], // start right away
        [ 0, 2, 0, 2, 2, 0, 0 ], // wait until deadline
    ],
    [ //q10 values
        [ 3, 1, 0, 0, 0, 0, 0 ], // family vacations,
        [ 0, 0, 2, 1, 3, 0, 2 ], // birthday celebrations,
        [ 0, 2, 1, 0, 0, 3, 0 ], // field trips,
        [ 1, 3, 0, 2, 0, 1, 0 ], // playing with friends,
        [ 1, 1, 3, 0, 1, 0, 1 ], // special holidays,
        [ 0, 0, 0, 3, 1, 1, 1 ], // learning new skills,
        [ 0, 0, 1, 0, 2, 0, 3 ], // family gatherings,
        [ 2, 0, 0, 1, 0, 2, 0 ] // camping adventures
    ],
    [ //q11 values
        [ 2, 0, 0, 0, 0, 2, 0 ], // morning person,
        [ 0, 2, 1, 1, 1, 0, 2 ] // night owl
    ],
    [ //q12 values
        [ 2, 0, 0, 0, 0, 3, 0 ], // highly organized,
        [ 3, 0, 3, 0, 1, 2, 3 ], // moderately organized,
        [ 1, 3, 0, 1, 0, 1, 1 ], // balanced mix of both,
        [ 0, 1, 2, 2, 3, 0, 2 ], // somewhat flexible,
        [ 0, 2, 1, 3, 2, 0, 0 ] // highly flexible
    ],
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
        desc: "So you love old boring art that no one has ever heard of? You must be fun at parties. Does anyone else know of that one niche artist from the Byzantine empire? I know you sure do. Yes please take me to the Art History section of the bookstore with you, that sounds so interesting!"
    },
    {
        major: "Computer Science Major",
        desc: "Oh so you like video games and you think you're really smart? Is it worth it for those smelly classrooms? How about you step more than three feet away from your screen and please go outside."
    },
    {
        major: "Music Major",
        desc: "So have you finished any of those fourteen experimental electronica projects sitting in your GarageBand? Or maybe you were that kid who wrote BAND IS LIFE on their wrist after picking up the trumpet in middle school and it just really stuck. Then you got to high school and once you posted you got a few streams on Soundcloud you decided it was time to reach for the stars. "
    },
    {
        major: "Biology Major",
        desc: "I'm not even gonna ask if you wanna go out tonight because I know you have too much studying to do. Did you just have a really good biology teacher in high school or something?"
    },
    {
        major: "Psychology Major",
        desc: "“Yeah I just think the human brain is just so dark and twisted.” -you probably. You've probably been going to therapy for a while, got a couple diagnoses under your belt and decided your life path had paved its way. Are you still the therapist friend or have you recovered from that phase? "
    },
]

// Shortcuts

var results = $("#results-screen");
var quiz = $("#questions-screen");
var printResult = $("#top-score");
var printDesc = $("#score-desc");
// var quizButton = $(".quiz-button");
var characterImage = $("#character-image");

/* var results = document.getElementById("results");
var quiz = document.getElementById("questions-screen");
var body = document.body.style;
var printResult = document.getElementById("topScore");
var buttonElement = document.getElementById("quiz-button"); */

// Functions

/* Scraped code because I don't think it does anything.
try {
    quizButton.on("click", changeState); //Add click event listener to main button
} catch (error) {
    handleException(error);
*/


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
        console.log(userStats);

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
        tempStats = [0, 0, 0, 0, 0, 0, 0]; // Initialize a stat reset for temporary stats after appending new information to user stats
    } catch (error) {
        handleException(error);
    }
}

// Determines the highest personality value

function setResults() {
    try {
        var highestStatPosition = 0; //highest stat defaults as Literature Major
        var sortedStats = []; // Array to store the sorted stats

         /* This statement loops through all personality stats and updates highestStatPosition based on a highest stat */
        for (var i = 1; i < userStats.length; i++) {
            if (userStats[i] > userStats[highestStatPosition]) {
                highestStatPosition = i;
            }
        }

        // Populate sortedStats array with original index and value
        for (var i = 0; i < userStats.length; i++) {
            sortedStats.push({ index: i, value: userStats[i] });
        }

        // Sort the stats array in descending order based on values
        sortedStats.sort(function (a, b) {
            return b.value - a.value;
        });

        console.log("Sorted ", sortedStats);
        /* Hides the quiz content, shows results content */
        loadingScreen();
        quiz.addClass("hide");

        displayResults(highestStatPosition); //passes the index value of the highest stat discovered

        // Update percentBars in descending order
        for (var i = 1; i < 5; i++) {
            var percentage = (sortedStats[i].value / userStats[highestStatPosition]) * 100;

            // Check if the percentage is 100 and set it to 90%
            if (percentage === 100) {
                percentage = 90;
            }
            
            move("percentBar" + (i + 1), percentage);
            $("#percentBar" + (i + 1)).html(percentage.toFixed(1) + "%");
            console.log("percentBar" + (i + 1), percentage);

            // Get the major name from resultArray using the index from sortedStats
            var majorIndex = sortedStats[i].index;
            var majorName = resultArray[majorIndex].major;

            // Update the corresponding span element with the major name
            $("#percentMajor" + (i + 1)).html(majorName);
        }
    } catch (error) {
        handleException(error);
    }
}

function displayResults(personality) {
    try {
        console.log(tempStats);
        console.log(userStats);
        setTimeout(function () {
            results.removeClass("hide");
            playSound(RESULT_SOUND);
        }, 800)
        switch (personality) {
            case 0:	// Literature Major
                printResult.text(`You are a ${resultArray[0].major}!`);
                characterImage.attr("src", "./img/lit-asset.png").css({ // Individual sizing bc they're all sort of different sizes >.>
                    "width": "22.5%",
                    "margin-right": "7.5%"
                });
                printDesc.text(`${resultArray[0].desc}`);
                break;
                
            case 1:	// Film Major
                printResult.text(`You are a ${resultArray[1].major}!`);
                characterImage.attr("src", "./img/film-asset.png").css({ // Individual sizing bc they're all sort of different sizes >.>
                    "width": "18.5%",
                    "margin-right": "7.5%"
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
                    "width": "30%",
                    "margin-right": "2.5%"
                });
                printDesc.text(`${resultArray[3].desc}`);
                break;
                
            case 4:	// Music Major
                printResult.text(`You are a ${resultArray[4].major}!`);
                characterImage.attr("src", "./img/music-asset.png").css({ // Individual sizing bc they're all sort of different sizes >.>
                    "width": "27.5%",
                    "margin-right": "5%"
                });
                printDesc.text(`${resultArray[4].desc}`);
                break;
                
            case 5:	// Biology Major
                printResult.text(`You are a ${resultArray[5].major}!`);
                printDesc.text(`${resultArray[5].desc}`);
                break;
            
            case 6: // Psychology Major
                printResult.text(`You are a ${resultArray[6].major}!`);
                printDesc.text(`${resultArray[6].desc}`);
                break;

            default: 
                console.log("Bleh");
        }
    } catch (error) {
        handleException(error);
    }
    
}

// Percentage Bars
function move(barId, widthValue) {
    var i = 0;
    var elem = $("#" + barId); // Dynamically select the element by ID
    if (i == 0) {
        i = 1;
        var width = 1;
        var id = setInterval(frame, 25);
        function frame() {
            if (width >= widthValue) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.css("width", width + "%"); // Update the width using jQuery
            }
        }
    }
}

// Function for handling errors

function handleException(error, additionalInfo) {
    console.error("An error occurred:", error.message, error);
    console.error("Additional information:", additionalInfo);
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
try {
    $(document).ready(loadingScreen);
} catch (error) {
    handleException(error);
}

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
        console.log(tempStats);
        console.log(userStats);
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