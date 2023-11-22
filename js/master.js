/*
master.js - 
Author(s): Kevin Hong, add your name here...
Date: 22 November, 2023
*/

// Button CSS

// Change the button's appearance when the mouse enters it
$("#play").mouseenter(function () {
    $(this).addClass("buttonHover");
});

// Reverts it back once mouse exits
$("#play").mouseleave(function () {
    $(this).removeClass("buttonHover");
});

// Change the button's appearance when the mouse button is clicked downed on it
$("#play").mousedown(function () {
    $(this).addClass("buttonClick");

    // Bind mouseup to the document to handle cases where the mouse is released outside the button
    // From ChatGPT
    $(document).mouseup(function () {
        $("#play").removeClass("buttonClick");
        // Unbind the mouseup event after it's been triggered once
        $(document).off("mouseup");
    });
});