class Grave {

    public div: HTMLElement;
    public x: number;
    public y: number;

    constructor(x:number, y:number, parent: HTMLElement) {
        this.div = document.createElement("grave");
        parent.appendChild(this.div);

        this.x = x;
        this.y = y;

        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}