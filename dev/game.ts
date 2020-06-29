class Game {
    private div: HTMLElement

    private gameobjects : GameObject[] = []

    private score : number = 0
    private scoreElement: HTMLElement

    constructor() {  
        
        this.div = document.createElement("level")
        document.body.appendChild(this.div)

        for (let i = 0; i < 4; i++) {
            this.gameobjects.push(new Car())
        }
    
        this.gameobjects.push(new Player(this))

        this.scoreElement = document.createElement("score")
        this.scoreElement.innerHTML = "Score: 0"
        this.div.appendChild(this.scoreElement)

        this.gameLoop()
    }

    private gameLoop(){

        for (const gameobject of this.gameobjects) {

            gameobject.update()

            if(gameobject instanceof Player) {
                
                for (const car of this.gameobjects) {
                    if(car instanceof Car) {

                        if (this.checkCollision(car.getRectangle(), gameobject.getRectangle())) {
                            console.log("crash!")
                            gameobject.reset()
                        }

                    }
                }
            }
            
        }
                
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public update() : void {
        
    }

    public addPoint() : void {
        this.score++
        this.scoreElement.innerHTML = "Score: "+this.score
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }
} 


window.addEventListener("load", ()=> new Game())