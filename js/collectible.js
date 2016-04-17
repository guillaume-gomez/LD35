const RANDOM_BONUS = 100;
const CREATE_BONUS = 8;

const TYPE_BONUS_HEIGHT = "bonus_height";
const TYPE_BONUS_WIDTH = "bonus_width";
const WIDTH_TRIANGLE = 12;
const HEIGHT_TRIANGLE = 12;
const WIDTH_LINE = 20;
const HEIGHT_LINE = 7;

const NB_COLLECTIBLE = 2;
const TIMER_COLLECTIBLES = 3000;//15000


Collectible = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = '#00ff00';
    this.type = "Unknown";
}

Collectible.prototype.draw = function(viewport) {
    var ctx = jaws.context;
    ctx.beginPath();
    ctx.moveTo(this.x - viewport.x, this.y - this.height - viewport.y);
    ctx.lineTo(this.x - viewport.x, this.y - viewport.y);
    ctx.lineTo(this.x + this.width - viewport.x, this.y - viewport.y);
    ctx.lineTo(this.x + this.width - viewport.x, this.y - this.height - viewport.y);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
    ctx.fill();
}

Collectibles = function() {
    this.collectibles = [];
    this.timer = new Timer();
    this.timer.start();
}


Collectibles.prototype.createCollectible = function(x, collectible) {
    var b = new SAT.Box(new SAT.Vector(x, y), collectible.width, collectible.height);
    this.collectibles.push({sprite: collectible, box: b, type: collectible.type});
}

Collectibles.prototype.manageCollectibles = function(viewport) {
    if( this.timer.getInterval() >= TIMER_COLLECTIBLES) {
        this.timer.reset();
        collectibleId = Math.floor(Math.random() * NB_COLLECTIBLE) + 1;
        var collectible = null;
        x = Math.floor(Math.random() * (viewport.x + viewport.width)) + viewport.x;
        y = Math.floor(Math.random() * (viewport.y + viewport.height)) + viewport.y;
        switch(collectibleId) {
            case 1:
                collectible = new BonusWidth(x, y, WIDTH_TRIANGLE * 2 + WIDTH_LINE, HEIGHT_TRIANGLE);
            break;
            case 2:
                collectible = new BonusHeight(x, y, WIDTH_TRIANGLE, HEIGHT_TRIANGLE * 2 + HEIGHT_LINE);
            break;
        }
        this.createCollectible(x, collectible);
    }
}

Collectibles.prototype.collidedAt = function(character_hitbox) {
    for(var index = 0; index < this.collectibles.length; ++index) {
        var response = new SAT.Response();
        var collided = SAT.testPolygonPolygon(character_hitbox.toPolygon(), this.collectibles[index].box.toPolygon(), response);
        if(collided) {
            var type = this.collectibles[index].type;
            this.collectibles.splice(index, 1);
            return type;
        }
    }
    return false;
}

Collectibles.prototype.draw = function(viewport) {
    for(var i = 0; i < this.collectibles.length; i++) {
        this.collectibles[ i ].sprite.draw(viewport);
    }
}



BonusWidth = function (x, y, width, height) {
    Collectible.call(this, x, y, width, height);
    this.color = "#00f000";
    this.type = TYPE_BONUS_HEIGHT;
    this.widthTriangle = WIDTH_TRIANGLE;
    this.heightTriangle = HEIGHT_TRIANGLE;
    this.widthLine = WIDTH_LINE;
    this.heightLine = HEIGHT_LINE;

}


BonusWidth.prototype.draw = function(viewport) {
    var ctx = jaws.context;
    //left triangle
    ctx.beginPath();
    ctx.moveTo(this.x - viewport.x + this.widthTriangle/2, this.y - this.heightTriangle - viewport.y);
    ctx.lineTo(this.x + this.widthTriangle/2 + this.widthTriangle - viewport.x, this.y - viewport.y);
    ctx.lineTo(this.x - this.widthTriangle/2 - viewport.x, this.y - viewport.y);
    ctx.fill();
    ctx.fillStyle = this.color;
    ctx.fill();

    //central stripe
    var newOrigin = {x: this.x + this.widthTriangle/2 - this.heightLine/2, y: this.y + this.heightLine + this.heightTriangle}
    ctx.beginPath();
    ctx.moveTo(newOrigin.x - viewport.x, newOrigin.y - this.widthLine - viewport.y);
    ctx.lineTo(newOrigin.x - viewport.x, newOrigin.y - viewport.y);
    ctx.lineTo(newOrigin.x + this.heightLine - viewport.x, newOrigin.y - viewport.y);
    ctx.lineTo(newOrigin.x + this.heightLine - viewport.x, newOrigin.y - this.widthLine - viewport.y);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    //right triangle
    newOrigin = {x: this.x, y: this.y + this.heightLine + this.heightTriangle} 
    ctx.beginPath();
    ctx.moveTo(newOrigin.x - viewport.x + this.widthTriangle/2, newOrigin.y + this.heightTriangle - viewport.y);
    ctx.lineTo(newOrigin.x +this.widthTriangle/2 + this.widthTriangle - viewport.x, newOrigin.y - viewport.y);
    ctx.lineTo(newOrigin.x - this.widthTriangle/2 - viewport.x, newOrigin.y - viewport.y);
    ctx.fill();
    ctx.fillStyle = this.color;
    ctx.fill();
}



BonusHeight = function (x, y, width, height) {
    Collectible.call(this, x, y, width, height);
    this.color = "#00f0ff";
    this.type = TYPE_BONUS_WIDTH;
    this.widthTriangle = WIDTH_TRIANGLE;
    this.heightTriangle = HEIGHT_TRIANGLE;
    this.widthLine = 20;
    this.heightLine = 7;

}


BonusHeight.prototype.draw = function(viewport) {
    var ctx = jaws.context;
    //left triangle
    ctx.beginPath();
    ctx.moveTo(this.x - viewport.x, this.y - viewport.y);
    ctx.lineTo(this.x + this.widthTriangle - viewport.x, this.y - this.heightTriangle - viewport.y);
    ctx.lineTo(this.x + this.widthTriangle - viewport.x, this.y + this.heightTriangle - viewport.y);
    ctx.fill();
    ctx.fillStyle = this.color;
    ctx.fill();

    //central stripe
    var newOrigin = {x: this.x + this.widthTriangle, y: this.y + this.heightLine/2}
    ctx.beginPath();
    ctx.moveTo(newOrigin.x - viewport.x, newOrigin.y - this.heightLine - viewport.y);
    ctx.lineTo(newOrigin.x - viewport.x, newOrigin.y - viewport.y);
    ctx.lineTo(newOrigin.x + this.widthLine - viewport.x, newOrigin.y - viewport.y);
    ctx.lineTo(newOrigin.x + this.widthLine - viewport.x, newOrigin.y - this.heightLine - viewport.y);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    // right triangle
    newOrigin = {x: newOrigin.x + this.widthLine, y: this.y} 
    ctx.beginPath();
    ctx.moveTo(newOrigin.x + this.widthTriangle - viewport.x, newOrigin.y - viewport.y);
    ctx.lineTo(newOrigin.x - viewport.x, newOrigin.y - this.heightTriangle - viewport.y);
    ctx.lineTo(newOrigin.x - viewport.x, newOrigin.y + this.heightTriangle - viewport.y);
    ctx.fill();
    ctx.fillStyle = this.color;
    ctx.fill();

}