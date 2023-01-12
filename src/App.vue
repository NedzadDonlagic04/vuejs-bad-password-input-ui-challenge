<script setup>
import { onMounted, ref } from 'vue';
import Circle from './Circle.js';

const myCanvas = ref(null);
const password = ref('');

// Function used to generate a number from a given interval
const generateRandomInterval = (min, max) => {
    const range = max - min;
    const randomNumber = Math.floor(Math.random() * range + min);

    return randomNumber;
}

// Events used by the floating circles on screen
const addEvent = () => {

    // Uppercase letters in the english
    // alphabet go from 65 - 90 in the ASCII code
    const charCode = generateRandomInterval(65, 90);
    password.value += String.fromCharCode(charCode);
}
const undoEvent = () => password.value.slice(0, -1);
const resetEvent = () => password.value = '';

// Array that will hold all the circles and
// variable to store the circle radius
let circles = [];
const circleRadius = 50;

// Array that stores basic info for the circles
const info = [
    {   
        color: 'hsl(100, 80%, 40%)', 
        text: 'Reset', 
        event: password => password.value = ''
    },
    // ^ Green
    {   color: 'hsl(0, 80%, 60%)', 
        text: 'Undo',
        event: password => password.value = password.value.slice(0, -1)
    },
    // ^ Red
    {   color: 'hsl(200, 100%, 50%)', 
        text: '?',
        event: password => {
            // Uppercase letters in the english
            // alphabet go from 65 - 90 in the ASCII code
            const charCode = generateRandomInterval(65, 90);
            password.value += String.fromCharCode(charCode);
        } 
    }
    // ^ Blue
];

// Function used to initialize the canvas
// It is called either at page load or whenever the screen is resized
const initCanvas = () => {
    circles = [];

    const context = myCanvas.value.getContext('2d');
    myCanvas.value.height = window.innerHeight;
    myCanvas.value.width = window.innerWidth;   

    for(const circle of info) {
        const x = generateRandomInterval(circleRadius, window.innerWidth - circleRadius);
        const y = generateRandomInterval(circleRadius, window.innerHeight - circleRadius);

        circles.push(new Circle(context, x, y, circleRadius, circle.color, circle.text, window.innerWidth, window.innerHeight, circle.event));
    }
}

// Pythagoras theorem
// Used to calculate distance between 2 points
// in a system with an x and y coordinate
const distanceBetween2Points = (x1, y1, x2, y2) => {
    const a = (x2 - x1);
    const b = (y2 - y1);

    return Math.sqrt(a*a + b*b);
}

// Handles clicks on the canvas
// by checking is it any of the possible circles on screen
const canvasClickEvent = e => {
    const [x, y] = [e.clientX, e.clientY];

    let distance = distanceBetween2Points(circles[0].x, circles[0].y, x, y);
    let index = 0;

    for(let i=1; i<circles.length; i++) {
        if(distance > distanceBetween2Points(circles[i].x, circles[i].y, x, y)) {
            distance = distanceBetween2Points(circles[i].x, circles[i].y, x, y);
            index = i;
        }
    }

    if(distance <= circleRadius) {
        circles[index].clickEvent(password);    
    }  
}

// Allows for the circles to be animated on screen
const animate = () => {
    requestAnimationFrame(animate);

    const context = myCanvas.value.getContext('2d');
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(const circle of circles) {
        circle.updateCircle();
    }
}

onMounted(() => {
    // console.log(generateRandomChar());
    // ^ Used for testing
    
    initCanvas();

    window.addEventListener('resize', initCanvas);
    window.addEventListener('click', canvasClickEvent);

    animate();
});

</script>

<template>
    <p>Input your password</p>
    <p>{{password}}</p>
    <canvas id="myCanvas" ref="myCanvas"></canvas>
</template>

<style scoped>
    p {
        padding: .5rem;
    }

    #myCanvas {
        position: fixed;
        inset: 0;
        height: 100%;
    }
</style>