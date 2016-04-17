//10seconds
const TIMER = 10000;
const MAX_NB_BLOCS = 12;
const MIN_Y_ORIGIN = 500; 
const TIMER_DECREASE = 50;

function TileSet (viewport,cell_size )
{   
    var m_viewport;
    var m_spriteList;
    var m_max_width_created;
    var m_collision_boxes;
    var m_timer;

    this.constructor  = function () {
        m_viewport = viewport ;
        m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] , cell_size: [cell_size,cell_size]});
        m_spriteList = new jaws.SpriteList();
        m_timer = new Timer();
        this.init();
    }

    this.init = function() {
        m_viewport = viewport ;
        m_currentLevel = 1;
        m_max_width_created = 0;
        m_collision_boxes = [];
        this.createColumn(150, 510, 4);
        this.createColumn(500, 540, 2);
        m_timerObject = TIMER;
        m_timer.reset();

    }

    this.reset = function() {
        this.init();
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

    this.deleteCollisionBox = function(viewport) {
        for (var i = 0; i <  m_collision_boxes.length; i++) {
            if (viewport.x - viewport.width > m_collision_boxes[ i ].polygon.pos.x) {
                m_collision_boxes.splice(i, 1);
            }
        }
    }

    this.manageTiles = function(viewport) {
        //delete unecessary tiles
        this.deleteTiles(viewport);
        this.deleteCollisionBox(viewport);
        //add new one
        if (m_max_width_created < viewport.x + viewport.width) {
            m_max_width_created = this.createFloor(m_max_width_created);
        }
        //console.log(m_timer.getInterval());
        //var randomPattern = Math.floor(Math.random() * BORNE_MAX) + 1;
        if (m_timer.getInterval() > m_timerObject) {
            var yOrigin = MIN_Y_ORIGIN;
            var nbBlocs = Math.floor(Math.random() * MAX_NB_BLOCS) + 1;
            m_max_width_created = this.createColumn(m_max_width_created, yOrigin, nbBlocs);
            m_timerObject -= TIMER_DECREASE;
            m_timer.reset();
        }
    }

    this.createFloor = function(offset) {
        var blocks = new SpriteList();
        for (var x = 0; x < m_viewport.width; x += m_tile_map.cell_size[0]) {

            blocks.push( new Sprite({image: "test.png", x: offset + x, y: FLOOR_Y}));
        }
        m_tile_map.push(blocks);

        var b = new SAT.Box(new SAT.Vector(offset, FLOOR_Y), m_viewport.width, m_tile_map.cell_size[1]);
        m_collision_boxes.push({polygon: b, offset: offset});

        return offset + m_viewport.width;
    }

    this.createColumn = function(offset, yOrigin, nbBlocs) {
        var blocks = new SpriteList();
        for(var nb = 1; nb <= nbBlocs ; nb++) {
            blocks.push( new Sprite({image: "floor.png", x: offset, y: yOrigin -  nb * m_tile_map.cell_size[1]}));
        }
        m_tile_map.push(blocks);
        var b = new SAT.Box(new SAT.Vector(offset, yOrigin - nbBlocs * m_tile_map.cell_size[1]), m_tile_map.cell_size[0], nbBlocs * m_tile_map.cell_size[1]);
        m_collision_boxes.push({polygon: b, offset: offset});

        return offset;
    }

    this.getCollisionBoxes = function () {
        return m_collision_boxes;
    }

    this.collidedAt = function(character_hitbox) {
        for(var index = 0; index < m_collision_boxes.length; ++index) {
            var response = new SAT.Response();
            var collided = SAT.testPolygonPolygon(character_hitbox.toPolygon(), m_collision_boxes[index].polygon.toPolygon(), response);
            if(collided) {
                return response;
            }
        }
        return false;
    }


    // this.loadLevel = function  ()
    // {
    
    //    m_spriteList = new jaws.SpriteList();
    //    m_spriteList.load(jaws.assets.get("level1.json")); 
    //     m_tile_map = new jaws.TileMap({size : [m_viewport.max_x/cell_size+10,m_viewport.max_y/cell_size+10] ,cell_size: [cell_size,cell_size]});
    //     m_tile_map.push(m_spriteList);

    // }
}
