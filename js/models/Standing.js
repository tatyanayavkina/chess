
Standing = function (figures, newStep, moveFigureId, info) {
    this.figures = figures;
    //хранит ход фигуры; хранит ее id
    this.newStep = newStep;
    this.moveFigureId = moveFigureId;
    this.info = info;
    this.board = [];
    //хранит фигуру, по которой был клик
    this.checkedFigure = -1;
    this.possibleMoves = {};

    //fill board cells with null values
    this.getBoardNull = function () {
        for (var y = 0; y < 8; y++) {
            this.board[y] = [];
            for (var x = 0; x < 8; x++) {
                this.board[y][x] = null;
            }
        }
    },
    //fill board cells with figures' id-s
    this.getBoard = function () {
        for (var i = 1; i <= 32; i++) {
            if (this.figures.hasOwnProperty(i.toString())) {
                var x = this.figures[i].coordinates.x;
                var y = this.figures[i].coordinates.y;
                this.board[y][x] = i;
            }
        }
    },
    //get class for board[x][y]
    this.getCellClass = function (x, y) {
    //если был клик по клетке с фигурой
        if (this.board[y][x] == this.checkedFigure) {
            return 'red';
        }
        var cellClass = '';
        //если клетка белая
        if ((x + y) % 2 === 0) {
            cellClass += 'white-cell';
        }
        //если клетка черная
        else {
           cellClass += 'black-cell';
        }
        //если клетка - возможный ход для выделенной клетки с фигурой
        if (this.possibleMoves.hasOwnProperty(new Coordinates(x, y))) {
           cellClass += ' move';
        }
        return cellClass;
    },
    //get color of figure in board[x][y]
    this.getFigureColor = function (x, y) {
         var figureId = this.board[y][x];
         if (figureId === null)
             return;
         var figure = this.figures[figureId];
         return figure.color;
    },

    //get class of figure in board[y][x]
    this.getFigureClass = function (x, y) {
         var figureId = this.board[y][x];
         if (figureId === null)
             return;

         var figure = this.figures[figureId];
         return figure.color + "-" + figure.type;
    },

    //array of possible moves for selected figure in board[y][x]
    this.getPossibleMoves = function (x, y) {
         this.possibleMoves = {};
         var figureId = this.board[y][x];
         var figure = this.figures[figureId];
         figure.getPossibleMoves(this, this.possibleMoves);
         this.checkOutPossibleMovesToOwnCheck(figureId);
    },
    //проверка возможных ходов на шах самому себе
    this.checkOutPossibleMovesToOwnCheck = function(figureId){
          var king = this.getStepOwnerKing(figureId);
          for(var key in this.possibleMoves){
               var step = Coordinates.stringToCoordinates(key);
               var cloneStanding = {};
               cloneStanding = Utilities.clone(this);
               cloneStanding.doStep(figureId, step.x, step.y);
               var strikeCellsForEnemy = cloneStanding.getStrikeCells(king.enemyColor,cloneStanding);
               if(cloneStanding.figures[king.id].coordinates in strikeCellsForEnemy){
                   delete this.possibleMoves[key];
               }
          }
    },
    //вспомогательная информация о короле
    this.getStepOwnerKing = function(stepFigureId){
          var color = this.figures[stepFigureId].color;
          var kingId = -1;
          var enemyColor = '';
          var enemyKingId = -1;
          if (color === "white"){
              kingId = 16;
              enemyColor = "black";
              enemyKingId = 32;
          }
          else{
              kingId = 32;
              enemyColor = "white";
              enemyKingId = 16;
          }
          return {color: color, id: kingId, enemyColor: enemyColor, enemyId: enemyKingId};
    },
    //change figure location to board[y][x]
    this.doStep = function (id, x, y) {
         //если ладья или король ходят впервые, меняем это значение
         if ((this.figures[id].type === "rook" || this.figures[id].type === "king" || this.figures[id].type === "pawn") && this.figures[id].firstMove === true) {
             this.figures[id].firstMove = false;
         }
         //записываем ход
         this.moveFigureId = id;
         this.newStep = [new Coordinates(this.figures[id].coordinates.x, this.figures[id].coordinates.y), new Coordinates(x, y)];
         //выполняем ход
         this.figures[id].coordinates.x = x;
         this.figures[id].coordinates.y = y;
         //если произошло взятие, удаляем фигуру с поля;если была рокировка, делаем рокировку
         this.killOrRoque(new Coordinates(x, y));
         if( (this.figures[id] instanceof Pawn)  &&(y === 0 || y === 7)){
             return true;
         }
         else{
             this.makeChanges();
             return false;
         }

    },
    //сохраняет изменения после хода
    this.makeChanges = function () {
         this.getBoardNull();
         this.getBoard();
         this.possibleMoves = {};
         this.checkedFigure = -1;
    },
    //проверяет, какой ход сейчас был:обычный, или поставлен шах или мат. проверка пата
    this.getInfoAboutStep = function(id){
         if(this.notPossibleMoves(id)){
              if(this.isCheck(id)){
                  this.info = "Мат";
              }
              else{
                  this.info = "Пат";
              }
         }
         else{
              this.info = "Ход";
              if(this.isCheck(id)){
                  this.info = "Шах";
              }
         }
    },
    //if it was kill or roque
    this.killOrRoque = function(moveCell){
         //если произошло взятие, удаляем фигуру с поля
         if (this.possibleMoves.hasOwnProperty(moveCell) && this.possibleMoves[moveCell].strike === true) {
              delete this.figures[this.possibleMoves[moveCell].affectedId];
         }
         //если это рокировка
         if (this.possibleMoves.hasOwnProperty(moveCell) && this.possibleMoves[moveCell].strike === false && this.possibleMoves[moveCell].affectedId !== '') {
              if (this.newStep[0].x > moveCell.x) {
                   this.figures[this.possibleMoves[moveCell].affectedId].coordinates.x = moveCell.x + 1;
              }
              else {
                   this.figures[this.possibleMoves[moveCell].affectedId].coordinates.x = moveCell.x - 1;
              }
              this.figures[this.possibleMoves[moveCell].affectedId].firstMove = false;
         }
    },
    //возвращает битые клетки для фигур цвета color
    this.getStrikeCells = function (color) {
         var strikeCells = {};
         //находим возможные ударные ходы для фигур цвета color
         for (var key in this.figures) {
              if (this.figures[key].color === color) {
                   //в клонированном объекте фигуры теряют свой тип
                   if (!(this.figures[key] instanceof BaseFigure)){
                       this.figures[key] = createFigure(this.figures[key]);
                   }
                   this.figures[key].getPossibleMoves(this, strikeCells, true);
              }
         }
         //возвращаем ударные клетки для фигур цвета color
         return strikeCells;
    },
    //проверка на шах
    this.isCheck = function(stepFigureId){
         var king = this.getStepOwnerKing(stepFigureId);
         var strikeCells = this.getStrikeCells(king.color);
         return (this.figures[king.enemyId].coordinates in strikeCells);
    },
    //проверка, есть ли возможные ходы
    this.notPossibleMoves = function(stepFigureId){
         var king = this.getStepOwnerKing(stepFigureId);
         var allPossibleMoves = [];
         for(var key in this.figures){
             if(this.figures[key].color === king.enemyColor)
             {
                  this.getPossibleMoves(this.figures[key].coordinates.x,this.figures[key].coordinates.y);
                  if(! Utilities.isObjectEmpty(this.possibleMoves)){
                      allPossibleMoves.push(this.possibleMoves);
                  }
             }
         }
         if(allPossibleMoves.length === 0){
            return true;
         }
         this.possibleMoves = {};
         return false;
    },

    this.getBoardNull();
    this.getBoard();
};

