# Lemonade

## Description
When life gives you lemons, make lemonade!
You are Gigi and your task is to catch lemons and sugar cubes to make amazing lemonades. Some enemies will try to make your goal harder: they will either steal points from you or reduce your (life) energy. The player cannot have a negative score and has three lives only. This means that when your life and score reach 0, the game is over.


## MVP (DOM - CANVAS)
*CANVAS*
The MVP version will be the first level of the game: one player and three enemies.

## Backlog
- Add/remove points + score
- Reduce lives
- Add pause
- Design
- Images
- Music
- Levels (3)

## Data structure
### game.js
```javascript
Game() {
  self.gameIsOver
  self.score
}

Game.prototype.start(
  buildDom()
  self.lives
  self.score
  self.canvas
  self.width
  self.height
  addEventListener
  self.startLoop()
)

Game.prototype.startLoop(
  ctx
  loop() 

    //create enemies

    //filter by enemies outside the screen
    self.enemies.filter(isInScreen())
    
    //update positions
    self.player.update()
    self.enemies.update()
    
    //check if player collided with enemies and if true remove them
    self.checkIfEnemiesCollidedPlayer()
    
    //lose points & life depending on the enemy
        
    //erase canvas
    ctx.clearRect()
    
    //draw
    self.player.draw()
    self.enemies.draw()
    Frame(loop)
   }
   Frame(loop)
)


```
### player.js
```javascript
Player(canvas, lives) {
  self.x
  self.y
  self.lives
  self.direction 0
  self.size
  self.speed
  self.canvas
  self.ctx
}

Player.prototype.setDirection()
Player.prototype.collidesWithEnemies() //used for points and life
Player.prototype.collided()
Player.prototype.update()
Player.prototype.draw()


```
### enemy.js
```javascript
Enemy 2 Type (canvas, x, strength) {
  self.x
  self.y
  self.direction 0
  self.size
  self.strength
  self.canvas
  self.ctx
}

Enemy.prototype.update()
Enemy.prototype.draw()
Enemy.prototype.isInScreen()



```


## States & States Transitions
Definition of the different states and their transition (transition functions)
```javascript
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  - buildGameScreen()

  
- starGame()
  - destroySplash()
  - destroyGameOver()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - buildGameOver()
  - destroyGame()
  - addEventListener( if splashScreen, else starGame) 
```

## Task
- create files javascript
- Main - buildDom
- Main - buildSplash
- Main - addEventListener
- Main - destroySplash
- Main - Start Game
- Main - destroy Game
- Main - GameOver
- Main - GameOver restart
- Main - removeGameOver


- Game - buildDom
- Game - addEventListener
- Game - create player
- Game - loop
- Game - player and enemies position 
- Game - clear
- Game - create enemies
- Game - collision + remove
- Game - lives 
- Game - gameOver

- Player - create
- Player - directions

- Enemies - create
- Enemies - check if they are still in the screen
