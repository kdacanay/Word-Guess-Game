//word array to choose from
var wordArray = ["nirvana","pearl jam","soundgarden","alice in chains","in utero", "ten", "evenflow","meat puppets","smashing pumpkins","tool","flannel","doc martens","airwalks","mtv unplugged"];
var lettersGuessedArray = [];
var wins = 0;
var startChances = 10;
var winningMask = "";

//event listener to start new game, reads key press
window.addEventListener("keypress",onkeypress,false);
//call start game function
startGame();

function startGame() {
    selectWord();
    setWinningMask();
    updateWins();
    chances = startChances;
    updateChances();
    updateMaskedWord();
    lettersGuessedArray=[];
    displayGuessed();
}

//functions to update displays at start of game
//updates wins in html
function updateWins () {
    document.getElementById("wins").innerHTML = String(wins);
}
//updates chances in html
function updateChances () {
    document.getElementById("chances").innerHtml = String(chances);
}
//subtracts chances by 1 when user guesses incorrectly
function subtractChances () {
    chances--;
    updateChances();
}
//updates Letters guessed in html
function displayGuessed () {
    if (lettersGuessedArray.length === 0) {
        document.getElementById("guessed").innerHTML = "_";
    } else {
        document.getElementById("guessed").innerHTML = "_";
        for (i = 0; i < lettersGuessedArray.length; i++) {
            document.getElementById("guessed").innerHTML += String(lettersGuessedArray[i]);
        }
    }
}
//updates mystery word in html
function updateMaskedWord() {
        document.getElementById("wordToGuess").innerHTML = "",
        for (i = 0; i < maskedWord.length; i++) {
            if (isNaN(maskedWord[i]) == true) {
                document.getElementById("wordToGuess").innerHTML += " _";
            } else {
                document.getElementById("wordToGuess").innerHTML += " " + mysteryWord[i];
            }
        }
}

function checkForWin() {
    if (maskedWord == winningMask) {
      return true;
    } else {
      return false;
    }
  }
  
  function selectWord() {
    mysteryWord = wordArray[(Math.floor((Math.random() * wordArray.length) + 1)) - 1];
    maskedWord = mysteryWord;
    console.log(mysteryWord); // used for debugging
  }
  
  function setWinningMask() {
    winningMask = ""; // reset to blank
    for (i = 0; i < mysteryWord.length; i++) { // set based on mysteryWord length
      winningMask += "1";
    }
  }
  function isLetterInWord(letter) {
    if (mysteryWord.indexOf(letter) == -1) {
      return false;
    } else {
      return true;
    }
  }
  function onKeyPress(key) {
    letter = key.key
    displayLastKeyPressed(letter);
    if (isLetterInWord(letter)) { // check if letter is in word
      replaceAllOccurences(letter); // mask letters in word
    } else { // if letter is NOT in word
      if (hasLetterBeenUsed(letter) == false) { // letter NOT in word; has not been used
        guessedLettersArray.push(letter)
        subtractChances();
      } else {
        // letter NOT in word; has already been used
      }
    }
    displayGuessed();
    displayMaskedWord();
    if (checkForWin() == true) { // if user wins, increment wins count, start new game
      wins++;
      updateWins();
      startGame();
    }
    if (guessesLeft == 0) { // if zero guesses left, start new game
      startGame();
    }
  }
  
  function hasLetterBeenUsed(letter) {
    if (lettersGuessedArray.indexOf(letter) == -1) {
      return false;
    } else {
      return true;
    }
  }