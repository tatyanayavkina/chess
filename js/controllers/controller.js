'use strict';

app.controller('BoardCtrl', ['$scope','$dialog','BoardCells', function($scope, $dialog,BoardCells){
    $scope.standing = {};
    $scope.horizontal = ['a','b','c','d','e','f','g','h'];
    $scope.vertical = [8,7,6,5,4,3,2,1];
    BoardCells.queryStanding(function(newStanding, whiteStep)
    {
        $scope.standing = newStanding;
        $scope.isWhiteStep = whiteStep;
        $scope.moveColor = $scope.isWhiteStep ? 'white':'black';
    });

    $scope.onCellClick = function(x,y)
    {
        //если сейчас был клик по клетке с фигурой
        if($scope.standing.board[y][x] !== null)
        {
            //если есть сохраненная фигура, в этой клетке находится фигура другого цвета
            //и она в списке возможных ходов, то это взятие
            if( $scope.standing.checkedFigure !== -1 && $scope.standing.getFigureColor(x,y) !== $scope.moveColor  && $scope.standing.possibleMoves.hasOwnProperty(new Coordinates(x,y)))
            {
                $scope.replaceFigure(x,y);
                return;
            }
            //иначе
            //выделяем клетку с фигурой и показываем возможные ходы
            if($scope.standing.getFigureColor(x,y) === $scope.moveColor)
            {
                $scope.standing.checkedFigure = $scope.standing.board[y][x];
                $scope.standing.getPossibleMoves(x,y);
            }
        }
        //если клик был по пустой клетке
        else
        {
            //проверяем, был ли ранее клик по клетке с фигурой. если был - проверяем, пустая клетка - допустимый ход
            if( $scope.standing.checkedFigure !== -1  && $scope.standing.possibleMoves.hasOwnProperty(new Coordinates(x,y)) )
            {
                $scope.replaceFigure(x,y);
            }
        }

    }

    //перемещение фигуры
    $scope.replaceFigure = function(x,y)
    {
        //записываем в массив фигур изменение координат и отправляем на сервер
        if ($scope.standing.doStep($scope.standing.checkedFigure,x,y)){
            $scope.showPawnUpgradeDialog($scope.standing.moveFigureId);
        }
        $scope.afterChangeFigures();
    }

    //окно выбора для превращения пешки
    $scope.showPawnUpgradeDialog = function(id){
        var title = 'Pawn upgrade';
        var msg = 'What type of figure pawn should be?';
        var btns = [{result:'knight', label: 'Knight'}, {result:'rook', label: 'Rook'},{result:'bishop', label: 'Bishop'},{result:'queen', label: 'Queen'}];
        $dialog.messageBox(title,msg,btns)
            .open()
            .then(function(result){
                $scope.standing.figures[id].type = result;
                $scope.standing.figures[id] = createFigure($scope.standing.figures[id]);
                $scope.standing.makeChanges();
                $scope.afterChangeFigures();
            });
    }

    //пост-обработка хода фигуры
    $scope.afterChangeFigures = function(){
        $scope.standing.getInfoAboutStep($scope.standing.moveFigureId);
        BoardCells.sendFigures($scope.standing.figures, $scope.standing.newStep,$scope.standing.moveFigureId,$scope.standing.info);
        //передаем ход
        $scope.isWhiteStep = !$scope.isWhiteStep;
        $scope.moveColor = $scope.isWhiteStep ? 'white':'black';
    }

}]);