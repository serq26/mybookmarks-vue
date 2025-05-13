<template>
    <header>
        <router-link to="/">
            <h1><v-icon icon="mdi-bookmark" size="large"></v-icon> My BookMarks</h1>
        </router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </header>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    color: white;
    padding: 14px 20px;
    line-height: 1.5;
    background: teal;
}

header h1 {
    font-size: 20px;
    font-weight: bold;
}

header a {
    font-weight: bold;
}

@media (max-width: 768px) {
    header {
        margin-bottom: 20px;
    }
}
</style>