const RANDOM_BONUS = 100;
const CREATE_BONUS = 8;
const TYPE_BONUS_HEIGHT = "bonus_height";
const TYPE_BONUS_WIDTH = "bonus_width";


Collectible = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = '#00ff00';
    this.type = "Unknown";
    //this.m_scoring = new jaws.Text({text: this.text, x: x, y: y});
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
}


Collectibles.prototype.createBonus = function(offset) {
    y = 500;
    var bonusGraphics = new BonusHeight(offset, y, 30, 30);
    var b = new SAT.Box(new SAT.Vector(offset, y), bonusGraphics.width, bonusGraphics.height);
    this.collectibles.push({sprite: bonusGraphics, box: b, type: bonusGraphics.type});

    return offset;
}

Collectibles.prototype.manageCollectibles = function() {

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



BonusHeight = function (x, y, width, height) {
    Collectible.call(this, x, y, width, height);
    this.color = "#00f000";
    this.type = TYPE_BONUS_HEIGHT;

}

BonusHeight.prototype.draw = function(viewport) {
   Collectible.prototype.draw.call(this, viewport);
}


BonusWidth = function (x, y, width, height) {
    Collectible.call(this, x, y, width, height);
    this.color = "#00f0ff";
    this.type = TYPE_BONUS_WIDTH;

}

BonusWidth.prototype.draw = function(viewport) {
   Collectible.prototype.draw.call(this, viewport);
}
