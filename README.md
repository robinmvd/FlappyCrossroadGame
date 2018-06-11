# PRG04 Week7 oefening1 : Flappy Crossroads

![Crossroads](docs/images/screenshot.png?raw=true "Crossroads")

## Inheritance

Kijk goed naar de Car, Grave en de Player classes. Welke properties en methods zijn identiek?
Zet die in een `GameObject` class waar beide van overerven.

## Composition

Als Flappy dood gaat, maak dan een `new Grave()` en plaats die op de plek des onheils.
Flappy zelf plaats je weer terug op de startpositie onderin het scherm.

## Bonus DLC

### Clamp

`Math.max` gebruiken zodat de speler niet uit beeld kan lopen

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

### Hitbox

Een hitbox zorgt ervoor dat de collision check niet op de gehele afbeelding plaatsvindt. De hitbox is een div binnen het gameobject. We kunnen de hitbox kleiner maken dan het gameobject.

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
private div: HTMLElement;    
private hitbox: HTMLElement;

this.div = document.createElement("player");
this.hitbox = document.createElement("playerhitbox");
this.div.appendChild(this.hitbox);

level.appendChild(this.div);
```

In de `getRectangle()` functie geven we nu niet de div terug maar de hitbox, om te kijken of we iets raken

```
public getRectangle() {
    return this.hitbox.getBoundingClientRect()
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

Om te voorkomen dat auto's met elkaar botsen in een rij, kan je de car speed afhankelijk maken van de rij.
```
this.speed = this.y/100;
```

### Moeilijkheidsgraad

Om het spel moeilijker te maken als je verder komt, kan je de frequentie en de snelheid van de auto's afhankelijk maken van de voortgang van de speler. 
Zodra de speler boven in beeld komt kan je het volgende doen:

 - De game pushed een extra `new Car()` in de cars array.
 - De game kan een speed meegeven aan de car via de constructor.
 - Die speed wordt hoger als er meer auto's zijn


```
class Car {
    constructor(s:number) {
        this.speed = s
    }
}
class Game {
    constructor() {
        let speed = this.cars.length
        this.cars.push(new Car(speed))
    }
}
```