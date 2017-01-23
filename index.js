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
            location: {
                x: 14,
                y: 29
            }
        },
        updateFreq: 1,
        intervalId: 0
        
    },
    startGame: function(){
        console.log("game started");
        app.drawGrid();
        app.drawPlayer(app.settings.player.location.x, app.settings.player.location.y);
        app.settings.intervalId = setInterval( app.updateLoop, ( 1000 / app.settings.updateFreq ) );
    },
    updateLoop: function(){
        console.log("update loop");
        //app.drawPoint();
        //player moves
        app.movePlayer();
        //check point intersect with head
        //if cell has class point and playerHead point was hit
            //increase size if true
            //add point
        //
        //
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
                app.settings.player.location.y--;
                break;
            case "east":
                app.settings.player.location.x++;
                break;
            case "south":
                app.settings.player.location.y++;
                break;
            case "west":
                app.settings.player.location.x--;
        }
    },
    drawPlayer: function(x, y) {
        $("#x"+x+"-y"+y).addClass("player");
    },
    drawGrid: function(){
         console.log("draw grid");
         for( var i = 0; i < app.settings.grid.size; i++ ) {
             for( var k = 0; k < app.settings.grid.size; k++ ) {
                 $("#grid").append("<div class='cells' id='x" + i + "-y" + k + "'></div>");
             }
         }
    },

    drawPoint: function() {
        var x = Math.floor( Math.random() * app.settings.grid.size );
        var y = Math.floor( Math.random() * app.settings.grid.size );
        console.log("x:" + x, "y:" + y);
        $("#x"+x+"-y"+y+"").addClass("point");
    },

    gameOver: function() {
        clearInterval(app.settings.intervalId);
    }
}


$(document).ready(function(){
    app.startGame();
});