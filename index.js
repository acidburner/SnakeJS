var app = {
    settings: {
        grid: {
            //size defines the length and width of the grid.
            size: 30,
            cellSize: "30px",
            borderColor: "black",
            borderSize: "1px",
            borderStyle: "solid"
        },
        player: {
            color: "black",
            //defines players starting cell size (default 5 cells)
            size: 5,
            head: {
                x: 15,
                y: 29
            },
            body: [],
            point: {
                x: 0,
                y: 0
            },
            growth: 3,
            curDirection: "north",
            newDirection: "north",
        },
        updateFreq: 8,
        intervalId: 0
        
    },
    startGame: function(){
        console.log("game started");
        app.drawGrid();
        app.drawPoint();
        app.drawPlayer(app.settings.player.head.x, app.settings.player.head.y);
        app.setControlEventListener();
        app.settings.intervalId = setInterval( app.updateLoop, ( 1000 / app.settings.updateFreq ) );
    },
    setControlEventListener: function() {
        $(document).on( "keypress", app.setControlEvent );
    },
    setControlEvent: function( event ) {
        console.log(event.key);
        switch( event.key ) {
            case "w":
                app.settings.player.newDirection = "north";
                break;
            case "a":
                app.settings.player.newDirection = "west";
                break;
            case "s":
                app.settings.player.newDirection = "south";
                break;
            case "d":
                app.settings.player.newDirection = "east";
                break;
        }
    },
    updateLoop: function(){
        console.log("update loop");
        //app.drawPoint();
        //player moves
        app.updatePlayer( app.settings.player.newDirection );
        app.checkHit();
        app.checkPoint();
        //check point intersect with head
        //if cell has class point and playerHead point was hit
            //increase size if true
            //add point
        //
        //
    },
    checkPoint: function(){
        var player = app.settings.player.body[0];
        var point = app.settings.player.point;
        if( player.x == point.x && player.y == point.y ) {
            console.log("ate point");
            app.settings.player.growth += 1;
            $(".point").removeClass("point");
            app.drawPoint();
        }
        
    },
    updatePlayer: function( newDirection ) {
        app.movePlayer( app.settings.player.curDirection, newDirection );
        app.drawPlayer( app.settings.player.head.x, app.settings.player.head.y );
    },
    checkHit: function(){
        app.checkWallHit( app.settings.player.head.x, app.settings.player.head.y );
        app.checkSelfHit();
    },
    checkWallHit: function(x, y) {
        //if the player hits a wall, end game
        if( x > app.settings.grid.size || x < 0
         || y > app.settings.grid.size || y < 0
        ) { 
            app.gameOver();
        }
    },
    checkSelfHit: function() {
        //if the players head hits its body, end game.
        for( i = 1; i < app.settings.player.body.length; i++ ) {
            if( $("#x" + app.settings.player.body[i].x + "-y" + app.settings.player.body[i].y).hasClass("head") ) {
                app.gameOver();
            }
        }
    },
    movePlayer: function( curDirection, newDirection ){
        console.log(curDirection, newDirection);
        switch( newDirection ) {
            case "north":
                if(curDirection == "south" ) {
                    return;
                }
                app.settings.player.head.y -= 1;
                app.settings.player.curDirection = "north";
                break;
            case "east":
                if(curDirection == "west" ) {
                    return;
                }
                app.settings.player.head.x += 1;
                app.settings.player.curDirection = "east";
                break;
            case "south":
                if(curDirection == "north" ) {
                    return;
                }
                app.settings.player.head.y += 1;
                app.settings.player.curDirection = "south";
                break;
            case "west":
                if(curDirection == "east" ) {
                    return;
                }
                app.settings.player.head.x -= 1;
                app.settings.player.curDirection = "west";
                break;
        }
    },
    drawPlayer: function(x, y) {
        console.log( app.settings.player.body );
        app.settings.player.body.unshift( {"x": x, "y": y} );
        //remove head class
        $(".player").removeClass("head");
        //add player class to location
        $("#x"+x+"-y"+y).addClass("player");
        console.log("x: " + x, "y: " + y);
        //add head class to first player item.
        $("#x"+x+"-y"+y).addClass("head");
        //if the player growth is more than the length of hte player, remove last item
        if( $(".player").length > app.settings.player.growth ) {
            //$("#x"+app.settings.player.tail.x+"-y"+app.settings.player.tail.y).removeClass("player");
            var body = app.settings.player.body;
            $("#x"+body[body.length-1].x+"-y"+body[body.length-1].y).removeClass("player");
            body.pop();
        }
    },
    drawGrid: function(){
         console.log("draw grid");
         for( var i = 0; i < app.settings.grid.size; i++ ) {
             for( var k = 0; k < app.settings.grid.size; k++ ) {
                 $("#grid").append("<div class='cells' id='x" + k + "-y" + i + "'></div>");
             }
         }
    },

    drawPoint: function() {
        var x = Math.floor( Math.random() * app.settings.grid.size );
        var y = Math.floor( Math.random() * app.settings.grid.size );
        console.log("Drawing point","x:" + x, "y:" + y);
        app.settings.player.point.x = x;
        app.settings.player.point.y = y;
        $("#x"+x+"-y"+y).addClass("point");
    },

    gameOver: function() {
        console.log("game over");
        clearInterval(app.settings.intervalId);
    }
}


$(document).ready(function(){
    app.startGame();
});