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

// Events used by the floating circles on screen
const addEvent = () => password.value += generateRandomChar();
const undoEvent = () => password.value.slice(0, -1);
const resetEvent = () => password.value = '';

const initCanvas = () => {
    myCanvas.value.height = window.innerHeight;
    myCanvas.value.width = window.innerWidth;   
}

onMounted(() => {
    // console.log(generateRandomChar());
    // ^ Used for testing

    const context = myCanvas.value.getContext('2d');
    initCanvas();

    window.addEventListener('resize', initCanvas);
});

</script>

<template>
    <p>Input your password</p>
    <p>{{password}}</p>
    <canvas id="myCanvas" ref="myCanvas"></canvas>
</template>

<style scoped>
    p {
        margin: 1rem;
    }

    #myCanvas {
        position: fixed;
        inset: 0;
        height: 100%;
    }
</style>