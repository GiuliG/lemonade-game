'use strict';

function Enemy(canvasElement) {
    this.size = 10;
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    // I want my enemies to start from the top left
    this.y = 0;
    this.x = Math.floor(Math.random() * this.canvasElement.width);
  }
  
  Enemy.prototype.update = function() {
    this.y += 5;
  }
  
  Enemy.prototype.draw = function() {
    this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)
  }
  
  Enemy.prototype.isInCanvas = function() {
    return this.x > -this.size;  
  }