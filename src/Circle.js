export default class Circle {
    constructor(context, x, y, radius, fillStyle) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = fillStyle;
        context.fill();
        context.lineWidth = 2;
        context.stroke();
    }
} 