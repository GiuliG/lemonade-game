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
};

  
  Player.prototype.setDirection = function(direction) {
    this.direction = direction;
};

  Player.prototype.collidesWithEnemy = function(enemy) {
    
    const collidesRight = enemy.y <=(this.y + this.size);
    const collidesLeft = enemy.x + enemy.size >= this.x;
    const collidesTop = enemy.y + enemy.size >= this.y;
    const collidesBottom = enemy.x <= this.x + this.size;

    return collidesRight && collidesBottom && collidesTop && collidesLeft;
};


    Player.prototype.lemonsSweet = function (enemy) {
    const collidesRight = enemy.y <=(this.y + this.size);
    const collidesLeft = enemy.x + enemy.size >= this.x;
    const collidesTop = enemy.y + enemy.size >= this.y;
    const collidesBottom = enemy.x <= this.x + this.size;

    if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
        return true;
}
    
    return false;
};

Player.prototype.collidedLemonsSweet = function (item) {
    if (item.includes('sugar')) {
        this.lives += 2;
    } else {
        this.lives++;
    }
};

  
  