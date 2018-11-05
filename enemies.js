'use strict';

function Enemy(canvasElement, type) {
    this.size = 20;
    this.canvasElement = canvasElement;
    this.enemyImage = new Image();
    this.typeOfChar = [
      {
        image: './images/lemon.png', 
        name: 'lemon',
        points: 1
      },
      {
        image: './images/sugar.png',
        name: 'sugar',
        points: 2
      },
      {
        image: './images/orange.png', 
        name: 'orange',
        points: -1
      }
    ];
    this.enemiesChoices = ["./images/lemon.png","./images/sugar.png","./images/orange.png"];
    this.enemyImage.src = this.getRandomImage();
    this.ctx = this.canvasElement.getContext('2d');
    // I want my enemies to start from the top left
    this.y = 0;
    this.x = Math.floor(Math.random() * this.canvasElement.width);
    
  }
  
  Enemy.prototype.update = function() {
    this.y += 5;
  }

  
  
  Enemy.prototype.draw = function() {
    //this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)
    this.ctx.drawImage(this.enemyImage, this.x, this.y);
  }
  
  Enemy.prototype.isInScreen = function() {
    return this.x > -this.size;  
  }
  
  Enemy.prototype.getRandomImage = function () {
    var randomNum = Math.floor(Math.random() * this.typeOfChar.length);
    this.points = this.typeOfChar[randomNum].points;
    return this.typeOfChar[randomNum].image;
    };