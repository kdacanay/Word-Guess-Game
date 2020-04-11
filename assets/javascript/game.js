
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


//---------------------------word array with objects, with attached images-----------------------------------------------


$(document).ready(function() {

var wordsArray = [
    {   word: "nirvana", 
        image: "assets/images/nirvana.jpg"
    },
    {   word: "pearljam", 
        image: "assets/images/pearljam.jpg"
    },
    {   word: "smells like teen spirit",
        image: "assets/images/smells_like_teen_spirit.jpg",
    },
    {   word: "soundgarden", 
        image: "assets/images/soundgarden.jpg"
    },
    {
        word: "badmotorfinger",
        image: "assets/images/badmotorfinger.jpg"
    },
    {
        word: "jeremy",
        image: "assets/images/jeremy.jpg",
    },
    {
        word: "alice in chains",
        image: "assets/images/aliceinchains.jpg"
    },
    {
        word:  "dirt",
        image: "assets/images/dirt.jpg"
    },
    {
        word: "in utero",
        image: "assets/images/inutero.jpg"
    },
    {
        word: "meat puppets",
        image: "assets/images/meatpuppets.jpg"
    },
    {
        word: "ten",
        image: "assets/images/ten.jpg"
    },
    {
        word: "smashing pumpkins",
        image: "assets/images/smashingpumpkins.jpg"
    },
    {
        word: "flannel",
        image: "assets/images/flannel.jpg"
    },
    {
        word: "doc martens",
        image:  "assets/images/docmartens.jpg"
    },
    {
        word: "airwalks",
        image: "assets/images/airwalks.jpg",
    },
    {
        word: "mtv unplugged",
        image: "assets/images/mtvunplugged.jpeg" 
    }
];


//---------variables-------------------------------------
var lettersInWinningWord = [];
var winningWord = "";
var blanks = 0;
var blanksSolved = [];
var wrongGuesses = [];
var displayImage;
var winCounter = 0;
var numGuesses = 10;
var pauseGame = false;

//----------runs at load up------------------------------
startGame();

function startGame() {
    
    //-----clears update (card title)----------------------
    $("#card-title").html("");

    $("#blanks").html("Press the Space Bar to Start Game!");
    //--------sets first image to default image-----------------
    $("#setImage").attr("src", "assets/images/grungeimage.png")
    
    //--------------sets number of guesses to 11 because pressing space bar to start 
    //---------------reduces chances -1 -------------------------------
    numGuesses = 11;
    pauseGame = true;
    winCounter = 0;

    //---------detects space bar ----------------------
    document.body.onkeyup = function(event) {
        if (event.keyCode === 32) {
        $("#remainingChances").html("11");
        reset();
    } 
};
}

function reset() {

    //---------pause all audio when round starts----------
    document.getElementById("winnerAudio").pause();
    document.getElementById("loserAudio").pause();
    document.getElementById("finalAudio").pause();
    numGuesses = 10;
    pauseGame = false;
    
    //---------set to start image and message-------------
    $("#setImage").attr("src", "assets/images/grungeimage.png");
    $(".card-title").html("Guess the Word!");

    
    //----------this picks a random number from wordsArray, matches to image------------------
    var randomNum = Math.floor(Math.random() * wordsArray.length);
    winningWord = wordsArray[randomNum].word;
    displayImage = wordsArray[randomNum].image;
    
    //----------this splits the winningWord into seperate letters-----------------------
    lettersInWinningWord = winningWord.split("");
    blanks = lettersInWinningWord.length;
    
    //-----------test function (for my peace of mind)-----------------------
    console.log(winningWord);
    
    //--------------reset------------------------
    blanksSolved = [];
    wrongGuesses = [];
    
//---------fills blanksSolved array with number of blank------------------------
    for (var i = 0; i < blanks; i++) {
        if (winningWord[i] === " ") {
            blanksSolved.push(" ")
        } else {
            blanksSolved.push("_");
        }
    };

    //-----------resets guesses---------------------------------- 
    document.getElementById("remainingChances").innerHTML = numGuesses;
    
    //-------------inserts blanks at beginning of each reset-----------------
    document.getElementById("blanks").innerHTML = blanksSolved.join(" ");
    
    //-------------clears wrong guesses------------------------------
    document.getElementById("wrong-Guesses").innerHTML = wrongGuesses.join(" ");
};

//-------main game logic------------------------
function checkLetters(letter) {

    var letterFound = false;
    
    //check if letter is in array
    for (var i = 0; i < blanks; i++) {
        if (winningWord[i] === letter) {
            letterFound = true;
        }
    }
    
    if (letterFound) {
        for (var j = 0; j < blanks; j++) {
            if (winningWord[j] === letter) {
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


//-----------click listeners checks user input for win/loss---------------------
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    endRound();
}


//---------function runs after all letters guessed correctly or chances reach 0---------------------
function endRound() {

    pauseGame = false;
    

    //-----------display in html-------------------------------
    document.getElementById("remainingChances").innerHTML = numGuesses;
    document.getElementById("blanks").innerHTML = blanksSolved.join(" ");
    document.getElementById("wrong-Guesses").innerHTML = wrongGuesses.join(" ");


    //----------if user guesses letters correctly--------------------
    if (lettersInWinningWord.toString() === blanksSolved.toString()) {

        //-----adds 1 to win--------------
        winCounter++;
        

        //------reveals winning word---------------------
        $(".card-title").html("The Winning Word Was: "+ winningWord);
        document.getElementById("win-counter").innerHTML = winCounter;
        

        //------------------displays matching image to correct word---------------------
        document.getElementById("setImage").src = displayImage;


        //----------------plays winning audio--------------------
        document.getElementById("winnerAudio").play();
        setTimeout (reset, 6000) 
    

        //---------if guesses reach 0---------------------------------
        } else if (numGuesses === 0) {
        $("#blanks").html("GAME OVER!")
        $(".card-title").html("Booooo!!");
        document.getElementById("loserAudio").play();
        $("#setImage").attr("src", "assets/images/gameover.jpg");
        setTimeout (startGame, 8000);
    
    
        //--------if wins reach 10------------------------------
        } else if (winCounter === 10) {
        $("#blanks").html("Nice! You're Pretty good! You want to put on some MudHoney??");
        $(".card-title").html("We have a winner!");
        $("#setImage").attr("src", "assets/images/youwin.jpg");
        document.getElementById("finalAudio").play();
        setTimeout (startGame, 10000);
    }
};
})