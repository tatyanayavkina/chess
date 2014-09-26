
function createFigure(figure) {
    var newFigure = {};
    var type = figure.type;
    switch (type) {
        case 'pawn':
            newFigure = new Pawn(figure.coordinates.x, figure.coordinates.y, figure.color, figure.firstMove);
            break;

        case 'knight':
            newFigure = new Knight(figure.coordinates.x, figure.coordinates.y, figure.color);
            break;

        case 'bishop':
            newFigure = new Bishop(figure.coordinates.x, figure.coordinates.y, figure.color);
            break;

        case 'rook':
            newFigure = new Rook(figure.coordinates.x, figure.coordinates.y, figure.color, figure.firstMove);
            break;

        case 'queen':
            newFigure = new Queen(figure.coordinates.x, figure.coordinates.y, figure.color);
            break;

        case 'king':
            newFigure = new King(figure.coordinates.x, figure.coordinates.y, figure.color, figure.firstMove);
            break;
    }
    return newFigure;
}
