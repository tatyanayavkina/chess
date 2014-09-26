//класс Слон
function Bishop(x, y, color) {
    BaseFigure.call(this, x, y, color, "bishop");
}
Bishop.prototype = new BaseFigure();
Bishop.prototype.getPossibleMoves = function (standing, result, strike) {
    strike = strike || false;
    var coorX = this.coordinates.x;
    var coorY = this.coordinates.y;
    var color = this.color;
    this.moveDiag(coorX, coorY, color, standing, result, strike);
};
