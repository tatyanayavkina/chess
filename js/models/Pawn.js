//класс Пешка
function Pawn(x, y, color, firstMove) {
    BaseFigure.call(this, x, y, color, "pawn");
    this.firstMove = firstMove;
}
Pawn.prototype = new BaseFigure();

Pawn.prototype.moveStrike = function(x, y, moveY, color, standing, result){
    if (standing.board[y + moveY][x] !== null && standing.getFigureColor(x, y + moveY) != color) {
        result[new Coordinates(x, y +moveY)] = new StepInfo(true, standing.board[y +moveY][x]);
    }
    //если ходом ранее ходила вражеская пешка на 2 поля вперед
    if (standing.newStep[1].x === x && standing.newStep[1].y === y && Math.abs(standing.newStep[0].y - standing.newStep[1].y)=== 2 && standing.figures[standing.moveFigureId].type === "pawn") {
        result[new Coordinates(x, y + moveY)] = new StepInfo(true, standing.moveFigureId);
    }
};

Pawn.prototype.getPossibleMoves = function (standing, result, strike) {
    strike = strike || false;
    var coorX = this.coordinates.x;
    var coorY = this.coordinates.y;
    var color = this.color;
    var firstMove = this.firstMove;
    var moveY = 0;
    if (color === "white") {
        moveY--;
    }
    if (color === "black") {
        moveY++;
    }
    //если свободна клетка впереди

    if (standing.board[coorY + moveY][coorX] === null && !strike) {
        result[new Coordinates(coorX, coorY + moveY)] = new StepInfo();
        //если это первый ход и 2-я клетка вперед свободна
        if (firstMove && standing.board[coorY + 2 * moveY][coorX] === null) {
            result[new Coordinates(coorX, coorY + 2 * moveY)] = new StepInfo();
        }
    }
    //проверка на возможность взятия фигуры !!есть проверка цвета фигуры!!!
    if (coorX - 1 >= 0) {
        this.moveStrike(coorX - 1, coorY, moveY, color, standing, result);
    }
    if (coorX + 1 < 8) {
        this.moveStrike(coorX + 1, coorY, moveY, color, standing, result);
    }
};
