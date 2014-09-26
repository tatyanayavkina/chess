//класс Король
function King(x, y, color, firstMove) {
    BaseFigure.call(this, x, y, color, "king");
    this.firstMove = firstMove;
}
King.prototype = new BaseFigure();
King.prototype.getPossibleMoves = function (standing, result, strike) {
    strike = strike || false;
    var coorX = this.coordinates.x;
    var coorY = this.coordinates.y;
    var color = this.color;
    var firstMove = this.firstMove;
    var rookPlaces = [];
    //обычные ходы
    this.moveExtensively(coorX, coorY, 0, 1, color, standing, result, strike);
    this.moveExtensively(coorX, coorY, 1, 0, color, standing, result, strike);
    this.moveExtensively(coorX, coorY, 1, 1, color, standing, result, strike);
    //для рокировки
    if (color === "white") {
        rookPlaces = [ new Coordinates(0, 7), new Coordinates(7, 7)];
    }
    else {
        rookPlaces = [ new Coordinates(0, 0), new Coordinates(7, 0)];
    }
    //рокировка
    if (firstMove === true && !strike) {
        //если это ладья и она того же цвета, что и король
        //левая
        this.cellForRoque(coorX, coorY, -2, color, standing, rookPlaces[0], result);
        //правая
        this.cellForRoque(coorX, coorY, 2, color, standing, rookPlaces[1], result);
    }


};