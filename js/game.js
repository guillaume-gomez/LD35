
const FLOOR_Y = 570
const MIN_HEIGHT = 5;

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
        m_viewport = new jaws.Viewport({max_x: jaws.width*60, max_y: jaws.height*1.5});
         
        m_perso = new CharacterV2("foo.png",64,205,85, m_viewport , 'gunFX');
        
        m_level = new TileSet(m_viewport, cell_size );
        m_level.constructor();
        m_level.createColumn(150, 510, 4);
        m_level.createColumn(500, 540, 2);
        
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
            m_perso.move(m_level);
            m_viewport.centerAround(m_perso.getPlayer() );
        }
        else
        {
            resetLevel();
        }

        m_background.update();
        m_level.manageTiles(m_viewport);
        //Infos
        live_info.innerHTML = jaws.game_loop.fps + " fps. Player: " + parseInt(m_perso.getPosition().x) + "/" + parseInt(m_perso.getPosition().y) + ". ";
        live_info.innerHTML += "Viewport: " + parseInt(m_viewport.x) + "/" + parseInt(m_viewport.y) + ".";
    }
    
   
    this.draw = function () {
        jaws.clear();
        m_viewport.drawTileMap( m_level.getTileMap() ) ;
        if ( m_perso.isAlive() )
        {
            m_perso.secondDraw(m_viewport);
        }
    }
    
    function resetLevel () {
        m_perso.init();
        m_level.reset();
    }
    
    function resetAll() {
        m_perso.setAlive(true);
    }
    
    function StopSounds () {
        m_background.stop();
    }
}

