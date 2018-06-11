class Grave {

    private div: HTMLElement;
    private x: number;
    private y: number;

    constructor(x:number, y:number) {
        this.div = document.createElement("grave")
        let level = document.getElementsByTagName("level")[0]!
        level.appendChild(this.div)

        this.x = x;
        this.y = y;

        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}