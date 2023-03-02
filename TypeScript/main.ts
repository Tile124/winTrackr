let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[] = [1,2,3];
let f: any[] = [1, true, 'a', false];

const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2;

enum Color {Red = 0, Green = 1, Blue = 2, Purple = 3};
let backgroundColor = Color.Red;

let message;
message = 'abc';
let endsWithC = (<string>message).endsWith('c');
let alternativeWay = (message as string).endsWith('c');


let log = function(message) {
    console.log(message);
}

let doLog = (message) => {
    console.log(message)
}
// Lambda expression, aka arrow function in typescript
let doLog2 = (message) => console.log(message);



class Point {
    // fields
    x: number;
    y: number;
    // methods
    draw() {
        // ...
    }

    getDistance(another: Point) {
        // ...
    }
}

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