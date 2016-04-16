
function Game ()
{
    var m_perso;
    var m_viewport;
    var m_level;
    var m_background;
    var cell_size;

    this.setup = function () {
        live_info = document.getElementById("live_info");
        cell_size = 30;
        gravity = 0.4;
        
        //Viewport
        m_viewport = new jaws.Viewport({max_x: jaws.width*1.5, max_y: jaws.height*1.5});
         
        m_perso = new Character("foo.png",64,205,85,m_viewport , 'gunFX');
        m_perso.constructor();
        
        m_level = new TileSet(m_viewport, cell_size );
        m_level.constructor();
        
        
        m_background = new Sound ('music.ogg','music.mp3');
        m_background.constructor();
        
        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);

        StopSounds();
    }
    
    
    this.update = function () {
        if ( jaws.pressed('r') )
        {
            resetAll();
        }
        
        if ( m_perso.isAlive() )
        {
            m_perso.update();
            m_perso.move(m_tile_map );
            m_viewport.centerAround(m_perso.getPlayer() );
        }
        else
        {
            resetLevel();
        }

        m_background.update();
            
        //Infos
        live_info.innerHTML = jaws.game_loop.fps + " fps. Player: " ;+ parseInt(m_perso.getX()) + "/" + parseInt(m_perso.getY()) + ". ";
           live_info.innerHTML += "Viewport: " + parseInt(m_viewport.x) + "/" + parseInt(m_viewport.y) + ".";
    }
    
   
    this.draw = function () {
        jaws.clear();
        m_viewport.drawTileMap( m_level.getTileMap() ) ;
        if ( m_perso.isAlive() )
        {
            m_viewport.draw(m_perso.getPlayer());
        }
    }
    
   
    function changeLevel () {
        m_level.incrementcurrentLevel();
        m_level.loadLevel();
        MakeEnnemy();
    }
    
    
    function resetLevel () {
        m_perso.setAlive(true);
    }
    
    function resetAll() {
        m_level.setcurrentLevel(1);
        m_level.loadLevel();
        m_perso.setAlive(true);
    }
    
    function StopSounds () {
        m_background.stop();
    }
}

