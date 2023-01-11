<script setup>
import { onMounted, ref } from 'vue';

const passwordParagraph = ref(null);

onMounted(() => {
    console.log(passwordParagraph.value);
});

</script>

<template>
    <p>Input your password</p>
    <p ref="passwordParagraph">Password goes here</p>
    <canvas id="myCanvas"></canvas>
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