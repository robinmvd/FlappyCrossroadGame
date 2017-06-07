# PRG04 Week7 oefening1

![Crossroads](docs/images/screenshot.png?raw=true "Crossroads")

## Flappy Crossroads

De Car verwijdert zichzelf nadat hij buiten beeld gaat:

**car.ts**
```
public move():void {
    this.x++;
    if(this.x > 600){
        this.div.remove();
        this.game.removeCar(this);
    }
}
```

**level.ts**
```
public removeCar(c:Car):void {
    let index = this.cars.indexOf(c);
    this.cars.splice(index, 1);
}
```

### Game Over

Als de speler een auto raakt roep je de gameOver functie aan:

**level.ts**
```
private gameOver():void {
    let g = new Grave(this.player.x, this.player.y, this.div);
    this.player.removeMe();
    this.player = undefined;
    clearInterval(this.timerid);
}
```

**player.ts**
```
public removeMe(){
    this.div.remove();
}
```

### Score

Als de speler boven in beeld komt, dan scoor je een punt. De score wordt bijgehouden in Level.

**player.ts**
```
private onKeyDown(event:KeyboardEvent):void {
    switch(event.keyCode){
    case 87:
        this.y -= 50;
        if(this.y + this.height < 0){  
            this.y = 670;
            this.level.updateScore();
        }
        break;
    }
}
```

**level.ts**
```
public updateScore(){
    this.score++;
    document.getElementsByTagName("ui")[0].innerHTML = "SCORE " + this.score;
}
```

## Flappy Crossroads Continued

### Clamp

Math gebruiken zodat de speler niet uit beeld kan lopen

**player.ts**
```
private onKeyDown(event:KeyboardEvent):void {
    switch(event.keyCode){
    case 65:
        this.x = Math.max(0, this.x-30);
        break;
     case 68:
        this.x = Math.min(760, this.x+30);
        break;
    case 83:
        this.y = Math.min(670, this.y+30);
        break;
    }
}
```

### Stay in your own lane

Y waarde afronden zodat elke auto in zijn eigen rij blijft

**car.ts**
```
this.y = Math.round(Math.random() * 5) * 120;
```

### Hitbox

Een hitbox zorgt ervoor dat de collision check niet altijd op de gehele afbeelding plaatsvindt. De hitbox is een div binnen het gameobject. We kunnen die div kleiner maken dan het gameobject.

**style.css**
```
carhitbox {
    border:2px solid red;
    height:80px; width:156px;
    margin-top:28px;
}

playerhitbox {
    border:2px solid red;
    height:60px; width:61px;
    margin-top:42px;
}
```

**car.ts en player.ts**
```
public div: HTMLElement;    
public hitbox: HTMLElement;

this.div = document.createElement("player");
parent.appendChild(this.div);

this.hitbox = document.createElement("playerhitbox");
this.div.appendChild(this.hitbox);
```

In de collision functie checken we nu twee hitboxes in plaats van een car en een player.

**util.ts**
```
public static checkCollision(hitbox1:HTMLElement, hitbox2:HTMLElement):boolean {

    let rect1:ClientRect = hitbox1.getBoundingClientRect();
    let rect2:ClientRect = hitbox2.getBoundingClientRect();

    return (rect2.left < rect1.right &&
            rect2.right > rect1.left &&
            rect2.top < rect1.bottom &&
            rect2.bottom > rect1.top)
}
```

In het level checken we de hitbox van de car tegen de hitbox van de player.

**level.ts**
```
if(Util.checkCollision(c.hitbox, this.player.hitbox)){
     this.gameOver();
}
```

### Z-index

Omdat het hoofdje van de kip nu geen collision veroorzaakt, ziet het er raar uit als de auto over het hoofdje heen getekend wordt. Daarom plaatsen we auto's altijd onderin de DOM.

**car.ts**
```
this.div = document.createElement("car");
level.div.insertBefore( this.div, level.div.firstChild );
```

### Car Collision

Om te voorkomen dat auto's botsen kan je de car speed afhankelijk maken van de rij.
```
this.speed = this.y/100;
```

### Moeilijkheidsgraad

Om het spel moeilijker te maken als je verder komt, kan je de frequentie en de snelheid van de auto's afhankelijk maken van de score. Vervang setInterval door setTimeout. Je kan nu de interval aanpassen tijdens het spel.

**level.ts**
```
class Level {
    public score:number = 0;
    constructor() {
        this.timerid = setTimeout(() => this.createCar(), 2000);
    }

    private createCar(): void {
        this.cars.push(new Car(this));
        let pauseTime = 2000 - this.score * 100;
        this.timerid = setTimeout(() => this.createCar(), pauseTime);
    }
}
```

De car heeft al een snelheid functie, die kunnen we vermenigvuldigen met een multiplier. Die multiplier verhogen we naar mate de score hoger wordt.

**car.ts**
```
let multiplier = this.level.score + 1;
this.speed = this.y/100 * multiplier;
```

### Car Collision Advanced

Als de snelheid van de auto's volledig random is, dan kunnen ze ook tegen elkaar botsen. De collision functie kunnen we nu ook gebruiken om te zien of cars botsen. 
```
if(Util.checkCollision(car1.hitbox, car2.hitbox)){
      console.log("auto 1 raakt auto 2");
}
```

Per car maken we een loop die door alle cars heen loopt. Als daar een collision ontstaat dan raken twee auto's elkaar. Let op dat je niet checkt of een auto zichzelf raakt!
Als er een hit is maken we de snelheid gelijk. Je zou ook nog de auto's iets uit elkaar kunnen plaatsen, om te voorkomen dat de collision telkens true terug blijft geven.
```
for(let c1 of this.cars){
    c1.update();

    for(let c2 of this.cars){
        if(c1 != c2){
            if(Util.checkHitbox(c1.hitbox, c2.hitbox)){
                 console.log("de auto raakt een andere auto");
                 c1.speed = c2.speed;
            }
        }
    }
}
```

