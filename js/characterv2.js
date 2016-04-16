/**
* @brief : Classe qui gere le héros 
**/

CharacterV2 = function(image, frame_width, frame_height, frame_duration, viewport, urlSound) {
    this.m_player = new jaws.Sprite({ scale : 0.45 ,x:100, y: 200 , anchor:"left_bottom"});
    this.m_player.animation = new jaws.Animation({sprite_sheet: jaws.assets.get(image), frame_size: [frame_width,frame_height], frame_duration: frame_duration , orientation :"right"});
    this.m_player.setImage(this.m_player.animation.frames[0]);
    this.m_player.go_right = this.m_player.animation.slice(0,3);
    this.m_player.go_left = this.m_player.animation.slice(4,7);
    this.m_player.vx = this.m_player.vy = 0;
    this.m_player.can_jump = true;

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
        if(this.this.m_player.can_jump) 
        { 
            this.m_player.vy -= this.m_jumpHeight;
            this.m_player.can_jump = false;
        }
    }
}

// Ray.prototype.draw = function(viewport) {
//     var cxt = jaws.context;
//     cxt.fillStyle = '#f00';
//     cxt.beginPath();
//     cxt.moveTo(this.topLeft.x - viewport.x, this.topLeft.y - viewport.y);
//     cxt.lineTo(this.bottomLeft.x - viewport.x, this.bottomLeft.y  - viewport.y);
//     cxt.lineTo(this.bottomRight.x - viewport.x, this.bottomRight.y  - viewport.y);
//     cxt.lineTo(this.topRight.x -viewport.x, this.topRight.y  - viewport.y);
//     cxt.closePath();
//     cxt.fill();
// };

CharacterV2.prototype.getPosition = function () {
    return { "x": this.m_player.x, "y": this.m_player.y }
}
     
CharacterV2.prototype.move = function (tile_map)
{
    //gestion de le reflexion;
    var x = this.m_player.x;
    var y = this.m_player.y;
    y -=  this.m_player.height*3/4 - 4 ; 
    if ( this.m_sens  == 1)
    {
        x += this.m_player.width ;
    }

    // Gravity
    this.m_player.vy += gravity;
    this.m_locked = false ;
        this.m_player.move( this.m_player.vx , 0 );
        if(tile_map.atRect(this.getRect()).length > 0)
        { 
            this.m_sens = (this.m_player.vx < 0) ? -1 : 1 ;
            this.m_locked = true ;
            this.m_player.move( - this.m_player.vx , 0 );
        }
        this.m_player.vx = 0;
        
        this.m_player.move( 0 , this.m_player.vy );
        //Collision objets
        blocks_y = tile_map.atRect(this.getRect())[0];
        if( blocks_y ) 
        { 
            if(this.m_player.vy > 0 )//Falling
            {    
                this.m_player.moveTo( this.m_player.x , blocks_y.rect().y - 0.001 );
                this.m_player.can_jump = true ;
            }//Jump
            else if(this.m_player.vy < 0) 
            {
                this.m_player.moveTo(this.m_player.x , blocks_y.rect().bottom + this.m_player.height);
            }    
            this.m_player.vy = 0;
        }
}
    
CharacterV2.prototype.show = function () 
{
    if ( this.m_sens  == 1 )
    {
         if ( this.m_goRight )
        {
            this.m_player.setImage( this.m_player.go_right.next() );
        }            
        else
        {
            this.m_player.setImage( this.m_player.animation.frames[0] );
        }
    }
    else 
    {
         if ( this.m_goLeft )
        {
            this.m_player.setImage( this.m_player.go_left.next() );
        }

        else
        {
            this.m_player.setImage( this.m_player.animation.frames[4] );
        }
        
    }
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

CharacterV2.prototype.getRect = function ()
{
    var temp = new jaws.Rect( this.m_player.rect().x , this.m_player.rect().y  , 45 , this.m_player.rect().height );
    return temp;
}