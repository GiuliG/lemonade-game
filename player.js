'use strict'

function Player(canvasElement, initialPosition) {
  this.x = initialPosition.x;
  this.y = initialPosition.y;
  this.size = 20;
  this.lives = 3;
  this.speed = 4;
  this.direction = 0;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Player.prototype.setDirection = function(direction) {
    this.direction = direction;
  }

Player.prototype.draw = function() {
    this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)
  }


Player.prototype.update = function() {

    if (this.x <= this.size / 2) {
      this.setDirection(1);
    }
  
    if (this.x >= this.canvasElement.width - this.size / 2) {
      this.setDirection(-1);
    }
  
    this.x += this.speed * this.direction;
  }
  
  Player.prototype.setDirection = function(direction) {
    this.direction = direction;
  }

  /*Player.prototype.collidesWithEnemy = function(enemy) {

    var collidesTop = this.y - this.size / 2 < enemy.y + enemy.size / 2;
    var collidesBottom = this.y + this.size / 2 > enemy.y - enemy.size / 2;
    var collidesRight = this.x + this.size / 2 > enemy.x - enemy.size / 2;
    var collidesLeft = this.x - this.size / 2 < enemy.x + enemy.size / 2;
    
    if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
        return true;
    }
    
    return false;
    
  }
  */
  