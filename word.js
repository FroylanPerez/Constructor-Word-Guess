var Letter = require("./Letter");  // Lo dejo como en clase. Fer me explico q se hace referencia al modulo, no al archivo.

function Word (answer) {
    this.objArray = [];

    for (var i = 0; i < answer.length; i++) {   // Por q preguntar el length del "answer" y no del "this.objArray"??
        var letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }

    this.log = function () {
        answerLog = "";   // Por q esta no esta definida como "var"?? // Segun yo esta definiendo de inicio como un String vacio
        for (var i = 0; i < this.objArray.length; i++) {
            answerLog += this.objArray[i] + " ";
        }
        console.log(answerLog + "\n");
    }

    this.userGuess = function (input) {   // Aqui a q esta haciendo referencia "input"
        for (var i = 0; i < this.objArray.length; i++) {
            this.objArray[i].guess(input);  // No entiendo bien q instruccion se esta dando aqui
        }
    }

}

module.exports = Word;