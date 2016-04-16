/**
* @brief : Classe qui gere le héros 
**/

function Character(image,frame_width,frame_height,frame_duration , viewport , urlSound)
{
    //////////////////////////////////////////////////////////////
    // Attributs
    /////////////////////////////////////////////////////////////
    var m_player;
    var m_speed;
    var m_jumpHeight;
    var m_vie;
    var m_sens;
    var m_locked ;
    var m_goLeft;
    var m_goRight;
    var m_wen
    
    ///////////////////////////////////////////////////////////////
    // Méthodes
    ///////////////////////////////////////////////////////////////
    /**
    * @brief : Constructeur de la classe Personnage
    **/
    this.constructor = function()
    {
        //on définie la valeur des variables
        //@note : je voudrais par la suite que toutes les affectation se fasse dans le constructeur
        m_speed = 2;
        m_jumpHeight = 8;
      
        m_player = new jaws.Sprite({ scale : 0.45 ,x:100, y: 200 , anchor:"left_bottom"});
        m_player.animation = new jaws.Animation({sprite_sheet: jaws.assets.get(image), frame_size: [frame_width,frame_height], frame_duration: frame_duration , orientation :"right"});
        m_player.setImage(m_player.animation.frames[0]);
        m_player.go_right = m_player.animation.slice(0,3);
        m_player.go_left = m_player.animation.slice(4,7);
    
        m_player.vx = m_player.vy = 0;
        m_player.can_jump = true;
        m_sens = 1;

        m_vie = true ;
        m_crouch = false ;
        m_locked = false;
        m_goLeft = m_goRight = false;
        
        m_wen = new jaws.Rect();
        m_wen.width = m_wen.height = 6 ;
    
    }

    /**
    * @brief : Gestion des touches
    * @note : gravity est une variable globale
    **/
    this.update = function() 
    {
        this.show();
        //Si touche gauche enfoncé
        if (jaws.pressed("left") || jaws.pressed("q"))
        { 
            m_player.vx -= m_speed ; 
            m_goLeft = true;
            m_sens = -1;
        }
        //Si touche doite enfoncé
        else if (jaws.pressed("right") || jaws.pressed("d"))
        { 
            m_player.vx += m_speed;
            m_goRight = true;
            m_sens = 1 ;
        }    
        
        //Si touche haut enfoncé
         if (jaws.pressed("up") || jaws.pressed("space"))
        {
            if(m_player.can_jump) 
            { 
                m_player.vy -= m_jumpHeight;
                m_player.can_jump = false;            
            }
        }
            
        
    }

    this.getPosition = function () {
        return { "x": m_player.x, "y": m_player.y }
    }
     
     /**
     *@brief : Permet de mouvement du perso
     *@note : Variable globale qui stocke le level
     **/
    this.move = function (tile_map)
    {
        //gestion de le reflexion;
        var x = m_player.x;
        var y = m_player.y;
        y -=  m_player.height*3/4 - 4 ; 
        if ( m_sens  == 1)
        {
            x += m_player.width ;
        }

        // Gravity
        m_player.vy += gravity;
        m_locked = false ;
            m_player.move( m_player.vx , 0 );
            if(tile_map.atRect(this.getRect()).length > 0)
            { 
                m_sens = (m_player.vx < 0) ? -1 : 1 ;
                m_locked = true ;
                m_player.move( - m_player.vx , 0 );
            }
            m_player.vx = 0;
            
            m_player.move( 0 , m_player.vy );
            //Collision objets
            blocks_y = tile_map.atRect(this.getRect())[0];
            if( blocks_y ) 
            { 
                if(m_player.vy > 0 )//Falling
                {    
                    m_player.moveTo( m_player.x , blocks_y.rect().y - 0.001 );
                    m_player.can_jump = true ;
                }//Jump
                else if(m_player.vy < 0) 
                {
                    m_player.moveTo(m_player.x , blocks_y.rect().bottom + m_player.height);
                }    
                m_player.vy = 0;
            }
    //gestion de la loupe     
    m_wen.x = m_sens == 1 ? m_player.x + 23:  m_player.x + 1 ;
    m_wen.y = m_player.y - 50;
    }
    
    /**
    * @brief : gestion des sprites
    **/
    this.show = function () 
    {
        if ( m_sens  == 1 )
        {
            
             if ( m_goRight )
            {
                m_player.setImage( m_player.go_right.next() );
            }            
            else
            {
                m_player.setImage( m_player.animation.frames[0] );
            }
        }
        else 
        {
             if ( m_goLeft )
            {
                m_player.setImage( m_player.go_left.next() );
            }

            else
            {
                m_player.setImage( m_player.animation.frames[4] );
            }
            
        }
        m_goLeft = m_goRight = false ;
    }
    
    
    this.getWen = function ()
    {
        return m_wen;
    }
    
    /**
    * @brief : Accesseur de m_player
    **/
    this.getPlayer = function ()
    {
        return m_player;
    }

    /**
    *@brief : Dessine le personnage
    **/
    this.draw = function() 
    {
        m_player.draw();
    }
    
    /**
    *@brief : Accesseur de X
    **/
    this.getX = function()
    {
        return m_player.x;
    }
    
    /**
    *@brief : Accesseur de Y
    **/
    this.getY = function()
    {
        return m_player.y;
    }
        
    /**
    *@brief : Accesseur de X
    **/
    this.setX = function( _x)
    {
        m_player.x = _x;
    }
    
    /**
    *@brief : Accesseur de Y
    **/
    this.setY = function( _y)
    {
         m_player.y = _y;
    }


    /**
    *@brief : pour verifier l'etat du perso hors de sa classe
    **/
    this.isAlive = function  ()
    {
        return m_vie;
    }
    
    /**
    * @brief : Accesseur de l'etat
    **/
    this.setAlive = function ( vie )
    {
        m_vie = vie ;
    }
    
    /**
    *@brief : Accesseur de rect
    *@note : des valeurs par defaut peuvent changer
    **/
    this.getRect = function ()
    {
        var temp = new jaws.Rect( m_player.rect().x , m_player.rect().y  , 45 , m_player.rect().height );
        return temp;
    }

//end of class
}
