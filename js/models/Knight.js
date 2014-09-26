//класс Конь
function Knight(x, y, color) {
    BaseFigure.call(this, x, y, color, "knight");
};

Knight.prototype = new BaseFigure();
Knight.prototype.getPossibleMoves = function (standing, result, strike) {
    strike = strike || false;
    var coorX = this.coordinates.x;
    var coorY = this.coordinates.y;
    var color = this.color;
    // !!!!нет проверки на цвет
    this.moveExtensively(coorX, coorY, 2, 1, color, standing, result, strike);
    this.moveExtensively(coorX, coorY, 1, 2, color, standing, result, strike);
};
