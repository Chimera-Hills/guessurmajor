/*
master.js - Creating a personality quiz using arrays, JS libraries, and a bunch of other stuff
Author(s): Kevin Hong, Jess Brass, Juliet Montel, Michelle Wang
Date: 22 November, 2023
*/

// Borrowed some template code for personality test from https://codepen.io/paigeellenstark/pen/MVGYWO?editors=0010

// Constants and variables

// Define sound file paths as constants
const CLICK_SOUND = 'sounds/click.mp3';
const RESULT_SOUND = 'sounds/result.mp3';

let questionState = 0;	// Keeps track of user's place in quiz
let quizActive = true;	// True until last question is answered

let userStats =	[
    0,	// Literature Major
    0, 	// Film Major
    0, 	// Art History Major 
    0, 	// CompSci Major
    0, 	// Music Major 
    0, 	// Biology Major
    0   // Psychology Major
];

let tempStats = userStats; // Holds stat increases relating to user selection

// Shortcuts

const results = $("#results-screen");
const quiz = $("#questions-screen");
const printResult = $("#top-score");
const printDesc = $("#score-desc");
const characterImage = $("#character-image");

// Array for questions
const questionArray =	[															
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
const answerArray = [ 
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
        "blueberry",
        "onion",
        "poppyseed",
        "garlic",
        "sesame",
        "chocolate",
        "sourdough"
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
const answerValues = [ 
    [ // q1 values
        [ 0, 0, 3, 2, 1, 0, 0 ], // red
        [ 3, 2, 1, 0, 0, 0, 0 ], // orange
        [ 2, 3, 0, 0, 0, 1, 1 ], // yellow
        [ 0, 0, 0, 1, 2, 3, 2 ], // green
        [ 1, 0, 0, 3, 0, 2, 0 ], // blue
        [ 0, 1, 2, 0, 3, 0, 2 ] // violet
    ],
    [ // q2 values
        [ 2, 3, 0, 1, 0, 0, 0 ], // Capricorn
        [ 0, 1, 2, 0, 2, 0, 3 ], // Aquarius
        [ 0, 2, 3, 0, 1, 0, 1 ], // Pisces
        [ 3, 2, 0, 0, 1, 0, 0 ], // Aries
        [ 0, 1, 0, 2, 0, 3, 0 ], // Taurus
        [ 2, 0, 1, 0, 3, 0, 2 ], // Gemini
        [ 3, 0, 2, 0, 1, 0, 2 ], // Cancer
        [ 1, 3, 0, 0, 2, 0, 0 ], // Leo
        [ 0, 0, 0, 3, 1, 2, 1 ], // Virgo
        [ 3, 0, 1, 0, 2, 0, 2 ], // Libra
        [ 2, 0, 3, 0, 0, 1, 1 ], // Scorpio
        [ 1, 2, 0, 0, 0, 3, 0 ] // Sagittarius
    ],
    [ // q3 values
        [ 0, 3, 2, 0, 1, 0, 1 ], // Spring
        [ 0, 0, 3, 0, 2, 1, 0 ], // Summer
        [ 3, 1, 2, 0, 0, 0, 2 ], // Autumn
        [ 0, 1, 0, 3, 0, 2, 3] // Winter
    ],
    [ // q4 values
        [ 0, 3, 2, 0, 0, 1, 0 ], // photography
        [ 2, 0, 1, 0, 0, 3, 2 ], // gardening
        [ 1, 2, 0, 0, 0, 3, 1 ], // cooking
        [ 3, 0, 0, 0, 2, 1, 2 ], // reading/writing
        [ 0, 0, 0, 3, 1, 2, 0 ], // gaming
        [ 2, 0, 1, 0, 3, 0, 1 ], // singing
        [ 0, 1, 2, 0, 3, 0, 2 ], // dancing
        [ 0, 0, 0, 2, 3, 1, 1 ], // listening to music
        [ 1, 0, 3, 0, 2, 0, 1 ], // drawing/painting
        [ 0, 2, 0, 0, 1, 3, 0 ], // fishing
        [ 0, 3, 1, 0, 0, 2, 2 ], // hiking
        [ 0, 2, 0, 0, 1, 0, 3 ] // sports
    ],
    [ // q5 values
        [ 3, 1, 0, 0, 0, 2, 1 ], // black, iced
        [ 1, 2, 0, 0, 0, 3, 2 ], // black, hot
        [ 0, 0, 2, 1, 3, 0, 0 ], // milky, iced
        [ 0, 0, 3, 2, 1, 0, 1 ], // milky, hot
    ],
    [ // q6 values
        [ 3, 0, 2, 0, 0, 1, 0 ], // plain
        [ 0, 0, 3, 1, 2, 0, 1 ], // blueberry
        [ 2, 3, 0, 0, 0, 1, 0 ], // onion
        [ 0, 0, 2, 1, 3, 0, 2 ], // poppyseed
        [ 0, 2, 0, 3, 1, 0, 1 ], // garlic
        [ 0, 0, 1, 0, 2, 3, 2 ], // sesame
        [ 1, 0, 0, 3, 0, 2, 0 ], // chocolate chip
        [ 0, 1, 3, 2, 0, 0, 1 ] // sourdough
    ],
    [ //q7 values
        [ 1, 0, 2, 0, 1, 3, 0 ], // physical planner
        [ 2, 0, 3, 0, 1, 0, 2 ], // calendar on the wall
        [ 2, 3, 0, 0, 1, 0, 2 ], // sticky notes
        [ 0, 2, 0, 3, 1, 1, 0 ], // virtual planner/calendar
        [ 3, 1, 2, 0, 0, 0, 2 ], // bullet journal
        [ 2, 3, 0, 0, 1, 0, 2 ], // the notes app
        [ 0, 1, 0, 3, 0, 0, 2 ], // my brain
        [ 0, 2, 0, 0, 0, 1, 3 ] // all of the above

    ],
    [ //q8 values 
        [ 3, 0, 2, 0, 1, 3, 3 ], // read a book
        [ 0, 3, 1, 3, 2, 0, 0 ], // watch a movie
    ],
    [ //q9 values
        [ 3, 2, 3, 0, 1, 0, 2 ], // start right away
        [ 0, 1, 0, 3, 2, 3, 1 ], // wait until deadline
    ],
    [ //q10 values
        [ 0, 3, 2, 0, 1, 1, 0 ], // family vacations
        [ 2, 0, 0, 2, 3, 0, 0 ], // birthday celebrations
        [ 0, 1, 3, 1, 2, 3, 1 ], // field trips
        [ 1, 0, 0, 3, 2, 0, 1 ], // playing with friends
        [ 1, 0, 1, 0, 3, 0, 1 ], // special holidays
        [ 3, 2, 0, 2, 1, 2, 0 ], // learning new skills
        [ 2, 0, 1, 0, 3, 0, 3 ], // family gatherings
        [ 0, 3, 0, 0, 0, 3, 2 ] // camping adventures
    ],
    [ //q11 values
        [ 3, 2, 3, 0, 0, 0, 3 ], // morning person
        [ 0, 1, 0, 3, 3, 3, 0 ] // night owl
    ],
    [ //q12 values
        [ 3, 2, 3, 1, 0, 3, 0 ], // highly organized
        [ 2, 3, 0, 2, 0, 0, 1 ], // moderately organized
        [ 1, 2, 2, 3, 1, 1, 2 ], // balanced mix of both
        [ 0, 1, 0, 2, 2, 0, 3 ], // somewhat flexible
        [ 0, 0, 1, 1, 3, 3, 2 ] // highly flexible
    ],
]

// Array for results
const resultArray = [
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

// Functions

// Progresses the user through the quiz
function changeState() {								
    // Add the values of temporary statistics to user statistics
    updatePersonality();	

    try { // Check if the quiz is still active
        if (quizActive) {
            // If active, initialize text for the current question state
            initText(questionState);

            // Move to the next question state
            questionState++;
        } else {
            // If not active, set the results as the quiz is completed
            setResults();
        }
    } catch (error) { // Handle any exceptions that may occur during the process
        handleException(error);
    }
}

// Determines the question and answer content based on user progress through the quiz
function initText(question) {	
    // Initialize an empty string to store HTML content for answer selections						
    let answerSelection = "";
    
    try { // Iterate through the answers for the current question
        for (i = 0; i < answerArray[question].length; i++) {		
            // Concatenate HTML code for each answer button
            answerSelection += `<li><button class='quiz-button' onClick='setAnswer(${i})' id='${answerArray[question][i]}' class='choices'>${answerArray[question][i]}</button></li>`;
        };
    } catch (error) { // Handle any exceptions that may occur during the process
        handleException(error);
    }

     // Set the question text based on the current question state
    $("#questions").html(questionArray[question]);

    // Set the answer options using the concatenated HTML content
    $("#answers").html(answerSelection);

     // Apply mouse event handlers to each button within the answers container
    $("#answers button").each(function () {
        handleMouseEvents($(this), "buttonHover", "buttonClick");
    });
}

// Handles user's answer selection and quiz progression
function setAnswer(input) {
    try { // Iterate through each element in tempStats and update it based on user's answer
        for (let i = 0; i < tempStats.length; i++) {
            tempStats[i] += answerValues[questionState - 1][input][i];
        }

        // Log the current state of tempStats and accumulated userStats
        console.log(`Question ${questionState}: ${tempStats}`);
        console.log(`Accumulated: ${userStats}`);

        // Check if there are more questions remaining
        if (questionState < questionArray.length) {
            changeState(); // If yes, move to the next question state
        } else { // All questions answered - QUESTION TIME IS OVER!
            quizActive = false; // If all questions are answered, mark the quiz as not active
            changeState(); // Trigger the function to handle the end of the quiz
        }
    } catch (error) { // Handle any exceptions that may occur during the process
        handleException(error);
    }
}

// Updates the user's personality stats based on temporary stats
function updatePersonality() {
    try { // Iterate through each element in userStats and update with corresponding tempStats value
        for (let i = 0; i < userStats.length ; i++) {
            userStats[i] += tempStats[i];
        }

        // Reset tempStats to zeros after updating userStats
        tempStats = [0, 0, 0, 0, 0, 0, 0];
    } catch (error) { // Handle any exceptions that may occur during the process
        handleException(error);
    }
}

// Determines the highest personality value
function setResults() {
    try {
        let highestStatPosition = 0; // Initialize highestStatPosition as the default index for Literature Major
        let sortedStats = []; // Create an empty array to store sorted stats with index and value

        // Loop through personality stats to find the highestStatPosition
        for (let i = 1; i < userStats.length; i++) {
            if (userStats[i] > userStats[highestStatPosition]) {
                highestStatPosition = i;
            }
        }

        // Populate sortedStats array with original index and value
        for (let i = 0; i < userStats.length; i++) {
            sortedStats.push({ index: i, value: userStats[i] });
        }

        // Sort the stats array in descending order based on values
        sortedStats.sort(function (a, b) {
            return b.value - a.value;
        });

        // Display final accumulated stats and sorted stats for debugging
        console.log(`Final accumulated stats: ${userStats}`);
        console.log("Final stats sorted:", sortedStats);

        // Hide quiz content, show results content
        loadingScreen();
        quiz.addClass("hide");

        // Display results based on the highestStatPosition
        displayResults(highestStatPosition); 

        // Display specific parameters for percentages
        console.log("Specific parameters for percentages:");

        // Update percentBars in descending order
        for (let i = 1; i < 5; i++) { // Calculate percentage for the current stat
            let percentage = (sortedStats[i].value / userStats[highestStatPosition]) * 100;

            // Check if the percentage is 100 and set it to 99.9%
            if (percentage === 100) {
                percentage = 99.9;
            }
            
            // Move and update the percentBar element
            move("percentBar" + (i + 1), percentage);
            $("#percentBar" + (i + 1)).html(percentage.toFixed(1) + "%");

            // Get the major name from resultArray using the index from sortedStats
            let majorIndex = sortedStats[i].index;
            let majorName = resultArray[majorIndex].major;

            // Update the corresponding span element with the major name
            $("#percentMajor" + (i + 1)).html(majorName);
            console.log(`${majorName}: ${percentage}`); // For debugging purposes
        }
    } catch (error) { // Handle any exceptions that may occur during the process
        handleException(error);
    }
}

// Display results based on the user's personality
function displayResults(personality) {
    try { // Delayed execution to show results after a brief pause
        setTimeout(function () { 
            // Remove "hide" class from results and play result sound
            results.removeClass("hide");
            playSound(RESULT_SOUND);
        }, 800)

        // Switch statement to handle different personalities
        // Styling is done in JS for width and margin because the image assets are all in different sizes
        switch (personality) {
            case 0:	// Literature Major
                printResult.text(`You are a ${resultArray[0].major}!`);
                characterImage.attr("src", "./img/lit-asset.png").css({
                    "width": "22.5%",
                    "margin-right": "7.5%"
                });
                printDesc.text(`${resultArray[0].desc}`);
                break;
                
            case 1:	// Film Major
                printResult.text(`You are a ${resultArray[1].major}!`);
                characterImage.attr("src", "./img/film-asset.png").css({
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
                characterImage.attr("src", "./img/compSci-asset.png").css({
                    "width": "30%",
                    "margin-right": "2.5%"
                });
                printDesc.text(`${resultArray[3].desc}`);
                break;
                
            case 4:	// Music Major
                printResult.text(`You are a ${resultArray[4].major}!`);
                characterImage.attr("src", "./img/music-asset.png").css({
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

            default: // Log a message if the personality is not recognized
                console.log("Bleh");
        }
    } catch (error) { // Handle any exceptions that may occur during the process
        handleException(error);
    }
}

// Animate the progress bar by increasing width
function move(barId, widthValue) {
    // Initialize variables
    let i = 0;
    let elem = $("#" + barId); // Dynamically select the element by ID

    // Check if animation is not already in progress
    if (i == 0) {
        i = 1;
        let width = 1;
        let id = setInterval(frame, 25); // Set interval for the animation frame

        // Animation frame function
        function frame() { // Check if the width has reached the target value
            if (width >= widthValue) {
                // Stop the animation
                clearInterval(id);
                i = 0;
            } else { // Increment the width and update the element's style
                width++;
                elem.css("width", width + "%");
            }
        }
    }
}

// Error handler
function handleException(error) {
    if (error instanceof TypeError) {
        console.error("TypeError occurred:", error.message);
        // Handle TypeError-specific actions here
    } else if (error instanceof ReferenceError) {
        console.error("ReferenceError occurred:", error.message);
        // Handle ReferenceError-specific actions here
    } else if (error instanceof SyntaxError) {
        console.error("SyntaxError occurred:", error.message);
        // Handle SyntaxError-specific actions here
    } else if (error instanceof RangeError) {
        console.error("RangeError occurred:", error.message);
        // Handle RangeError-specific actions here
    } else if (error instanceof MyCustomError) {
        console.error("MyCustomError occurred:", error.message);
        // Handle MyCustomError-specific actions here
    } else {
        // Generic error handling for any other error types
        console.error("An error occurred:", error.message, error.stack, error);
    }
}

// Loading Screen
const loadingScreen = function () {
    // Simulate loading delay
    $("#loading-screen").fadeIn("slow");
    setTimeout(function () {
        // Set a timeout to hide the loading screen when the loading is complete
        $("#loading-screen").fadeOut("slow");
    }, 750); // Set timer to 750 milliseconds.
}

// Execute the loading screen function when the document is ready
try { // Use jQuery to execute the loadingScreen function when the document is ready
    $(document).ready(loadingScreen); // Call the loading screen function
} catch (error) { // Handle any exceptions that may occur during execution
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

    // Change appearance and add clicking sound on mouse click
    element.on("mousedown", function () {
        try { // Play the clicking sound whenever you click the button
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

// Show the tutorial when tutorial button is clicked
$("#tutorial-button").click(function () {
    $("#tutorial-screen").removeClass("hide");
});

// Hide the tutorial when tutorial button is clicked
$("#tutorial-exit").click(function () {
    $("#tutorial-screen").addClass("hide");
});

// Attach a click event handler to the element with the ID "play"
$("#play").click(function () {
    // Show loading screen
    loadingScreen();
    setTimeout(function () { // Set a timeout to delay the execution of the following code
        // Hide the landing page and show the questions screen
        $("#questions-screen").removeClass("hide");
        $("#landing-page").addClass("hide");

        // Change the quiz state
        changeState();

        // Display empty stat arrays for incrementing and accumulating points
        console.log(`Empty stat array to increment: ${tempStats}`);
        console.log(`Empty stat array to accumulate points into: ${userStats}`);
    }, 700)
});

$("#setting-icon").hide()

// Menu

$("#menu-icon").click(function () {
    $("#setting-icon").fadeToggle("slow");
});

// Function to play a sound
function playSound(soundFile) {
    let sound = new Howl({
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