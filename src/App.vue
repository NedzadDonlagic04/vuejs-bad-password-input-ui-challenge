<script setup>
import { onMounted, ref } from 'vue';
import Circle from './Circle.js';

const myCanvas = ref(null);
const password = ref('');

// Uppercase letters in the english
// alphabet go from 65 - 90 in the ASCII code
const generateRandomChar = () => {
    const charCode = Math.floor(Math.random() * 25 + 65);

    return String.fromCharCode(charCode);
}

// Variables store the string hsl value
// used by the circles later on
const redColor = 'hsl(0, 80%, 60%)';
const blueColor = 'hsl(200, 100%, 50%)';
const greenColor = 'hsl(100, 80%, 40%)';

onMounted(() => {
    // console.log(generateRandomChar());
    // ^ Used for testing

    const context = myCanvas.value.getContext('2d');
    myCanvas.value.height = window.innerHeight;
    myCanvas.value.width = window.innerWidth;

    const circles = [
        new Circle(context, 100, 100, 50, redColor),
        new Circle(context, 300, 100, 50, blueColor),
        new Circle(context, 100, 300, 50, greenColor)
    ];
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