"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject() {
        this.x = 0;
        this.y = 0;
    }
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        _this.speed = 0;
        _this.div = document.createElement("car");
        var level = document.getElementsByTagName("level")[0];
        level.appendChild(_this.div);
        _this.x = (Math.random() * -400) - 168;
        _this.y = Math.ceil(Math.random() * 5) * 120;
        _this.speed = Math.random() * 2 + 2;
        _this.setColor();
        return _this;
    }
    Object.defineProperty(Car.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) { this._color = value; },
        enumerable: true,
        configurable: true
    });
    Car.prototype.update = function () {
        this.x += this.speed;
        if (this.x > window.innerWidth) {
            this.x = -168;
        }
        _super.prototype.update.call(this);
    };
    Car.prototype.setColor = function () {
        this._color = Math.random() * 360;
        this.div.style.webkitFilter = "hue-rotate(" + this._color + "deg)";
        this.div.style.filter = "hue-rotate(" + this._color + "deg)";
    };
    Car.prototype.move = function () {
        this.x += this.speed;
        if (this.x > window.innerWidth)
            this.x = -450;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        this.gameobjects = [];
        this.score = 0;
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        for (var i = 0; i < 4; i++) {
            this.gameobjects.push(new Car());
        }
        this.gameobjects.push(new Player(this));
        this.scoreElement = document.createElement("score");
        this.scoreElement.innerHTML = "Score: 0";
        this.div.appendChild(this.scoreElement);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        for (var _i = 0, _a = this.gameobjects; _i < _a.length; _i++) {
            var gameobject = _a[_i];
            gameobject.update();
            if (gameobject instanceof Player) {
                for (var _b = 0, _c = this.gameobjects; _b < _c.length; _b++) {
                    var car = _c[_b];
                    if (car instanceof Car) {
                        if (this.checkCollision(car.getRectangle(), gameobject.getRectangle())) {
                            console.log("crash!");
                            gameobject.reset();
                        }
                    }
                }
            }
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.update = function () {
    };
    Game.prototype.addPoint = function () {
        this.score++;
        this.scoreElement.innerHTML = "Score: " + this.score;
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.div = document.createElement("player");
        var level = document.getElementsByTagName("level")[0];
        level.appendChild(_this.div);
        _this.x = 400;
        _this.y = 670;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    Player.prototype.reset = function () {
        this.x = 400;
        this.y = 670;
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
                    this.game.addPoint();
                }
                break;
            case 83:
                this.y += 30;
                break;
        }
    };
    return Player;
}(GameObject));
//# sourceMappingURL=main.js.map