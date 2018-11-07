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
  

  // the  homepage
  function buildSplash() {
    splashScreen = buildDOM(`
    <main>
      <div class="header">
        <div class="container">
            <h1><strong>When Life Gives You Lemons,<br>Make Lemonade</strong></h1>
        </div>
      </div>

      <div class="container">
        <h2>What is This?</h2>
          <p>Lemonade is a game and, above all, a way of life. The aim is to catch the lemons and sugar cubes to make amazing lemonades.  
          Use the arrows on your keyboard to complete the task. <br> Ready? Hit play!</p>
      </div>
      <div class="container">
        <button >Start</button>
      </div>
        

        <div>&nbsp;
        </div>
        
        <footer>
        <p>Powered by Life Events</p>
        </footer>
     
    </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('button');
 

    startButton.addEventListener('click', destroySplash);
   
  }


 // audio

 
 



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
            <div class="text-game">
                <div class="glass">
                  <img src="./images/lemonade-cartoon-png-1.png">
                </div>
                <p class="game-content"><strong>No. of lemonades:</strong></p>
                <p class="score text-game game-content"><strong>0</strong> </p>
              
                <p class="message"></p>  
                 
          </div>  
          <canvas width="900px" height="500px"></canvas> 
         


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
      <div class="container">
        <h1>Game Over</h1>
        <p class="rules">Oh no! You lost the game. <br>Don't worry, if life gives you lemons, find someone whose life has given them vodka and...throw a party!<br> Alternatively, restart the game.</p>
        <button>Restart</button>
      </div>
      <footer>
        <p>Powered by Life Events</p>
        </footer>
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

