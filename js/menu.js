function MenuState() {
    var index = 0
    var items = ["Start"]
    var instruction = "Press Enter to start";
    var sprite = new Sprite({image: "LD.png", x: 150, y: 50, scale: 0.25});
    var addtionalText = "Compo during LD 35 in April 2016 "

    this.setup = function() {
        index = 0
        jaws.on_keydown(["enter","space"],  function()  { if(items[index]=="Start") {jaws.switchGameState(Game) } } )
        }
    this.draw = function() {
        jaws.context.clearRect(0,0,jaws.width,jaws.height);
        sprite.draw();
        var ctx = jaws.context;
        for(var i=0; items[i]; i++) {
          jaws.context.font = "bold 50pt 'Arial'";
          jaws.context.fillStyle = "Red"
          jaws.context.textAlign="center";
          jaws.context.fillText(items[i], jaws.width/ 2, jaws.height/2 + 60);
        }
        jaws.context.fillStyle = "Black";
        jaws.context.font = "bold 35pt 'Arial'";
        jaws.context.fillText(instruction, jaws.width/ 2, jaws.height/2 + 120);

        jaws.context.fillStyle = "Black";
        jaws.context.font = "bold 25pt 'Arial'";
        jaws.context.fillText(addtionalText, jaws.width/ 2, jaws.height/2 + 180)

    }
}
