AnimationRectangle = function(rectOriginal, rectFinal, duration) {
    this.rectT = rectOriginal.clone();
    this.rectF = rectFinal.clone();
    this.timer = new Timer();
    this.timeElapsedX = 0;
    this.timeElapsedY = 0;
    this.last_tick = 0;
    this.offsetTimeX = duration / (this.rectF.width - rectOriginal.width);
    this.offsetTimeY = duration / (this.rectF.height - rectOriginal.height);
}

AnimationRectangle.prototype.init = function(rectOriginal, rectFinal, duration) {
    this.rectT = rectOriginal.clone();
    this.rectF = rectFinal.clone();
    this.timer = new Timer();
    this.timeElapsedX = 0;
    this.timeElapsedY = 0;
    this.last_tick = 0;
    this.offsetTimeX = (this.rectF.width - rectOriginal.width) / duration;
    this.offsetTimeY = (this.rectF.height - rectOriginal.height) / duration;
    debugger;
}

AnimationRectangle.prototype.isFinished = function() {
  return (this.rectT.width == this.rectF.width && this.rectT.height == this.rectF.height);
}

AnimationRectangle.prototype.animate = function () {

    if (this.isFinished()) {
        this.reset();
        return this.rectF;
    }
     this.timeElapsedX += this.timer.getInterval() - this.last_tick;
     this.timeElapsedY += this.timer.getInterval() - this.last_tick;

    if(this.timeElapsedX > Math.abs(this.offsetTimeX) && this.rectT.width != this.rectF.width) {
        this.rectT.width = this.offsetTimeX > 0 ? this.rectT.width+1 : this.rectT.width-1;
        this.timeElapsedX = 0;
        console.log("x --> " + this.rectT.width);
    }

    if(this.timeElapsedY > Math.abs(this.offsetTimeY) && this.rectT.height != this.rectF.height) {
        this.rectT.height = this.offsetTimeY >0 ? this.rectT.height+1 : this.rectT.height-1;
        this.timeElapsedY = 0;
        console.log("y --> " + this.rectT.height);
    }

    this.last_tick = this.timer.getInterval();

    return this.rectT;
}


AnimationRectangle.prototype.reset = function() {
    this.timeElapsedX = this.timeElapsedY = this.last_tick = 0;
    this.timer.reset(); 
}