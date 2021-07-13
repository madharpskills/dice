<template>
    <div id="app">
    <div class="container side-container"><Sidebar/></div>
    <div class="container main-container"><MainContent/></div>
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
}

button {
    cursor: pointer;
    border: 2px solid #000000;
    background: #16606d;
    color: white;
    padding: 4px;
    margin: 10px
}

.side-container {
    max-width: 250px;
    float: left;
}

.main-container {
    position: relative;
    max-width: 400px;
    float: left;
    margin: 100px
}
</style>