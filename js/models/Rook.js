//класс Ладья
function Rook(x, y, color, firstMove) {
    BaseFigure.call(this, x, y, color, "rook");
    this.firstMove = firstMove;
}
Rook.prototype = new BaseFigure();
Rook.prototype.getPossibleMoves = function (standing, result, strike) {
    strike = strike || false;
    var coorX = this.coordinates.x;
    var coorY = this.coordinates.y;
    var color = this.color;
    this.moveStraight(coorX, coorY, color, standing, result, strike);

};
