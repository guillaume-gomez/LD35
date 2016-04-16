/**
* @brief : Classe qui gere le niveau
**/

function TileSet (viewport,cell_size )
{   
    var m_viewport;
    var m_spriteList;
    var m_currentLevel;

    this.constructor  = function () {
        m_viewport = viewport ;
        m_currentLevel = 1;
        m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] , cell_size: [cell_size,cell_size]});
        m_spriteList = new jaws.SpriteList();
        this.loadLevel();
    }
    
    this.getSpriteList = function() {
        return m_spriteList;
    
    }
    
    this.getTileMap = function () {
        return m_tile_map;
    }

    this.getcurrentLevel = function () {
        return  m_currentLevel;
    }
    
    this.setcurrentLevel = function (value) {
         m_currentLevel = value;
    }
    
    this.incrementcurrentLevel = function () {
         m_currentLevel++;
    }

    this.loadLevel = function() {
    
       m_spriteList = new jaws.SpriteList();
       m_spriteList.load(jaws.assets.get("level"+m_currentLevel+".json")); 
        m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] ,cell_size: [cell_size,cell_size]});
        m_tile_map.push(m_spriteList);

    }

    this.deleteTiles = function(viewport) {
        for(var col=0; col < m_tile_map.cells.length; col++) {
           for(var row=0; row < m_tile_map.cells[col].length; row++) {
                var item = m_tile_map.cells[col][row];
                if (item.length > 0 && viewport.isLeftOf(item[0])) {  
                    m_tile_map.cells[col].splice(row, 1);
                }
            }
        }
    }

    this.addTiles = function(viewport) {
        var blocks = new SpriteList();
        for(var i = 0; i < 5; ++i) {
            blocks.push( new Sprite({image: "floor.png", x: (1000)+(i+1)*cell_size, y: 500% cell_size}) )
        }
        m_tile_map.push(blocks);
    }
}
