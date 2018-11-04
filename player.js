'use strict'

function Player(canvasElement, initialPosition, image) {
  this.x = initialPosition.x;
  this.y = initialPosition.y;
  this.size = 50;
  this.lives = 3;
  this.score = 0;
  this.speed = 5;
  this.direction = 0;
  this.canvasElement = canvasElement;
  this.character = new Image();
  this.character.src = image|| './images/gigi.png';

  this.ctx = this.canvasElement.getContext('2d');
}

Player.prototype.setDirection = function(direction) {
    this.direction = direction;
}

Player.prototype.draw = function() {
   // this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)
   this.ctx.fillRect(this.x, this.y, this.size, this.size);
   this.ctx.drawImage(this.character, this.x, this.y);
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

// remove lives if collides with enemy
Player.prototype.collided = function (enemy) {
    this.lives--;
};


  Player.prototype.collidesWithEnemy = function(enemy) {
    
    const collidesRight = enemy.y <=(this.y + this.size);
    const collidesLeft = enemy.x + enemy.size >= this.x;
    const collidesTop = enemy.y + enemy.size >= this.y;
    const collidesBottom = enemy.x <= this.x + this.size;

    if (collidesRight && collidesBottom && collidesTop && collidesLeft) {
        return true
    } else return false;
};

// collision with good characters
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
    if (item.src.includes('sugar')) {
        this.score += 2;
    } else if (item.src.includes('lemon')) {
        this.score++;
    } else {
        this.lives --;
    }
};



  
  