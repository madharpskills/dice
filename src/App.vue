<template>
    <div id="app">
        <h1>Play a dice game</h1>
        {{ message }}
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
            message: 'hello world'
        }
    },
    methods: {

    }
}
</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>