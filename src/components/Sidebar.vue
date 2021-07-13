<template>
    <div class="sidebar">
        <h1>Play a dice game</h1>
        <div class="player-section">
            <!-- TODO componentize players -->
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
            <div class="player-item">
                <div class="player-name">
                    <h3>Player Two: </h3>
                    <label for="name">{{playerTwo.name}}</label>
                    <div v-if="!renaming.playerTwo" class="rename-player">
                        <button @click="renaming.playerTwo = !renaming.playerTwo">Rename</button>
                    </div>
                    <div v-if="renaming.playerTwo">
                        <input v-model="playerTwo.newName" type="text" name="name">
                        <button @click="renamePlayer('playerTwo', playerTwo.newName)">Submit</button>
                    </div>
                </div>
                <div class="score">
                    <h4>Score</h4>
                    <ul>
                        <li>Held: {{playerTwo.heldScore}}</li>
                        <li>Round: {{playerTwo.roundScore}}</li>
                        <li>Total: {{playerTwo.totalScore}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <HelpSection/>
    </div>
</template>

<script>
// import Player from './Player.vue'
import HelpSection from './HelpSection.vue'

export default {
    components: {
        // Player,
        HelpSection
    },
    data: () => {
        return { 
            tempusername: '',
            newName: '',
            playerOne: { id: 1, name: 'Player One', newName: '', heldScore: 0, roundScore: 0, totalScore: 0 },
            playerTwo: { id: 2, name: 'Player Two', newName: '', heldScore: 0, roundScore: 0, totalScore: 0 },
            renaming: { playerOne: false, playerTwo: false },
        }
    },
    methods: {
        renamePlayer(player, newName) {
            this.renaming[player] = !this.renaming[player]
            this[player].name = newName
        },
    }
}
</script>

<style>
.score {
    position: relative;
    float: left;
    clear: both;
    padding: 0% 10% 15% 0%
}

.player-section {
    position: relative;
    float: left;
    padding: 0% 20% 0% 10%
}

.player-item {
    /* padding: 10% 10%; */
}

.player-name {
    padding: 7% 0%;
}

.rename-player {
    padding: 0% 7%
}

.help {
    position: relative;
    float: left;
    padding: 7% 7%
}
</style>