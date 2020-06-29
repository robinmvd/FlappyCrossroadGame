/// <reference path="gameobject.ts" />

class Player extends GameObject {

    private game : Game


    constructor(game : Game) {

        super()

        this.game = game

        this.div = document.createElement("player")
        let level = document.getElementsByTagName("level")[0]!
        level.appendChild(this.div)

        this.x = 400
        this.y = 670
        
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
    }
    
    public update() : void {
       super.update()
    }

    public reset() : void {
        this.x = 400
        this.y = 670
    }

    // W A S D
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.x -= 102
            break
        case 68:
            this.x += 102
            break
        case 87:
            this.y -= 30
            if(this.y < -50) {
                this.y = 670
                console.log("de overkant gehaald!")
                this.game.addPoint()
            }
            break
        case 83:
            this.y += 30
            break
        }
    }
}