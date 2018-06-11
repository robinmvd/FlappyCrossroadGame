/// <reference path="car.ts"/>
/// <reference path="player.ts"/>

class Level {
    
    private div: HTMLElement
    private cars:Car[] = []
    private player:Player
    
    constructor() {    
        this.div = document.createElement("level")
        document.body.appendChild(this.div)
        
        this.cars.push(new Car(), new Car(), new Car(), new Car(), new Car())
        this.player = new Player()
    }

    public update() : void {
        this.player.update()

        for(let c of this.cars){
            c.update()

            if(this.checkCollision(c.getRectangle(), this.player.getRectangle())){
                console.log("Een auto raakt de speler!")
                // plaats een grafsteentje op de plek waar de speler staat

                // zet de speler terug op de start positie

            }
        }
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }

}