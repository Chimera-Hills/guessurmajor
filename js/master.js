/*
master.js - 
Author(s): Kevin Hong, add your name here...
Date: 22 November, 2023
*/

// Button CSS

// Change the button's appearance when the mouse enters it
$("button").mouseenter(function () {
    $(this).addClass("buttonHover");
});

// Reverts it back once mouse exits
$("button").mouseleave(function () {
    $(this).removeClass("buttonHover");
});

// Change the button's appearance when the mouse button is clicked downed on it
$("button").mousedown(function () {
    $(this).addClass("buttonClick");

    // Bind mouseup to the document to handle cases where the mouse is released outside the button
    // From ChatGPT
    $(document).mouseup(function () {
        $("button").removeClass("buttonClick");
        // Unbind the mouseup event after it's been triggered once
        $(document).off("mouseup");
    });
});

// Menu CSS

// Change the icon's appearance when the mouse enters it
$(".icon").mouseenter(function () {
    $(this).addClass("iconHover");
});

// Reverts it back once mouse exits
$(".icon").mouseleave(function () {
    $(this).removeClass("iconHover");
});

// Change the icon's appearance when the mouse button is clicked downed on it
$(".icon").mousedown(function () {
    $(this).addClass("iconClick");

    // Bind mouseup to the document to handle cases where the mouse is released outside the button
    // From ChatGPT
    $(document).mouseup(function () {
        $(".icon").removeClass("iconClick");
        // Unbind the mouseup event after it's been triggered once
        $(document).off("mouseup");
    });
});