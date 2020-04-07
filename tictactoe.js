
// 1. create master variables
var gameGridArray = ["-","-","-","-","-","-","-","-","-"];
var drawMessage = "It was a draw";
var playerOneWinMessage = "Player 1 won";
var playerTwoWinMessage = "Player 2 won";
//var playerOneTurn = true;
counter = 0;

// string to compare who the winner is
var answerX = 'XXX';
var answer0 = '000';

// arrays to store the player inputs to check against
// var tempRow1 = []
// var tempRow2 = []
// var tempRow3 = []

// var tempCol1 = []
// var tempCol2 = []
// var tempCol3 = []

// var tempDiag1 = [];
// var tempDiag2 = [];


var arrayInsertIdxPosition = null;

// 2. obtain all elements in the html page
var boxElements = document.querySelectorAll("div");
var player1 = document.querySelector(".player1");
var player2 = document.querySelector(".player2");
var winOrDrawMessage = document.querySelector(".winOrDrawMessage");
var resestButton = document.querySelector(".reset-btn");

// 3. set the UI starting conditions
player1.style.backgroundColor = "lightgreen";

// 4. Declare the functions used

var handleClick = function (event) {

    // event.target.style.backgroundColor = 'red';
    event.target.classList.toggle('red');

    //event.target.textContent = "-";
    console.log(event.target.textContent = "X");
    console.log(event.target.getAttribute("data-ArrayIdx"));

    // work out how to update the master grid array with the values
    var arrayInsertIdxPosition = Number(event.target.getAttribute("data-ArrayIdx"));
    //gameGridArray[arrayInsertIdxPosition] = event.target.textContent = "X";

    var playerOneTurn = isPlayerOneTurn();
    
    if (playerOneTurn ==true) {
        var charToInsert = event.target.textContent = "X"
        player1.style.backgroundColor = "white";
        player2.style.backgroundColor = "lightgreen";

    }
    else {
        var charToInsert = event.target.textContent = "0"
        player2.style.backgroundColor = "white";
        player1.style.backgroundColor = "lightgreen";
    }
    updateGameGridArray(arrayInsertIdxPosition, charToInsert)

    // if items clicked to RED is the same as # of elements. i.e 3...
    if ((document.querySelectorAll('.red').length) === boxElements.length) {
        for (var i = 0; i < boxElements.length; i++) {
            boxElements[i].classList.toggle("green");
        }
    } else {
        console.log("it does not work")
    }

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

var populateDecisionArrays = function() {

    // require 8 by 3 rows for all combinations to check

    // clear those arrays that are not using array methods
    // tempCol1 = [], tempCol2 = [], tempCol3 = [],
    // tempDiag1 = [], tempDiag2 = [];
    

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
    
    checkWin(tempRow1);
    checkWin(tempRow2);
    checkWin(tempRow3);
    checkWin(tempc1);
    checkWin(tempc2);
    checkWin(tempc3);
    checkWin(tempd1);
    checkWin(tempd2);

    // console.log(tempRow1.toString() === answerX);
    // // derive each of the columns
    // for (var i = 0; i < gameGridArray.length; i=i+3) {
    //     tempCol1.push(gameGridArray[i]);
    // }

    // for (var i = 1; i < gameGridArray.length; i=i+3) {
    //     tempCol2.push(gameGridArray[i]);
    // }

    // for (var i = 2; i < gameGridArray.length; i=i+3) {
    //     tempCol3.push(gameGridArray[i]);
    // }

    // // derive the diagnal arrays. Require idx 0,4,8
    // var i = 0;
    // while (i <= 8) {
    //     tempDiag1.push(gameGridArray[i]);
    //     i = i + 4;
    // }

    // // now for diaganol 2. Require idx 2,4,6
    // var i = 2;
    // while (i <=6) {
    //     tempDiag2.push(gameGridArray[i]);
    //     i = i + 2;
    // }

    //printCombos();
}

var checkWin = function (potentialWinner) {
    if (potentialWinner === answerX) {
        console.log(playerOneWinMessage);
        winOrDrawMessage.textContent = playerOneWinMessage;

    }
    else if (potentialWinner === answer0) {
        console.log(playerTwoWinMessage);
        winOrDrawMessage.textContent = playerTwoWinMessage;
    } else {

    }

}

var printCombos = function () {
    console.log(`Row 1 is: ${tempRow1}`)
    console.log(`Row 2 is: ${tempRow2}`)
    console.log(`Row 2 is: ${tempRow3}`)

    console.log(`Col 1 is: ${tempCol1}`)
    console.log(`Col 2 is: ${tempCol2}`)
    console.log(`Col 3 is: ${tempCol3}`)

    console.log(`Diag 1 is: ${tempDiag1}`)
    console.log(`Diag 2 is: ${tempDiag2}`)

    console.log(tempDiag2.length);

} 


//add an event click listener for all array items
for (var i = 0; i < boxElements.length; i++) {
    boxElements[i].addEventListener('click', handleClick);
}