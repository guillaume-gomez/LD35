/**
* @brief : Classe qui gere le niveau
**/

function TileSet (viewport,cell_size )
{   
    var m_viewport;
    var m_spriteList;
    var m_currentLevel;
    var m_max_width_created;

    this.constructor  = function () {
        m_viewport = viewport ;
        m_currentLevel = 1;
        m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] , cell_size: [cell_size,cell_size]});
        m_spriteList = new jaws.SpriteList();
        m_max_width_created = 0;
        //this.loadLevel();
        this.createFloor(0);
        this.createFloor(m_viewport.width);
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

    this.createFloor = function(offset) {
        var blocks = new SpriteList();
        debugger
        for (var x = 0; x < m_viewport.width; x += cell_size) {

            blocks.push( new Sprite({image: "test.png", x: offset + x, y: 570}));
        }
        m_tile_map.push(blocks);
    }

    this.addTiles = function(viewport) {
        var blocks = new SpriteList();
        for(var i = 0; i < 5; ++i) {
            blocks.push( new Sprite({image: "floor.png", x: (1000)+(i+1)*cell_size, y: 500% cell_size}) )
        }
        m_tile_map.push(blocks);
    }
}
