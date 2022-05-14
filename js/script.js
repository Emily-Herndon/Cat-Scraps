console.log('Stinky play time!')

/***************
**GAME OBJECTS**
****************/
const canvas = document.querySelector('#canvas')
const scoreCount = document.querySelector('#score')
const gameStatus = document.querySelector('#status')
const gameOverMessage = document.querySelector('#gameOverMessage')
const gameOverScreen = document.querySelector('#gameOverScreen')
const restartButton = document.querySelector('#restartButton')
const startButton = document.querySelector('#startButton')
const startScreen = document.querySelector('#startScreen')


              /*******************************************************************************/

/****************************
** CANVAS SETUP/GAME STATE **
****************************/
let gameOver = false
const ctx = canvas.getContext('2d')
canvas.width = 1000
const canvW = canvas.width
canvas.height = 570
const canvH = canvas.height
let score = 0


              /*******************************************************************************/

/******************
** SOUND EFFECTS **
******************/
const eatFood = new Audio('./audio/Monch.mp3')
eatFood.volume = .5
const meow = new Audio('./audio/Opal-meow.mp3')
meow.volume = .7
const gameOverSound = new Audio('./audio/fart-sound.wav')
gameOverSound.volume = .1


              /*******************************************************************************/

/************
** SPRITES **
************/
const catSprite = new Image()
catSprite.src = './images/catSprite.png'

const cheeseSprite = new Image()
cheeseSprite.src = './images/cheeseSprite.png'

const fishSprite = new Image()
fishSprite.src = './images/fishSprite.png'

const chickenSprite = new Image()
chickenSprite.src = './images/chickenSprite.png'

const turkeySprite = new Image()
turkeySprite.src = './images/turkeySprite.png'


              /*******************************************************************************/

/************
** CLASSES **
************/
class Character {
    constructor(x, y, width, height, type, image){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.type = type
        this.image = image
    }
    render(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

              /*******************************************************************************/

/*****************
** GAME OBJECTS **
******************/
//player cat
let cat = new Character(500, 505, 76, 60, 'player', catSprite)

//array of sprites to be randomly chosen for goodFood renders
const goodSprites = [chickenSprite, fishSprite, turkeySprite]

//empty arrays that get new characters pushed into them to render
let goodFood = []
let badFood = []

              /*******************************************************************************/

/*******************
** GAME FUNCTIONS **
*******************/
/*generates random value between 0 & 970 
(width of canvas - 30 pixels to account for sprites) 
to give each new character a random X value*/
function generateX (){
    let randX = Math.floor(Math.random()*970)
    return randX
}
/*generate a random number 0-3 (3 not inclusive) to use an as index value for 
the goodSprites array to randomly assign sprites to new good food characters as they render*/
let getRandomInt = () => {
    const randI = Math.floor(Math.random() * (3 - 0) + 0)
    return randI
}

//adds cheese to badFood array to drop cheese @ set rate
let cheeseFall = setInterval(function(){
    badFood.push(new Character(generateX(), 0, 45, 45, 'cheese', cheeseSprite))
}, 3000)

let w = 45
let h = 45
//adds good food to goodFood array to drop good food @ set rate
let foodFall = setInterval(function(){
    let randoI = getRandomInt()
    //sets image size based on sprite
    if (goodSprites[randoI]===chickenSprite){
        w = 50
        h = 47
    }else if (goodSprites[randoI]===fishSprite){
        w = 40
        h = 55
    }else if (goodSprites[randoI === turkeySprite]){
        w = 75
        h = 50
    }
    goodFood.push(new Character(generateX(), 0, w, h, 'food', goodSprites[randoI]))
    // console.log(goodFood)
}, 2000)

function gameLoop() {
    //prevents gameLoop from running when the game is over
    if(gameOver){
        return
    }
    //smoother movement from falling food
    window.requestAnimationFrame(gameLoop)
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //dropping cheese
    for(let i = 0; i < badFood.length; i++){
        badFood[i].render()
        //hit detection btwn cat & cheese
        if(cat.x + cat.width >= badFood[i].x && //right
            cat.x + 40 <= badFood[i].x + badFood[i].width && //left
            cat.y + cat.height >= badFood[i].y && //bottom 
            cat.y <= badFood[i].y + badFood[i].height){ //top
                cat.alive = false
                //stops cheese from rendering
                clearInterval(cheeseFall)
                //stops good food from rendering
                clearInterval(foodFall)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                //What the game over screen says
                gameOverMessage.innerText = `Game Over! \n Stinky's running to the litter box! \n Your score was ${score}`
                //reveals the game over screen
                gameOverScreen.classList.add('show')
                gameOver = true
                gameOverSound.play()
                console.log(gameOver)
            }else if (badFood[i].y < 570){
                /*moves cheese down canvas at set rate as long as it's within
                the bounds of the can*/
                badFood[i].render()
                badFood[i].y += 2
            }else if (badFood[i].y >= 570){
                badFood.splice(i, 1)
                //prevents food from falling forever & arrays from expanding exponentially
            }
        }
        //dropping good food
        for(let i = 0; i < goodFood.length; i++){
            if (goodFood[i].alive){
                goodFood[i].render()}
                //hit detection btwn cat & good food    
                if(cat.x + cat.width >= goodFood[i].x && //right
                    cat.x + 40 <= goodFood[i].x + goodFood[i].width && //left
                    cat.y + cat.height >= goodFood[i].y && //bottom
                    cat.y <= goodFood[i].y + goodFood[i].height){ //top
                        goodFood[i].alive = false
                        // console.log(goodFood[i], "eeeeeeeeeee")
                        goodFood.splice(i, 1)
                        //plays eating sound
                        eatFood.play()
                        //each item of food increases score by 1
                        score++
                        scoreCount.innerText = `Score:${score}`
                    }else if (goodFood[i].y < 570){
                        /*moves good food down canvas at set rate as long as it's within
                the bounds of the can*/
                        goodFood[i].render()
                        goodFood[i].y += 2
                    }else if (goodFood[i].y >= 570){
                        goodFood.splice(i, 1)
                        //prevents food from falling forever & arrays from expanding exponentially
                    }
                }
    //render the game objects
    if (cat.alive){
        cat.render()
    }
}
              /*******************************************************************************/

/********************
** EVENT LISTENERS **
********************/
//Start Button
startButton.addEventListener('click', function(){
    /*clears arrays so they don't build up while the start screen 
    is over game screen and dump them all at once when the game starts*/
    goodFood = []
    badFood = []
    gameLoop()
    //hides start screen
    startScreen.classList.add('hide')
    meow.play()
})

//player movement
document.addEventListener('keydown', function(e) {
    const speed = 15
    if (cat.x < 0) {
        //prevents cat from moving off left side of screen
        switch(e.key) {
            case('ArrowLeft'):
            case('a'):
                cat.x = 0
                //prevents cat from moving off left side of screen
            break
            case('ArrowRight'):
            case('d'):
                cat.x = cat.x + speed
            break
        }
    }else{
        switch(e.key) {
            case('ArrowLeft'):
            case('a'):
                cat.x = cat.x - speed
            break
            case('ArrowRight'):
            case('d'):
                cat.x = cat.x + speed
            break
        }
    }
    if (cat.width + cat.x > canvas.width){
        //prevents cat from moving off right side of screen
        switch(e.key) {
            case('ArrowLeft'):
            case('a'):
            cat.x = cat.x - speed
            break
            case('ArrowRight'):
            case('d'):
            cat.x = canvas.width - cat.width
            break
            //prevents cat from moving off right side of screen
        }
    }else {
        switch(e.key) {
            case('ArrowLeft'):
            case('a'):
            cat.x = cat.x - speed
            break
            case('ArrowRight'):
            case('d'):
            cat.x = cat.x + speed
            break
        }
    }
})

//restart button
restartButton.addEventListener('click', function(){
    //respawns the cat
    cat = new Character(500, 505, 76, 60, 'player', catSprite)
    /*clears arrays so they don't build up while the game over screen 
    is over game screen and dump them all at once when the game starts*/
    goodFood = []
    badFood = []
    gameOver = false
    //hides game over screen
    gameOverScreen.classList.remove('show')
    //intializes the intervals for the falling foods
    cheeseFall = setInterval(function(){
        badFood.push(new Character(generateX(), 0, 45, 45, 'cheese', cheeseSprite))
    }, 3000)
    foodFall = setInterval(function(){
        let randoI = getRandomInt()
        //sets image size based on sprite
        if (goodSprites[randoI]===chickenSprite){
            w = 50
            h = 47
        }else if (goodSprites[randoI]===fishSprite){
            w = 40
            h = 55
        }else if (goodSprites[randoI === turkeySprite]){
            w = 70
            h = 50
        }
        goodFood.push(new Character(generateX(), 0, w, h, 'food', goodSprites[randoI]))
        // console.log(goodFood)
    }, 2000)
    //resets score
    score = 0
    //resets the score area text
    scoreCount.innerText = ""
    //reinitializes the gameLoop
    gameLoop()
    meow.play()
})