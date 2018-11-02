'use strict'

function Game(canvasElement) {
  this.player = null;
  this.enemies = [];
  this.canvasElement = canvasElement;
  this.initialPositionPlayer = {
    x: this.canvasElement.height / 2,
    y: 0,
  }
  this.gameIsOver = false;
}