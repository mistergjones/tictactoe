
// 1. create master variables
var gameGridArray = ["-","-","-","-","-","-","-","-","-"];
var drawMessage = "It was a draw!";
var playerOneWinMessage = "Player 1 won!";
var playerTwoWinMessage = "Player 2 won!";
counter = 0;

// string to compare who the winner is
var answerX = 'XXX';
var answer0 = '000';

var arrayInsertIdxPosition = null;

// var btnZero = document.querySelector('#zero');
// var btnOne = document.querySelector('#one');
// var btnTwo = document.querySelector('#two');
// var btnThree = document.querySelector('#three');
// var btnFour = document.querySelector('#four');
// var btnFive = document.querySelector('#five');
// var btnSix = document.querySelector('#six');
// var btnSeven = document.querySelector('#seven');
// var btnEight = document.querySelector('#eight');
var boxElements = document.querySelectorAll('.button');



// 2. obtain all elements in the html page
//var boxElements = document.querySelectorAll("div");
var player1 = document.querySelector(".player1");
var player2 = document.querySelector(".player2");
var winOrDrawMessage = document.querySelector(".winOrDrawMessage");
var resetButton = document.querySelector(".reset-btn");

// 3. set the UI starting conditions
player1.style.backgroundColor = "lightgreen";
resetButton.disabled = false;
//resetButton.style.visibility = "hidden";

// 4. Declare the functions used

var handleClick = function (event) {

    //event.target.style.backgroundColor = 'red';
    event.target.classList.toggle('red');
    event.target.disabled = true;
    
    // work out how to update the master grid array with the values
    var arrayInsertIdxPosition = Number(event.target.getAttribute("data-ArrayIdx"));
    //gameGridArray[arrayInsertIdxPosition] = event.target.textContent = "X";

    // determine if its player 1 turn.
    var playerOneTurn = isPlayerOneTurn();
    if (playerOneTurn ==true) {
        var charToInsert = event.target.textContent = "X";
        player1.style.backgroundColor = "white";
        player2.style.backgroundColor = "lightgreen";

    } else {
        var charToInsert = event.target.textContent = "0"
        player2.style.backgroundColor = "white";
        player1.style.backgroundColor = "lightgreen";
    }
    
    // call the below function to update the master array in where the player has inputted their choice
    updateGameGridArray(arrayInsertIdxPosition, charToInsert)

    // if items clicked to RED is the same as # of elements. i.e 9...it means it was a draw.
    // Then make the board all green.
    if ((document.querySelectorAll('.red').length) === boxElements.length) {
        for (var i = 0; i < boxElements.length; i++) {
            boxElements[i].classList.toggle("green");

            // display the DRAW message. Disable the event listener preventing the user from changing board game
            winOrDrawMessage.textContent = drawMessage;
            removeBoxElementsEventListener();
        }
    } else {
        //event.target.classList.toggle('red');
        console.log("it does not work")
    }

    // call the below function to slice/determine the game grid array into its various winning combinations
    populateDecisionArrays();
}

var updateGameGridArray = function(arrayInsertIdxPosition, charToInsert) {
    // insert in the array the index position and the players character (X or 0)
    gameGridArray[arrayInsertIdxPosition] = charToInsert;
    return;
}

var isPlayerOneTurn = function() {
    counter = counter +1;
    
    if (counter % 2 === 0) {
        return false;
    } else {
        return true;
    }
}

// This function is to slice the game grid array into its various game winning combinations upon
// each time a player inputs their X or 0.
// It will then check each combination to determine a winner.
var populateDecisionArrays = function() {

    // require 8 by 3 rows for all combinations to check
    tempc1 = null;
    tempc2 = null;
    tempc3 = null;
    tempd1 = null;
    tempd2 = null;

    // array methods to populate the row combinations and convert to strings.
    tempRow1 = gameGridArray.slice(0,3).join("");
    tempRow2 = gameGridArray.slice(3,6).join("");
    tempRow3 = gameGridArray.slice(6,9).join("");


    // obtain columns via array indexes so we can check these strings to the winnner answers
    tempc1 = gameGridArray[0]+gameGridArray[3]+gameGridArray[6];
    tempc2 = gameGridArray[1]+gameGridArray[4]+gameGridArray[7];
    tempc3 = gameGridArray[2]+gameGridArray[5]+gameGridArray[8];
    
    // obtain diagonal via array indexes so we can check these strings to the winnner answers
    tempd1 = gameGridArray[0]+gameGridArray[4]+gameGridArray[8];
    tempd2 = gameGridArray[2]+gameGridArray[4]+gameGridArray[6];
    
    // now check each combination to determine if there is a winner
    checkWin(tempRow1);
    checkWin(tempRow2);
    checkWin(tempRow3);
    checkWin(tempc1);
    checkWin(tempc2);
    checkWin(tempc3);
    checkWin(tempd1);
    checkWin(tempd2);

}

// this function disables the handleClick event listener when player 1, 2 or a draw occurs.
// This prevenets the user from making more changes on the game.
var removeBoxElementsEventListener = function () {

    for (var i = 0; i < boxElements.length; i++) {
        boxElements[i].removeEventListener('click', handleClick, false);
    }
}


// This function checks the combination and if there is a winner, will also then call and disable the 
// handle click event listener
var checkWin = function (potentialWinner) {

    // if player 1 is the winner
    if (potentialWinner === answerX) {
        // display player 1 win message
        winOrDrawMessage.textContent = playerOneWinMessage;
        // disable the handleClick event listener prevening a person in making further gameboard changes
        removeBoxElementsEventListener();

    } else if (potentialWinner === answer0) {
        // display player 2 win message
        winOrDrawMessage.textContent = playerTwoWinMessage;
        // disable the handleClick event listener prevening a person in making further gameboard changes
        removeBoxElementsEventListener();

    }
}


var handleResetGame = function (event) {
    //reset the array to blanks
    gameGridArray = ["-","-","-","-","-","-","-","-","-"];

    // reset the handleclick event listener and all UI elements
    for (var i = 0; i < boxElements.length; i++) {
        boxElements[i].textContent ="-"
        //boxElements[i].style.backgroundColor = "lightgrey";
        boxElements[i].disabled = false;
        boxElements[i].classList.remove('red');
        boxElements[i].classList.remove('green');
        boxElements[i].addEventListener('click', handleClick);
    }
    // reset the main counter and reset message to blank       
    counter = 0;
    winOrDrawMessage.textContent = "";
    player1.style.backgroundColor = "lightgreen";
    player2.style.backgroundColor = "white";

}

//add an event click listener for all div elements on the game board
for (var i = 0; i < boxElements.length; i++) {
    boxElements[i].addEventListener('click', handleClick);

}

// add an eveny click listens to reset the game if player wins or a draw
resetButton.addEventListener('click', handleResetGame);
