//класс Ферзь
function Queen(x, y, color) {
    BaseFigure.call(this, x, y, color, "queen");
}
Queen.prototype = new BaseFigure();
Queen.prototype.getPossibleMoves = function (standing, result, strike) {
    strike = strike || false;
    var coorX = this.coordinates.x;
    var coorY = this.coordinates.y;
    var color = this.color;
    this.moveStraight(coorX, coorY, color, standing, result, strike);
    this.moveDiag(coorX, coorY, color, standing, result, strike);
};