console.log('Stinky play time!')

/*DOM SELECTORS */
const canvas = document.querySelector('#canvas')
const scoreCount = document.querySelector('#score')
const status = document.querySelector('#status')
/*CANVAS SETUP/ GAME STATE */

const ctx = canvas.getContext('2d')
canvas.width = 1000
const canvW = canvas.width
canvas.height = 400
const canvH = canvas.height
console.log(canvW, canvH)
function generateX (){
    const randX = Math.floor(Math.random()*970)
    return randX
}

const gameLoopInterval = setInterval(gameLoop, 60)
let score = 0


/*CLASSES */
class Character {
    constructor(x, y, color, width, height, type){
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
        this.type = type
    }
    render(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

/* GAME OBJECTS */
//player cat
const cat = new Character(500, 320, 'grey', 50, 75, 'player')
// cat.render()
//falling chicken
const chicken = new Character(generateX(), 0, 'rgb(121, 65, 71', 30, 30, 'food')
// chicken.render()
// falling turkey
const turkey = new Character(generateX(), 0, 'rgb(197, 114, 86', 30, 30, 'food')
// turkey.render()
//falling fish
const fish = new Character(generateX(), 0, 'rgb(168, 211, 254', 30, 30, 'food')
// fish.render()
//falling cheese
const cheese = new Character(generateX(), 0, 'rgb(250, 192, 48', 30, 30, 'cheese')
// cheese.render()
const food = [chicken, turkey, fish]
const goodFood = []
const badFood = []

/*GAME FUNCTIONS */

const getRandomInt = () => {
    //generate a random number 0-3 to select a food item to render
    const randoI = Math.floor(Math.random() * (3 - 0) + 0)
    return randoI
}

const cheeseFall = setInterval(function(){
    badFood.push(new Character(generateX(), 0, 'rgb(250, 192, 48', 30, 30, 'cheese'))
}, 3000)
const foodFall = setInterval(function(){
    // const randomI = getRandomInt()
    goodFood.push(new Character(generateX(), 0, 'rgb(121, 65, 71', 30, 30, 'food'))
}, 2000)
const arrayClear = setInterval(function(){
    badFood.pop()
}, 6000)
function gameLoop() {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //render the game objects
    if (cat.alive){
        cat.render()
    }
    for(let i = 0; i < badFood.length; i++){
        badFood[i].render()
        if(cat.x + cat.width >= badFood[i].x &&
            //right
            cat.x <= badFood[i].x + badFood[i].width &&
            //top
            cat.y + cat.height >= badFood[i].y &&
            //bottom
            cat.y <= badFood[i].y + badFood[i].height){
                cat.alive = false
                clearInterval(cheeseFall)
                clearInterval(foodFall)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                status.innerText = `Game Over! Stinky's running to the litter box! Your score was ${score}`
            
            }else if (badFood[i].y < 400){
            badFood[i].render()
            badFood[i].y += 5
        }
    }
    for(let i = 0; i < goodFood.length; i++){
        if (goodFood[i].alive){
            goodFood[i].render()}
        if(cat.x + cat.width >= goodFood[i].x &&
            //right
            cat.x <= goodFood[i].x + goodFood[i].width &&
            //top
            cat.y + cat.height >= goodFood[i].y &&
            //bottom
            cat.y <= goodFood[i].y + goodFood[i].height){
                goodFood[i].alive === false
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                cat.render()
                score++
                scoreCount.innerText = `Score:${score}`
            }else if (goodFood[i].y < 400){
            goodFood[i].render()
            goodFood[i].y += 5
        }
    }
}


/* EVENT LISTENERS */
canvas.addEventListener('click', e => {
    console.log(`x is ${e.offsetX} y is ${e.offsetY}`)
})
document.addEventListener('keydown', function(e) {
    const speed = 10
    if (cat.x < 0) {
        switch(e.key) {
            case('ArrowLeft'):
            case('a'):
                cat.x = 0
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