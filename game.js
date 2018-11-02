'use strict'
// -- base constructor game

function Game(canvasElement) {
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.player = null;
    this.enemies = [];
    this.initialPositionPlayer = {
    x: this.canvasElement.width/2,
    y: this.canvasElement.height-30
  }
  this.gameIsOver = false;
}

// game methods
Game.prototype.start = function() {
    this.startLoop();
}

Game.prototype.startLoop = function() {
    this.player = new Player(this.canvasElement, this.initialPositionPlayer);
  
    this.handleKeyUp = function(event) {
      if (event.key === 'ArrowRight') {
        this.player.setDirection(1);
      } else if (event.key === 'ArrowLeft') {
        this.player.setDirection(-1);
      }
    }.bind(this)
    
    document.addEventListener('keyup', this.handleKeyUp);


    var loop = function() {
        this.updateAll();
        this.clearAll();
        this.drawAll();

        if (!this.gameIsOver) {
            requestAnimationFrame(loop);
            }
        
        }.bind(this);
  // this loop runs once, but the others are called continuously (look at requestAnimationFrame)      
    loop();
  }



  

  Game.prototype.updateAll = function() {
    this.player.update(); 
  }
  
  Game.prototype.clearAll = function() {
   this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
  
  Game.prototype.drawAll = function() {
    this.player.draw();
  }