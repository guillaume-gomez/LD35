/**
* @brief : Classe qui gere le niveau
**/

const FLOOR_Y = 570

function TileSet (viewport,cell_size )
{   
    var m_viewport;
    var m_spriteList;
    var m_max_width_created;

    this.constructor  = function () {
        m_viewport = viewport ;
        m_currentLevel = 1;
        m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] , cell_size: [cell_size,cell_size]});
        m_spriteList = new jaws.SpriteList();
        m_max_width_created = 0;
    }
    
    this.getSpriteList = function() {
        return m_spriteList;
    
    }
    
    this.getTileMap = function () {
        return m_tile_map;
    }

    this.deleteTiles = function(viewport) {
        var deletion = false;
        for(var col=0; col < m_tile_map.cells.length; col++) {
           for(var row=0; row < m_tile_map.cells[col].length; row++) {
                var item = m_tile_map.cells[col][row];
                if (item.length > 0 && viewport.isLeftOf(item[0])) {  
                    m_tile_map.cells[col].splice(row, 1);
                    deletion = true;
                }
            }
        }
        return deletion;
    }

    this.manageTiles = function(viewport) {
        //delete unecessary tiles
        this.deleteTiles(viewport);
        //add new one
        if (m_max_width_created < viewport.x + viewport.width) {
            m_max_width_created = this.createFloor(m_max_width_created + 15);
        }
    }

    this.createFloor = function(offset) {
        var blocks = new SpriteList();
        for (var x = 0; x < m_viewport.width; x += cell_size) {

            blocks.push( new Sprite({image: "test.png", x: offset + x, y: FLOOR_Y}));
        }
        m_tile_map.push(blocks);
        return offset + m_viewport.width;
    }

    // this.loadLevel = function  ()
    // {
    
    //    m_spriteList = new jaws.SpriteList();
    //    m_spriteList.load(jaws.assets.get("level1.json")); 
    //     m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] ,cell_size: [cell_size,cell_size]});
    //     m_tile_map.push(m_spriteList);

    // }
}
