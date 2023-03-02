var a;
var b;
var c;
var d;
var e = [1, 2, 3];
var f = [1, true, 'a', false];
var ColorRed = 0;
var ColorGreen = 1;
var ColorBlue = 2;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["Purple"] = 3] = "Purple";
})(Color || (Color = {}));
;
var backgroundColor = Color.Red;
var message;
message = 'abc';
var endsWithC = message.endsWith('c');
var alternativeWay = message.endsWith('c');
var log = function (message) {
    console.log(message);
};
var doLog = function (message) {
    console.log(message);
};
// Lambda expression, aka arrow function in typescript
var doLog2 = function (message) { return console.log(message); };
var Point = /** @class */ (function () {
    function Point() {
    }
    // methods
    Point.prototype.draw = function () {
        console.log('X: ' + this.x + ', Y: ' + this.y);
    };
    Point.prototype.getDistance = function (another) {
        // ...
    };
    return Point;
}());
var point = new Point();
point.x = 1;
point.y = 2;
point.draw();
/*
interface Point1 {
    x: number,
    y: number,
    draw: () => void
}

//let drawPoint = (point: {x: number, y: number} ) => {
let drawPoint = (point: Point) => {
p[]
}

let getDistance = (pointA: Point, pointB: Point) => {

}
*/
/* point
drawPoint( {
    x: 1,
    y: 2
})
*/ 
