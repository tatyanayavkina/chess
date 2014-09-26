//класс координат
function Coordinates(x, y) {
    this.x = x;
    this.y = y;

    this.toString = function () {
        return (this.x + ';' + this.y);
    }
}
//make coordinates from string
Coordinates.stringToCoordinates = function (str) {
    var arr = str.split(';');
    if (arr.length === 2) {
        return new Coordinates(arr[0], arr[1]);
    }
    return new Coordinates(null, null);
};
