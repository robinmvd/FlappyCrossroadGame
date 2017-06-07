class Player {

    public div: HTMLElement;    
    public x:number;
    public y:number;
    public width:number;
    public height:number;

    private level: Level;

    constructor(l:Level) {
        this.level = l;
        this.x = 400;
        this.y = 670;
        this.width = 61;
        this.height = 102;

        document.getElementsByTagName("ui")[0].innerHTML = "Score: 0";

        this.div = document.createElement("player");
        this.level.div.appendChild(this.div);

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));

        
    }
    
    public update() : void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    // W A S D
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.x -= this.width;
            break;
        case 68:
            this.x += this.width;
            break;
        case 87:
            this.y -= 30;
            // als helemaal boven in beeld, dan weer beneden zetten EN de score ophogen!!
            // if(this.y < -50) this.y = 670;
            break;
        case 83:
            this.y += 30;
            break;
        }
    }

}