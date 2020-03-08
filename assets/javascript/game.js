//Pseudocode
//player presses any key to start game
//cpu picks random word from wordArray as winning word
//word is hidden and each letter is turned into underscores _
//player begins with 10 chances, presses lowercase letter key as guess: each wrong guess decreases chances by -1
//with each guess, letter gets stored in guessedArray, whether it wa correct or incorrect guess
//correct guess does not decrease chances variable
//if chances reaches 0, game resets
//if player guesses word correctly within chances limit, wins variable increase by + 1, game resets. 

//bonus, play winning tune to match band/song when win is guessed
//bonus, play losing horn (price is right horn?) when chances reach 0

//word array for cpu to choose winning word to from
var wordArray = ["nirvana", "pearl jam", "soundgarden", "alice in chains", "in utero", "ten", "evenflow", "meat puppets", "smashing pumpkins", "tool", "flannel", "doc martens", "airwalks", "mtv unplugged"];
var guessedLettersArray = [];
var mysteryWord = [];
var usedWinningWords = [];
var winningWord;
var wins = 0;
var guessesLeft = 10;
// var winSong = 
// var loseSong =
// var championSong = 

// id's that are in html
//  id="get-started">Press Any Key To Get Started!</div>
// id="wins">Wins:</div>
//  id="winningWord">Mystery Word:</div>
//  id="guessesleft">Chances:</div>
//  id="guessessofar">Letters Guessed:</div>

function startGame() { // start new game with default settings

winningWord = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();

//set winningWord to underscores
for (var i = 0; i < winningWord.length; i++) {
    if (winningWord[i] === " ") {
        mysteryWord.push(" ")
    }
    else {
        mysteryWord.push("_");
    }
}
updateDisplay();
};


function resetGame () {
    //if player guesses all words
    if (usedWinningWords.length === wordArray) {
        championSong.play();
        usedWinningWords = [];
        wins = 0;
    }
    else {
        //retrieve new word
        winningWord = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
        console.log(winningWord);
        if (usedWinningWords.includes(winningWord) === true) {
            resetGame();
    }
    guessedLettersArray = [];
    mysteryWord = [];
    //reset guesses word
    for (var i=0; i < winningWord.length; i++) {
        if (wordToMatch[i] === " ") {
            guessingWord.push(" ")
          } 
          else {
            guessingWord.push("_");
          }
        }
        updateDisplay();
      }
};

function updateDisplay () {
    document.getElementById("wins").innerText = wins;
    document.getElementById("winningWord").innerText = mysteryWord.join("");
    document.getElementById("remainingChances").innerText = guessesLeft;
    document.getElementById("guessesSoFar").innerText = guessedLettersArray.join(" ");
};

document.onkeydown = function(event) {
    checkForLetter(event.key.toUpperCase());
};

var isLetter = function(ch) {
    return typeof ch === "string" && ch.length === 1 && (ch >= "a" && ch <= "z" || ch >= 'A' && ch <= "Z");
};

function checkForLetter(letter) {
    var foundLetter = false;

    for (var i=0; i < winningWord.length; i++) {
        if (letter === winningWord[i]) {
            mysteryWord[i] = letter;
            foundLetter = true;
        if (mysteryWord.join("") === winningWord) {
            wins++
            usedWinningWords.push(winningWord);
            console.log(usedWinningWords);
            winSound.play();
            updateDisplay();
        }
    }
}
if (foundLetter === false) {
    if (guessedLettersArray.includes(letter) === false) {
        guessedLettersArray.push(lettr)
        guessesLeft--
    }
    if (guessesLeft === 0) {
        usedWinningWords.push(winningWord);
        console.log(usedWinningWords);
        mysteryWord = winningWord.split();
        loseSound.play();
    }
}
updateDisplay();
};

startGame();

