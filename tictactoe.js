
// 1. create master variables
var gameGridArray = ["-","-","-","-","-","-","-","-","-"];
var drawMessage = "It was a draw!";
var playerOneWinMessage = "Player 1 won!";
var playerTwoWinMessage = "Player 2 won!";

var p1ScoreCounter = 0;
var p2ScoreCounter = 0;
var computerPlayer = false;

var whichOpponent = ['Human', "Computer"];

// string to compare who the winner is
var answerX = 'XXX';
var answer0 = '000';

var arrayInsertIdxPosition = null;

// 2. obtain all elements in the html page
//var boxElements = document.querySelectorAll("div");
var player1 = document.querySelector(".player1");
var player2 = document.querySelector(".player2");
var winOrDrawMessage = document.querySelector(".winOrDrawMessage");
var resetButton = document.querySelector(".reset-btn");
var boxElements = document.querySelectorAll('.button');

// 2b - items for the extensions
var winningApplause = document.querySelector(".applause"); 
var player1ScoreCounter = document.querySelector(".player1ScoreCounter")
var player2ScoreCounter = document.querySelector(".player2ScoreCounter")

//  used for either selecting a human or computer player
var chooseOpponentDropDownList = document.querySelector(".chooseOpponent")
var humanPlayer = document.querySelector(".humanPlayer")
var computerPlayer = document.querySelector(".computerPlayer")

// 3. set the UI starting conditions
player1.style.backgroundColor = "lightgreen";
resetButton.disabled = true;
var whichPlayerCounter = 0;

// 4. Declare the functions used

// This handler event is triggered when a user either clicks on the drop down list.
// It sets the computer player to TRUE if selected or FALSE if back to human
var handleComputerPlayer = function (event) {
    if (event.target.selectedIndex == 1) {
        console.log(computerPlayer.value);
        computerPlayer = true;
        console.log(computerPlayer);
    } 
    else {
        computerPlayer = false;
    }
}




var handleClick = function (event) {
    console.log(event);
    //event.target.style.backgroundColor = 'red';
    event.target.classList.toggle('red');
    event.target.disabled = true;
    
    // work out how to update the master grid array with the values
    var arrayInsertIdxPosition = Number(event.target.getAttribute("data-ArrayIdx"));
    //gameGridArray[arrayInsertIdxPosition] = event.target.textContent = "X";

    // determine if its player 1 turn.
    var playerOneTurn = isPlayerOneTurn();

    if (playerOneTurn ===true) {
        var charToInsert = event.target.textContent = "X";
        player1.style.backgroundColor = "white";
        player2.style.backgroundColor = "lightgreen";

        // update the master grid array with the uer choice
        updateGameGridArray(arrayInsertIdxPosition,charToInsert);

        // If the computer player has been selected, run its own functins to populate the gameboard
        if (computerPlayer ===true) {
            player2.style.backgroundColor = "white";
            player1.style.backgroundColor = "lightgreen";
            obtainRemainingPositions(); 
        }
    
    } else {
        var charToInsert = event.target.textContent = "0"
        player2.style.backgroundColor = "white";
        player1.style.backgroundColor = "lightgreen";

        updateGameGridArray(arrayInsertIdxPosition,charToInsert);


    }
}

var updateGameGridArray = function(arrayInsertIdxPosition, charToInsert) {
    // insert in the array the index position and the players character (X or 0)
    gameGridArray[arrayInsertIdxPosition] = charToInsert;

    // if items clicked to RED is the same as # of elements. i.e 9...it means it was a draw.
    // Then make the board all green.
    if ((document.querySelectorAll('.red').length) === boxElements.length) {
        // if draw reset player counter
        whichPlayerCounter = 0;
        for (var i = 0; i < boxElements.length; i++) {
            boxElements[i].classList.toggle("green");
            boxElements[i].classList.toggle("green");

            // display the DRAW message. Disable the event listener preventing the user from changing board game
            winOrDrawMessage.textContent = drawMessage;
            removeBoxElementsEventListener();
            resetButtonFunctionality(false);
        }
    } else {
        //event.target.classList.toggle('red');
        console.log("it does not work")
    }

    // call this function to slice/determine the game grid array into its various winning combinations
    populateDecisionArrays();

}

var isPlayerOneTurn = function() {
    whichPlayerCounter = whichPlayerCounter +1;
    if (whichPlayerCounter % 2 === 0) {
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
        // change the reset button to false
        resetButtonFunctionality(false);
        // play winner
        winningApplause.play();
        // update the player 1 score counter
        player1ScoreCounter.textContent = Number(player1ScoreCounter.textContent) + 1;

        console.log(`Player 1 score is: ${player1ScoreCounter.textContent}`);
        // update back to player 1 to start. Remove this if you want alternating player starts
        whichPlayerCounter = 0;

    } else if (potentialWinner === answer0) {
        // display player 2 win message
        winOrDrawMessage.textContent = playerTwoWinMessage;
        // disable the handleClick event listener prevening a person in making further gameboard changes
        removeBoxElementsEventListener();
        // change the reset button to false
        resetButtonFunctionality(false);

        // play winner
        winningApplause.play();

        // update the player 2 score counter
        player2ScoreCounter.textContent = Number(player2ScoreCounter.textContent) + 1;
        // update back to player 1 to start. Remove this if you want alternating player starts
        whichPlayerCounter = 0;
    }
    
}



// When a computer plays, this function determines where the '-' characters are in the mainGridArray.
// If a '-' is present, it means a computer can eventually place a 0 in one of these positions
var obtainRemainingPositions = function() {

    var startIndex = 0;
    var availableIndexPosittions = ''
    
    while (true) {
        // while true, find the hyphens via indexOf(). If one is found, take it's index position and add 1 to recommence
        // the search
        var foundIndex = gameGridArray.indexOf('-',startIndex);
        if (foundIndex !=-1) {
            availableIndexPosittions = availableIndexPosittions+foundIndex;
        }
        if (foundIndex ==-1) {
            break;
        }
        // ensure to increment the start the next search of indexof() after the previous '-' was found
        startIndex = foundIndex + 1;
    }
   
    //console.log(availableIndexPosittions);
   
    // From the remaining index positions available, the random index position # to then insert a '0' in is
    // the minus 1 is to cater for ZERO based counting
    var randomIndexPositionToInsertAZero = getRandomIndexPosition(0, availableIndexPosittions.length-1   );

    // take the random index position that was calculated and used the string's value number to update the grid array
    updateGameGridArray(availableIndexPosittions[randomIndexPositionToInsertAZero], "0")

    // now loop through all elemtns and match the button data Index to the index positino and update the display
    for (var i = 0; i < boxElements.length; i++) {
        if (boxElements[i].getAttribute("data-ArrayIdx") == availableIndexPosittions[randomIndexPositionToInsertAZero]) {
            console.log(boxElements[i].getAttribute("data-ArrayIdx"));
            boxElements[i].textContent = "0"
            boxElements[i].classList.toggle('red');
            boxElements[i].disabled = true;
            whichPlayerCounter = 0; //ensure the turn goes back to player1. i.e so an 'X' can  be placed
            break;
        }
    }
    // now we'll check the arrays to calculate all winning combinations and then invoke checkWin() to determine if a winner
    populateDecisionArrays()
}

// This function returns a random number between 0 and the length-1 of the availble position open.
var getRandomIndexPosition = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }


// This function enables the "play again" button to be toggled on/off when required
var resetButtonFunctionality = function(boolean) {
    resetButton.disabled = boolean;
}


// This function resets the game variables, UI elements etc. IT DOES NOT RESET THE SCORE
var handleResetGame = function (event) {
    //reset the mater array to blanks and reset the whichPlayerCounter (i.e. ensure player 1)
    gameGridArray = ["-","-","-","-","-","-","-","-","-"];
    whichPlayercounter = 0;

    // reset the handleclick event listener and all UI elements
    for (var i = 0; i < boxElements.length; i++) {
        boxElements[i].textContent ="-"
        //boxElements[i].style.backgroundColor = "lightgrey";
        boxElements[i].disabled = false;
        boxElements[i].classList.remove('red');
        boxElements[i].classList.remove('green');
        boxElements[i].addEventListener('click', handleClick);
    }
    // reset message to blank, player colours and disable RESET button       
    winOrDrawMessage.textContent = "";
    player1.style.backgroundColor = "lightgreen";
    player2.style.backgroundColor = "white";
    resetButtonFunctionality(true);
    

}


//add an event click listener for all div elements on the game board
for (var i = 0; i < boxElements.length; i++) {
    boxElements[i].addEventListener('click', handleClick);

}

// add an eveny click listens to reset the game if player wins or a draw
resetButton.addEventListener('click', handleResetGame);

// this is an event listener for when a user would like to paly the computer
document.querySelector(".chooseOpponent").addEventListener("change", handleComputerPlayer);