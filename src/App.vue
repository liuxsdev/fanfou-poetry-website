<template>
    <div id="poetry-app">
        <main>
            <router-view></router-view>
        </main>
        <Footer />
    </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
    name: "App",
    components: {
        Footer,
    },
};
</script>

<style>
main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#poetry-app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 16px;
}

html,
body {
    margin: 0;
}
</style>
