function Letter (value) {    // A q se refiere el "value"?? --  Supongo q hace referencia a q se toma el valor del input en el inquirer
    this.letter = value;     // Este "value" ya es predefinido??
    this.guessed = false;
    this.toString = function () {
        if (this.letter===" ") {   // Aqui pregunta si es un espacio vacio para darlo por bueno y pintarlo
            this.guessed = true;
            return " ";
        } else {
            if (this.guessed===false) {
                return "_";
            } else {
                return this.letter;
            }
        }

    };

    this.guess = function (guess) {
        if (guess===this.letter) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;