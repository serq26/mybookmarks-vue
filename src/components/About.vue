<script setup>
const aboutText = `It is a web application that allows me to list and manage the content I have saved from different websites to
        review later, all in one place.`;
</script>

<template>
    <v-alert icon="mdi-information-outline" :text="aboutText" type="success" variant="tonal" class="about"></v-alert>
</template>

<style scoped>
.about {
    margin: 50px auto;
    width: 75%;
    text-align: center;
}
</style>