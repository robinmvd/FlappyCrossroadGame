/// <reference path="car.ts"/>
/// <reference path="player.ts"/>

class Level {
    
    public div: HTMLElement;
    
    public score:number = 0;
    
    private cars:Array<Car> = new Array<Car>();
    private player:Player;
    
    constructor() {    
        this.div = document.createElement("level");
        document.body.appendChild(this.div);

        let ui = document.createElement("ui");
        this.div.appendChild(ui);
        this.updateScore();
        
        setInterval(()=> this.createCar(), 1400);
        this.player = new Player(this);
    }

    private createCar():void {
        this.cars.push(new Car(this));
        console.log("aantal autos: " + this.cars.length);
    }

    public update() : void {
        // player
        this.player.update();

        // cars
        for(let c of this.cars){
            c.update();

            // kijk of deze auto de speler raakt
            if(Util.checkCollision(c, this.player)){
                console.log("Een auto raakt de speler!");
                // hier moet je het volgende doen:
                // 1 - verwijder het speler element uit de DOM
                // 2 - zet this.player op undefined en roep de update niet meer aan
                // 3 - maak in level.ts een grafsteentje op de plek waar je dood ging met 'let g = new Grave(x,y,this.div)'
            }
        }
        
    }

    public updateScore(){
        document.getElementsByTagName("ui")[0].innerHTML = "SCORE 0";
    }

    /**
     * Deze functie verwijdert een auto uit de cars array
     */
    public removeCar(c:Car){
        let i:number = this.cars.indexOf(c);
        if(i != -1) {
            this.cars.splice(i, 1);
        }
    }

}