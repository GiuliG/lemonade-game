'use strict'

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0]; // this means we are adding our blocks inside the body of the HTML
}

function main() {
// we select the elements in the DOM
  var splashScreen;
  var gameScreen;
  var gameOverScreen;
  var startButton;
  var restartButton;
  var pauseButton;
  var livesElement;
  var scoreElement;
  var intervalId;
  var timerElement;
  var canvasElement;
  var game;

  // the  homepage
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <h1>When Life Gives You Lemons...Make Lemonade</h1>
       
        <div class="rules">You are Gigi and your task is to catch lemons (+1p) and sugar (+2ps) to make amazing lemonades. Some enemies will try to make your goal harder: they will either steal points from you or reduce your (life) energy. The player cannot have a negative score and has three lives only. This means that when your life and score reach 0, the game is over.<br> Ready? Hit play!</div>
        <button>Start</button>
        <div class="enemies-list"><p>Know Your Enemies:</p>
        <ul>
        <li><img>
        Mother-in-Law: Watch out for her! She will reduce your (life) energy.</li>
        <li><img>
        Your Boss: s/he reduces your score by one point.</li>
        <li><img>
        Oranges: they are lemons in disguise. They will reduce your score by one point.</li>


        </ul>
        </div>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('button');

    startButton.addEventListener('click', destroySplash);
  }

  // remove the hompegae and replace it with the one from the game
  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    buildGameScreen();
  }

  // game page
  function buildGameScreen() {
    gameScreen = buildDOM(`
      <main>
      <div id = "nav-game">
        <p class="lives">No. of lives: 3</p>
        <p class="score">Score: </p>  
        <p>timeLeft: <span class="time"> </span> </p>  
        <div class="buttons">
          <div class="pause">
            <button class="button">Pause Game</button>
          </div>
        </div>    
        <canvas width="640px" height="480px"></canvas>   
      </main>
    `);

    document.body.prepend(gameScreen);

    canvasElement = document.querySelector('canvas');
    livesElement = document.querySelector('p.lives');
    scoreElement = document.querySelector('p.score');
    
    var timeLeft = 30;
    timerElement = document.querySelector('.time');
    var intervalId = setInterval(function(){
      timerElement.innerText = timeLeft;
      timeLeft --;
      if (timeLeft < 0){
        clearInterval(intervalId);
        destroyGameScreen()
      }
    }, 1000)
    
    game = new Game(canvasElement);
    game.start(); 
  


  }

  function destroyGame() {
    game.destroy();
  }  

  function updateLives(lives) {
    livesElement.innerText = lives;
  }

  function updateScore(score) {
    scoreElement.innerText = score;
  }

  // remove game screen and move to game over
  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }


  //  game over page
  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
      <main>
        <h1>Game Over</h1>
        <p>Oh no! You lost the game. But don't worry, if life gives you lemons, find someone whose life has given them vodka and...throw a party!<br> Alternatively, restart the game.</p>
        <button>Restart</button>
      </main>  
    `);

    document.body.prepend(gameOverScreen);

    restartButton = document.querySelector('button');

    restartButton.addEventListener('click', destroyGameOverScreen)

  }
  // remove game over page and go back to the game
  function destroyGameOverScreen() {
    gameOverScreen.remove();

    restartButton.removeEventListener('click', destroyGameOverScreen)

    buildGameScreen();
  }

  buildSplash();

}

window.addEventListener('load', main);

