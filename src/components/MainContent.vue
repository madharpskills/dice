<template>
    <div class="main-content">
        <div class="turn-indicator">
            It's <b>{{turn.name}}'s</b> turn!
        </div>
        <div class="dice-area">
            <button v-for="die in dice" class="die" title="Hold" @click="hold(die)" id="die">{{die}}</button>
            <!-- <button v-for="die in dice" class="die" title="Hold" @click="hold(die)"><img :src=die></button> -->
        </div>
        <div v-if="heldDice.length == 0 && dice.length == 0 || this.bust" class="roll-button">
            <button @click="roll(6)" class="roll">Roll</button>
        </div>
        <div v-if="true" class="hold">
            <h2>Held</h2>
            <button v-for="die in heldDice" class="die" title="Return" @click="returnDie(die)">{{die}}</button>
            <!-- <button v-for="die in heldDice" class="die" title="Return" @click="returnDie(die)"><img :src=die></button> -->
        </div>
        <div class="game-buttons">
            <button v-if="heldDice.length > 0" @click="reroll(turn.player, dice.length)">Score and roll again</button>
            <button @click="endTurn(turn.player)">End Turn</button>
        </div>
    </div>
</template>

<script>

export default {
    components: {
        Dice
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

</style>