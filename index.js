var Word = require("./word.js");  // Aqui esta haciendo referencia al archivo... Por que???
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var favoriteBands = ["ac dc", "arch enemy", "black sabath", "dead kennedys", "guns and roses", "helloween", "iron maiden", "judas priest", "kiss", "megadeth", "metallica", "moonspell", "nirvana", "rammstein", "rob zombie", "slayer", "stratovarius", "system of a down", "testament"];

var randomIndex = Math.floor(Math.random() * favoriteBands.length);
var randomWord = favoriteBands[randomIndex];

computerWord = new Word(randomWord);  // Por q no esta definida como "var"

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function knowledge() {

    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * favoriteBands.length);
        var randomWord = favoriteBands[randomIndex];

        computerWord = new Word(randomWord);             // Por q esta definido esto aqui de nuevo dentro del "if" si ya lo habiamos definido
                                                        // arriba en las lineas 8 a 13???
        requireNewWord = false;
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);   // que le estamos indicando aqui?

    if (wordComplete.includes(false)) {   // como funciona aqui el metodo .includes?? Por q ponen entre parentesis (false) si en teoria ahi
        inquirer                            // debería ir el valor a buscar y ver si está incluido
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {
               
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    knowledge();
                } else {

                   
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        knowledge();
                    } else {

                        var wordCheckArray = [];

                        
                        computerWord.userGuess(input.userinput);

                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }

                        
                        computerWord.log();

                        console.log("Guesses Left: " + guessesLeft + "\n");

                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        if (guessesLeft > 0) {
                            knowledge();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }


                        
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

   
    function completeCheck(key) {        // "Key" es algo q ya se entiende por default??
        wordComplete.push(key.guessed);  // segun yo aqui es donde estamos pusheando la tecla que se oprima al array para luego comparar
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                knowledge();
            } else {
                return
            }
        })
}

knowledge();
