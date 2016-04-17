Timer = function ()
{
    this.lastTime = (new Date()).getTime();
    this.totalTime = 0;
    this.updateTime = 0;
    this.delta = 0 ;
}
    
Timer.prototype.start = function () {
    this.updateTime = 0 ;
}

Timer.prototype.reset = function() {
    this.lastTime = (new Date()).getTime();
    this.totalTime = 0;
    this.updateTime = 0;
    this.delta = 0 ;
}

Timer.prototype.getInterval = function () {
    var now = (new Date()).getTime();
    this.delta = now - this.lastTime ;
    this.lastTime = now ;
    this.totalTime += this.delta  ;
    this.updateTime += this.delta ;
    return this.updateTime;
}
