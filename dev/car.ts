/// <reference path="gameobject.ts" />
class Car extends GameObject {

    private speed: number = 0
    private _color: number
    

    public get color(): number {return this._color}
    public set color(value: number) {this._color = value}

    constructor() {

        super()

        this.div = document.createElement("car")
        let level = document.getElementsByTagName("level")[0]!
        level.appendChild(this.div)

        this.x = (Math.random() * -400) - 168
        this.y = Math.ceil(Math.random() * 5) * 120
        this.speed = Math.random() * 2 + 2
        this.setColor()
    }

    public update(): void {
        this.x += this.speed
        
        if (this.x > window.innerWidth) {
            this.x = -168
        }

        super.update()
    }

    private setColor() {
        this._color = Math.random()*360 
        this.div.style.webkitFilter = "hue-rotate("+this._color+"deg)"
        this.div.style.filter = "hue-rotate("+this._color+"deg)"
    }

    public move():void {
        this.x += this.speed
        if(this.x > window.innerWidth) this.x = -450
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    

}