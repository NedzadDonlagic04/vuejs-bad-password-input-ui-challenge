/**
 * Class Circle is used to represent a floating circle 
 * on screen with text inside of it
 *
 * @export
 * @class Circle
 */
export default class Circle {
    /**
     * Creates an instance of Circle.
     * @param {*} context { contains the canvas context which will be used to display the circle }
     * @param {*} x { starting position of the circle on the x axis }
     * @param {*} y { starting position of the circle on the y axis }
     * @param {*} radius { radius of the circle }
     * @param {*} fillStyle { color which will be used for the circle background and border color }
     * @param {*} text { text which will be displayed inside the circle }
     * @param {*} screenWidth { contains the width of the screen which be used to help with circle movement }
     * @param {*} screenHeight { contains the height of the screen which be used to help with circle movement }
     * @param {*} event { contains callback function that will be called when the circle is clicked }
     * @memberof Circle
     */
    constructor(context, x, y, radius, fillStyle, text, screenWidth, screenHeight, event) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fillStyle = fillStyle;
        this.text = text;

        this.screenWidth = screenWidth - radius;
        this.screenHeight = screenHeight - radius;

        this.drawCircle();

        this.speedX = this.generateSpeed();
        this.speedY = this.generateSpeed();

        this.clickEvent = event;
    }

    /**
     * Generates a random speed at which
     * the circle will move
     *
     * @return {*} 
     * @memberof Circle
     */
    generateSpeed() {
        const coinFlip = Math.floor( Math.random() * 2 );
        
        return (coinFlip === 0)? -5 : 5;
    }

    /**
     * Draws the circle and the text inside of it
     *
     * @memberof Circle
     */
    drawCircle() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.fillStyle;
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.stroke();

        this.context.font = "25px Roboto";
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.strokeText(this.text, this.x, this.y);
    }

    /**
     * Updates the circles position by adding
     * the speed value to both axis
     *
     * @memberof Circle
     */
    updateCircle() {
        if(this.x + this.speedX > this.screenWidth || this.x + this.speedX < this.radius) {
            this.speedX *= -1;
        }
        this.x += this.speedX;

        if(this.y + this.speedY > this.screenHeight || this.y + this.speedY < this.radius) {
            this.speedY *= -1;
        }
        this.y += this.speedY;

        this.drawCircle();
    }
} 