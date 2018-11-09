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
  var livesElement;
  var scoreElement;
  var canvasElement;
  var game;
  var messageElement;
  var rulesButton;
  var rulesExpand;
  var rulesList;
  var rulesSpan;

  

  // the  homepage
  function buildSplash() {
    splashScreen = buildDOM(`
    <main>
        <div class="container">
          <div>
            <h1><strong>When Life Gives You Lemons,<br>Make Lemonade</strong></h1>
          </div>
          <h2><strong>What is This?</strong></h2>
          <p>Lemonade is a game and, above all, a philosophy of life. <br> The aim is to catch the lemons and sugar cubes to make amazing lemonades.  
          <br> Ready? Hit play!</p>
            <button id="rules-expand">
              <span>+</span> Learn More
            </button>
            <button id="rules-collapse" class="hidden">
              <p>Use the left and right arrows on your keyboard.</p>
              <p>Try to catch the lemons (+1 point) and sugar cubes (+2 points). </p>
              <p>Some enemies will try to make the task harder: Apples, oranges and cherries will reduce your score by 3, 2, and 5 points respectively. </p>
              <p>The game has four levels of difficulty. <br> There is no winning condition but the game is over when you reach 0.</p>
            </button>

          <button class="play">Play</button>
          <footer>
          <p>Powered by Life</p>
          </footer>
        </div>      
    </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('.play');
    startButton.addEventListener('click', destroySplash);
    
    rulesExpand = document.querySelector('#rules-expand');
    rulesSpan = document.querySelector('#rules-expand span');
    rulesList = document.querySelector('#rules-collapse');

    rulesExpand.addEventListener('click', toggleList);


  }


 // hidden
function toggleList () {
  var rules = document.querySelector('#rules-collapse');
  rules.classList.toggle('hidden');
  if (rules.classList.contains('hidden')) {
    rulesSpan.innerText = "+";
  } else {
    rulesSpan.innerText = "-";
  };
}



  // remove the hompage and replace it with the one from the game
  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    buildGameScreen();
  }

  // game page
  function buildGameScreen() {
    gameScreen = buildDOM(`
      <main class="game">
        <div class="wrapper">
        <div></div>
          <div class="text-game">
            <div class="glass">                
            <p class="game-content"><strong>No. of lemonades:</strong></p>
            <p class="score text-game game-content"><strong>0</strong> </p>
            </div>
            <p class="message"></p>  
          </div>  
          <canvas width="900px" height="500px"></canvas> 
          <div>
          <button class="right-mobile-hidden">Right -></button>
          <button class="left-mobile-hidden"><- Left</button>
          </div>
        </div>
       
      </main>
    `);

    document.body.prepend(gameScreen);

    canvasElement = document.querySelector('canvas');
    //lives can be found here
    livesElement = document.querySelector('.lives');
    scoreElement = document.querySelector('p.score');
    messageElement = document.querySelector('.message');
  
    
    /*var timeLeft = 30;
    timerElement = document.querySelector('.time');
    var intervalId = setInterval(function(){
      timerElement.innerText = timeLeft;
      timeLeft --;
      if (timeLeft < 0){
        clearInterval(intervalId);
        destroyGameScreen()
      }
    }, 1000)
    */

    
    game = new Game(canvasElement);
    game.start(); 
    game.onGameOverCallback(destroyGameScreen);
    game.onLiveLost(updateLives);
    game.onPoints(updateScore);
    game.messageSend(updateMessage);

  }




//update lives
  function updateLives(lives) {
    livesElement.innerText = lives;
  }
// update score
  function updateScore(score) {
    scoreElement.innerText = score;
  }

// update message
function updateMessage (message) {
  messageElement.innerText = message;
  messageElement.classList.add('show');
  setTimeout(function(){
    messageElement.classList.remove('show');
  },2000);

}



  
  // remove game screen and move to game over
  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }


  //  game over page
  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
    <main >
      <div>&nbsp</div>
      <div class="container">
        <h1><strong>Game Over</strong></h1>
        <p class="rules">Oh no! You lost the game. <br>Don't worry, if life gives you lemons, find someone whose life has given them vodka and...throw a party!<br> Alternatively, restart the game.</p>
        <button>Restart</button>
      <div>&nbsp</div>
      </div>
     


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

