'use strict'
// -- base constructor game

function Game(canvasElement) {
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.player = null;
    this.score = 0;
    this.enemies = [];
    this.lives = 3;
    this.initialPositionPlayer = {
    x: this.canvasElement.width/2,
    y: this.canvasElement.height - 100
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
          this.player.setDirection(0);
        } else if (event.key === 'ArrowLeft') {
          this.player.setDirection(0);
        }
      }.bind(this);

    this.handleKeyDown = function(event) {
      if (event.key === 'ArrowRight') {
        this.player.setDirection(1);
      } else if (event.key === 'ArrowLeft') {
        this.player.setDirection(-1);
      }
    }.bind(this)
    
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);


    var loop = function() {
        this.checkAllCollisions();
        this.updateAll();
        this.clearAll();
        this.drawAll();
        
        if (Math.random() > 0.96) {
            this.enemies.push(new Enemy(this.canvasElement));
          }
      
        if (!this.gameIsOver) {
            requestAnimationFrame(loop);
            }
        
        }.bind(this);
  // this loop runs once, but the others are called continuously (look at requestAnimationFrame)      
    loop();
  }


  Game.prototype.updateAll = function() {
    this.player.update(); 
    this.enemies.forEach(function(enemy) {
        enemy.update();
      })
  }
  
  Game.prototype.clearAll = function() {
   this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
   this.enemies = this.enemies.filter(function(enemy) {
    return enemy.isInCanvas();
  });
  }
  
  Game.prototype.drawAll = function() {
    this.player.draw();
    this.enemies.forEach(function(enemy) {
        enemy.draw();
      })
  }

  Game.prototype.checkAllCollisions = function() {
  this.enemies.forEach(function(enemy, index) {
    if (this.player.collidesWithEnemy(enemy)) {
      this.player.score --;
      this.enemies.splice(index, 1);

    }
  }.bind(this)); 
}


/*
Game.prototype.onGameOverCallback = function(callback) {
    this.gameOverCallback = callback;
  }


Game.prototype.onLiveLost = function(callback) {
    this.lostLive = callback;
  }
  
Game.prototype.finishGame = function() {
    this.gameOverCallback();
  }
*/

