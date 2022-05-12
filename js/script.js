console.log('Stinky play time!')

/*DOM SELECTORS */
const canvas = document.querySelector('#canvas')
const scoreCount = document.querySelector('#score')
const gameStatus = document.querySelector('#status')
const gameOverMessage = document.querySelector('#gameOverMessage')
const gameOverScreen = document.querySelector('#gameOverScreen')
const restartButton = document.createElement('button')
/*CANVAS SETUP/ GAME STATE */

const ctx = canvas.getContext('2d')
canvas.width = 1000
const canvW = canvas.width
canvas.height = 570
const canvH = canvas.height
console.log(canvW, canvH)
function generateX (){
    let randX = Math.floor(Math.random()*970)
    return randX
}
let score = 0
// const gameLoopInterval = setInterval(gameLoop, 60)

/* SPRITES */
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


/*CLASSES */
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

/* GAME OBJECTS */
//player cat
const cat = new Character(500, 505, 76, 60, 'player', catSprite)
// cat.render()
const goodSprites = [chickenSprite, fishSprite, turkeySprite]
const goodFood = []
const badFood = []

/*GAME FUNCTIONS */

const getRandomInt = () => {
    //generate a random number 0-3 to select a food image to render
    const randI = Math.floor(Math.random() * (3 - 0) + 0)
    return randI
}

//adds cheese to badFood array to drop cheese @ set rate
const cheeseFall = setInterval(function(){
    badFood.push(new Character(generateX(), 0, 45, 45, 'cheese', cheeseSprite))
}, 3000)

let w = 45
let h = 45
//adds good food to goodFood array to drop good food @ set rate
const foodFall = setInterval(function(){
    const randoI = getRandomInt()
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

function gameLoop() {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //dropping cheese
    for(let i = 0; i < badFood.length; i++){
       console.log('where da cheese?')
        badFood[i].render()
        //hit detection btwn cat & cheese
        if(cat.x + cat.width >= badFood[i].x &&
            //right
            cat.x + 40 <= badFood[i].x + badFood[i].width &&
            //top
            cat.y + cat.height >= badFood[i].y &&
            //bottom
            cat.y <= badFood[i].y + badFood[i].height){
                cat.alive = false
                clearInterval(cheeseFall)
                clearInterval(foodFall)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                gameOverMessage.innerText = `Game Over! \n Stinky's running to the litter box! \n Your score was ${score}`
                console.log('hello')
                gameOverScreen.classList.add('show')
                return
            }else if (badFood[i].y < 570){
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
                if(cat.x + cat.width >= goodFood[i].x &&
                    //right
                    cat.x + 40 <= goodFood[i].x + goodFood[i].width &&
                    //top
                    cat.y + cat.height >= goodFood[i].y &&
                    //bottom
                    cat.y <= goodFood[i].y + goodFood[i].height){
                        goodFood[i].alive = false
                        // console.log(goodFood[i], "eeeeeeeeeee")
                        goodFood.splice(i, 1)
                        // cat.render()
                        score++
                        scoreCount.innerText = `Score:${score}`
                    }else if (goodFood[i].y < 570){
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
        console.log('cat')
    }
    //smoother movement from falling food
    window.requestAnimationFrame(gameLoop)
}

/* EVENT LISTENERS */
canvas.addEventListener('click', e => {
    console.log(`x is ${e.offsetX} y is ${e.offsetY}`)
})
//player movement
document.addEventListener('keydown', function(e) {
    const speed = 10
    if (cat.x < 0) {
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
gameLoop()