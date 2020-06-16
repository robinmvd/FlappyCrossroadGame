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
var Game = (function () {
    function Game() {
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.player = new Player();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        this.player.update();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.update = function () {
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
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
//# sourceMappingURL=main.js.map