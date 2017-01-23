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
            tail: {
                x: 15,
                y: 29
            },
            growth: 3,
            direction: "north"
        },
        updateFreq: 1,
        intervalId: 0
        
    },
    startGame: function(){
        console.log("game started");
        app.drawGrid();
        app.drawPlayer(app.settings.player.head.x, app.settings.player.head.y);
        app.settings.intervalId = setInterval( app.updateLoop, ( 1000 / app.settings.updateFreq ) );
    },
    updateLoop: function(){
        console.log("update loop");
        //app.drawPoint();
        //player moves
        app.updatePlayer( app.settings.player.direction );
        app.checkWallHit( app.settings.player.head.x, app.settings.player.head.y );
        //check point intersect with head
        //if cell has class point and playerHead point was hit
            //increase size if true
            //add point
        //
        //
    },
    updatePlayer: function( direction ) {
        app.movePlayer( direction );
        app.drawPlayer( app.settings.player.head.x, app.settings.player.head.y );
    },
    checkWallHit: function(x, y) {
        if( x > app.settings.grid.size || x < 0
         || y > app.settings.grid.size || y < 0
        ) { 
            app.gameOver();
        }
    },
    movePlayer: function( direction ){
        switch( direction ) {
            case "north":
                app.settings.player.head.y--;
                break;
            case "east":
                app.settings.player.head.x++;
                break;
            case "south":
                app.settings.player.head.y++;
                break;
            case "west":
                app.settings.player.head.x--;
        }
    },
    drawPlayer: function() {
        app.drawHead();
        //if the player growth is more than the length of hte player, remove last item
        if( $(".player").length > app.settings.player.growth ) {
            var tail = $(".player").length - 1;
            $(".player").eq(tail).removeClass("player");
        }
    },
    drawHead: function() {
        $("#x"+app.settings.player.head.x+"-y"+app.settings.player.head.y).addClass("player").addClass("head");
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