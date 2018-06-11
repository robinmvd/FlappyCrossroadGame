"use strict";
var Car = (function () {
    function Car() {
        this.speed = 0;
        this.div = document.createElement("car");
        var level = document.getElementsByTagName("level")[0];
        level.appendChild(this.div);
        this.x = (Math.random() * -400) - 168;
        this.y = Math.ceil(Math.random() * 5) * 120;
        this.speed = Math.random() * 2 + 2;
        this.setColor();
    }
    Car.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Car.prototype.update = function () {
        this.x += this.speed;
        if (this.x > window.innerWidth) {
            this.x = -168;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Car.prototype.setColor = function () {
        var color = Math.random() * 360;
        this.div.style.webkitFilter = "hue-rotate(" + color + "deg)";
        this.div.style.filter = "hue-rotate(" + color + "deg)";
    };
    return Car;
}());
var Player = (function () {
    function Player() {
        var _this = this;
        this.div = document.createElement("player");
        var level = document.getElementsByTagName("level")[0];
        level.appendChild(this.div);
        this.x = 400;
        this.y = 670;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Player.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Player.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                this.x -= 102;
                break;
            case 68:
                this.x += 102;
                break;
            case 87:
                this.y -= 30;
                if (this.y < -50) {
                    this.y = 670;
                    console.log("de overkant gehaald!");
                }
                break;
            case 83:
                this.y += 30;
                break;
        }
    };
    return Player;
}());
var Level = (function () {
    function Level() {
        this.cars = [];
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.cars.push(new Car(), new Car(), new Car(), new Car(), new Car());
        this.player = new Player();
    }
    Level.prototype.update = function () {
        this.player.update();
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var c = _a[_i];
            c.update();
            if (this.checkCollision(c.getRectangle(), this.player.getRectangle())) {
                console.log("Een auto raakt de speler!");
            }
        }
    };
    Level.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Level;
}());
var Game = (function () {
    function Game() {
        this.level = new Level();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.level.update();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Grave = (function () {
    function Grave(x, y) {
        this.div = document.createElement("grave");
        var level = document.getElementsByTagName("level")[0];
        level.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    return Grave;
}());
//# sourceMappingURL=main.js.map