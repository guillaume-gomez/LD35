//from characterv2
//const Speed = 4;

Score = function(x, y) {
  this.x = x;
  this.y = y;
  this.m_text = "Score: ";
  this.m_score = 0;
  //this.m_scoring = new jaws.Text({text: this.text, x: x, y: y});
}

Score.prototype.draw = function() {
  var final = this.m_text + parseInt(this.m_score);
  var ctx = jaws.context;
  ctx.font = "15px Arial";
  ctx.fillText(final, this.x , this.y);
}

Score.prototype.compute = function(character) {
  console.log(character.getVxForScore() / Speed);
  this.m_score += (character.size().height / tileHeightOrigin) * character.getVxForScore() / Speed;
  this.m_score = (this.m_score < 0) ? 0 : this.m_score;
  jaws.score = this.m_score;
}