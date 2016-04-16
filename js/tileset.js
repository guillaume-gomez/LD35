/**
* @brief : Classe qui gere le niveau
**/

function TileSet (viewport,cell_size )
{
    //////////////////////////////////////////////////////////////////////////////////
    // Attributs
    //////////////////////////////////////////////////////////////////////////////////
    var m_viewport;
    var m_spriteList;
    var m_currentLevel;
    var m_indexSwitch;
    
    //////////////////////////////////////////////////////////////////////////////////
    // Méthodes
    /////////////////////////////////////////////////////////////////////////////////
    
    /**
    * @brief : Constructeur de la classe Tileset
    **/
    this.constructor  = function ()
    {
        m_viewport = viewport ;
        m_currentLevel = 1;    
        m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] , cell_size: [cell_size,cell_size]});
        m_spriteList = new jaws.SpriteList();
        m_indexSwitch = 0 ; 
        this.loadLevel();
    }
    
    /**
    * @brief : Recherche la porte
    **/
    function toSwitch ( i )
    {
            if ( JSON.parse(m_spriteList.at( i ).toJSON()).image == 'switch.png' )
            {    
                m_indexSwitch = i ;
            }
    }
    
    /**
    *@brief : Dessine le level
    **/
    this.draw = function()
    {
        m_spriteList.draw();
    
    }
    
    /**
    *@brief : Accesseur de spriteList
    **/
    this.getSpriteList = function()
    {
        return m_spriteList;
    
    }
    

    /**
    * @brief : Accesseur de m_tile_map
    * @note : Obsolète
    **/
    this.getTileMap = function ()
    {
        return m_tile_map;
    }

        
    /**
    * @brief : Accesseur pour la lecture du niveau , attribut m_currentLevel
    **/
    this.getcurrentLevel = function ()
    {
        return  m_currentLevel;
    }
    
    /**
    * @brief : Accesseur pour la lecture du niveau , attribut m_currentLevel
    **/
    this.setcurrentLevel = function ( value)
    {
         m_currentLevel = value;
    }
    
    /**
    * @brief : Accesseur pour la lecture du niveau , attribut m_currentLevel
    **/
    this.incrementcurrentLevel = function ()
    {
         m_currentLevel++;
    }

    
    
    /**
    * @brief : Gere le changement du niveau 
    * @note : condition de changement a modifier peut etre
    **/
    this.Istochange  = function( rayList )
    {
        
        if ( jaws.collideRects( m_spriteList.at( m_indexSwitch ).rect() , rayList.at(rayList.length - 1 ).rect() ) )
        {
            return true ;
        }
            return false ;
    }
    
    /**
    *@brief : traitement lors du chargement du niveau
    *@note : peut etre des parametres a rajoutées pour la taille et le cell_size
    **/
    this.loadLevel = function  ()
    {
    
       m_spriteList = new jaws.SpriteList();
       m_spriteList.load(jaws.assets.get("level"+m_currentLevel+".json")); 
        m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] ,cell_size: [cell_size,cell_size]});
        for ( var i = 0 ; i < m_spriteList.length ; i++ )
        {
            toSwitch(i);
        }    

        m_tile_map.push(m_spriteList);

    }
    
//end of class    
}
