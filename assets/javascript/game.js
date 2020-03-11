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
var wordsArray = ["nirvana", "pearl jam", "smells like teen spirit", "soundgarden", "badmotorfinger",
"jeremy", "alice in chains", "dirt", "in utero", "meat puppets", "ten", "smashing pumpkins", 
"flannel", "doc martens", "airwalks", "mtv unplugged"];
//images have to match wordArray for random number to match
var images = ["assets/images/nirvana.jpg", "assets/images/pearljam.jpg", "assets/images/smells_like_teen_spirit.jpg", "assets/images/soundgarden.jpg",
"assets/images/badmotorfinger.jpg", "assets/images/jeremy.jpg", "assets/images/aliceinchains.jpg", "assets/images/dirt.jpg", "inutero.jpg",
"assets/images/meatpuppets.jpg", "assets/images/ten.jpg", "assets/images/smashingpumpkins.jpg", "assets/images/flannel.jpg","assets/images/docmartens.jpg",
"assets/images/airwalks.jpg", "assets/images/mtvunplugged.jpeg"];
var winningWord = "";
//breakdown winningWord into individual letters
var lettersInWinningWord = [];
var blanks = 0;
var blanksSolved = [];
var wrongGuesses = [];
var displayImage;
var winCounter = 0;
var numGuesses = 10;

startGame();

function startGame() {
    numGuesses = 10;
    //this picks a random number from wordsArray, matches to imageArray
    var randomNum = Math.floor(Math.random() * wordsArray.length);
    winningWord = wordsArray[randomNum];
    displayImage = images[randomNum];
    //this splits the winningWord into seperate letters
    lettersInWinningWord = winningWord.split("");
    blanks = lettersInWinningWord.length;
    //test function (for my peace of mind)
    console.log(winningWord);
    //reset
    blanksSolved = [];
    wrongGuesses = [];
    //fills blanksSolved array with number of blank
    for (var i = 0; i < blanks; i++) {
        blanksSolved.push("_");
};
    //resets guesses 
    document.getElementById("remainingChances").innerHTML = numGuesses;
    //inserts blanks at beginning of each reset
    document.getElementById("blanks").innerHTML = blanksSolved.join(" ");
    //clears wrong guesses
    document.getElementById("wrong-Guesses").innerHTML = wrongGuesses.join(" ");
};

function checkLetters (letter) {
    var letterFound = false;
    //check if letter is in array
    for (var i = 0; i < blanks; i++) {
        if (winningWord[i] === letter) {
            letterFound = true;
        }
    }
    if (letterFound) {
        for (var j = 0; j < blanks; j++) {
            if(winningWord[j] === letter) {
                blanksSolved[j] = letter;
            }
        }
    } 
    //if guess is not in word
    else { 
        wrongGuesses.push(letter);
        numGuesses--;
    }
};

function endRound() {

    document.getElementById("remainingChances").innerHTML = numGuesses;
    document.getElementById("blanks").innerHTML = blanksSolved.join(" ");
    document.getElementById("wrong-Guesses").innerHTML = wrongGuesses.join(" ");

    if (lettersInWinningWord.toString() === blanksSolved.toString()) {
        winCounter++;
        alert("Nice, bro! Hey! Sick Airwalks, dude!");
        document.getElementById("win-counter").innerHTML = winCounter;
        startGame();
        document.getElementById("setImage").src = displayImage;
    }
    else if (numGuesses === 0) {
        alert("Beat, bro! Try again, its cool!");
        startGame();
    }
};

//click listeners
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    endRound();
}
