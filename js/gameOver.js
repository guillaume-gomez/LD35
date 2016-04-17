function GameOver() {

    var title = "Game Over";
    var y_score = "Your Score: ";
    var instruction = "Press Enter to start";

    this.setup = function() {
        index = 0
        jaws.on_keydown(["enter","space"],  function(){ jaws.switchGameState(Game) } );
    }

    this.draw = function() {
        jaws.context.clearRect(0,0,jaws.width,jaws.height);
        var ctx = jaws.context;
        jaws.context.textAlign="center";
        jaws.context.fillStyle = "Red";
        jaws.context.font = "bold 50pt 'Arial'";
        jaws.context.fillText(title, jaws.width/ 2, jaws.height/2 - 100);

        jaws.context.fillStyle = "Black";
        jaws.context.font = "bold 45pt 'Arial'";
        jaws.context.fillText(y_score + parseInt(jaws.score), jaws.width/ 2, jaws.height/2);

        jaws.context.font = "bold 25pt 'Arial'";
        jaws.context.fillText(instruction, jaws.width/ 2, jaws.height/2 + 180)
    }
}
