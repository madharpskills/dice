<template>
    <div id="app">
        <div class="sidebar">
        <h1>Play a dice game</h1>
        <div class="player-section">
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
    <div class="main-content">
        <div class="turn-indicator">
            It's <b>{{turn.name}}'s</b> turn!
        </div>
        <div class="dice-area">
            <button v-for="die in dice" class="die" title="Hold" @click="hold(die)" id="die" v-bind:key="die.image"><img :src=die.image></button>
        </div>
        <div v-if="heldDice.length == 0 && dice.length == 0 || this.bust" class="roll-button">
            <button @click="roll(6)" class="roll">Roll</button>
        </div>
        <div v-if="true" class="hold">
            <h2>Held</h2>
            <button v-for="die in heldDice" class="die" title="Return" @click="returnDie(die)" v-bind:key="die.image"><img :src=die.image></button>
        </div>
        <div class="game-buttons">
            <button v-if="heldDice.length > 0" @click="reroll(turn.player, dice.length)">Score and roll again</button>
            <button @click="endTurn(turn.player)">End Turn</button>
        </div>
    </div>
    </div>
</template>

<script>
import HelpSection from './components/HelpSection.vue'

export default {
    name: 'app',
    components: {
        HelpSection
    },
    data: () => {
        const allDice = [
            { value: 1, image: require('./assets/img/die1.png') }, 
            { value: 2, image: require('./assets/img/die2.png') }, 
            { value: 3, image: require('./assets/img/die3.png') }, 
            { value: 4, image: require('./assets/img/die4.png') }, 
            { value: 5, image: require('./assets/img/die5.png') }, 
            { value: 6, image: require('./assets/img/die6.png') }
        ]

        return {
            allDice,
            turn: { player: 'playerOne', name: 'Player One' },
            dice: allDice,
            heldDice: [],
            bust: false,
            playerOne: { id: 1, name: 'Player One', newName: '', heldScore: 0, roundScore: 0, totalScore: 0 },
            playerTwo: { id: 2, name: 'Player Two', newName: '', heldScore: 0, roundScore: 0, totalScore: 0 },
            renaming: { playerOne: false, playerTwo: false },
        }
    },
    methods: {
        roll(num) {
            let rollResults = []
            for (var i = 0; i < num; i++) {
                rollResults.push(this.allDice.find((die) => die.value === (Math.floor(Math.random() * 6) + 1)))
            }
            this.dice = rollResults
            this.bust = false
        },
        renamePlayer(player, newName) {
            this.renaming[player] = !this.renaming[player]
            this[player].name = newName
        },
        hold(die) {
            let heldDie = this.dice.find(targetDie => targetDie.value === die.value)
            let rm = this.dice.findIndex(targetDie => targetDie.value === die.value)

            this.heldDice.push(heldDie)
            this.dice.splice(rm, 1)
            this.calculateHeldScore(this.heldDice, this.turn.player)
        },
        returnDie(die) {
            let returnDie = this.heldDice.find(targetDie => targetDie === die)
            let rm = this.heldDice.findIndex(targetDie => targetDie === die)

            this.heldDice.splice(rm, 1)
            this.dice.push(returnDie)
            this.calculateHeldScore(this.heldDice, this.turn.player)
        },
        score(dice) {
            let score = 0
            let ones = dice.filter(die => die === 1)
            let twos = dice.filter(die => die === 2)
            let threes = dice.filter(die => die === 3)
            let fours = dice.filter(die => die === 4)
            let fives = dice.filter(die => die === 5)
            let sixes = dice.filter(die => die === 6)

            let allDice = [ones, twos, threes, fours, fives, sixes]

            for (let set of allDice) {
                if (set.length > 2) {
                    score += this.calculateScoreMultiples(set[0], set.length - 3)
                }

                if (set[0] === 1 && set.length < 3) {
                    for (let die of set) {
                        score += 100
                    }
                }

                if (set[0] === 5 && set.length < 3) {
                    for (let die of set) {
                        score += 50
                    }
                }
            }

            return score
        },
        calculateHeldScore(dice, player) {
            let diceValues = dice.map((die) => die.value)
            let score = this.score(diceValues)

            this[player].heldScore = score
        },
        calculateScoreMultiples(dieValue, multiplier) {
            if (dieValue === 1) {
                dieValue = 10
            }
            let value = ((dieValue * 100) * 2 ** multiplier)
            return value
        },
        reroll(player, numDice) {
            this[player].roundScore += this[player].heldScore
            this[player].heldScore = 0
            this.heldDice = []
            if (numDice == 0) {
                this.roll(6)
            } else {
                this.roll(numDice)
            }
            if (player == 'playerOne') {
                this.checkBust(this.dice, player, { player: 'playerTwo', name: 'Player Two' })
            } else {
                this.checkBust(this.dice, player, { player: 'playerOne', name: 'Player One' })
            }
        },
        checkBust(dice, player, nextPlayer) {
            console.log('meeseeks', dice)
            let diceValues = dice.map((die) => die.value)
            console.log('meeseeks2', diceValues)
            let score = this.score(diceValues)
            
            if (score == 0) {
                this.bust = true
                alert('Bust!')
                this[player].roundScore = 0
                this.turn.player = nextPlayer.player
                this.turn.name = nextPlayer.name
            }
        },
        endTurn(player) {
            this[player].roundScore += this[player].heldScore
            this[player].heldScore = 0
            this[player].totalScore += this[player].roundScore
            this[player].roundScore = 0

            this.dice = []
            this.heldDice = []

            if (player == 'playerOne') {
                this.turn.player = 'playerTwo'
                this.turn.name = 'Player Two'
            } else {
                this.turn.player = 'playerOne'
                this.turn.name = 'Player One'
            }

            if (this[player].totalScore >= 2000) {
                alert(`${this[player].name} won!`)
                
                this.dice = []
                this.heldDice = []

                this.playerOne.totalScore = 0
                this.playerTwo.totalScore = 0

                this.turn.player = 'playerOne'
                this.turn.name = 'Player One'
            }
        },
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

/* side styles */
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

/* middle styles */
.turn-indicator {
    padding: 10%
}

.dice-area {
    float: left;
}

.roll-button {
    position: relative;
    float: left;
}

.hold {
    position: relative;
    clear: both;
    padding: 5% 0%;
}

.game-buttons {
    padding: 33% 0% 0%
}

.die {
    width: 62px;
    height: 62px;
    background: #ffffff;
    border: 2px solid rgb(0, 0, 0);
    display: inline-block;
}
</style>