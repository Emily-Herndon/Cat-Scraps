console.log('Stinky play time!')
/*DOM SELECTORS */
const canvas = document.querySelector('#canvas')
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
// const randX = Math.floor(Math.random()*canvas.width)

const gameLoopInterval = setInterval(gameLoop, 60)
// const fallingObjectInterval = setInterval

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
//falling turkey
const turkey = new Character(generateX(), 0, 'rgb(197, 114, 86', 30, 30, 'food')
// turkey.render()
//falling fish
const fish = new Character(generateX(), 0, 'rgb(168, 211, 254', 30, 30, 'food')
// fish.render()
//falling cheese
const cheese = new Character(generateX(), 0, 'rgb(250, 192, 48', 30, 30, 'cheese')
// cheese.render()
const fallingFood = [chicken, turkey, fish, cheese]

/*GAME FUNCTIONS */

function gameLoop() {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //render the game objects
    cat.render()
    draw(getRandomInt)
    
}
// const fallRate = 5
// function falling () {
//     y += fallRate
//     return y
// }
const getRandomInt = () => {
    //generate a random number 0-3 to select a food item to render
    const randoI = Math.floor(Math.random() * (4 - 0) + 0)
    return randoI
}

const draw = (getRandomInt) => {
    const randomI = getRandomInt()    
    fallingFood[randomI].render()
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