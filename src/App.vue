<template>
    <div id="app">
    <Sidebar/>
    <MainContent/>
    </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue'

export default {
    name: 'app',
    components: {
        Sidebar,
        MainContent
    },
    data: () => {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>
#app {
    color: #333333;
    font-family: arial;
    margin: 0 auto;
    padding: 0 16px;

    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

button {
    cursor: pointer;
    border: 2px solid #000000;
    background: #16606d;
    color: white;
    padding: 4px;
    margin: 10px
}
</style>