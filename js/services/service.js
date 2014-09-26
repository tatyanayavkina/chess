'use strict';

app.factory('BoardCells', ['$http', function($http){
    var service = {};
    var createFiguresFromServerData = function(objArray)
    {
        var figures = {};
        for( var i = 1; i <= 32; i++)
        {
            if(objArray.hasOwnProperty(i.toString()))
            {
                figures[i] = (createFigure(objArray[i]));
            }
        }
        return figures;
    }

    var createLastStepFromServerData = function(array)
    {
        var arrayWithObject = [];
        for(var i= 0; i < 2; i++)
        {
            arrayWithObject.push(new Coordinates(array[i].x, array[i].y));
        }
        return arrayWithObject;
    }

    service.queryStanding = function(callbackFunction)
    {
        $http({method: 'GET', url: 'api/show'}).success(function(data){
            var figures = [];
            var newStep = [];
            var moveFigureId = '';
            var whiteStep = '';
            var info = '';
            whiteStep = data[0];
            figures = createFiguresFromServerData(data[1]);
            newStep = createLastStepFromServerData(data[2]);
            moveFigureId = data[3];
            info = data[4];
            callbackFunction(new Standing(figures, newStep, moveFigureId, info), whiteStep);
        });
    }

    service.sendFigures = function(figures,newStep,moveFigureId,stepInfo)
    {
        $http({method: 'POST', url: 'api/create', data:[figures,newStep,moveFigureId,stepInfo]}).success(function(data){
            console.log('data send:'+ data);
        });
    }

    return service;

}]);