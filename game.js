'use strict'
// -- base constructor game

function Game(canvasElement) {
    this.canvasElement = canvasElement;
    this.level = 0;
    this.message = '';
    this.ctx = this.canvasElement.getContext('2d');
    this.player = null;
    this.score = 0;
    this.enemies = []; 
    this.checkEnemies;
    this.lives = 3;
    this.levelThresholds = [10, 20, 30];
    this.initialPositionPlayer = {
    x: this.canvasElement.width/2,
    y: this.canvasElement.height - 100
  }
    this.gameIsOver = false;
    this.speedEnemies;
    this.playerSpeed;
    this.message = '';
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
  
  var intervalId = setInterval(this.levelTime.bind(this) , 7000);


  var loop = function() {
    this.checkAllCollisions();
    this.updateAll();
    this.clearAll();
    this.drawAll();
    
    if (Math.random() > 0.96) {
        this.enemies.push(new Enemy(this.canvasElement));
    }

    if (this.level >= 3) {
      clearInterval(intervalId);
    }
      
    this.player.draw();

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
    return enemy.isInScreen();
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
        var score = this.player.score += enemy.points;
        this.updateScore(score);
        //this.lostLive(this.player.lives);
        this.enemies.splice(index, 1);
       
       /* if (this.player.score === this.levelThresholds[1]){
          console.log('Congratulations. You have made it to level 2');
          this.levelTwo();
      
        } 

        if (this.score === this.levelThresholds[2] ){
          console.log('Congratulations. You have made it to level 3');
          this.levelThree();
        }
    */

        if (this.player.score <= 0) {
          this.gameIsOver = true;
          this.finishGame();
        }
      }
    }.bind(this)); 
  }

  Game.prototype.onGameOverCallback = function(callback) {
    this.gameOverCallback = callback;
  }
  
  Game.prototype.onLiveLost = function(callback) {
    this.lostLive = callback;
  }

  Game.prototype.onPoints = function(callback) {
    this.updateScore = callback;
  }
  
  Game.prototype.finishGame = function() {
    this.gameOverCallback();
  }


  Game.prototype.levelTime = function () {
    this.level++;
    console.log('new level');
  }

  
 

  
  /*
 Game.prototype.levelTwo = function() {
    this.level === 2;
    this.speedEnemies === 5;
    console.log('this is faster')
  }

  
  Game.prototype.levelThree = function() {
    this.level === 3;
    this.speedEnemies === 9;
    console.log('this is faster');
    this.playerSpeed = 10;
  }

*/







function loop () {
        
 this.checkRound();

  // create more enemies now and then
  if (Math.random() > this.checkEnemies) {
      //var x = this.canvasElement.width * Math.random();
      this.enemies.push(new Enemy(this.canvasElement, this.speedEnemies));
  }
  
  if (this.message) {
    this.message.draw();
  }
  window.requestAnimationFrame(loop);

}

Game.prototype.checkRound = function() {
  
  if(this.level === 1 && this.score === this.levelThresholds[0] ) {
      this.checkEnemies = 0.96;
      this.speedEnemies = 4;

  } else if (this.level === 2 && this.levelThresholds[1] ) {
      this.checkEnemies = 0.93;
      this.speedEnemies = 6;

  } else if (self.level === 3 && this.levelThresholds[2]) {
      this.rateEnemies = 0.80;
      this.speedEnemies = 7;

    }
  }

