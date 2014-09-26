'use strict';

app.directive('chessBoard', function(){
    return {
        restrict: "E",
        template: '<div class = "col"><div ng-repeat="(indY,row) in standing.board">' +
            '<chess-cell ng-repeat="(indX,cell) in row"></chess-cell>' +
            '</div>'+
            '<div class = "alph note" ng-repeat = "alph in horizontal">{{alph}}</div></div>',
        replace: true,
        link: function(scope,elem,attrs){

        }
    }

});

app.directive('chessCell', function(){
    return {
        restrict: "E",
        replace: false,
        template: '<div chess-figure class = "cell-wrapper" ng-class="standing.getCellClass(indX,indY)" ng-click="onCellClick(indX,indY)"></div>'

    }

});

app.directive('chessFigure', function(){
    return {
        restrict: "A",
        template: '<div class = "figure" ng-class="standing.getFigureClass(indX,indY)"></div>',
        replace: false,
        link: function(scope,elem,attrs){

        }
    }

});
