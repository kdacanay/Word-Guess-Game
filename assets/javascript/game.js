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
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var wrongGuess = [];
var blank = "";
var winningWord;
var wins = 0;
var guessesLeft = 10;
