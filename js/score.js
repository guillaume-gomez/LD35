//from characterv2
//const Speed = 4;

Score = function(x, y) {
  this.x = x;
  this.y = y;
  this.m_text = "Score: ";
  this.m_score = 0;
  this.coefficiant = 1;
  //this.m_scoring = new jaws.Text({text: this.text, x: x, y: y});
}

Score.prototype.draw = function() {
  var final = this.m_text + parseInt(this.m_score);
  var ctx = jaws.context;
  ctx.font = "15px Arial";
  ctx.fillText(final, this.x , this.y);
  if(this.coefficiant > 1) {
    this.renderMultiplictor();
  }
}

Score.prototype.renderMultiplictor = function() {
  var ctx = jaws.context;
  jaws.context.textAlign="center";
  jaws.context.fillStyle = "Red";
  jaws.context.font = "bold 30px 'Arial'";
  jaws.context.fillText(`${this.coefficiant} X`, this.x, this.y + 50);
};

Score.prototype.compute = function(character) {
  this.coefficiant = character.getVxForScore() / Speed;
  this.m_score += (character.size().height / tileHeightOrigin) * this.coefficiant;
  this.m_score = (this.m_score < 0) ? 0 : this.m_score;
  jaws.score = this.m_score;
}