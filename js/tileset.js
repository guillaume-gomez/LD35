//10seconds
const TIMER = 2500;
const MAX_NB_BLOCS = 12;
const MIN_Y_ORIGIN = 500; 
const TIMER_DECREASE = 50;
const MAX_HOLE = 10;
const MAX_ELEMENT = 2;

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

        this.createInversedL(200, 400, 5);

        m_max_width_created = this.createFloor(0);
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
        m_spriteList.removeIf(viewport.isLeftOf);
    }

    this.manageTiles = function(viewport) {
        //delete unecessary tiles
        this.deleteTiles(viewport);
        this.deleteCollisionBox(viewport);
        //add new one
        if (m_max_width_created < viewport.x + viewport.width) {
            m_max_width_created = this.handleFloor(m_max_width_created);
        }
        //var randomPattern = Math.floor(Math.random() * BORNE_MAX) + 1;
        if (m_timer.getInterval() > m_timerObject) {
            var yOrigin = MIN_Y_ORIGIN;
            var object = Math.floor(Math.random() * MAX_ELEMENT) + 1;
            switch(object) {
                case 1:
                    {
                        var nbBlocs = Math.floor(Math.random() * MAX_NB_BLOCS) + 1;
                        m_max_width_created = this.createColumn(m_max_width_created, yOrigin, nbBlocs);
                    }
                break;
                case 2:
                    m_max_width_created = this.createPyramide(m_max_width_created);
                break;
            }
            m_timerObject -= TIMER_DECREASE;
            m_timer.reset();
        }
    }

    this.handleFloor = function (offset) {
        var f_nb = Math.floor(Math.random() * 2) + 1;
        switch(f_nb) {
            case 1:
                return this.createFloor(offset);
            break;
            case 2:
                return this.createHole(offset);
            break;
        }
    }

    this.createLine = function(offsetX, offsetY, width, tile) {
        var blocks = new SpriteList();
        for (var x = offsetX; x < offsetX + width; x += m_tile_map.cell_size[0]) {
           m_spriteList.push( new Sprite({image: tile, x: x, y: offsetY}));
        }
        var b = new SAT.Box(new SAT.Vector(offsetX, offsetY), width, m_tile_map.cell_size[1]);
        m_collision_boxes.push({polygon: b, offset: offsetX});

        return offsetX + width;
    }

    //if direction = 0
    // *  
    // * *
    // * * *
    // else = 1
    //     *
    //   * *
    // * * *
    //////////////
    this.createTriangle = function (offsetX, offsetY, width, height, tile, heightStep = 1, direction = 1) {
        for(var y = offsetY, x = 1; y >= (offsetY - height); y -= m_tile_map.cell_size[1], ++x) {
            this.createLine(
                offsetX + direction * heightStep *(x * m_tile_map.cell_size[0]),
                y,
                width - (x * m_tile_map.cell_size[0]) * heightStep,
                tile
            );
        }
        return offsetX + width - m_tile_map.cell_size[0];
    }


    this.createFloor = function(offset, tile) {
        for (var x = 0; x < m_viewport.width; x += m_tile_map.cell_size[0]) {
            m_spriteList.push(new Sprite({image: "floor.png", x: offset + x, y: FLOOR_Y}));
        }

        var b = new SAT.Box(new SAT.Vector(offset, FLOOR_Y), m_viewport.width, m_tile_map.cell_size[1]);
        m_collision_boxes.push({polygon: b, offset: offset});

        return offset + m_viewport.width;
    }


    this.createHole = function(offset) {
        var nbBlocsRemoved = Math.floor(Math.random() * MAX_HOLE) + 2;
        for (var x = 0, index = 0; x <= m_viewport.width; x += m_tile_map.cell_size[0], index++) {
            if( index > nbBlocsRemoved) {
                m_spriteList.push( new Sprite({image: "floor.png", x: offset + x, y: FLOOR_Y}));
            }
        }

        var b = new SAT.Box(new SAT.Vector(offset + nbBlocsRemoved * m_tile_map.cell_size[0], FLOOR_Y), m_viewport.width - (nbBlocsRemoved * m_tile_map.cell_size[0]), m_tile_map.cell_size[1]);
        m_collision_boxes.push({polygon: b, offset: offset});

        return offset + m_viewport.width;
    }

    this.createColumn = function(offset, yOrigin, nbBlocs, image = "floor.png") {
        for(var nb = 1; nb <= nbBlocs ; nb++) {
             m_spriteList.push( new Sprite({image: image, x: offset, y: yOrigin -  nb * m_tile_map.cell_size[1]}));
        }   
        var b = new SAT.Box(new SAT.Vector(offset, yOrigin - nbBlocs * m_tile_map.cell_size[1]), m_tile_map.cell_size[0], nbBlocs * m_tile_map.cell_size[1]);
        m_collision_boxes.push({polygon: b, offset: offset});

        return offset + m_tile_map.cell_size[0];
    }

    this.createPyramide = function(offsetX, heightStep = 1) {
        const min_width = m_tile_map.cell_size[0] * 4;
        const min_height = m_tile_map.cell_size[1];
        var width = Math.floor(Math.random() * 3 * min_width) + min_width;
        var height = Math.floor(Math.random() * 6 * min_height) + min_height;
        
        var pos = this.createTriangle(offsetX, FLOOR_Y, width, height, "red.png", heightStep, 1);
        this.createTriangle(pos, FLOOR_Y, width, height, "red.png", heightStep, 0);
        
        return offsetX + width * 2;
    }

    this.createL = function(offset, yOrigin, nbBlocs) {
        var tileUrl = "orange.png";
        var min_width = m_tile_map.cell_size[0] * 2;
        var width =  Math.floor(Math.random() * 3 * min_width) + min_width;
        
        var newOffset = this.createLine(offset, yOrigin - m_tile_map.cell_size[1], width, tileUrl);
        this.createColumn(offset, yOrigin, nbBlocs, tileUrl);
        return newOffset + offset;
    }

    this.createInversedL = function(offset, yOrigin, nbBlocs) {
        var tileUrl = "blue.png";
        var min_width = m_tile_map.cell_size[0] * 2;
        var width =  Math.floor(Math.random() * 3 * min_width) + min_width;
        
        var newOffset = this.createLine(offset, yOrigin - (nbBlocs+1) * m_tile_map.cell_size[1], width, tileUrl);
        this.createColumn(offset, yOrigin, nbBlocs, tileUrl);
        return newOffset + offset;
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
}
