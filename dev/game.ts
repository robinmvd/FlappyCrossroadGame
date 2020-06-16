class Game {
    private div: HTMLElement
    
    private player:Player
    
    constructor() {    
        this.div = document.createElement("level")
        document.body.appendChild(this.div)
    
        this.player = new Player()

        this.gameLoop()
    }

    private gameLoop(){
        this.player.update()

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public update() : void {
        
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }
} 


window.addEventListener("load", ()=> new Game())