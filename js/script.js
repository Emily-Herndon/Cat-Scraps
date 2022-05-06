console.log('Stinky play time!')
/*DOM SELECTORS */
const canvas = document.querySelector('#canvas')
/*CANVAS SETUP/ GAME STATE */
const ctx = canvas.getContext('2d')


canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
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
const cat = new Character(576, 521, 'grey', 50, 75, 'player')
cat.render()


/*GAME FUNCTIONS */

/* EVENT LISTENERS */
canvas.addEventListener('click', e => {
    console.log(`x is ${e.offsetX} y is ${e.offsetY}`)
   
})