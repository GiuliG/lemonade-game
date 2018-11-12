'use strict'

function Player (canvasElement, initialPosition, image) {
  this.x = initialPosition.x
  this.y = initialPosition.y
  this.size = 100
  this.lives = 3
  this.score = 0
  this.speed = 6
  this.direction = 0
  this.canvasElement = canvasElement
  this.character = new Image()
  this.character.src = image || './images/basket.png'

  this.ctx = this.canvasElement.getContext('2d')
}

Player.prototype.setDirection = function (direction) {
  this.direction = direction
}

Player.prototype.draw = function () {
// this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)
//  this.ctx.fillRect(this.x, this.y, this.size, this.size);
  this.ctx.drawImage(this.character, this.x, this.y, this.size, this.size)
}

Player.prototype.update = function () {
  if (this.x < this.size) {
    this.setDirection(1)
    }

  if (this.x > this.canvasElement.width - this.size) {
    this.setDirection(-1)
    }
  this.x += this.speed * this.direction
};

Player.prototype.setDirection = function (direction) {
  this.direction = direction
};

// remove lives if collides with enemy
Player.prototype.collidesWithEnemy = function (enemy) {
  const collidesRight = enemy.y <= (this.y + this.size)
    const collidesLeft = enemy.x + enemy.size >= this.x
    const collidesTop = enemy.y + enemy.size >= this.y
    const collidesBottom = enemy.x <= this.x + this.size

    return collidesRight && collidesBottom && collidesTop && collidesLeft
};

Player.prototype.collided = function (enemy) {
  this.lives--
};

// collision with good characters
Player.prototype.collideswithGoodCharacters = function (points) {
  const collidesRight = points.y <= (this.y + this.size)
    const collidesLeft = points.x + points.size >= this.x
    const collidesTop = points.y + points.size >= this.y
    const collidesBottom = points.x <= this.x + this.size

    return collidesLeft && collidesRight && collidesTop && collidesBottom
}

