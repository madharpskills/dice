<template>
    <div class="player-item">
        <div class="player-name">
            <h3>Player One: </h3>
            <label for="name">{{playerOne.name}}</label>
            <div v-if="!renaming.playerOne" class="rename-player">
                <button @click="renaming.playerOne = !renaming.playerOne">Rename</button>
            </div>
            <div v-if="renaming.playerOne">
                <input v-model="playerOne.newName" type="text" name="name">
                <button @click="renamePlayer('playerOne', playerOne.newName)">Submit</button>
            </div>
        </div>
        <div class="score">
            <h4>Score</h4>
            <ul>
                <li>Held: {{playerOne.heldScore}}</li>
                <li>Round: {{playerOne.roundScore}}</li>
                <li>Total: {{playerOne.totalScore}}</li>
            </ul>
        </div>
    </div>
</template>

<script>

</script>

<style>

</style>