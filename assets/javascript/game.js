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
var wordArray = ["nirvana", "pearl jam", "smells like teen spirit", "soundgarden", "badmotorfinger",
"jeremy", "alice in chains", "dirt", "in utero", "meat puppets", "ten", "smashing pumpkins", 
"flannel", "doc martens", "airwalks", "mtv unplugged"];
//images have to match wordArray for random number to match
var images = ["assets/images/nirvana.jpg", "assets/images/pearljam.jpg", "assets/images/smells_like_teen_spirit.jpg", "assets/images/soundgarden.jpg",
"assets/images/badmotorfinger.jpg", "assets/images/jeremy.jpg", "assets/images/aliceinchains.jpg", "assets/images/dirt.jpg", "inutero.jpg",
"assets/images/meatpuppets.jpg", "assets/images/ten.jpg", "assets/images/smashingpumpkins.jpg", "assets/images/flannel.jpg","assets/images/docmartens.jpg",
"assets/images/airwalks.jpg", "assets/images/mtvunplugged.jpeg"];
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var wrongGuess = [];
var blank = "";
var winningWord;
var wins = 0;
var guessesLeft = 10;
var displayImage;


start ();

function start () {

        var randomNumber = Math.floor(Math.random() * wordArray.length);

        var winningWord = wordArray[randomNumber];
        var displayImage = images[randomNumber];

        //reset
        var wrongGuess = [];
        var guessesLeft = 10;
        var blank = "";


        //correct number of blanks
        for (var i = 0; i < winningWord.length; i++) {
            blank += "_" + ""; 
        }
};

//reading key pressed
document.onkeyup = function(event) {
    var playerGuess = event.key;

    //populate blanks
    document.getElementById("blanks").innerHTML = blank;
    document.getElementById("wrongGuesses").innerHTML = wrongGuess;
    document.getElementById("status").innerHTML = "Mystery Word:";

    //checks playerGuess lowercase a-z
    if(alphabet.indexOf(playerGuess) > -1) {
        checkGuess(playerGuess);
    } else {
        alert("Please choose a letter from a-z (no CAPS)");
    }
    //if guess is in winningWord
    function checkGuess(playerGuess) {
            //if yes
        if (winningWord.indexOf(playerGuess) > -1){
            for (var i=0; i< winningWord.length; i++) {

            if (winningWord[i] === playerGuess) {
                displayLetter (playerGuess, i);
                endgame();
            }
    }
} else if (wrongGuess.indexOf(playerGuess) === -1) {
    //push to array
        wrongGuess.push(playerGuess);
        document.getElementById("wrongGuesses").innerHTML = wrongGuess;
        guessesLeft --;
        document.getElementById("remainingChances").innerHTML = guessesLeft;
        endgame();
        }
    }
};

function displayLetter(letter, index) {
    var newLetter = "";
    //iteration
    for (var i = 0; i < blank.length; i++)


        if (i === index) {
            newLetter += letter;

        } else {
            newLetter += blank[i];
        }
    blank = newLetter;

    document.getElementById("blanks").innerHTML = blank;
};
function endGame () {
	if (guessRemain === 0) {
		document.getElementById("status").innerHTML = "You lose!";
		document.getElementById("blanks").innerHTML = "Press key to restart";
		start ();

	}
	//correctly guess the word - no blanks left and guesses remain
	else if (blank.indexOf("_") === -1 && guessesLeft != 0) {
		document.getElementById("status").innerHTML = "You win!";
		document.getElementById("blanks").innerHTML = "Press key to restart";
		document.getElementById("photo").src = displayImage;
		wins++;
		document.getElementById("wins").innerHTML = wins;
		start();

	} else {

	}
};