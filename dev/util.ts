class Util {
    /**
     * deze formule rekent uit of twee gameobjecten elkaar overlappen
     */
    public static checkCollision(car:Car, player:Player):boolean {
        return (car.x < player.x + player.width &&
                car.x + car.width > player.x &&
                car.y < player.y + player.height &&
                car.height + car.y > player.y)
    }
}