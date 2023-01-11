<script setup>
import { onMounted, ref } from 'vue';

const myCanvas = ref(null);
const password = ref('');

// Uppercase letters in the english
// alphabet go from 65 - 90 in the ASCII code
const generateRandomChar = () => {
    const charCode = Math.floor(Math.random() * 25 + 65);

    return String.fromCharCode(charCode);
}

onMounted(() => {
    console.log(generateRandomChar());
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
        width: 100%;
    }
</style>