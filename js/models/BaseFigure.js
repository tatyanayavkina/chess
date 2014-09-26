//базовый класс фигура
function BaseFigure(x, y, color, type) {
    this.coordinates = new Coordinates(x, y);
    this.color = color;
    this.type = type;
}

BaseFigure.prototype.pushToResult = function (x, y, color, standing, result, strike) {
    //если клетка свободна
    if (standing.board[y][x] === null) {
        if (!strike) {
            result[new Coordinates(x, y)] = new StepInfo();
        }
        return true;
    }
    //если клетка занята, то добавляем ее, если там вражеская фигура; прерываем цикл
    else {
        if (standing.getFigureColor(x, y) != color) {
            result[new Coordinates(x, y)] = new StepInfo(true, standing.board[y][x]);
        }
        return false;
    }
};

BaseFigure.prototype.moveStraight = function (coorX, coorY, color, standing, result, strike) {
    //по вертикали с увеличением y
    for (var x = coorX, y = coorY + 1; y < 8; y++) {
        if (!this.pushToResult(x, y, color, standing, result, strike)) break;
    }

    for (var x = coorX, y = coorY - 1; y >= 0; y--) {
        if (!this.pushToResult(x, y, color, standing, result, strike)) break;
    }
    for (var x = coorX + 1, y = coorY; x < 8; x++) {
        if (!this.pushToResult(x, y, color, standing, result, strike)) break;
    }
    for (var x = coorX - 1, y = coorY; x >= 0; x--) {
        if (!this.pushToResult(x, y, color, standing, result, strike)) break;
    }
};

BaseFigure.prototype.moveDiag = function (coorX, coorY, color, standing, result, strike) {
    for (var x = coorX - 1, y = coorY - 1; x >= 0 && y >= 0; x--, y--) {
        if (!this.pushToResult(x, y, color, standing, result, strike)) break;
    }
    for (var x = coorX + 1, y = coorY - 1; x < 8 && y >= 0; x++, y--) {
        if (!this.pushToResult(x, y, color, standing, result, strike)) break;
    }
    for (var x = coorX - 1, y = coorY + 1; x >= 0 && y < 8; x--, y++) {
        if (!this.pushToResult(x, y, color, standing, result, strike)) break;
    }
    for (var x = coorX + 1, y = coorY + 1; x < 8 && y < 8; x++, y++) {
        if (!this.pushToResult(x, y, color, standing, result, strike)) break;
    }
};

BaseFigure.prototype.moveExtensively = function (x, y, moveX, moveY, color, standing, result, strike) {
    if (moveX == 0 && moveY == 0) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            //если в клетке стоит фигура
            if (standing.board[y][x] !== null) {
                //и это чужая фигура
                if (standing.getFigureColor(x, y) !== color) {
                    result[new Coordinates(x, y)] = new StepInfo(true, standing.board[y][x]);
                }
                return;
            }
            //иначе добавляем в
            if (!strike) {
                result[new Coordinates(x, y)] = new StepInfo();
            }
        }

        return;
    }

    if (moveX != 0 && moveY != 0) {
        this.moveExtensively(x - moveX, y, 0, moveY, color, standing, result, strike);
        this.moveExtensively(x + moveX, y, 0, moveY, color, standing, result, strike);

        return;
    }

    // one coordinate is null
    if (moveX != 0) { // moveX != 0, moveY == 0
        this.moveExtensively(x - moveX, y, 0, 0, color, standing, result, strike);
        this.moveExtensively(x + moveX, y, 0, 0, color, standing, result, strike);
    } else { // moveX == 0, moveY != 0
        this.moveExtensively(x, y - moveY, 0, 0, color, standing, result, strike);
        this.moveExtensively(x, y + moveY, 0, 0, color, standing, result, strike);
    }
};

BaseFigure.prototype.cellForRoque = function (coorX, coorY, moveX, color, standing, rookPlace, result) {
    var rookId = standing.board[rookPlace.y][rookPlace.x];
    if (standing.figures[rookId].type === "rook" && standing.figures[rookId].color === color) {
        //если ладья не делала ходов и между ней и королем все клетки свободны
        if (standing.figures[rookId].firstMove === true && this.cellsAreFree(standing, coorX, coorY, rookPlace.x, color)) {
            result[new Coordinates(coorX + moveX, coorY)] = new StepInfo(false, rookId);
        }
    }
};

BaseFigure.prototype.cellsAreFree = function (standing, x1, y, x2, color) {
    //находим
    var xMin = x1;
    var xMax = x2;
    if (x1 > x2) {
        xMin = x2;
        xMax = x1;
    }
    var strikeCells = {};
    if (color === "white") {
        strikeCells = standing.getStrikeCells("black");
    }
    else {
        strikeCells = standing.getStrikeCells("white");
    }
    if (strikeCells.hasOwnProperty(new Coordinates(x1, y))) {
        return false;
    }
    for (var x = xMin + 1; x < xMax; x++) {
        if (standing.board[y][x] !== null || strikeCells.hasOwnProperty(new Coordinates(x, y))) {
            return false;
        }
    }
    return true;

};

BaseFigure.prototype.getPossibleMoves = function (standing, result) {
};
