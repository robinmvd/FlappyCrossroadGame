class GameObject {

    // Fields
    protected div:HTMLElement

    protected x : number = 0
    protected y : number = 0

    public getRectangle() : DOMRect {
        return this.div.getBoundingClientRect()
    }

    constructor() {
        
    }

    public update() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }
}