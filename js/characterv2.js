/**
* @brief : Classe qui gere le héros 
**/

CharacterV2 = function(image, frame_width, frame_height, frame_duration, viewport, urlSound) {
    this.m_player = new jaws.Sprite({x:150, y: 100 , anchor:"left_bottom"});
    this.m_player.width = 30;
    this.m_player.height = 30;
    this.m_player.left_offset   = this.m_player.width * this.m_player.anchor_x
    this.m_player.top_offset    = this.m_player.height * this.m_player.anchor_y
    this.m_player.right_offset  = this.m_player.width * (1.0 - this.m_player.anchor_x)
    this.m_player.bottom_offset = this.m_player.height * (1.0 - this.m_player.anchor_y)
    this.m_player.vx = 2;
    this.m_player.vy = 0;
    this.m_player.can_jump = true;
    this.hitbox = new SAT.Box(new SAT.Vector(this.m_player.x, this.m_player.y), this.m_player.width, this.m_player.height);

    this.m_speed = 2;
    this.m_jumpHeight = 8;
    this.m_vie = true;
    this.m_sens = 1;
    this.m_locked = false;
    this.m_goLeft = false;
    this.m_goRight = false;
}

CharacterV2.prototype.update = function () {
    this.show();
    //Si touche gauche enfoncé
    if (jaws.pressed("left") || jaws.pressed("q"))
    { 
        this.m_player.vx -= this.m_speed ; 
        this.m_goLeft = true;
        this.m_sens = -1;
    }
    //Si touche doite enfoncé
    else if (jaws.pressed("right") || jaws.pressed("d"))
    { 
        this.m_player.vx += this.m_speed;
        this.m_goRight = true;
        this.m_sens = 1 ;
    }    
    
    //Si touche haut enfoncé
     if (jaws.pressed("up") || jaws.pressed("space"))
    {
        if(this.m_player.can_jump) 
        { 
            this.m_player.vy -= this.m_jumpHeight;
            this.m_player.can_jump = false;
        }
    }
}

CharacterV2.prototype.secondDraw = function(viewport) {
    var ctx = jaws.context;
   
    ctx.beginPath();
    ctx.moveTo(this.m_player.x - viewport.x, this.m_player.y - this.m_player.height - viewport.y);
    ctx.lineTo(this.m_player.x - viewport.x, this.m_player.y - viewport.y);
    ctx.lineTo(this.m_player.x + this.m_player.width - viewport.x, this.m_player.y - viewport.y);
    ctx.lineTo(this.m_player.x + this.m_player.width - viewport.x, this.m_player.y - this.m_player.height - viewport.y);
    ctx.fillStyle = "#F3E686";
    ctx.closePath();
    ctx.fill();
}

CharacterV2.prototype.getPosition = function () {
    return { "x": this.m_player.x, "y": this.m_player.y }
}
     
CharacterV2.prototype.move = function (level)
{
    // Gravity
    this.m_locked = false ;
    this.m_player.vy += gravity;
    
    this.m_player.move( this.m_player.vx , 0 );
    var hitbox_vx = new SAT.Box(new SAT.Vector(this.m_player.x, this.m_player.y), this.m_player.width, this.m_player.height);
    if(level.collidedAt(hitbox_vx))
    { 
        this.m_sens = (this.m_player.vx < 0) ? -1 : 1 ;
        this.m_locked = true ;
        this.m_player.move( - this.m_player.vx , 0 );
    }
    this.m_player.vx = 0;
    
    this.m_player.move( 0 , this.m_player.vy );
    //Collision objets
    var hitbox_vy = new SAT.Box(new SAT.Vector(this.m_player.x, this.m_player.y), this.m_player.width, this.m_player.height);
    var response = level.collidedAt(hitbox_vy);
    if(response) 
    { 
        if(this.m_player.vy > 0 )//Falling
        {    
            this.m_player.move(0 ,- response.overlapV.y - 0.001 );
            this.m_player.can_jump = true ;
        }//Jump
        else if(this.m_player.vy < 0) 
        {
            this.m_player.move(0 , + response.overlapV.y + this.m_player.height);
        }    
        this.m_player.vy = 0;
    }


    this.hitbox.pos.x = this.m_player.x;
    this.hitbox.pos.y = this.m_player.y;

}
    
CharacterV2.prototype.show = function () 
{
    this.m_goLeft = this.m_goRight = false ;
}
    

CharacterV2.prototype.getPlayer = function ()
{
    return this.m_player;
}

CharacterV2.prototype.draw = function() 
{
    this.m_player.draw();
}


CharacterV2.prototype.getX = function()
{
    return this.m_player.x;
}


CharacterV2.prototype.getY = function()
{
    return this.m_player.y;
}
    

CharacterV2.prototype.setX = function( _x)
{
    this.m_player.x = _x;
}


CharacterV2.prototype.setY = function( _y)
{
     this.m_player.y = _y;
}

CharacterV2.prototype.isAlive = function  ()
{
    return this.m_vie;
}


CharacterV2.prototype.setAlive = function ( vie )
{
    this.m_vie = vie ;
}

CharacterV2.prototype.rect = function ()
{
    return this.m_player.rect();
}